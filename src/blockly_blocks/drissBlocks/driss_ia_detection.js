
Blockly.Blocks['driss_ia_detection_charger_modele_yolo11_coco'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Charger dans")
        .appendField(new Blockly.FieldDropdown([["MODELE_IA_1","MODELE_IA_1"], ["MODELE_IA_2","MODELE_IA_2"], ["MODELE_IA_3","MODELE_IA_3"]]), "MODEL_NAME");
    this.appendDummyInput()
        .appendField("Le modèle IA ")
        .appendField(new Blockly.FieldDropdown([["Yolo11n","YOLO11n"]]), "MODEL")
        .appendField("Entrainé avec le dataset COCO");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("Modèle IA entrainé avec le dataset COCO ( plus de 300 000 images) pour reconnaitre plus de 80 classes");
 this.setHelpUrl("");
  },
 onchange: function (ev) {
    //console.log(this.getFieldValue("MODEL_NAME"));
    switch(this.getFieldValue("MODEL_NAME")){
        case "MODELE_IA_1" : this.setColour(60); break;
        case "MODELE_IA_2" : this.setColour(90); break;
        case "MODELE_IA_3" : this.setColour(165); break;
    }
  }
};

Blockly.Blocks['driss_ia_detection_charger_modele_retinanet_coco'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Charger dans")
        .appendField(new Blockly.FieldDropdown([["MODELE_IA_1","MODELE_IA_1"], ["MODELE_IA_2","MODELE_IA_2"], ["MODELE_IA_3","MODELE_IA_3"]]), "MODEL_NAME")
    this.appendDummyInput()
        .appendField("Le modèle IA ")
        .appendField(new Blockly.FieldDropdown([["RetinaNet","RetinaNet"]]), "MODEL")
        .appendField("Entrainé avec le dataset COCO");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
 this.setTooltip("Modèle IA entrainé avec le dataset COCO ( plus de 300 000 images) pour reconnaitre plus de 80 classes");
 this.setHelpUrl("");
  },
 onchange: function (ev) {
    //console.log(this.getFieldValue("MODEL_NAME"));
    switch(this.getFieldValue("MODEL_NAME")){
        case "MODELE_IA_1" : this.setColour(60); break;
        case "MODELE_IA_2" : this.setColour(90); break;
        case "MODELE_IA_3" : this.setColour(165); break;
    }
  }
};


Blockly.Blocks['driss_ia_detection_charger_modele_faster_r_cnn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Charger dans")
        .appendField(new Blockly.FieldDropdown([["MODELE_IA_1","MODELE_IA_1"], ["MODELE_IA_2","MODELE_IA_2"], ["MODELE_IA_3","MODELE_IA_3"]]), "MODEL_NAME")
    this.appendDummyInput()
        .appendField("Le modèle IA ")
        .appendField(new Blockly.FieldDropdown([["Faster R-CNN","FASTER_R_CNN"]]), "MODEL")
        .appendField("Entrainé avec le dataset COCO");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
 this.setTooltip("Modèle IA entrainé avec le dataset COCO ( plus de 300 000 images) pour reconnaitre plus de 80 classes");
 this.setHelpUrl("");
  },
 onchange: function (ev) {
    //console.log(this.getFieldValue("MODEL_NAME"));
    switch(this.getFieldValue("MODEL_NAME")){
        case "MODELE_IA_1" : this.setColour(60); break;
        case "MODELE_IA_2" : this.setColour(90); break;
        case "MODELE_IA_3" : this.setColour(165); break;
    }
  }
};




Blockly.Blocks['driss_ia_detection_charger_modele_peaufine'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Charger dans")
        .appendField(new Blockly.FieldDropdown([["MODELE_IA_1","MODELE_IA_1"], ["MODELE_IA_2","MODELE_IA_2"], ["MODELE_IA_3","MODELE_IA_3"]]), "MODEL_NAME");
    this.appendDummyInput()
        .appendField("Le modèle IA de type ")
        .appendField(new Blockly.FieldDropdown([["Yolo11n","YOLO11N"], ["RetinaNet","RETINA_NET"], ["Faster R-CNN","FASTER_R_CNN"]]), "MODEL_TYPE")
        .appendField("Entrainé avec un dataset personnel");
    this.appendValueInput("MODEL_PATH")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Charger à partir du fichier");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
 this.setTooltip("Modèle IA entrainé avec un dataset personnel à reconnaitre une ou plusieurs classes");
 this.setHelpUrl("");
  },
 onchange: function (ev) {
    //console.log(this.getFieldValue("MODEL_NAME"));
    switch(this.getFieldValue("MODEL_NAME")){
        case "MODELE_IA_1" : this.setColour(60); break;
        case "MODELE_IA_2" : this.setColour(90); break;
        case "MODELE_IA_3" : this.setColour(165); break;
    }
  }
};



