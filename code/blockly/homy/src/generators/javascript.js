/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Order} from 'blockly/javascript';
import {updateSuperAreaDropdown} from '../index';
import {devices} from '../index';

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

  // make deviceTypeStates look like a python list
  
  deviceTypeStates = deviceTypeStates
  .split(",")                        // split by comma
  .map(s => s.trim())                // remove spaces
  .filter(s => s !== "")             // remove empty strings
  .map(s => s.toLowerCase());        // lowercase each
  console.log("deviceTypeStates", deviceTypeStates);

  // Generate the JavaScript code
  const code =`__NEW_DEVICE_TYPE__{{"deviceTypeName": "${deviceTypeName}", "deviceTypeStates": ["${deviceTypeStates}"]}}`;
  return code;
};

forBlock['DEVICE_device_type_dropdown'] = function (block, generator) {
  // Get the field values from the block
  const deviceTypeName = block.getFieldValue('device_type_dropdown');
  const code = `${deviceTypeName}`;
  return code;
}

forBlock['STATES_states_dropdown'] = function (block, generator) {
  // Get the field values from the block
  const stateName = block.getFieldValue('states_dropdown_value');

  // Generate the JavaScript code
  const code =`${stateName}, `;

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
  const sensor_name = block.getFieldValue('sensor_name_value');
  const sensor_state = generator.statementToCode(block, 'state_of_sensor');
  const actuator_name = block.getFieldValue('actuator_name_value');
  const actuator_state = generator.statementToCode(block, 'state_of_actuator');
  const code =`{"type": "equivalence", "sensor_name": "${sensor_name}", "sensor_state": "${sensor_state}", "actuator_name": "${actuator_name}", "actuator_state": "${actuator_state}"}`;
  return code;
}

forBlock['RULES_for_all_devices_of_type'] = function (block, generator) {
  // Get the field values from the block
  const deviceTypeName = block.getFieldValue('device_type_value');
  let rules = generator.statementToCode(block, 'rule');

  // Generate the JavaScript code
  rules = rules.replace(/,\s*$/, ''); // get rid of the last comma to create a valid JSON

  const code =`{"type": "for_all_of_devicetype", "deviceTypeName": "${deviceTypeName}", "rules": [${rules}]}`;
  return code;
}

forBlock['RULES_for_all_devices_of_type_equivalence'] = function (block, generator) {
  // Get the field values from the block
  const sensor_value_name = block.getFieldValue('sensor_value_name');
  const state_of_sensor = generator.statementToCode(block, 'state_of_sensor');
  const state_of_actuators = generator.statementToCode(block, 'state_of_actuators');

  // Generate the JavaScript code
  const code =`{"sensor_name": "${sensor_value_name}", "sensor_state": "${state_of_sensor}", "actuator_state": "${state_of_actuators}"}, `; // escape the quotes because JSON in JSON...
  return code;
}

forBlock['RULES_for_all_devices_in_area'] = function (block, generator) {
  // Get the field values from the block
  const areaName = block.getFieldValue('area_value');
  let rules = generator.statementToCode(block, 'rule');

  const code =`__NEW_RULE_FOR_ALL_DEVICES_IN_AREA__{{"type": "for_all_in_area", "areaName": "${areaName}", "rules": [${rules}]}}`;
  return code;
}

forBlock['RULES_single_rule'] = function (block, generator) {
  // Get the field values from the block
  let rule = generator.statementToCode(block, 'rule');
  
  const code =`__NEW_SINGLE_RULE__{{"rule": ${rule}}}`;
  return code;
}

