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

  return "(" + +r + "," + +g + "," + +b + ")";
}

function rgb2hsv(r, g, b) {
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
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: s * 240,
    v: v * 240
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

  return "(" + +b + "," + +g + "," + +r + ")";
}



Blockly.Python['driss_opencv2_new_image'] = function (block) {
  var width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_ATOMIC);
  var back = block.getFieldValue('BACK');
  var height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_ATOMIC);

  var nbre = "0x" + back[1] + back[2];

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";

  var code = 'np.ones((' + height + ',' + width + '), dtype="uint8")*' + +nbre;
  return [code, Blockly.Python.ORDER_NONE];
};


// 1 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv2_imread'] = function (block) {
  var image_file = Blockly.Python.valueToCode(block, 'IMAGE_FILE', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.imread(r' + image_file + ')';

  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_image_show'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var win_title = Blockly.Python.valueToCode(block, 'TITLE_WINDOW', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.imshow(' + win_title + ', ' + var_image + ')\n';

  return code;
};



Blockly.Python['driss_opencv2_color_RGB'] = function (block) {
  var color = block.getFieldValue('COLOR');
  var R_dec = parseInt(color.substring(1, 3), 16);
  var G_dec = parseInt(color.substring(3, 5), 16);
  var B_dec = parseInt(color.substring(5, 7), 16);

  //alert(color+"   "+R_dec+" "+G_dec+" "+B_dec);
  var code = '(' + R_dec + ',' + G_dec + ',' + B_dec + ')';

  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_color_BGR'] = function (block) {
  var color = block.getFieldValue('COLOR');

  var R_dec = parseInt(color.substring(1, 3), 16);
  var G_dec = parseInt(color.substring(3, 5), 16);
  var B_dec = parseInt(color.substring(5, 7), 16);

  var code = '(' + B_dec + ',' + G_dec + ',' + R_dec + ')';

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['driss_opencv2_color_HEX'] = function (block) {
  var color = block.getFieldValue('COLOR');

  var code = color;

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['driss_opencv2_color_HSV'] = function (block) {
  var color = block.getFieldValue('COLOR');

  var R_dec = parseInt(color.substring(1, 3), 16);
  var G_dec = parseInt(color.substring(3, 5), 16);
  var B_dec = parseInt(color.substring(5, 7), 16);

  //alert(color+"   "+R_dec+" "+G_dec+" "+B_dec);
  var HSV = rgbToTSL(R_dec, G_dec, B_dec);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";

  var code = "";

  code += "np.array([" + HSV.h + ", " + HSV.s + ", " + HSV.v + "])";

  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['driss_opencv2_set_rgb_bgr_color'] = function (block) {
  var color_space = block.getFieldValue('COLOR_SPACE');
  var b = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_ATOMIC);
  var g = Blockly.Python.valueToCode(block, 'G', Blockly.Python.ORDER_ATOMIC);
  var r = Blockly.Python.valueToCode(block, 'R', Blockly.Python.ORDER_ATOMIC);

  var code = '';
  switch (color_space) {
    case "RGB": code = '(' + r + ',' + g + ',' + b + ')'; break;
    case "BGR": code = '(' + b + ',' + g + ',' + r + ')'; break;

  }
  //return(code);
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_set_hsv_color'] = function (block) {
  var h = Blockly.Python.valueToCode(block, 'H', Blockly.Python.ORDER_ATOMIC);
  var s = Blockly.Python.valueToCode(block, 'S', Blockly.Python.ORDER_ATOMIC);
  var v = Blockly.Python.valueToCode(block, 'V', Blockly.Python.ORDER_ATOMIC);

  var code = code = '(' + h + ',' + s + ',' + v + ')';

  return [code, Blockly.Python.ORDER_NONE];
};

// 2 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv2_draw_rectangle'] = function (block) {
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

  var code = 'cv2.rectangle(' + var_image + ', (' + left + ',' + top + '), (' + right + ',' + bottom + '), ' + color_RGB + ', thickness=' + thickness + ' )\n';
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

Blockly.Python['driss_opencv2_draw_circle'] = function (block) {
  var centre_x = block.getFieldValue('CENTRE_X');
  var centre_y = block.getFieldValue('CENTRE_Y');
  var rayon = block.getFieldValue('RAYON');
  var var_image = block.getFieldValue('VAR_IMAGE');
  var color_HEX = block.getFieldValue('COLOR');
  var thickness = block.getFieldValue('THICKNESS');

  var color_RGB = hexToRGB(color_HEX);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.circle(' + var_image + ', (' + centre_x + ',' + centre_y + '), (' + rayon + '), ' + color_RGB + ', thickness=' + thickness + ' )\n';
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

Blockly.Python['driss_opencv2_draw_ligne'] = function (block) {
  var x1 = block.getFieldValue('X1');
  var y1 = block.getFieldValue('Y1');
  var x2 = block.getFieldValue('X2');
  var y2 = block.getFieldValue('Y2');
  var var_image = block.getFieldValue('VAR_IMAGE');
  var color_HEX = block.getFieldValue('COLOR');
  var thickness = block.getFieldValue('THICKNESS');

  var color_RGB = hexToRGB(color_HEX);


  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.line(' + var_image + ', (' + x1 + ',' + y1 + '), (' + x2 + ',' + y2 + '), ' + color_RGB + ', thickness=' + thickness + ' )\n';
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


Blockly.Python['driss_opencv2_draw_forme'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var forme = block.getFieldValue('FORME');
  var x1 = Blockly.Python.valueToCode(block, 'X1', Blockly.Python.ORDER_ATOMIC);
  var y1 = Blockly.Python.valueToCode(block, 'Y1', Blockly.Python.ORDER_ATOMIC);
  var x2 = Blockly.Python.valueToCode(block, 'X2', Blockly.Python.ORDER_ATOMIC);
  var y2 = Blockly.Python.valueToCode(block, 'Y2', Blockly.Python.ORDER_ATOMIC);
  var rayon = Blockly.Python.valueToCode(block, 'RAYON', Blockly.Python.ORDER_ATOMIC);
  var color_HEX = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
  var thickness = Blockly.Python.valueToCode(block, 'THICKNESS', Blockly.Python.ORDER_ATOMIC);

  color_HEX = color_HEX.substring(1, 8); //color_HEX est reçue entre parenthèses (#FF0000) : il faut retirer les parenthèses

  var color_BGR = hexToBGR(color_HEX);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  var code = '';
  switch (forme) {
    case "LINE": code = 'cv2.line(' + var_image + ', (' + x1 + ',' + y1 + '), (' + x2 + ',' + y2 + '), ' + color_BGR + ', thickness=' + thickness + ' )\n';
      break;
    case "RECTANGLE": code = 'cv2.rectangle(' + var_image + ', (' + x1 + ',' + y1 + '), (' + x2 + ',' + y2 + '), ' + color_BGR + ', thickness=' + thickness + ' )\n';
      break;
    case "CIRCLE": code = 'cv2.circle(' + var_image + ', (' + x1 + ',' + y1 + '), (' + rayon + '), ' + color_BGR + ', thickness=' + thickness + ' )\n';
      break;
  }

  return code;
};


// 1 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv2_put_text'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC);
  var font = block.getFieldValue('FONT');
  var pos_x = Blockly.Python.valueToCode(block, 'POS_X', Blockly.Python.ORDER_ATOMIC);
  var scale = block.getFieldValue('SCALE');
  var pos_y = Blockly.Python.valueToCode(block, 'POS_Y', Blockly.Python.ORDER_ATOMIC);
  var thickness = block.getFieldValue('THICKNESS');
  var color_HEX = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);

  font = "cv2." + font;
  color_HEX = color_HEX.substring(1, 8); //color_HEX est reçue entre parenthèses (#FF0000) : il faut retirer les parenthèses
  var color_BGR = hexToBGR(color_HEX);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.putText(' + var_image + ', ' + text + ', (' + pos_x + ',' + pos_y + '), ' + font + ', ' + scale + ', ' + color_BGR + ', ' + thickness + ')\n';
  return code;
};





// 1 - ---------------------------------------------------------------------------------------------------------

// 1 - ---------------------------------------------------------------------------------------------------------

// 1 - ---------------------------------------------------------------------------------------------------------

// 1 - ---------------------------------------------------------------------------------------------------------

// 1 - ---------------------------------------------------------------------------------------------------------

// n - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv2_waitKey'] = function (block) {

  var key = block.getFieldValue('KEY');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  Blockly.Python.ds_variables_["__keypressed__"] = '__keypressed__ = None';  

  
  var code = '';
  code += 'print("Appuyer sur une touche...")\n';
  code += '__keypressed__ = cv2.waitKey(0)\n'
  return code;
};

// n+1 -------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv2_waitKey_val'] = function (block) {
  var key = block.getFieldValue('KEY');
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.ds_variables_["__keypressed__"] = '__keypressed__ = None';  
  key= key.toLowerCase();
  var val = 0;
  switch (key) {
    case "esc" : val = 27; break;
    case "echap" : val = 27; break;
    case "echappe" : val = 27; break;
    case "entree" : val = 13; break;
    case "entrée" : val = 13; break;
    case "espace" : val = 32; break; 
    default : val = key.charCodeAt(0);
  }
  //var code = 'if (cv2.waitKey(1) & 0xFF == ord(\'' + key[0] + '\')):\n' +
  //  '   break\n';
  var code = "";

  code += "if (cv2.waitKey(30) & 0xFF == " +val+ "):\n";
  code += "    break\n";
  
  return code;
};


