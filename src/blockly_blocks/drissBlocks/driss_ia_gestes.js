Blockly.Blocks['driss_ia_geste_is_geste'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Le geste detecté dans l'image correspond à")
        .appendField(new Blockly.FieldVariable("item"), "VAR_GESTE");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};