// Blockly.Blocks['driss_ia_detection_charger_modele_ia'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Charger dans ")
//         .appendField(new Blockly.FieldDropdown([["MODELE_IA_1","MODELE_IA_1"], ["MODELE_IA_2","MODELE_IA_2"], ["MODELE_IA_3","MODELE_IA_3"]]), "MODEL_NAME");
//     this.appendDummyInput()
//         .appendField("Le modèle IA de type  :")
//         .appendField(new Blockly.FieldDropdown([["Yolo11n (modèle de base)","YOLO11N_BASE"], ["Yolo11n (modèle peaufiné)","YOLO11N_FINE_TUNED"], ["RetinaNet (modèle de base)","RETINA_NET_BASE"], ["RetinaNet (modèle peaufiné)","RETINA_NET_FINE_TUNED"], ["SSD","SSD"]]), "MODEL_TYPE");
//     this.appendValueInput("MODEL_PATH")
//         .setCheck("String")
//         .setAlign(Blockly.ALIGN_RIGHT)
//         .appendField("contenu dans le fichier");
//     this.setInputsInline(false);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(75);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   },
//  onchange: function (ev) {
//     //console.log(this.getFieldValue("MODEL_NAME"));
//     switch(this.getFieldValue("MODEL_NAME")){
//         case "MODELE_IA_1" : this.setColour(60); break;
//         case "MODELE_IA_2" : this.setColour(90); break;
//         case "MODELE_IA_3" : this.setColour(165); break;
//     }
//   }
// };


// Blockly.Blocks['driss_ia_detection_detecter_classe'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Utiliser ")
//         .appendField(new Blockly.FieldDropdown([["MODELE_IA_1","MODELE_IA_1"], ["MODELE_IA_2","MODELE_IA_2"], ["MODELE_IA_3","MODELE_IA_3"]]), "MODEL_NAME");
//     this.appendValueInput("CLASS_TO_DETECT")
//         .setCheck("String")
//         .setAlign(Blockly.ALIGN_RIGHT)
//         .appendField("pour détecter dans l'image ")
//         .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
//         .appendField("Les objets de la classe");
//     this.setInputsInline(false);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(75);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   },
//  onchange: function (ev) {
//     //console.log(this.getFieldValue("MODEL_NAME"));
//     switch(this.getFieldValue("MODEL_NAME")){
//         case "MODELE_IA_1" : this.setColour(60); break;
//         case "MODELE_IA_2" : this.setColour(90); break;
//         case "MODELE_IA_3" : this.setColour(165); break;
//     }
//   }
// };


Blockly.Blocks['driss_ia_detection_get_predictions_of_class'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Détections de la (des) classe(s)")
        .appendField(new Blockly.FieldTextInput("nom_de_la_classe"), "CLASS_TO_DETECT");
    this.appendDummyInput()
        .appendField("dans l'image ")
        .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE");
    this.appendDummyInput()
        .appendField("par l'utilisation du modèle IA ")
        .appendField(new Blockly.FieldDropdown([["MODELE_IA_1","MODELE_IA_1"], ["MODELE_IA_2","MODELE_IA_2"], ["MODELE_IA_3","MODELE_IA_3"]]), "MODEL_NAME");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(75);
 this.setTooltip("");
 this.setHelpUrl("");
  },
 onchange: function (ev) {
    //console.log(this.getFieldValue("MODEL_NAME"));
    switch(this.getFieldValue("MODEL_NAME")){
        case "MODELE_IA_1" : this.setColour(60); break;
        case "MODELE_IA_2" : this.setColour(90); break;
        case "MODELE_IA_3" : this.setColour(165); break;
    }
  }
};

