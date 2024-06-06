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

Blockly.Msg.drissML_HUE = "#011CA7";

Blockly.Blocks['driss_createRandomDataSet'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Construire la source de données aléatoires ");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Nombre d'entrées (features)")
      .appendField(new Blockly.FieldNumber(1, 1, 3), "FEATURES");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("   Nombre d'observations (données)")
      .appendField(new Blockly.FieldNumber(1, 10, 1000), "SAMPLES");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Base (seed)")
      .appendField(new Blockly.FieldNumber(1, 0, 10), "SEED")
      .appendField("   Ajouter un bruit de ")
      .appendField(new Blockly.FieldNumber(10, 0, 20), "NOISE");
    this.setNextStatement(true, null);
    this.setColour(105);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};





Blockly.Blocks['driss_afficherNuagePoint'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Afficher le nuage de données y = f ( x")
      .appendField(new Blockly.FieldNumber(1, 1, 3), "FEATURE")
      .appendField(")");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Marqueur")
      .appendField(new Blockly.FieldDropdown([["+", "+"], ["o", "o"], ["*", "*"], ["x", "x"], [".", "."]]), "MARKER")
      .appendField("   Couleur")
      .appendField(new Blockly.FieldDropdown([["default", "DEFAULT"], ["Rouge", "#FF0000"], ["Vert", "#00FF00"], ["Bleu", "#0000FF"]]), "COLOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
  
};



/*
Blockly.Blocks['driss_createLineareModel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Créer le modèle : y = a . x + b");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("avec les paramètres :  a =")
        .appendField(new Blockly.FieldVariable("param_a"), "PARAM_A")
        .appendField(" et b =")
        .appendField(new Blockly.FieldVariable("param_b"), "PARAM_B");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(105);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
*/

Blockly.Blocks['driss_setRandomParam'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Nombre aléatoire")
        .appendField("   Seed")
        .appendField(new Blockly.FieldNumber(0, 0, 10, 1), "SEED");
    this.setOutput(true, null);
    this.setColour(45);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_drawModel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tracer en")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR")
        .appendField("le modèle avec")
        .appendField(new Blockly.FieldDropdown([["les paramètres de départ","PARAMS_DEBUT"], ["les paramètres optimisés","PARAMS_FIN"]]), "PARAMS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['driss_fonctionCout'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ecarts entre les résultats")
        .appendField(new Blockly.FieldVariable("item"), "Y_MODEL")
        .appendField("obtenus par l'application du modèle ");
    this.appendDummyInput()
        .appendField("et les résultats ' Y ' présents dans le DataSet");
    this.setOutput(true, null);
    this.setColour(105);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_executeAlgorithmeDescenteGradient'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Executer l'algorthme d'optimisation du modèle");
    this.appendDummyInput()
        .appendField("avec les paramètres a = ")
        .appendField(new Blockly.FieldVariable("item"), "PARAM_A")
        .appendField("et b =")
        .appendField(new Blockly.FieldVariable("item"), "PARAM_B");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("définir le pas d'apprentissage à ")
        .appendField(new Blockly.FieldNumber(0.01, 0.01, 5, 0.01), "LEARNING_RATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(105);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_getOptimisedParam'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("valeur optimisée du paramètre")
        .appendField(new Blockly.FieldDropdown([["a","PARAM_A"], ["b","PARAM_B"]]), "PARAM_NAME");
    this.setOutput(true, null);
    this.setColour(45);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_getModelResult'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Résultats obtenus par l'application du modèle")
        .appendField(new Blockly.FieldDropdown([["Linéaire ( y = a.x + b )","LINEAR_MODEL"]]), "MODEL");
    this.appendDummyInput()
        .appendField("sur les données du DataSet avec  a =")
        .appendField(new Blockly.FieldVariable("item"), "PARAM_A")
        .appendField("et b = ")
        .appendField(new Blockly.FieldVariable("item"), "PARAM_B");
    this.setOutput(true, null);
    this.setColour(45);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};