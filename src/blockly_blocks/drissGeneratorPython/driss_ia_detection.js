var IA_modelsTypes = new Object();

function writeCommonCode(){
    

    Blockly.Python.functionNames_["debug"] = ""+
    "def debug(msg: str):\n"+
    "  print(f\"[DEBUG] {msg}\")";

    Blockly.Python.functionNames_["_cv_font_from_name"] = ''+
    'def _cv_font_from_name(name: str):\n'+
    '  # Mapping simple des polices OpenCV\n'+
    '  mapping = {\n'+
    '    "HERSHEY_SIMPLEX": cv2.FONT_HERSHEY_SIMPLEX,\n'+
    '    "HERSHEY_PLAIN": cv2.FONT_HERSHEY_PLAIN,\n'+
    '    "HERSHEY_DUPLEX": cv2.FONT_HERSHEY_DUPLEX,\n'+
    '    "HERSHEY_COMPLEX": cv2.FONT_HERSHEY_COMPLEX,\n'+
    '    "HERSHEY_TRIPLEX": cv2.FONT_HERSHEY_TRIPLEX,\n'+
    '    "HERSHEY_COMPLEX_SMALL": cv2.FONT_HERSHEY_COMPLEX_SMALL,\n'+
    '    "HERSHEY_SCRIPT_SIMPLEX": cv2.FONT_HERSHEY_SCRIPT_SIMPLEX,\n'+
    '    "HERSHEY_SCRIPT_COMPLEX": cv2.FONT_HERSHEY_SCRIPT_COMPLEX,\n'+
    '  }\n'+
    '  return mapping.get(name, cv2.FONT_HERSHEY_DUPLEX)\n';

    Blockly.Python.functionNames_["_draw_one_bbox"] = ''+
    'def _draw_one_bbox(img, det: dict, cfg: dict):\n'+
    '  x1, y1, x2, y2 = det["bbox"]\n'+
    '  conf = det["conf"]\n'+
    
    '  var_name = "label_" + det.get("cls_name")\n'+
    '  if var_name  in globals():\n'+
    '    box_color  = globals()[var_name]["color"]\n'+
    '    display_name = globals()[var_name]["displayLabel"].lower()\n'+
    '    anchor     = globals()[var_name]["anchor"]\n'+
    '  else:\n'+
    '    box_color  = tuple(cfg.get("box_color", (0, 255, 0))) \n'+
    '    display_name = det.get("cls_name") \n'+
    '    anchor     = str(cfg.get("label_anchor", "tl")).lower() \n'+
    
    '  text_color = tuple(cfg.get("text_color", (255, 255, 255)))\n'+
    '  font_scale = float(cfg.get("font_scale", 0.7))\n'+
    '  thickness  = int(cfg.get("thickness", 2))\n'+
    '  show_lbl   = bool(cfg.get("show_labels", True))\n'+
    '  font       = _cv_font_from_name(cfg.get("font_name", "HERSHEY_SIMPLEX"))\n'+
    '  pad = 3\n'+
    '  # Dessin de la bbox\n'+
    '  cv2.rectangle(img, (x1, y1), (x2, y2), box_color, thickness)\n'+
    '  if not show_lbl:\n'+
    '    return\n'+
    '  # Texte (une seule ligne)\n'+
    '  line = f"{display_name} {conf:.2f}".strip()\n'+
    '  # Mesures du texte\n'+
    '  (text_w, text_h), baseline = cv2.getTextSize(line, font, font_scale, thickness)\n'+
    '  block_w = text_w + 2 * pad\n'+
    '  block_h = text_h + 2 * pad\n'+
    '  H, W = img.shape[:2]\n'+
    '  # Position du coin supérieur gauche du bloc selon l’ancrage\n'+
    '  if anchor == "br":\n'+
    '    left, top = x2 - block_w, y2 - block_h\n'+
    '  elif anchor == "tr":\n'+
    '    left, top = x2 - block_w,  y1\n'+
    '  elif anchor == "bl":\n'+
    '    left, top = x1, y2 - block_h\n'+
    '  else:\n'+
    '    left, top = x1, y1\n'+
    '  # Clamp dans l\'image\n'+
    '  left, top = max(0, min(left, W - block_w)), max(0, min(top,  H - block_h))\n'+
    '  # Fond + textes\n'+
    '  cv2.rectangle(img, (left, top), (left + block_w, top + block_h), box_color, -1)\n'+
    '  text_x, text_y = left + pad, top + pad + text_h \n'+
    '  cv2.putText(img, line, (text_x, text_y), font, font_scale, text_color, thickness, cv2.LINE_AA)\n'+
    '  \n';

    Blockly.Python.functionNames_["draw_bboxes"] = ''+
    'def draw_bboxes(img_bgr, detections,confiance, cfg):\n'+
    '  for det in detections:\n'+
    '    if det["conf"] >= confiance:\n'+
    '      _draw_one_bbox(img_bgr, det, cfg)\n'+
    '  return 1\n';

    Blockly.Python.functionNames_["_draw_badge_counts"] = ''+
    'def _draw_badge_counts(img_bgr, datas, cfg_badge):\n'+
    '  # Construction des lignes de texte\n'+
    '  lines = []\n'+
    '  for d in datas:\n'+
    '    cls = d["class"]\n'+
    '    n = d["nbreDetection"]\n'+
    '    lines.append(f"{cls.capitalize()} : {n}")\n'+
    '  # Déterminer la couleur (vert si tous les n sont égaux, rouge sinon)\n'+
    '  counts = [d["nbreDetection"] for d in datas if d["nbreDetection"] is not None]\n'+
    '  ok_color = (0, 180, 0) if len(set(counts)) == 1 else (0, 0, 220)\n'+
    '  # Dessin du badge\n'+
    '  _draw_badge_multiline(img_bgr, lines, ok_color, cfg_badge)\n'+
    '  return 1\n';

    Blockly.Python.functionNames_["_draw_badge_time"] = ''+
    'def _draw_badge_time(img_bgr: np.ndarray, ms: float, cfg_badge: Dict):\n'+
    '  text = f"Temps inference : {ms:.1f} ms"\n'+
    '  _draw_badge_multiline(img_bgr, [text], cfg_badge["bg_color"], cfg_badge)\n'+
    '  return 1\n';

    Blockly.Python.functionNames_["_draw_badge_multiline"] = ''+
    'def _draw_badge_multiline(img_bgr,lines,bg_color,cfg_badge):\n'+
    '  font = _cv_font_from_name(cfg_badge["font_name"])\n'+
    '  fs = cfg_badge["font_scale"]\n'+
    '  th = cfg_badge["thickness"]\n'+
    '  pad = cfg_badge["padding"]\n'+
    '  gap = cfg_badge["line_gap"]\n'+
    '  margin = cfg_badge["margin"]\n'+
    '  text_color = cfg_badge["text_color"]\n'+
    '  corner = cfg_badge["badge_anchor"]\n'+
    '  # Calculer la boîte englobante du badge\n'+
    '  widths = []\n'+
    '  heights = []\n'+
    '  for line in lines:\n'+
    '    (tw, th_text), base = cv2.getTextSize(line, font, fs, th)\n'+
    '    widths.append(tw)\n'+
    '    heights.append(th_text + base)\n'+
    '  W = max(widths)\n'+
    '  H = sum(heights) + gap * (len(lines)-1)\n'+
    '  total_w = W + 2*pad\n'+
    '  total_h = H + 2*pad\n'+
    '  h, w = img_bgr.shape[:2]\n'+
    '  if corner == "tl":\n'+
    '    x1, y1 = margin, margin\n'+
    '  elif corner == "tr":\n'+
    '    x1, y1 = w - total_w - margin, margin\n'+
    '  elif corner == "bl":\n'+
    '    x1, y1 = margin, h - total_h - margin\n'+
    '  else:\n'+
    '    x1, y1 = w - total_w - margin, h - total_h - margin\n'+
    '  x2, y2 = x1 + total_w, y1 + total_h\n'+
    '  # Fond semi-opaque\n'+
    '  overlay = img_bgr.copy()\n'+
    '  cv2.rectangle(overlay, (x1, y1), (x2, y2), bg_color, thickness=-1)\n'+
    '  cv2.addWeighted(overlay, 0.65, img_bgr, 0.35, 0, dst=img_bgr)\n'+
    '  # Texte ligne par ligne\n'+
    '  cur_y = y1 + pad\n'+
    '  for line in lines:\n'+
    '    (tw, th_text), base = cv2.getTextSize(line, font, fs, th)\n'+
    '    cv2.putText(img_bgr, line, (x1 + pad, cur_y + th_text), font, fs, text_color, th, lineType=cv2.LINE_AA)\n'+
    '    cur_y += th_text + base + gap\n'+
    '  return img_bgr\n';

    // Blockly.Python.functionNames_["showResult"] = ''+
    // 'def showResult(img_bgr, window_name):\n'+
    // '  img_show = img_bgr.copy()\n'+
    // '  try:\n'+
    // '    cv2.imshow(window_name, img_show)\n'+
    // '    cv2.waitKey(0)\n'+
    // '    cv2.destroyAllWindows()\n'+
    // '  except Exception as e:\n'+
    // '    debug(f"Affichage fenêtré indisponible ({e}). Image non montrée à l\'écran.")\n';
}