Blockly.Python['driss_opencv2_if_keypressed_is'] = function (block) {
  var key = block.getFieldValue('KEY');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.ds_variables_["__keypressed__"] = '__keypressed__ = None';  

  key= key.toLowerCase();
  var val = 0;
  switch (key) {
    case "esc" : val = 27; break;
    case "echap" : val = 27; break;
    case "echappe" : val = 27; break;
    case "entree" : val = 13; break;
    case "entrée" : val = 13; break;
    case "espace" : val = 32; break; 
    default : val = key.charCodeAt(0);
  }
  
  var code = "( (cv2.waitKey(30) == "+val+") or (__keypressed__ == "+val+") )" ;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['driss_opencv2_get_keypressed_in_var'] = function (block) {
  var key = block.getFieldValue('KEYPRESSED');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  
  var code = key+" = cv2.waitKey(30) & 0x0FF \n" ;
  return code;
};


Blockly.Python['driss_opencv2_find_hsv_color_of_object'] = function (block) {
  var num_cam = block.getFieldValue('NUM_CAM');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";

  Blockly.Python.ds_variables_["fenetreControle"] = 'fenetreControle = "Trouver les composantes HSV de la couleur d\'un objet       -           V2 @ Driss SOUDANI"';
  

  Blockly.Python.functionNames_["doNothing"] = "#fonction \n" +
    "def doNothing(val) :\n" +
    "   pass\n";
  
  var code = '' ;
  code += 'camera = cv2.VideoCapture('+num_cam+') \n'+
  'cv2.namedWindow(fenetreControle, cv2.WINDOW_NORMAL) \n'+
  'cv2.resizeWindow(fenetreControle, 1440, 720) \n'+
  'cv2.createTrackbar("H min", fenetreControle , 0, 179, doNothing) \n'+
  'cv2.createTrackbar("H max", fenetreControle , 0, 179, doNothing) \n'+
  'cv2.createTrackbar("S min", fenetreControle , 0, 255, doNothing) \n'+
  'cv2.createTrackbar("S max", fenetreControle , 0, 255, doNothing) \n'+
  'cv2.createTrackbar("V min", fenetreControle , 0, 255, doNothing) \n'+
  'cv2.createTrackbar("V max", fenetreControle , 0, 255, doNothing) \n'+
  'cv2.createTrackbar("Erosion", fenetreControle , 0, 13, doNothing) \n'+
  'cv2.createTrackbar("Dilatation", fenetreControle , 0, 13, doNothing) \n'+
  'cv2.setTrackbarPos("H min", fenetreControle,0) \n'+
  'cv2.setTrackbarPos("H max", fenetreControle,179) \n'+
  'cv2.setTrackbarPos("S min", fenetreControle,100) \n'+
  'cv2.setTrackbarPos("S max", fenetreControle,255) \n'+
  'cv2.setTrackbarPos("V min", fenetreControle,100) \n'+
  'cv2.setTrackbarPos("V max", fenetreControle,255) \n'+
  'while not ((cv2.waitKey(1) & 0xFF == ord("q") )): \n'+
  '  imageBGR = camera.read()[1] \n'+
  '  imageBGR = cv2.resize(imageBGR,(480,360)) \n'+
  '  imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV) \n'+
  '  lo_H = cv2.getTrackbarPos("H min",fenetreControle) \n'+
  '  lo_S = cv2.getTrackbarPos("S min",fenetreControle) \n'+
  '  lo_V = cv2.getTrackbarPos("V min",fenetreControle) \n'+
  '  hi_H = cv2.getTrackbarPos("H max",fenetreControle) \n'+
  '  hi_S = cv2.getTrackbarPos("S max",fenetreControle) \n'+
  '  hi_V = cv2.getTrackbarPos("V max",fenetreControle) \n'+
  '  if(lo_H > hi_H): lo_H = hi_H-1 \n'+
  '  if(lo_S > hi_S): lo_S = hi_S-1 \n'+
  '  if(lo_V > hi_V): lo_V = hi_V-1 \n'+
  '  cv2.setTrackbarPos("H min",fenetreControle, lo_H) \n'+
  '  cv2.setTrackbarPos("S min",fenetreControle, lo_S) \n'+
  '  cv2.setTrackbarPos("V min",fenetreControle, lo_V) \n'+
  '  imageMask = cv2.inRange(imageHSV, (lo_H, lo_S, lo_V), (hi_H, hi_S, hi_V)) \n'+
  '  imageBGRmasked = cv2.bitwise_and(imageBGR, imageBGR, mask=imageMask) \n'+
  '  erosion = cv2.getTrackbarPos("Erosion",fenetreControle) \n'+
  '  dilatation = cv2.getTrackbarPos("Dilatation",fenetreControle) \n'+
  '  imageMask=cv2.erode(imageMask, None, iterations=erosion) \n'+
  '  imageMask=cv2.dilate(imageMask, None, iterations=dilatation) \n'+
  '  rows_imageBGR, cols_imageBGR, channels = imageBGR.shape \n'+
  '  rows_imageMask, cols_imageMask = imageMask.shape \n'+
  '  rows_comb = max(rows_imageBGR, rows_imageMask) \n'+
  '  cols_comb = cols_imageBGR + cols_imageMask \n'+
  '  comb = np.zeros(shape=(rows_comb, cols_comb, channels), dtype=np.uint8) \n'+
  '  comb[:rows_imageBGR, :cols_imageBGR] = imageBGR \n'+
  '  comb[:rows_imageMask, cols_imageBGR:] = imageMask[:, :, None] \n'+
  '  im= cv2.hconcat([comb, imageBGRmasked]) \n'+
  '  cv2.imshow(fenetreControle, im) \n'+
  'camera.release() \n'+
  'cv2.destroyAllWindows()\n';

  return code;
};


Blockly.Python['driss_opencv2_find_seuils_canny'] = function (block) {
  var path_to_image = block.getFieldValue('PATH_TO_IMAGE');
  var cb_show_original_image = block.getFieldValue('SHOW_ORIGINAL_IMAGE') === 'TRUE';
  var cb_show_gray_image = block.getFieldValue('SHOW_GRAY_IMAGE') === 'TRUE';
 
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";


  Blockly.Python.functionNames_["on_Seuil_1_cursorSlide"] = "#fonction \n" +
    "def on_Seuil_1_cursorSlide(val) :\n" +
    "   global seuil_1\n"+
    "   global titre_fenetre\n"+
    "   seuil_1 = val\n"+
    "   cv2.setTrackbarPos('Seuil_1', titre_fenetre, seuil_1)\n";

    Blockly.Python.functionNames_["on_Seuil_2_cursorSlide"] = "#fonction \n" +
    "def on_Seuil_2_cursorSlide(val) :\n" +
    "   global seuil_2\n"+
    "   global titre_fenetre\n"+
    "   seuil_2 = val\n"+
    "   cv2.setTrackbarPos('Seuil_2', titre_fenetre, seuil_2)\n";
    
    Blockly.Python.functionNames_["doNothing"] = "#fonction \n" +
    "def doNothing(val) :\n" +
    "   pass\n";
  
  var code = '' ;
  code += 'seuil_1 = 0 \n'+
  'seuil_2 = 0\n'+
  'titre_fenetre = "Recherche de seuils pour filtre de Canny  - Driss SOUDANI" \n'+
  'image = r"'+path_to_image+'"\n'+
  'cv2.namedWindow("Image original")\n'+
  'cv2.namedWindow("Image en niveaux de gris")\n'+
  'cv2.namedWindow(titre_fenetre)\n'+
  'cv2.createTrackbar("Seuil 1", titre_fenetre , seuil_1, 255, on_Seuil_1_cursorSlide)\n'+
  'cv2.createTrackbar("Seuil 2", titre_fenetre , seuil_2, 255, on_Seuil_2_cursorSlide)\n'+
  'cv2.createTrackbar("Erosion", titre_fenetre , 0, 13, doNothing)\n'+
  'cv2.createTrackbar("Dilatation", titre_fenetre , 0, 13, doNothing)\n'+

 
  
  'imageOriginale = cv2.imread(image)\n'+
  'imageNiveauxGris = cv2.cvtColor(imageOriginale, cv2.COLOR_BGR2GRAY)\n'+
  'imgBlur = cv2.GaussianBlur(imageNiveauxGris,(5,5),1)\n';
  

  if(cb_show_original_image) {code += 'cv2.imshow("Image original", imageOriginale)\n'};
  if(cb_show_gray_image) {code += 'cv2.imshow("Image en niveaux de gris", imageNiveauxGris)\n'};
  
  code+= 'while True:\n'+
  '  seuil_1 = cv2.getTrackbarPos("Seuil 1",titre_fenetre)\n'+
  '  seuil_2 = cv2.getTrackbarPos("Seuil 2",titre_fenetre)\n'+
  
  '  imageAvecCanny = cv2.Canny(imgBlur, seuil_1,seuil_2)\n'+

  '  erosion = cv2.getTrackbarPos("Erosion",titre_fenetre)\n'+
  '  dilatation = cv2.getTrackbarPos("Dilatation",titre_fenetre)\n'+
  '  kernel = np.ones((5,5))\n'+
  '  imageAvecCanny=cv2.erode(imageAvecCanny, kernel, iterations=erosion)\n'+
  '  imageAvecCanny=cv2.dilate(imageAvecCanny, kernel, iterations=dilatation)\n'+

  '  cv2.imshow(titre_fenetre, imageAvecCanny)\n'+
  '  if (cv2.waitKey(30) & 0xFF == 113):\n'+
  '    break\n';
  
 

  return code;
};






Blockly.Python['driss_opencv2_wait_this_key_pressed'] = function (block) {
  var key = block.getFieldValue('KEYPRESSED');

  key= key.toLowerCase();
  var val = 0;
  switch (key) {
    case "esc" : val = 27; break;
    case "echap" : val = 27; break;
    case "echappe" : val = 27; break;
    case "entree" : val = 13; break;
    case "entrée" : val = 13; break;
    case "espace" : val = 32; break; 
    default : val = key.charCodeAt(0);
  }

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = "(cv2.waitKey(0) == "+val+")" ;
  return [code, Blockly.Python.ORDER_NONE];
};




Blockly.Python['driss_opencv2_image_grayscale'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.cvtColor(' + var_image + ', cv2.COLOR_BGR2GRAY)\n';

  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_image_convert_color_space'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var color_space = block.getFieldValue('COLOR_SPACE');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = '';

  switch (color_space) {
    case "GRAYSCAL": code = 'cv2.cvtColor(' + var_image + ', cv2.COLOR_BGR2GRAY)'; break;
    case "BGR2HSV": code = 'cv2.cvtColor(' + var_image + ', cv2.COLOR_BGR2HSV)'; break;
    case "BGR2LAB": code = 'cv2.cvtColor(' + var_image + ', cv2.COLOR_BGR2LAB)'; break;
    case "BGR2RGB": code = 'cv2.cvtColor(' + var_image + ', cv2.COLOR_BGR2RGB)'; break;
  }

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['driss_opencv2_image_blur'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var filtre = block.getFieldValue('FILTRE');
  var kernel = block.getFieldValue('KERNEL');
  var sigma_color = block.getFieldValue('SIGMA_COLOR');
  var sigma_space = block.getFieldValue('SIGMA_SPACE');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = '';

  switch (filtre) {
    case "GAUSSIEN": code = 'cv2.GaussianBlur(' + var_image + ', (' + kernel + ',' + kernel + '), cv2.BORDER_DEFAULT)\n'; break;
    case "MEDIAN": code = 'cv2.medianBlur(' + var_image + ', ' + kernel + ')'; break;
    case "BILATERAL": code = 'cv2.bilateralFilter(' + var_image + ', ' + kernel + ', ' + sigma_color + ', ' + sigma_space + ')'; break;
  }


  return [code, Blockly.Python.ORDER_NONE];
};





Blockly.Python['driss_opencv2_image_canny2'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var seuil_1 = block.getFieldValue('SEUIL_1');
  var seuil_2 = block.getFieldValue('SEUIL_2');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.Canny(' + var_image + ', ' + seuil_1 + ',' + seuil_2 + ')\n';

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['driss_opencv2_image_canny'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var threshold_1 = Blockly.Python.valueToCode(block, 'THRESHOLD_1', Blockly.Python.ORDER_ATOMIC);
  var threshold_2 = Blockly.Python.valueToCode(block, 'THRESHOLD_2', Blockly.Python.ORDER_ATOMIC);
  //alert(threshold_1);
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.Canny(' + var_image + ', ' + threshold_1 + ',' + threshold_2 + ')\n';
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_image_dilate'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var iterations = block.getFieldValue('ITERATIONS');
  var kernel = block.getFieldValue('KERNEL');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.dilate(' + var_image + ', (' + kernel + ',' + kernel + '), iterations=' + iterations + ')\n';
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_image_erode'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var iterations = block.getFieldValue('ITERATIONS');
  var kernel = block.getFieldValue('KERNEL');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.erode(' + var_image + ', (' + kernel + ',' + kernel + '), iterations=' + iterations + ')\n';
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_image_resize'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var interpolation = block.getFieldValue('INTERPOLATION');
  var width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_ATOMIC);
  var height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_ATOMIC);

  interpolation = "cv2." + interpolation;

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.resize(' + var_image + ', (' + width + ',' + height + '), interpolation=' + interpolation + ')\n';
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_image_resize_2'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var interpolation = block.getFieldValue('INTERPOLATION');
  var fx = block.getFieldValue('FX');
  var fy = block.getFieldValue('FY');

  interpolation = "cv2." + interpolation;

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.resize(' + var_image + ', (0,0), fx = ' + fx + ', fy = ' + fy + ', interpolation=' + interpolation + ')\n';
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['driss_opencv2_image_cropped'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var x1 = Blockly.Python.valueToCode(block, 'X1', Blockly.Python.ORDER_ATOMIC);
  var y1 = Blockly.Python.valueToCode(block, 'Y1', Blockly.Python.ORDER_ATOMIC);
  var x2 = Blockly.Python.valueToCode(block, 'X2', Blockly.Python.ORDER_ATOMIC);
  var y2 = Blockly.Python.valueToCode(block, 'Y2', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = var_image + '[' + x1 + ':' + y1 + ', ' + x2 + ':' + y2 + ']\n';

  return [code, Blockly.Python.ORDER_NONE];
};





//Basics - Transformations d'image
Blockly.Python['driss_opencv2_translate_image'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var trans_x = Blockly.Python.valueToCode(block, 'TRANS_X', Blockly.Python.ORDER_ATOMIC);
  var trans_y = Blockly.Python.valueToCode(block, 'TRANS_Y', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";

  Blockly.Python.functionNames_["transateImage"] = "#fonction qui opére une translation horizontale et/ou verticale sur une image\n" +
    "def transateImage(image, x, y) :\n" +
    "   transMat = np.float32( [ [1,0,x], [0,1,y] ] )\n" +
    "   dimensions = (image.shape[1], image.shape[0])\n" +
    "   return cv2.warpAffine(image, transMat, demensions)";

  var code = 'transateImage(' + var_image + ', ' + trans_x + ', ' + trans_y + ')\n';

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['driss_opencv2_rotate_image'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC);
  var rot_point = block.getFieldValue('ROT_POINT');
  var rot_x = block.getFieldValue('ROT_X');
  var rot_y = block.getFieldValue('ROT_Y');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";

  Blockly.Python.functionNames_["rotateImage"] = "#fonction qui opére une rotationde l'image autour du point rotPoint (rotPoint = centre de l'image par défaut)\n" +
    "def rotateImage(image, angle, rotPoint=None) :\n" +
    "   (height, width) = image.shape[:2]\n" +
    "   if rotPoint is None\n" +
    "       rotPoint = (width//2, height//2)\n" +
    "   rotMAt = cv2.getRotationMatrix2D(rotPoint, angle, 1.0)\n" +
    "   dimensions = (width, height)\n" +
    "   return cv2.warpAffine(image, rotMAt, demensions)";

  var code = '';
  switch (rot_point) {
    case "CENTER": code = 'rotateImage(' + var_image + ', ' + angle + ')\n'; break;
    case "POINT": code = 'rotateImage(' + var_image + ', ' + angle + ', (' + rot_x + ', ' + rot_y + ') )\n'; break;
  }

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['driss_opencv2_flip_image'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var sens = block.getFieldValue('SENS');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = '';
  switch (sens) {
    case "HORIZONTAL": code = 'cv2.flip(' + var_image + ', 1)\n'; break;
    case "VERTICAL": code = 'cv2.flip(' + var_image + ', 0)\n'; break;
    case "BOTH": code = 'cv2.flip(' + var_image + ', -1)\n'; break;
  }

  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_split_image_chanel'] = function (block) {
  var chanel = block.getFieldValue('CHANEL');
  var var_image = block.getFieldValue('VAR_IMAGE');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";

  //var code = 'b,g,r = cv2.split('+var_image+')\n';
  var code = '';
  switch (chanel) {
    // case "BLUE" : code = 'cv2.merge([cv2.split('+var_image+')[0], np.zeros('+var_image+'.shape[:2], dtype=\'uint8\') , np.zeros('+var_image+'.shape[:2], dtype=\'uint8\')])'; break;
    // case "GREEN" : code = 'cv2.merge([np.zeros('+var_image+'.shape[:2], dtype=\'uint8\') , cv2.split('+var_image+')[1], np.zeros('+var_image+'.shape[:2], dtype=\'uint8\')])'; break;
    // case "RED" : code = 'cv2.merge([np.zeros('+var_image+'.shape[:2], dtype=\'uint8\'), np.zeros('+var_image+'.shape[:2], dtype=\'uint8\') , cv2.split('+var_image+')[2]])'; break;

    case "BLUE": code = 'cv2.split(' + var_image + ')[0]'; break;
    case "GREEN": code = 'cv2.split(' + var_image + ')[1]'; break;
    case "RED": code = 'cv2.split(' + var_image + ')[2]'; break;

    case "HUE": code = 'cv2.split(' + var_image + ')[0]'; break;
    case "SAT": code = 'cv2.split(' + var_image + ')[1]'; break;
    case "VAL": code = 'cv2.split(' + var_image + ')[2]'; break;
  }

  return [code, Blockly.Python.ORDER_NONE];
};








Blockly.Python['driss_opencv2_merge_image_chanel'] = function (block) {
  var var_image_b = block.getFieldValue('VAR_IMAGE_B');
  var var_image_g = block.getFieldValue('VAR_IMAGE_G');
  var var_image_r = block.getFieldValue('VAR_IMAGE_R');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.merge([' + var_image_b + ',' + var_image_g + ',' + var_image_r + '])';

  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_bitwise'] = function (block) {
  var bitwise = block.getFieldValue('BITWISE');
  var var_image_1 = block.getFieldValue('VAR_IMAGE_1');
  var var_image_2 = block.getFieldValue('VAR_IMAGE_2');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = '';
  switch (bitwise) {
    case "AND": code = 'cv2.bitwise_and(' + var_image_1 + ', ' + var_image_1 + ', mask=' + var_image_2 + ' )'; break;
    case "OR": code = 'cv2.bitwise_or(' + var_image_1 + ', ' + var_image_2 + ' )'; break;
    case "XOR": code = 'cv2.bitwise_xor(' + var_image_1 + ', ' + var_image_2 + ' )'; break;
    case "NOT": code = 'cv2.bitwise_not(' + var_image_1 + ' )'; break;
  }

  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_inrange'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var lo_color = Blockly.Python.valueToCode(block, 'LO_COLOR', Blockly.Python.ORDER_ATOMIC);
  var hi_color = Blockly.Python.valueToCode(block, 'HI_COLOR', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.inRange(' + var_image + ', ' + lo_color + ', ' + hi_color + ')\n';

  //return(code);
  return [code, Blockly.Python.ORDER_NONE];
};






Blockly.Python['driss_opencv2_find_contours'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var var_contours = block.getFieldValue('VAR_CONTOURS');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = var_contours + ' = cv2.findContours(' + var_image + ',cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)[0]\n';
  //return [code, Blockly.Python.ORDER_NONE];
  return (code);
};

Blockly.Python['driss_opencv2_contour_area'] = function (block) {
  var var_contour = block.getFieldValue('VAR_CONTOUR');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.contourArea(' + var_contour + ')';

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['driss_opencv2_contour_perim'] = function (block) {
  var var_contour = block.getFieldValue('VAR_CONTOUR');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.arcLength(' + var_contour + ', True)';

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['driss_opencv2_contour_polly'] = function (block) {
  var var_contour = block.getFieldValue('VAR_CONTOUR');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'len(cv2.approxPolyDP(' + var_contour + ', 0.02*cv2.arcLength(' + var_contour + ', True), True))';

  return [code, Blockly.Python.ORDER_NONE];
};





Blockly.Python['driss_opencv2_draw_contours'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var var_contour = block.getFieldValue('VAR_CONTOUR');
  var thickness = block.getFieldValue('THICKNESS');
  var color_HEX = block.getFieldValue('COLOR_HEX');

  var color_BGR = hexToBGR(color_HEX);
  //alert(color_HEX+ "    -   "+color_BGR);
  var code = 'cv2.drawContours(' + var_image + ', ' + var_contour + ', -1, ' + color_BGR + ', ' + thickness + ')\n';
  return code;
};


Blockly.Python['driss_opencv2_encadrer_forme'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var var_contour = block.getFieldValue('VAR_CONTOUR');
  var thickness = block.getFieldValue('THICKNESS');
  var color_HEX = block.getFieldValue('COLOR_HEX');

  var color_BGR = hexToBGR(color_HEX);

  var code = 'approx = cv2.approxPolyDP(' + var_contour + ',0.02*cv2.arcLength(' + var_contour + ',True),True)\n' +
    'x, y, w, h = cv2.boundingRect(approx)\n' +
    'cv2.rectangle(' + var_image + ',(x,y),(x+w,y+h),' + color_BGR + ',' + thickness + ')\n';
  return code;
};


Blockly.Python['driss_opencv2_find_list_of_all_contours'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE'); 
  var threshold_1 = Blockly.Python.valueToCode(block, 'THRESHOLD_1', Blockly.Python.ORDER_ATOMIC);
  var threshold_2 = Blockly.Python.valueToCode(block, 'THRESHOLD_2', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.functionNames_["findAllContoursInImage"] = "\n" +
    "def findAllContoursInImage(image) :\n" +
    "   imageNiveauxDeGris = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)\n"+
    "   imageAvecCanny = cv2.Canny(imageNiveauxDeGris, "+threshold_1+","+threshold_2+")\n"+
    "   contours = cv2.findContours(imageAvecCanny,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)[0]\n"+
    "   return (contours)\n";

  var code = 'findAllContoursInImage('+var_image+')';
  return [code, Blockly.Python.ORDER_NONE];
};




Blockly.Python['driss_opencv2_show_infos_contour'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var var_contour = block.getFieldValue('VAR_CONTOUR');
  var color_HEX = block.getFieldValue('COLOR_HEX');
  var area = block.getFieldValue('AREA') === 'TRUE';
  var peri = block.getFieldValue('PERI') === 'TRUE';
  var poly = block.getFieldValue('POLY') === 'TRUE';

  var color_BGR = hexToBGR(color_HEX);

  var code = '';
  code += 'approx = cv2.approxPolyDP(' + var_contour + ',0.02*cv2.arcLength(' + var_contour + ',True),True)\n' ;
  code += 'x, y, w, h = cv2.boundingRect(approx)\n' ;

  if (area) {
    code += 'cv2.putText(' + var_image + ',str(cv2.contourArea(' + var_contour + ')), (x+(w//2)-10,y+(h//2)-10+20),cv2.FONT_HERSHEY_SIMPLEX,0.7, ' + color_BGR + ',1)\n';
  }

  if (peri) {
    code += 'cv2.putText(' + var_image + ',str(round(cv2.arcLength(' + var_contour + ', True),1)), (x+(w//2)-10,y+(h//2)-10+40),cv2.FONT_HERSHEY_SIMPLEX,0.7, ' + color_BGR + ',1)\n';
  }

  if (poly) {
    code += 'cv2.putText(' + var_image + ',str(len(approx)), (x+(w//2)-10,y+(h//2)-10),cv2.FONT_HERSHEY_SIMPLEX,0.7, ' + color_BGR + ',1)\n';
  }

  return code;
};






Blockly.Python['driss_opencv2_named_window'] = function (block) {
  var window_title = Blockly.Python.valueToCode(block, 'WINDOW_TITLE', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.namedWindow(' + window_title + ')\n';
  return code;
};

//Videos



// 1 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv2_vc_from_file'] = function (block) {
  var video_file = Blockly.Python.valueToCode(block, 'VIDEO_FILE', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2"

  var code = "cv2.VideoCapture(" + video_file + ")\n";

  //return(code);
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['driss_opencv2_video_capture_from_cam'] = function (block) {
  var num_cam = Blockly.Python.valueToCode(block, 'NUM_CAM', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2"

  var code = "cv2.VideoCapture(" + num_cam + ", cv2.CAP_DSHOW)";

  return [code, Blockly.Python.ORDER_NONE];
};



// 2 - ---------------------------------------------------------------------------------------------------------

Blockly.Python['driss_opencv2_vc_is_opened'] = function (block) {
  var video_capture = block.getFieldValue('VIDEO_CAPTURE');

  var code = '(' + video_capture + '.isOpened() == True)';

  return [code, Blockly.Python.ORDER_NONE];
};


// 2 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv2_vc_show_image'] = function (block) {
  var video_capture = block.getFieldValue('VIDEO_CAPTURE');
  var frame_title = Blockly.Python.valueToCode(block, 'FRAME_TITLE', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'ret, frame = ' + video_capture + '.read()\n' +
    'if ret == True:\n' +
    '   cv2.imshow(' + frame_title + ',frame)\n';

  return code;
};



// 3 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv2_vc_release'] = function (block) {
  var video_capture = block.getFieldValue('VIDEO_CAPTURE');

  var code = video_capture + '.release() \n';
  return code;
};

// 5 - ---------------------------------------------------------------------------
Blockly.Python['driss_opencv2_vc_destroy_all_windows'] = function (block) {

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.destroyAllWindows()\n';
  return code;
};


Blockly.Python['driss_opencv2_vc_destroy_this_window'] = function (block) {
  var title = Blockly.Python.valueToCode(block, 'TITLE_WINDOW', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.destroyWindow('+title+')\n';
  return code;
};


Blockly.Python['driss_opencv2_rescale_frame'] = function (block) {
  var frame = block.getFieldValue('FRAME');
  var scale = block.getFieldValue('SCALE');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.functionNames_["rescaleFrame"] = "#fonction qui redimentionne image, vidéo et live vidéo\n" +
    "def rescalFrame(frame, scale=0.75) :\n" +
    "   width = int(frame.shape[1] * scale)\n" +
    "   height = int(frame.shape[0] * scale)\n" +
    "   dimensions = (width, height)\n" +
    "   return True,cv2.resize(frame, dimensions, interpolation=cv2.INTER_AREA)";


  var code = 'rescalFrame(' + frame + '[1], ' + scale + ')\n';
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_cv_next_frame'] = function (block) {
  var video_capture = block.getFieldValue('VIDEO_CAPTURE');

  var code = video_capture + '.read()[1]\n';

  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['driss_opencv2_cv_show_frame'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var windowTitle = Blockly.Python.valueToCode(block, 'TITLE_WINDOW', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  //var code = 'if ' + frame + '[0] == True:\n' +
  //  '   cv2.imshow(' + title + ', ' + frame + '[1])\n';

  var code = 'cv2.imshow(' + windowTitle + ', ' + var_image + ')\n';
  return code;
};



Blockly.Python['driss_opencv2_vc_change_resolution'] = function (block) {
  var capture_video = block.getFieldValue('CAPTURE_VIDEO');
  var width = Blockly.Python.valueToCode(block, 'CAPTURE_WIDTH', Blockly.Python.ORDER_ATOMIC);
  var height = Blockly.Python.valueToCode(block, 'CAPTURE_HEIGHT', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.functionNames_["changeResolutionOfCaptureVideo"] = "#fonction qui redimentionne uniquement la vidéo en flux direct (Live video)\n" +
    "def changeResolutionOfCaptureVideo(captureVideo, width, height) :\n" +
    "   captureVideo.set(3, width)\n" +
    "   captureVideo.set(4, height)\n";

  var code = 'changeResolutionOfCaptureVideo(' + capture_video + ', ' + width + ', ' + height + ')\n';
  return code;
};

Blockly.Python['driss_opencv2_hc_google_classifier'] = function (block) {
  var modeles = Blockly.Python.valueToCode(block, 'MODELES', Blockly.Python.ORDER_ATOMIC);
  var labels = Blockly.Python.valueToCode(block, 'LABELS', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_CVZONE"] = "import cvzone";

  var code = 'fichModelsClassifier = "' + modeles + '\n"';
  code += 'fichLabelsClassifier = "' + labels + '\n"';

  return [code, Blockly.Python.ORDER_NONE];
};




//************************************************************************************* */
Blockly.Python['driss_opencv2_begin_video_capture'] = function (block) {
  var num_cam = block.getFieldValue('NUM_CAM');

  Blockly.Python.definitions_["import_CV2"] = "import cv2"
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np"

  Blockly.Python.ds_variables_["VideoCapture_" + num_cam] = "VideoCapture_" + num_cam + " = None";

  var code = "VideoCapture_" + num_cam + " = cv2.VideoCapture(" + num_cam + ")\n";
  code += "#Vérifier si la caméra s'est ouverte avec succès\n";
  code += "if not VideoCapture_" + num_cam + ".isOpened():\n";
  code += "    print(\"Erreur lors de l'ouverture du flux vidéo\")\n";
  code += "    exit()\n";

  return (code);
  // return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_release_video_capture'] = function (block) {
  var num_cam = block.getFieldValue('NUM_CAM');

  Blockly.Python.ds_variables_["VideoCapture_" + num_cam] = "VideoCapture_" + num_cam + " = None";

  var code = 'VideoCapture_' + num_cam + '.release()\n';
  return code;
};



Blockly.Python['driss_opencv2_hc_cascade_classifier'] = function (block) {
  var cascade_file = Blockly.Python.valueToCode(block, 'CASCADE_FILE', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.CascadeClassifier(cv2.data.haarcascades +' + cascade_file + ')\n';

  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_hc_detect_multiScale'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var var_cascade = block.getFieldValue('VAR_CASCADE');
  var scale_factor = Blockly.Python.valueToCode(block, 'SCALE_FACTOR', Blockly.Python.ORDER_ATOMIC);

  var neibhors = Blockly.Python.valueToCode(block, 'NEIBHORS', Blockly.Python.ORDER_ATOMIC);

  var code = var_cascade + '.detectMultiScale(' + var_image + ', scaleFactor=' + scale_factor + ', minNeighbors=' + neibhors + ')\n';

  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_hc_encadrer_objet'] = function (block) {
  var var_object = block.getFieldValue('VAR_OBJECT');
  var var_image = block.getFieldValue('VAR_IMAGE');
  var color_HEX = block.getFieldValue('COLOR');
  var thickness = block.getFieldValue('THICKNESS');

  var color_BGR = hexToBGR(color_HEX);

  var code = 'for x, y, w, h in ' + var_object + ':\n';
  code += '   cv2.rectangle(' + var_image + ', (x, y), (x+w, y+h), ' + color_BGR + ', ' + thickness + ')\n';
  return code;
};

// Open CV 2  -  Commun --------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


Blockly.Python['driss_opencv2_add_trackbar'] = function (block) {
  var windows = block.getFieldValue('WINDOWS');
  var var_name = block.getFieldValue('VAR_NAME');
  var trackbar_name = block.getFieldValue('TRACKBAR_NAME');
  var min = block.getFieldValue('MIN');
  var max = block.getFieldValue('MAX');

  //trackbar_name = trackbar_name.replace(/ /g, "")
  trackbar_name = trackbar_name.trim();
  var trackbar_name_sans_espaces = trackbar_name.replace(/ /g, '_');
  var_name = var_name.trim().replace(/ /g, '_');

  Blockly.Python.definitions_["import_CV2"] = "from cv2 import WINDOW_AUTOSIZE";

  console.log(trackbar_name_sans_espaces);
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  Blockly.Python.functionNames_['on_' + trackbar_name_sans_espaces + '_cursorSlide'] = "\n" +
    "def on_" + trackbar_name_sans_espaces + "_cursorSlide(val) :\n" +
    "   global " + var_name + "\n" +
    "   " + var_name + " = val\n" +
    "   cv2.setTrackbarPos('" + trackbar_name_sans_espaces + "', '" + windows + "', " + var_name + ")";

  var code = 'cv2.createTrackbar("' + trackbar_name + '", "' + windows + '" , ' + var_name + ', ' + max + ', on_' + trackbar_name_sans_espaces + '_cursorSlide)\n';
  return code;
};

/*
Blockly.Python['driss_opencv2_draw_n_sliders'] = function (block) {
  var nombre_cursors = block.getFieldValue('NOMBRE_CURSOR');
  var window = block.getFieldValue('WINDOW');
  var cursor_name ;
  var val_mini ;
  var val_maxi ;
  //var pas ;

  Blockly.Python.functionNames_['onCursorSlide'] = "\n" +
    "def onCursorSlide(val) :\n" +
    "   pass\n" ;

  var sliders =  '';
  for (i = 1; i <= nombre_cursors; i++) {
    cursor_name = block.getFieldValue('CURSOR_NAME_'+i);
    val_mini = block.getFieldValue('VAL_MINI_'+i);
    val_maxi = block.getFieldValue('VAL_MAXI_'+i);
    //pas = block.getFieldValue('PAS_'+i);

    sliders += 'cv2.createTrackbar("'+cursor_name+'", "'+window+'" , '+val_mini+', '+val_maxi+', onCursorSlide)\n' ;

  }
  
  var code = 'cv2.namedWindow("'+window+'", cv2.WINDOW_AUTOSIZE)\n';
  code += sliders ;

  return code;
};
*/

// Teatchable Machine--------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


Blockly.Python['driss_opencv2_tm_load_model'] = function (block) {
  var model_file = Blockly.Python.valueToCode(block, 'MODEL_FILE', Blockly.Python.ORDER_ATOMIC);
  var labels_file = Blockly.Python.valueToCode(block, 'LABELS_FILE', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2"
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np"
  Blockly.Python.definitions_["import_keras_models_load_model"] = "from keras.models import load_model # TensorFlow est necessaire pour le fonctionnement de Keras"

  Blockly.Python.ds_variables_["model_keras"] = 'model = load_model(' + model_file + ', compile=False) #le modele entrainé';
  Blockly.Python.ds_variables_["labels_model_keras"] = 'class_names = open(' + labels_file + ', "r").readlines() #les noms de catégories';

  /**
  var code ="VideoCapture_"+num_cam+" = cv2.VideoCapture("+num_cam+")\n";
  code +=  "#Vérifier si la caméra s'est ouverte avec succès\n";
  code +=  "if not VideoCapture_"+num_cam+".isOpened():\n";
  code +=  "    print(\"Erreur lors de l'ouverture du flux vidéo\")\n";
  code +=  "    exit()\n";
  */
  var code = '';
  return code;
};


Blockly.Python['driss_opencv2_tm_lancer_reconnaissance_objet'] = function (block) {
  var var_image = block.getFieldValue('IMAGE');

  var code = '';
  code += '# Resize the raw image into (224-height,224-width) pixels\n';
  code += 'tmImaVar = cv2.resize(' + var_image + '[1], (224, 224), interpolation=cv2.INTER_AREA)\n';
  code += '# Make the image a numpy array and reshape it to the models input shape.\n';
  code += 'tmImaVar = np.asarray(tmImaVar, dtype=np.float32).reshape(1, 224, 224, 3)\n';
  code += '# Normalize the image array\n';
  code += 'tmImaVar = (tmImaVar / 127.5) - 1\n';
  code += '# Predicts the model \n';
  code += 'prediction = model.predict(tmImaVar)\n';
  code += 'index = np.argmax(prediction)\n';
  code += 'class_name = class_names[index]\n';
  code += 'confidence_score = prediction[0][index]\n';

  return code;
};


Blockly.Python['driss_opencv2_tm_categorie_objet'] = function (block) {

  //var code ="class_name[2:]";
  var code = "class_name[2:-1]";

  return [code, Blockly.Python.ORDER_NONE];

};

Blockly.Python['driss_opencv2_tm_score_reconnaissance'] = function (block) {
  var code = "str(np.round(confidence_score * 100))[:-2]" + "+ ' %'";
  return [code, Blockly.Python.ORDER_NONE];

};


Blockly.Python['driss_opencv2_tm_write_texte'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC);
  var font = block.getFieldValue('FONT');
  var pos_x = Blockly.Python.valueToCode(block, 'POS_X', Blockly.Python.ORDER_ATOMIC);
  var scale = block.getFieldValue('SCALE');
  var pos_y = Blockly.Python.valueToCode(block, 'POS_Y', Blockly.Python.ORDER_ATOMIC);
  var thickness = block.getFieldValue('THICKNESS');
  var color_HEX = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);

  font = "cv2." + font;
  color_HEX = color_HEX.substring(1, 8); //color_HEX est reçue entre parenthèses (#FF0000) : il faut retirer les parenthèses
  var color_BGR = hexToBGR(color_HEX);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.putText(' + var_image + '[1], ' + text + ', (' + pos_x + ',' + pos_y + '), ' + font + ', ' + scale + ', ' + color_BGR + ', ' + thickness + ')\n';
  return code;
};


Blockly.Python['driss_opencv2_tm_write_texte_simple'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.putText(' + var_image + '[1], ' + text + ', (50,50), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0,0,255), 1)\n';
  return code;
};


Blockly.Python['driss_opencv2_tm_key_pressed'] = function (block) {
  var key = block.getFieldValue('KEY');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = '(cv2.waitKey(30) & 0xFF == ord(\'' + key[0] + '\') )'
  
  return [code, Blockly.Python.ORDER_NONE];
};




// Tracking d'objets--------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

Blockly.Python['driss_opencv2_video_capture_fixer_dimensions'] = function (block) {
  var camera = block.getFieldValue('CAMERA');
  var width = block.getFieldValue('WIDTH');
  var height = block.getFieldValue('HEIGHT');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2"


  var code = camera + ".set(3, " + width + ")\n" +
    camera + ".set(4, " + height + ")\n";

  //return [code, Blockly.Python.ORDER_NONE];
  return (code);
};


Blockly.Python['driss_opencv2_getcolor_hsv'] = function (block) {
  var h = block.getFieldValue('H');
  var s = block.getFieldValue('S');
  var v = block.getFieldValue('V');

  var code = "";
  //code += "np.array([" + h + ", " + s + ", " + v + "])";
  code += "(" + h + ", " + s + ", " + v + ")";
  return [code, Blockly.Python.ORDER_ATOMIC];
};




Blockly.Python['driss_opencv2_trackingobjects_entourer_un_objet'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  //var nbre_objets = block.getFieldValue('NBRE_OBJETS');
  var hsvColor_min = Blockly.Python.valueToCode(block, 'HSV_LO_COLOR', Blockly.Python.ORDER_ATOMIC);
  var hsvColor_max = Blockly.Python.valueToCode(block, 'HSV_HI_COLOR', Blockly.Python.ORDER_ATOMIC);
  var erodeCoef = block.getFieldValue('ERODE');
  var dilateCoef = block.getFieldValue('DILATE');
  var cb_put_contour = block.getFieldValue('PUT_CONTOUR') === 'TRUE';
  var cb_put_text = block.getFieldValue('PUT_TEXT') === 'TRUE';
  var forme = block.getFieldValue('FORME');
  var lineColorHEX = block.getFieldValue('LINE_COLOR');
  //var lineWidth = block.getFieldValue('LINE_WIDTH');
  var texte = block.getFieldValue('TEXTE');
  var size = parseInt(block.getFieldValue('SIZE'));

  var lineColorBGR = hexToBGR(lineColorHEX);
  
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";

  var code = '\n';

  code += 'ds_imageHSV_ = cv2.cvtColor('+var_image+', cv2.COLOR_BGR2HSV)\n';

  
  code += 'ds_imageMaskObjet_ = cv2.inRange(ds_imageHSV_, '+hsvColor_min+', '+hsvColor_max+')\n';
  code += 'ds_imageMaskObjet_ = cv2.erode(ds_imageMaskObjet_, None, iterations='+erodeCoef+')\n';
  code += 'ds_imageMaskObjet_ = cv2.dilate(ds_imageMaskObjet_, None, iterations='+dilateCoef+')\n';
  code += '\n';
  code += 'ds_contourObjet_ = cv2.findContours(ds_imageMaskObjet_, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]\n';
  code += '\n';
  code += 'if len(ds_contourObjet_) > 0:\n';

  code += '    c=max(ds_contourObjet_, key=cv2.contourArea)\n';
  
  //code += '    for c in ds_contourObjet_:\n';

  if (cb_put_contour) {
    switch (forme) {
      case "CERCLE":
        code += '    ((x, y), rayon)=cv2.minEnclosingCircle(c)\n';
        code += '    if rayon>'+size+':\n';
        code += '        cv2.circle('+var_image+', (int(x), int(y)), int(rayon),'+lineColorBGR+' , 2)\n';
        code += '        cv2.circle(' + var_image + ', (int(x), int(y)), 3, ' + lineColorBGR + ', -1)\n';
        if (cb_put_text) {
          code += '        #(text_w, text_h), baseline = cv2.getTextSize("'+texte+'", cv2.FONT_HERSHEY_DUPLEX, 0.5, 1)\n';
          code += '        #cv2.rectangle(imageBGR, (int(x)+10, int(y) -20-baseline), (int(x) + text_w+10, int(y)-20-baseline + text_h+10), (249, 246, 245), -1)\n';
          code += '        cv2.putText('+var_image+', "'+texte+'", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA, False)\n';
        }
        break;
      case "RECTANGLE":
        code += '    x,y,w,h = cv2.boundingRect(c)\n';
        code += '    if (w>'+2*size+' and h>'+2*size+'):\n';
        code += '        cv2.rectangle(' + var_image + ',(x,y),(x+w,y+h),' + lineColorBGR + ',2)\n';
        if (cb_put_text) {
          code += '        #(text_w, text_h), baseline = cv2.getTextSize("'+texte+'", cv2.FONT_HERSHEY_DUPLEX, 0.5, 1)\n';
          code += '        #cv2.rectangle(imageBGR, (int(x)+10, int(y) -20-baseline), (int(x) + text_w+10, int(y)-20-baseline + text_h+10), (249, 246, 245), -1)\n';
          code += '        cv2.putText('+var_image+', "'+texte+'", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA, False)\n';
        }
        break;
    }
  }

  code += '#cv2.imshow("Masque min ='+hsvColor_min+' max ='+hsvColor_min+'", ds_imageMaskObjet_)\n'

  

  return code;
};


Blockly.Python['driss_opencv2_trackingobjects_entourer_tous_les_objets'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  //var nbre_objets = block.getFieldValue('NBRE_OBJETS');
  var hsvColor_min = Blockly.Python.valueToCode(block, 'HSV_LO_COLOR', Blockly.Python.ORDER_ATOMIC);
  var hsvColor_max = Blockly.Python.valueToCode(block, 'HSV_HI_COLOR', Blockly.Python.ORDER_ATOMIC);
  var erodeCoef = block.getFieldValue('ERODE');
  var dilateCoef = block.getFieldValue('DILATE');
  var cb_put_contour = block.getFieldValue('PUT_CONTOUR') === 'TRUE';
  var cb_put_text = block.getFieldValue('PUT_TEXT') === 'TRUE';
  var forme = block.getFieldValue('FORME');
  var lineColorHEX = block.getFieldValue('LINE_COLOR');
  //var lineWidth = block.getFieldValue('LINE_WIDTH');
  var texte = block.getFieldValue('TEXTE');

  var size = parseInt(block.getFieldValue('SIZE'));

  var lineColorRGB = hexToRGB(lineColorHEX);
  
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";

  var code = '\n';

  code += 'ds_imageHSV_ = cv2.cvtColor('+var_image+', cv2.COLOR_BGR2HSV)\n';

  
  code += 'ds_imageMaskObjet_ = cv2.inRange(ds_imageHSV_, '+hsvColor_min+', '+hsvColor_max+')\n';
  code += 'ds_imageMaskObjet_ = cv2.erode(ds_imageMaskObjet_, None, iterations='+erodeCoef+')\n';
  code += 'ds_imageMaskObjet_ = cv2.dilate(ds_imageMaskObjet_, None, iterations='+dilateCoef+')\n';
  code += '\n';
  code += 'ds_contourObjet_ = cv2.findContours(ds_imageMaskObjet_, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]\n';
  code += '\n';
  code += 'if len(ds_contourObjet_) > 0:\n';

  code += '    for c in ds_contourObjet_:\n';

  if (cb_put_contour) {
    switch (forme) {
      case "CERCLE":
        code += '        ((x, y), rayon)=cv2.minEnclosingCircle(c)\n';
        code += '        if rayon>'+size+':\n';
        code += '            cv2.circle('+var_image+', (int(x), int(y)), int(rayon),'+lineColorRGB+' , 2)\n';
        code += '            cv2.circle(' + var_image + ', (int(x), int(y)), 3, ' + lineColorRGB + ', -1)\n';
        if (cb_put_text) {
          code += '            #(text_w, text_h), baseline = cv2.getTextSize("'+texte+'", cv2.FONT_HERSHEY_DUPLEX, 0.5, 1)\n';
          code += '            #cv2.rectangle(imageBGR, (int(x)+10, int(y) -20-baseline), (int(x) + text_w+10, int(y)-20-baseline + text_h+10), (249, 246, 245), -1)\n';
          code += '            cv2.putText('+var_image+', "'+texte+'", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA, False)\n';
        }
        break;
      case "RECTANGLE":
        code += '        x,y,w,h = cv2.boundingRect(c)\n';
        code += '        if (w>'+2*size+' and h>'+2*size+'):\n';
        code += '            cv2.rectangle(' + var_image + ',(x,y),(x+w,y+h),' + lineColorRGB + ',2)\n';
        if (cb_put_text) {
          code += '            #(text_w, text_h), baseline = cv2.getTextSize("'+texte+'", cv2.FONT_HERSHEY_DUPLEX, 0.5, 1)\n';
          code += '            #cv2.rectangle(imageBGR, (int(x)+10, int(y) -20-baseline), (int(x) + text_w+10, int(y)-20-baseline + text_h+10), (249, 246, 245), -1)\n';
          code += '            cv2.putText('+var_image+', "'+texte+'", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA, False)\n';
        }
        break;
    }
  }

  code += '#cv2.imshow("Masque min ='+hsvColor_min+' max ='+hsvColor_min+'", ds_imageMaskObjet_)\n'

  

  return code;
};

Blockly.Python['driss_opencv2_trackingobjects_setcolorrange'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');

  var lo_color = Blockly.Python.valueToCode(block, 'LO_COLOR', Blockly.Python.ORDER_ATOMIC);
  var hi_color = Blockly.Python.valueToCode(block, 'HI_COLOR', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.inRange(' + var_image + ', ' + lo_color + ', ' + hi_color + ')\n';

  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['driss_opencv2_trackingobjects_setcolorrange_2'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var h_min = block.getFieldValue('H_MIN');
  var s_min = block.getFieldValue('S_MIN');
  var v_min = block.getFieldValue('V_MIN');
  var h_max = block.getFieldValue('H_MAX');
  var s_max = block.getFieldValue('S_MAX');
  var v_max = block.getFieldValue('V_MAX');


  h_min = h_min.trim().replace(/\s/, '_');
  s_min = s_min.trim().replace(/\s/, '_');
  v_min = v_min.trim().replace(/\s/, '_');
  h_max = h_max.trim().replace(/\s/, '_');
  s_max = s_max.trim().replace(/\s/, '_');
  v_max = v_max.trim().replace(/\s/, '_');

  var couleur_1 = '(' + h_min + ', ' + s_min + ', ' + v_min + ')';
  var couleur_2 = '(' + h_max + ', ' + s_max + ', ' + v_max + ')';

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.inRange(' + var_image + ', ' + couleur_1 + ', ' + couleur_2 + ')\n';
  return [code, Blockly.Python.ORDER_NONE];
};





// Programmes utiles--------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
/*
Blockly.Python['driss_opencv2_std_inrange'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var lo_color = Blockly.Python.valueToCode(block, 'LO_COLOR', Blockly.Python.ORDER_ATOMIC);
  var hi_color = Blockly.Python.valueToCode(block, 'HI_COLOR', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.inRange(' + var_image + ', ' + lo_color + ', ' + hi_color + ')\n';

  //return(code);
  return [code, Blockly.Python.ORDER_NONE];
};
*/


Blockly.Python['driss_opencv2_prog_get_parametres_tracking'] = function (block) {
  var num_cam = Blockly.Python.valueToCode(block, 'NUM_CAM', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";

  Blockly.Python.functionNames_["doNothing"] = "\n" +
    "def doNothing(val) :\n" +
    "   pass\n";

  Blockly.Python.ds_variables_["fenetreControle_" + num_cam] = 'fenetreControle = "Curseurs de controle et image Masque"';
  Blockly.Python.ds_variables_["fluxVideo_" + num_cam] = 'fluxVideo = "Flux video normal et avec le masque appliqué"';

  var code = '\n';
  code += 'camera = cv2.VideoCapture(' + num_cam + ')\n';
  code += 'cv2.namedWindow(fluxVideo, cv2.WINDOW_NORMAL)\n';
  code += 'cv2.namedWindow(fenetreControle, cv2.WINDOW_NORMAL)\n';
  code += 'cv2.resizeWindow(fluxVideo, 640, 240) \n';
  code += 'cv2.resizeWindow(fenetreControle, 320, 550)\n';
  code += '\n';
  code += 'cv2.createTrackbar("H min", fenetreControle , 0, 179, doNothing)\n';
  code += 'cv2.createTrackbar("H max", fenetreControle , 0, 179, doNothing)\n';
  code += 'cv2.createTrackbar("S min", fenetreControle , 0, 255, doNothing)\n';
  code += 'cv2.createTrackbar("S max", fenetreControle , 0, 255, doNothing)\n';
  code += 'cv2.createTrackbar("V min", fenetreControle , 0, 255, doNothing)\n';
  code += 'cv2.createTrackbar("V max", fenetreControle , 0, 255, doNothing)\n';
  code += 'cv2.createTrackbar("Erosion", fenetreControle , 0, 13, doNothing)\n';
  code += 'cv2.createTrackbar("Dilatation", fenetreControle , 0, 13, doNothing)\n';
  code += '\n';
  code += 'cv2.setTrackbarPos("H min", fenetreControle,0)\n';
  code += 'cv2.setTrackbarPos("H max", fenetreControle,179)\n';
  code += 'cv2.setTrackbarPos("S min", fenetreControle,100)\n';
  code += 'cv2.setTrackbarPos("S max", fenetreControle,255)\n';
  code += 'cv2.setTrackbarPos("V min", fenetreControle,100)\n';
  code += 'cv2.setTrackbarPos("V max", fenetreControle,255)\n';
  code += '\n';
  code += 'while not ((cv2.waitKey(30) & 0xFF == ord("q") )):\n';
  code += ' imageBGR = camera.read()[1]\n';
  code += ' imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)\n';
  code += '\n';
  code += ' lo_H = cv2.getTrackbarPos("H min",fenetreControle)\n';
  code += ' lo_S = cv2.getTrackbarPos("S min",fenetreControle)\n';
  code += ' lo_V = cv2.getTrackbarPos("V min",fenetreControle)\n';
  code += '\n';
  code += ' hi_H = cv2.getTrackbarPos("H max",fenetreControle)\n';
  code += ' hi_S = cv2.getTrackbarPos("S max",fenetreControle)\n';
  code += ' hi_V = cv2.getTrackbarPos("V max",fenetreControle)\n';
  code += '\n';
  code += ' if(lo_H > hi_H): lo_H = hi_H-1\n';
  code += ' if(lo_S > hi_S): lo_S = hi_S-1\n';
  code += ' if(lo_V > hi_V): lo_V = hi_V-1\n';
  code += '\n';
  code += ' cv2.setTrackbarPos("H min",fenetreControle, lo_H)\n';
  code += ' cv2.setTrackbarPos("S min",fenetreControle, lo_S)\n';
  code += ' cv2.setTrackbarPos("V min",fenetreControle, lo_V)\n';
  code += '\n';
  code += ' imageMask = cv2.inRange(imageHSV, (lo_H, lo_S, lo_V), (hi_H, hi_S, hi_V))\n';
  code += ' imageBGRmasked = cv2.bitwise_and(imageBGR, imageBGR, mask=imageMask)\n';
  code += '\n';
  code += ' erosion = cv2.getTrackbarPos("Erosion",fenetreControle)\n';
  code += ' dilatation = cv2.getTrackbarPos("Dilatation",fenetreControle)\n';
  code += '\n';
  code += ' imageMask=cv2.erode(imageMask, None, iterations=erosion)\n';
  code += ' imageMask=cv2.dilate(imageMask, None, iterations=dilatation)\n';
  code += '\n';
  code += ' towImages = np.concatenate((imageBGRmasked, imageBGR), axis=1)\n';
  code += '\n';
  code += ' cv2.imshow(fluxVideo, towImages)\n';
  code += ' cv2.imshow(fenetreControle, imageMask)\n';
  code += 'camera.release()\n';
  code += 'cv2.destroyAllWindows()\n';





  return (code);
  //return [code, Blockly.Python.ORDER_NONE];
};




//________________________________________________________
//Immatriculation


Blockly.Python['driss_opencv2_get_text_immatriculation'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');

  Blockly.Python.ds_variables_["__tauxDeConfiance__"] = '__tauxDeConfiance__ = 0';
  
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_Reader"] = "from easyocr import Reader";
  Blockly.Python.definitions_["import_os"] = "import os";


  Blockly.Python.functionNames_["getTextInContour"] = '#fonction qui retourne le texte lu par OCR dans la plaque\n'+
  'def getTextInContour(plaque) :\n' +
  '    reader = Reader([\'fr\'], gpu=False, verbose=False)\n' +
  '    detection = reader.readtext(plaque)\n' +
  '    #print("detection : ", detection)\n'+
  '    if len(detection) == 0 :\n' +
  '        text = "Echec de lecture de la plaque  !"\n' +
  '        print(text)\n' +
  '        return(None)\n' +
  '    else :\n' +
  '        immatriculation = ""\n' +
  '        tauxConfiance = 0\n' +
  '        for elem in detection :\n' +
  '            if(len(immatriculation) < len(elem[1])) :\n' +
  '                immatriculation = elem[1]\n' +
  '                tauxConfiance = f"{elem[2] * 100:.2f}"\n' +
  
  '        #print("Immatriculation detecté par OCR : ",immatriculation)\n' +
  '        #print("tauxConfiance : ",tauxConfiance)\n'+
  '        return(immatriculation.upper(), tauxConfiance)\n' ;


  Blockly.Python.functionNames_["getContourQuatreCotes"] = '#fonction qui retourne le plus grand contour 4 cotés\n'+
  'def getContourQuatresCotes(listeContours) :\n' +
  '    listeContours = sorted(listeContours, key = cv2.contourArea, reverse = True)[:5]\n' +
  '    for c in listeContours :\n' +
  '        peri = cv2.arcLength(c, True)\n'+
  '        approx = cv2.approxPolyDP(c, 0.02 * peri, True)\n'+
  '        if len(approx) == 4 :\n'+
  '            return (approx)\n';
  '    return (None)\n';
 
  

  Blockly.Python.functionNames_["getImmatriculationTexte"] = '#fonction qui retourne le texte de la plaque d{immatriculation\n'+
  'def getImmatriculationTexte(_photoOriginale) :\n' +
  '    global __tauxDeConfiance__\n\n'+
  '    os.system(\'cls\')\n\n'+

  '    if (_photoOriginale.ndim == 3):\n'+
  '        _photoNiveauxGris= cv2.cvtColor(_photoOriginale, cv2.COLOR_BGR2GRAY)\n'+
  '        print("BlockPy@Col : Je me suis permis de convertir l\'image en niveaux de gris pour la traiter !")\n'+
  '    else:\n'+
  '        _photoNiveauxGris = _photoOriginale\n'+
 
  '    \n'+
  '    _photoFloutee= cv2.GaussianBlur(_photoNiveauxGris, (5,5), cv2.BORDER_CONSTANT)\n'+
  '    _photoContours = cv2.Canny(_photoFloutee, 10,200)\n'+
  '    _listeContours = cv2.findContours(_photoContours, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)[0]\n'+

  '    _contourPlaque = getContourQuatresCotes(_listeContours)\n'+
  '    (x, y, w, h) = cv2.boundingRect(_contourPlaque)\n'+
  '    _plaque = _photoNiveauxGris[y:y + h, x:x + w]\n'+
  
  '    print ("Reconnaissance OCR en cours...")\n'+
  '    #print ("Contour de la plaque : ", plaque)\n'+
  '    if len(_plaque) == 0:\n'+
  '        text = "Echec de lecture de la plaque  !"\n'+
  '        print(text)\n'+
  '        _resultat = None\n'+
  '    else:\n'+
  '        _resultat = getTextInContour(_plaque)\n'+
  '    \n'+

  '    if(_resultat is None):\n'+
  '        cv2.putText(photoOriginale, "Echec de lecture de la plaque  !", (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 3)\n'+
  '        #cv2.imshow("Photo originale en couleur", _photoOriginale)\n'+
  '        __tauxDeConfiance__ = 0\n'+
  '        return (None)\n'+
  '    else :\n'+
  '        cv2.drawContours(photoOriginale, [_contourPlaque], -1, (0, 255, 0), 3)\n'+
  '        cv2.putText(_photoOriginale, _resultat[0], (x, y - 20), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)\n'+
  '        #cv2.imshow("Photo originale en couleur", _photoOriginale)\n\n'+
  '        #Enlever le # sur la ligne suivante pour afficher la photo en niveau de gris\n'+
  '        #cv2.imshow("Photo  en niveaux de gris", _photoNiveauxGris)\n\n'+

  '        #Enlever le # sur la ligne suivante pour afficher la photo avec marquage des contours\n'+
  '        #cv2.imshow("Photo avec marquage des contours", _photoContours)\n\n'+

  '        #Enlever le # sur la ligne suivante pour afficher le découpage de la plaque d\'mmatriculation\n'+
  '        #cv2.imshow("Plaque d\'immatriculation", _plaque)\n\n'+
  '        __tauxDeConfiance__ = _resultat[1]\n'+
  '        return (_resultat[0])\n';
  

  var code = 'getImmatriculationTexte('+var_image+')';

  //return code;
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_get_taux_confiance_lecture_immatriculation'] = function (block) {
  
  var code = 'float(__tauxDeConfiance__)';

  //return code;
  return [code, Blockly.Python.ORDER_NONE];
};





Blockly.Python['driss_opencv2_trouver_contour_immatriculation'] = function (block) {
  
  var var_image = block.getFieldValue('VAR_IMAGE');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_Reader"] = "from easyocr import Reader";
  Blockly.Python.definitions_["import_os"] = "import os";

  Blockly.Python.ds_variables_["__tauxDeConfiance__"] = '__tauxDeConfiance__ = 0';
  Blockly.Python.ds_variables_["__immatriculation__"] = '__immatriculation__ = 0';
  Blockly.Python.ds_variables_["__photoOriginale__"] = '__photoOriginale__ = None';
  Blockly.Python.ds_variables_["__photoNiveauxGris__"] = '__photoNiveauxGris__ = None';
  Blockly.Python.ds_variables_["__photoFloutee__"] = '__photoFloutee__ = None';
  Blockly.Python.ds_variables_["__photoContours__"] = '__photoContours__ = None';
  Blockly.Python.ds_variables_["__listeContours__"] = '__listeContours__ = None';
  Blockly.Python.ds_variables_["__contourPlaque__"] = '__contourPlaque__ = None';
  Blockly.Python.ds_variables_["__plaqueImmatriculation__"] = '__plaqueImmatriculation__ = None';



  Blockly.Python.functionNames_["getContourQuatresCotes"] = '#fonction qui retourne le plus grand contour 4 cotés\n'+
  'def getContourQuatresCotes() :\n' +
  '    global __listeContours__ \n' +
  '    __listeContours__ = sorted(__listeContours__, key = cv2.contourArea, reverse = True)[:5]\n' +
  '    for c in __listeContours__ :\n' +
  '        peri = cv2.arcLength(c, True)\n'+
  '        approx = cv2.approxPolyDP(c, 0.02 * peri, True)\n'+
  '        if len(approx) == 4 :\n'+
  '            return (approx)\n';
  '    return (None)\n';




  Blockly.Python.functionNames_["getContourPlaqueImmatriculation"] = '#fonction qui retourne le contour de la plaque d\'immatriculation\n'+
  'def getContourPlaqueImmatriculation(photo) :\n' +
  '    global __listeContours__, __photoOriginale__,__photoNiveauxGris__ , __photoFloutee__, __photoContours__, __listeContours__,__contourPlaque__, __plaqueImmatriculation__\n' +
  '    os.system(\'cls\')\n\n' +
  '    if (photo.ndim == 3):\n'+
  '        __photoOriginale__= photo\n'+
  '        __photoNiveauxGris__= cv2.cvtColor(__photoOriginale__, cv2.COLOR_BGR2GRAY)\n'+
  '        print("BlockPy@Col : Je me suis permis de convertir l\'image en niveaux de gris pour la traiter !")\n'+
  '    else:\n'+
  '        __photoOriginale__= photo\n'+
  '        __photoNiveauxGris__ = photo\n'+

  '    \n' +
  '    __photoFloutee__ = cv2.GaussianBlur(__photoNiveauxGris__, (5,5), cv2.BORDER_CONSTANT)\n' +
  '    __photoContours__ = cv2.Canny(__photoFloutee__, 10,200)\n'+
  '    __listeContours__ = cv2.findContours(__photoContours__, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)[0]\n'+
  '    __contourPlaque__ = getContourQuatresCotes()\n'+
  '    (x, y, w, h) = cv2.boundingRect(__contourPlaque__)\n'+
  '    __plaqueImmatriculation__ = __photoNiveauxGris__[y:y + h, x:x + w]\n'+
  '    return (__plaqueImmatriculation__)\n';

  var code = 'getContourPlaqueImmatriculation('+var_image+')\n';

  return code;
  //return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['driss_opencv2_ocr_sur_plaque_immatriculation'] = function (block) {

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_Reader"] = "from easyocr import Reader";

  Blockly.Python.ds_variables_["__tauxDeConfiance__"] = '__tauxDeConfiance__ = 0.0';
  Blockly.Python.ds_variables_["__immatriculation__"] = '__immatriculation__ = "" ';
  Blockly.Python.ds_variables_["__photoOriginale__"] = '__photoOriginale__ = None';
  Blockly.Python.ds_variables_["__photoNiveauxGris__"] = '__photoNiveauxGris__ = None';
  Blockly.Python.ds_variables_["__photoFloutee__"] = '__photoFloutee__ = None';
  Blockly.Python.ds_variables_["__photoContours__"] = '__photoContours__ = None';
  Blockly.Python.ds_variables_["__listeContours__"] = '__listeContours__ = None';
  Blockly.Python.ds_variables_["__contourPlaque__"] = '__contourPlaque__ = None';
  Blockly.Python.ds_variables_["__plaqueImmatriculation__"] = '__plaqueImmatriculation__ = None';


  Blockly.Python.functionNames_["getTextInContour"] = '#fonction qui retourne le texte lu par OCR dans la plaque\n'+
  'def getTextInContour() :\n' +
  '    # -------------------------------------------------------\n' +
  '    # Fonction qui retourne le texte lu par OCR dans la plaque\n' +
  '    # -------------------------------------------------------\n' +
  '    global __plaqueImmatriculation__\n' +

  '    BASE_DIR = os.path.dirname(__file__)\n' +
  '    MODEL_DIR = os.path.join(BASE_DIR, "easyocr_models")\n' +

  '    # ---------------------------------------------------\n' +
  '    # 1) Tentative avec téléchargement des modèles (Internet)\n' +
  '    # ---------------------------------------------------\n' +
  '    try:\n' +
  '        print("[OCR] Tentative d\'utilisation des modèles EasyOCR en ligne (si Internet disponible)...")\n' +

  '        reader = Reader(\n' +
  '            [\'fr\'],\n' +
  '            gpu=False,\n' +
  '            verbose=False,\n' +
  '            download_enabled=True   # autorise le téléchargement\n' +
  '        )\n' +

  '        print("[OCR] Modèles EasyOCR téléchargés ou déjà présents dans le cache utilisateur.")\n' +

  '    except Exception as e:\n' +
  '        # ---------------------------------------------------\n' +
  '        # 2) En cas d\'échec : utilisation des modèles locaux\n' +
  '        # ---------------------------------------------------\n' +
  '        print("[OCR] Échec du téléchargement des modèles EasyOCR.")\n' +
  '        print("[OCR] Passage en mode hors-ligne (modèles locaux).")\n' +
  '        print("[OCR] Détail de l\'erreur :", e)\n' +

  '        reader = Reader(\n' +
  '            [\'fr\'],\n' +
  '            gpu=False,\n' +
  '            verbose=False,\n' +
  '            model_storage_directory=MODEL_DIR,  # dossier local\n' +
  '            download_enabled=False              # interdit tout téléchargement\n' +
  '        )\n' +

  '        print(f"[OCR] Modèles locaux utilisés depuis : {MODEL_DIR}")\n' +

  '    # ---------------------------------------------------\n' +
  '    # 3) Lecture OCR sur l\'image de la plaque\n' +
  '    # ---------------------------------------------------\n' +
  '    detection = reader.readtext(__plaqueImmatriculation__)\n' +

  '    if len(detection) == 0:\n' +
  '        print("[OCR] Échec de lecture de la plaque.")\n' +
  '        return None\n' +

  '    # ---------------------------------------------------\n' +
  '    # 4) Sélection du texte le plus pertinent\n' +
  '    # ---------------------------------------------------\n' +
  '    __immatriculation__ = ""\n' +
  '    __tauxDeConfiance__ = 0.0\n' +

  '    for elem in detection:\n' +
  '        texte_detecte = elem[1]\n' +
  '        confiance = elem[2]\n' +

  '        # On garde le texte le plus long (heuristique simple)\n' +
  '        if len(texte_detecte) > len(__immatriculation__):\n' +
  '            __immatriculation__ = texte_detecte\n' +
  '            __tauxDeConfiance__ = confiance * 100\n' +

  '    print(f"[OCR] Immatriculation détectée : {__immatriculation__.upper()}")\n' +
  '    print(f"[OCR] Taux de confiance : {__tauxDeConfiance__:.2f} %")\n' +

  '    return __immatriculation__.upper(), f"{__tauxDeConfiance__:.2f}"\n' ;


  Blockly.Python.functionNames_["getImmatriculationTexte"] = '#fonction qui retourne le texte de la plaque d\'immatriculation\n'+
  'def getImmatriculationTexte() :\n' +
  '    global __tauxDeConfiance__, __photoNiveauxGris__, __plaqueImmatriculation__, __photoOriginale__, __photoContours__, __contourPlaque__\n' +
  
  '    if(__photoNiveauxGris__.size==0):\n' +
  '        print("Problème")\n'+
  '        exit\n'+
  '    print ("Reconnaissance OCR en cours...")\n'+
  '    if len(__plaqueImmatriculation__) == 0:\n'+
  '        print("Echec de lecture de la plaque  !")\n'+
  '        resultat = None\n'+
  '    else:\n'+
  '        resultat = getTextInContour()\n\n'+

  '    if(resultat is None):\n'+
  '        cv2.putText(__photoOriginale__, "Echec de lecture de la plaque  !", (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 3)\n'+
  '        __tauxDeConfiance__ = 0\n'+
  '        #cv2.imshow("Photo originale en couleur", __photoOriginale__)\n'+
  '    else :\n'+
  '        cv2.drawContours(__photoOriginale__, [__contourPlaque__], -1, (0, 255, 0), 3)\n'+
  '        (x, y, w, h) = cv2.boundingRect(__contourPlaque__)\n'+
  '        cv2.putText(__photoOriginale__, resultat[0], (x, y - 20), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)\n'+
  '        #Enlever le # sur la ligne suivante pour afficher la photo en niveau de gris\n'+
  '        #cv2.imshow("Photo  en niveaux de gris", __photoNiveauxGris__)\n'+
  '        #Enlever le # sur la ligne suivante pour afficher la photo avec marquage des contours\n'+
  '        #cv2.imshow("Photo avec marquage des contours", __photoContours__)\n'+
  '        #Enlever le # sur la ligne suivante pour afficher le découpage de la plaque d\'mmatriculation\n'+
  '        #cv2.imshow("Plaque d\'immatriculation", __plaqueImmatriculation__)\n'+
  '        __tauxDeConfiance__ = resultat[1]\n'+
  '        return(resultat[0])\n';

 
  
  var code = 'getImmatriculationTexte()';

  //return code;
  return [code, Blockly.Python.ORDER_NONE];
};





Blockly.Python['driss_opencv2_redim_image'] = function (block) {
  var var_image = block.getFieldValue('VAR_IMAGE');
  var width = block.getFieldValue('WIDTH');
  var height = block.getFieldValue('HEIGHT');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = var_image + ' = cv2.resize('+var_image+', ('+width+', '+height+'))\n';

  return code;
  //return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_convert_image_color_space'] = function (block) {
  var image_IN = block.getFieldValue('ORIGNAL_IMA');
  var color_space = block.getFieldValue('COLOR_SPACE');
  var image_OUT = block.getFieldValue('RESULT_IMA');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = '';

  switch (color_space) {
    case "GRAYSCAL": code = image_OUT + '= cv2.cvtColor(' + image_IN + ', cv2.COLOR_BGR2GRAY)\n'; break;
    case "BGR2HSV": code = image_OUT + '= cv2.cvtColor(' + image_IN + ', cv2.COLOR_BGR2HSV)\n'; break;
    case "BGR2LAB": code = image_OUT + '= cv2.cvtColor(' + image_IN + ', cv2.COLOR_BGR2LAB)\n'; break;
    case "BGR2RGB": code = image_OUT + '= cv2.cvtColor(' + image_IN + ', cv2.COLOR_BGR2RGB)\n'; break;
  }

  // TODO: Change ORDER_NONE to the correct strength.
  return code;
  //return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_appliquer_flou'] = function (block) {
  var image_IN = block.getFieldValue('ORIGNAL_IMA');
  var image_OUT = block.getFieldValue('RESULT_IMA');
  var filtre = block.getFieldValue('FILTRE');
  var kernel = block.getFieldValue('KERNEL');
  var sigma_color = block.getFieldValue('SIGMA_COLOR');
  var sigma_space = block.getFieldValue('SIGMA_SPACE');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = '';

  switch (filtre) {
    //case "GAUSSIEN": code = image_OUT + '= cv2.GaussianBlur(' + image_IN + ', (' + kernel + ',' + kernel + '), cv2.BORDER_DEFAULT)\n'; break;
    case "GAUSSIEN": code = image_OUT + '= cv2.GaussianBlur(' + image_IN + ', (' + kernel + ',' + kernel + '), cv2.BORDER_CONSTANT)\n'; break;
    case "MEDIAN": code = image_OUT + '= cv2.medianBlur(' + image_IN + ', ' + kernel + ')\n'; break;
    case "BILATERAL": code = image_OUT + '= cv2.bilateralFilter(' + image_IN + ', ' + kernel + ', ' + sigma_color + ', ' + sigma_space + ')\n'; break;
  }


  return code;
};


Blockly.Python['driss_opencv2_detecter_contours'] = function (block) {
  var image_IN = block.getFieldValue('ORIGNAL_IMA');
  var image_OUT = block.getFieldValue('RESULT_IMA');
  var seuil_1 = block.getFieldValue('SEUIL_1');
  var seuil_2 = block.getFieldValue('SEUIL_2');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = image_OUT + ' = cv2.Canny(' + image_IN + ', ' + seuil_1 + ',' + seuil_2 + ')\n';

  return code;
};

Blockly.Python['driss_opencv2_get_liste_contours'] = function (block) {
  var image_IN = block.getFieldValue('ORIGNAL_IMA');
  
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'cv2.findContours(' + image_IN + ', cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)[0]';

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['driss_opencv2_classer_contours'] = function (block) {
  var contours_list = block.getFieldValue('CONTOURS_LIST');
  var checkbox_reverse = block.getFieldValue('REVERSE') === 'TRUE';
  var critere = block.getFieldValue('KEY');
  var limite = block.getFieldValue('LIMITE');
  var str_critere ;

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var str_reverse = 'False' ;
  if(checkbox_reverse) str_reverse= 'True' ;

  switch (critere) {
    case "AREA":  str_critere = 'cv2.contourArea' ;  break;
    
  }

  var code = contours_list + ' = sorted('+contours_list+', key = '+str_critere+', reverse = '+str_reverse+')[:'+limite+']\n';
  return code;
};

Blockly.Python['driss_opencv2_get_nbre_contours'] = function (block) {
  var contours_list = block.getFieldValue('CONTOURS_LIST');
  
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = 'len('+contours_list+')';

  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_get_contour'] = function (block) {
  var contours_list = block.getFieldValue('CONTOURS_LIST');
  var cb_aire = block.getFieldValue('AIRE') === 'TRUE';
  var orientation = block.getFieldValue('ORIENTATION');
  
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  Blockly.Python.functionNames_["getContourRect"] = '#fonction qui retourne le contour rectangulaire\n';
  var funct = '';
  funct += 'def getContourRect(listeContours) :\n' ;
  if(cb_aire){
    funct += '    listeContours = sorted(listeContours, key = cv2.contourArea, reverse = True)[:100]\n' ;
  } 
  funct += '    for c in listeContours :\n' ;
  funct += '        peri = cv2.arcLength(c, True)\n';
  funct += '        approx = cv2.approxPolyDP(c, 0.02 * peri, True)\n';
  funct += '        if len(approx) == 4 :\n';
  funct += '            (x, y, w, h) = cv2.boundingRect(approx)\n';
  
  switch (orientation) {
    case "WsupH": funct += '            if(w>h) :\n';
                  funct += '                return (approx)\n';
                  break;

    case "WinfH": funct += '            if(w<h) :\n';
                  funct += '                return (approx)\n';
                  break;
    

    case "SQUARE":funct += '            if(w==h) :\n';
                  funct += '                return (approx)\n';
                  break;
  }

  funct += '        return(None)\n';

  Blockly.Python.functionNames_["getContourRect"] += funct;


  var code = 'getContourRect('+contours_list+')';

  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_draw_this_contour'] = function (block) {
  var rectangle = Blockly.Python.valueToCode(block, 'RECTANGLE', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var var_image = block.getFieldValue('VAR_IMAGE');
  var thickness = block.getFieldValue('THICKNESS');
  var color_HEX = block.getFieldValue('COLOR_HEX');

  var color_BGR = hexToBGR(color_HEX);
  //alert(color_HEX+ "    -   "+color_BGR);
  var code = 'cv2.drawContours(' + var_image + ', [' + rectangle + '], -1, ' + color_BGR + ', ' + thickness + ')\n';
  return code;
};


Blockly.Python['driss_opencv2_read_text_in_this_contour'] = function (block) {
  var contour = block.getFieldValue('CONTOUR');
  var var_image = block.getFieldValue('VAR_IMAGE');

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_Reader"] = "from easyocr import Reader";


  Blockly.Python.functionNames_["getTextInContour"] = '#fonction qui retourne le texte lu par OCR dans le contour\n'+
  'def getTextInContour() :\n' +
  '    (x, y, w, h) = cv2.boundingRect('+contour+')\n' +
  
  '    license_plate = '+var_image+'[y:y + h, x:x + w]\n' +
  '    print ("Contour plaque : ", license_plate)\n'+
  '    if len(license_plate) == 0:\n'+
  '        text = "Echec de lecture de la plaque  !"\n'+
  '        print(text)\n'+
  '        return(None)\n'+
  '    \n'+

  '    reader = Reader([\'fr\'], gpu=False, verbose=False)\n' +
  '    detection = reader.readtext(license_plate)\n' +
  '    print(detection)\n'
  '    if len(detection) == 0 :\n' +
  '        text = "Echec de lecture de la plaque  !"\n' +
  '        print(text)\n' +
  '        return(None)\n' +
  '    else :\n' +
  '        immatriculation = ""\n' +
  '        tauxConfiance = 0\n' +
  '        for elem in detection :\n' +
  '            if(len(immatriculation) < len(elem[1])) :\n' +
  '                immatriculation = elem[1]\n' +
  '                tauxConfiance = f"{elem[2] * 100:.2f}%"\n' +
  
  '        print("Immatriculation detecté par OCR : ",immatriculation)\n' +
  '        return(immatriculation.upper(), tauxConfiance)\n' ;
  
  var code = 'getTextInContour()[0]';
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_opencv2_write_legend_contour'] = function (block) {
  var texte = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC);
  var var_image = block.getFieldValue('VAR_IMAGE');
  var rectangle = block.getFieldValue('CONTOUR');
  var position = block.getFieldValue('POSITION');
  var txt_color_HEX = block.getFieldValue('TXT_COLOR');
  var bg_color_HEX = block.getFieldValue('BG_COLOR');
  
  
  var txt_color_BGR = hexToBGR(txt_color_HEX);
  var bg_color_BGR = hexToBGR(bg_color_HEX);

  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";

  var code = '';
  code += '(x, y, w, h) = cv2.boundingRect('+rectangle+')\n';
  code += 'text_size, _ = cv2.getTextSize('+texte+', cv2.FONT_HERSHEY_SIMPLEX, 0.75, 1)\n';
  code += 'text_w, text_h = text_size\n';
  code += 'cv2.rectangle('+var_image+', (x , y), (x+text_w, y-50), '+bg_color_BGR+', -1)\n';
  code += 'cv2.putText('+var_image+', '+texte+', (x, y-15), cv2.FONT_HERSHEY_SIMPLEX, 0.75, '+txt_color_BGR+', 1)\n';


  return code;
};


//----------------------------------------------------------------------------------------------
//Reconnaissance faciale

Blockly.Python['driss_opencv2_save_photo'] = function (block) {
  var fileName = Blockly.Python.valueToCode(block, 'FILE_NAME', Blockly.Python.ORDER_ATOMIC);
  var folder = Blockly.Python.valueToCode(block, 'FOLDER_NAME', Blockly.Python.ORDER_ATOMIC);
  
  var var_image = block.getFieldValue('VAR_IMAGE');

  //var nomComplet = folder.slice(0, -1) +fileName.slice(1);
  var nomComplet = "str("+folder+") + str("+fileName+")";
  

  var code = '';
  code+= 'res=cv2.imwrite('+nomComplet+', '+var_image+')\n';
  code+= 'if(res == True) :\n';
  code+= '    print("Image enregistrée")\n';
  code+= 'else :\n';
  code+= '    print("Erreur lors de l\'enregistrement de l\'image !!")\n';
 
  
  return code;
};


Blockly.Python['driss_opencv2_identifier_visages_references'] = function (block) {
  var folder = Blockly.Python.valueToCode(block, 'FOLDER', Blockly.Python.ORDER_ATOMIC);
  //var folder = block.getFieldValue('FOLDER');  //pas bon à cause des 

  // Sécurité : valeur vide
  if (!folder) {
      folder = "'./'";
  }

  // Supprimer les parenthèses éventuelles
  folder = folder.trim();

  // Tester si le chemin se termine par /
  if (!folder.endsWith("/'") && !folder.endsWith('/"')) {
      // Ajouter / avant le guillemet de fin
      folder = folder.slice(0, -1) + '/' + folder.slice(-1);
  }
  
  Blockly.Python.definitions_["import_os"] = "import os";


  Blockly.Python.ds_variables_["__known_faces_filenames__"] = '__known_faces_filenames__ = []';
  Blockly.Python.ds_variables_["__known_face_names__"] = '__known_face_names__ = []';
  Blockly.Python.ds_variables_["__known_face_encodings__"] = '__known_face_encodings__ = []';
  Blockly.Python.ds_variables_["__nbre_faces_recognized__"] = '__nbre_faces_recognized__ = 0';
  Blockly.Python.ds_variables_["__images_folder__"] = '__images_folder__ = None';
  Blockly.Python.ds_variables_["__reconized_faces_names__"] = '__reconized_faces_names__ = []';
 

  Blockly.Python.functionNames_["chargerLesImagesDeReferenceAPartirDuDossier"] = '#Charger toutes les photos du dossier\n'+
  'def chargerLesImagesDeReferenceAPartirDuDossier(dossier) :\n' +
  '    global __known_faces_filenames__\n'+
  '    for (dirpath, dirnames, filenames) in os.walk(dossier):\n' +
  '        __known_faces_filenames__.extend(filenames)\n' +
  '        break\n' +
  '    #print(__known_faces_filenames__)' ;

  Blockly.Python.functionNames_["identifierVisagesSurPhotosDeReferences"] = '#Identifier les visages sur les photos de reference et les associer à des noms d\'utilisateurs (nom d\'utilisateur = nom de fichier)\n'+
  'def identifierVisagesSurPhotosDeReferences(dossier) :\n' +
  '    global __known_faces_filenames__, __known_face_names__, __known_face_encodings__\n'+
  '    for filename in __known_faces_filenames__:\n' +
  '        face = face_recognition.load_image_file(dossier + filename)\n' +
  '        __known_face_names__.append( filename[:-4])\n' +
  '        __known_face_encodings__.append(face_recognition.face_encodings(face)[0])\n' +
  '    #print(__known_face_names__)\n' +
  '    #print(__known_face_encodings__)' ;


  var code = '';
  code += 'chargerLesImagesDeReferenceAPartirDuDossier('+folder+')\n';
  code += 'identifierVisagesSurPhotosDeReferences('+folder+')\n'; 
  return code;
};


Blockly.Python['driss_opencv2_do_face_recognition'] = function (block) {
  var photo = Blockly.Python.valueToCode(block, 'PHOTO', Blockly.Python.ORDER_ATOMIC);
  //var photo = block.getFieldValue('PHOTO'); //Non
  
  Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
  Blockly.Python.definitions_["import_face_recognition"] = "import face_recognition";
  Blockly.Python.definitions_["import_math"] = "import math";
  

  Blockly.Python.functionNames_["identifierTousLesVisageSurPhoto"] = '#Identifier tous les visages sur la photo\n'+
  'def identifierTousLesVisageSurPhoto(photo) :\n' +
  '    global __known_face_encodings__, __known_face_names__, __nbre_faces_recognized__\n'+
  '    imageAvecVisagesAIdentifier = photo\n' +
  '    # Trouver dans l\'image (la photo) tous les visages encodées (connus car dans le dossier base de données)\n' +
  '    face_locations = face_recognition.face_locations(imageAvecVisagesAIdentifier)\n' +
  '    face_encodings = face_recognition.face_encodings(imageAvecVisagesAIdentifier, face_locations)\n' +
  '    __nbre_faces_recognized__ = len(face_locations)\n' +
  '    __reconized_faces_names__.clear()\n' +
  
  '    \n'+
  '    # Pour chaque face reconnue sur la photo\n' +
  '    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):\n' +
  '        # vérifier si la face correspond à une face que la machine a appris\n' +
  '        match = face_recognition.compare_faces(__known_face_encodings__, face_encoding)\n' +
  '        nom = ""\n' +
  '        if True in match:\n' +
  '            first_match_index = match.index(True)\n'+
  '            nom = __known_face_names__[first_match_index]\n' +
  '            __reconized_faces_names__.append(nom)\n' +
  
  '            (match_top, match_right, match_bottom, match_left) = (top, right, bottom, left)\n' +
  '        \n'+
  '        if (nom != "") :\n' +
  '            # Dessiner le contour\n' +
  '            photo = cv2.rectangle(photo, (match_left-20,match_top-50), (match_right+20, match_bottom+30), (59, 10, 10), 3)\n' +
  '            photo = cv2.rectangle(photo, (match_left-22, match_bottom +50- 35), (match_right+22, match_bottom+50), (59, 10, 10), -1)\n' +
  '            \n' +
  '            # Ecrire le texte\n' +
  '            font = cv2.FONT_HERSHEY_COMPLEX\n' +
  '            fontScale = 0.75\n' +
  '            thickness = 1\n' +
  '            color = (255, 255, 255)\n' +
  '            \n' +
  '            textSize, baseline = cv2.getTextSize(nom, font, fontScale, thickness)\n' +
  '            textWidth, textHeight = textSize\n' +
  '            \n' +
  '            origine = (match_left+math.ceil((match_right-match_left-textWidth)/2),match_bottom+40)\n' +
  '            \n' +
  '            photo = cv2.putText(photo, nom, origine, font,  fontScale, color, thickness, cv2.LINE_AA)\n' +
  '            \n' +
  '        # Afficher l\'image\n' +
  '        #cv2.imshow(titreFenetre, photo)\n';

  var titreFenetre = "Photo issue de la camera du parking";
  var code = 'identifierTousLesVisageSurPhoto('+photo+')\n';
  
  return code;
};
 

// Blockly.Python['driss_opencv2_load_all_photos_from_folder'] = function (block) {
//   var folder = Blockly.Python.valueToCode(block, 'FOLDER', Blockly.Python.ORDER_ATOMIC);
  
//   Blockly.Python.definitions_["import_os"] = "import os";


//   Blockly.Python.ds_variables_["__known_faces_filenames__"] = '__known_faces_filenames__ = []';
//   Blockly.Python.ds_variables_["__known_face_names__"] = '__known_face_names__ = []';
//   Blockly.Python.ds_variables_["__known_face_encodings__"] = '__known_face_encodings__ = []';
//   Blockly.Python.ds_variables_["__nbre_faces_recognized__"] = '__nbre_faces_recognized__ = 0';
//   Blockly.Python.ds_variables_["__images_folder__"] = '__images_folder__ = None';

//   Blockly.Python.functionNames_["chargerLesImagesDeReferenceAPartirDuDossier"] = '#Charger toutes les photos du dossier\n'+
//   'def chargerLesImagesDeReferenceAPartirDuDossier(dossier) :\n' +
//   '    global __known_faces_filenames__\n'+
//   '    for (dirpath, dirnames, filenames) in os.walk(dossier):\n' +
//   '        __known_faces_filenames__.extend(filenames)\n' +
//   '        break\n' +
//   '    #print(__known_faces_filenames__)' ;

//   Blockly.Python.functionNames_["identifierVisagesSurPhotosDeReferences"] = '#Identifier les visages sur les photos de reference et les associer à des noms d\'utilisateurs (nom d\'utilisateur = nom de fichier)\n'+
//   'def identifierVisagesSurPhotosDeReferences(dossier) :\n' +
//   '    global __known_faces_filenames__, __known_face_names__, __known_face_encodings__\n'+
//   '    for filename in __known_faces_filenames__:\n' +
//   '        face = face_recognition.load_image_file(dossier + filename)\n' +
//   '        __known_face_names__.append( filename[:-4])\n' +
//   '        __known_face_encodings__.append(face_recognition.face_encodings(face)[0])\n' +
//   '    #print(__known_face_names__)\n' +
//   '    #print(__known_face_encodings__)' ;


//   var code = '';
//   code += 'chargerLesImagesDeReferenceAPartirDuDossier('+folder+')\n';
//   code += 'identifierVisagesSurPhotosDeReferences('+folder+')\n'; 
  
//   return code;
//};

// Blockly.Python['driss_opencv2_do_face_recognition'] = function (block) {
//   var folder = block.getFieldValue('FOLDER');
//   var photo = Blockly.Python.valueToCode(block, 'PHOTO', Blockly.Python.ORDER_ATOMIC);
  
//   Blockly.Python.definitions_["import_os"] = "import os";
//   Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
//   Blockly.Python.definitions_["import_face_recognition"] = "import face_recognition";
//   Blockly.Python.definitions_["import_math"] = "import math";



//   Blockly.Python.ds_variables_["__known_faces_filenames__"] = '__known_faces_filenames__ = []';
//   Blockly.Python.ds_variables_["__known_face_names__"] = '__known_face_names__ = []';
//   Blockly.Python.ds_variables_["__known_face_encodings__"] = '__known_face_encodings__ = []';
//   Blockly.Python.ds_variables_["__nbre_faces_recognized__"] = '__nbre_faces_recognized__ = 0';
//   Blockly.Python.ds_variables_["__marked_picture__"] = '__marked_picture__ = None';
  
  

//   Blockly.Python.functionNames_["chargerLesImagesDeReferenceAPartirDuDossier"] = '#Charger toutes les photos du dossier\n'+
//   'def chargerLesImagesDeReferenceAPartirDuDossier(dossier) :\n' +
//   '    global __known_faces_filenames__\n'+
//   '    for (dirpath, dirnames, filenames) in os.walk(dossier):\n' +
//   '        __known_faces_filenames__.extend(filenames)\n' +
//   '        break\n' +
//   '    #print(__known_faces_filenames__)' ;

//   Blockly.Python.functionNames_["identifierVisagesSurPhotosDeReferences"] = '#Identifier les visages sur les photos de reference et les associer à des noms d\'utilisateurs (nom d\'utilisateur = nom de fichier)\n'+
//   'def identifierVisagesSurPhotosDeReferences(dossier) :\n' +
//   '    global __known_faces_filenames__, __known_face_names__, __known_face_encodings__\n'+
//   '    for filename in __known_faces_filenames__:\n' +
//   '        face = face_recognition.load_image_file(dossier + filename)\n' +
//   '        __known_face_names__.append( filename[:-4])\n' +
//   '        __known_face_encodings__.append(face_recognition.face_encodings(face)[0])\n' +
//   '    #print(__known_face_names__)\n' +
//   '    #print(__known_face_encodings__)' ;
//   '    return '


//   var code = '';
//   code += 'chargerLesImagesDuDossier(r"'+folder+'")\n';
//   code += '__nbre_faces_recognized__ = identifierVisagesSurPhotos(r"'+folder+'")\n'


//   return code;
// };

Blockly.Python['driss_opencv2_nombre_visages_reconnus'] = function (block) {

  var code = '__nbre_faces_recognized__';
  
  return [code, Blockly.Python.ORDER_NONE];
}




// Blockly.Python['driss_opencv2_show_reconized_faces_in_frame'] = function (block) {
//   var titreFenetre = Blockly.Python.valueToCode(block, 'FRAME_NAME', Blockly.Python.ORDER_ATOMIC);
  
//   var code = 'cv2.imshow('+titreFenetre+', __marked_picture__)\n';
  
//   return code;
// };



Blockly.Python['driss_opencv2_nom_visage_reconnu'] = function (block) {
  var code = '\'\'.join(__reconized_faces_names__)';
  
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['driss_opencv2_filename_visage_reconnu'] = Blockly.Python['driss_opencv2_nom_visage_reconnu'] ;


// Blockly.Python['driss_opencv2_marquer_visages_reconnus'] = function (block) {
//   var photo = Blockly.Python.valueToCode(block, 'PICTURE', Blockly.Python.ORDER_ATOMIC);
  
//   Blockly.Python.definitions_["import_CV2"] = "import cv2 as cv2";
//   Blockly.Python.definitions_["import_face_recognition"] = "import face_recognition";
//   Blockly.Python.definitions_["import_math"] = "import math";
  

//   Blockly.Python.functionNames_["identifierTousLesVisageSurPhoto"] = '#Identifier tous les visages sur la photo\n'+
//   'def identifierTousLesVisageSurPhoto(titreFenetre, photo) :\n' +
//   '    global __known_face_encodings__, __known_face_names__\n'+
//   '    imageAvecVisagesAIdentifier = photo\n' +
//   '    # Trouver dans l\'image (la photo) tous les visages encodées (connus car dans le dossier base de données)\n' +
//   '    face_locations = face_recognition.face_locations(imageAvecVisagesAIdentifier)\n' +
//   '    face_encodings = face_recognition.face_encodings(imageAvecVisagesAIdentifier, face_locations)\n' +
  
//   '    \n'+
//   '    # Pour chaque face reconnue sur la photo\n' +
//   '    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):\n' +
//   '        # vérifier si la face correspond à une face que la machine a appris\n' +
//   '        match = face_recognition.compare_faces(__known_face_encodings__, face_encoding)\n' +
//   '        nom = ""\n' +
//   '        if True in match:\n' +
//   '            first_match_index = match.index(True)\n'+
//   '            nom = __known_face_names__[first_match_index]\n' +
//   '            (match_top, match_right, match_bottom, match_left) = (top, right, bottom, left)\n' +
//   '        \n'+
//   '        if (nom != "") :\n' +
//   '            # Dessiner le contour\n' +
//   '            photo = cv2.rectangle(photo, (match_left-20,match_top-50), (match_right+20, match_bottom+30), (59, 10, 10), 3)\n' +
//   '            photo = cv2.rectangle(photo, (match_left-22, match_bottom +50- 35), (match_right+22, match_bottom+50), (59, 10, 10), -1)\n' +
//   '            \n' +
//   '            # Ecrire le texte\n' +
//   '            font = cv2.FONT_HERSHEY_COMPLEX\n' +
//   '            fontScale = 0.75\n' +
//   '            thickness = 1\n' +
//   '            color = (255, 255, 255)\n' +
//   '            \n' +
//   '            textSize, baseline = cv2.getTextSize(nom, font, fontScale, thickness)\n' +
//   '            textWidth, textHeight = textSize\n' +
//   '            \n' +
//   '            origine = (match_left+math.ceil((match_right-match_left-textWidth)/2),match_bottom+40)\n' +
//   '            \n' +
//   '            photo = cv2.putText(photo, nom, origine, font,  fontScale, color, thickness, cv2.LINE_AA)\n' +
//   '            \n' +
//   '        # Afficher l\'image\n' +
//   '        cv2.imshow(titreFenetre, photo)\n';

//   var titreFenetre = "Photo issue de la camera du parking";
//   var code = 'identifierTousLesVisageSurPhoto("'+titreFenetre+'", '+photo+')\n';
  
//   return code;
// };