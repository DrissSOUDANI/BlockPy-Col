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
    Blockly.WorkspaceSvg.prototype.preloadAudio_ = function() {};
    
    // Initialize subcomponents
    this.initText();
    this.initBlockly();
    
    //SERVONO SOLO INIZIALMENTE
    this.updateBlocksFromModel();
    this.updateTextFromModel();
    
}

/**
 * Initializes the Blockly instance (handles all the blocks). This includes
 * attaching a number of ChangeListeners that can keep the internal code
 * representation updated and enforce type checking.
 */
BlockPyEditor.prototype.initBlockly = function() {
    //alert("initBlockly");
    this.blockly = Blockly.inject(this.blocklyDiv[0],
                                  { grid:
                                    {	spacing: 20,
                                      length: 2,
                                      colour: '#ccc',
                                      snap: true},
                                      sounds : true,
                                      
                                      zoom:
                                          {controls: true,
                                          wheel: true},
                                      
                                    path: "blockly/", 
                                    media : "./media/",
                                    scrollbars: true, 
                                    //zoom: {enabled: true},
                                    oneBasedIndex: false,
                                    comments: false,
                                    toolbox: this.updateToolbox(false)});

    // Register model changer
   
    var editor = this;
    this.blockly.addChangeListener(function(evt) {
        //alert("eventListener");
        editor.updateBlocks();
    });
    

    window.addEventListener('unload', BlockPyEditor.backupBlocks, false);

    $('#btn_saveXML').on("click", BlockPyEditor.saveXmlFile);
    $('#load').on("change", BlockPyEditor.load);
    $('#btn_loadXML').on("click", function() {
		$('#load').click();
	});

    $('#btn_preview').on("click", function() {
		$("#toggle").toggle("slide");
	});
	$('#pre_previewPython').on("click", function() { 
		$("#toggle").toggle("slide");
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
			// Restarting Firefox fixes this, so it looks like a bug.
		}

        
    BlockPyEditor.loadBlocks();

    var clipboard = new Clipboard('#btn_CopyCode');

    // Force the proper window size
    this.blockly.resize();
    
};

/**
 * Initializes the CodeMirror instance. This handles text editing (with syntax highlighting)
 * and also attaches a listener for change events to update the internal code represntation.
 */
BlockPyEditor.prototype.initText = function() {
    //alert("initText");
    // Register model changer
    var editor = this;
    $('.codemirror-div').keyup(function() {
        //alert("change");
        editor.updateText();
    });

};


/**
 * Actually changes the value of the CodeMirror instance
 *
 * @param {String} code - The new code for the CodeMirror
 */
BlockPyEditor.prototype.setText = function(code) {
    //alert("setText");
    if (code == undefined || code.trim() == "") {
        $('.codemirror-div').val("\n");
    } else {
        $('.codemirror-div').val(code);
    }
}

BlockPyEditor.prototype.setBlocks = function(python_code) {
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

BlockPyEditor.prototype.clearDeadBlocks = function() {
    //alert("clearDeadBlocks");
    var all_blocks = this.blockly.getAllBlocks();
    all_blocks.forEach(function(elem) {
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
BlockPyEditor.prototype.updateBlocks = function() {
    //alert("updateBlocks");
    if (! this.silenceBlock) {
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
BlockPyEditor.prototype.updateText = function() {
    //alert("updateText");
    if (! this.silenceText) {
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
BlockPyEditor.prototype.resetBlockSilence = function() {
    //alert("resetBlockSilence");
    var editor = this;
    if (editor.silenceBlockTimer != null) {
        clearTimeout(editor.silenceBlockTimer);
    }
    this.silenceBlockTimer = window.setTimeout(function() {
        editor.silenceBlock = false;
        editor.silenceBlockTimer = null;
    }, 40);
};

/**
 * Updates the text editor from the current code file in the
 * model. Might be prevented if an update event was already
 * percolating.
 */
BlockPyEditor.prototype.updateTextFromModel = function() {
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
BlockPyEditor.prototype.updateBlocksFromModel = function() {
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
BlockPyEditor.prototype.getBlocksFromXml = function() {
    //alert("getBlocksFromXml");
    return Blockly.Xml.workspaceToDom(this.blockly);
}
        
/**
 * Helper function for setting the current Blockly workspace to
 * whatever XML DOM is given. This clears out any existing blocks.
 */
BlockPyEditor.prototype.setBlocksFromXml = function(xml) {
    //alert("setBlocksFromXml");
    Blockly.Xml.domToWorkspaceDestructive(xml, this.blockly);
}


/**
 * Maps short category names in the toolbox to the full XML used to
 * represent that category as usual. This is kind of a clunky mechanism
 * for managing the different categories, and doesn't allow us to specify
 * individual blocks.
 */
BlockPyEditor.CATEGORY_MAP = {
    'Boucles': '<category name="Boucles" colour="'+Blockly.Blocks.loops.HUE+'">'+
                    '<block type="controls_repeat_ext"></block>'+
                    '<block type="controls_repeat"></block>'+
                    '<block type="controls_whileUntil"></block>'+
                    '<block type="controls_while"></block>'+
                    '<block type="controls_for"></block>'+
                    '<block type="controls_forEach"></block>'+
                    '<block type="controls_pass"></block>'+
                    '<block type="controls_flow_statements"></block>'+
                '</category>',
    'Logique':  '<category name="Logique" colour="'+Blockly.Blocks.logic.HUE+'">'+
                    '<block type="controls_if"></block>'+
                    '<block type="logic_compare"></block>'+
                    '<block type="logic_operation"></block>'+
                    '<block type="logic_negate"></block>'+
                    '<block type="logic_boolean"></block>'+
                    '<block type="logic_null"></block>'+
                    '<block type="logic_ternary"></block>'+
                    '<block type="logic_isIn"></block>'+
                '</category>',
    'Calculs':  '<category name="Calcul" colour="'+Blockly.Blocks.math.HUE+'">'+
                    '<block type="math_number"></block>'+
                    '<block type="math_arithmetic"></block>'+
                    '<block type="math_single"></block>'+
                    '<block type="math_trig"></block>'+
                    '<block type="math_constant"></block>'+
                    '<block type="math_number_property"></block>'+
                    '<block type="math_change"></block>'+
                    '<block type="math_round"></block>'+
                    '<block type="math_on_list"></block>'+
                    '<block type="math_modulo"></block>'+
                    '<block type="math_constrain"></block>'+
                    '<block type="math_random_int"></block>'+
                    '<block type="math_random_float"></block>'+
                '</category>',
    'Lists':     '<category name="Liste" colour="'+Blockly.Blocks.lists.HUE+'">'+
                    '<block type="lists_create_empty"></block>'+
                    '<block type="lists_create_with"></block>'+
                    '<block type="lists_repeat"></block>'+
                    '<block type="lists_length"></block>'+
                    '<block type="lists_isEmpty"></block>'+
                    '<block type="lists_indexOf"></block>'+
                    '<block type="lists_index"></block>'+
                    '<block type="lists_getIndex"></block>'+
                    '<block type="lists_setIndex"></block>'+
                    '<block type="lists_getSublist"></block>'+
                    '<block type="lists_sort"></block>'+
                    '<block type="lists_split"></block>'+
                    '<block type="lists_append"></block>'+
                '</category>',
    'Textes':   '<category name="Texte" colour="'+Blockly.Blocks.texts.HUE+'">'+
                    '<block type="text"></block>'+
                    '<block type="text_join"></block>'+
                    
                    '<block type="text_append"></block>'+
                    '<block type="text_length"></block>'+
                    '<block type="text_isEmpty"></block>'+
                    '<block type="text_indexOf"></block>'+
                    '<block type="text_charAt"></block>'+
                    '<block type="text_getSubstring"></block>'+
                    '<block type="text_changeCase"></block>'+
                    '<block type="text_trim"></block>'+
                    '<block type="text_print"></block>'+
                    '<block type="text_prompt_ext"></block>'+
                    '<block type="text_prompt"></block>'+
                '</category>',

    'Variables':'<category name="Variables" custom="VARIABLE" colour="'+Blockly.Blocks.variables.HUE+'">'+
                '</category>',
    
    'Functions':'<category name="Fonctions"  colour="'+Blockly.Blocks.procedures.HUE+'">'+
                    '<block type="procedures_defreturn"></block>'+
                    '<block type="procedures_defnoreturn"></block>'+
                    '<block type="procedures_ifreturn"></block>'+
                    '<block type="procedures_return"></block>'+
                '</category>',

    'Inputs':'  <category name="Saisis clavier"  colour="'+Blockly.Msg.drissInputs_HUE+'">'+
                    '<block type="driss_inputs_keyPressed"></block>'+
                    //'<block type=""></block>'+
                '</category>',

    'OpenCV': ' <category name="Open CV (driss)"  colour="'+Blockly.Msg.drissOpenCV_HUE+'">'+
                    '<block type="driss_opencv_getColor"></block>'+
                    '<block type="driss_opencv_getcolor_hsv"></block>'+
                    /*
                    '<block type="driss_opencv_getVideoCapture">'+
                    '   <value name="NUM_CAMERA">'+
                    '       <block type="math_number">'+
                    '           <field name="NUM">0</field>'+
                    '       </block>'+
                    '   </value>'+
                    '</block>'+
                    */
                    '<block type="driss_opencv_capturer_flux_video"></block>'+
                    '<block type="driss_opencv_waitKey"></block>'+
                    //'<block type="driss_opencv_readFrameFromCapture"></block>'+
                    //'<block type="driss_opencv_read_image_form_video"></block>'+
                    '<block type="driss_opencv_read_store_image_form_video"></block>'+

                    '<block type="driss_opencv_changeColorometrie_RGB_to_HSV"></block>'+
                    '<block type="driss_opencv_blurImage">'+
                    '   <value name="KSIZE">'+
                    '       <shadow type="math_number">'+
                    '           <field name="KSIZE">7</field>'+
                    '       </shadow>'+
                    '   </value>'+
                    '</block>'+

                    '<block type="driss_opencv_inRange"></block>'+
                    '<block type="driss_opencv_inRange_one_colore"></block>'+

                    '<block type="driss_opencv_eroderImage">'+
                    '   <value name="ER_IT">'+
                    '       <shadow type="math_number">'+
                    '           <field name="ER_IT">30</field>'+
                    '       </shadow>'+
                    '   </value>'+
                    '</block>'+
                    '<block type="driss_opencv_dilaterImage">'+
                    '   <value name="DI_IT">'+
                    '       <shadow type="math_number">'+
                    '           <field name="DI_IT">11</field>'+
                    '       </shadow>'+
                    '   </value>'+
                    '</block>'+
                    '<block type="driss_opencv_bitwise"></block>'+
                    '<block type="driss_opencv_bitwise_simple"></block>'+
                    '<block type="driss_opencv_contour_masque"></block>'+
                    '<block type="driss_opencv_marquage"></block>'+
                    '<block type="driss_opencv_show_image"></block>'+

                
                    '<block type="driss_opencv_release"></block>'+
                
                '</category>',
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

    'Separator': '<sep></sep>',
    'OpenCV2':'  <category name="Open CV2"  colour="'+Blockly.Msg.drissInputs_HUE+'">'+
                    '<category name="Standard"  colour="'+Blockly.Msg.drissInputs_HUE+'">'+
                        '<block type="driss_opencv2_std_inrange"></block>'+
                    '</category>'+

                    '<category name="Intermédiaire"  colour="'+Blockly.Msg.drissInputs_HUE+'">'+
                        
                    '</category>'+

                    '<category name="Communs"  colour="30">'+
                        '<block type="driss_opencv2_add_trackbar"></block>'+
                        '<block type="driss_opencv2_waitKey"></block>'+
                        '<block type="driss_opencv2_waitKey_val"></block>'+
                    '</category>'+


                    '<category name="Haar cascade"  colour="'+Blockly.Msg.drissInputs_HUE+'">'+
                        '<block type="driss_opencv2_hc_cascade_classifier">'+
                        '   <value name="CASCADE_FILE"><shadow type="text"><field name="NUM">Fichier cascade</field></shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_hc_detect_multiScale">'+
                        '   <value name="NEIBHORS"><shadow type="math_number">3</shadow></value>'+
                        '   <value name="SCALE_FACTOR"><shadow type="math_number">1.2</shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_hc_encadrer_objet">'+
                        '   <value name="THICKNESS"><shadow type="math_number">2</shadow></value>'+
                        '   <value name="COLOR"><shadow type="driss_opencv2_color_HEX">#FF0000</shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_hc_google_classifier">'+
                        '   <value name="MODELES"><shadow type="text">Modèles</shadow></value>'+
                        '   <value name="LABELS"><shadow type="text">Labels</shadow></value>'+
                        '</block>'+

                    '</category>'+

                    '<category name="Images statiques"  colour="'+Blockly.Msg.drissInputs_HUE+'">'+
                        '<block type="driss_opencv2_color_RGB"></block>'+
                        '<block type="driss_opencv2_color_BGR"></block>'+
                        '<block type="driss_opencv2_color_HEX"></block>'+
                        '<block type="driss_opencv2_color_HSV"></block>'+
                        '<block type="driss_opencv2_set_rgb_bgr_color">'+
                        '   <value name="B"><shadow type="math_number"><field name="NUM">125</field></shadow></value>'+
                        '   <value name="G"><shadow type="math_number"><field name="NUM">125</field></shadow></value>'+
                        '   <value name="R"><shadow type="math_number"><field name="NUM">125</field></shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_set_hsv_color">'+
                        '   <value name="H"><shadow type="math_number"><field name="NUM">125</field></shadow></value>'+
                        '   <value name="S"><shadow type="math_number"><field name="NUM">125</field></shadow></value>'+
                        '   <value name="V"><shadow type="math_number"><field name="NUM">125</field></shadow></value>'+
                        '</block>'+
                        
                    
                        '<block type="driss_opencv2_new_image">'+
                        '   <value name="WIDTH"><shadow type="math_number"><field name="NUM">320</field></shadow></value>'+
                        '   <value name="HEIGHT"><shadow type="math_number"><field name="NUM">240</field></shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_imread">'+
                        '   <value name="IMAGE_FILE"><shadow type="text"><field name="TEXT">chemin et nom du fichier</field></shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_image_show">'+
                        '   <value name="TITLE_WINDOW"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>'+
                        '</block>'+
                        
                        '<block type="driss_opencv2_waitKey"></block>'+

                        '<block type="driss_opencv2_draw_rectangle"></block>'+
                        '<block type="driss_opencv2_draw_circle"></block>'+
                        '<block type="driss_opencv2_draw_ligne"></block>'+


                        '<block type="driss_opencv2_draw_forme">'+
                        '   <value name="X1"><shadow type="math_number"><field name="NUM">0</field></shadow></value>'+
                        '   <value name="Y1"><shadow type="math_number"><field name="NUM">0</field></shadow></value>'+
                        '   <value name="X2"><shadow type="math_number"><field name="NUM">100</field></shadow></value>'+
                        '   <value name="Y2"><shadow type="math_number"><field name="NUM">100</field></shadow></value>'+
                        '   <value name="RAYON"><shadow type="math_number"><field name="NUM">50</field></shadow></value>'+
                        '   <value name="THICKNESS"><shadow type="math_number"><field name="NUM">2</field></shadow></value>'+
                        '   <value name="COLOR"><shadow type="driss_opencv2_color_HEX">#FF0000</shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_put_text">'+
                        '   <value name="TEXT"><shadow type="text"><field name="TEXT">Texte à écrire</field></shadow></value>'+
                        '   <value name="POS_X"><shadow type="math_number"><field name="NUM">50</field></shadow></value>'+
                        '   <value name="POS_Y"><shadow type="math_number"><field name="NUM">50</field></shadow></value>'+
                        '   <value name="COLOR"><shadow type="driss_opencv2_color_HEX">#FF0000</shadow></value>'+
                        '</block>'+
                        

/*
                        '<block type="driss_opencv2_draw_rectangle_2">'+
                        '   <value name="LEFT"><shadow type="math_number"><field name="NUM">0</field></shadow></value>'+
                        '   <value name="TOP"><shadow type="math_number"><field name="NUM">0</field></shadow></value>'+
                        '   <value name="RIGHT"><shadow type="math_number"><field name="NUM">100</field></shadow></value>'+
                        '   <value name="BOTTOM"><shadow type="math_number"><field name="NUM">100</field></shadow></value>'+
                        '   <value name="THICKNESS"><shadow type="math_number"><field name="NUM">2</field></shadow></value>'+
                        '   <value name="COLOR"><shadow type="driss_opencv2_color_HEX"><field name="NUM">#FF0000</field></shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_draw_circle_2">'+
                        '   <value name="CENTRE_X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>'+
                        '   <value name="CENTRE_Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>'+
                        '   <value name="RAYON"><shadow type="math_number"><field name="NUM">100</field></shadow></value>'+
                        '   <value name="THICKNESS"><shadow type="math_number"><field name="NUM">2</field></shadow></value>'+
                        '   <value name="COLOR"><shadow type="driss_opencv2_color_HEX"><field name="NUM">#FF0000</field></shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_draw_ligne_2">'+
                        '   <value name="X1"><shadow type="math_number"><field name="NUM">0</field></shadow></value>'+
                        '   <value name="Y1"><shadow type="math_number"><field name="NUM">0</field></shadow></value>'+
                        '   <value name="X2"><shadow type="math_number"><field name="NUM">100</field></shadow></value>'+
                        '   <value name="Y2"><shadow type="math_number"><field name="NUM">100</field></shadow></value>'+
                        '   <value name="THICKNESS"><shadow type="math_number"><field name="NUM">2</field></shadow></value>'+
                        '   <value name="COLOR"><shadow type="driss_opencv2_color_HEX"><field name="NUM">#FF0000</field></shadow></value>'+
                        '</block>'+

*/
                        '<block type="driss_opencv2_image_grayscale"></block>'+ 
                        '<block type="driss_opencv2_image_convert_color_space"></block>'+ 
                        '<block type="driss_opencv2_image_blur"></block>'+  
                        '<block type="driss_opencv2_image_canny2"></block>'+
                        '<block type="driss_opencv2_image_canny">'+
                        '   <value name="THRESHOLD_1"><shadow type="math_number"><field name="NUM">50</field></shadow></value>'+
                        '   <value name="THRESHOLD_2"><shadow type="math_number"><field name="NUM">50</field></shadow></value>'+
                        '</block>'+
                        '<block type="driss_opencv2_image_dilate"></block>'+
                        '<block type="driss_opencv2_image_erode"></block>'+
                        

                        '<block type="driss_opencv2_image_resize">'+
                        '   <value name="WIDTH"><shadow type="math_number"><field name="NUM">320</field></shadow></value>'+
                        '   <value name="HEIGHT"><shadow type="math_number"><field name="NUM">240</field></shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_image_resize_2">'+
                        '   <value name="FX"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'+
                        '   <value name="FY"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'+
                        '</block>'+
                       
                        '<block type="driss_opencv2_image_cropped">'+
                        '   <value name="X1"><shadow type="math_number"><field name="NUM">10</field></shadow></value>'+
                        '   <value name="Y1"><shadow type="math_number"><field name="NUM">10</field></shadow></value>'+
                        '   <value name="X2"><shadow type="math_number"><field name="NUM">50</field></shadow></value>'+
                        '   <value name="Y2"><shadow type="math_number"><field name="NUM">50</field></shadow></value>'+
                        '</block>'+



                        '<block type="driss_opencv2_translate_image">'+
                        '   <value name="TRANS_X"><shadow type="math_number"><field name="NUM">100</field></shadow></value>'+
                        '   <value name="TRANS_Y"><shadow type="math_number"><field name="NUM">100</field></shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_rotate_image">'+
                        '   <value name="ANGLE"><shadow type="math_number"><field name="NUM">100</field></shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_flip_image"></block>'+

                        '<block type="driss_opencv2_split_image_chanel"></block>'+
                        '<block type="driss_opencv2_merge_image_chanel"></block>'+
                        '<block type="driss_opencv2_bitwise"></block>'+


                        '<block type="driss_opencv2_inrange"></block>'+

                        '<block type="driss_opencv2_find_contours"></block>'+
                        '<block type="driss_opencv2_contour_area"></block>'+
                        '<block type="driss_opencv2_contour_perim"></block>'+
                        '<block type="driss_opencv2_contour_polly"></block>'+
                        '<block type="driss_opencv2_draw_contours"></block>'+
                        '<block type="driss_opencv2_encadrer_forme"></block>'+

                        '<block type="driss_opencv2_show_infos_contour"></block>'+
                        
                        


                        '<block type="driss_opencv2_add_trackbar"></block>'+
                        '<block type="driss_opencv2_waitKey_val"></block>'+ 

                        '<block type="driss_opencv2_named_window">'+
                        '   <value name="WINDOW_TITLE"><shadow type="text"><field name="TEXT">Titre</field></shadow></value>'+
                        '</block>'+
                     
                    '</category>'+
                    '<category name="Flux vidéo"  colour="'+Blockly.Msg.drissInputs_HUE+'">'+
                    
                        '<block type="driss_opencv2_vc_from_file">'+
                        '   <value name="VIDEO_FILE"><shadow type="text"><field name="TEXT">chemin et nom du fichier</field></shadow></value>'+
                        '</block>'+

                        '<block type="driss_opencv2_video_capture_from_cam">'+
                        '   <value name="NUM_CAM"><shadow type="math_number"><field name="NUM_CAM">0</field></shadow></value>'+
                        '</block>'+

                        

                        //'<block type="driss_opencv2_vc_is_opened"></block>'+
                        //'<block type="driss_opencv2_vc_show_image"></block>'+
                        '<block type="driss_opencv2_vc_release"></block>'+
                        '<block type="driss_opencv2_vc_destroy_all_windows"></block>'+


                        '<block type="driss_opencv2_rescale_frame"></block>'+
                        '<block type="driss_opencv2_vc_change_resolution">'+
                        '   <value name="CAPTURE_WIDTH"><shadow type="math_number"><field name="NUM">640</field></shadow></value>'+
                        '   <value name="CAPTURE_HEIGHT"><shadow type="math_number"><field name="NUM">480</field></shadow></value>'+
                        '</block>'+


                        '<block type="driss_opencv2_cv_next_frame"></block>'+
                        '<block type="driss_opencv2_cv_show_frame">'+
                        '   <value name="WINDOW_TITLE"><shadow type="text"><field name="TEXT">Titre de la fenêtre</field></shadow></value>'+
                        '</block>'+

                        
                        '<block type="driss_opencv2_waitKey"></block>'+  
                        '<block type="driss_opencv2_waitKey_val"></block>'+  

                        '<block type="driss_opencv2_begin_video_capture"></block>'+
                        '<block type="driss_opencv2_release_video_capture"></block>'+
                            
                    '</category>'+
                
                '</category>',
    
    'Separator': '<sep></sep>'
    
};

/**
 * Creates an updated representation of the Toolboxes XML as currently specified in the
 * model, using whatever modules have been added or removed. This method can either set it
 * or just retrieve it for future use.
 *
 * @param {Boolean} only_set - Whether to return the XML string or to actually set the XML. False means that it will not update the toolbox!
 * @returns {String?} Possibly returns the XML of the toolbox as a string.
 */
BlockPyEditor.prototype.updateToolbox = function(only_set) {
    //alert("updateToolbox");
    var xml = '<xml id="toolbox" style="display: none">';
    var modules = ['Logique', 'Boucles', 'Calculs', 'Lists', 'Textes', 'Variables', 'Inputs', 'OpenCV', 'OpenCV2',
                    //'Iteration','Decisions','Calculation','Lists',
                     'Functions', 
                    //'Classes', 
                    //'Python'
                ];
    var started_misc = false,
        started_values = false,
        started_data = false;
    for (var i = 0, length = modules.length; i < length; i = i+1) {
        var module = modules[i];
        if (!started_misc && ['Calculation', 'Output', 'OpenCV'].indexOf(module) != -1) {
            started_misc = true;
            xml += BlockPyEditor.CATEGORY_MAP['Separator'];
        }
        if (!started_values && ['Values', 'Lists', 'Dictionaries', 'My Block'].indexOf(module) != -1) {
            started_values = true;
            xml += BlockPyEditor.CATEGORY_MAP['Separator'];
        }
        if (!started_data && module.slice(0, 6) == 'Data -') {
            started_data = true;
            xml += BlockPyEditor.CATEGORY_MAP['Separator'];
        }
        if (typeof module == 'string') {
            xml += BlockPyEditor.CATEGORY_MAP[module];
        } else {
            var category = '<category name="'+module.name+'" colour="'+module.color+'">';
            for (var j= 0; category_length = module.blocks.length; j = j+1) {
                var block = module.blocks[j];
                category += '<block type="'+block+'"></block>';
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
	            'download': "blockPy@col_"+datenow+".xml",
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
  reader.onloadend = function(event) {
    var target = event.target;
    // 2 == FileReader.DONE
    if (target.readyState == 2) {
      try {
        var xml = Blockly.Xml.textToDom(target.result);
        
      } catch (e) {
        var xmlError= "Impossible de charger le fichier de sauvegarde.  Peut être a t-il été créé avec une autre version de Blockly ?";
        alert(xmlError+'\n' + e);
        return;
      }
      var count = Blockly.mainWorkspace.getAllBlocks().length;
      var xmlLoad="Voulez-vous remplacer les blocs actuels ?\n 'Annuler' les fera fusionner.";
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
 BlockPyEditor.loadBlocks = function(defaultXml) {
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
		}
	}
};

BlockPyEditor.clearLocalStorage = function () {alert("clearLocalStorage");
	window.removeEventListener('unload', BlockPyEditor.backupBlocks, false);
	localStorage.clear();
};




 BlockPyEditor.renderPythonCodePreview = function() {
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
 BlockPyEditor.workspace_capture = function() {
	var ws = Blockly.mainWorkspace.svgBlockCanvas_.cloneNode(true);
	ws.removeAttribute("width");
	ws.removeAttribute("height");
	ws.removeAttribute("transform");
	var styleElem = document.createElementNS("http://www.w3.org/2000/svg", "style");
	styleElem.textContent = Blockly.Css.CONTENT.join('') ;
	ws.insertBefore(styleElem, ws.firstChild);
	var bbox = Blockly.mainWorkspace.svgBlockCanvas_.getBBox();
	var canvas = document.createElement( "canvas" );
	canvas.width = Math.ceil(bbox.width+10);
	canvas.height = Math.ceil(bbox.height+10);
	var ctx = canvas.getContext( "2d" );
	var xml = new XMLSerializer().serializeToString(ws);
	xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+bbox.width+'" height="'+bbox.height+'" viewBox="' + bbox.x + ' ' + bbox.y + ' '  + bbox.width + ' ' + bbox.height + '"><rect width="100%" height="100%" fill="white"></rect>'+xml+'</svg>';
	var img = new Image();
	img.setAttribute( "src", 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(xml))));
	img.onload = function() {
		ctx.drawImage( img, 5, 5 );
		var canvasdata = canvas.toDataURL("image/png",1);
		var datenow = Date.now();
		var a = document.createElement("a");
		a.download = "capture"+datenow+".png";
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


var dropdownKeyAlphaMinus = [ ["a", "a"], ["b", "b"], ["c", "c"], ["d", "d"], ["e", "e"], ["f", "f"], ["g", "g"], ["h", "h"], ["i", "i"], 
                        ["j", "j"], ["k", "k"], ["l", "l"], ["m", "m"], ["n", "n"], ["o", "o"], ["p", "p"], ["q", "q"], ["r", "r"], ["s", "s"],
                        ["t", "t"], ["u", "u"], ["v", "v"], ["w", "w"], ["x", "x"], ["y", "y"], ["z", "z"]
                    ];
var dropdownKeyFunction = [ ["", ""], ["Maj", "MAJ"] , ["Ctrl", "CTRL"], ["Alt", "ALT"] ];
BlockPyEditor.getDropDownKeysAlpha= function(){
	return dropdownKeyAlphaMinus;
}

BlockPyEditor.getDropDownKeysFunction = function(){
	return dropdownKeyFunction;
}

  
/*Fin Ajouts Driss */