function declarerDefinitionsRetinaNet(){
    Blockly.Python.definitions_["import_Path"] = "from pathlib import Path";
    Blockly.Python.definitions_["import_time"] = "import time";
    Blockly.Python.definitions_["import_cv2"] = "import cv2";
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np";
    Blockly.Python.definitions_["import_torch"] = "import torch";
    Blockly.Python.definitions_["import_os"] = "import os";
    //Blockly.Python.definitions_["import_torchvision"] = "import torchvision";
    Blockly.Python.definitions_["import_List_Dict_Tuple"] = "from typing import List, Dict, Tuple";
}
function declarerDefinitionsYolo(){
    Blockly.Python.definitions_["import_Path"] = "from pathlib import Path";
    Blockly.Python.definitions_["import_time"] = "import time";
    Blockly.Python.definitions_["import_YOLO"] = "from ultralytics import YOLO";
    Blockly.Python.definitions_["import_cv2"] = "import cv2";
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np";
    Blockly.Python.definitions_["import_os"] = "import os";
    Blockly.Python.definitions_["import_List_Dict_Tuple"] = "from typing import List, Dict, Tuple";
}

function declarerDefinitionsFaster_RCNN(){
    Blockly.Python.definitions_["import_Path"] = "from pathlib import Path";
    Blockly.Python.definitions_["import_time"] = "import time";
    Blockly.Python.definitions_["import_cv2"] = "import cv2";
    Blockly.Python.definitions_["import_numpy"] = "import numpy as np";
    Blockly.Python.definitions_["import_torch"] = "import torch";
    Blockly.Python.definitions_["import_os"] = "import os";
    //Blockly.Python.definitions_["import_torchvision"] = "import torchvision";
    Blockly.Python.definitions_["import_torchvision_FasterRCNN_ResNet50_FPN_Weights"] = "from torchvision.models.detection import FasterRCNN_ResNet50_FPN_Weights";
    Blockly.Python.definitions_["import_torchvision_transforms"] = "from torchvision import transforms as T";
    Blockly.Python.definitions_["import_List_Dict_Tuple"] = "from typing import List, Dict, Tuple";
}


Blockly.Python['driss_ia_detection_charger_modele_yolo11_coco'] = function (block) {
    var modelName = block.getFieldValue('MODEL_NAME');

    IA_modelsTypes[modelName] = "YOLO11N_BASE" ;
    //console.log(IA_modelsTypes);
    writeCommonCode();
    declarerDefinitionsYolo();

    Blockly.Python.ds_variables_[modelName] = modelName + ' = None';
    
    var code = '';
    code += modelName + ' = YOLO("../driss_IA_Models/yolo11n.pt")\n' ;
    code += modelName + '.model_name = Path("../driss_IA_Models/yolo11n.pt").stem\n' ;
    return code;
}




