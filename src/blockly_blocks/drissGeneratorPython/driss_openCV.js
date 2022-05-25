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
 * @fileoverview Générateur de code Python pour les blocs OpenCV
 * @author Driss Soudani
 */
 'use strict';


 goog.require('Blockly.Python');



 function rgbToTSL(R,V,B) {
  var T, S, L, M, m;
  var L_max = 255;
  var S_max = 255;

  var S_min = 0;
  var L_min = 0;
  
  if (R==V && R==B) {
    T=160;
    S=0;
    L=L_max*R/255;
    }
  //calcul de T,S,L   
  //1:R=V<B 
  if (R==V && R<B) {
      M=B;m=R;
      T = 160;
      L = L_max*(M+m)/510;
      if (L>120) {S = S_max*(M-m)/(510-(M+m));} else {S = S_max*(M-m)/(M+m);} 
    }
  
  //2:R=V>B
  if (R==V && R>B) {
    M=R;m=B;
    T=40;
    L = L_max*(M+m)/510;
    if (L>120) {S = S_max*(M-m)/(510-(M+m));} else {S = S_max*(M-m)/(M+m);}
    }
  
  
  //3:V=B<R
  if (V==B && B<R) {
    M=R;m=V;
    T=0;
    L = L_max*(M+m)/510;
    if (L>120) {S = S_max*(M-m)/(510-(M+m));} else {S = S_max*(M-m)/(M+m);} 
  }
   
  //4:V=B>R
  if (V==B && B>R) {
    M=R;m=V;
    T=120;
    L = L_max*(M+m)/510;
    if (L>120) {S = S_max*(M-m)/(510-(M+m));}  else {S = S_max*(M-m)/(M+m);} 
  }
  
  
  //5:B=R<V 
  if (B==R && R<V) {
    M=V;m=B;
    T=80;
    L = L_max*(M+m)/510;
    if (L>120) {S = S_max*(M-m)/(510-(M+m));} else {S = S_max*(M-m)/(M+m);} 
  }
  
  //6:B=R>V
  if (B==R && R>V) {
    M=B;m=V;
    T=200;
    L = L_max*(M+m)/510;
    if (L>120) {S = S_max*(M-m)/(510-(M+m));} else {S = S_max*(M-m)/(M+m);} 
  }
  
  //7:R<V<B
  if (R<V && V<B) {
    M=B;m=R;
    T= 160 + 40*(R-V)/(M-m);
    L = L_max*(M+m)/510;
    if (L>120) {S = S_max*(M-m)/(510-(M+m));} else {S = S_max*(M-m)/(M+m);} 
  }
  
  //8:R<B<V
  if (R<B && B<V) {
    M=V;m=R;
    T= 80 + 40*(B-R)/(M-m);
    L = L_max*(M+m)/510;
    if (L>120) {S = S_max*(M-m)/(510-(M+m));} else {S = S_max*(M-m)/(M+m);} 
  }
   
  //9:V<R<B
  if (V<R && R<B) {
    M=B;m=V;
    T= 160 + 40*(R-V)/(M-m);
    L = L_max*(M+m)/510;
    if (L>120) {S = S_max*(M-m)/(510-(M+m));} else {S = S_max*(M-m)/(M+m);} 
  }
  
  //10:V<B<R
  if (V<B && B<R) {
    M=R;m=V;
    T= 240 + 40*(V-B)/(M-m);
    L = L_max*(M+m)/510;
    if (L>120) {S = S_max*(M-m)/(510-(M+m));} else {S = S_max*(M-m)/(M+m);} 
  }
  
  //11:B<R<V
  if (B<R && R<V) {
    M=V;m=B;
    T= 80 + 40*(B-R)/(M-m);
    L = L_max*(M+m)/510;
    if (L>120) {S = S_max*(M-m)/(510-(M+m));} else {S = S_max*(M-m)/(M+m);} 
  }
  
  //12:B<V<R 
  if (B<V && V<R) {
    M=R;m=B;
    T= 40*(V-B)/(M-m);
    L = L_max*(M+m)/510;
    if (L>120) {S = S_max*(M-m)/(510-(M+m));} else {S = S_max*(M-m)/(M+m);} 
  }
  
  S = Math.max(S, S_min);
  L = Math.max(L, L_min);

  var h = Math.round(T);
  var s = Math.round(S);
  var v = Math.round(L);
  return {
    h: h,
    s: s,
    v: v
  };
  
  }



