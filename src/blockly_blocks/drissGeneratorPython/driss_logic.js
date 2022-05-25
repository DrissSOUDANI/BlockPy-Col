
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
 * @fileoverview Générateur de code Python pour les blocs "Logique".
 * @author q.neutron@gmail.com (Quynh Neutron) Modifié par Driss Soudani
 */
 'use strict';

 //goog.provide('Blockly.Python.logic');
 
 goog.require('Blockly.Python');
 

 // 1 - ---------------------------------------------------------------------------------------------------------
 Blockly.Python['controls_if'] = function(block) {
    // If/elseif/else condition.
    var n = 0;
    var code = '', branchCode, conditionCode;
    do {
      conditionCode = Blockly.Python.valueToCode(block, 'IF' + n,
        Blockly.Python.ORDER_NONE) || '___';
      branchCode = Blockly.Python.statementToCode(block, 'DO' + n) ||
          Blockly.Python.PASS;
      code += (n == 0 ? 'if ' : 'elif ' ) + conditionCode + ':\n' + branchCode;
  
      ++n;
    } while (block.getInput('IF' + n));
  
    if (block.getInput('ELSE')) {
      branchCode = Blockly.Python.statementToCode(block, 'ELSE') ||
          Blockly.Python.PASS;
      code += 'else:\n' + branchCode;
    }

    
    return code;
  };

 // 2 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=', 
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = Blockly.Python.ORDER_RELATIONAL;
  var argument0 = Blockly.Python.valueToCode(block, 'A', order) || '___';
  var argument1 = Blockly.Python.valueToCode(block, 'B', order) || '___';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  
  return [code, order];
};

 // 3 - ---------------------------------------------------------------------------------------------------------
 Blockly.Python['logic_operation'] = function(block) {
    // Operations 'and', 'or'.
    var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
    var order = (operator == 'and') ? Blockly.Python.ORDER_LOGICAL_AND :
        Blockly.Python.ORDER_LOGICAL_OR;
    var argument0 = Blockly.Python.valueToCode(block, 'A', order);
    var argument1 = Blockly.Python.valueToCode(block, 'B', order);
    if (!argument0 && !argument1) {
      // If there are no arguments, then the return value is false.
      argument0 = '___';
      argument1 = '___';
    } else {
      // Single missing arguments have no effect on the return value.
      var defaultArgument = (operator == 'and') ? '___' : '___';
      if (!argument0) {
        argument0 = defaultArgument;
      }
      if (!argument1) {
        argument1 = defaultArgument;
      }
    }
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
  };

 // 4 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['logic_negate'] = function(block) {
  // Negation.
  var argument0 = Blockly.Python.valueToCode(block, 'BOOL',
      Blockly.Python.ORDER_LOGICAL_NOT) || '___';
  var code = 'not ' + argument0;
  return [code, Blockly.Python.ORDER_LOGICAL_NOT];
};

 // 5 - ---------------------------------------------------------------------------------------------------------
 Blockly.Python['logic_boolean'] = function(block) {
    // Boolean values true and false.
    var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

 // 6 - ---------------------------------------------------------------------------------------------------------
 Blockly.Python['logic_null'] = function(block) {
    // Null data type.
    return ['None', Blockly.Python.ORDER_ATOMIC];
  };

 // 7 - ---------------------------------------------------------------------------------------------------------
Blockly.Python['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.Python.valueToCode(block, 'IF',
      Blockly.Python.ORDER_CONDITIONAL) || '___';
  var value_then = Blockly.Python.valueToCode(block, 'THEN',
      Blockly.Python.ORDER_CONDITIONAL) || '___';
  var value_else = Blockly.Python.valueToCode(block, 'ELSE',
      Blockly.Python.ORDER_CONDITIONAL) || '___';
  var code = value_then + ' if ' + value_if + ' else ' + value_else;
  return [code, Blockly.Python.ORDER_CONDITIONAL];
};

 // 8 - ---------------------------------------------------------------------------------------------------------
 Blockly.Python['logic_isIn'] = function(block) {
    // Operations 'in', 'not in'.
    var operator = (block.getFieldValue('OP') == 'IN') ? 'in' : 'not in';
    var order = Blockly.Python.ORDER_RELATIONAL;
    var argument0 = Blockly.Python.valueToCode(block, 'ITEM', order) || '___';
    var argument1 = Blockly.Python.valueToCode(block, 'LIST', order) || '___';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
  };

 // 9 - ---------------------------------------------------------------------------------------------------------

 // 10 - ---------------------------------------------------------------------------------------------------------

 // 11 - ---------------------------------------------------------------------------------------------------------

 // 12 - ---------------------------------------------------------------------------------------------------------

 // 13 - ---------------------------------------------------------------------------------------------------------

 // 14 - ---------------------------------------------------------------------------------------------------------

 // 15 - ---------------------------------------------------------------------------------------------------------
