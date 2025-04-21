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
import {devices} from '../index';

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
  "colour": 15
};

const STATE_int = 
{
  type: "STATE_int",
  tooltip: "",
  helpUrl: "",
  message0: "%1 %2",
  args0: [
    {
      type: "field_input",
      name: "STATE_int_value",
      text: "integer value"
    },
    {
      type: "input_dummy",
      name: "STATE_int"
    }
  ],
  output: null,
  colour: 210
}

const STATE_value = 
{
  type: "STATE_value",
  tooltip: "",
  helpUrl: "",
  message0: "%1 %2",
  args0: [
    {
      type: "field_dropdown",
      name: "STATE_value_dropdown",
      options: function() {
        return possibleStates.map(state => [state[0], state[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "STATE_value"
    }
  ],
  output: null,
  colour: 210
}



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

// ---------------- RULES --------------------
const RULES_equivalence = 
{
  type: "RULES_equivalence",
  tooltip: "",
  helpUrl: "",
  message0: "If %1 %2 is in state %3 then %4 %5 should be in state %6",
  args0: [
    {
      type: "field_dropdown",
      name: "sensor_name_value",
      options: function() {
          return devices.map(type => [type[0], type[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "sensor_name"
    },
    {
      type: "input_value",
      name: "state_of_sensor"
    },
    {
      type: "field_dropdown",
      name: "actuator_name_value",
      options: function() {
        return devices.map(type => [type[0], type[1]]);
    }
    },
    {
      type: "input_dummy",
      name: "actuator_name"
    },
    {
      type: "input_value",
      name: "state_of_actuator"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 240,
  inputsInline: true
}

const RULES_for_all_devices_of_type = 
{
  type: "RULES_for_all_devices_of_type",
  tooltip: "",
  helpUrl: "",
  message0: "For every device called 'DT' of type %1 %2 %3",
  args0: [
    {
      type: "field_dropdown",
      name: "device_type_value",
      options: function() {
        return deviceTypes.map(type => [type[0], type[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "device_type"
    },
    {
      type: "input_statement",
      name: "rule"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 195
}

const RULES_for_all_devices_of_type_equivalence = 
{
  type: "RULES_for_all_devices_of_type_equivalence",
  tooltip: "",
  helpUrl: "",
  message0: "If %1 is in state %2 %3 then 'DT' should be in state %4 %5",
  args0: [
    {
      type: "field_dropdown",
      name: "sensor_value_name",
      options: function() {
        return devices.map(device => [device[0], device[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "NAME"
    },
    {
      type: "input_value",
      name: "state_of_sensor"
    },
    {
      type: "input_dummy",
      name: "dummy"
    },
    {
      type: "input_value",
      name: "state_of_actuators"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 195,
  inputsInline: true
}

const RULES_for_all_devices_in_area = 
{
  type: "RULES_for_all_devices_in_area",
  tooltip: "",
  helpUrl: "",
  message0: "For every device in area %1 %2 %3",
  args0: [
    {
      type: "field_dropdown",
      name: "area_value",
      options: function() {
        return possibleAreas.map(area => [area[0], area[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "area"
    },
    {
      type: "input_statement",
      name: "rule"
    }
  ],
  colour: 240
}

const RULES_single_rule = 
{
  type: "RULES_single_rule",
  tooltip: "",
  helpUrl: "",
  message0: "Rule %1 %2",
  args0: [
    {
      type: "input_dummy",
      name: "dummy"
    },
    {
      type: "input_statement",
      name: "rule"
    }
  ],
  colour: 240
}




                    

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  DEVICE_new_device,
  DEVICE_device_type_dropdown,
  DEVICE_device_type,

  STATES_states_dropdown,
  STATE_value,
  STATE_int,
  AREA_area_dropdwon,
  AREA_relations,

  RULES_equivalence,
  RULES_single_rule,

  RULES_for_all_devices_of_type,
  RULES_for_all_devices_of_type_equivalence,

  RULES_for_all_devices_in_area,
]); 
