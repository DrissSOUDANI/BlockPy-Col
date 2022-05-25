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
 * @author Driss Soudani
 */
 'use strict';

 //import * as Blockly from 'blockly';
 //import {ColorPickerField} from 'blockly-field-color-wheel';
 
 goog.require('Blockly.Blocks');
 
 var image_w = 150;
 var image_h=100;




  Blockly.Blocks['driss_opencv2_new_image'] = {
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
      this.appendValueInput("B")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("couleur ")
          .appendField(new Blockly.FieldDropdown([["BGR","BGR"], ["RGB","RGB"]]), "COLOR_SPACE")
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
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
      this.appendDummyInput()
          .appendField("Tracer, sur l'image ")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
          .appendField(new Blockly.FieldDropdown([["le segment de droite","LINE"], ["le rectangle","RECTANGLE"], ["le cercle","CIRCLE"]]), "FORME");
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
      this.appendValueInput("Y2" , "INPUT_Y2" )
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

    onchange: function(ev) {
      var forme = this.getFieldValue('FORME');
      var image = "";
      if(forme == "RECTANGLE") {
        if (this.getInput("Y2") == null){
            this.appendValueInput("Y2");
            this.getInput("Y2").appendField("Y2", "LABEL_Y2");
            this. moveInputBefore("Y2", "COLOR");
            this.getInput("Y2").setAlign(Blockly.ALIGN_RIGHT);
        }

        if (this.getInput("X2") == null){
            this.appendValueInput("X2");
            this.getInput("X2").appendField("X2", "LABEL_X2");
            this. moveInputBefore("X2", "Y2");
            this.getInput("X2").setAlign(Blockly.ALIGN_RIGHT);
            
        }
            

        this.getField("LABEL_X1").setValue("Coordonnées (X1,Y1) du coin gauche-haut - X1");
        this.getField("LABEL_X2").setValue("Coordonnées (X2,Y2) du coin droite-bas - X2");
    
        this.removeInput("RAYON",true);
      }

      if(forme == "CIRCLE") {
        this.getField("LABEL_X1").setValue("Coordonnées (X1,Y1) du centre du cercle - X1");
        
        this.removeInput("X2",true);
        this.removeInput("Y2",true);
        if (this.getInput("RAYON") == null){
            this.appendValueInput("RAYON");
            this.getInput("RAYON").appendField("Rayon du cercle", "LABEL_RAYON");
            this.moveInputBefore("RAYON", "COLOR");
            this.getInput("RAYON").setAlign(Blockly.ALIGN_RIGHT);
            //this.getField("LABEL_RAYON").setShadow(true);
            
        }
          
    }

      if(forme == "LINE") {
        
        if (this.getInput("Y2") == null){
            this.appendValueInput("Y2");
            this.getInput("Y2").appendField("Y2", "LABEL_Y2");
            this. moveInputBefore("Y2", "COLOR");
            this.getInput("Y2").setAlign(Blockly.ALIGN_RIGHT);
        }

        if (this.getInput("X2") == null){
            this.appendValueInput("X2");
            this.getInput("X2").appendField("X2", "LABEL_X2");
            this. moveInputBefore("X2", "Y2");
            this.getInput("X2").setAlign(Blockly.ALIGN_RIGHT);
            
        }
            

        this.getField("LABEL_X1").setValue("Coordonnées (X1,Y1) du point de départ - X1");
        this.getField("LABEL_X2").setValue("Coordonnées (X2,Y2) du point d'arrivée - X2");
    
        this.removeInput("RAYON",true);
      }
     }
  };



  Blockly.Blocks['driss_opencv2_put_text'] = {
    init: function() {
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
          .appendField(new Blockly.FieldDropdown([["Simple","FONT_HERSHEY_SIMPLEX"], ["Double","FONT_HERSHEY_DUPLEX"], ["Manuscrite Simple","FONT_HERSHEY_SCRIPT_SIMPLEX"], ["Manuscrite double","FONT_HERSHEY_SCRIPT_COMPLEX"]]), "FONT")
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
    init: function() {
      this.appendDummyInput()
          .appendField("Attendre qu'une touche soit appuyée");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  // n+1 - ---------------------------------------------------------------------------------------------------------

  Blockly.Blocks['driss_opencv2_waitKey_val'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Quitter la boucle si la touche")
          .appendField(new Blockly.FieldTextInput("q"), "KEY")
          .appendField("est pressée");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };





  // Basics : fonctions de base


  Blockly.Blocks['driss_opencv2_image_grayscale'] = {
    init: function() {
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
    init: function() {
      this.appendDummyInput()
          .appendField("Conversion de l'image")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
          .appendField("en ")
          .appendField(new Blockly.FieldDropdown([["niveau de gris","GRAYSCAL"], ["HSV","BGR2HSV"], ["LAB","BGR2LAB"], ["RGB","BGR2RGB"]]), "COLOR_SPACE");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };



  

  Blockly.Blocks['driss_opencv2_image_blur'] = {
    init: function() {
        var validator = function(newValue) {
            if(newValue % 2 == 0) newValue = parseInt(newValue)+1;
            if (newValue >= 15) newValue = 15;
            if (newValue <= 1) newValue = 1;
            return (newValue );
          };

      this.appendDummyInput()
          .appendField("Lissage de l'image")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
          .appendField("par application d'un")
          .appendField(new Blockly.FieldDropdown([["Flou gaussien","GAUSSIEN"], ["Flou médian","MEDIAN"], ["Flou bilatéral","BILATERAL"]]), "FILTRE");
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

    

  validator: function(val) {alert(5);
    this.getSourceBlock().setColour('#FF0000');
  },
    
    onchange: function(ev) {
        var filtre = this.getFieldValue('FILTRE');
        
        
        if(filtre == "BILATERAL" ) {
          this.getField("SIGMA_COLOR").setVisible(true);
          this.getField("SIGMA_SPACE").setVisible(true);
          this.getField("TAG1").setVisible(true);
          this.getField("TAG2").setVisible(true);
          this.render();
        }

        if((filtre == "GAUSSIEN") || (filtre == "MEDIAN") ) {       
            this.getField("SIGMA_COLOR").setVisible(false);
            this.getField("SIGMA_SPACE").setVisible(false);
            this.getField("TAG1").setVisible(false);
            this.getField("TAG2").setVisible(false);
            this.render();
          }
    }


  };

  Blockly.Blocks['driss_opencv2_image_canny2'] = {
    init: function() {
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
    init: function() {
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
    init: function() {
      var validator = function(newValue) {
        if(newValue % 2 == 0) newValue = parseInt(newValue)+1;
        if (newValue >= 15) newValue = 15;
        if (newValue <= 1) newValue = 1;

        if (newValue == 0) newValue = NUll;
        return (newValue );
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
    init: function() {

      var validator = function(newValue) {
        if(newValue % 2 == 0) newValue = parseInt(newValue)+1;
        if (newValue >= 15) newValue = 15;
        if (newValue <= 1) newValue = 1;

        if (newValue == 0) newValue = NUll;
        return (newValue );
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
    init: function() {
      this.appendValueInput("WIDTH")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("l'image")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
          .appendField("redimensionnée par l'interpolation")
          .appendField(new Blockly.FieldDropdown([["INTER_AREA","INTER_AREA"], ["INTER_CUBIC ","INTER_CUBIC "], ["INTER_LINEAR ","INTER_LINEAR "]]), "INTERPOLATION")
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
    init: function() {
      this.appendDummyInput()
          .appendField("l'image")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
          .appendField("redimensionnée par l'interpolation")
          .appendField(new Blockly.FieldDropdown([["INTER_AREA","INTER_AREA"], ["INTER_CUBIC ","INTER_CUBIC "], ["INTER_LINEAR ","INTER_LINEAR "]]), "INTERPOLATION");
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
    init: function() {
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
    init: function() {
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
    init: function() {
      this.appendValueInput("ANGLE")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Rotation de l'image")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
          .appendField("    Angle");
      this.appendDummyInput()
          .appendField("autour")
          .appendField(new Blockly.FieldDropdown([["de son centre","CENTER"], ["du point","POINT"]]), "ROT_POINT")
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

    onchange: function(ev) {
      var rotPoint = this.getFieldValue('ROT_POINT');
      
      if(rotPoint == "CENTER") {
        this.getField("ROT_X").setVisible(false);
        this.getField("ROT_Y").setVisible(false);
        this.getField("TAG1").setVisible(false);
        this.getField("TAG2").setVisible(false);
        this.getField("TAG3").setVisible(false);
        this.render();
      }

      if(rotPoint == "POINT") {
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
    init: function() {
      this.appendDummyInput()
          .appendField("Retourner l'image")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE")
          .appendField(new Blockly.FieldDropdown([["horizontalement","HORIZONTAL"], ["verticalement","VERTICAL"], ["horizontalement et verticalement","BOTH"]]), "SENS");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(135);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };





  Blockly.Blocks['driss_opencv2_split_image_chanel'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("composante")
          .appendField(new Blockly.FieldDropdown([["Bleu","BLUE"], ["Vert","GREEN"], ["Rouge","RED"], ["H","HUE"], ["S","SAT"], ["V","VAL"]]), "CHANEL")
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
    init: function() {
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
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["Intersection (Bitwise AND)","AND"], ["Union (Bitwise OR)","OR"], ["Union sans intersection (Bitwise XOR)","XOR"], ["Inverse (Bitwise NOT)","NOT"]]), "BITWISE")
          .appendField("de l'image")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE_1")
          .appendField("et de l'image", "TAG1")
          .appendField(new Blockly.FieldVariable("variable"), "VAR_IMAGE_2");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    },
    onchange:function(ev){
        var oper = this.getFieldValue("BITWISE");
        
        if(oper == "NOT"){
            console.log(oper);
            this.getField("TAG1").setVisible(false);
            this.getField("VAR_IMAGE_2").setVisible(false);
            this.render(); 
        }else{
            this.getField("TAG1").setVisible(true);
            this.getField("VAR_IMAGE_2").setVisible(true);
            this.render();
        }
        
    }
  };



  Blockly.Blocks['driss_opencv2_inrange'] = {
    init: function() {
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


  Blockly.Blocks['driss_opencv2_std_inrange'] = {
    init: function() {
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



  Blockly.Blocks['driss_opencv2_find_contours'] = {
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
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

  Blockly.Blocks['driss_opencv2_show_infos_contour'] = {
    init: function() {
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


  Blockly.Blocks['driss_opencv2_add_trackbar'] = {
    init: function() {
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


  Blockly.Blocks['driss_opencv2_named_window'] = {
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
      this.appendDummyInput()
          .appendField("libérer l'objet de capture vidéo")
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
    init: function() {
      this.appendDummyInput()
          .appendField("Fermer toutes les fenêtres");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Msg.drissOpenCV_HUE);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };



  Blockly.Blocks['driss_opencv2_rescale_frame'] = {
    init: function() {
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
    init: function() {
      this.appendDummyInput()
          .appendField("Image suivante du flux vidéo")
          .appendField(new Blockly.FieldVariable("variable"), "VIDEO_CAPTURE");
      this.setOutput(true, null);
      this.setColour(Blockly.Msg.drissOpenCV_HUE);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };


  Blockly.Blocks['driss_opencv2_cv_show_frame'] = {
    init: function() {
      this.appendValueInput("TITLE_WINDOW")
          .setCheck("String")
          .appendField("Afficher l'image du flux vidéo")
          .appendField(new Blockly.FieldVariable("variable"), "FRAME")
          .appendField("dans la fenêtre");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Msg.drissOpenCV_HUE);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };



  Blockly.Blocks['driss_opencv2_vc_change_resolution'] = {
    init: function() {
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
    init: function() {
      this.appendDummyInput()
          .appendField("Démarrer la capture du flux vidéo de la caméra n°")
          .appendField(new Blockly.FieldDropdown([["0","0"], ["1","1"], ["2","2"]]), "NUM_CAM");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };


  Blockly.Blocks['driss_opencv2_release_video_capture'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Arrêter le flux vidéo de la caméra n°")
          .appendField(new Blockly.FieldDropdown([["0","0"], ["1","1"], ["2","2"]]), "NUM_CAM");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };










  Blockly.Blocks['driss_opencv2_hc_cascade_classifier'] = {
    init: function() {
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
    init: function() {
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
    init: function() {
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
    init: function() {
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