// javascript program change RGB Color
// Model to HSV Color Model
function rgb_to_hsv(r , g , b) {

		// R, G, B values are divided by 255
		// to change the range from 0..255 to 0..1
		r = r / 255.0;
		g = g / 255.0;
		b = b / 255.0;

		// h, s, v = hue, saturation, value
		var cmax = Math.max(r, Math.max(g, b)); // maximum of r, g, b
		var cmin = Math.min(r, Math.min(g, b)); // minimum of r, g, b
		var diff = cmax - cmin; // diff of cmax and cmin.
		var h = -1, s = -1;

		// if cmax and cmax are equal then h = 0
		if (cmax == cmin)
			h = 0;

		// if cmax equal r then compute h
		else if (cmax == r)
			h = (60 * ((g - b) / diff) + 360) % 360;

		// if cmax equal g then compute h
		else if (cmax == g)
			h = (60 * ((b - r) / diff) + 120) % 360;

		// if cmax equal b then compute h
		else if (cmax == b)
			h = (60 * ((r - g) / diff) + 240) % 360;

		// if cmax equal zero
		if (cmax == 0)
			s = 0;
		else
			s = (diff / cmax) * 100;

		// compute v
		var v = cmax * 100;

    return {
      h: Math.round(h.toFixed(1)),
      s: s,
      v: v
    };
	
	}


  





 /**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 * 
 * https://gist.github.com/mjackson/5311256
 */

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
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

 // 1 - ---------------------------------------------------------------------------------------------------------
 Blockly.Python['driss_opencv_getColor'] = function(block) {
    var color = block.getFieldValue('COLOR');
    
    var R_dec = parseInt(color.substring(1, 3), 16);
    var G_dec = parseInt(color.substring(3, 5), 16);
    var B_dec = parseInt(color.substring(5, 7), 16);
    
    //alert(color+"   "+R_dec+" "+G_dec+" "+B_dec);
    var HSV = rgbToTSL(R_dec, G_dec, B_dec);
    /*
    var HSV = rgb2hsv(R_dec, G_dec, B_dec);
    HSV.h = HSV.h/2; //sur 180 et non 360
    HSV.s = HSV.s/100*255; 
    HSV.v = HSV.v/100*255; 
    */

    //var HSV = rgb2hsv(60, 120, 180);
    //alert(color+"   "+R_dec+" "+G_dec+" "+B_dec);
    //alert ("("+HSV.h+" , "+HSV.s+" ,"+ HSV.v+")")


    Blockly.Python.definitions_["import_CV2"] = "import cv2"
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np"


    var code  = "";
    //code +=  "hex = getHEX('"+color+"')\n";
    code +=  "np.array(["+HSV.h+", "+HSV.s+", "+HSV.v+"])";

    return [code, Blockly.Python.ORDER_ATOMIC];
    //return [code];
  };


  Blockly.Python['driss_opencv_getcolor_hsv'] = function(block) {
    var h = block.getFieldValue('H');
    var s = block.getFieldValue('S');
    var v = block.getFieldValue('V');

    var code  = "";
    code +=  "np.array(["+h+", "+s+", "+v+"])";
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

// 2 - ---------------------------------------------------------------------------------------------------------
 /* Blockly.Python['driss_opencv_getVideoCapture'] = function(block) {
    var num_camera = Blockly.Python.valueToCode(block, 'NUM_CAMERA', Blockly.Python.ORDER_ATOMIC);

    ero
    var code ="cv2.VideoCapture("+num_camera+")";
    code +=  "#Vérifier si la caméra s'est ouverte avec succès\n";
    code +=  "if not cap.isOpened():\n";
    code +=  "    print('Erreur lors de l\'ouverture du flux vidéo')\n";
    code +=  "    exit()\n";
    //code +=  "\n";

    return [code, Blockly.Python.ORDER_NONE];
  };
*/
  Blockly.Python['driss_opencv_capturer_flux_video'] = function(block) {
    var num_cam = block.getFieldValue('NUM_CAM');

    Blockly.Python.definitions_["import_CV2"] = "import cv2"
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np"

    Blockly.Python.ds_variables_["VideoCapture_"+num_cam] = "VideoCapture_"+num_cam+" = None";
    //alert(Blockly.Python.variableDB_["VideoCapture_0"]);
   
    var code ="VideoCapture_"+num_cam+" = cv2.VideoCapture("+num_cam+")\n";
    code +=  "#Vérifier si la caméra s'est ouverte avec succès\n";
    code +=  "if not VideoCapture_"+num_cam+".isOpened():\n";
    code +=  "    print(\"Erreur lors de l'ouverture du flux vidéo\")\n";
    code +=  "    exit()\n";
    //code +=  "\n";
    return(code);
   // return [code, Blockly.Python.ORDER_NONE];
  };

// 3 - ---------------------------------------------------------------------------------------------------------
  Blockly.Python['driss_opencv_waitKey'] = function(block) {
    var keyName = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC);
    
    var code = "cv2.waitKey(1)&0xFF==ord("+keyName+")";
   
    //return(code);
    return [code, Blockly.Python.ORDER_NONE];
  };