Blockly.Blocks['driss_ia_detection_draw_bbox_et_infos'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Encadrer dans l'image")
        .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE");
    this.appendDummyInput()
        .appendField("les prédictions contenu dans")
        .appendField(new Blockly.FieldVariable("variable"), "VAR_PREDICTIONS")
        .appendField("qui ont un taux de confiance >= ")
        .appendField(new Blockly.FieldNumber(0.5, 0.1, 1, 0.1), "CONFIANCE");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "SHOW_INFOS")
        .appendField("Afficher les informations")
        .appendField("(nombre de classes, durée de la détection)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_ia_detection_bbox_options'] = {
  init: function() {
    this.appendValueInput("CLASS_NAME")
        .setCheck("String")
        .appendField("Dessiner en ")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR")
        .appendField("les cadres de la classe");
    this.appendValueInput("DISPLAY_LABEL")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Label en")
        .appendField(new Blockly.FieldDropdown([["Haut à gauche","tl"], ["Bas à gauche","bl"], ["Haut à droite","tr"], ["Bas à droite","br"]]), "LABEL_CORNER")
        .appendField("avec le nom");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};








// Blockly.Blocks['driss_ia_detection_draw_complete_bbox'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Encadrer dans l'image")
//         .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
//         .appendField(",   les prédictions contenu dans")
//         .appendField(new Blockly.FieldVariable("variable"), "VAR_PREDICTIONS");
//     this.appendDummyInput()
//         .appendField("qui ont un taux de confiance >= ")
//         .appendField(new Blockly.FieldNumber(0.1, 0.1, 1, 0.1), "CONFIANCE")
//         .appendField("   -   Couleur du cadre : ")
//         .appendField(new Blockly.FieldColour("#009900"), "COLOR_1")
//         .appendField(new Blockly.FieldColour("#cc0000"), "COLOR_2")
//         .appendField(new Blockly.FieldColour("#ff6600"), "COLOR_3")
//         .appendField(new Blockly.FieldColour("#3366ff"), "COLOR_4");
//     this.appendDummyInput()
//         .appendField("Afficher :")
//         .appendField(new Blockly.FieldCheckbox("TRUE"), "CLASS_NAME")
//         .appendField("Le nom de classe et le taux de confiance en")
//         .appendField(new Blockly.FieldDropdown([["Haut à gauche","tl"], ["Bas à gauche","bl"], ["Haut à droite","tr"], ["Bas à droite","br"]]), "LABEL_CORNER");
//     this.appendDummyInput()
//         .appendField("              ")
//         .appendField(new Blockly.FieldCheckbox("TRUE"), "COUNT_DETECTIONS")
//         .appendField("Le nombre de détections en")
//         .appendField(new Blockly.FieldDropdown([["Haut à gauche","tl"], ["Bas à gauche","bl"], ["Haut à droite","tr"], ["Bas à droite","br"]]), "COUNT_CORNER");
//     this.appendDummyInput()
//         .appendField("              ")
//         .appendField(new Blockly.FieldCheckbox("TRUE"), "TIMELAPS")
//         .appendField("Le temps de détection en")
//         .appendField(new Blockly.FieldDropdown([["Haut à gauche","tl"], ["Bas à gauche","bl"], ["Haut à droite","tr"], ["Bas à droite","br"]]), "TIMELAPS_CORNER");
//     this.setInputsInline(false);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(0);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   },
//    onchange: function (ev) {
//     this.getFieldValue("LABEL_CORNER");
//     console.log(a);
//   }
// };




























Blockly.Blocks['driss_yolo_importer_model_pre_entraine'] = {
    init: function() {
        this.appendValueInput("MODEL_PATH")
            .setCheck(null)
            .appendField("Importer le modèle pré-entraîné");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
     this.setTooltip("");
     this.setHelpUrl("");
      }
};

Blockly.Blocks['driss_yolo_lancer_une_prediction'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Lancer une prédiction sur l'image")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE");
      this.appendDummyInput()
          .appendField("Taux de confiance minimal =  ")
          .appendField(new Blockly.FieldNumber(0, 0.25, 0.98, 0.01), "CONFIANCE");
      this.appendDummyInput()
          .appendField("Mettre les résultats de la prédiction dans ")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_RESULTATS");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(285);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

Blockly.Blocks['driss_yolo_afficher_classes_du_model'] = {
    
};

Blockly.Blocks['driss_yolo_filtrer_par_classe_et_conf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Prédictions de la  classe")
          .appendField(new Blockly.FieldNumber(0, 0, 80, 1), "CLASSE")
          .appendField("contenues dans ")
          .appendField(new Blockly.FieldVariable("item"), "VAR_RESULTATS");
      this.appendDummyInput()
          .appendField("et qui ont un taux de confiance >=")
          .appendField(new Blockly.FieldNumber(0, 0.25, 0.98, 0.01), "CONFIANCE");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(75);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };


