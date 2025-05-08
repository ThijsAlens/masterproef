/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Order} from 'blockly/javascript';
import {updateSuperAreaDropdown} from '../index';
import {devices} from '../index';
import {current_code} from '../index';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock['DEVICE_new_device'] = function (block, generator) {
  // Get the field values from the block
  const deviceName = block.getFieldValue('device_name_value');
  const deviceType = generator.statementToCode(block, 'device_type');
  const deviceArea = block.getFieldValue('device_area_value').toLowerCase();

  // Generate the JavaScript code
  const code =`__NEW_DEVICE__{{"deviceName": "${deviceName}", "deviceType": "${deviceType}", "deviceArea": "${deviceArea}"}}`;

  return code;
};

forBlock['DEVICE_device_type'] = function (block, generator) {
  // Get the field values from the block
  const deviceTypeName = generator.statementToCode(block, 'device_type_value');
  let deviceTypeStates = generator.statementToCode(block, 'states_value');

  console.log(deviceTypeStates);

  if (deviceTypeStates.includes(`NUMBER__{{"min":`)) {
    deviceTypeStates = `{"type": "number", "range": ${deviceTypeStates.slice(11, -1)}}`;
  } else {
    // make deviceTypeStates look like a python list
    
    deviceTypeStates = deviceTypeStates
    .split(",")                        // split by comma
    .map(s => s.trim())                // remove spaces
    .filter(s => s !== "")             // remove empty strings
    .map(s => s.toLowerCase());        // lowercase each
    deviceTypeStates = `{"type": "string", "states": "${deviceTypeStates}"}`;
  }

  // Generate the JavaScript code
  const code =`__NEW_DEVICE_TYPE__{{"deviceTypeName": "${deviceTypeName}", "deviceTypeStates": [${deviceTypeStates}]}}`;
  return code;
};

forBlock['DEVICE_device_type_dropdown'] = function (block, generator) {
  // Get the field values from the block
  const deviceTypeName = block.getFieldValue('device_type_dropdown');
  const code = `${deviceTypeName}`;
  return code;
}


forBlock['DEVICE_device_dropdown'] = function (block, generator) {
  // Get the field values from the block
  const deviceName = block.getFieldValue('device_name');
  const code = `${deviceName}`;
  return code;
}





forBlock['STATES_states_dropdown'] = function (block, generator) {
  // Get the field values from the block
  const stateName = block.getFieldValue('states_dropdown_value');

  // Generate the JavaScript code
  const code =`${stateName}, `;

  return code;
}

forBlock['STATE_number_state'] = function (block, generator) {
  // Get the field values from the block
  const min = block.getFieldValue('min');
  const max = block.getFieldValue('max');

  // Generate the JavaScript code
  const code =`NUMBER__{{"min": ${min}, "max": ${max}}}`;
  return code;
}


forBlock['STATE_value'] = function (block, generator) {
  // Get the field values from the block
  const stateName = block.getFieldValue('STATE_value_dropdown');

  // Generate the JavaScript code
  const code =`${stateName}`;
  return code;
}

forBlock['STATE_int'] = function (block, generator) {
  // Get the field values from the block
  const stateName = block.getFieldValue('STATE_int_value');

  // Generate the JavaScript code
  const code =`${stateName}`;
  return code;
}

forBlock['AREA_area_dropdown'] = function (block, generator) {
  // Get the field values from the block
  const areaName = block.getFieldValue('AREA_area_dropdown').toLowerCase();

  // Generate the JavaScript code
  const code =`${areaName}`;

  return code;
}

forBlock['AREA_relations'] = function (block, generator) {
  // Get the field values from the block
  const subArea = generator.statementToCode(block, 'sub_area');
  const superArea = generator.statementToCode(block, 'super_area');

  // Generate the JavaScript code
  const code =`__NEW_AREA_RELATION__{{"subArea": "${String(subArea)}", "superArea": "${String(superArea)}"}}`;

  return code;
}

// -------------------- RULES --------------------- //

forBlock['RULES_equivalence'] = function (block, generator) {
  // Get the field values from the block
  const condition = generator.statementToCode(block, 'condition');
  const action = generator.statementToCode(block, 'action');
  const code =`"(${condition}) => (${action})", `;
  return code;
}

