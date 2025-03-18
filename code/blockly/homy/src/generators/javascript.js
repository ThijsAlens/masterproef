/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Order} from 'blockly/javascript';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock['add_text'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
  const addText = generator.provideFunction_(
    'addText',
    `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text) {

  // Add text to the output area.
  const outputDiv = document.getElementById('output');
  const textEl = document.createElement('p');
  textEl.innerText = text;
  outputDiv.appendChild(textEl);
}`,
  );
  // Generate the function call for this block.
  const code = `${addText}(${text});\n`;
  return code;
};

forBlock['VOC_new_device'] = function (block, generator) {
  // Get the field values from the block
  const deviceName = block.getFieldValue('device_name_value');
  const deviceArea = block.getFieldValue('device_area_value');

  // Get the device states value, or default to an empty array if not provided
  const deviceStates = generator.valueToCode(block, 'device_states', Order.ATOMIC);

  // preprocess the variables
  let deviceNameFirstUpper = deviceName.charAt(0).toUpperCase() + deviceName.slice(1);

  // Generate the JavaScript code
  const code =  `
  deviceIs${deviceNameFirstUpper}: Device -> Bool\n
  type ${deviceNameFirstUpper}State := {${deviceStates}}\n
  ${deviceName}IsInState: Device -> ${deviceNameFirstUpper}State\n
  `;

  return code;
};

