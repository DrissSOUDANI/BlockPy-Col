/**
 * An object that manages the various editors, where users can edit their program. Also manages the
 * movement between editors.
 * There are currently two editors:
 *  - Blocks: A Blockly instance
 *  - Text: A html textbox
 *
 * @constructor 
 * @this {BlockPyEditor}
 */


function BlockPyEditor() {

    // This tool is what actually converts text to blocks!
    this.converter = new PythonToBlocks();

    // HTML DOM accessors
    this.blocklyDiv = document.querySelectorAll('.blockly-div');

    // Blockly and CodeMirror instances
    this.blockly = null;

    // The updateStack keeps track of whether an update is percolating, to prevent duplicate update events.
    this.silenceBlock = false;
    this.silenceBlockTimer = null;
    this.silenceText = false;
    this.oldCode = ""; //DA ELIMINARE

    // Hack to prevent chrome errors. Forces audio to load on demand. 
    // See: https://github.com/google/blockly/issues/299
    //NON HO CAPITO BENE A COSA SERVE. FORSE PERMETTE DI RISOLVERE UN BUG IN CHROMIUM
    Blockly.WorkspaceSvg.prototype.preloadAudio_ = function () { };

    // Initialize subcomponents
    this.initText();
    this.initBlockly();

    //SERVONO SOLO INIZIALMENTE
    this.updateBlocksFromModel();
    this.updateTextFromModel();

}




// --------------------------------------------------
// Adaptateur global PointerEvents -> MouseEvents
// pour Blockly ancien (Chrome 144+) by Driss
// --------------------------------------------------
// --------------------------------------------------
// Adaptateur PointerEvents -> MouseEvents
// limité aux blocs du flyout Blockly pour Chrome 144  by Driss
// --------------------------------------------------
BlockPyEditor.installPointerMouseAdapter = function () {

    console.log('[DEBUG] installPointerMouseAdapter called');

    if (window.__blocklyFlyoutPointerAdapterInstalled) {
        return;
    }
    window.__blocklyFlyoutPointerAdapterInstalled = true;

    if (!window.PointerEvent) {
        console.log('[DEBUG] PointerEvent non supporté, adaptateur inutile');
        return;
    }

    // pointerId actuellement en drag depuis le flyout
    var activeDragPointerId = null;

    function isInFlyout(target) {
        if (!target || !target.closest) {
            return false;
        }
        var flyout = target.closest('.blocklyFlyout');
        return !!flyout;
    }

    function pointerDownHandler(e) {
        console.log('[DEBUG] pointerdown', {
            type: e.type,
            pointerType: e.pointerType,
            target: e.target
        });

        if (!isInFlyout(e.target)) {
            // Pas dans le flyout -> on ignore
            return;
        }

        var g = e.target.closest('g');
        if (!g) {
            console.log('[DEBUG] pointerdown in flyout, mais aucun <g> trouvé');
            return;
        }

        console.log(
            '[DEBUG] pointerdown IN flyout sur <g>',
            g,
            'class =',
            g.getAttribute && g.getAttribute('class')
        );

        // On démarre un drag pour CE pointerId
        activeDragPointerId = (e.pointerId != null) ? e.pointerId : null;

        // IMPORTANT : empêcher le comportement de scroll du flyout
        e.preventDefault();
        e.stopPropagation();

        // Générer un mousedown synthétique sur ce <g>
        var mouseDown = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: e.clientX,
            clientY: e.clientY,
            screenX: e.screenX,
            screenY: e.screenY,
            button: e.button,
            buttons: e.buttons,
            ctrlKey: e.ctrlKey,
            altKey: e.altKey,
            shiftKey: e.shiftKey,
            metaKey: e.metaKey
        });
        mouseDown.__blocklySynthetic = true;

        console.log('[DEBUG] dispatch synthetic mousedown on <g>');
        g.dispatchEvent(mouseDown);
    }

    function pointerMoveHandler(e) {
        if (activeDragPointerId === null) {
            return;
        }
        if (e.pointerId != null && e.pointerId !== activeDragPointerId) {
            return;
        }

        console.log('[DEBUG] pointermove during drag', {
            clientX: e.clientX,
            clientY: e.clientY
        });

        var mouseMove = new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: e.clientX,
            clientY: e.clientY,
            screenX: e.screenX,
            screenY: e.screenY,
            buttons: e.buttons,
            ctrlKey: e.ctrlKey,
            altKey: e.altKey,
            shiftKey: e.shiftKey,
            metaKey: e.metaKey
        });
        mouseMove.__blocklySynthetic = true;

        // On envoie sur le document (comme un vrai drag global)
        document.dispatchEvent(mouseMove);
    }

    function pointerUpOrCancelHandler(e) {
        if (activeDragPointerId === null) {
            return;
        }
        if (e.pointerId != null && e.pointerId !== activeDragPointerId) {
            return;
        }

        console.log('[DEBUG] pointerup/pointercancel fin de drag', {
            clientX: e.clientX,
            clientY: e.clientY
        });

        // Générer un mouseup synthétique pour terminer le drag
        var mouseUp = new MouseEvent('mouseup', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: e.clientX,
            clientY: e.clientY,
            screenX: e.screenX,
            screenY: e.screenY,
            button: e.button,
            buttons: e.buttons,
            ctrlKey: e.ctrlKey,
            altKey: e.altKey,
            shiftKey: e.shiftKey,
            metaKey: e.metaKey
        });
        mouseUp.__blocklySynthetic = true;

        console.log('[DEBUG] dispatch synthetic mouseup (fin de drag flyout)');
        document.dispatchEvent(mouseUp);

        activeDragPointerId = null;
    }

    // Pour voir les mousemove natifs si besoin
    document.addEventListener('mousemove', function (e) {
        if (!e.__blocklySynthetic) {
            // Unloggé par défaut, mais utile si tu veux observer
            // console.log('[DEBUG] native mousemove', e.clientX, e.clientY);
        }
    }, true);

    // Pour debug : voir les mousedown synthétiques
    document.addEventListener('mousedown', function (e) {
        if (e.__blocklySynthetic) {
            console.log('[DEBUG] synthetic mousedown reached', e.target);
        }
    }, true);

    // On intercepte les PointerEvents en phase capture
    document.addEventListener('pointerdown', pointerDownHandler, true);
    document.addEventListener('pointermove', pointerMoveHandler, true);
    document.addEventListener('pointerup', pointerUpOrCancelHandler, true);
    document.addEventListener('pointercancel', pointerUpOrCancelHandler, true);

    console.log('[BlockPy@Col] Adaptateur Pointer->Mouse installé pour le flyout Blockly');
};












/**
 * Initializes the Blockly instance (handles all the blocks). This includes
 * attaching a number of ChangeListeners that can keep the internal code
 * representation updated and enforce type checking.
 */