Blockly.Python['driss_ia_detection_charger_modele_retinanet_coco'] = function (block) {
    var modelName = block.getFieldValue('MODEL_NAME');
    
    IA_modelsTypes[modelName] = "RETINANET_PYTORCH_BASE" ;

    writeCommonCode();
    declarerDefinitionsRetinaNet();


    Blockly.Python.ds_variables_["device"] = "device = 'cuda' if torch.cuda.is_available() else 'cpu'";

    Blockly.Python.functionNames_["load_retinanet"] = "# Charger le model IA RetinaNet \n" +
        "def load_retinanet() :\n" +
        "  try:\n" +
        "    from torchvision.models.detection import retinanet_resnet50_fpn_v2, RetinaNet_ResNet50_FPN_V2_Weights\n" +
        "    weights = RetinaNet_ResNet50_FPN_V2_Weights.DEFAULT\n" +
        "    model = retinanet_resnet50_fpn_v2(weights=weights).to(device).eval()\n" +
        "    categories = weights.meta.get(\"categories\", None)\n" +
        "  except Exception:\n" +
        "    from torchvision.models.detection import retinanet_resnet50_fpn, RetinaNet_ResNet50_FPN_Weights\n" +
        "    weights = RetinaNet_ResNet50_FPN_Weights.DEFAULT\n" +
        "    model = retinanet_resnet50_fpn(weights=weights).to(device).eval()\n" +
        "    categories = weights.meta.get(\"categories\", None)\n" +
        "  debug(f\"Modèle retinaNet chargé \")\n" +
        "  \n"+
        "  return model, categories\n";

    Blockly.Python.ds_variables_[modelName] = modelName + ' = None';
    
    var code = '';
    
    code += 'torch_cache_dir = "./driss_IA_Models/torch_cache"\n';
    code += 'os.environ["TORCH_HOME"] = str(torch_cache_dir)\n';
    code += 'torch.hub.set_dir(str(torch_cache_dir))\n';
    code += 'print(f"[DEBUG] TORCH_HOME configuré sur : {torch_cache_dir}")\n';
    code += 'import torchvision\n';
    code += 'print("TORCH_HOME =", os.environ.get("TORCH_HOME"))\n';
    code += 'print("torch.hub dir =", torch.hub.get_dir())\n';
    
    code += modelName + ', '+modelName+'.categories = load_retinanet()\n' ;
    code += modelName + '.model_name = "RetinaNet"\n' ;
    
    return code;
}




Blockly.Python['driss_ia_detection_charger_modele_faster_r_cnn'] = function (block) {
    var modelName = block.getFieldValue('MODEL_NAME');
    
    IA_modelsTypes[modelName] = "FASTER_R_CNN" ;

    writeCommonCode();
    declarerDefinitionsFaster_RCNN();


    Blockly.Python.ds_variables_["device"] = "device = 'cuda' if torch.cuda.is_available() else 'cpu'";

    Blockly.Python.functionNames_["load_faster_r_cnn"] = '# Charger le model IA Faster R-CNN \n' +
        'def load_faster_r_cnn() :\n' +
        '  weights = FasterRCNN_ResNet50_FPN_Weights.DEFAULT\n' +
        '  model = torchvision.models.detection.fasterrcnn_resnet50_fpn(weights=weights).to(device).eval()\n' +
       
        '  model = model.to(device).eval()\n'+
        '  categories = weights.meta["categories"]  # liste des classes COCO\n'+
        '  debug("Modèle Faster R-CNN pré-entraîné COCO chargé.")\n'+
        '  debug(f"Nombre de catégories COCO : {len(categories)}")\n'+
        '  return model, categories\n';

    Blockly.Python.ds_variables_[modelName] = modelName + ' = None';
    
    var code = '';
    code += 'torch_cache_dir = "./driss_IA_Models/torch_cache"\n';
    code += 'os.environ["TORCH_HOME"] = str(torch_cache_dir)\n';
    code += 'torch.hub.set_dir(str(torch_cache_dir))\n';
    code += 'print(f"[DEBUG] TORCH_HOME configuré sur : {torch_cache_dir}")\n';
    code += 'import torchvision\n';
    code += 'print("TORCH_HOME =", os.environ.get("TORCH_HOME"))\n';
    code += 'print("torch.hub dir =", torch.hub.get_dir())\n';

    code += modelName + ', '+modelName+'.categories = load_faster_r_cnn()\n' ;
    code += modelName + '.model_name = "Faster R-CNN"\n' ;
    
    return code;
}