// 4 - ---------------------------------------------------------------------------------------------------------
/*Blockly.Python['driss_opencv_readFrameFromCapture'] = function(block) {
  //var frame = Blockly.Python.nameDB_.getName(block.getFieldValue('FRAME'), Blockly.Variables.NAME_TYPE);
  var frame = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  
  var code = "";
  //code += "#Capturer une image du flux et la placer dans la variable\n";
  code += frame+".read()";
  //return(code);
  return [code, Blockly.Python.ORDER_NONE];
};
*/
/*
Blockly.Python['driss_opencv_read_image_form_video'] = function(block) {
  var numCam = block.getFieldValue('NUM_CAM');
  
  var code = "";
  //code += "#Capturer une image du flux et la placer dans la variable\n";
  code += "VideoCapture_"+numCam+".read()";
  //return(code);
  return [code, Blockly.Python.ORDER_NONE];
};
*/

Blockly.Python['driss_opencv_read_store_image_form_video'] = function(block) {
  var num_cam = block.getFieldValue('NUM_CAM');
  var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  
  var code = "";
  code += "#Capturer une image du flux et la placer dans la variable\n";
  code += "ret, "+variable+" = VideoCapture_"+num_cam+".read()\n";
  return(code);
  //return [code, Blockly.Python.ORDER_NONE];
};

// 5 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv_changeColorometrie_RGB_to_HSV'] = function(block) {
  var frame = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  //alert(frame);
  var code = ""; 
  //code += "#Changer l'espace colorométrique de l'image capturée de RGB à HSV le résultat est placé dans 'image'\n"; 
  //code += "#HSV = Hue, Saturation, Value, en français = TSV – Teinte, Saturation, Valeur\n";
  code += "cv2.cvtColor("+frame+", cv2.COLOR_BGR2HSV)";
  
  return [code, Blockly.Python.ORDER_NONE];
};

// 6 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv_blurImage'] = function(block) {
  var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var ksize = Blockly.Python.valueToCode(block, 'KSIZE', Blockly.Python.ORDER_ATOMIC);
 
  var code = ""; 
  code += "#Appliquer un léger flou sur l'image HSV pour gommer les pixels parasites\n"; 
  code += variable+" = cv2.blur("+variable+", ("+ksize+", "+ksize+"))\n";
  return(code);
  //return [code, Blockly.Python.ORDER_NONE];
};