BlockPyEditor.prototype.initBlockly = function () {
    //alert("initBlockly");
    // 🔧 FIX Chrome 144 : PointerEvents → MouseEvents
    BlockPyEditor.installPointerMouseAdapter();


    this.blockly = Blockly.inject(this.blocklyDiv[0],
        {
            grid:
            {
                spacing: 20,
                length: 2,
                colour: '#fff',
                snap: true
            },
            sounds: true,

            zoom:
            {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.5,
                scaleSpeed: 1.2,
                pinch: true
            },

            move: {
                scrollbars: {
                    horizontal: true,
                    vertical: true
                },
                drag: true,
                wheel: false
            },

            path: "blockly/",
            media: "./media/",
            oneBasedIndex: false,
            comments: false,
            toolbox: this.updateToolbox(false)
        });

    // On mémorise aussi le workspace au niveau global si besoin
    BlockPyEditor.workspace = this.blockly;

    // ------------------------------
    // Listener de mise à jour Python
    // ------------------------------
    var editor = this;
    this.blockly.addChangeListener(function (evt) {
        
        editor.updateBlocks();
        setTimeout(function () {
            
            BlockPyEditor.applyBlockImagesVisibility();
            
        }, 0);
    });

    // ------------------------------
    // Listener pour réappliquer l'état des images
    // ------------------------------
    this.blockly.addChangeListener(function (event) {
        // On ignore les événements purement UI (sélection, survol...)
        if (event.type === Blockly.Events.UI) {
            
            return;
        }
        // On laisse Blockly finir ses mises à jour, puis on applique
        setTimeout(function () {
            
            BlockPyEditor.applyBlockImagesVisibility();
            
        }, 0);
    });

    //window.addEventListener('unload', BlockPyEditor.backupBlocks, false);
    window.addEventListener("pagehide", () => {
        BlockPyEditor.backupBlocks();
        });

    $('#btn_saveXML').on("click", BlockPyEditor.saveXmlFile);
    $('#load').on("change", BlockPyEditor.load);
    $('#btn_loadXML').on("click", function () {
        $('#load').click();
    });

    $('#btn_preview').on("click", function () {
        $("#toggle").toggle("slide");
    });
    $('#pre_previewPython').on("click", function () {
        $("#toggle").toggle("slide");
    });

    // Bouton œil : toggle affichage des images
    $('#btn_eye').on('click', function () {
        BlockPyEditor.toggleBlockImages();
    });

    $('#btn_block_capture').on("click", BlockPyEditor.workspace_capture);

    $('#btn_undo').on("click", BlockPyEditor.Undo);
    $('#btn_redo').on("click", BlockPyEditor.Redo);

    Blockly.mainWorkspace.addChangeListener(BlockPyEditor.renderPythonCodePreview);

    var loadOnce = null;
    try {
        loadOnce = window.localStorage.loadOnceBlocks;
    } catch (e) {
        // Firefox sometimes throws a SecurityError when accessing
        // localStorage.
    }

    BlockPyEditor.loadBlocks();

    // ➜ Appliquer une première fois l'état des images
    BlockPyEditor.applyBlockImagesVisibility();

    var clipboard = new Clipboard('#btn_CopyCode');

    // Force the proper window size
    this.blockly.resize();
};



// OLD Code oK at 18/01/2026
// BlockPyEditor.prototype.initBlockly = function () {
//     //alert("initBlockly");
//     this.blockly = Blockly.inject(this.blocklyDiv[0],
//         {
//             grid:
//             {
//                 spacing: 20,
//                 length: 2,
//                 colour: '#ccc',
//                 snap: true
//             },
//             sounds: true,

//             zoom:
//             {
//                 controls: true,
//                 wheel: true,
//                 startScale: 1.0,
//                 maxScale: 3,
//                 minScale: 0.5,
//                 scaleSpeed: 1.2,
//                 pinch: true
//             },

//             move: {
//                 scrollbars: {
//                     horizontal: true,
//                     vertical: true
//                 },
//                 drag: true,
//                 wheel: false
//             },

//             path: "blockly/",
//             media: "./media/",
//             //scrollbars: true,
//             //zoom: {enabled: true},
//             oneBasedIndex: false,
//             comments: false,
//             toolbox: this.updateToolbox(false)
//         });

//     // Register model changer

//     var editor = this;
//     this.blockly.addChangeListener(function (evt) {
//         //alert("eventListener");
//         editor.updateBlocks();
//     });


//     window.addEventListener('unload', BlockPyEditor.backupBlocks, false);

//     $('#btn_saveXML').on("click", BlockPyEditor.saveXmlFile);
//     $('#load').on("change", BlockPyEditor.load);
//     $('#btn_loadXML').on("click", function () {
//         $('#load').click();
//     });

//     $('#btn_preview').on("click", function () {
//         $("#toggle").toggle("slide");
//     });
//     $('#pre_previewPython').on("click", function () {
//         $("#toggle").toggle("slide");
//     });

//     //$('#btn_eye').on("click", BlockPyEditor.showHideBlockPicture);	
//     $('#btn_eye').on('click', function () {BlockPyEditor.toggleBlockImages();});
    

//     $('#btn_block_capture').on("click", BlockPyEditor.workspace_capture);

//     $('#btn_undo').on("click", BlockPyEditor.Undo);
//     $('#btn_redo').on("click", BlockPyEditor.Redo);

//     Blockly.mainWorkspace.addChangeListener(BlockPyEditor.renderPythonCodePreview);


//     var loadOnce = null;
//     try {
//         loadOnce = window.localStorage.loadOnceBlocks;
//     } catch (e) {
//         // Firefox sometimes throws a SecurityError when accessing
//         // localStorage.
//         // Restarting Firefox fixes this, so it looks like a bug.
//     }


//     BlockPyEditor.loadBlocks();

//     var clipboard = new Clipboard('#btn_CopyCode');

//     // Force the proper window size
//     this.blockly.resize();

// };





/**
 * Initializes the CodeMirror instance. This handles text editing (with syntax highlighting)
 * and also attaches a listener for change events to update the internal code represntation.
 */
BlockPyEditor.prototype.initText = function () {
    //alert("initText");
    // Register model changer
    var editor = this;
    $('.codemirror-div').keyup(function () {
        //alert("change");
        editor.updateText();
    });

};


/**
 * Actually changes the value of the CodeMirror instance
 *
 * @param {String} code - The new code for the CodeMirror
 */
BlockPyEditor.prototype.setText = function (code) {
    //alert("setText");
    if (code == undefined || code.trim() == "") {
        $('.codemirror-div').val("\n");
    } else {
        $('.codemirror-div').val(code);
    }
}

BlockPyEditor.prototype.setBlocks = function (python_code) {
    //alert("setBlocks");
    var xml_code = "";
    if (python_code !== '' && python_code !== undefined && python_code.trim().charAt(0) !== '<') {
        var result = this.converter.convertSource(python_code);
        xml_code = result.xml;
    }
    var error_code = this.converter.convertSourceToCodeBlock(python_code);
    var errorXml = Blockly.Xml.textToDom(error_code);
    if (python_code == '' || python_code == undefined || python_code.trim() == '') {
        this.blockly.clear();
    } else if (xml_code !== '' && xml_code !== undefined) {
        var blocklyXml = Blockly.Xml.textToDom(xml_code);
        try {
            this.setBlocksFromXml(blocklyXml);
        } catch (e) {
            console.error(e);
            this.setBlocksFromXml(errorXml);
        }
    } else {
        this.setBlocksFromXml(errorXml);
    }

    Blockly.Events.disable();
    this.blockly.align();
    Blockly.Events.enable();
}

BlockPyEditor.prototype.clearDeadBlocks = function () {
    //alert("clearDeadBlocks");
    var all_blocks = this.blockly.getAllBlocks();
    all_blocks.forEach(function (elem) {
        if (!Blockly.Python[elem.type]) {
            elem.dispose(true);
        }
    });
}

/**
 * Attempts to update the model for the current code file from the 
 * block workspace. Might be prevented if an update event was already
 * percolating.
 */
BlockPyEditor.prototype.updateBlocks = function () {
    //alert("updateBlocks");
    if (!this.silenceBlock) {
        try {
            var newCode = Blockly.Python.workspaceToCode(this.blockly);
        } catch (e) {
            this.clearDeadBlocks();
        }

        this.silenceText = true;
        this.setText(newCode);
    }
}

/**
 * Attempts to update the model for the current code file from the 
 * text editor. Might be prevented if an update event was already
 * percolating. Also unhighlights any lines.
 */
var timerGuard = null;
BlockPyEditor.prototype.updateText = function () {
    //alert("updateText");
    if (!this.silenceText) {
        var newCode = $('.codemirror-div').val();

        // Update Blocks
        this.silenceBlock = true;
        this.setBlocks(newCode);
        this.resetBlockSilence();
        //this.silenceBlock = false;
    }
    this.silenceText = false;
}

/**
 * Resets the silenceBlock after a short delay
 */
BlockPyEditor.prototype.resetBlockSilence = function () {
    //alert("resetBlockSilence");
    var editor = this;
    if (editor.silenceBlockTimer != null) {
        clearTimeout(editor.silenceBlockTimer);
    }
    this.silenceBlockTimer = window.setTimeout(function () {
        editor.silenceBlock = false;
        editor.silenceBlockTimer = null;
    }, 40);
};

/**
 * Updates the text editor from the current code file in the
 * model. Might be prevented if an update event was already
 * percolating.
 */
BlockPyEditor.prototype.updateTextFromModel = function () {
    //alert("updateTextFromModel");
    var code = Blockly.Python.workspaceToCode(this.blockly);
    this.setText(code);

}