Blockly.Python['driss_ia_detection_charger_modele_peaufine'] = function (block) {
    var modelName = block.getFieldValue('MODEL_NAME');
    var modelType = block.getFieldValue('MODEL_TYPE');
    var model_path = Blockly.Python.valueToCode(block, 'MODEL_PATH', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.ds_variables_["device"] = "device = 'cuda' if torch.cuda.is_available() else 'cpu'";

    writeCommonCode();
    
    Blockly.Python.ds_variables_[modelName] = modelName+ ' = None';

    


    function declareFunctionDLoadRetinaNet_Finetuned(){
    Blockly.Python.functionNames_["load_retinanet_finetuned"] = "# Charger le model IA RetinaNet Fine-Tuned\n" +
        "def load_retinanet_finetuned(model_path) :\n" +
        "  try:\n" +
        "    from torchvision.models.detection import retinanet_resnet50_fpn_v2, RetinaNet_ResNet50_FPN_V2_Weights\n" +
        "    weights = RetinaNet_ResNet50_FPN_V2_Weights.DEFAULT\n" +
        "    model = retinanet_resnet50_fpn_v2(weights=weights).to(device).eval()\n" +
        "    categories = weights.meta.get(\"categories\", None)\n" +
        "  except Exception:\n" +
        "    from torchvision.models.detection import retinanet_resnet50_fpn, RetinaNet_ResNet50_FPN_Weights\n" +
        "    weights = RetinaNet_ResNet50_FPN_Weights.DEFA\n" +
        "    model = retinanet_resnet50_fpn(weights=weights).to(device).eval()\n" +
        "    categories = weights.meta.get(\"categories\", None)\n" +
        "    \n" +
        "    \n" +
        "  in_channels = model.backbone.out_channels\n" +
        "  num_anchors = model.head.classification_head.num_anchors\n" +
        "  model.head.classification_head = torchvision.models.detection.retinanet.RetinaNetClassificationHead(in_channels=in_channels, num_anchors=num_anchors, num_classes=1)\n" +
        "  p = Path(model_path)\n" +
        "  if not p.exists():\n" +
        "    raise FileNotFoundError(f\"Modèle fine-tuné introuvable : {p.resolve()}\")\n" +
        "  state = torch.load(p, map_location=device)\n" +
        "  model.load_state_dict(state, strict=True)\n" +
        "  model.to(device).eval()\n" +
        "  debug(f\"Modèle peaufiné chargé depuis {p}\")\n" +
        "  \n"+
        "  return model, categories\n";
    }


    function declareFunctionDLoadFasterRCNN_Finetuned(){
    Blockly.Python.functionNames_["load_FasterRCNN_finetuned"] = '# Charger le model IA Faster R-CNN Fine-Tuned\n' +
        'def load_FasterRCNN_finetuned(model_path) :\n' +
        '  weights = FasterRCNN_ResNet50_FPN_Weights.DEFAULT\n' +
        '  model = torchvision.models.detection.fasterrcnn_resnet50_fpn(weights=weights)\n' +
        '  in_features = model.roi_heads.box_predictor.cls_score.in_features\n' +
        '  model.roi_heads.box_predictor = torchvision.models.detection.faster_rcnn.FastRCNNPredictor(in_features, 2)\n' +
        
        '  state = torch.load(model_path, map_location=device)\n' +
        '  model.load_state_dict(state, strict=True)\n' +
        '  model.to(device).eval()\n' +
        '  debug(f"Modèle Faster R-CNN (helmet) chargé depuis {model_path}")\n' +
        
        '  return model\n' ;
    }


    var code = '';

    declarerDefinitionsYolo();
    declarerDefinitionsRetinaNet();

    switch(modelType){
        case "YOLO11N": IA_modelsTypes[modelName] = "YOLO11N_FINETUNED" ;
        
        Blockly.Python.ds_variables_[modelName] = modelName + ' = None';
        code += modelName + ' = YOLO('+model_path+')\n' ;
        code += modelName + '.model_name = Path('+model_path+').stem\n' ;
        break;

        

        case "RETINA_NET": IA_modelsTypes[modelName] = "RETINA_NET_FINETUNED" ;
        declareFunctionDLoadRetinaNet_Finetuned();
        Blockly.Python.ds_variables_["device"] = "device = 'cuda' if torch.cuda.is_available() else 'cpu'";
        Blockly.Python.ds_variables_[modelName] = modelName+ ' = None';

        code += 'torch_cache_dir = "./driss_IA_Models/torch_cache"\n';
        code += 'os.environ["TORCH_HOME"] = str(torch_cache_dir)\n';
        code += 'torch.hub.set_dir(str(torch_cache_dir))\n';
        code += 'print(f"[DEBUG] TORCH_HOME configuré sur : {torch_cache_dir}")\n';
        code += 'import torchvision\n';
        code += 'print("TORCH_HOME =", os.environ.get("TORCH_HOME"))\n';
        code += 'print("torch.hub dir =", torch.hub.get_dir())\n';

        code += modelName + ', '+modelName+'.categories = load_retinanet_finetuned('+model_path+')\n' ;
        code += modelName + '.model_name = Path('+model_path+').stem\n' ;
        break;

        case "FASTER_R_CNN": IA_modelsTypes[modelName] = "FASTER_R_CNN_FINETUNED" ;
        declarerDefinitionsFaster_RCNN();
        declareFunctionDLoadFasterRCNN_Finetuned();
        Blockly.Python.ds_variables_["device"] = "device = 'cuda' if torch.cuda.is_available() else 'cpu'";
        Blockly.Python.ds_variables_[modelName] = modelName+ ' = None';

        code += 'torch_cache_dir = "./driss_IA_Models/torch_cache"\n';
        code += 'os.environ["TORCH_HOME"] = str(torch_cache_dir)\n';
        code += 'torch.hub.set_dir(str(torch_cache_dir))\n';
        code += 'print(f"[DEBUG] TORCH_HOME configuré sur : {torch_cache_dir}")\n';
        code += 'import torchvision\n';
        code += 'print("TORCH_HOME =", os.environ.get("TORCH_HOME"))\n';
        code += 'print("torch.hub dir =", torch.hub.get_dir())\n';

        code += modelName + ' = load_FasterRCNN_finetuned('+model_path+')\n' ;
        code += modelName + '.model_name = Path('+model_path+').stem\n' ;
        break;
    }

    code += '\n';
    
    return code;
}





// Blockly.Python['driss_ia_detection_charger_modele_ia'] = function (block) {
//     var modelName = block.getFieldValue('MODEL_NAME');
//     var modelType = block.getFieldValue('MODEL_TYPE');
//     var model_path = Blockly.Python.valueToCode(block, 'MODEL_PATH', Blockly.Python.ORDER_ATOMIC);
    
//     writeCommonCode();

//     function write_function_load_retinanet(){
//         code_fonction = "" +
//         "# Charger le model IA RetinaNet \n" +
//         "def load_retinanet() :\n" +
//         "  try:\n" +
//         "    from torchvision.models.detection import retinanet_resnet50_fpn_v2\n" +
//         "    weights = RetinaNet_ResNet50_FPN_V2_Weights.DEFAULT\n" +
//         "    model = retinanet_resnet50_fpn_v2(weights=weights).to(device).eval()\n" +
//         "    categories = weights.meta.get(\"categories\", None)\n" +
//         "  except Exception:\n" +
//         "    from torchvision.models.detection import retinanet_resnet50_fpn, RetinaNet_ResNet50_FPN_Weights\n" +
//         "    weights = RetinaNet_ResNet50_FPN_Weights.DEFA\n" +
//         "    model = retinanet_resnet50_fpn(weights=weights).to(device).eval()\n" +
//         "    categories = weights.meta.get(\"categories\", None)\n" +
//         "    \n" +
//         "  if categories is None:\n" +
//         "    raise RuntimeError('Impossible de récupérer les catégories COCO depuis les poids.')\n" +
//         "  debug(f'RetinaNet de base (COCO) chargé.')\n" +
//         "    \n" ;
//         if(modelType == "RETINA_NET_FINE_TUNED"){
//         code_fonction += ""+
//         "  in_channels = model.backbone.out_channels\n" +
//         "  num_anchors = model.head.classification_head.num_anchors\n" +
//         "  model.head.classification_head = torchvision.models.detection.retinanet.RetinaNetClassificationHead(in_channels=in_channels, num_anchors=num_anchors, num_classes=1)\n" +
//         "  p = Path("+model_path+")\n" +
//         "  if not p.exists():\n" +
//         "    raise FileNotFoundError(f\"Modèle fine-tuné introuvable : {p.resolve()}\")\n" +
//         "  state = torch.load(p, map_location=device)\n" +
//         "  model.load_state_dict(state, strict=True)\n" +
//         "  model.to(device).eval()\n" +
//         "  debug(f\"Modèle peaufiné chargé depuis {p}\")\n" +
//         "  \n"
//         }
//         code_fonction += ""+
//         "  return model, categories\n";

//         Blockly.Python.functionNames_["load_retinanet"] = code_fonction;
//     }
   
//     var code = '';
    
//     switch(modelType){
//         case "YOLO11_BASE":
//         case "YOLO11_FINE_TUNED": 
//         Blockly.Python.ds_variables_[modelName] = modelName + ' = None';
//         code += modelName + ' = YOLO('+model_path+')\n' ;
//         break;

//         case "RETINA_NET_BASE": 
//         Blockly.Python.ds_variables_[modelName] = modelName+ ' = None';
//         Blockly.Python.ds_variables_[modelName+'_Cat'] = modelName+ '_Cat = None';
//         write_function_load_retinanet();
//         code += modelName + ', '+modelName+ '_Cat = load_retinanet();\n' ; 
//         break;

//         case "RETINA_NET_FINE_TUNED": 
//         Blockly.Python.ds_variables_[modelName] = modelName+ ' = None';
//         write_function_load_retinanet();
//         code += modelName + ', _ = load_retinanet();\n' ;
//         break;

//         case "SSD": 
//         break;
//     }
    
  
    
    
//     code += '\n';
//     code += '\n';
//     code += '\n';
    
//     return code;
// };


// Blockly.Python['driss_ia_detection_detecter_classe'] = function (block) {
//     var modelName = block.getFieldValue('MODEL_NAME');
//     var var_image = block.getFieldValue('VAR_IMAGE');
//     // var color_HEX = block.getFieldValue('COLOR');
//     var confiance = block.getFieldValue('CONFIANCE');
//     var classToDetect = block.getFieldValue('CLASS_TO_DETECT');
   
//     //var color_RGB = hexToRGB(color_HEX);

//     function declareFunctionDetectClassByYolo(){
//     Blockly.Python.functionNames_["detectClassByYolo"] = "# Detection d'une classe par Yolo\n" +
//         "def detectClassByYolo(image_path, model, confiance) :\n" +
//         "  # Trouver l\'ID de la classe  dans le modèle\n" +
//         "  classId = [k for k, v in model.names.items() if v == '"+classToDetect+"']\n" +
//         "  if not classId:\n"+
//         "    raise ValueError('La classe "+classToDetect+" n\'existe pas dans ce modèle.')\n" +
//         "  classId = classId[0]\n" +
//         "  t = time.time()\n"+
//         "  r = model.predict(source=image_path, conf=confiance, save=False, verbose=False, classes=[classId])[0]\n" +
//         "  dt_ms = (time.time() - t) * 1000.0\n" +
//         "  detections = []\n"+
//         "  for box, cf in zip(r.boxes.xyxy, r.boxes.conf):\n" +
//         "    x1, y1, x2, y2 = [int(v) for v in box.tolist()]\n" +
//         "    detections.append({\"bbox\": (x1, y1, x2, y2), \"conf\": float(cf.item()), \"cls_name\": "+classToDetect+"})\n"+
//         "  return detections, dt_ms\n";
//     }

//     function declareFunctionDetectClassByRetinaNet(){
//     Blockly.Python.functionNames_["detectClassByRetinaNet"] = "# Detection d'une classe par RetinaNet\n" +
//         "def detectClassByRetinaNet(image_path, model, confiance) :\n" +
//         "  img_rgb = cv2.cvtColor(image_path, cv2.COLOR_BGR2RGB)\n" +
//         "  img_t = torchvision.transforms.functional.to_tensor(img_rgb).to(device)\n" +
//         "  t = time.time()\n" +
//         "  out = model([img_t])"
//         "  dt_ms = (time.time() - t) * 1000.0\n" +
//         "  out = [{k: v.to(\"cpu\") for k, v in o.items()} for o in out][0]\n"+
//         "  boxes_all = out.get(\"boxes\", torch.zeros((0, 4))).tolist()\n" +
//         "  scores_all = out.get(\"scores\", torch.zeros((0,))).tolist()\n" +
//         "  detections = []\n"+
//         "  for b, cf in zip(boxes_all, scores_all):\n" +
//         "    if cf >= confiance:\n" +
//         "      x1, y1, x2, y2 = map(int, b)\n"+
//         "      detections.append({\"bbox\": (x1, y1, x2, y2), \"conf\": float(cf), \"cls_name\": "+classToDetect+"})\n"+
//         "  nbreDetections = len([det for det in detections if det[\"conf\"] >= confiance]) if len(detections) > 0 else 0\n"+
//         "  debug(f\"["+classToDetect+"] {nbreDetections} bbox >= {confiance} | temps = {dt_ms:.1f} ms\")\n"+
       
//         "  return detections, dt_ms\n";
//     }

//     var code = '';
//     switch(IA_modelsTypes[modelName]){
//         case "YOLO11N_BASE": 
//         case "YOLO11N_FINETUNED":
//             declareFunctionDetectClassByYolo();
//             code += 'detections_'+modelName+', dt_ms_'+modelName+' = detectClassByYolo('+var_image+', '+modelName+', '+confiance+')\n' ;
//             break ;
        
//         case "RETINA_NET": 
//         case "RETINA_NET_FINETUNED":
//             declareFunctionDetectClassByRetinaNet();
//             code += 'detections_'+modelName+', dt_ms_'+modelName+' = detectClassByRetinaNet('+var_image+', '+modelName+', '+confiance+')\n' ;
//             break ;
//     }

//     return code;
// };


Blockly.Python['driss_ia_detection_get_predictions_of_class'] = function (block) {
    var modelName = block.getFieldValue('MODEL_NAME');
    var var_image = block.getFieldValue('VAR_IMAGE');
    // var color_HEX = block.getFieldValue('COLOR');
    var confiance = block.getFieldValue('CONFIANCE');
    var classNamesToDetect = block.getFieldValue('CLASS_TO_DETECT');
    
   
    //var color_RGB = hexToRGB(color_HEX);

    function declareFunctionDetectClassByYolo(){
    Blockly.Python.functionNames_["detectClassByYolo"] = '# Detection d\'une classe par Yolo\n' +
        'def detectOneClassByYolo(image_path, model, classNamesToDetect, confiance) :\n' +
        '  classList = classNamesToDetect.split(",")\n'+
        '  \n'+
        
        '  t = time.time()\n'+
        '  detections = []\n'+
        
        '  for className in classList :\n' +
        '    className = className.strip()\n'+
        '    if(className == ""): \n' +
        '      continue\n' +
        '    \n' +
        '    # Trouver l\'ID de la classe  dans le modèle\n' +
        '    classId = [k for k, v in model.names.items() if v == className]\n' +
        '    if not classId:\n'+
        '     return\n'+
        '      #raise ValueError(f"la classe : {className} n\'existe pas dans ce modèle.")\n' +
        '    classId = classId[0]\n' +
        
        '    r = model.predict(source=image_path, conf=confiance, save=False, verbose=False, classes=[classId])[0]\n' +
    
        
        '    for box, cf in zip(r.boxes.xyxy, r.boxes.conf):\n' +
        '      x1, y1, x2, y2 = [int(v) for v in box.tolist()]\n' +
        '      detections.append({"bbox": (x1, y1, x2, y2), "conf": float(cf.item()), "cls_name": className})\n'+

        '  dt_ms = (time.time() - t) * 1000.0\n' +
        '  return detections, dt_ms, model.model_name\n';
    }

    function declareFunctionDetectClassByRetinaNet(){
    Blockly.Python.functionNames_["detectClassByRetinaNet"] = '# Detection d\'une classe par RetinaNet\n' +
        'def detectOneClassByRetinaNet(image_path, model, classNamesToDetect, confiance) :\n' +
        '  classList = classNamesToDetect.split(",")\n'+

        '  t = time.time()\n'+
        '  detections = []\n'+

        '  for className in classList :\n' +
        '    className = className.strip()\n'+
        '    if(className == ""): \n' +
        '      continue\n' +
        '    \n' +

        '    if model.categories is None:\n' +
        '      raise RuntimeError("Impossible de récupérer les catégories COCO depuis les poids.")\n' +
        '    try:\n' +
        '      idx = model.categories.index(className)\n' +
        '    except ValueError:\n' +
        '      return\n'+
        '      #raise RuntimeError(f"la classe : {className} n\'existe pas dans ce modèle.")\n' +
        
        '    img_rgb = cv2.cvtColor(image_path, cv2.COLOR_BGR2RGB)\n' +
        '    img_t = torchvision.transforms.functional.to_tensor(img_rgb).to(device)\n' +
        
        '    out = model([img_t])\n' +
        
        '    out = [{k: v.to(\"cpu\") for k, v in o.items()} for o in out][0]\n'+
        '    boxes_all = out.get(\"boxes\", torch.zeros((0, 4))).tolist()\n' +
        '    labels_all = out.get("labels", torch.zeros((0,), dtype=torch.int64)).tolist()\n' +
        '    scores_all = out.get(\"scores\", torch.zeros((0,))).tolist()\n' +
        
        '    for b, lab, cf in zip(boxes_all, labels_all, scores_all):\n' +
        '      if int(lab) == int(idx) and cf >= confiance:\n' +
        '        x1, y1, x2, y2 = map(int, b)\n'+
        '        detections.append({"bbox": (x1, y1, x2, y2), "conf": float(cf), "cls_name": className})\n'+
        '  dt_ms = (time.time() - t) * 1000.0\n' +
        '  return detections, dt_ms, model.model_name\n';
    }


    function declareFunctionDetectClassByFasterRCNN(){
    Blockly.Python.functionNames_["detectClassByFasterRCNN"] = '# Detection d\'une classe par FAster R-CNN\n' +
        'def detectClassByFasterRCNN(image_path, model, classNamesToDetect, confiance) :\n' +
        '  classList = classNamesToDetect.split(",")\n'+

        '  t = time.time()\n'+
        '  detections = []\n'+

        '  for className in classList :\n' +
        '    className = className.strip()\n'+
        '    if(className == ""): \n' +
        '      continue\n' +
        '    \n' +

        '    if model.categories is None:\n' +
        '      raise RuntimeError("Impossible de récupérer les catégories COCO depuis les poids.")\n' +
        '    try:\n' +
        '      idx = model.categories.index(className)\n' +
        '    except ValueError:\n' +
        '      return\n'+
        '      #raise RuntimeError(f"la classe : {className} n\'existe pas dans ce modèle.")\n' +
        '    \n' +
        '    img_rgb = cv2.cvtColor(image_path, cv2.COLOR_BGR2RGB)\n'+
        '    img_t = T.ToTensor()(img_rgb).to(device)\n' +
        '    t = time.time()\n'+
        '    out = model([img_t])[0]\n'+
        '    dt_ms = (time.time() - t) * 1000.0\n' +
        '    boxes = out["boxes"].cpu().tolist()\n' +
        '    labels = out["labels"].cpu().tolist()\n'+
        '    scores = out["scores"].cpu().tolist()\n' +
        
        '    for b, lab, sc in zip(boxes, labels, scores):\n' +
        '      if sc >= confiance and lab == idx:  # class 1 (COCO) = person\n'+
        '        x1, y1, x2, y2 = map(int, b)\n' +
        '        detections.append({"bbox": (x1, y1, x2, y2), "conf": float(sc), "cls_name": className})\n'+
        '  return detections, dt_ms, model.model_name\n';
    }

    function declareFunctionDetectClassByRetinaNet_Finetuned(){
    Blockly.Python.functionNames_["detectClassByRetinaNetFinetuned"] = '# Detection d\'une classe par RetinaNet\n' +
        'def detectClassByRetinaNetFinetuned(image_path, model, classNamesToDetect, confiance) :\n' +
        '  model.categories = [c.strip() for c in classNamesToDetect.split(",")]\n' +
        '  detections, dt_ms, model.model_name = detectOneClassByRetinaNet(image_path, model, classNamesToDetect, confiance)\n' +
        '  return detections, dt_ms, model.model_name\n';
    }


    function declareFunctionDetectClassByFasterRCNN_Finetuned(){
    Blockly.Python.functionNames_["detectClassByFasterRCNN_Finetuned"] = '# Detection d\'une classe par FAster R-CNN\n' +
        'def detectClassByFasterRCNN_Finetuned(image_path, model, classNamesToDetect, confiance) :\n' +
        '  model.categories = ["__background__"] + [c.strip() for c in classNamesToDetect.split(",")]\n' +
        '  classList = classNamesToDetect.split(",")\n'+

        '  t = time.time()\n'+
        '  detections = []\n'+

        '  for className in classList :\n' +
        '    className = className.strip()\n'+
        '    if(className == ""): \n' +
        '      continue\n' +
        '    \n' +

        '    if model.categories is None:\n' +
        '      raise RuntimeError("Impossible de récupérer les catégories COCO depuis les poids.")\n' +
        '    try:\n' +
        '      idx = model.categories.index(className)\n' +
        '    except ValueError:\n' +
        '      return\n'+
        '      #raise RuntimeError(f"la classe : {className} n\'existe pas dans ce modèle.")\n' +
        '    \n' +
        '    img_rgb = cv2.cvtColor(image_path, cv2.COLOR_BGR2RGB)\n'+
        '    img_t = T.ToTensor()(img_rgb).to(device)\n' +
        '    t = time.time()\n'+
        '    out = model([img_t])[0]\n'+
        '    dt_ms = (time.time() - t) * 1000.0\n' +
        '    boxes = out["boxes"].cpu().tolist()\n' +
        '    labels = out["labels"].cpu().tolist()\n'+
        '    scores = out["scores"].cpu().tolist()\n' +
        '    for b, lab, sc in zip(boxes, labels, scores):\n' +
        '      if sc >= confiance and lab == idx:  # class 1 (COCO) = person\n'+
        '        x1, y1, x2, y2 = map(int, b)\n' +
        '        detections.append({"bbox": (x1, y1, x2, y2), "conf": float(sc), "cls_name": className})\n'+
        '  return detections, dt_ms, model.model_name\n';
    }
    
    // console.log(modelName);
    // console.log(IA_modelsTypes[modelName]);
    var code = '';
    switch(IA_modelsTypes[modelName]){
        case "YOLO11N_BASE": 
        case "YOLO11N_FINETUNED":
            declareFunctionDetectClassByYolo();
            // classNamesToDetect = classToDetect.split(",");
            // console.log(classToDetect);
            //console.log(classNamesToDetect);
            code += 'detectOneClassByYolo('+var_image+', '+modelName+', "'+classNamesToDetect+'", 0.1)\n' ;
            break ;
        
        case "RETINANET_PYTORCH_BASE": 
            declareFunctionDetectClassByRetinaNet();
            code += 'detectOneClassByRetinaNet('+var_image+', '+modelName+', "'+classNamesToDetect+'", 0.1)\n' ;
            break ;
        case "RETINA_NET_FINETUNED":
            declareFunctionDetectClassByRetinaNet();
            declareFunctionDetectClassByRetinaNet_Finetuned();
            code += 'detectClassByRetinaNetFinetuned('+var_image+', '+modelName+', "'+classNamesToDetect+'", 0.1)\n' ;
            break ;

        case "FASTER_R_CNN": 
            declareFunctionDetectClassByFasterRCNN();
            code += 'detectClassByFasterRCNN('+var_image+', '+modelName+', "'+classNamesToDetect+'", 0.1)\n' ;
            break ;

        case "FASTER_R_CNN_FINETUNED": 
            declareFunctionDetectClassByFasterRCNN_Finetuned();
            code += 'detectClassByFasterRCNN_Finetuned('+var_image+', '+modelName+', "'+classNamesToDetect+'", 0.1)\n' ;
            break ;
    }

    return [code, Blockly.Python.ORDER_NONE];
    //return code;
    
};


Blockly.Python['driss_ia_detection_draw_bbox_et_infos'] = function (block) {
    var var_image = block.getFieldValue('VAR_IMAGE');
    var var_predictions = block.getFieldValue('VAR_PREDICTIONS');
    var cb_showInfos = block.getFieldValue('SHOW_INFOS') === 'TRUE';
    var confiance = block.getFieldValue('CONFIANCE');
    
    if (cb_showInfos == true) cb_showInfos = "True";

    

    Blockly.Python.definitions_["import_math"] = "import math";
    
    
    Blockly.Python.functionNames_["count_detections_by_class"] = '# Compter le nombre de classes\n' +
    'def count_detections_by_class(detections, confiance):\n' +
    '  counter = {}\n' +
    '  for det in detections:\n' +
    '    cls = det["cls_name"]\n' +
    '    cf = det["conf"]\n' +
    '    if cf >= confiance:\n' +
    '      if cls in counter:\n' +
    '        counter[cls] += 1\n' +
    '      else:\n' +
    '        counter[cls] = 1\n' +
    '  # Reformater sous forme de liste de dictionnaires\n' +
    '  datas = [{"class": k, "nbreDetection": v} for k, v in counter.items()]\n' +
    '  return datas\n';
    
    
    Blockly.Python.ds_variables_["configAffichage"] = '# Config d\'affichage\n' +
        'CONFIG = {\n' +
        '  "label" : {\n' +
        '    "box_color": (0, 200, 0),\n' +
        '    "text_color": (255, 255, 255),\n' +
        '    "font_name": "HERSHEY_SIMPLEX",\n' +
        '    "font_scale": 0.5,\n' +
        '    "thickness": 1,\n' +
        '    "show_labels": True,\n' +
        '    "label_anchor": "tl",\n' +
        '  },\n' +
        '}\n' ;
    
    Blockly.Python.functionNames_["addInfosToImage"] = '# Ajoute un bandeau noir en haut de l\'image\n' +
    'def addInfosToImage(image, datas, timelaps, model_name):\n' +
    '  padding = 10\n' +
    '  font_scale = 0.55\n' +
    '  thickness = 1\n' +

    '  h, w = image.shape[:2]\n' +

    '  font = cv2.FONT_HERSHEY_SIMPLEX\n' +
    '  font_2 = cv2.FONT_HERSHEY_DUPLEX\n' +

    '  # =========================\n' +
    
    '  model_name = "IA Model : " + model_name\n' +
    '  timelaps_str = f"Temps de detection : {timelaps:.2f}ms"\n' +

    '  (text_width_model, text_height_model), _ = cv2.getTextSize(model_name, font_2, font_scale, thickness)\n' +
    '  (text_width_time, text_height_time), _ = cv2.getTextSize(timelaps_str, font, font_scale, thickness)\n' +

    '  # =========================\n' +
    
    '  items = [f"{d[\'class\']} : {d[\'nbreDetection\']}" for d in datas]\n' +

    '  # Mesure de la hauteur max d\'une ligne d\'items\n' +
    '  max_text_height = 0\n' +
    '  for item in items:\n' +
    '    (_, h_text), _ = cv2.getTextSize(item, font, font_scale, thickness)\n' +
    '    max_text_height = max(max_text_height, h_text)\n' +

    '  # =========================\n' +
    
    '  lines_count = 2  # model_name + timelaps (toujours 2 lignes fixes)\n' +
    '  if items:\n' +
    '    # on estime le nombre de lignes nécessaires (affichage en colonnes max_rows=3 comme ton code)\n' +
    '    max_rows = 3\n' +
    '    lines_count += min(max_rows, len(items))\n' +

    '  bandeau_height = padding + lines_count * (max_text_height + padding)  # hauteur dynamique\n' +
    '  bandeau = np.zeros((bandeau_height, w, 3), dtype=np.uint8)\n' +

    '  # =========================\n' +
   
    '  y_model = padding + text_height_model\n' +
    '  cv2.putText(bandeau, model_name, (padding, y_model), font_2, font_scale, (0, 255, 255), thickness, cv2.LINE_AA)  # jaune\n' +

    '  y_time = y_model + text_height_time + padding\n' +
    '  cv2.putText(bandeau, timelaps_str, (padding, y_time), font, font_scale, (255, 255, 255), thickness, cv2.LINE_AA)  # blanc\n' +

    '  # =========================\n' +
    
    '  max_rows = 3\n' +
    '  num_cols = math.ceil(len(items) / max_rows) if items else 0\n' +
    '  col_width = w // max_rows if num_cols > 0 else w\n' +

    '  start_y = y_time + 3\n' +
    '  for idx, item in enumerate(items):\n' +
    '    col = idx // max_rows\n' +
    '    row = idx % max_rows\n' +
    '    x = col * col_width + padding\n' +
    '    y = start_y + (row + 1) * (max_text_height + padding)\n' +

    '    if col > 0:\n' +
    '      cv2.putText(bandeau, "|", (x - 20, y), font, font_scale, (255, 255, 255), thickness, cv2.LINE_AA)\n' +

    '    cv2.putText(bandeau, item, (x + 20, y), font, font_scale, (255, 255, 255), thickness, cv2.LINE_AA)\n' +

    '  # =========================\n' +
    
    '  img = np.vstack((image, bandeau))\n' +
    '  return img\n' ;

    var code = '';
    code += 'if('+var_predictions+' is not None):\n';
    code += '  draw_bboxes('+var_image+', '+var_predictions+'[0], '+confiance+', CONFIG["label"])\n';
    code += '  datas = count_detections_by_class('+var_predictions+'[0], '+confiance+')\n';
    
    if(cb_showInfos){
        code += '  '+var_image +'= addInfosToImage('+var_image+', datas,  '+var_predictions+'[1], '+var_predictions+'[2])\n';
     }
    code += '\n';
    return code;

}


Blockly.Python['driss_ia_detection_bbox_options'] = function (block) {
    var className = Blockly.Python.valueToCode(block, 'CLASS_NAME', Blockly.Python.ORDER_ATOMIC);
    var displayLabel = Blockly.Python.valueToCode(block, 'DISPLAY_LABEL', Blockly.Python.ORDER_ATOMIC);
    var color_HEX = block.getFieldValue('COLOR');
    var labelCorner = block.getFieldValue('LABEL_CORNER');

    var color_BGR = hexToBGR(color_HEX);

    className = className.replace(new RegExp("[^(a-zA-Z0-9_)]", "g"), '')
    Blockly.Python.ds_variables_['label_'+className] = 'label_'+className+' = {"displayLabel" : '+displayLabel+', "color" : '+color_BGR+',  "anchor" : "'+labelCorner+'"}';

    var code = '';
    code += '\n';
    return code;
}


// Blockly.Python['driss_ia_detection_draw_complete_bbox'] = function (block) {
//     var var_image = block.getFieldValue('VAR_IMAGE');
//     var var_predictions = block.getFieldValue('VAR_PREDICTIONS');
    
//     var confiance = block.getFieldValue('CONFIANCE');
    
//     var color_HEX_1 = block.getFieldValue('COLOR_1');
//     var color_HEX_2 = block.getFieldValue('COLOR_2');
//     var color_HEX_3 = block.getFieldValue('COLOR_3');
//     var color_HEX_4 = block.getFieldValue('COLOR_4');

//     var cb_showLabel = block.getFieldValue('CLASS_NAME') === 'TRUE';
//     var labelCorner = block.getFieldValue('LABEL_CORNER');

//     var cb_nbreDetections = block.getFieldValue('COUNT_DETECTIONS') === 'TRUE';
//     var countDetectionCorner = block.getFieldValue('COUNT_CORNER');

//     var cb_timelaps = block.getFieldValue('TIMELAPS') === 'TRUE';
//     var timeLapsCorner = block.getFieldValue('TIMELAPS_CORNER');

//     var color_RGB_1 = hexToRGB(color_HEX_1);
//     var color_RGB_2 = hexToRGB(color_HEX_2);
//     var color_RGB_3 = hexToRGB(color_HEX_3);
//     var color_RGB_4 = hexToRGB(color_HEX_4);

//     if (cb_showLabel == true) cb_showLabel = "True";


//     function declareConfig(){
//     Blockly.Python.ds_variables_["configAffichage"] = '# Config d\'affichage\n' +
//         'CONFIG = {\n' +
//         '  "label" : {\n' +
//         '    "box_color": '+color_RGB_1+',\n' +
//         '    "text_color": (255, 255, 255),\n' +
//         '    "font_name": "HERSHEY_DUPLEX",\n' +
//         '    "font_scale": 0.4,\n' +
//         '    "thickness": 0.8,\n' +
//         '    "show_labels": '+labelCorner+',\n' +
//         //'    "display_name": "Casque",\n' +
//         '    "label_anchor": '+cb_showLabel+',\n' +
//         '  },\n' +
//         '  "countBadge" : {\n' +
//         '    "bg_color": (0, 0, 0),\n' +
//         '    "text_color": (255, 255, 255),\n' +
//         '    "font_name": "HERSHEY_DUPLEX",\n' +
//         '    "font_scale": 0.5,\n' +
//         '    "thickness": 1,\n' +
//         '    "padding": 10,\n' +
//         '    "line_gap": 5,\n' +
//         '    "margin": 10,\n' +
//         '    "badge_anchor": '+countDetectionCorner+',\n' +
//         '  },\n' +
//         '  "timelapsBadge" : {\n' +
//         '    "bg_color": (0, 0, 0),\n' +
//         '    "text_color": (255, 255, 255),\n' +
//         '    "font_name": "HERSHEY_DUPLEX",\n' +
//         '    "font_scale": 0.5,\n' +
//         '    "thickness": 1,\n' +
//         '    "padding": 10,\n' +
//         '    "line_gap": 5,\n' +
//         '    "margin": 10,\n' +
//         '    "badge_anchor": '+timeLapsCorner+',\n' +
//         '  }\n' +
//         '}\n' ;
//     }

//     var code = '';
//     declareConfig();
//     code += 'draw_bboxes('+var_image+', '+var_predictions+'[0], '+confiance+', CONFIG["label"])\n';
//     if(cb_nbreDetections){
//         code += 'datas = count_detections_by_class('+var_predictions+'[0])\n';
//         code += '_draw_badge_counts('+var_image+', datas,  CONFIG["countBadge"])\n';
//     }

//     if(cb_timelaps){
//         code += '_draw_badge_time('+var_image+', '+var_predictions+'[1],  CONFIG["timelapsBadge"])\n';
//     }
    
    
//     code += '\n';
//     return code;

// }


































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

