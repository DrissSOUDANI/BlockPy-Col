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
 * @fileoverview Générateur de code Python pour les blocs Inputs
 * @author Driss Soudani
 */
'use strict';


goog.require('Blockly.Python');



Blockly.Python['driss_createRandomDataSet'] = function (block) {
  var features = block.getFieldValue('FEATURES');
  var samples = block.getFieldValue('SAMPLES');
  var seed = block.getFieldValue('SEED');
  var noise = block.getFieldValue('NOISE');



  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";
  Blockly.Python.definitions_["import_sklearn_datasets_make_regression"] = "from sklearn.datasets import make_regression";
  Blockly.Python.definitions_["import_matplotlib_pyplot"] = "import matplotlib.pyplot as plt";

  var code = '';
  code += 'np.random.seed(' + seed + ');\n';
  code += 'x, y = make_regression(n_samples=' + samples + ', n_features=' + features + ', noise=' + noise + ');\n';

  code += '# redimensionner y\n';
  code += 'y = y.reshape(y.shape[0], 1)\n';
  code += '# Créer la matrice X avec x et en ajoutant une colonne de 1 (Biais)\n';
  code += 'X = np.hstack((x, np.ones(x.shape)))\n';
  code += '\n';

  return code;
};





Blockly.Python['driss_afficherNuagePoint'] = function (block) {
  var feature = block.getFieldValue('FEATURE');
  var marker = block.getFieldValue('MARKER');
  var color = block.getFieldValue('COLOR');

  var markColor = " c='" + color + "'";
  if (color == 'DEFAULT') {
    markColor = "";
  }

  var code = '';
  code += 'xi = x[:,' + (feature - 1) + ':' + feature + '];\n';
  code += 'plt.scatter(xi, y, marker=\'' + marker + '\', ' + markColor + ');\n\n';
  return code;
};




/*
Blockly.Python['driss_createLineareModel'] = function (block) {
  var param_a = block.getFieldValue('PARAM_A');
  var param_b = block.getFieldValue('PARAM_B');

  Blockly.Python.ds_variables_["dgml_tetha"] = "" +
    "# Vecteur Tetha qui regroupes les paramètres a et b du modèle\n" +
    "tetha = np . zeros (2)";

  Blockly.Python.functionNames_["monModelLineaire"] = '#Implémenter le modèle linéaire y = a.x + b\n' +
    'def monModelLineaire(X, tetha) :\n' +
    '    return X.dot(tetha)\n';

  var code = '#Création du modèle y = a . x + b \n';
  code += 'tetha [0] = ' + param_a + '\n';
  code += 'tetha [1] = ' + param_b + '\n';
  code += 'y = monModelLineaire(X, tetha)\n';
  return code;
};

*/




Blockly.Python['driss_setRandomParam'] = function (block) {
  var seed = block.getFieldValue('SEED');

  Blockly.Python.definitions_["import_numpy"] = "import numpy as np";

  Blockly.Python.functionNames_["genererAleatoirementLesParametres_a_et_b"] = '#fonction qui génère aléatoirement les paramètres a et b du modèle y = a.x + b\n' +
    'def genererNombreAleatoire(seed) :\n' +
    '    np.random.seed(seed);\n' +
    '    return (np.random.randn(1));\n';

  var code = '';
  code += 'genererNombreAleatoire(' + seed + ')';
  return [code, Blockly.Python.ORDER_NONE];
};









Blockly.Python['driss_drawModel'] = function (block) {
  var color = block.getFieldValue('COLOR');
  var dropdown_params = block.getFieldValue('PARAMS');

  var code = '';
  switch (dropdown_params){
    case "PARAMS_DEBUT" : 
    code += '#Tracé du modèle initial\n';
    code += 'Yd = modeleLineaire(X, historiqueParams[0][0], historiqueParams[0][1])\n';
    code += 'plt.plot(x, Yd, c=\'' + color + '\')\n';
      break;

      case "PARAMS_FIN" :
        code += '#Tracé du modèle optimisé\n';
    code += 'Yo = modeleLineaire(X, historiqueParams[-1][0], historiqueParams[-1][1])\n';
    code += 'plt.plot(x, Yo, c=\'' + color + '\')\n';
      break;

  }

  return code;
};