/**
 * Updates the block editor from the current code file in the
 * model. Might be prevented if an update event was already
 * percolating. This can also report an error if one occurs.
 *
 * @returns {Boolean} Returns true upon success.
 */
BlockPyEditor.prototype.updateBlocksFromModel = function () {
    // var code = "print('Driss SOUDANI')";
    //this.silenceBlock = true;
    //this.setBlocks(code);
    //this.resetBlockSilence();


    //this.silenceBlock = false;
}

/**
 * Helper function for retrieving the current Blockly workspace as
 * an XML DOM object.
 *
 * @returns {XMLDom} The blocks in the current workspace.
 */
BlockPyEditor.prototype.getBlocksFromXml = function () {
    //alert("getBlocksFromXml");
    return Blockly.Xml.workspaceToDom(this.blockly);
}

/**
 * Helper function for setting the current Blockly workspace to
 * whatever XML DOM is given. This clears out any existing blocks.
 */
BlockPyEditor.prototype.setBlocksFromXml = function (xml) {
    //alert("setBlocksFromXml");
    Blockly.Xml.domToWorkspaceDestructive(xml, this.blockly);
}









// La catégorie OpenCV Basic --------------------------------------------------------------------------------------------------------------
function buildCategory_OpenCV_Basic() {
    openCV_Basique = '' +
        ' <category name="Open CV (Basic)"  colour="' + Blockly.Msg.drissOpenCV_HUE + '">' +
        '<block type="driss_opencv_getColor"></block>' +
        '<block type="driss_opencv_getcolor_hsv"></block>' +
        /*
        '<block type="driss_opencv_getVideoCapture">'+
        '   <value name="NUM_CAMERA">'+
        '       <block type="math_number">'+
        '           <field name="NUM">0</field>'+
        '       </block>'+
        '   </value>'+
        '</block>'+
        */
        '<block type="driss_opencv_capturer_flux_video"></block>' +
        '<block type="driss_opencv_waitKey"></block>' +
        //'<block type="driss_opencv_readFrameFromCapture"></block>'+
        //'<block type="driss_opencv_read_image_form_video"></block>'+
        '<block type="driss_opencv_read_store_image_form_video"></block>' +

        '<block type="driss_opencv_changeColorometrie_RGB_to_HSV"></block>' +
        '<block type="driss_opencv_blurImage">' +
        '   <value name="KSIZE">' +
        '       <shadow type="math_number">' +
        '           <field name="KSIZE">7</field>' +
        '       </shadow>' +
        '   </value>' +
        '</block>' +

        '<block type="driss_opencv_inRange"></block>' +
        '<block type="driss_opencv_inRange_one_colore"></block>' +

        '<block type="driss_opencv_eroderImage">' +
        '   <value name="ER_IT">' +
        '       <shadow type="math_number">' +
        '           <field name="ER_IT">30</field>' +
        '       </shadow>' +
        '   </value>' +
        '</block>' +
        '<block type="driss_opencv_dilaterImage">' +
        '   <value name="DI_IT">' +
        '       <shadow type="math_number">' +
        '           <field name="DI_IT">11</field>' +
        '       </shadow>' +
        '   </value>' +
        '</block>' +
        '<block type="driss_opencv_bitwise"></block>' +
        '<block type="driss_opencv_bitwise_simple"></block>' +
        '<block type="driss_opencv_contour_masque"></block>' +
        '<block type="driss_opencv_marquage"></block>' +
        '<block type="driss_opencv_show_image"></block>' +

        '<block type="driss_opencv_release"></block>' +

        '</category>';
    return (openCV_Basique);

}

//La catégorie OpenCV 2 --------------------------------------------------------------------------------------------------------------

function buildCategory_OpenCV2_Commun() {
    openCV2_Commun = '' +
        '<category name="Communs"  colour="30">' +
        /*
        '<block type="driss_opencv2_add_trackbar"></block>' +
        '<block type="driss_opencv2_draw_n_sliders"></block>'+
        */
        '<block type="driss_opencv2_waitKey"></block>' +
        '<block type="driss_opencv2_wait_this_key_pressed"></block>' +
        '<block type="driss_opencv2_waitKey_val"></block>' +
        '<block type="driss_opencv2_if_keypressed_is"></block>' +
        '<block type="driss_opencv2_get_keypressed_in_var"></block>' +

        '<block type="driss_opencv2_find_hsv_color_of_object"></block>' +
        '<block type="driss_opencv2_find_seuils_canny"></block>' +
        
        '</category>';
    return (openCV2_Commun);
}

function buildCategory_OpenCV2_TeachableMachine() {
    teachableMachine = '' +
        '<category name="Teachable Machine"  colour="' + Blockly.Msg.drissOpenCV_HUE + '">' +
        '<block type="driss_opencv2_tm_load_model">' +
        '   <value name="MODEL_FILE"><shadow type="text"><field name="TEXT">C:/..../keras_Model.h5</field></shadow></value>' +
        '   <value name="LABELS_FILE"><shadow type="text"><field name="TEXT">C:/..../labels.txt</field></shadow></value>' +
        '</block>' +
        '<block type="driss_opencv2_tm_lancer_reconnaissance_objet"></block>' +
        '<block type="driss_opencv2_tm_categorie_objet"></block>' +
        '<block type="driss_opencv2_tm_score_reconnaissance"></block>' +


        '<block type="driss_opencv2_video_capture_from_cam">' +
        '   <value name="NUM_CAM"><shadow type="math_number"><field name="NUM_CAM">0</field></shadow></value>' +
        '</block>' +
        '<block type="driss_opencv2_cv_next_frame"></block>' +
        '<block type="driss_opencv2_cv_show_frame">' +
        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        '</block>' +
        '<block type="driss_opencv2_vc_release"></block>' +
        '<block type="driss_opencv2_vc_destroy_all_windows"></block>' +
        '<block type="driss_opencv2_vc_destroy_this_window">' +
        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_tm_write_texte_simple">' +
        '   <value name="TEXT"><shadow type="text"><field name="TEXT">Texte à écrire</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_tm_write_texte">' +
        '   <value name="TEXT"><shadow type="text"><field name="TEXT">Texte à écrire</field></shadow></value>' +
        '   <value name="POS_X"><shadow type="math_number"><field name="NUM">50</field></shadow></value>' +
        '   <value name="POS_Y"><shadow type="math_number"><field name="NUM">50</field></shadow></value>' +
        '   <value name="COLOR"><shadow type="driss_opencv2_color_HEX">#FF0000</shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_tm_key_pressed"></block>' +
        '</category>';

    return (teachableMachine);
}

function buildCategory_OpenCV2_Standard() {
    openCV2_Standard = '' +
        '<category name="Programmes utiles"  colour="' + Blockly.Msg.drissOpenCV_HUE + '">' +
        //'<block type="driss_opencv2_std_inrange"></block>' +
        '<block type="driss_opencv2_prog_get_parametres_tracking">' +
        '   <value name="NUM_CAM"><shadow type="math_number"><field name="NUM_CAM">0</field></shadow></value>' +
        '</block>' +
        '</category>';
    return (openCV2_Standard);

}

function buildCategory_OpenCV2_HaarCascade() {
    openCV2_HaarCascade = '' +
        '<category name="Haar Cascade"  colour="' + Blockly.Msg.drissOpenCV_HUE + '">' +
        '<block type="driss_opencv2_hc_cascade_classifier">' +
        '   <value name="CASCADE_FILE"><shadow type="text"><field name="NUM">Fichier cascade</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_hc_detect_multiScale">' +
        '   <value name="NEIBHORS"><shadow type="math_number">3</shadow></value>' +
        '   <value name="SCALE_FACTOR"><shadow type="math_number">1.2</shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_hc_encadrer_objet">' +
        '   <value name="THICKNESS"><shadow type="math_number">2</shadow></value>' +
        '   <value name="COLOR"><shadow type="driss_opencv2_color_HEX">#FF0000</shadow></value>' +
        '</block>' +
        /*
        '<block type="driss_opencv2_hc_google_classifier">' +
        '   <value name="MODELES"><shadow type="text">Modèles</shadow></value>' +
        '   <value name="LABELS"><shadow type="text">Labels</shadow></value>' +
        '</block>' +
        */
        '</category>';
    return (openCV2_HaarCascade);

}

