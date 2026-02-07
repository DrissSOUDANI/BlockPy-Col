/**
 * @license
 * Visual Blocks Editor 
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Les blocs pour Inputs
 * @author Driss Soudani
 */
'use strict';



goog.require('Blockly.Blocks');


//-Capteurs ----------------------------------------------------------------------------------------------------------------------------------------


//Grove Button OK
Blockly.Blocks['driss_grove_button'] = {
    category: 'driss_grove : capteurs',
    helpUrl: '',
    init: function() {
      this.setColour(230);
      this.appendDummyInput("")
          .appendField("Le bouton")
          .appendField(new Blockly.FieldImage("./src/blockly_blocks/drissBlocks/drissGrove/Grove_button.png", 64,  64),"BLOCK_IMAGE")
          .appendField("sur l'entrée")
          .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]]), "PIN")
          .appendField("est appuyé");
      this.setOutput(true, 'Boolean');
      //this.setTooltip(Blockly.Msg.DRISS_GROVE_ENTREE);
    }
  };



//-Actionneur ----------------------------------------------------------------------------------------------------------------------------------------



//Grove red LED OK

Blockly.Blocks['driss_grove_red_led'] = {
    category: 'driss_grove : actionneurs',
   helpUrl: '',
   init: function() {
     this.setColour(230);
     this.appendDummyInput("A")
         .appendField(new Blockly.FieldDropdown([["Allumer", "HIGH"], ["Eteindre", "LOW"]]), "STAT")
         .appendField("la DEL ")
         .appendField(new Blockly.FieldDropdown([["blanche","WHITE"], ["rouge","RED"], ["verte","GREEN"], ["bleue","BLUE"]]), "COLOR")
         .appendField(new Blockly.FieldImage("./src/blockly_blocks/drissBlocks/drissGrove/Grove_red_LED.png", 64,  64) ,"BLOCK_IMAGE")
         .appendField("reliée à la sortie")
         .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"]]), "PIN");
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     //this.setTooltip(Blockly.Msg.DRISS_GROVE_SORTIE);
   },
   onchange: function(ev) {
     var color = this.getFieldValue('COLOR');
     var image = "";
     switch(color) {
       case "WHITE"  : image = "./src/blockly_blocks/drissBlocks/drissGrove/Grove_white_LED.png"; break;
       case "RED"    : image = "./src/blockly_blocks/drissBlocks/drissGrove/Grove_red_LED.png"; break;
       case "GREEN"  : image = "./src/blockly_blocks/drissBlocks/drissGrove/Grove_green_LED.png"; break;
       case "BLUE"   : image = "./src/blockly_blocks/drissBlocks/drissGrove/Grove_blue_LED.png"; break;
     }
     
     this.getInput('A').removeField("BLOCK_IMAGE");
     this.getInput('A').appendField(new Blockly.FieldImage(image, 64,  64), "BLOCK_IMAGE")
   }
  };