// 7 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv_inRange'] = function(block) {
  var ima_src = Blockly.Python.variableDB_.getName(block.getFieldValue('IMA_SRC'), Blockly.Variables.NAME_TYPE);
  var ima_dest = Blockly.Python.variableDB_.getName(block.getFieldValue('IMA_DEST'), Blockly.Variables.NAME_TYPE);
  var lo_color = Blockly.Python.valueToCode(block, 'LO_COLOR', Blockly.Python.ORDER_ATOMIC);
  var hi_color = Blockly.Python.valueToCode(block, 'HI_COLOR', Blockly.Python.ORDER_ATOMIC);
  
  var code = ""; 
  code += "#Masquer les couleurs situées en dehors des 2 couleurs limites\n"; 
  code += ima_dest+" = cv2.inRange("+ima_src+", "+lo_color+", "+hi_color+")\n";
  return(code);
  //return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['driss_opencv_inRange_one_colore'] = function(block) {
  var ima_src = Blockly.Python.variableDB_.getName(block.getFieldValue('IMA_SRC'), Blockly.Variables.NAME_TYPE);
  var ima_dest = Blockly.Python.variableDB_.getName(block.getFieldValue('IMA_DEST'), Blockly.Variables.NAME_TYPE);
  var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);

  //alert(color);
  
  var code = ""; 
  code += "#Masquer les couleurs 'color'\n"; 
  code += ima_dest+" = cv2.inRange("+ima_src+", "+color+", "+color+")\n";
  return(code);
  //return [code, Blockly.Python.ORDER_NONE];
};

// 8 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv_eroderImage'] = function(block) {
  var image = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var nbre_iterations = Blockly.Python.valueToCode(block, 'ER_IT', Blockly.Python.ORDER_ATOMIC);
  
  var code = ""; 
  code += "#Erroder l'image\n"; 
  code += image+" = cv2.erode("+image+", None, iterations="+nbre_iterations+")\n";
  return(code);
  //return [code, Blockly.Python.ORDER_NONE];
};

// 9 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv_dilaterImage'] = function(block) {
  var image = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var nbre_iterations = Blockly.Python.valueToCode(block, 'DI_IT', Blockly.Python.ORDER_ATOMIC);
  
  var code = ""; 
  code += "#Dilater l'image\n"; 
  code += image+" = cv2.dilate("+image+", None, iterations="+nbre_iterations+")\n";
  return(code);
  //return [code, Blockly.Python.ORDER_NONE];
};

// 10 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv_bitwise'] = function(block) {
  var operation = block.getFieldValue('OPERATION');
  var ima1 = Blockly.Python.variableDB_.getName(block.getFieldValue('IMA1'), Blockly.Variables.NAME_TYPE);
  var ima2 = Blockly.Python.variableDB_.getName(block.getFieldValue('IMA2'), Blockly.Variables.NAME_TYPE);
  var use_mask = block.getFieldValue('USE_MASK') == 'TRUE';
  var mask = Blockly.Python.variableDB_.getName(block.getFieldValue('MASK'), Blockly.Variables.NAME_TYPE);
  
  var code = ""; 
  //code += "#effectue un une opération logique entre les bits des 2 images uniquement pour les points où le masque est différent de 0\n"; 
  if(use_mask)
    code += "cv2.bitwise_and("+ima1+", "+ima2+", mask="+mask+")";
  else
    code += "cv2.bitwise_and("+ima1+", "+ima2+")";
  //return(code);
  return [code, Blockly.Python.ORDER_NONE];
};

// 11 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv_bitwise_simple'] = function(block) {
  var ima1 = Blockly.Python.variableDB_.getName(block.getFieldValue('IMA1'), Blockly.Variables.NAME_TYPE);
  var mask = Blockly.Python.variableDB_.getName(block.getFieldValue('MASK'), Blockly.Variables.NAME_TYPE);
  
  var code = ""; 
  //code += "#effectue un une opération logique entre les bits de 2 images identiques uniquement pour les points où le masque est différent de 0\n"; 
  code += "cv2.bitwise_and("+ima1+", "+ima1+", mask="+mask+")";
  //return(code);
  return [code, Blockly.Python.ORDER_NONE];
};