Blockly.Python['driss_fonctionCout'] = function (block) {
  var y_model  = block.getFieldValue('Y_MODEL');

  Blockly.Python.ds_variables_["dgml_evolutionErreur"] = "" +
    "# Tableau pour mémoriser les valeurs de l\'erreur au cours de l\'optimisation (pour l\'animation)\n" +
    "evolutionErreur = []";

  Blockly.Python.functionNames_["calculerErreur"] = '#fonction calcule l\'écart entre la valeur y calculée par le modèle et celle du DataSet\n' +
    'def calculerSommeDesErreurs(y, y_model) :\n' +
    '    delta = 1/(2*len(y)) * np.sum((y_model - y)**2)\n' +
    '    evolutionErreur.append(delta)\n'+
    '    return delta\n';

  var code = '';
  code += 'calculerSommeDesErreurs(y, '+y_model+')';
  return [code, Blockly.Python.ORDER_NONE];
};





Blockly.Python['driss_executeAlgorithmeDescenteGradient'] = function (block) {
  var param_a = block.getFieldValue('PARAM_A');
  var param_b = block.getFieldValue('PARAM_B');
  var learning_rate = block.getFieldValue('LEARNING_RATE');

  

  Blockly.Python.ds_variables_["dgml_historiqueParams"] = "" +
    "# Tableau pour mémorises tous les paramètres a et b utilisés au cours de l\'optimisation (pour l\'animation)\n" +
    "historiqueParams = []";



  Blockly.Python.functionNames_["calculerLeGradient"] = '#fonction calcule le gradient\n' +
    'def calculerLeGradient(X, y, a,b) :\n' +
    '    m = len(y) \n' +
    '    return 1/m * X.T.dot(modeleLineaire(X, a,b) - y)\n';


  Blockly.Python.functionNames_["effectuerDescenteDeGradient"] = '#Fonction qui execute l\'algorithme de descente de gradient\n' +
    'def effectuerDescenteDeGradient(X, y, a, b, pasDaprentissage) :\n' +
    '    global bestTheta, historiqueParams\n'+
    '    historiqueParams.append(bestTheta); \n'+
    '    bestTheta = bestTheta - pasDaprentissage * calculerLeGradient(X, y, a,b)\n' ;
    

  var code = 'effectuerDescenteDeGradient(X, y,' + param_a + ', ' + param_b + ' , ' + learning_rate + ')\n';

  return code;
};



Blockly.Python['driss_getOptimisedParam'] = function (block) {
  var param_name = block.getFieldValue('PARAM_NAME');

  var code = '';
  switch (param_name) {
    case "PARAM_A": code = 'bestTheta[0]';
      break;
    case "PARAM_B": code = 'bestTheta[1]';
      break;

  }

  return [code, Blockly.Python.ORDER_NONE];
};




Blockly.Python['driss_getModelResult'] = function(block) {
  var dropdown_model = block.getFieldValue('MODEL');
  var param_a =  block.getFieldValue('PARAM_A');
  var param_b = block.getFieldValue('PARAM_B');
  
  Blockly.Python.ds_variables_["dgml_tetha"] = "" +
    "# Vecteur Tetha qui regroupes les paramètres a et b du modèle\n" +
    "bestTheta = np . zeros (2)\n"+
    "bestTheta = bestTheta.reshape(bestTheta.shape[0], 1)\n"

  Blockly.Python.functionNames_["modeleLineaire"] = '#Implémenter le modèle linéaire y = a.x + b\n' +
    'def modeleLineaire(X, a, b) :\n' +
    '    bestTheta [0] = a \n'+
    '    bestTheta [1] = b \n'+
    '    return X.dot(bestTheta)\n';

  var code = '';
  code += 'modeleLineaire(X, ' + param_a + ', ' + param_b + ')';
  
  return [code, Blockly.Python.ORDER_NONE];
};