function buildCategory_OpenCV2_ImagesStatiques() {
    openCV2_ImagesStatiques = '' +
        '<category name="Images statiques"  colour="' + Blockly.Msg.drissOpenCV_HUE + '">' +
        '<block type="driss_opencv2_color_RGB"></block>' +
        '<block type="driss_opencv2_color_BGR"></block>' +
        '<block type="driss_opencv2_color_HEX"></block>' +
        '<block type="driss_opencv2_color_HSV"></block>' +
        '<block type="driss_opencv2_set_rgb_bgr_color">' +
        '   <value name="B"><shadow type="math_number"><field name="NUM">125</field></shadow></value>' +
        '   <value name="G"><shadow type="math_number"><field name="NUM">125</field></shadow></value>' +
        '   <value name="R"><shadow type="math_number"><field name="NUM">125</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_set_hsv_color">' +
        '   <value name="H"><shadow type="math_number"><field name="NUM">125</field></shadow></value>' +
        '   <value name="S"><shadow type="math_number"><field name="NUM">125</field></shadow></value>' +
        '   <value name="V"><shadow type="math_number"><field name="NUM">125</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_new_image">' +
        '   <value name="WIDTH"><shadow type="math_number"><field name="NUM">320</field></shadow></value>' +
        '   <value name="HEIGHT"><shadow type="math_number"><field name="NUM">240</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_imread">' +
        '   <value name="IMAGE_FILE"><shadow type="text"><field name="TEXT">chemin et nom du fichier</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_image_show">' +
        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_waitKey"></block>' +

        '<block type="driss_opencv2_draw_rectangle"></block>' +
        '<block type="driss_opencv2_draw_circle"></block>' +
        '<block type="driss_opencv2_draw_ligne"></block>' +

        '<block type="driss_opencv2_draw_forme">' +
        '   <value name="X1"><shadow type="math_number"><field name="NUM">0</field></shadow></value>' +
        '   <value name="Y1"><shadow type="math_number"><field name="NUM">0</field></shadow></value>' +
        '   <value name="X2"><shadow type="math_number"><field name="NUM">100</field></shadow></value>' +
        '   <value name="Y2"><shadow type="math_number"><field name="NUM">100</field></shadow></value>' +
        '   <value name="RAYON"><shadow type="math_number"><field name="NUM">50</field></shadow></value>' +
        '   <value name="THICKNESS"><shadow type="math_number"><field name="NUM">2</field></shadow></value>' +
        '   <value name="COLOR"><shadow type="driss_opencv2_color_HEX">#FF0000</shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_put_text">' +
        '   <value name="TEXT"><shadow type="text"><field name="TEXT">Texte à écrire</field></shadow></value>' +
        '   <value name="POS_X"><shadow type="math_number"><field name="NUM">50</field></shadow></value>' +
        '   <value name="POS_Y"><shadow type="math_number"><field name="NUM">50</field></shadow></value>' +
        '   <value name="COLOR"><shadow type="driss_opencv2_color_HEX">#FF0000</shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_image_grayscale"></block>' +
        '<block type="driss_opencv2_image_convert_color_space"></block>' +
        '<block type="driss_opencv2_image_blur"></block>' +
        '<block type="driss_opencv2_image_canny2"></block>' +
        '<block type="driss_opencv2_image_canny">' +
        '   <value name="THRESHOLD_1"><shadow type="math_number"><field name="NUM">50</field></shadow></value>' +
        '   <value name="THRESHOLD_2"><shadow type="math_number"><field name="NUM">50</field></shadow></value>' +
        '</block>' +
        '<block type="driss_opencv2_image_dilate"></block>' +
        '<block type="driss_opencv2_image_erode"></block>' +

        '<block type="driss_opencv2_image_resize">' +
        '   <value name="WIDTH"><shadow type="math_number"><field name="NUM">320</field></shadow></value>' +
        '   <value name="HEIGHT"><shadow type="math_number"><field name="NUM">240</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_image_resize_2">' +
        '   <value name="FX"><shadow type="math_number"><field name="NUM">1</field></shadow></value>' +
        '   <value name="FY"><shadow type="math_number"><field name="NUM">1</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_image_cropped">' +
        '   <value name="X1"><shadow type="math_number"><field name="NUM">10</field></shadow></value>' +
        '   <value name="Y1"><shadow type="math_number"><field name="NUM">10</field></shadow></value>' +
        '   <value name="X2"><shadow type="math_number"><field name="NUM">50</field></shadow></value>' +
        '   <value name="Y2"><shadow type="math_number"><field name="NUM">50</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_translate_image">' +
        '   <value name="TRANS_X"><shadow type="math_number"><field name="NUM">100</field></shadow></value>' +
        '   <value name="TRANS_Y"><shadow type="math_number"><field name="NUM">100</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_rotate_image">' +
        '   <value name="ANGLE"><shadow type="math_number"><field name="NUM">100</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_flip_image"></block>' +

        '<block type="driss_opencv2_split_image_chanel"></block>' +
        '<block type="driss_opencv2_merge_image_chanel"></block>' +
        '<block type="driss_opencv2_bitwise"></block>' +

        '<block type="driss_opencv2_inrange"></block>' +

        '<block type="driss_opencv2_find_list_of_all_contours"></block>' +

        '<block type="driss_opencv2_find_contours"></block>' +
        '<block type="driss_opencv2_contour_area"></block>' +
        '<block type="driss_opencv2_contour_perim"></block>' +
        '<block type="driss_opencv2_contour_polly"></block>' +
        '<block type="driss_opencv2_draw_contours"></block>' +
        '<block type="driss_opencv2_encadrer_forme"></block>' +

        '<block type="driss_opencv2_show_infos_contour"></block>' +

        '<block type="driss_opencv2_add_trackbar"></block>' +
        '<block type="driss_opencv2_waitKey_val"></block>' +

        '<block type="driss_opencv2_named_window">' +
        '   <value name="WINDOW_TITLE"><shadow type="text"><field name="TEXT">Titre</field></shadow></value>' +
        '</block>' +

        '</category>';
    return (openCV2_ImagesStatiques);

}


function buildCategory_OpenCV2_ImagesImmatriculation() {
    openCV2_ImagesStatiques = '' +
        '<category name="Plaque d\'immatriculation"  colour="' + Blockly.Msg.drissOpenCV_HUE + '">' +
        
        //'<block type="driss_opencv2_get_text_immatriculation"></block>' +
        '<block type="driss_opencv2_waitKey"></block>' +
        '<block type="driss_opencv2_if_keypressed_is"></block>' +

        '<block type="driss_opencv2_video_capture_from_cam">' +
        '   <value name="NUM_CAM"><shadow type="math_number"><field name="NUM_CAM">0</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_vc_release"></block>' +

        '<block type="driss_opencv2_vc_destroy_all_windows"></block>' +
        '<block type="driss_opencv2_vc_destroy_this_window">' +
        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_cv_next_frame"></block>' +

        '<block type="driss_opencv2_imread">' +
        '   <value name="IMAGE_FILE"><shadow type="text"><field name="TEXT">chemin et nom du fichier</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_image_show">' +
        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_redim_image"></block>' +

        '<block type="text_print"></block>' +

        '<block type="driss_opencv2_get_taux_confiance_lecture_immatriculation"></block>' +

        '<block type="driss_opencv2_trouver_contour_immatriculation"></block>' +
        '<block type="driss_opencv2_ocr_sur_plaque_immatriculation"></block>' +

        

        '<block type="driss_opencv2_convert_image_color_space"></block>' +

        '<block type="driss_opencv2_appliquer_flou"></block>' +

        '<block type="driss_opencv2_detecter_contours"></block>' +

        '<block type="driss_opencv2_get_liste_contours"></block>' +

        '<block type="driss_opencv2_classer_contours"></block>' +

        '<block type="driss_opencv2_get_nbre_contours"></block>' +
        '<block type="driss_opencv2_get_contour"></block>' +

        '<block type="driss_opencv2_draw_this_contour"></block>' +

        '<block type="driss_opencv2_read_text_in_this_contour"></block>' +

        '<block type="driss_opencv2_write_legend_contour"></block>' +
        

        
        '</category>';
    return (openCV2_ImagesStatiques);

}