// 12 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv_contour_masque'] = function(block) {
  var mask = Blockly.Python.variableDB_.getName(block.getFieldValue('MASK'), Blockly.Variables.NAME_TYPE);
  
  var code = ""; 
  //code += "#Extraire le contour des données binaires en noir et blanc\n"; 
  code += "cv2.findContours("+mask+", cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]";
  //return(code);
  return [code, Blockly.Python.ORDER_NONE];
};

// 13 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv_marquage'] = function(block) {
  var ima = Blockly.Python.variableDB_.getName(block.getFieldValue('IMA'), Blockly.Variables.NAME_TYPE);
  var contour = Blockly.Python.variableDB_.getName(block.getFieldValue('CONTOUR'), Blockly.Variables.NAME_TYPE);
  var marquage = block.getFieldValue('MARQUAGE');
  var color = block.getFieldValue('COLOR');
  var name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);

  var R_dec = parseInt(color.substring(1, 3), 16);
  var G_dec = parseInt(color.substring(3, 5), 16);
  var B_dec = parseInt(color.substring(5, 7), 16);
  
  var color_info = "("+B_dec+", "+G_dec+", "+R_dec+")";
  
  //alert(color_info);
  var code = ""; 
  code += "#Marquer le contour\n"; 
  switch(marquage){
    case  "CIRCLE_V" :  code += "if len("+contour+") > 0:\n";
                        code += "   c=max("+contour+", key=cv2.contourArea)\n";
                        code += "   ((x, y), rayon)=cv2.minEnclosingCircle(c)\n";
                        code += "   if rayon>30:\n";
                        code += "       cv2.circle("+ima+", (int(x), int(y)), int(rayon), "+color_info+", 2)\n";
                        code += "       cv2.circle("+ima+", (int(x), int(y)), 5, "+color_info+", 10)\n";
                        //code += "       cv2.line("+ima+", (int(x), int(y)), (int(x)+150, int(y)), "+color_info+", 2)\n";
                        code += "       cv2.putText("+ima+", "+name+", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 1, "+color_info+", 1, cv2.LINE_AA)\n";
                        break;
    case  "CIRCLE_P" :
      break;
    case  "RECT_P" :
      break;
    case  "RECT_V" :
       break;
    case  "LINE" :code += "if len("+contour+") > 0:\n";
                    code += "   c=max("+contour+", key=cv2.contourArea)\n";
                    code += "   ((x, y), rayon)=cv2.minEnclosingCircle(c)\n";
                    code += "   if rayon>30:\n";
                    code += "       cv2.circle("+ima+", (int(x), int(y)), 5, "+color_info+", 10)\n";
                    code += "       cv2.line("+ima+", (int(x), int(y)), (int(x)+150, int(y)), "+color_info+", 2)\n";
                    code += "       cv2.putText("+ima+", "+name+", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 1, "+color_info+", 1, cv2.LINE_AA)\n";
                    break;
                  
  }
  code += "";
  return(code);
  //return [code, Blockly.Python.ORDER_NONE];
};

// 14 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv_show_image'] = function(block) {
  var image = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var title = Blockly.Python.valueToCode(block, 'TITLE', Blockly.Python.ORDER_ATOMIC);
  
  var code = ""; 
  code += "#afficher une image dans une fenêtre.\n"; 
  code += "#La fenêtre s’adapte automatiquement à la taille de l’image.\n"; 
  code += "cv2.imshow("+title+", "+image+")\n";
  return(code);
  //return [code, Blockly.Python.ORDER_NONE];
};

// 15 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['driss_opencv_release'] = function(block) {
  var num_cam = block.getFieldValue('NUM_CAM');
  
  var code = ""; 
  code += "# Ne pas oublier de fermer le flux et la fenetre.\n"; 
  code += "VideoCapture_"+num_cam+".release()\n";
  code += "cv2.destroyAllWindows()\n";
  
  return(code);
  //return [code, Blockly.Python.ORDER_NONE];
};
// 7 - ---------------------------------------------------------------------------------------------------------

// 7 - ---------------------------------------------------------------------------------------------------------

