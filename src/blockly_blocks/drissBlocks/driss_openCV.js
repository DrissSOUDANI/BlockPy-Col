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
 * @fileoverview Les blocs pour OpenCV
 * @author Driss Soudani
 */
 'use strict';

 //import * as Blockly from 'blockly';
 //import {ColorPickerField} from 'blockly-field-color-wheel';
 
 goog.require('Blockly.Blocks');
 

 // 1 - ---------------------------------------------------------------------------------------------------------
 Blockly.Blocks['driss_opencv_getColor'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Couleur RGB ")
          .appendField(new Blockly.FieldColour("#ff0000"), "COLOR");
      this.setOutput(true, null);
      this.setColour(Blockly.Msg.drissOpenCV_HUE);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['driss_opencv_getcolor_hsv'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Couleur  : H (Teinte) =")
          .appendField(new Blockly.FieldNumber(0, 0, 179), "H")
          .appendField("  S (Saturation) = ")
          .appendField(new Blockly.FieldNumber(0, 100, 255), "S")
          .appendField("  V (Brillance) = ")
          .appendField(new Blockly.FieldNumber(0, 100, 255), "V");
      this.setOutput(true, null);
      this.setColour(Blockly.Msg.drissOpenCV_HUE);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

// 2 - ---------------------------------------------------------------------------------------------------------
 /* Blockly.Blocks['driss_opencv_getVideoCapture'] = {
    init: function() {
        this.appendValueInput("NUM_CAMERA")
            .setCheck("Number")
            .appendField("Flux vidéo de la caméra n°");
        this.setInputsInline(false);
        this.setOutput(true, "VIDEO_CAPTURE");
        this.setColour(Blockly.Msg.drissOpenCV_HUE);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
*/
    Blockly.Blocks['driss_opencv_capturer_flux_video'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Capturer le flux vidéo de la caméra n°")
            .appendField(new Blockly.FieldDropdown([["0","0"], ["1","1"], ["2","2"]]), "NUM_CAM");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };  

// 3 - ---------------------------------------------------------------------------------------------------------
    Blockly.Blocks['driss_opencv_waitKey'] = {
      init: function() {
        this.appendValueInput("KEY")
            .setCheck("String")
            .appendField("La touche");
        this.appendDummyInput()
            .appendField("est préssée");
        this.setOutput(true, null);
        this.setColour(Blockly.Msg.drissOpenCV_HUE);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };

// 4 - ---------------------------------------------------------------------------------------------------------
/*Blockly.Blocks['driss_opencv_readFrameFromCapture'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("une image du flux")
        .appendField(new Blockly.FieldVariable("captureVideo"), "VAR");
    this.setOutput(true, "IMAGE");
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
*/

/*
Blockly.Blocks['driss_opencv_read_image_form_video'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("une image du flux vidéo de la caméra n°")
        .appendField(new Blockly.FieldDropdown([["0","0"], ["1","1"], ["2","2"]]), "NUM_CAM");
    this.setOutput(true, null);
    this.setColour(135);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
*/
Blockly.Blocks['driss_opencv_read_store_image_form_video'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Lire une image du flux vidéo de la caméra n°")
        .appendField(new Blockly.FieldDropdown([["0","0"], ["1","1"], ["2","2"]]), "NUM_CAM");
    this.appendDummyInput()
        .appendField("et la mettre dans la variable ")
        .appendField(new Blockly.FieldVariable("item"), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 5 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv_changeColorometrie_RGB_to_HSV'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Conversion de l'image RGB stockée dans")
        .appendField(new Blockly.FieldVariable("----"), "VAR")
        .appendField("en image HSV ");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 6 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv_blurImage'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Flouter l'image stockée dans la variable ")
        .appendField(new Blockly.FieldVariable("---"), "VAR");
    this.appendValueInput("KSIZE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Taille du noyeau flou");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 7 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv_inRange'] = {
  init: function() {
    this.appendValueInput("LO_COLOR")
        .setCheck(null)
        .appendField("Masquer, sur l'image ")
        .appendField(new Blockly.FieldVariable("item"), "IMA_SRC")
        .appendField(", toutes les couleurs non comprises entre");
    this.appendValueInput("HI_COLOR")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("et Stocker l'image résultat dans la variable ")
        .appendField(new Blockly.FieldVariable("item"), "IMA_DEST")
        .appendField("                         ")
        .appendField("et");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['driss_opencv_inRange_one_colore'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Créer une image ")
        .appendField(new Blockly.FieldVariable("mask"), "IMA_DEST")
        .appendField("en copiant tous les");
    this.appendValueInput("COLOR")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(" points de l'image")
        .appendField(new Blockly.FieldVariable("item"), "IMA_SRC")
        .appendField("qui ont la couleur");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 8 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv_eroderImage'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Eroder l'image stockée dans ")
        .appendField(new Blockly.FieldVariable("item"), "VAR");
    this.appendValueInput("ER_IT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("nombre d'itérations");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 9 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv_dilaterImage'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Dilater l'image stockée dans ")
        .appendField(new Blockly.FieldVariable("item"), "VAR");
    this.appendValueInput("DI_IT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("nombre d'itérations");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 10 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv_bitwise'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Résultat d'un ")
        .appendField(new Blockly.FieldDropdown([["ET logique","AND"], ["OU logique","OR"], ["OU logique exclusif","XOR"], ["NON","NOT"]]), "OPERATION")
        .appendField("entre les bits de ");
    this.appendDummyInput()
        .appendField("l'image stockée dans")
        .appendField(new Blockly.FieldVariable("item"), "IMA1")
        .appendField("et l'image stockée dans")
        .appendField(new Blockly.FieldVariable("item"), "IMA2");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "USE_MASK")
        .appendField("Réaliser l'opération uniquement pour les points");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("dont la valeur du masque")
        .appendField(new Blockly.FieldVariable("item"), "MASK")
        .appendField("est différente de 0");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 11 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv_bitwise_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Copie des points de l'image")
        .appendField(new Blockly.FieldVariable("item"), "IMA1")
        .appendField("pour lesquels");
    this.appendDummyInput()
        .appendField("la valeur dans le masque")
        .appendField(new Blockly.FieldVariable("item"), "MASK")
        .appendField("est différente de 0");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 12 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv_contour_masque'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Contour de la zone blanche du masque")
        .appendField(new Blockly.FieldVariable("item"), "MASK");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 13 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv_marquage'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Marquer, sur l'image ")
        .appendField(new Blockly.FieldVariable("item"), "IMA")
        .appendField(", la forme délimitée par le contour ")
        .appendField(new Blockly.FieldVariable("item"), "CONTOUR");
    this.appendValueInput("NAME")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Utiliser un ")
        .appendField(new Blockly.FieldDropdown([["Cercle plein","CIRCLE_P"], ["Cercle vide","CIRCLE_V"], ["Rectangle plein","RECT_P"], ["Rectangle vide","RECT_V"], ["Ligne","LINE"]]), "MARQUAGE")
        .appendField("de couleur ")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR")
        .appendField("      Identifier la forme par ce nom");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 14 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv_show_image'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Afficher l'image stockée dans la variable")
        .appendField(new Blockly.FieldVariable("item"), "VAR");
    this.appendValueInput("TITLE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Titre de la fenêtre d'affichage");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.drissOpenCV_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 15 - ---------------------------------------------------------------------------------------------------------
Blockly.Blocks['driss_opencv_release'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Lire une image du flux vidéo de la caméra n°")
        .appendField(new Blockly.FieldDropdown([["0","0"], ["1","1"], ["2","2"]]), "NUM_CAM");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("et Fermer la fenêtre vidéo");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// 7 - ---------------------------------------------------------------------------------------------------------

// 7 - ---------------------------------------------------------------------------------------------------------

// 7 - ---------------------------------------------------------------------------------------------------------

