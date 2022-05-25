/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Générateur de code Python pour les blocs Open CV2
 * @author Driss Soudani
 */
 'use strict';


 goog.require('Blockly.Python');




 
 function hexToRGB(h) {
    let r = 0, g = 0, b = 0;
  
    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
  
    // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    
    return "("+ +r + "," + +g + "," + +b + ")";
  }

  function rgb2hsv (r, g, b) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);
  
        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: s*240,
        v: v*240
    };
  }


  function hexToBGR(h) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
  
    // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    
    return "("+ +b + "," + +g + "," + +r + ")";
  }



  Blockly.Python['driss_opencv2_new_image'] = function(block) {
    var width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_ATOMIC);
    var back = block.getFieldValue('BACK');
    var height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_ATOMIC);
    
    var nbre = "0x" + back[1] + back[2];

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np";

    var code = 'np.ones(('+height+','+width+'), dtype="uint8")*'+ +nbre ;
    return [code, Blockly.Python.ORDER_NONE];
  };


 // 1 - ---------------------------------------------------------------------------------------------------------
 Blockly.Python['driss_opencv2_imread'] = function(block) {
    var image_file = Blockly.Python.valueToCode(block, 'IMAGE_FILE', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

    var code = 'cv2.imread('+image_file+')';
    
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_image_show'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var win_title = Blockly.Python.valueToCode(block, 'TITLE_WINDOW', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    
    var code =  'cv2.imshow('+win_title+', '+var_image+')\n';

    return code;
  };



  Blockly.Python['driss_opencv2_color_RGB'] = function(block) {
    var color = block.getFieldValue('COLOR');
    var R_dec = parseInt(color.substring(1, 3), 16);
    var G_dec = parseInt(color.substring(3, 5), 16);
    var B_dec = parseInt(color.substring(5, 7), 16);

    //alert(color+"   "+R_dec+" "+G_dec+" "+B_dec);
    var code = '('+R_dec+','+G_dec+','+B_dec+')';
    
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_color_BGR'] = function(block) {
    var color = block.getFieldValue('COLOR');
    
    var R_dec = parseInt(color.substring(1, 3), 16);
    var G_dec = parseInt(color.substring(3, 5), 16);
    var B_dec = parseInt(color.substring(5, 7), 16);

    var code = '('+B_dec+','+G_dec+','+R_dec+')';
    
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['driss_opencv2_color_HEX'] = function(block) {
    var color = block.getFieldValue('COLOR');
    
    var code = color;
    
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['driss_opencv2_color_HSV'] = function(block) {
    var color = block.getFieldValue('COLOR');
    
    var R_dec = parseInt(color.substring(1, 3), 16);
    var G_dec = parseInt(color.substring(3, 5), 16);
    var B_dec = parseInt(color.substring(5, 7), 16);
    
    //alert(color+"   "+R_dec+" "+G_dec+" "+B_dec);
    var HSV = rgbToTSL(R_dec, G_dec, B_dec);
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2"
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np"

    var code  = "";
    
    code +=  "np.array(["+HSV.h+", "+HSV.s+", "+HSV.v+"])";
    
    return [code, Blockly.Python.ORDER_NONE];
  };



  Blockly.Python['driss_opencv2_set_rgb_bgr_color'] = function(block) {
    var color_space = block.getFieldValue('COLOR_SPACE');
    var b = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_ATOMIC);
    var g = Blockly.Python.valueToCode(block, 'G', Blockly.Python.ORDER_ATOMIC);
    var r = Blockly.Python.valueToCode(block, 'R', Blockly.Python.ORDER_ATOMIC);
    
    var code = '';
    switch(color_space){
      case "RGB" : code = '('+r+','+g+','+b+')'; break;
      case "BGR" : code = '('+b+','+g+','+r+')'; break;

    }
    //return(code);
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_set_hsv_color'] = function(block) {
    var h = Blockly.Python.valueToCode(block, 'H', Blockly.Python.ORDER_ATOMIC);
    var s = Blockly.Python.valueToCode(block, 'S', Blockly.Python.ORDER_ATOMIC);
    var v = Blockly.Python.valueToCode(block, 'V', Blockly.Python.ORDER_ATOMIC);
   
    var code = code = '('+h+','+s+','+v+')';
    
    return [code, Blockly.Python.ORDER_NONE];
  };

// 2 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv2_draw_rectangle'] = function(block) {
    var left = block.getFieldValue('LEFT');
    var top = block.getFieldValue('TOP');
    var width = block.getFieldValue('WIDTH');
    var height = block.getFieldValue('HEIGHT');
    var var_image = block.getFieldValue('VAR_IMAGE');
    var color_HEX = block.getFieldValue('COLOR');
    var thickness = block.getFieldValue('THICKNESS');
    
    var color_RGB = hexToRGB(color_HEX);

    var right = parseInt(left) + parseInt(width);
    var bottom = parseInt(top) + parseInt(height);
    

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    
    var code = 'cv2.rectangle('+var_image+', ('+left+','+top+'), ('+right+','+bottom+'), '+color_RGB+', thickness='+thickness+' )\n';
    return code;
  };

/*
  Blockly.Python['driss_opencv2_draw_rectangle_2'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var left = Blockly.Python.valueToCode(block, 'LEFT', Blockly.Python.ORDER_ATOMIC);
    var top = Blockly.Python.valueToCode(block, 'TOP', Blockly.Python.ORDER_ATOMIC);
    var right = Blockly.Python.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_ATOMIC);
    var bottom = Blockly.Python.valueToCode(block, 'BOTTOM', Blockly.Python.ORDER_ATOMIC);
    var color_HEX = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    var thickness = Blockly.Python.valueToCode(block, 'THICKNESS', Blockly.Python.ORDER_ATOMIC);
    
    color_HEX = color_HEX.substring(1,8); //color_HEX est reçue entre parenthèses (#FF0000) : il faut retirer les parenthèses
    var color_RGB = hexToRGB(color_HEX);


    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    
    var code = 'cv2.rectangle('+var_image+', ('+left+','+top+'), ('+right+','+bottom+'), '+color_RGB+', thickness='+thickness+' )\n';
    return code;
  };
*/

  // 3 - ---------------------------------------------------------------------------------------------------------

  Blockly.Python['driss_opencv2_draw_circle'] = function(block) {
    var centre_x = block.getFieldValue('CENTRE_X');
    var centre_y = block.getFieldValue('CENTRE_Y');
    var rayon = block.getFieldValue('RAYON');
    var var_image = block.getFieldValue('VAR_IMAGE');
    var color_HEX = block.getFieldValue('COLOR');
    var thickness = block.getFieldValue('THICKNESS');

    var color_RGB = hexToRGB(color_HEX);

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    
    var code = 'cv2.circle('+var_image+', ('+centre_x+','+centre_y+'), ('+rayon+'), '+color_RGB+', thickness='+thickness+' )\n';
    return code;
  };

  /*
  Blockly.Python['driss_opencv2_draw_circle_2'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var centre_x = Blockly.Python.valueToCode(block, 'CENTRE_X', Blockly.Python.ORDER_ATOMIC);
    var centre_y = Blockly.Python.valueToCode(block, 'CENTRE_Y', Blockly.Python.ORDER_ATOMIC);
    var rayon = Blockly.Python.valueToCode(block, 'RAYON', Blockly.Python.ORDER_ATOMIC);
    var color_HEX = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    var thickness = Blockly.Python.valueToCode(block, 'THICKNESS', Blockly.Python.ORDER_ATOMIC);
    
    color_HEX = color_HEX.substring(1,8); //color_HEX est reçue entre parenthèses (#FF0000) : il faut retirer les parenthèses
    var color_RGB = hexToRGB(color_HEX);

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    
    var code = 'cv2.circle('+var_image+', ('+centre_x+','+centre_y+'), ('+rayon+'), '+color_RGB+', thickness='+thickness+' )\n';
    return code;
  };
*/
  // 1 - ---------------------------------------------------------------------------------------------------------

  Blockly.Python['driss_opencv2_draw_ligne'] = function(block) {
    var x1 = block.getFieldValue('X1');
    var y1 = block.getFieldValue('Y1');
    var x2 = block.getFieldValue('X2');
    var y2 = block.getFieldValue('Y2');
    var var_image = block.getFieldValue('VAR_IMAGE');
    var color_HEX = block.getFieldValue('COLOR');
    var thickness = block.getFieldValue('THICKNESS');

    var color_RGB = hexToRGB(color_HEX);

    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    
    var code = 'cv2.line('+var_image+', ('+x1+','+y1+'), ('+x2+','+y2+'), '+color_RGB+', thickness='+thickness+' )\n';
    return code;
  };

/*
  Blockly.Python['driss_opencv2_draw_ligne_2'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var x1 = Blockly.Python.valueToCode(block, 'X1', Blockly.Python.ORDER_ATOMIC);
    var y1 = Blockly.Python.valueToCode(block, 'Y1', Blockly.Python.ORDER_ATOMIC);
    var x2 = Blockly.Python.valueToCode(block, 'X2', Blockly.Python.ORDER_ATOMIC);
    var y2 = Blockly.Python.valueToCode(block, 'Y2', Blockly.Python.ORDER_ATOMIC);
    var color_HEX = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    var thickness = Blockly.Python.valueToCode(block, 'THICKNESS', Blockly.Python.ORDER_ATOMIC);
   
    color_HEX = color_HEX.substring(1,8); //color_HEX est reçue entre parenthèses (#FF0000) : il faut retirer les parenthèses
    var color_RGB = hexToRGB(color_HEX);

    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    
    var code = 'cv2.line('+var_image+', ('+x1+','+y1+'), ('+x2+','+y2+'), '+color_RGB+', thickness='+thickness+' )\n';
    return code;
  };
*/


  Blockly.Python['driss_opencv2_draw_forme'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var forme = block.getFieldValue('FORME');
    var x1 = Blockly.Python.valueToCode(block, 'X1', Blockly.Python.ORDER_ATOMIC);
    var y1 = Blockly.Python.valueToCode(block, 'Y1', Blockly.Python.ORDER_ATOMIC);
    var x2 = Blockly.Python.valueToCode(block, 'X2', Blockly.Python.ORDER_ATOMIC);
    var y2 = Blockly.Python.valueToCode(block, 'Y2', Blockly.Python.ORDER_ATOMIC);
    var rayon = Blockly.Python.valueToCode(block, 'RAYON', Blockly.Python.ORDER_ATOMIC);
    var color_HEX = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    var thickness = Blockly.Python.valueToCode(block, 'THICKNESS', Blockly.Python.ORDER_ATOMIC);
    
    color_HEX = color_HEX.substring(1,8); //color_HEX est reçue entre parenthèses (#FF0000) : il faut retirer les parenthèses
    
    var color_BGR = hexToBGR(color_HEX);

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    var code = '';
    switch(forme){
        case "LINE" : code = 'cv2.line('+var_image+', ('+x1+','+y1+'), ('+x2+','+y2+'), '+color_BGR+', thickness='+thickness+' )\n';
            break;
        case "RECTANGLE" : code = 'cv2.rectangle('+var_image+', ('+x1+','+y1+'), ('+x2+','+y2+'), '+color_BGR+', thickness='+thickness+' )\n';
            break;
        case "CIRCLE" : code = 'cv2.circle('+var_image+', ('+x1+','+y1+'), ('+rayon+'), '+color_BGR+', thickness='+thickness+' )\n';
            break;
    }
    
    return code;
  };


  // 1 - ---------------------------------------------------------------------------------------------------------
  Blockly.Python['driss_opencv2_put_text'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC);
    var font = block.getFieldValue('FONT');
    var pos_x = Blockly.Python.valueToCode(block, 'POS_X', Blockly.Python.ORDER_ATOMIC);
    var scale = block.getFieldValue('SCALE');
    var pos_y = Blockly.Python.valueToCode(block, 'POS_Y', Blockly.Python.ORDER_ATOMIC);
    var thickness = block.getFieldValue('THICKNESS');
    var color_HEX = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    
    font = "cv2."+font;
    color_HEX = color_HEX.substring(1,8); //color_HEX est reçue entre parenthèses (#FF0000) : il faut retirer les parenthèses
    var color_BGR = hexToBGR(color_HEX);

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

    var code = 'cv2.putText('+var_image+', '+text+', ('+pos_x+','+pos_y+'), '+font+', '+scale+', '+color_BGR+', '+thickness+')\n';
    return code;
  };



  

  // 1 - ---------------------------------------------------------------------------------------------------------

  // 1 - ---------------------------------------------------------------------------------------------------------

  // 1 - ---------------------------------------------------------------------------------------------------------

  // 1 - ---------------------------------------------------------------------------------------------------------

  // 1 - ---------------------------------------------------------------------------------------------------------

   // n - ---------------------------------------------------------------------------------------------------------
   Blockly.Python['driss_opencv2_waitKey'] = function(block) {
    var code = 'cv2.waitKey(0)\n';
    return code;
  };

   // n+1 -------------------------------------------------------------------------------------------------------
   Blockly.Python['driss_opencv2_waitKey_val'] = function(block) {
    var key = block.getFieldValue('KEY');
    
    var code =  'if (cv2.waitKey(1) & 0xFF == ord(\''+key[0]+'\')):\n'+
                '   break\n';
    return code;
  };




  Blockly.Python['driss_opencv2_image_grayscale'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    
    var code = 'cv2.cvtColor('+var_image+', cv2.COLOR_BGR2GRAY)\n';
    
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_image_convert_color_space'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var color_space = block.getFieldValue('COLOR_SPACE');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    
    var code = '';

    switch(color_space){
        case "GRAYSCAL" : code = 'cv2.cvtColor('+var_image+', cv2.COLOR_BGR2GRAY)';break;
        case "BGR2HSV" : code = 'cv2.cvtColor('+var_image+', cv2.COLOR_BGR2HSV)';break;
        case "BGR2LAB" : code = 'cv2.cvtColor('+var_image+', cv2.COLOR_BGR2LAB)';break;
        case "BGR2RGB" : code = 'cv2.cvtColor('+var_image+', cv2.COLOR_BGR2RGB)';break;
    }
    
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
 


  Blockly.Python['driss_opencv2_image_blur'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var filtre = block.getFieldValue('FILTRE');
    var kernel = block.getFieldValue('KERNEL');
    var sigma_color = block.getFieldValue('SIGMA_COLOR');
    var sigma_space = block.getFieldValue('SIGMA_SPACE');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    
    var code = '';

    switch(filtre){
        case "GAUSSIEN" : code = 'cv2.GaussianBlur('+var_image+', ('+kernel+','+kernel+'), cv2.BORDER_DEFAULT)\n'; break;
        case "MEDIAN" : code = 'cv2.medianBlur('+var_image+', '+kernel+')';break;
        case "BILATERAL" : code = 'cv2.bilateralFilter('+var_image+', '+kernel+', '+sigma_color+', '+sigma_space+')';break;
    }
    
    
    return [code, Blockly.Python.ORDER_NONE];
  };


 


  Blockly.Python['driss_opencv2_image_canny2'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var seuil_1 = block.getFieldValue('SEUIL_1');
    var seuil_2 = block.getFieldValue('SEUIL_2');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    
    var code = 'cv2.Canny('+var_image+', '+seuil_1+','+seuil_2+')\n';
    
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['driss_opencv2_image_canny'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var threshold_1 = Blockly.Python.valueToCode(block, 'THRESHOLD_1', Blockly.Python.ORDER_ATOMIC);
    var threshold_2 = Blockly.Python.valueToCode(block, 'THRESHOLD_2', Blockly.Python.ORDER_ATOMIC);
//alert(threshold_1);
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;

    var code = 'cv2.Canny('+var_image+', '+threshold_1+','+threshold_2+')\n';
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_image_dilate'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var iterations = block.getFieldValue('ITERATIONS');
    var kernel = block.getFieldValue('KERNEL');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    
    var code = 'cv2.dilate('+var_image+', ('+kernel+','+kernel+'), iterations='+iterations+')\n';
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_image_erode'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var iterations = block.getFieldValue('ITERATIONS');
    var kernel = block.getFieldValue('KERNEL');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    
    var code = 'cv2.erode('+var_image+', ('+kernel+','+kernel+'), iterations='+iterations+')\n';
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_image_resize'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var interpolation = block.getFieldValue('INTERPOLATION');
    var width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_ATOMIC);
    var height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_ATOMIC);
    
    interpolation = "cv2."+interpolation;

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    
    var code = 'cv2.resize('+var_image+', ('+width+','+height+'), interpolation='+interpolation+')\n';
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_image_resize_2'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var interpolation = block.getFieldValue('INTERPOLATION');
    var fx = block.getFieldValue('FX');
    var fy = block.getFieldValue('FY');
    
    interpolation = "cv2."+interpolation;

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    
    var code = 'cv2.resize('+var_image+', (0,0), fx = '+fx+', fy = '+fy+', interpolation='+interpolation+')\n';
    return [code, Blockly.Python.ORDER_NONE];
  };



  Blockly.Python['driss_opencv2_image_cropped'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var x1 = Blockly.Python.valueToCode(block, 'X1', Blockly.Python.ORDER_ATOMIC);
    var y1 = Blockly.Python.valueToCode(block, 'Y1', Blockly.Python.ORDER_ATOMIC);
    var x2 = Blockly.Python.valueToCode(block, 'X2', Blockly.Python.ORDER_ATOMIC);
    var y2 = Blockly.Python.valueToCode(block, 'Y2', Blockly.Python.ORDER_ATOMIC);
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    
    var code = var_image+'['+x1+':'+y1+', '+x2+':'+y2+']\n';
    
    return [code, Blockly.Python.ORDER_NONE];
  };





  //Basics - Transformations d'image
  Blockly.Python['driss_opencv2_translate_image'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var trans_x = Blockly.Python.valueToCode(block, 'TRANS_X', Blockly.Python.ORDER_ATOMIC);
    var trans_y = Blockly.Python.valueToCode(block, 'TRANS_Y', Blockly.Python.ORDER_ATOMIC);
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np" ;

    Blockly.Python.functionNames_["transateImage"] = "#fonction qui opére une translation horizontale et/ou verticale sur une image\n"+
        "def transateImage(image, x, y) :\n"+
        "   transMat = np.float32( [ [1,0,x], [0,1,y] ] )\n"+
        "   dimensions = (image.shape[1], image.shape[0])\n"+
        "   return cv2.warpAffine(image, transMat, demensions)";
    
    var code = 'transateImage('+var_image+', '+trans_x+', '+trans_y+')\n';
    
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['driss_opencv2_rotate_image'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC);
    var rot_point = block.getFieldValue('ROT_POINT');
    var rot_x = block.getFieldValue('ROT_X');
    var rot_y = block.getFieldValue('ROT_Y');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np" ;

    Blockly.Python.functionNames_["rotateImage"] = "#fonction qui opére une rotationde l'image autour du point rotPoint (rotPoint = centre de l'image par défaut)\n"+
        "def rotateImage(image, angle, rotPoint=None) :\n"+
        "   (height, width) = image.shape[:2]\n"+
        "   if rotPoint is None\n"+
        "       rotPoint = (width//2, height//2)\n"+
        "   rotMAt = cv2.getRotationMatrix2D(rotPoint, angle, 1.0)\n"+
        "   dimensions = (width, height)\n"+
        "   return cv2.warpAffine(image, rotMAt, demensions)";
    
        var code = '';
        switch (rot_point){
            case "CENTER" : code = 'rotateImage('+var_image+', '+angle+')\n'; break;
            case "POINT" : code = 'rotateImage('+var_image+', '+angle+', ('+rot_x+', '+rot_y+') )\n'; break;
        }
   
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['driss_opencv2_flip_image'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var sens = block.getFieldValue('SENS');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;

    var code = '';
        switch (sens){
            case "HORIZONTAL" : code = 'cv2.flip('+var_image+', 1)\n'; break;
            case "VERTICAL" : code = 'cv2.flip('+var_image+', 0)\n'; break;
            case "BOTH" : code = 'cv2.flip('+var_image+', -1)\n'; break;
        }
    
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_split_image_chanel'] = function(block) {
    var chanel = block.getFieldValue('CHANEL');
    var var_image = block.getFieldValue('VAR_IMAGE');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np" ;

    //var code = 'b,g,r = cv2.split('+var_image+')\n';
    var code = '';
        switch (chanel){
            // case "BLUE" : code = 'cv2.merge([cv2.split('+var_image+')[0], np.zeros('+var_image+'.shape[:2], dtype=\'uint8\') , np.zeros('+var_image+'.shape[:2], dtype=\'uint8\')])'; break;
            // case "GREEN" : code = 'cv2.merge([np.zeros('+var_image+'.shape[:2], dtype=\'uint8\') , cv2.split('+var_image+')[1], np.zeros('+var_image+'.shape[:2], dtype=\'uint8\')])'; break;
            // case "RED" : code = 'cv2.merge([np.zeros('+var_image+'.shape[:2], dtype=\'uint8\'), np.zeros('+var_image+'.shape[:2], dtype=\'uint8\') , cv2.split('+var_image+')[2]])'; break;

            case "BLUE" : code = 'cv2.split('+var_image+')[0]'; break;
            case "GREEN" : code = 'cv2.split('+var_image+')[1]'; break;
            case "RED" : code = 'cv2.split('+var_image+')[2]'; break;

            case "HUE" : code = 'cv2.split('+var_image+')[0]'; break;
            case "SAT" : code = 'cv2.split('+var_image+')[1]'; break;
            case "VAL" : code = 'cv2.split('+var_image+')[2]'; break;
        }
    
    return [code, Blockly.Python.ORDER_NONE];
  };





  


  Blockly.Python['driss_opencv2_merge_image_chanel'] = function(block) {
    var var_image_b = block.getFieldValue('VAR_IMAGE_B');
    var var_image_g = block.getFieldValue('VAR_IMAGE_G');
    var var_image_r = block.getFieldValue('VAR_IMAGE_R');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;

    var code = 'cv2.merge(['+var_image_b+','+var_image_g+','+var_image_r+'])';

    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_bitwise'] = function(block) {
    var bitwise = block.getFieldValue('BITWISE');
    var var_image_1 = block.getFieldValue('VAR_IMAGE_1');
    var var_image_2 = block.getFieldValue('VAR_IMAGE_2');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    
    var code = '';
        switch (bitwise){
            case "AND" : code = 'cv2.bitwise_and('+var_image_1+', '+var_image_1+', mask='+var_image_2+' )'; break;
            case "OR" : code = 'cv2.bitwise_or('+var_image_1+', '+var_image_2+' )'; break;
            case "XOR" : code = 'cv2.bitwise_xor('+var_image_1+', '+var_image_2+' )'; break;
            case "NOT" : code = 'cv2.bitwise_not('+var_image_1+' )'; break;
        }
    
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_inrange'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var lo_color = Blockly.Python.valueToCode(block, 'LO_COLOR', Blockly.Python.ORDER_ATOMIC);
    var hi_color = Blockly.Python.valueToCode(block, 'HI_COLOR', Blockly.Python.ORDER_ATOMIC);
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;

    var code = 'cv2.inRange('+var_image+', '+lo_color+', '+hi_color+')\n';

    //return(code);
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_std_inrange'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var lo_color = Blockly.Python.valueToCode(block, 'LO_COLOR', Blockly.Python.ORDER_ATOMIC);
    var hi_color = Blockly.Python.valueToCode(block, 'HI_COLOR', Blockly.Python.ORDER_ATOMIC);
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;

    var code = 'cv2.inRange('+var_image+', '+lo_color+', '+hi_color+')\n';

    //return(code);
    return [code, Blockly.Python.ORDER_NONE];
  };


  

  Blockly.Python['driss_opencv2_find_contours'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var var_contours = block.getFieldValue('VAR_CONTOURS');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;

    var code = var_contours+' = cv2.findContours('+var_image+',cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)[0]\n';
    //return [code, Blockly.Python.ORDER_NONE];
    return(code);
  };

  Blockly.Python['driss_opencv2_contour_area'] = function(block) {
    var var_contour = block.getFieldValue('VAR_CONTOUR');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;

    var code = 'cv2.contourArea('+var_contour+')';
    
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['driss_opencv2_contour_perim'] = function(block) {
    var var_contour = block.getFieldValue('VAR_CONTOUR');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    
    var code = 'cv2.arcLength('+var_contour+', True)';
    
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['driss_opencv2_contour_polly'] = function(block) {
    var var_contour = block.getFieldValue('VAR_CONTOUR');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    
    var code = 'cv2.approxPolyDP('+var_contour+', 0.02*cv2.arcLength('+var_contour+', True), True)';
    
    return [code, Blockly.Python.ORDER_NONE];
  };





  Blockly.Python['driss_opencv2_draw_contours'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var var_contour = block.getFieldValue('VAR_CONTOUR');
    var thickness = block.getFieldValue('THICKNESS');
    var color_HEX = block.getFieldValue('COLOR_HEX');

    var color_BGR = hexToBGR(color_HEX);
    //alert(color_HEX+ "    -   "+color_BGR);
    var code = 'cv2.drawContours('+var_image+', '+var_contour+', -1, '+color_BGR+', '+thickness+')\n';
    return code;
  };


  Blockly.Python['driss_opencv2_encadrer_forme'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var var_contour = block.getFieldValue('VAR_CONTOUR');
    var thickness = block.getFieldValue('THICKNESS');
    var color_HEX = block.getFieldValue('COLOR_HEX');
    
    var color_BGR = hexToBGR(color_HEX);

    var code = 'approx = cv2.approxPolyDP('+var_contour+',0.02*cv2.arcLength('+var_contour+',True),True)\n'+
              'x, y, w, h = cv2.boundingRect(approx)\n'+
              'cv2.rectangle('+var_image+',(x,y),(x+w,y+h),'+color_BGR+','+thickness+')\n';
    return code;
  };


  Blockly.Python['driss_opencv2_show_infos_contour'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var var_contour = block.getFieldValue('VAR_CONTOUR');
    var color_HEX = block.getFieldValue('COLOR_HEX');
    var area = block.getFieldValue('AREA') === 'TRUE';
    var peri = block.getFieldValue('PERI') === 'TRUE';
    var poly = block.getFieldValue('POLY') === 'TRUE';
 
    var color_BGR = hexToBGR(color_HEX);
   
    var code = '';
    if (area) {
      code += 'cv2.putText('+var_image+',str(cv2.contourArea('+var_contour+')), (x+(w//2)-10,y+(h//2)-10+20),cv2.FONT_HERSHEY_SIMPLEX,0.7, '+color_BGR+',1)\n';
    }

    if (peri) {
      code += 'cv2.putText('+var_image+',str(round(cv2.arcLength('+var_contour+', True),1)), (x+(w//2)-10,y+(h//2)-10+40),cv2.FONT_HERSHEY_SIMPLEX,0.7, '+color_BGR+',1)\n';
    }

    if (poly) {
      code += 'cv2.putText('+var_image+',str(len(cv2.approxPolyDP('+var_contour+', 0.01*cv2.arcLength('+var_contour+', True), True))), (x+(w//2)-10,y+(h//2)-10),cv2.FONT_HERSHEY_SIMPLEX,0.7, '+color_BGR+',1)\n';
    }
   
    return code;
  };


  Blockly.Python['driss_opencv2_add_trackbar'] = function(block) {
    var windows = block.getFieldValue('WINDOWS');
    var var_name = block.getFieldValue('VAR_NAME');
    var trackbar_name = block.getFieldValue('TRACKBAR_NAME');
    var min = block.getFieldValue('MIN');
    var max = block.getFieldValue('MAX');

    trackbar_name = trackbar_name.replace(/ /g, "")


    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;

    Blockly.Python.functionNames_['on_'+trackbar_name+'Change'] = "\n"+
        "def on_"+trackbar_name+"Change(val) :\n"+
        "   global "+var_name+"\n"+
        "   "+var_name+" = val\n"+
        "   cv2.setTrackbarPos('"+trackbar_name+"', '"+windows+"', "+var_name+")";
    
    var code = 'cv2.createTrackbar("'+trackbar_name+'", "'+windows+'" , '+var_name+', '+max+', on_'+trackbar_name+'Change)\n';
    return code;
  };



  Blockly.Python['driss_opencv2_named_window'] = function(block) {
    var window_title = Blockly.Python.valueToCode(block, 'WINDOW_TITLE', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;
    
    var code = 'cv2.namedWindow('+window_title+')\n';
    return code;
  };

  //Videos



// 1 - ---------------------------------------------------------------------------------------------------------
  Blockly.Python['driss_opencv2_vc_from_file'] = function(block) {
    var video_file = Blockly.Python.valueToCode(block, 'VIDEO_FILE', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2"

    var code ="cv2.VideoCapture("+video_file+")\n";
   
    //return(code);
   return [code, Blockly.Python.ORDER_NONE];
  };



  Blockly.Python['driss_opencv2_video_capture_from_cam'] = function(block) {
    var num_cam = Blockly.Python.valueToCode(block, 'NUM_CAM', Blockly.Python.ORDER_ATOMIC);
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2"

    var code ="cv2.VideoCapture("+num_cam+")\n";
    
    return [code, Blockly.Python.ORDER_NONE];
  };



  // 2 - ---------------------------------------------------------------------------------------------------------

  Blockly.Python['driss_opencv2_vc_is_opened'] = function(block) {
    var video_capture = block.getFieldValue('VIDEO_CAPTURE');
    
    var code = '('+video_capture+'.isOpened() == True)';

    return [code, Blockly.Python.ORDER_NONE];
  };


  // 2 - ---------------------------------------------------------------------------------------------------------
  Blockly.Python['driss_opencv2_vc_show_image'] = function(block) {
    var video_capture = block.getFieldValue('VIDEO_CAPTURE');
    var frame_title = Blockly.Python.valueToCode(block, 'FRAME_TITLE', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    
    var code =  'ret, frame = '+video_capture+'.read()\n'+
                'if ret == True:\n'+
                '   cv2.imshow('+frame_title+',frame)\n';

    return code;
  };



  // 3 - ---------------------------------------------------------------------------------------------------------
  Blockly.Python['driss_opencv2_vc_release'] = function(block) {
    var video_capture = block.getFieldValue('VIDEO_CAPTURE');
    
    var code = video_capture+'.release() \n';
    return code;
  };

  // 5 - ---------------------------------------------------------------------------
  Blockly.Python['driss_opencv2_vc_destroy_all_windows'] = function(block) {

    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

    var code = 'cv2.destroyAllWindows()\n';
    return code;
  };


  Blockly.Python['driss_opencv2_rescale_frame'] = function(block) {
    var frame = block.getFieldValue('FRAME');
    var scale = block.getFieldValue('SCALE');
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    Blockly.Python.functionNames_["rescaleFrame"] = "#fonction qui redimentionne image, vidéo et live vidéo\n"+
        "def rescalFrame(frame, scale=0.75) :\n"+
        "   width = int(frame.shape[1] * scale)\n"+
        "   height = int(frame.shape[0] * scale)\n"+
        "   dimensions = (width, height)\n"+
        "   return True,cv2.resize(frame, dimensions, interpolation=cv2.INTER_AREA)";


    var code = 'rescalFrame('+frame+'[1], '+scale+')\n';
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_cv_next_frame'] = function(block) {
    var video_capture = block.getFieldValue('VIDEO_CAPTURE');
    
    var code = video_capture+'.read()\n';
    
    return [code, Blockly.Python.ORDER_NONE];
  };



  Blockly.Python['driss_opencv2_cv_show_frame'] = function(block) {
    var frame = block.getFieldValue('FRAME');
    var title = Blockly.Python.valueToCode(block, 'TITLE_WINDOW', Blockly.Python.ORDER_ATOMIC);
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    
    var code =  'if '+frame+'[0] == True:\n'+
                '   cv2.imshow('+title+', '+frame+'[1])\n';
    return code;
  };



  Blockly.Python['driss_opencv2_vc_change_resolution'] = function(block) {
    var capture_video = block.getFieldValue('CAPTURE_VIDEO');
    var width = Blockly.Python.valueToCode(block, 'CAPTURE_WIDTH', Blockly.Python.ORDER_ATOMIC);
    var height = Blockly.Python.valueToCode(block, 'CAPTURE_HEIGHT', Blockly.Python.ORDER_ATOMIC);
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    Blockly.Python.functionNames_["changeResolutionOfCaptureVideo"] = "#fonction qui redimentionne uniquement la vidéo en flux direct (Live video)\n"+
        "def changeResolutionOfCaptureVideo(captureVideo, width, height) :\n"+
        "   captureVideo.set(3, width)\n"+
        "   captureVideo.set(4, height)\n";
        
    var code = 'changeResolutionOfCaptureVideo('+capture_video+', '+width+', '+height+')\n';
    return code;
  };

  Blockly.Python['driss_opencv2_hc_google_classifier'] = function(block) {
    var modeles = Blockly.Python.valueToCode(block, 'MODELES', Blockly.Python.ORDER_ATOMIC);
    var labels = Blockly.Python.valueToCode(block, 'LABELS', Blockly.Python.ORDER_ATOMIC);
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
    Blockly.Python.definitions_["import_CVZONE"] = "import cvzone";

    var code = 'fichModelsClassifier = "'+modeles+'\n"';
     code += 'fichLabelsClassifier = "'+labels+'\n"';
    
    return [code, Blockly.Python.ORDER_NONE];
  };




  //************************************************************************************* */
  Blockly.Python['driss_opencv2_begin_video_capture'] = function(block) {
    var num_cam = block.getFieldValue('NUM_CAM');

    Blockly.Python.definitions_["import_CV2"] = "import cv2"
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np"

    Blockly.Python.ds_variables_["VideoCapture_"+num_cam] = "VideoCapture_"+num_cam+" = None";
   
    var code ="VideoCapture_"+num_cam+" = cv2.VideoCapture("+num_cam+")\n";
    code +=  "#Vérifier si la caméra s'est ouverte avec succès\n";
    code +=  "if not VideoCapture_"+num_cam+".isOpened():\n";
    code +=  "    print(\"Erreur lors de l'ouverture du flux vidéo\")\n";
    code +=  "    exit()\n";

    return(code);
   // return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_release_video_capture'] = function(block) {
    var num_cam = block.getFieldValue('NUM_CAM');

    Blockly.Python.ds_variables_["VideoCapture_"+num_cam] = "VideoCapture_"+num_cam+" = None";
    
    var code = 'VideoCapture_'+num_cam+'.release()\n';
    return code;
  };



  Blockly.Python['driss_opencv2_hc_cascade_classifier'] = function(block) {
    var cascade_file = Blockly.Python.valueToCode(block, 'CASCADE_FILE', Blockly.Python.ORDER_ATOMIC);
    
    Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2" ;

    var code = 'cv2.CascadeClassifier(cv2.data.haarcascades +'+cascade_file+')\n';
    
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_hc_detect_multiScale'] = function(block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var var_cascade = block.getFieldValue('VAR_CASCADE');
    var scale_factor = Blockly.Python.valueToCode(block, 'SCALE_FACTOR', Blockly.Python.ORDER_ATOMIC);
    
    var neibhors = Blockly.Python.valueToCode(block, 'NEIBHORS', Blockly.Python.ORDER_ATOMIC);
  
    var code = var_cascade+'.detectMultiScale('+var_image+', scaleFactor='+scale_factor+', minNeighbors='+neibhors+')\n';
    
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['driss_opencv2_hc_encadrer_objet'] = function(block) {
    var var_object = block.getFieldValue('VAR_OBJECT');
    var var_image = block.getFieldValue('VAR_IMAGE');
    var color_HEX = block.getFieldValue('COLOR');
    var thickness = block.getFieldValue('THICKNESS');
    
    var color_BGR = hexToBGR(color_HEX);

    var code = 'for x, y, w, h in '+var_object+':\n';
         code += '   cv2.rectangle('+var_image+', (x, y), (x+w, y+h), '+color_BGR+', '+thickness+')\n';
         return code;
  };