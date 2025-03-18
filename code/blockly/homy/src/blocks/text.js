/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const addText = {
  type: 'add_text',
  message0: 'Add text %1',
  args0: [
    {
      type: 'input_value',
      name: 'TEXT',
      check: 'String',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: '',
  helpUrl: '',
};

const VOC_new_device = {
  type: 'VOC_new_device',
  message0: 'DEVICE: %1 device %2 %3 is situated in %4 %5 has states %6',
  args0: [
    {
      type: 'input_dummy',
      name: 'dummy',
    },
    {
      type: 'field_input',
      name: 'device_name_value',
      text: 'name',
    },
    {
      type: 'input_dummy',
      name: 'device_name',
    },
    {
      type: 'field_dropdown',
      name: 'device_area_value',
      options: [
        ['1', 'OPTION1'],
        ['2', 'OPTION2'],
        ['3', 'OPTION3'],
      ],
    },
    {
      type: 'input_dummy',
      name: 'device_area',
    },
    {
      type: 'input_value',
      name: 'device_states',
    },
  ],
  colour: 0,
  tooltip: '',
  helpUrl: '',
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  addText,
  VOC_new_device,
]);
