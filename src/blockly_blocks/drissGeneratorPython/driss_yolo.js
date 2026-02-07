Blockly.Python['driss_yolo_importer_model_pre_entraine'] = function (block) {
    var model_path = Blockly.Python.valueToCode(block, 'MODEL_PATH', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.definitions_["import_CV2"] = "import cv2"
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np"
    Blockly.Python.definitions_["import_yolo"] = "from ultralytics import YOLO"
    Blockly.Python.definitions_["import_path"] = "from pathlib import Path"

    Blockly.Python.ds_variables_["_classNames"] = '_classNames = {0: "Personne" ,1: "Velo" ,2: "Voiture" ,3: "Moto" ,4: "Avion" ,5: "Bus" ,6: "Train" ,7: "Camion" ,8: "Bateau" ,9: "Feu tricolore" ,10: "Bouche d\'incendie" ,11: "Panneau de signalisation" ,12: "Panneau d\'arret" ,13: "Parking" ,14: "Banc" ,15: "Oiseau" ,16: "Chat" ,17: "Chien" ,18: "Cheval" ,19: "Mouton" ,20: "Vache" ,21: "Éléphant" ,22: "Ours" ,23: "Zebre" ,24: "Girafe" ,25: "Chapeau" ,26: "Sac à dos" ,27: "Parapluie" ,28: "Chaussure" ,29: "Lunettes" ,30: "Sac a main" ,31: "Cravate" ,32: "Valise" ,33: "Frisbee" ,34: "Skis" ,35: "Snowboard" ,36: "Ballon de sport" ,37: "Cerf-volant" ,38: "Bateau de baseball" ,39: "Gant de baseball" ,40: "Skateboard" ,41: "Planche de surf" ,42: "Raquette de tennis" ,43: "Bouteille" ,44: "Plat" ,45: "Verre a vin" ,46: "Tasse" ,47: "Fourchette" ,48: "Couteau" ,49: "Cuillere" ,50: "Bol" ,51: "Banane" ,52: "Pomme" ,53: "Sandwich" ,54: "Orange" ,55: "Brocoli" ,56: "Carotte" ,57: "Hot-dog" ,58: "Pizza" ,59: "Beignet" ,60: "Gateau" ,61: "Chair" ,62: "Canape" ,63: "Plante en pot" ,64: "Lit" ,65: "Miroir" ,66: "Table a manger" ,67: "Fenetre" ,68: "Bureau" ,69: "Toilettes" ,70: "Porte" ,71: "Écran de television" ,72: "Ordinateur portable" ,73: "Souris" ,74: "Telecommande" ,75: "Clavier" ,76: "Portable Telephone" ,77: "Micro-ondes" ,78: "Four" ,79: "Toast" ,80: "Evier" ,81: "Refrigerateur" ,82: "Mixeur" ,83: "Livre" ,84: "Horloge" ,85: "Vase" ,86: "Ciseaux" ,87: "Ours en peluche" ,88: "Seche-cheveux" ,89: "Brosse a dents" ,90: "Brosse a cheveux"}';
  
    var code = '';
    code += '# On charge le fichier du modèle pré-entrainé\n';
    code += 'MODEL_PATH = Path('+model_path+')\n';
    code += 'model = YOLO(str(MODEL_PATH))\n';
    //code += '_classNames = model.names\n';
    return code;
};

Blockly.Python['driss_yolo_lancer_une_prediction'] = function (block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var confiance = block.getFieldValue('CONFIANCE');
    var resultats = block.getFieldValue('VAR_RESULTATS');
    
    var code = resultats+' = model.predict(source='+var_image+', save=False, conf='+confiance+', verbose=True)[0]\n';
    return code;
  };

Blockly.Python['driss_yolo_afficher_classes_du_model'] = function (block) {

    return code;
};

Blockly.Python['driss_yolo_filtrer_par_classe_et_conf'] = function (block) {
    var resultats = block.getFieldValue('VAR_RESULTATS');
    var classe = block.getFieldValue('CLASSE');
    var confiance = block.getFieldValue('CONFIANCE');
    var code = ''

    //code += '# Filtrer les résultats de la prédiction en fonction de la classe et du taux de confiance\n';
    code += '[b for b in '+resultats+' if ( (int(b.boxes.cls[0]) == '+classe+') and (float(b.boxes.conf[0]) >= '+confiance+') )]\n';
    
    
    return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['driss_yolo_marquer_les_predictions'] = function (block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var color_HEX = block.getFieldValue('COLOR');
    var predictions = block.getFieldValue('VAR_PREDICTIONS');
    var confiance = block.getFieldValue('CONFIANCE');
    //var class_name = block.getFieldValue('CLASS_NAME');
   
    var color_RGB = hexToRGB(color_HEX);

    var code = '';
    code += 'for b in '+predictions+':\n';
    code += '  x1, y1, x2, y2 = b.boxes.xyxy[0].cpu().numpy().astype(int)\n';
    code += '  conf = float(b.boxes.conf[0])\n';
    code += '  if conf >= '+confiance+' :\n';
    code += '    label = f"{_classNames[int(b.boxes.cls[0])]} ({conf:.2f})"\n';
    code += '    cv2.rectangle('+var_image+', (x1, y1), (x2, y2), '+color_RGB+', 2)\n';
    code += '    cv2.putText('+var_image+', label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, '+color_RGB+', 2)\n';
    

    return code;
};

