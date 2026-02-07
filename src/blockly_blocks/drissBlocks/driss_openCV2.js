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
 * @fileoverview Les blocs pour Open CV2
 * @author Driss Soudani - 
 */
'use strict';

//import * as Blockly from 'blockly';
//import {ColorPickerField} from 'blockly-field-color-wheel';

goog.require('Blockly.Blocks');

var image_w = 150;
var image_h = 100;




Blockly.Blocks['driss_opencv2_new_image'] = {
  init: function () {
    var field = new Blockly.FieldColour('#000000');
    field.setColours(
      ['#000000', '#FFFFFF'],
      ['Noir', 'Blanc']);

    this.appendValueInput("WIDTH")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Nouvelle image")
      .appendField("        Largeur");
    this.appendValueInput("HEIGHT")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Fond   ")
      .appendField(field, "BACK")
      .appendField("              Hauteur");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


// 1 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv2_imread'] = {
  init: function () {
    this.appendValueInput("IMAGE_FILE")
      .setCheck("String")
      .appendField("Image lue à partir du fichier");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_image_show'] = {
  init: function () {
    this.appendValueInput("TITLE_WINDOW")
      .setCheck("String")
      .appendField("Afficher l'image ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("dans la fenêtre");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// 2 - ---------------------------------------------------------------------------------------------------------

Blockly.Blocks['driss_opencv2_color_RGB'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldColour("#ff0000"), "COLOR")
      .appendField("(RGB)");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_color_BGR'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldColour("#ff0000"), "COLOR")
      .appendField("(BGR)");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_color_HEX'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldColour("#ff0000"), "COLOR")
      .appendField("(HEX)");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['driss_opencv2_color_HSV'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldColour("#ff0000"), "COLOR")
      .appendField("(HSV)");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_set_rgb_bgr_color'] = {
  init: function () {
    this.appendValueInput("B")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("couleur ")
      .appendField(new Blockly.FieldDropdown([["BGR", "BGR"], ["RGB", "RGB"]]), "COLOR_SPACE")
      .appendField("formée avec")
      .appendField("(bleu) B");
    this.appendValueInput("G")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("(vert) G");
    this.appendValueInput("R")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("(rouge) R");
    this.setOutput(true, null);
    this.setColour(75);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_set_hsv_color'] = {
  init: function () {
    this.appendValueInput("H")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("couleur HSV formée à partir de      ")
      .appendField("(teinte) H");
    this.appendValueInput("S")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("(saturation) S");
    this.appendValueInput("V")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("(brillance) V");
    this.setOutput(true, null);
    this.setColour(75);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_draw_rectangle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Dessiner un rectangle (")
      .appendField("Haut :")
      .appendField(new Blockly.FieldNumber(0, 0, 2000), "LEFT")
      .appendField(", Gauche :")
      .appendField(new Blockly.FieldNumber(0, 0, 2000), "TOP")
      .appendField(",  Largeur :")
      .appendField(new Blockly.FieldNumber(0, 0, 2000), "WIDTH")
      .appendField(", Hauteur :")
      .appendField(new Blockly.FieldNumber(0, 0, 2000), "HEIGHT")
      .appendField(")");
    this.appendDummyInput()
      .appendField("dans l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField(" -  Couleur du trait : ")
      .appendField(new Blockly.FieldColour("#ff0000"), "COLOR")
      .appendField("  -  Epaisseur du trait : ")
      .appendField(new Blockly.FieldTextInput("1"), "THICKNESS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
/*
  Blockly.Blocks['driss_opencv2_draw_rectangle_2'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Dessiner, sur l'image")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
          .appendField(", le rectangle");
      this.appendValueInput("LEFT")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Coordonnées du coin haut gauche    X1");
      this.appendValueInput("TOP")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Y1");
      this.appendValueInput("RIGHT")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Coordonnées du coin bas droite    X2");
      this.appendValueInput("BOTTOM")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Y2");
      this.appendValueInput("COLOR")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Couleur du trait en Hexadécimal");
      this.appendValueInput("THICKNESS")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Epaisseur du trait");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Msg.drissOpenCV_HUE);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

*/
Blockly.Blocks['driss_opencv2_draw_circle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Dessiner un cercle de centre (x :")
      .appendField(new Blockly.FieldNumber(20, 0, 2000), "CENTRE_X")
      .appendField(", y :")
      .appendField(new Blockly.FieldNumber(20, 0, 2000), "CENTRE_Y")
      .appendField(")")
      .appendField("et de rayon :")
      .appendField(new Blockly.FieldNumber(20, 0.1, 1000), "RAYON");
    this.appendDummyInput()
      .appendField("dans l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField(" -  Couleur du trait : ")
      .appendField(new Blockly.FieldColour("#ff0000"), "COLOR")
      .appendField("  -  Epaisseur du trait : ")
      .appendField(new Blockly.FieldTextInput("1"), "THICKNESS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
/*
  Blockly.Blocks['driss_opencv2_draw_circle_2'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Dessiner, sur l'image ")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
          .appendField(", le cercle de centre");
      this.appendValueInput("CENTRE_X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("X ");
      this.appendValueInput("CENTRE_Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Y");
      this.appendValueInput("RAYON")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("et de rayon ");
      this.appendValueInput("COLOR")
          .setCheck("driss_opencv2_color_HEX")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Couleur du trait en Hexadécimal ");
      this.appendValueInput("THICKNESS")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Epaisseur du trait");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Msg.drissOpenCV_HUE);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  }; 
*/
Blockly.Blocks['driss_opencv2_draw_ligne'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Tracer le segment qui relie le point (")
      .appendField(new Blockly.FieldNumber(20, 0, 2000), "X1")
      .appendField(", ")
      .appendField(new Blockly.FieldNumber(20, 0, 2000), "Y1")
      .appendField(")")
      .appendField("au point (")
      .appendField(new Blockly.FieldNumber(20, 0, 2000), "X2")
      .appendField(", ")
      .appendField(new Blockly.FieldNumber(20, 0, 2000), "Y2")
      .appendField(")");
    this.appendDummyInput()
      .appendField("dans l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField(" -  Couleur du trait : ")
      .appendField(new Blockly.FieldColour("#006600"), "COLOR")
      .appendField("  -  Epaisseur du trait")
      .appendField(new Blockly.FieldTextInput("1"), "THICKNESS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
/*
  Blockly.Blocks['driss_opencv2_draw_ligne_2'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Tracer, sur l'image ")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
          .appendField("le segment de droite");
      this.appendValueInput("X1")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("qui relie le point de coordonnées")
          .appendField("X1");
      this.appendValueInput("Y1")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("")
          .appendField("Y1");
      this.appendValueInput("X2")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("au point de coordonnées")
          .appendField("X2");
      this.appendValueInput("Y2")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Y2");
      this.appendValueInput("COLOR")
          .setCheck("driss_opencv2_color_HEX")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Couleur du trait en Hexadécimal");
      this.appendValueInput("THICKNESS")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Epaisseur du trait");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Msg.drissOpenCV_HUE);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

*/

Blockly.Blocks['driss_opencv2_draw_forme'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Tracer, sur l'image ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField(new Blockly.FieldDropdown([["le segment de droite", "LINE"], ["le rectangle", "RECTANGLE"], ["le cercle", "CIRCLE"]]), "FORME");
    this.appendValueInput("X1")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Coordonnées (X1,Y1) du point de départ - X1", "LABEL_X1");
    //.appendField("X1");
    this.appendValueInput("Y1")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("")
      .appendField("Y1");
    this.appendValueInput("X2", "INPUT_X2")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Coordonnées (X2,Y2) du point d'arrivée - X2", "LABEL_X2");
    //.appendField("X2");
    this.appendValueInput("Y2", "INPUT_Y2")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Y2", "LABEL_Y2");
    this.appendValueInput("RAYON")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Rayon du cercle", "LABEL_RAYON");
    this.appendValueInput("COLOR")
      .setCheck("driss_opencv2_color_HEX")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Couleur du trait en Hexadécimal");
    this.appendValueInput("THICKNESS")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Epaisseur du trait");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  onchange: function (ev) {
    var forme = this.getFieldValue('FORME');
    var image = "";
    if (forme == "RECTANGLE") {
      if (this.getInput("Y2") == null) {
        this.appendValueInput("Y2");
        this.getInput("Y2").appendField("Y2", "LABEL_Y2");
        this.moveInputBefore("Y2", "COLOR");
        this.getInput("Y2").setAlign(Blockly.ALIGN_RIGHT);
      }

      if (this.getInput("X2") == null) {
        this.appendValueInput("X2");
        this.getInput("X2").appendField("X2", "LABEL_X2");
        this.moveInputBefore("X2", "Y2");
        this.getInput("X2").setAlign(Blockly.ALIGN_RIGHT);

      }


      this.getField("LABEL_X1").setValue("Coordonnées (X1,Y1) du coin gauche-haut - X1");
      this.getField("LABEL_X2").setValue("Coordonnées (X2,Y2) du coin droite-bas - X2");

      this.removeInput("RAYON", true);
    }

    if (forme == "CIRCLE") {
      this.getField("LABEL_X1").setValue("Coordonnées (X1,Y1) du centre du cercle - X1");

      this.removeInput("X2", true);
      this.removeInput("Y2", true);
      if (this.getInput("RAYON") == null) {
        this.appendValueInput("RAYON");
        this.getInput("RAYON").appendField("Rayon du cercle", "LABEL_RAYON");
        this.moveInputBefore("RAYON", "COLOR");
        this.getInput("RAYON").setAlign(Blockly.ALIGN_RIGHT);
        //this.getField("LABEL_RAYON").setShadow(true);

      }

    }

    if (forme == "LINE") {

      if (this.getInput("Y2") == null) {
        this.appendValueInput("Y2");
        this.getInput("Y2").appendField("Y2", "LABEL_Y2");
        this.moveInputBefore("Y2", "COLOR");
        this.getInput("Y2").setAlign(Blockly.ALIGN_RIGHT);
      }

      if (this.getInput("X2") == null) {
        this.appendValueInput("X2");
        this.getInput("X2").appendField("X2", "LABEL_X2");
        this.moveInputBefore("X2", "Y2");
        this.getInput("X2").setAlign(Blockly.ALIGN_RIGHT);

      }


      this.getField("LABEL_X1").setValue("Coordonnées (X1,Y1) du point de départ - X1");
      this.getField("LABEL_X2").setValue("Coordonnées (X2,Y2) du point d'arrivée - X2");

      this.removeInput("RAYON", true);
    }
  }
};



Blockly.Blocks['driss_opencv2_put_text'] = {
  init: function () {
    this.appendValueInput("TEXT")
      .setCheck("String")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Ecrire, sur l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField(",                              le texte");
    this.appendValueInput("POS_X")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Police de caractère")
      .appendField(new Blockly.FieldDropdown([["Simple", "FONT_HERSHEY_SIMPLEX"], ["Double", "FONT_HERSHEY_DUPLEX"], ["Manuscrite Simple", "FONT_HERSHEY_SCRIPT_SIMPLEX"], ["Manuscrite double", "FONT_HERSHEY_SCRIPT_COMPLEX"]]), "FONT")
      .appendField("    à partir de la position   X");
    this.appendValueInput("POS_Y")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Taille multipliée par")
      .appendField(new Blockly.FieldNumber(0, 0.5, 5, 0.1), "SCALE")
      .appendField("                                                 Y");
    this.appendValueInput("COLOR")
      .setCheck("driss_opencv2_color_HEX")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Epaisseur")
      .appendField(new Blockly.FieldNumber(0, 1, 5, 0.1), "THICKNESS")
      .appendField("                          Couleur en Hexadécimal");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// n - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv2_waitKey'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Attendre qu'une touche soit pressée");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// n+1 - ---------------------------------------------------------------------------------------------------------

Blockly.Blocks['driss_opencv2_waitKey_val'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Quitter la boucle si la touche")
      .appendField(new Blockly.FieldTextInput("Esc"), "KEY")
      .appendField("est pressée");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_if_keypressed_is'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Touche ")
        .appendField(new Blockly.FieldTextInput("a"), "KEY")
        .appendField("est pressée");
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_get_keypressed_in_var'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Capturer la touche pressée dans la variable")
        .appendField(new Blockly.FieldVariable("touchePressee"), "KEYPRESSED");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_find_hsv_color_of_object'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Trouver les composantes TSL");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("(HSV ou HSV ou HSB en anglais) ");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("de la couleur d'un objet dans un flux vidéo");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("provenant de la caméra n°")
        .appendField(new Blockly.FieldNumber(1, 0, 3), "NUM_CAM");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("---------------------------------------------------------");
    this.appendDummyInput()
        .appendField("T = Teinte  (Hue en anglais)");
    this.appendDummyInput()
        .appendField("S = Saturation");
    this.appendDummyInput()
        .appendField("L = Luminosité (Value ou Brightness en anglais)");
    this.setColour(15);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_find_seuils_canny'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Trouver les seuils du filtre de Canny");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("pour détecter les contours dans l'image");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldTextInput("C:\\chemin\\image.jpg"), "PATH_TO_IMAGE");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("--------------------------------");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "SHOW_ORIGINAL_IMAGE")
        .appendField("Afficher l'image originale");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "SHOW_GRAY_IMAGE")
        .appendField("Afficher l'image en niveaux de gris");
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_wait_this_key_pressed'] = {
  
  init: function() {
    var keyLabel = new Blockly.FieldLabel("Esc", "keypressed_label");
    this.appendDummyInput()
        .appendField("Touche")
        .appendField(new Blockly.FieldTextInput("Esc"), "KEYPRESSED")
        .appendField("est pressée");
    this.appendDummyInput()
        .appendField("!! Le programme s'arrête ici en attendant que")
        
        .appendField(keyLabel, "KEYPRESSED_PILOTEE")
        //.appendField( new Blockly.FieldLabel("Esc"),"KEYPRESSED_PILOTEE" )
        .appendField("soit pressée !!");
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  onchange: function (ev) {
    var key = this.getFieldValue('KEYPRESSED');
    this.getField("KEYPRESSED_PILOTEE").setValue("["+key+"]");
  }
};

// Basics : fonctions de base


Blockly.Blocks['driss_opencv2_image_grayscale'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Conversion de l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("en niveau de gris");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_image_convert_color_space'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Conversion de l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("en ")
      .appendField(new Blockly.FieldDropdown([["niveau de gris", "GRAYSCAL"], ["HSV", "BGR2HSV"], ["LAB", "BGR2LAB"], ["RGB", "BGR2RGB"]]), "COLOR_SPACE");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};





Blockly.Blocks['driss_opencv2_image_blur'] = {
  init: function () {
    var validator = function (newValue) {
      if (newValue % 2 == 0) newValue = parseInt(newValue) + 1;
      if (newValue >= 15) newValue = 15;
      if (newValue <= 1) newValue = 1;
      return (newValue);
    };

    this.appendDummyInput()
      .appendField("Lissage de l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("par application d'un")
      .appendField(new Blockly.FieldDropdown([["Flou gaussien", "GAUSSIEN"], ["Flou médian", "MEDIAN"], ["Flou bilatéral", "BILATERAL"]]), "FILTRE");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("  -  Noyau : ")
      .appendField(new Blockly.FieldNumber(1, 1, 15, 1, validator), "KERNEL")
      .appendField("  -  SigmaColor: ", "TAG1")
      .appendField(new Blockly.FieldNumber(25, 0, 200, 1), "SIGMA_COLOR")
      .appendField("  -  SigmaSpace: ", "TAG2")
      .appendField(new Blockly.FieldNumber(35, 0, 200, 1), "SIGMA_SPACE");

    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },



  validator: function (val) {
    this.getSourceBlock().setColour('#FF0000');
  },

  onchange: function (ev) {
    var filtre = this.getFieldValue('FILTRE');


    if (filtre == "BILATERAL") {
      this.getField("SIGMA_COLOR").setVisible(true);
      this.getField("SIGMA_SPACE").setVisible(true);
      this.getField("TAG1").setVisible(true);
      this.getField("TAG2").setVisible(true);
      this.render();
    }

    if ((filtre == "GAUSSIEN") || (filtre == "MEDIAN")) {
      this.getField("SIGMA_COLOR").setVisible(false);
      this.getField("SIGMA_SPACE").setVisible(false);
      this.getField("TAG1").setVisible(false);
      this.getField("TAG2").setVisible(false);
      this.render();
    }
  }


};

Blockly.Blocks['driss_opencv2_image_canny2'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("les contours de l'image ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField(" en utilisant les seuils")
      .appendField(new Blockly.FieldNumber(75, 50, 80, 1), "SEUIL_1")
      .appendField("et")
      .appendField(new Blockly.FieldNumber(150, 90, 180, 1), "SEUIL_2");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_image_canny'] = {
  init: function () {
    this.appendValueInput("THRESHOLD_1")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Identification des bords des objets sur l'image ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("   Seuil  1");
    this.appendValueInput("THRESHOLD_2")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("par application du filtre de Canny        Seuil  2");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(135);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



Blockly.Blocks['driss_opencv2_image_dilate'] = {
  init: function () {
    var validator = function (newValue) {
      if (newValue % 2 == 0) newValue = parseInt(newValue) + 1;
      if (newValue >= 15) newValue = 15;
      if (newValue <= 1) newValue = 1;

      if (newValue == 0) newValue = NUll;
      return (newValue);
    };

    this.appendDummyInput()
      .appendField("dilatation de l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField(new Blockly.FieldNumber(1, 1, 15, 1), "ITERATIONS")
      .appendField("fois  en utilisant un noyeau de")
      .appendField(new Blockly.FieldNumber(1, 1, 13, 1, validator), "KERNEL");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_image_erode'] = {
  init: function () {

    var validator = function (newValue) {
      if (newValue % 2 == 0) newValue = parseInt(newValue) + 1;
      if (newValue >= 15) newValue = 15;
      if (newValue <= 1) newValue = 1;

      if (newValue == 0) newValue = NUll;
      return (newValue);
    };


    this.appendDummyInput()
      .appendField("érosion de l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField(new Blockly.FieldNumber(1, 1, 15, 1), "ITERATIONS")
      .appendField("fois  en utilisant un noyeau de")
      .appendField(new Blockly.FieldNumber(1, 1, 13, 1, validator), "KERNEL");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_image_resize'] = {
  init: function () {
    this.appendValueInput("WIDTH")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("redimensionnée par l'interpolation")
      .appendField(new Blockly.FieldDropdown([["INTER_AREA", "INTER_AREA"], ["INTER_CUBIC ", "INTER_CUBIC "], ["INTER_LINEAR ", "INTER_LINEAR "]]), "INTERPOLATION")
      .appendField("   nouvel Largeur");
    this.appendValueInput("HEIGHT")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("nouvelle hauteur");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_image_resize_2'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("redimensionnée par l'interpolation")
      .appendField(new Blockly.FieldDropdown([["INTER_AREA", "INTER_AREA"], ["INTER_CUBIC ", "INTER_CUBIC "], ["INTER_LINEAR ", "INTER_LINEAR "]]), "INTERPOLATION");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Largeur x ")
      .appendField(new Blockly.FieldNumber(1, 0.1, Infinity, 0.1), "FX")
      .appendField("      Hauteur x ")
      .appendField(new Blockly.FieldNumber(1, 0.1, Infinity, 0.1), "FY");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_image_cropped'] = {
  init: function () {
    this.appendValueInput("X1")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Recadrage de l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("pour garder           X1");
    this.appendValueInput("Y1")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("la zone délimitée par le rectangle ")
      .appendField("                            Y1");
    this.appendValueInput("X2")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("(X1, Y1) = coin gauche haut du rectangle")
      .appendField("                 X2");
    this.appendValueInput("Y2")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("(X2, Y2) = coin droite bas du rectangle")
      .appendField("                     Y2");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};







//Basics - Transformations d'image

Blockly.Blocks['driss_opencv2_translate_image'] = {
  init: function () {
    this.appendValueInput("TRANS_X")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Translation de l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("     -    Horizontalement de");
    this.appendValueInput("TRANS_Y")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Verticalement de");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(135);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_rotate_image'] = {
  init: function () {
    this.appendValueInput("ANGLE")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Rotation de l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("    Angle");
    this.appendDummyInput()
      .appendField("autour")
      .appendField(new Blockly.FieldDropdown([["de son centre", "CENTER"], ["du point", "POINT"]]), "ROT_POINT")
      .appendField("(", "TAG1")
      .appendField(new Blockly.FieldNumber(0), "ROT_X")
      .appendField(", ", "TAG2")
      .appendField(new Blockly.FieldNumber(0), "ROT_Y")
      .appendField(")", "TAG3");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(135);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  onchange: function (ev) {
    var rotPoint = this.getFieldValue('ROT_POINT');

    if (rotPoint == "CENTER") {
      this.getField("ROT_X").setVisible(false);
      this.getField("ROT_Y").setVisible(false);
      this.getField("TAG1").setVisible(false);
      this.getField("TAG2").setVisible(false);
      this.getField("TAG3").setVisible(false);
      this.render();
    }

    if (rotPoint == "POINT") {
      this.getField("ROT_X").setVisible(true);
      this.getField("ROT_Y").setVisible(true);
      this.getField("TAG1").setVisible(true);
      this.getField("TAG2").setVisible(true);
      this.getField("TAG3").setVisible(true);
      this.render();
    }
  }
};


Blockly.Blocks['driss_opencv2_flip_image'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Retourner l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField(new Blockly.FieldDropdown([["horizontalement", "HORIZONTAL"], ["verticalement", "VERTICAL"], ["horizontalement et verticalement", "BOTH"]]), "SENS");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(135);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};





Blockly.Blocks['driss_opencv2_split_image_chanel'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("composante")
      .appendField(new Blockly.FieldDropdown([["Bleu", "BLUE"], ["Vert", "GREEN"], ["Rouge", "RED"], ["H", "HUE"], ["S", "SAT"], ["V", "VAL"]]), "CHANEL")
      .appendField("de l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_merge_image_chanel'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("fusion des composantes  Bleu : ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE_B")
      .appendField(" - Vert : ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE_G")
      .appendField(" - Rouge: ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE_R");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_bitwise'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Intersection (Bitwise AND)", "AND"], ["Union (Bitwise OR)", "OR"], ["Union sans intersection (Bitwise XOR)", "XOR"], ["Inverse (Bitwise NOT)", "NOT"]]), "BITWISE")
      .appendField("de l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE_1")
      .appendField("et de l'image", "TAG1")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE_2");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange: function (ev) {
    var oper = this.getFieldValue("BITWISE");

    if (oper == "NOT") {
      console.log(oper);
      this.getField("TAG1").setVisible(false);
      this.getField("VAR_IMAGE_2").setVisible(false);
      this.render();
    } else {
      this.getField("TAG1").setVisible(true);
      this.getField("VAR_IMAGE_2").setVisible(true);
      this.render();
    }

  }
};



Blockly.Blocks['driss_opencv2_inrange'] = {
  init: function () {
    this.appendValueInput("LO_COLOR")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("masque réalisé avec l'image ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("  -  couleur min");
    this.appendValueInput("HI_COLOR")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("couleur max");
    this.setOutput(true, null);
    this.setColour(75);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};




//------------------------------------------------------------------


Blockly.Blocks['driss_opencv2_find_contours'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Mettre,")
      .appendField("dans la variable ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_CONTOURS")
      .appendField(", la liste des contours identifiés sur l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_contour_area'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Aire du contour")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_CONTOUR");
    this.setOutput(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_contour_perim'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Périmètre du contour")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_CONTOUR");
    this.setOutput(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_contour_polly'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Nombre approximatif de segments du contour")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_CONTOUR");
    this.setOutput(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_draw_contours'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Dessiner sur l'image  ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("le périmètre du contour")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_CONTOUR");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("avec un trait d'épaisseur")
      .appendField(new Blockly.FieldNumber(0, 1, 5, 1), "THICKNESS")
      .appendField("de couleur ")
      .appendField(new Blockly.FieldColour("#ff6600"), "COLOR_HEX");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



Blockly.Blocks['driss_opencv2_encadrer_forme'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Encadrer sur l'image  ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("la forme définie par le contour")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_CONTOUR");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("avec un trait d'épaisseur")
      .appendField(new Blockly.FieldNumber(0, 1, 5, 1), "THICKNESS")
      .appendField("de couleur ")
      .appendField(new Blockly.FieldColour("#003300"), "COLOR_HEX");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_find_list_of_all_contours'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Liste des contours des formes géométriques ");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("trouvées dans l'image ")
        .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Seuils pour le filtre de Canny : ")
        .appendField("[")
        .appendField(new Blockly.FieldTextInput("255"), "THRESHOLD_1")
        .appendField("-")
        .appendField(new Blockly.FieldTextInput("255"), "THRESHOLD_2")
        .appendField("]");
    this.setOutput(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_show_infos_contour'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Afficher sur l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField(" les informations du contour")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_CONTOUR");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("avec la couleur")
      .appendField(new Blockly.FieldColour("#003300"), "COLOR_HEX")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "AREA")
      .appendField("Aire")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "PERI")
      .appendField("Périmètre")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "POLY")
      .appendField("Nombre (approximatif) de segments");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};





Blockly.Blocks['driss_opencv2_named_window'] = {
  init: function () {
    this.appendValueInput("WINDOW_TITLE")
      .setCheck(null)
      .appendField("Créer une fenêtre d'affichage ");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


//Videos



// 1 - ---------------------------------------------------------------------------

Blockly.Blocks['driss_opencv2_vc_from_file'] = {
  init: function () {
    this.appendValueInput("VIDEO_FILE")
      .setCheck(null)
      .appendField("le flux du fichier vidéo");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



Blockly.Blocks['driss_opencv2_video_capture_from_cam'] = {
  init: function () {
    this.appendValueInput("NUM_CAM")
      .setCheck("Number")
      .appendField("capture du flux vidéo de la caméra");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


// 2 - ---------------------------------------------------------------------------
Blockly.Blocks['driss_opencv2_vc_is_opened'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("l'objet de capture vidéo")
      .appendField(new Blockly.FieldVariable("variable"), "VIDEO_CAPTURE")
      .appendField("est ouvert");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// 3 - ---------------------------------------------------------------------------
Blockly.Blocks['driss_opencv2_vc_show_image'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Afficher l'image suivante du flux vidéo")
      .appendField(new Blockly.FieldVariable("variable"), "VIDEO_CAPTURE");
    this.appendValueInput("FRAME_TITLE")
      .setCheck("String")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("dans une fenêtre portant le titre");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// 4 - ---------------------------------------------------------------------------
Blockly.Blocks['driss_opencv2_vc_release'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Stopper la capture vidéo")
      .appendField(new Blockly.FieldVariable("variable"), "VIDEO_CAPTURE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


// 5 - ---------------------------------------------------------------------------
Blockly.Blocks['driss_opencv2_vc_destroy_all_windows'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Fermer toutes les fenêtres");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_vc_destroy_this_window'] = {
  init: function() {
    this.appendValueInput("TITLE_WINDOW")
        .setCheck("String")
        .appendField("Fermer la fenêtre ");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_rescale_frame'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Redimentionner l'image ")
      .appendField(new Blockly.FieldVariable("variable"), "FRAME")
      .appendField("à")
      .appendField(new Blockly.FieldNumber(8, 0.1, 1, 0.1), "SCALE");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



Blockly.Blocks['driss_opencv2_cv_next_frame'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Image du flux vidéo")
      .appendField(new Blockly.FieldVariable("variable"), "VIDEO_CAPTURE");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_cv_show_frame'] = {
  init: function () {
    this.appendValueInput("TITLE_WINDOW")
      .setCheck("String")
      .appendField("Afficher l'image ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("dans la fenêtre");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



Blockly.Blocks['driss_opencv2_vc_change_resolution'] = {
  init: function () {
    this.appendValueInput("CAPTURE_WIDTH")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Changer la résolution de la capture vidéo")
      .appendField(new Blockly.FieldVariable("variable"), "CAPTURE_VIDEO")
      .appendField("   ")
      .appendField("Nouvelle Largeur");
    this.appendValueInput("CAPTURE_HEIGHT")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Nouvelle Hauteur");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};





//******************************************************************** */

Blockly.Blocks['driss_opencv2_begin_video_capture'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Démarrer la capture du flux vidéo de la caméra n°")
      .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"]]), "NUM_CAM");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_release_video_capture'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Arrêter le flux vidéo de la caméra n°")
      .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"]]), "NUM_CAM");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};










Blockly.Blocks['driss_opencv2_hc_cascade_classifier'] = {
  init: function () {
    this.appendValueInput("CASCADE_FILE")
      .setCheck("String")
      .appendField("Classificateur cascade");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_hc_detect_multiScale'] = {
  init: function () {
    this.appendValueInput("SCALE_FACTOR")
      .setCheck("Number")
      .appendField("Objet de la cascade ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_CASCADE")
      .appendField(",  détecté sur l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("    Facteur d'échelle");
    this.appendValueInput("NEIBHORS")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Voisinage");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_hc_encadrer_objet'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Encadrer l'objet ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_OBJECT")
      .appendField("dans l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE");
    this.appendDummyInput()
      .appendField("avec un trait de couleur ")
      .appendField(new Blockly.FieldColour("#ff0000"), "COLOR")
      .appendField(" et d'épaisseur ")
      .appendField(new Blockly.FieldNumber(2, 1), "THICKNESS");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_hc_google_classifier'] = {
  init: function () {
    this.appendValueInput("MODELES")
      .setCheck("String")
      .appendField("Charger les fichiers de classification ")
      .appendField("Ficher des modèles");
    this.appendValueInput("LABELS")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Teachable Machine (google)")
      .appendField("          Ficher des labels");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};




// Teatchable Machine--------------------------------------------------------------------------------------------------

Blockly.Blocks['driss_opencv2_tm_load_model'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Charger le modèle entrainé sur ")
      .appendField("Teatchabale Machine ");
    this.appendValueInput("MODEL_FILE")
      .setCheck("String")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Chemin absolu vers le fichier : keras_Model.h5");
    this.appendValueInput("LABELS_FILE")
      .setCheck("String")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Chemin absolu vers le fichier : labels.txt");
    this.setInputsInline(false);
    this.setNextStatement(true, null);
    this.setColour(150);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_tm_lancer_reconnaissance_objet'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Lancer la reconnaissance de l'objet ");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("sur l'image contenu dans la variable ")
      .appendField(new Blockly.FieldVariable("item"), "IMAGE");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_tm_categorie_objet'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Nom de la catégorie (Classe)  de l'objet reconnu");
    this.setOutput(true, null);
    this.setColour(150);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_tm_score_reconnaissance'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Score : Pourcentage de reconnaissance");
    this.setOutput(true, null);
    this.setColour(150);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_tm_write_texte'] = {
  init: function () {
    this.appendValueInput("TEXT")
      .setCheck("String")
      .setAlign(Blockly.ALIGN_LEFT)
      .appendField("Ecrire, sur l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField(",                               le texte");
    this.appendValueInput("POS_X")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Police de caractère")
      .appendField(new Blockly.FieldDropdown([["Simple", "FONT_HERSHEY_SIMPLEX"], ["Double", "FONT_HERSHEY_DUPLEX"], ["Manuscrite Simple", "FONT_HERSHEY_SCRIPT_SIMPLEX"], ["Manuscrite double", "FONT_HERSHEY_SCRIPT_COMPLEX"]]), "FONT")
      .appendField("   à partir de la position   X");
    this.appendValueInput("POS_Y")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_LEFT)
      .appendField("Taille multipliée par")
      .appendField(new Blockly.FieldNumber(0, 0.5, 5, 0.1), "SCALE")
      .appendField("                                                 Y");
    this.appendValueInput("COLOR")
      .setCheck("driss_opencv2_color_HEX")
      .setAlign(Blockly.ALIGN_LEFT)
      .appendField("Epaisseur")
      .appendField(new Blockly.FieldNumber(0, 1, 5, 0.1), "THICKNESS")
      .appendField("                          Couleur en Hexadécimal");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(165);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_tm_write_texte_simple'] = {
  init: function () {
    this.appendValueInput("TEXT")
      .setCheck("String")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Ecrire, sur l'image")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
      .appendField("   le texte");

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(165);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_tm_key_pressed'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("La touche")
      .appendField(new Blockly.FieldTextInput("q"), "KEY")
      .appendField("est pressée");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//----------------------------------------------------------------------------------------------


// Tracking Objet --------------------------------------------------------------------------------------------------


Blockly.Blocks['driss_opencv2_video_capture_fixer_dimensions'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Fixer les dimensions du flux vidéo")
      .appendField(new Blockly.FieldVariable("variable"), "CAMERA");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Largeur")
      .appendField(new Blockly.FieldNumber(320, 0, 800), "WIDTH")
      .appendField("    hauteur")
      .appendField(new Blockly.FieldNumber(240, 0, 600), "HEIGHT");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_getcolor_hsv'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("H =")
      .appendField(new Blockly.FieldNumber(0, 0, 179), "H")
      .appendField("  S =")
      .appendField(new Blockly.FieldNumber(0, 100, 255), "S")
      .appendField("  V =")
      .appendField(new Blockly.FieldNumber(0, 100, 255), "V");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_trackingobjects_entourer_un_objet'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Marquer dans l'image, ")
        .appendField(new Blockly.FieldVariable("item"), "VAR_IMAGE");
    this.appendValueInput("HSV_LO_COLOR")
        .setCheck(null)
        .appendField("le plus grand objet dont la couleur est comprise")
        .appendField("      [Couleur 1] ");
    this.appendValueInput("HSV_HI_COLOR")
        .setCheck(null)
        .appendField("entre [Couleur 1] et [Couleur 2]")
        .appendField("                                [Couleur 2] ");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("(Appliquer les coefficients : érosion =")
        .appendField(new Blockly.FieldNumber(0, 0, 13, 1), "ERODE")
        .appendField("et dilatation =")
        .appendField(new Blockly.FieldNumber(0, 0, 13, 1), "DILATE")
        .appendField(")");
    this.appendDummyInput()
        .appendField("Marquer seulement si la taille > à un carré de ")
        .appendField(new Blockly.FieldNumber(30, 10, 100, 5), "SIZE")
        .appendField("px de coté");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("-----------------------------");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "PUT_CONTOUR")
        .appendField("Entourer l'objet avec un")
        .appendField(new Blockly.FieldDropdown([["Cercle","CERCLE"], ["Rectangle","RECTANGLE"]]), "FORME")
        .appendField("de couleur ")
        .appendField(new Blockly.FieldColour("#33ff33"), "LINE_COLOR");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "PUT_TEXT")
        .appendField("Afficher le texte")
        .appendField(new Blockly.FieldTextInput("..."), "TEXTE");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(285);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_trackingobjects_entourer_tous_les_objets'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Marquer dans l'image, ")
          .appendField(new Blockly.FieldVariable("item"), "VAR_IMAGE");
      this.appendValueInput("HSV_LO_COLOR")
          .setCheck(null)
          .appendField("TOUS les objets dont la couleur est comprise")
          .appendField("      [Couleur 1] ");
      this.appendValueInput("HSV_HI_COLOR")
          .setCheck(null)
          .appendField("entre [Couleur 1] et [Couleur 2]")
          .appendField("                                [Couleur 2] ");
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField("(Appliquer les coefficients : érosion =")
          .appendField(new Blockly.FieldNumber(0, 0, 13, 1), "ERODE")
          .appendField("et dilatation =")
          .appendField(new Blockly.FieldNumber(0, 0, 13, 1), "DILATE")
          .appendField(")");
      this.appendDummyInput()
          .appendField("Marquer seulement si la taille > à un carré de ")
          .appendField(new Blockly.FieldNumber(30, 10, 100, 5), "SIZE")
          .appendField("px de coté");
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField("-----------------------------");
      this.appendDummyInput()
          .appendField(new Blockly.FieldCheckbox("TRUE"), "PUT_CONTOUR")
          .appendField("Entourer l'objet avec un")
          .appendField(new Blockly.FieldDropdown([["Cercle","CERCLE"], ["Rectangle","RECTANGLE"]]), "FORME")
          .appendField("de couleur ")
          .appendField(new Blockly.FieldColour("#33ff33"), "LINE_COLOR");
      this.appendDummyInput()
          .appendField(new Blockly.FieldCheckbox("TRUE"), "PUT_TEXT")
          .appendField("Afficher le texte")
          .appendField(new Blockly.FieldTextInput("..."), "TEXTE");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(285);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };



Blockly.Blocks['driss_opencv2_trackingobjects_setcolorrange'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Copie de l'image stockée dans")
      .appendField(new Blockly.FieldVariable("la_variable"), "VAR_IMAGE");
    this.appendValueInput("LO_COLOR")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("en remplaçant les couleurs comprises entre")
      .appendField(" 'Couleur 1' et 'Couleur 2'")
      .appendField("     Couleur 1");
    this.appendValueInput("HI_COLOR")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("par du BLANC et les autres par du NOIR")
      .appendField("                            Couleur 2");
    this.setOutput(true, null);
    this.setColour(285);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_trackingobjects_setcolorrange_2'] = {
  init: function () {

    var blackColor = new Blockly.FieldColour('#000000');
    blackColor.setColours(
      ['#000000'],
      ['Noir']);
    blackColor.setColumns(1);

    var whiteColor = new Blockly.FieldColour('#FFFFFF');
    whiteColor.setColours(['#FFFFFF'], ['Blanc']);
    whiteColor.setColumns(1);

    this.appendDummyInput()
      .appendField("Copie de l'image stockée dans")
      .appendField(new Blockly.FieldVariable("la_variable"), "VAR_IMAGE")
      .appendField("en remplacant");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("les couleurs comprises entre ")
      .appendField("[Couleur 1]  et   [Couleur 2]");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("par du ")
      .appendField(whiteColor, "WHITE")
      .appendField("et les autres par du ")
      .appendField(blackColor, "BLACK");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Couleur 1 : H =")
      .appendField(new Blockly.FieldVariable("item"), "H_MIN")
      .appendField(" S =")
      .appendField(new Blockly.FieldVariable("item"), "S_MIN")
      .appendField(" V =")
      .appendField(new Blockly.FieldVariable("item"), "V_MIN");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Couleur 2 : H =")
      .appendField(new Blockly.FieldVariable("item"), "H_MAX")
      .appendField(" S =")
      .appendField(new Blockly.FieldVariable("item"), "S_MAX")
      .appendField(" V =")
      .appendField(new Blockly.FieldVariable("item"), "V_MAX");
    this.setOutput(true, null);
    this.setColour(285);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange: function (ev) {

    this.getField("BLACK").setValue("#000000");
  }
};



//
// Communs --------------------------------------------------------------------------------------------------



Blockly.Blocks['driss_opencv2_add_trackbar'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Afficher un curseur dans la fenêtre ")
      .appendField(new Blockly.FieldTextInput("Contrôles"), "WINDOWS")
      .appendField("pour agir sur la variable ")
      .appendField(new Blockly.FieldVariable("variable"), "VAR_NAME");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Non : ")
      .appendField(new Blockly.FieldTextInput("Curseur 1"), "TRACKBAR_NAME")
      .appendField("  -  Valeur minimale ")
      .appendField(new Blockly.FieldNumber(0), "MIN")
      .appendField("  -  Valeur maximale")
      .appendField(new Blockly.FieldNumber(255), "MAX");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*
Blockly.Blocks['driss_opencv2_draw_n_sliders'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Afficher ")
      .appendField(new Blockly.FieldDropdown([["1 curseur", "1"], ["2 curseurs", "2"], ["3 curseurs", "3"], ["4 curseurs", "4"], ["5 curseurs", "5"], 
                                              ["6 curseurs", "6"], ["7 curseurs", "7"], ["8 curseurs", "8"], ["9 curseurs", "9"], ["10 curseurs", "10"] ]), "NOMBRE_CURSOR")
      .appendField(" dans la fenêtre")
      .appendField(new Blockly.FieldTextInput("default"), "WINDOW");
    
      for(i=1; i<=10; i++){
        this.appendDummyInput('CURSOR_'+i)
      .appendField("Curseur "+i+" :  Nom", "CURSEUR_"+i)
      .appendField(new Blockly.FieldTextInput("default"), "CURSOR_NAME_"+i)
      .appendField(" varie de")
      .appendField(new Blockly.FieldNumber(0, -255, 255), "VAL_MINI_"+i)
      .appendField(" à ")
      .appendField(new Blockly.FieldNumber(0, -255, 255), "VAL_MAXI_"+i)
      .appendField("valeur stockée dans : ")
      .appendField("", "VAR_"+i);
      }
      
      
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  onchange: function (ev) {

    var nbreCurseurs = parseInt(this.getFieldValue('NOMBRE_CURSOR'));
    console.log('nbreCurseurs = '+nbreCurseurs);

    for (let i=1; i<=10; i++){
      console.log('i = '+i);
      
      if(i<=nbreCurseurs){
        let nom = this.getFieldValue("CURSOR_NAME_"+i);
        nom = nom.trim().replace(/ /g, '_');
        console.log('nom = '+nom);
      this.getInput("CURSOR_"+i).setVisible(true);
      this.getField("VAR_"+i).setValue(nom);

      }else{
        this.getInput("CURSOR_"+i).setVisible(false);
      }
    }

    this.render();

  }
};
*/



//
// Programmes utiles --------------------------------------------------------------------------------------------------
//
/*
Blockly.Blocks['driss_opencv2_std_inrange'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("item"), "VAR_IMAGE")
      .appendField("en remplaçant les couleurs comprises ");
    this.appendValueInput("LO_COLOR")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(" entre min et max par du blanc         couleur  min");
    this.appendValueInput("HI_COLOR")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("et les autres couleurs par du noir    couleur max");
    this.setOutput(true, null);
    this.setColour(75);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
*/

Blockly.Blocks['driss_opencv2_prog_get_parametres_tracking'] = {
  init: function() {
    this.appendValueInput("NUM_CAM")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Utiliser la caméra");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Trouver les paramètres à appliquer à une image");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("issue d'un flux vidéo, pour marquer un objet ");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("par sa couleur dans cette image");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("---------------------------------------");
      this.appendDummyInput()
      .setAlign(Blockly.ALIGN_LEFT)
    .appendField("Ces paramètres sont :");
    this.appendDummyInput()
        .appendField("   - les valeurs mini et maxi de : ");
    this.appendDummyInput()
        .appendField("         . sa teinte (H),");
    this.appendDummyInput()
        .appendField("         . l'intensité  (S) de sa couleur ");
    this.appendDummyInput()
        .appendField("         . la brillance (V) de sa couleur");
    this.appendDummyInput()
        .appendField("   - le coefficient d'érosion");
    this.appendDummyInput()
      .appendField("   - le coefficient de dilatation");
    
    /*
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("---------------------------------------");
    
    this.appendDummyInput()
        .appendField("  ")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "CONTROL")
        .appendField(" Afficher les curseurs de contrôle et le masque");
    this.appendDummyInput()
        .appendField("  ")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "IMAGE_BGR")
        .appendField(" Afficher le flux vidéo de la caméra");
    this.appendDummyInput()
        .appendField("  ")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "MASK_IN_IMAGE")
        .appendField(" Afficher le plaquage du masque sur le flux vidéo");
    this.appendDummyInput()
        .appendField("  ")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "IMAGE_HSV")
        .appendField(" Afficher le flux vidéo de la caméra converti en HSV");
        */
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("https://fr.wikipedia.org/wiki/Teinte_Saturation_Valeur");
  }
};







//________________________________________________________
//Immatriculation

// Blockly.Blocks['driss_opencv2_if_enter_esc_space_pressed'] = {
//   init: function() {
//     this.appendStatementInput("IF_ENTER_ESC_SPACE_PRESSED")
//         .setCheck(null)
//         .appendField("Si la touche")
//         .appendField(new Blockly.FieldDropdown([["Entrée","ENTER"], ["Echap","ESC"], ["Espace","SPACE"]]), "KEYPRESSED")
//         .appendField("est pressée");
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(30);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };



Blockly.Blocks['driss_opencv2_get_text_immatriculation'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField("Texte de la plaque d'immatriculation");
        
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("lu par OCR sur la l'image")
        .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_get_taux_confiance_lecture_immatriculation'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Taux de confiance de la reconnaissance OCR")
        .appendField("(entre 0 et 100)");
    this.setOutput(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['driss_opencv2_trouver_contour_immatriculation'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Détecter la zone de la plaque d'immatriculation")
        .appendField("dans l'image")
        .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE");
    this.appendDummyInput()
        .appendField("puis appliquer une reconnaissance OCR")
        .appendField("pour lire le texte.");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_ocr_sur_plaque_immatriculation'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Texte lu par OCR sur la plaque d'immatriculation ");
    this.setOutput(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_redim_image'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Redimensionner l'image")
        .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Largeur")
        .appendField(new Blockly.FieldNumber(640, 10, 1280), "WIDTH")
        .appendField("px  -   Hauteur")
        .appendField(new Blockly.FieldNumber(480, 10, 720), "HEIGHT")
        .appendField("px");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['driss_opencv2_convert_image_color_space'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Convertir l'image ")
        .appendField(new Blockly.FieldVariable("variable"), "ORIGNAL_IMA")
        .appendField("en ")
        .appendField(new Blockly.FieldDropdown([["niveau de gris", "GRAYSCAL"], ["HSV", "BGR2HSV"], ["LAB", "BGR2LAB"], ["RGB", "BGR2RGB"]]), "COLOR_SPACE");
    this.appendDummyInput()
        .appendField("Mettre l'image résultat dans ")
        .appendField(new Blockly.FieldVariable("variable"), "RESULT_IMA");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_appliquer_flou'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Lisser l'image")
        .appendField(new Blockly.FieldVariable("variable"), "ORIGNAL_IMA")
        .appendField("par application d'un")
        .appendField(new Blockly.FieldDropdown([["Flou gaussien","GAUSSIEN"], ["Flou médian","MEDIAN"], ["Flou bilatéral","BILATERAL"]]), "FILTRE");
    this.appendDummyInput()
        .appendField("Mettre l'image résultat dans ")
        .appendField(new Blockly.FieldVariable("variable"), "RESULT_IMA")
        .appendField("  ( Noyeau = ")
        .appendField(new Blockly.FieldNumber(1, 1, 15, 1), "KERNEL")
        .appendField(" )");
    /*
    this.appendDummyInput()
        .appendField("Paramètres : Noyeau = ")
        .appendField(new Blockly.FieldNumber(1, 1, 15, 1), "KERNEL");
        .appendField("  SigmaColor = ")
        .appendField(new Blockly.FieldNumber(25, 0, 200, 1), "SIGMA_COLOR")
        .appendField("  SigmaSpace = ")
        .appendField(new Blockly.FieldNumber(35, 0, 200, 1), "SIGMA_SPACE");
        */
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_detecter_contours'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Trouver les contours dans l'image")
        .appendField(new Blockly.FieldVariable("variable"), "ORIGNAL_IMA");
    this.appendDummyInput()
        .appendField("et les dessiner dans l'image")
        .appendField(new Blockly.FieldVariable("variable"), "RESULT_IMA");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Seuil mini = ")
        .appendField(new Blockly.FieldNumber(75, 50, 80, 1), "SEUIL_1")
        .appendField("Seuil max = ")
        .appendField(new Blockly.FieldNumber(150, 90, 180, 1), "SEUIL_2");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_get_liste_contours'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Liste des contours trouvés dans l'image")
        .appendField(new Blockly.FieldVariable("variable"), "ORIGNAL_IMA");
    /*
        this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Seuil mini = ")
        .appendField(new Blockly.FieldNumber(75, 50, 80, 1), "SEUIL_1")
        .appendField("    Seuil max = ")
        .appendField(new Blockly.FieldNumber(150, 90, 180, 1), "SEUIL_2");
    
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "DRAW_CONTOURS")
        .appendField("Dessiner ces contours dans l'image")
        .appendField(new Blockly.FieldVariable("variable"), "RESULT_IMA");
      */
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_classer_contours'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Classer la liste des contours")
        .appendField(new Blockly.FieldVariable("variable"), "CONTOURS_LIST")
        .appendField("par leurs")
        .appendField(new Blockly.FieldDropdown([["Aires","AREA"]]), "KEY");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "REVERSE")
        .appendField("Ordre inverse")
        .appendField("  -   Se limiter à ")
        .appendField(new Blockly.FieldNumber(255, 1, 1000), "LIMITE")
        .appendField("contour(s)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_get_nbre_contours'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Nombre de contours dans la liste des contours ")
        .appendField(new Blockly.FieldVariable("variable"), "CONTOURS_LIST");
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_get_contour'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Contour rectangulaire de la liste")
      
        .appendField(new Blockly.FieldVariable("variable"), "CONTOURS_LIST");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "AIRE")
        .appendField("qui possède la plus grande aire")
        .appendField("  et dont ")
        .appendField(new Blockly.FieldDropdown([["Largeur > Hauteur","WsupH"], ["Largeur < Hauteur","WinfH"], ["Largeur = Hauteur","SQUARE"]]), "ORIENTATION");
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_draw_this_contour'] = {
  init: function() {
    this.appendValueInput("RECTANGLE")
        .setCheck(null)
        .appendField("Dessiner dans l'image ")
        .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
        .appendField("le contour");
    this.appendDummyInput()
        .appendField("avec un trait d'épaisseur")
        .appendField(new Blockly.FieldNumber(1, 1, 5), "THICKNESS")
        .appendField("et de couleur ")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR_HEX");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['driss_opencv2_read_text_in_this_contour'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Texte contenu dans le contour")
        .appendField(new Blockly.FieldVariable("variable"), "CONTOUR");
    this.appendDummyInput()
        .appendField("dans l'image")
        .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_write_legend_contour'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck(null)
        .appendField("Ecrire dans l'image")
        .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
        .appendField("                              le texte");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["sous le contour","UP"], ["sur le contour","DOWN"], ["dans le contour","IN"]]), "POSITION")
        .appendField(new Blockly.FieldVariable("variable"), "CONTOUR")
        .appendField("  Couleur")
        .appendField(new Blockly.FieldColour("#000000"), "TXT_COLOR")
        .appendField(" -  Fond")
        .appendField(new Blockly.FieldColour("#ffffff"), "BG_COLOR");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


//----------------------------------------------------------------------------------------------
//Reconnaissance faciale


Blockly.Blocks['driss_opencv2_save_photo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Enregistrer la photo contenue dans");
    this.appendValueInput("FILE_NAME")
        .setCheck("String")
        .appendField("la variable")
        .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
        .appendField("dans un fichier portant le nom");
    this.appendValueInput("FOLDER_NAME")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("à l'intérieur du dossier");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['driss_opencv2_identifier_visages_references'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Charger les visages de références");
    this.appendValueInput("FOLDER")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("à partir des photos du dossier");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_do_face_recognition'] = {
  init: function() {
    this.appendValueInput("PHOTO")
        .setCheck(null)
        .appendField("Effectuer une reconnaissance faciale sur la photo");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("et marquer les visages reconus");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


// Blockly.Blocks['driss_opencv2_load_all_photos_from_folder'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Charger toutes les photos du dossier");
//     this.appendValueInput("FOLDER")
//         .setCheck(null)
//         .setAlign(Blockly.ALIGN_RIGHT)
//         .appendField("Dossier");
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(195);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };

// Blockly.Blocks['driss_opencv2_do_face_recognition'] = {
//   init: function() {
//     this.appendValueInput("PHOTO")
//         .setCheck(null)
//         .appendField("Effectuer une reconnaissance faciale sur la photo");
//     this.appendDummyInput()
//         .setAlign(Blockly.ALIGN_CENTRE)
//         .appendField("en utilisant les photos de référence du dossier");
//     this.appendDummyInput()
//         .setAlign(Blockly.ALIGN_CENTRE)
//         .appendField(new Blockly.FieldTextInput("./"), "FOLDER");
//     this.setInputsInline(false);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(195);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };

Blockly.Blocks['driss_opencv2_nombre_visages_reconnus'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Nombre de visage(s) reconnu(s) ");
    this.setOutput(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


// Blockly.Blocks['driss_opencv2_show_reconized_faces_in_frame'] = {
//   init: function() {
//     this.appendValueInput("FRAME_NAME")
//         .setCheck(null)
//         .setAlign(Blockly.ALIGN_RIGHT)
//         .appendField("Afficher dans la fenêtre");
//     this.appendDummyInput()
//         .appendField("Tous les visages reconnus");
//     this.setInputsInline(false);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(195);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };

// Blockly.Blocks['driss_opencv2_marquer_visages_reconnus'] = {
//   init: function() {
//     this.appendValueInput("PICTURE")
//         .setCheck("String")
//         .appendField("Marquer les visages reconnus sur la photo");
//     this.setInputsInline(false);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(195);
//  this.setTooltip("");
//  this.setHelpUrl("");
//   }
// };


Blockly.Blocks['driss_opencv2_nom_visage_reconnu'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Nom de la personne reconnue sur la photo");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv2_filename_visage_reconnu'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Nom de fichier de la photo réference");
    this.appendDummyInput()
        .appendField("dans laquelle se trouve le visage reconu ");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



