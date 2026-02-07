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
      this.setColour(285);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['driss_yolo_marquer_les_predictions'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Encadrer dans l'image")
          .appendField(new Blockly.FieldVariable("item"), "VAR_IMAGE")
          .appendField(" les prédictions")
          .appendField(new Blockly.FieldVariable("item"), "VAR_PREDICTIONS");
      this.appendDummyInput()
          .appendField("qui ont un taux de confiance >=")
          .appendField(new Blockly.FieldNumber(0, 0.25, 0.98, 0.01), "CONFIANCE");
      this.appendDummyInput()
          .appendField("Encadrer en ")
          .appendField(new Blockly.FieldColour("#009900"), "COLOR");
          //.appendField(" et attribuer à ces prédictions l'étiquette ")
          //.appendField(new Blockly.FieldTextInput("nom"), "CLASS_NAME");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(285);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