function buildCategory_OpenCV2_reconnaissance_faciale() {
    openCV2_ImagesStatiques = '' +
        '<category name="Reconnaissance faciale"  colour="' + Blockly.Msg.drissOpenCV_HUE + '">' +

        '<block type="driss_opencv2_waitKey"></block>' +
        '<block type="driss_opencv2_if_keypressed_is"></block>' +

        '<block type="driss_opencv2_video_capture_from_cam">' +
        '   <value name="NUM_CAM"><shadow type="math_number"><field name="NUM_CAM">0</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_vc_release"></block>' +

        '<block type="driss_opencv2_vc_destroy_all_windows"></block>' +
        '<block type="driss_opencv2_vc_destroy_this_window">' +
        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_cv_next_frame"></block>' +

        '<block type="driss_opencv2_imread">' +
        '   <value name="IMAGE_FILE"><shadow type="text"><field name="TEXT">chemin et nom du fichier</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_image_show">' +
        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_save_photo">' +
        '   <value name="FILE_NAME"><shadow type="text"><field name="TEXT">nom du fichier</field></shadow></value>' +
        '   <value name="FOLDER_NAME"><shadow type="text"><field name="TEXT">dossier de destination</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_identifier_visages_references">' +
        '   <value name="FOLDER"><shadow type="text"><field name="TEXT">Dossier des photos références</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_do_face_recognition">' +
        '   <value name="PHOTO"><shadow type="text"><field name="TEXT">Photo à traiter</field></shadow></value>' +
        '</block>' +

        // '<block type="driss_opencv2_marquer_visages_reconnus">' +
        // '   <value name="PHOTO"><shadow type="text"><field name="TEXT">Photo sur laquelle chercher les visages</field></shadow></value>' +
        // '</block>'+

        '<block type="driss_opencv2_nombre_visages_reconnus"></block>' +

        //'<block type="driss_opencv2_show_reconized_faces_in_frame"></block>' +


        // '<block type="driss_opencv2_marquer_visages_reconnus">' +
        // '   <value name="PICTURE"><shadow type="text"><field name="TEXT">Photo sur laquelle chercher les visages</field></shadow></value>' +
        // '</block>'+
        

        // '<block type="driss_opencv2_load_all_photos_from_folder">' +
        // '   <value name="FOLDER"><shadow type="text"><field name="TEXT">chemin et nom du dossier</field></shadow></value>' +
        // '</block>' +
    
        '<block type="driss_opencv2_nom_visage_reconnu">' +
        '   <value name="PICTURE"><shadow type="text"><field name="TEXT">Photo sur laquelle chercher un visage connu</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_filename_visage_reconnu">' +
        '   <value name="PICTURE"><shadow type="text"><field name="TEXT">Photo</field></shadow></value>' +
        '</block>' +

        
        
        

        '</category>';
    return (openCV2_ImagesStatiques);

}

function buildCategory_OpenCV2_FluxVideo() {
    openCV2_FluxVideo = '' +
        '<category name="Flux vidéo"  colour="' + Blockly.Msg.drissOpenCV_HUE + '">' +

        '<block type="driss_opencv2_vc_from_file">' +
        '   <value name="VIDEO_FILE"><shadow type="text"><field name="TEXT">chemin et nom du fichier</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_video_capture_from_cam">' +
        '   <value name="NUM_CAM"><shadow type="math_number"><field name="NUM_CAM">0</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_vc_release"></block>' +
        '<block type="driss_opencv2_vc_destroy_all_windows"></block>' +
        '<block type="driss_opencv2_vc_destroy_this_window">' +
        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_rescale_frame"></block>' +
        '<block type="driss_opencv2_vc_change_resolution">' +
        '   <value name="CAPTURE_WIDTH"><shadow type="math_number"><field name="NUM">640</field></shadow></value>' +
        '   <value name="CAPTURE_HEIGHT"><shadow type="math_number"><field name="NUM">480</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_cv_next_frame"></block>' +
        '<block type="driss_opencv2_cv_show_frame">' +
        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_waitKey"></block>' +
        '<block type="driss_opencv2_waitKey_val"></block>' +

        '<block type="driss_opencv2_begin_video_capture"></block>' +
        '<block type="driss_opencv2_release_video_capture"></block>' +

        '</category>';
    return (openCV2_FluxVideo);

}

function buildCategory_OpenCV2_TrackingObject() {
    trackingObjects = '' +
        '<category name="Tracking d\'objets"  colour="' + Blockly.Msg.drissOpenCV_HUE + '">' +

        '<block type="driss_opencv2_video_capture_fixer_dimensions"></block>' +

        '<block type="driss_opencv2_getcolor_hsv"></block>' +

        '<block type="driss_opencv2_trackingobjects_entourer_un_objet">' +
        '   <value name="HSV_LO_COLOR"><shadow type="driss_opencv2_getcolor_hsv">#FF0000</shadow></value>' +
        '   <value name="HSV_HI_COLOR"><shadow type="driss_opencv2_getcolor_hsv">#FF0000</shadow></value>' +
        '</block > ' +

        '<block type="driss_opencv2_trackingobjects_entourer_tous_les_objets">' +
        '   <value name="HSV_LO_COLOR"><shadow type="driss_opencv2_getcolor_hsv">#FF0000</shadow></value>' +
        '   <value name="HSV_HI_COLOR"><shadow type="driss_opencv2_getcolor_hsv">#FF0000</shadow></value>' +
        '</block > ' +

        '<block type="driss_opencv2_video_capture_from_cam">' +
        '   <value name="NUM_CAM"><shadow type="math_number"><field name="NUM_CAM">0</field></shadow></value>' +
        '</block>' +
        '<block type="driss_opencv2_cv_next_frame"></block>' +
        '<block type="driss_opencv2_cv_show_frame">' +
        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        '</block>' +
        '<block type="driss_opencv2_vc_release"></block>' +
        '<block type="driss_opencv2_vc_destroy_all_windows"></block>' +
        '<block type="driss_opencv2_vc_destroy_this_window">' +
        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_tm_key_pressed"></block>' +

        /*
        //les codes de ces 2 blocs sont encore actifs das driss.openCV2.js
        '<block type="driss_opencv2_trackingobjects_setcolorrange">' +
        '   <value name="LO_COLOR"><shadow type="driss_opencv2_getcolor_hsv">#FF0000</shadow></value>' +
        '   <value name="HI_COLOR"><shadow type="driss_opencv2_getcolor_hsv">#FF0000</shadow></value>' +
        '</block>' +

        '<block type="driss_opencv2_trackingobjects_setcolorrange_2"></block>' +
        */
        '</category>';

    return (trackingObjects);
}


function buildCategory_OpenCv2() {
    openCV2 = '' +
        '<category name="Open CV2"  colour="' + Blockly.Msg.drissOpenCV_HUE + '">' +
        //Catégorie OpenCV2 -> Standard
        //buildCategory_OpenCV2_Standard() +

        //Catégorie OpenCV2 -> Commun
        buildCategory_OpenCV2_Commun() +

        //Catégorie OpenCV2 -> Teachable Machine
        buildCategory_OpenCV2_TeachableMachine() +

        //Catégorie OpenCV2 ->Tracking d'objets
        buildCategory_OpenCV2_TrackingObject() +

        //Catégorie OpenCV2 -> Haar Cascade
        buildCategory_OpenCV2_HaarCascade() +

        //Catégorie OpenCV2 -> Images Statiques
        buildCategory_OpenCV2_ImagesStatiques() +

        //Catégorie OpenCV2 -> Lecture plaque d'Immatriculation
        //buildCategory_OpenCV2_ImagesImmatriculation() +

        //Catégorie OpenCV2 -> Reconnaissance faciale
        //buildCategory_OpenCV2_reconnaissance_faciale()+

        //Catégorie OpenCV2 -> Flux vidéo
        buildCategory_OpenCV2_FluxVideo() +
        '</category>'

    return (openCV2);
}




//Les Catégories Standards  --------------------------------------------------------------------------------------------------------------

function buildCategory_Boucles() {
    boucles = '' +
        '<category name="Boucles" colour="' + Blockly.Blocks.loops.HUE + '">' +
        '<block type="controls_repeat_ext"></block>' +
        '<block type="controls_repeat"></block>' +
        '<block type="controls_whileUntil"></block>' +
        '<block type="controls_while"></block>' +
        '<block type="controls_for"></block>' +
        '<block type="controls_forEach"></block>' +
        '<block type="controls_pass"></block>' +
        '<block type="controls_flow_statements"></block>' +
        '</category>';

    return (boucles);
}

function buildCategory_Logique() {
    logique = '' +
        '<category name="Logique" colour="' + Blockly.Blocks.logic.HUE + '">' +
        '<block type="controls_if"></block>' +
        '<block type="logic_compare"></block>' +
        '<block type="logic_operation"></block>' +
        '<block type="logic_negate"></block>' +
        '<block type="logic_boolean"></block>' +
        '<block type="logic_null"></block>' +
        '<block type="logic_ternary"></block>' +
        '<block type="logic_isIn"></block>' +
        '</category>';

    return (logique);
}

function buildCategory_Calculs() {
    calculs = '' +
        '<category name="Calcul" colour="' + Blockly.Blocks.math.HUE + '">' +
        '<block type="math_number"></block>' +
        '<block type="math_arithmetic"></block>' +
        '<block type="math_single"></block>' +
        '<block type="math_trig"></block>' +
        '<block type="math_constant"></block>' +
        '<block type="math_number_property"></block>' +
        '<block type="math_change"></block>' +
        '<block type="math_round"></block>' +
        '<block type="math_on_list"></block>' +
        '<block type="math_modulo"></block>' +
        '<block type="math_constrain"></block>' +
        '<block type="math_random_int"></block>' +
        '<block type="math_random_float"></block>' +
        '</category>';
    return (calculs);
}

function buildCategory_Listes() {
    listes = '' +
        '<category name="Liste" colour="' + Blockly.Blocks.lists.HUE + '">' +
        '<block type="lists_create_empty"></block>' +
        '<block type="lists_create_with"></block>' +
        '<block type="lists_repeat"></block>' +
        '<block type="lists_length"></block>' +
        '<block type="lists_isEmpty"></block>' +
        '<block type="lists_indexOf"></block>' +
        '<block type="lists_index"></block>' +
        '<block type="lists_getIndex"></block>' +
        '<block type="lists_setIndex"></block>' +
        '<block type="lists_getSublist"></block>' +
        '<block type="lists_sort"></block>' +
        '<block type="lists_split"></block>' +
        '<block type="lists_append"></block>' +
        '</category>';
    return (listes);
}

function buildCategory_Textes() {
    textes = '' +
        '<category name="Texte" colour="' + Blockly.Blocks.texts.HUE + '">' +
        '<block type="text"></block>' +
        '<block type="text_join"></block>' +

        '<block type="text_append"></block>' +
        '<block type="text_length"></block>' +
        '<block type="text_isEmpty"></block>' +
        '<block type="text_indexOf"></block>' +
        '<block type="text_charAt"></block>' +
        '<block type="text_getSubstring"></block>' +
        '<block type="text_changeCase"></block>' +
        '<block type="text_trim"></block>' +
        '<block type="text_print"></block>' +
        '<block type="text_prompt_ext"></block>' +
        '<block type="text_prompt"></block>' +
        '</category>';
    return (textes);
}

function buildCategory_Variables() {
    variables = '' +
        '<category name="Variables" custom="VARIABLE" colour="' + Blockly.Blocks.variables.HUE + '">' +
        '</category>';
    return (variables);
}

function buildCategory_Fonctions() {
    fonctions = '' +
        '<category name="Fonctions"  colour="' + Blockly.Blocks.procedures.HUE + '">' +
        '<block type="procedures_defreturn"></block>' +
        '<block type="procedures_defnoreturn"></block>' +
        '<block type="procedures_ifreturn"></block>' +
        '<block type="procedures_return"></block>' +
        '</category>';
    return (fonctions);
}

function buildCategory_Inputs() {
    inputs = '' +
        '<category name="Saisis clavier"  colour="' + Blockly.Msg.drissInputs_HUE + '">' +
        '<block type="driss_inputs_keyPressed"></block>' +
        //'<block type=""></block>'+
        '</category>';
    return (inputs);
}


//La catégorie Machine Learning --------------------------------------------------------------------------------------------------------------

function buildCategory_MachineLearning_ApprentissageSupervise() {
    ml_AppSupervise = '' +
        '<category name="Apprentissage supervisé"  colour="' + Blockly.Msg.drissML_HUE + '">' +
        
        '<block type="driss_createRandomDataSet"></block>' +
        '<block type="driss_afficherNuagePoint"></block>' +

        '<block type="driss_setRandomParam"></block>' +

        '<block type="driss_drawModel"></block>' +
        '<block type="driss_fonctionCout"></block>' +
        '<block type="driss_executeAlgorithmeDescenteGradient"></block>' +
        '<block type="driss_getOptimisedParam"></block>' +

        '<block type="driss_getModelResult"></block>' +

        '<block type="driss_executeAlgorithmeDescenteGradient"></block>' +

        '</category>';

    return (ml_AppSupervise);
}

function buildCategory_MachineLearning_ReseauDeNeuronnes() {
    ml_reseauNeuronnes = '' +
        '<category name="Reseau de Neurones"  colour="' + Blockly.Msg.drissML_HUE + '">' +

        '</category>';
    return (ml_reseauNeuronnes);
}

function buildCategory_MachineLearning() {
    machineLearning = '' +
        '<category name="Machine Learning"  colour="' + Blockly.Msg.drissML_HUE + '">' +
        //Catégorie MachineLearning -> Apprentissage Supervisé
        buildCategory_MachineLearning_ApprentissageSupervise() +

        //Catégorie MachineLearning -> Reseau de neuronnes
        buildCategory_MachineLearning_ReseauDeNeuronnes() +

        '</category>';

    return (machineLearning);
}


function buildCategory_Yolo(){
    yolo = '' +
        '<category name="Yolo (sera supprimé)"  colour="' + Blockly.Msg.drissML_HUE + '">' +

          '<block type="driss_yolo_lancer_une_prediction"></block>' +

          '<block type="driss_yolo_importer_model_pre_entraine">'+
          '   <value name="MODEL_PATH"><shadow type="text"><field name="TEXT">chemin et nom du fichier</field></shadow></value>' +
          '</block>' +

          //'<block type="driss_yolo_afficher_classes_du_model"></block>' +
          '<block type="driss_yolo_filtrer_par_classe_et_conf"></block>' +

          '<block type="driss_yolo_marquer_les_predictions"></block>' +

          //'<block type="driss_yolo_marquer_toutes_les_predictions"></block>' +

          '<block type="driss_opencv2_imread">' +
          '   <value name="IMAGE_FILE"><shadow type="text"><field name="TEXT">chemin et nom du fichier</field></shadow></value>' +
          '</block>' +

          '<block type="driss_opencv2_image_show">' +
          '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
          '</block>' +
       
          '<block type="driss_opencv2_waitKey"></block>' +
        '</category>';
    return (yolo);
}


function buildCategory_Detection(){
    detection = '' +
        '<category name="Détection"  colour="' + Blockly.Msg.drissML_HUE + '">' +
        
          
          '<block type="driss_ia_detection_charger_modele_yolo11_coco" ></block>'+
          '<block type="driss_ia_detection_charger_modele_retinanet_coco"></block>'+
          '<block type="driss_ia_detection_charger_modele_faster_r_cnn"></block>'+

          '<block type="driss_ia_detection_charger_modele_peaufine">'+
          '   <value name="MODEL_PATH"><shadow type="text"><field name="TEXT">chemin et nom du fichier contenant le modèle IA </field></shadow></value>' +
          '</block>' +

          '<block type="driss_ia_detection_get_predictions_of_class">'+
          '   <value name="CLASS_TO_DETECT"><shadow type="text"><field name="TEXT">nom de la classe à détecter</field></shadow></value>' +
          '</block>' +
        
          '<block type="driss_ia_detection_draw_bbox_et_infos"></block>' +
          '<block type="driss_ia_detection_bbox_options">' +
          '   <value name="CLASS_NAME"><shadow type="text"><field name="TEXT">nom de la classe</field></shadow></value>' +
          '   <value name="DISPLAY_LABEL"><shadow type="text"><field name="TEXT">Nom pour l\'affichage</field></shadow></value>' +
          '</block>' +
          

        //   '<block type="driss_ia_detection_draw_complete_bbox"></block>' +


        //   '<block type="driss_ia_detection_charger_modele_ia">'+
        //   '   <value name="MODEL_PATH"><shadow type="text"><field name="TEXT">chemin et nom du fichier contenant le modèle IA </field></shadow></value>' +
        //   '</block>' +

        //   '<block type="driss_ia_detection_detecter_classe">'+
        //   '   <value name="CLASS_TO_DETECT"><shadow type="text"><field name="TEXT">nom de la classe à détecter</field></shadow></value>' +
        //   '</block>' +

          //'<block type="driss_yolo_afficher_classes_du_model"></block>' +
        //   '<block type="driss_yolo_filtrer_par_classe_et_conf"></block>' +

        //   '<block type="driss_yolo_marquer_les_predictions"></block>' +

        //   //'<block type="driss_yolo_marquer_toutes_les_predictions"></block>' +

        //   '<block type="driss_opencv2_imread">' +
        //   '   <value name="IMAGE_FILE"><shadow type="text"><field name="TEXT">chemin et nom du fichier</field></shadow></value>' +
        //   '</block>' +

        //   '<block type="driss_opencv2_image_show">' +
        //   '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>' +
        //   '</block>' +

          '<block type="driss_opencv2_vc_destroy_all_windows"></block>' +
       
          '<block type="driss_opencv2_waitKey"></block>' +
        '</category>'+


        '<category name="Gestes"  colour="' + Blockly.Msg.drissML_HUE + '">' +
          '<block type="driss_ia_geste_is_geste"></block>' +
        '</category>';

    return (detection);
}



function buildCategory_IA() {
    openCV2 = '' +
        '<category name="IA"  colour="' + Blockly.Msg.drissOpenCV_HUE + '">' +

        //Catégorie IA -> Lecture plaque d'Immatriculation
        buildCategory_OpenCV2_ImagesImmatriculation() +

        //Catégorie IA -> Reconnaissance faciale
        buildCategory_OpenCV2_reconnaissance_faciale()+
        
        buildCategory_Detection() +

        '</category>'

    return (openCV2);
}

function buildCategory_ArduinoUno() {
    arduinoUno = '' +
        '<category name="Arduino Uno"  colour="' + Blockly.Msg.drissML_HUE + '">' +
        //Capteurs


        //Actionneurs
        '<block type="driss_grove_red_led"></block>' +
        '<block type="driss_grove_button"></block>' +
        

        //Afficheurs

        '</category>';
    return (arduinoUno);
}






/**
 * Maps short category names in the toolbox to the full XML used to
 * represent that category as usual. This is kind of a clunky mechanism
 * for managing the different categories, and doesn't allow us to specify
 * individual blocks.
 */

BlockPyEditor.CATEGORY_MAP = {
    'Boucles': buildCategory_Boucles(),
    'Logique': buildCategory_Logique(),
    'Calculs': buildCategory_Calculs(),
    'Lists': buildCategory_Listes(),
    'Textes': buildCategory_Textes(),
    'Variables': buildCategory_Variables(),
    'Functions': buildCategory_Fonctions(),
    'Inputs': buildCategory_Inputs(),

    'Separator': '<sep></sep>',

    //'MachineLearning': buildCategory_MachineLearning(),

    //'OpenCV': buildCategory_OpenCV_Basic(),

    'Separator': '<sep></sep>',

    'OpenCV2': buildCategory_OpenCv2(),

    'Separator': '<sep></sep>',

    'Yolo': buildCategory_Yolo(),
    'IA': buildCategory_IA(),

    'Separator': '<sep></sep>',

    'Arduino Uno': buildCategory_ArduinoUno(),

    /*
    'Classes': '<category name="Classes" colour="210">'+
                    '<block type="class_creation"></block>'+
                    '<block type="class_creation">'+
                        '<mutation value="k"></mutation>'+
                    '</block>'+
                '</category>',
    
    'Python':   '<category name="Python" colour="180">'+
                    '<block type="raw_block"></block>'+
                    '<block type="raw_expression"></block>'+
                '</category>',
    */

};

/**
 * Creates an updated representation of the Toolboxes XML as currently specified in the
 * model, using whatever modules have been added or removed. This method can either set it
 * or just retrieve it for future use.
 *
 * @param {Boolean} only_set - Whether to return the XML string or to actually set the XML. False means that it will not update the toolbox!
 * @returns {String?} Possibly returns the XML of the toolbox as a string.
 */
BlockPyEditor.prototype.updateToolbox = function (only_set) {
    //alert("updateToolbox");
    var xml = '<xml id="toolbox" style="display: none">';
    var modules = ['Logique', 'Boucles', 'Calculs', 'Lists', 'Textes', 'Inputs', 'Variables', 'Functions', 'OpenCV', 'OpenCV2', 'Yolo', 'IA',
        'Arduino Uno'
        //'Iteration','Decisions','Calculation','Lists',
        //'Classes', 
        //'Python'
    ];
    var started_misc = false,
        started_values = false,
        started_data = false,
        started_funcVar = false,
        started_openCV = false,
        started_ia = false,
        started_yolo = false,
        started_arduino = false;

    for (var i = 0, length = modules.length; i < length; i = i + 1) {
        var module = modules[i];
        //var a= ['Calculation', 'Lists', 'OpenCV', 'MachineLearning'].indexOf(module)
        //alert(module +'   '+ a)

        if (!started_misc && ['Logique', 'Boucles', 'Calculs'].indexOf(module) != -1) {
            started_misc = true;
            xml += BlockPyEditor.CATEGORY_MAP['Separator'];
        }

        if (!started_values && ['Lists', 'Textes', 'Inputs'].indexOf(module) != -1) {
            started_values = true;
            xml += BlockPyEditor.CATEGORY_MAP['Separator'];
        }

        if (!started_funcVar && ['Variables', 'Functions'].indexOf(module) != -1) {
            started_funcVar = true;
            xml += BlockPyEditor.CATEGORY_MAP['Separator'];
        }

        if (!started_openCV && ['OpenCV', 'OpenCV2'].indexOf(module) != -1) {
            started_openCV = true;
            xml += BlockPyEditor.CATEGORY_MAP['Separator'];
        }

        
        if (!started_arduino && ['Arduino Uno'].indexOf(module) != -1) {
            started_arduino = true;
            xml += BlockPyEditor.CATEGORY_MAP['Separator'];
        }

        if (!started_ia && ['IA'].indexOf(module) != -1) {
            started_ia = true;
            xml += BlockPyEditor.CATEGORY_MAP['Separator'];
        }

        if (!started_yolo && ['Yolo'].indexOf(module) != -1) {
            started_yolo = true;
            xml += BlockPyEditor.CATEGORY_MAP['Separator'];
        }
        /*
        if (!started_data && module.slice(0, 6) == 'Data -') {
            started_data = true;
            xml += BlockPyEditor.CATEGORY_MAP['Separator'];
        }
        */

        if (typeof module == 'string') {

            xml += BlockPyEditor.CATEGORY_MAP[module];
        } else {
            var category = '<category name="' + module.name + '" colour="' + module.color + '">';
            for (var j = 0; category_length = module.blocks.length; j = j + 1) {
                var block = module.blocks[j];
                category += '<block type="' + block + '"></block>';
            }
            category += '</category>';
        }
        //'<sep></sep>'+
    }
    xml += '</xml>';

    if (only_set) {
        this.blockly.updateToolbox(xml);
        this.blockly.resize();
    } else {
        return xml;
    }
};


/*Ajouts Driss */
/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
BlockPyEditor.saveXmlFile = function () {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var data = Blockly.Xml.domToPrettyText(xml);
    var datenow = Date.now();
    var uri = 'data:text/xml;charset=utf-8,' + encodeURIComponent(data);

    $(this).attr({
        'download': "blockPy@col_" + datenow + ".xml",
        'href': uri,
        'target': '_blank'
    });
};


/**
 // * Load blocks from local file.
 */

BlockPyEditor.load = function (event) {
    var files = event.target.files;
    // Only allow uploading one file.
    if (files.length != 1) {
        return;
    }

    // FileReader
    var reader = new FileReader();
    reader.onloadend = function (event) {
        var target = event.target;
        // 2 == FileReader.DONE
        if (target.readyState == 2) {
            try {
                var xml = Blockly.Xml.textToDom(target.result);

            } catch (e) {
                var xmlError = "Impossible de charger le fichier de sauvegarde.  Peut être a t-il été créé avec une autre version de Blockly ?";
                alert(xmlError + '\n' + e);
                return;
            }
            var count = Blockly.mainWorkspace.getAllBlocks().length;
            var xmlLoad = "Voulez-vous remplacer les blocs actuels ?\n 'Annuler' les fera fusionner.";
            if (count && confirm(xmlLoad)) {
                Blockly.mainWorkspace.clear();
            }
            //$('#tab_blocks').tab('show');
            Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
            //BlockPyEditor.selectedTab = 'blocks';
            //BlockPyEditor.renderContent();
        }
        // Reset value of input after loading because Chrome will not fire
        // a 'change' event if the same file is loaded again.
        $('#load').val('');
    };
    //alert(files[0].name);
    reader.readAsText(files[0]);

};


/*
 *  Store the blocks for the duration of the reload.
 */
BlockPyEditor.backupBlocks = function () {
    if (typeof Blockly != 'undefined' && window.localStorage) {
        var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        //var xml = Blockly.Xml.workspaceToDom(BlockPyEditor.workspace);
        var text = Blockly.Xml.domToText(xml);
        window.localStorage.loadOnceBlocks = text;
    }
};


/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * 
 * @param {string}
 *            defaultXml Text representation of default blocks.
 */
BlockPyEditor.loadBlocks = function (defaultXml) {
    //alert(5);
    if (defaultXml) {
        // Load the editor with default starting blocks.
        var xml = Blockly.Xml.textToDom(defaultXml);
        Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
    } else {
        var loadOnce = null;
        try {
            loadOnce = window.localStorage.loadOnceBlocks;
        } catch (e) {
            // Firefox sometimes throws a SecurityError when accessing
            // localStorage.
            // Restarting Firefox fixes this, so it looks like a bug.
        }
        if (loadOnce != null) {
            // Language switching stores the blocks during the reload.
            delete window.localStorage.loadOnceBlocks;
            var xml = Blockly.Xml.textToDom(loadOnce);
            Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);

            // ⏱ Laisser Blockly finir le rendu, puis recentrer
            setTimeout(function () {
                        //Blockly.mainWorkspace.zoomToFit();
                        Blockly.mainWorkspace.scrollCenter();
                        }, 0);


        }
    }
};

BlockPyEditor.clearLocalStorage = function () {
    alert("clearLocalStorage");
    window.removeEventListener('unload', BlockPyEditor.backupBlocks, false);
    localStorage.clear();
};




BlockPyEditor.renderPythonCodePreview = function () {
    $('#pre_previewPython').text(Blockly.Python.workspaceToCode(Blockly.mainWorkspace));
    if (typeof prettyPrintOne == 'function') {
        $('#pre_previewPython').html(prettyPrintOne($('#pre_previewPython').html(), 'py'));
    }
};




/**
 * Try to take a screen capture of all blocks on workspace
 * Thanks to fontaine.jp from forum http://blockly.technologiescollege.fr/forum/index.php/topic,128.msg635.html#new
 *
 */
BlockPyEditor.workspace_capture = function () {
    var ws = Blockly.mainWorkspace.svgBlockCanvas_.cloneNode(true);
    ws.removeAttribute("width");
    ws.removeAttribute("height");
    ws.removeAttribute("transform");
    var styleElem = document.createElementNS("http://www.w3.org/2000/svg", "style");
    styleElem.textContent = Blockly.Css.CONTENT.join('');
    ws.insertBefore(styleElem, ws.firstChild);
    var bbox = Blockly.mainWorkspace.svgBlockCanvas_.getBBox();
    var canvas = document.createElement("canvas");
    canvas.width = Math.ceil(bbox.width + 10);
    canvas.height = Math.ceil(bbox.height + 10);
    var ctx = canvas.getContext("2d");
    var xml = new XMLSerializer().serializeToString(ws);
    xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + bbox.width + '" height="' + bbox.height + '" viewBox="' + bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height + '"><rect width="100%" height="100%" fill="white"></rect>' + xml + '</svg>';
    var img = new Image();
    img.setAttribute("src", 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(xml))));
    img.onload = function () {
        ctx.drawImage(img, 5, 5);
        var canvasdata = canvas.toDataURL("image/png", 1);
        var datenow = Date.now();
        var a = document.createElement("a");
        a.download = "capture" + datenow + ".png";
        a.href = canvasdata;
        document.body.appendChild(a);
        a.click();
    }
};


/**
 * Undo/redo functions
 */
BlockPyEditor.Undo = function () {
    Blockly.mainWorkspace.undo(0);
};
BlockPyEditor.Redo = function () {
    Blockly.mainWorkspace.undo(1);
};




//Toggle blocks picture :

// ----------------------------------------------------
// Gestion de l'affichage des images dans les blocs
// ----------------------------------------------------
 BlockPyEditor.showBlockImages = true;          // Images visibles par défaut
 BlockPyEditor._isApplyingImages = false;       // Anti-boucle interne

/**
 * Applique l'état actuel (afficher/cacher) sur tous les FieldImage
 * de tous les blocs du workspace.
 */
BlockPyEditor.applyBlockImagesVisibility = function () {
    var workspace = BlockPyEditor.workspace || Blockly.getMainWorkspace();
    if (!workspace) {
        console.warn("[applyBlockImagesVisibility] Workspace non initialisé.");
        return;
    }

    if (BlockPyEditor._isApplyingImages) {
        return;
    }

    BlockPyEditor._isApplyingImages = true;

    var allBlocks = workspace.getAllBlocks(false);

    allBlocks.forEach(function (block) {
        var needsRender = false;

        block.inputList.forEach(function (input) {
            input.fieldRow.forEach(function (field) {

                if (field instanceof Blockly.FieldImage) {

                    // Sauvegarde de la taille d'origine une seule fois
                    if (!field._originalSize) {
                        field._originalSize = {
                            width: field.size_.width,
                            height: field.size_.height
                        };
                    }

                    if (BlockPyEditor.showBlockImages) {
                        // Mode "images affichées"
                        field.setVisible(true);
                        if (field._originalSize) {
                            field.size_.width  = field._originalSize.width;
                            field.size_.height = field._originalSize.height;
                        }
                    } else {
                        // Mode "images cachées"
                        field.setVisible(false);
                        field.size_.width  = 0;
                        field.size_.height = 0;
                    }

                    needsRender = true;
                }

            });
        });

        if (needsRender && block.rendered) {
            block.render();
        }
    });

    BlockPyEditor._isApplyingImages = false;
};

/**
 * Inverse l'état (afficher/cacher les images) et
 * applique immédiatement la modification aux blocs.
 */
BlockPyEditor.toggleBlockImages = function () {
    BlockPyEditor.showBlockImages = !BlockPyEditor.showBlockImages;

    $('#icon_btn_eye')
        .toggleClass('glyphicon-eye-open', BlockPyEditor.showBlockImages)
        .toggleClass('glyphicon-eye-close', !BlockPyEditor.showBlockImages);

    console.log(
        "[toggleBlockImages]",
        BlockPyEditor.showBlockImages ? "Images AFFICHÉES" : "Images CACHÉES"
    );

    BlockPyEditor.applyBlockImagesVisibility();
};






var dropdownKeyAlphaMinus = [["a", "a"], ["b", "b"], ["c", "c"], ["d", "d"], ["e", "e"], ["f", "f"], ["g", "g"], ["h", "h"], ["i", "i"],
["j", "j"], ["k", "k"], ["l", "l"], ["m", "m"], ["n", "n"], ["o", "o"], ["p", "p"], ["q", "q"], ["r", "r"], ["s", "s"],
["t", "t"], ["u", "u"], ["v", "v"], ["w", "w"], ["x", "x"], ["y", "y"], ["z", "z"]
];
var dropdownKeyFunction = [["", ""], ["Maj", "MAJ"], ["Ctrl", "CTRL"], ["Alt", "ALT"]];
BlockPyEditor.getDropDownKeysAlpha = function () {
    return dropdownKeyAlphaMinus;
}

BlockPyEditor.getDropDownKeysFunction = function () {
    return dropdownKeyFunction;
}


/*Fin Ajouts Driss */