forBlock['RULES_for_all_devices_of_type'] = function (block, generator) {
  // Get the field values from the block
  const deviceTypeName = block.getFieldValue('device_type_value');
  let rules = generator.statementToCode(block, 'rule');

  // Generate the JavaScript code
  rules = rules.replace(/,\s*$/, ''); // get rid of the last comma to create a valid JSON

  const code =`__NEW_RULE__{{"type": "for_all_of_devicetype", "deviceTypeName": "${deviceTypeName}", "rules": [${rules}]}}`;
  return code;
}

forBlock['RULES_for_all_devices_of_type_equivalence'] = function (block, generator) {
  // Get the field values from the block
  const condition = generator.statementToCode(block, 'condition');
  const state_of_actuators = generator.statementToCode(block, 'state_of_actuators');

  const key = !isNaN(state_of_actuators) ? "number" : "string";

  // Generate the JavaScript code
  const code = `"(${condition}) => (${key}DeviceIsInState(d) = ${state_of_actuators})", `;
  return code;
}

forBlock['RULES_for_all_devices_in_area_of_type'] = function (block, generator) {
  // Get the field values from the block
  const areaName = block.getFieldValue('area_value');
  let deviceTypeName = block.getFieldValue('device_type_value');
  let rules = generator.statementToCode(block, 'rule');

  // Generate the JavaScript code
  rules = rules.replace(/,\s*$/, ''); // get rid of the last comma to create a valid JSON

  // add the area restriction to the rules
  let rules_array = rules.split(',').map(str => {
    let match = str.match(/=>\s*\(\s*([\w\d_]+)\s*\(/);
    match = match ? match[1] : null;
    let key = match == "stringDeviceIsInState" ? "string" : "number";
    let index = str.indexOf('(');
    return str.slice(0, index + 1) + `(${key}DeviceIsInArea(d) = ${areaName}) & ` + str.slice(index + 1);
  });
  rules = rules_array.join(', ');
  const code =`__NEW_RULE__{{"type": "for_all_in_area_of_devicetype", "deviceTypeName": "${deviceTypeName}", "rules": [${rules}]}}`;
  return code;
}

forBlock['RULES_single_rule'] = function (block, generator) {
  // Get the field values from the block
  let rules = generator.statementToCode(block, 'rule');

  rules = rules.replace(/,\s*$/, ''); // get rid of the last comma to create a valid JSON
  
  let code = `__NEW_RULE__{{"type": "single_rule", "rules": [${rules}]}}`;
  return code;
}

forBlock['RULES_is_always_in_same_state'] = function (block, generator) {
  // Get the field values from the block
  const device_1_name = block.getFieldValue('device_1_name');
  const device_2_name = block.getFieldValue('device_2_name');

  // Generate the JavaScript code
  const code =`{"type": "is_always_in_same_state", "device_1_name": "${device_1_name}", "device_2_name": "${device_2_name}"}, `;
  return code;
}

forBlock['RULES_is_in_state'] = function (block, generator) {
  // Get the field values from the block
  const device = generator.statementToCode(block, 'device');
  const state = generator.statementToCode(block, 'state');

  // Generate the JavaScript code
  const lines = current_code.split('\n').filter(s => 
    s.includes(device.trim().toLowerCase()) && s.endsWith('')
  );
  
  let key = "string";
  for (const line of lines) {
    if (line.endsWith("NumberDevice")) {
      key = "number";
      break;
    }
  }

  const code =`(${key}DeviceIsInState(${device}) = ${state})`;
  return code;
}

forBlock['RULES_and'] = function (block, generator) {
  // Get the field values from the block
  let part_1 = generator.statementToCode(block, 'part_1');
  let part_2 = generator.statementToCode(block, 'part_2');

  // Generate the JavaScript code
  const code =`${part_1} & ${part_2} `;
  return code;
}

forBlock['RULES_or'] = function (block, generator) {
  // Get the field values from the block
  let part_1 = generator.statementToCode(block, 'part_1');
  let part_2 = generator.statementToCode(block, 'part_2');

  // Generate the JavaScript code
  const code =`${part_1} | ${part_2} `;
  return code;
}

forBlock['RULES_xor'] = function (block, generator) {
  // Get the field values from the block
  let part_1 = generator.statementToCode(block, 'part_1');
  let part_2 = generator.statementToCode(block, 'part_2');

  // Generate the JavaScript code
  const code =`(${part_1} & ~${part_2}) | (~${part_1} & ${part_2})`;
  return code;
}

forBlock['TIME_time'] = function (block, generator) {
  // Get the field values from the block
  const time = block.getFieldValue('TIME');
  const code =`time() = ${time}`;
  return code;
}

