/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// import the global vairables to track the possible states and areas
import {possibleStates} from '../index';
import {possibleAreas} from '../index';
import {deviceTypes} from '../index';

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.

const DEVICE_new_device =
{
  type: "DEVICE_new_device",
  tooltip: "",
  helpUrl: "",
  message0: "Device %1 %2 of type %3 is situated in %4 %5",
  args0: [
    {
      type: "field_input",
      name: "device_name_value",
      text: "name"
    },
    {
      type: "input_dummy",
      name: "device_name"
    },
    {
      type: "input_value",
      name: "device_type"
    },
    {
      type: "field_dropdown",
      name: "device_area_value",
      "options": function() {
        return possibleAreas.map(area => [area[0], area[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "device_area"
    }
  ],
  colour: 0
};

const DEVICE_device_type_dropdown = 
{
  type: "DEVICE_device_type_dropdown",
  tooltip: "",
  helpUrl: "",
  message0: "%1 %2",
  args0: [
    {
      type: "field_dropdown",
      name: "device_type_dropdown",
      options: function() {
        console.log(deviceTypes.length);
        console.log(deviceTypes[0]);
        if (Array.isArray(deviceTypes[0]) && deviceTypes[0].length === 2 && deviceTypes[0][0] === "" && deviceTypes[0][1] === ""){
          return [["No device types", "NO_DEVICE_TYPES"]];
        }
        return deviceTypes.map(type => [type[0], type[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "NAME"
    }
  ],
  output: null,
  colour: 15
};

const DEVICE_device_type = 
{
  type: "DEVICE_device_type",
  tooltip: "",
  helpUrl: "",
  message0: "device type %1 has states %2",
  args0: [
    {
      type: "input_value",
      name: "device_type_value"
    },
    {
      type: "input_statement",
      name: "states_value"
    }
  ],
  colour: 0
}

const STATES_states_dropdown = 
{
  "type": "STATES_states_dropdown",
  "tooltip": "",
  "helpUrl": "",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "states_dropdown_value",
      "options": function() {
        return possibleStates.map(state => [state[0], state[1]]);
      }
    },
    {
      "type": "input_dummy",
      "name": "states_dropdown_input"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 225
};

const AREA_area_dropdwon = 
{
  "type": "AREA_area_dropdown",
  "tooltip": "",
  "helpUrl": "",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "AREA_area_dropdown",
      "options": function() {
        return possibleAreas.map(area => [area[0], area[1]]);
      }
    },
    {
      "type": "input_dummy",
      "name": "AREA_area_dropdown"
    }
  ],
  "output": null,
  "colour": 135
};                    

const AREA_relations = 
{
  type: "AREA_relations",
  tooltip: "",
  helpUrl: "",
  message0: "%1 is situated in %2 %3",
  args0: [
    {
      type: "input_value",
      name: "sub_area"
    },
    {
      type: "input_dummy",
      name: "dummy"
    },
    {
      type: "input_value",
      name: "super_area"
    }
  ],
  colour: 120
};

                    

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  DEVICE_new_device,
  DEVICE_device_type_dropdown,
  DEVICE_device_type,
  STATES_states_dropdown,
  AREA_area_dropdwon,
  AREA_relations,
]); 
