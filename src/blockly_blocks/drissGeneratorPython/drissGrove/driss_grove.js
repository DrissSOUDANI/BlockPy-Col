

Blockly.Python['driss_grove_button'] = function(block) {
    var pin = block.getFieldValue('PIN');
    
    Blockly.Python.definitions_["pyfirmata2"] = "import pyfirmata2";
    Blockly.Python.definitions_["sleep"] = "from time import sleep";
    Blockly.Python.definitions_["pyfirmata2"] = "import pyfirmata2" ;

    Blockly.Python.ds_variables_["port"] = "port = pyfirmata2.Arduino.AUTODETECT";
    Blockly.Python.ds_variables_["board"] = "board = pyfirmata2.Arduino(port)";
    
    Blockly.Python.definitions_["pinCallback"] = "\n"+
        "# pinCallback(data)est ensuite appelé à chaque fois après la réception des données et est chronométré par l'arduino lui-même. \n"+
        "# Pour les entrées analogiques à la fréquence d'échantillonnage donnée et pour les entrées numériques aux changements d'état de 0 à 1 ou de 1 à 0.\n"+
        "def pinCallback(value):\n"+
        "    if value:\n"+
        "        print(\"pinCallback 1\" + str(value))\n"+
        "    else:\n"+
        "        print(\"pinCallback 0\" + str(value))\n";
        


    Blockly.Python.ds_codePython_["board_samplingOn"] = "#l\'intervalle d\'échantillonnage à 19 ms\n"+
                                                        "board.samplingOn()";
    
    Blockly.Python.ds_codePython_["Btn_"+pin] = "\n"+
    'board.digital['+pin+'].mode = pyfirmata2.INPUT\n'+
    'board.digital['+pin+'].register_callback(pinCallback)\n';
    'board.digital['+pin+'].enable_reporting()\n';
    
    var code = 'digital['+pin+'].read()';

    
    
    //return code;
    return [code, Blockly.Python.ORDER_NONE];
  };



Blockly.Python['driss_grove_red_led'] = function(block) {
    var etat = block.getFieldValue('STAT');
    var numPin = block.getFieldValue('PIN');
    
    nomVarPin = "digital_"+numPin;
    
    Blockly.Python.definitions_["pyfirmata2"] = "import pyfirmata2";
    Blockly.Python.definitions_["sleep"] = "from time import sleep";
    Blockly.Python.definitions_["pyfirmata2"] = "import pyfirmata2" ;

    Blockly.Python.ds_variables_["port"] = "port = pyfirmata2.Arduino.AUTODETECT";
    Blockly.Python.ds_variables_["board"] = "board = pyfirmata2.Arduino(port)";

    Blockly.Python.ds_variables_[nomVarPin] = nomVarPin+" = board.get_pin('d:"+numPin+":o')";

    var code = '';
    switch(etat){
        case "HIGH" : code = nomVarPin+'.write(1)\n';
        break;
        case "LOW" : code = nomVarPin+'.write(0)\n';
        break;
    }
    
    return code;
  };