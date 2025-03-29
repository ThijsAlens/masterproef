/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Order} from 'blockly/javascript';
import {updateSuperAreaDropdown} from '../index';

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
  const code =`__NEW_DEVICE__{"deviceName": "${deviceName}", "deviceType": "${deviceType}", "deviceArea": "${deviceArea}"}`;

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
  const code =`__NEW_DEVICE_TYPE__{"deviceTypeName": "${deviceTypeName}", "deviceTypeStates": ["${deviceTypeStates}"]}`;
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
  const code =`__NEW_AREA_RELATION__{"subArea": "${String(subArea)}", "superArea": "${String(superArea)}"}`;

  return code;
}
