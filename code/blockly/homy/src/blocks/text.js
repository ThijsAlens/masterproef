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
  message0: "Device %1 %2 of type %3 %4 is situated in %5 %6",
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
      type: "field_dropdown",
      name: "device_type",
      "options": function() {
        return deviceTypes.map(dt => [dt[0], dt[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "NAME"
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
  inputsInline: true,
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
  message0: "device type %1 %2 has states %3",
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
      name: "states_value"
    }
  ],
  colour: 60,
  inputsInline: false
}


const DEVICE_device_dropdown = 
{
  type: "DEVICE_device_dropdown",
  tooltip: "",
  helpUrl: "",
  message0: "%1 %2",
  args0: [
    {
      type: "field_dropdown",
      name: "device_name",
      options: function() {
        return devices.map(device => [device[0], device[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "NAME"
    }
  ],
  output: null,
  colour: 180
}








const STATE_number_state = 
{
  type: "STATE_number_state",
  tooltip: "",
  helpUrl: "",
  message0: "numbers from %1 to %2 %3",
  args0: [
    {
      type: "field_input",
      name: "min",
      text: "min value"
    },
    {
      type: "field_input",
      name: "max",
      text: "max value"
    },
    {
      type: "input_dummy",
      name: "NAME"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 60
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
  "colour": 60
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
      text: "number"
    },
    {
      type: "input_dummy",
      name: "STATE_int"
    }
  ],
  output: null,
  colour: 180
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
  colour: 180
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
  message0: "%1 %2 is situated in %3 %4",
  args0: [
    {
      "type": "field_dropdown",
      "name": "sub_area",
      "options": function() {
        return possibleAreas.map(area => [area[0], area[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "sub_area_name"
    },
    {
      type: "input_dummy",
      name: "dummy"
    },
    {
      "type": "field_dropdown",
      "name": "super_area",
      "options": function() {
        return possibleAreas.map(area => [area[0], area[1]]);
      }
    },
  ],
  inputsInline: true,
  colour: 120
};

// ---------------- RULES --------------------
const RULES_equivalence = 
{
  type: "RULES_equivalence",
  tooltip: "",
  helpUrl: "",
  message0: "If %1 then %2",
  args0: [
    {
      type: "input_value",
      name: "condition"
    },
    {
      type: "input_value",
      name: "action"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 195,
  inputsInline: true
}


const RULES_for_all_devices_of_type = 
{
  type: "RULES_for_all_devices_of_type",
  tooltip: "",
  helpUrl: "",
  message0: "For every device of type %1 %2 %3",
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
  colour: 300
}

const RULES_for_all_devices_in_area_of_type = 
{
  type: "RULES_for_all_devices_in_area_of_type",
  tooltip: "",
  helpUrl: "",
  message0: "For every device in area %1 of type %2 %3 %4",
  args0: [
    {
      type: "field_dropdown",
      name: "area_value",
      options: function() {
        return possibleAreas.map(area => [area[0], area[1]]);
      }
    },
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
  colour: 300
}

const RULES_for_all_devices_of_type_equivalence_string = 
{
  type: "RULES_for_all_devices_of_type_equivalence_string",
  tooltip: "",
  helpUrl: "",
  message0: "If %1 then the devices should be in state %2 %3",
  args0: [
    {
      type: "input_value",
      name: "condition"
    },
    {
      type: "field_dropdown",
      name: "state_of_actuators",
      options: function() {
        return possibleStates.map(state => [state[0], state[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "dummy"
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 300,
  inputsInline: true
}

const RULES_for_all_devices_of_type_equivalence_number =
{
  type: "RULES_for_all_devices_of_type_equivalence_number",
  tooltip: "",
  helpUrl: "",
  message0: "If %1 then the devices should be in state %2 %3",
  args0: [
    {
      type: "input_value",
      name: "condition"
    },
    {
      type: "field_input",
      name: "state_of_actuators",
      text: "number"
    },
    {
      type: "input_dummy",
      name: "dummy"
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 300,
  inputsInline: true
}


const RULES_is_always_in_same_state = 
{
  type: "RULES_is_always_in_same_state",
  tooltip: "",
  helpUrl: "",
  message0: "%1 %2 is always in the same state as %3 %4",
  args0: [
    {
      type: "field_dropdown",
      name: "device_1_name",
      options: function() {
        return devices.map(device => [device[0], device[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "device_1"
    },
    {
      type: "field_dropdown",
      name: "device_2_name",
      options: function() {
        return devices.map(device => [device[0], device[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "device_2"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 195,
  inputsInline: true
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
  colour: 195
}

const RULES_is_in_state_string = 
{
  type: "RULES_is_in_state_string",
  tooltip: "",
  helpUrl: "",
  message0: "%1 %2 is in state %3 %4",
  args0: [
    {
      type: "field_dropdown",
      name: "device",
      options: function() {
        return devices.map(device => [device[0], device[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "dummy1"
    },
    {
      type: "field_dropdown",
      name: "state",
      options: function() {
        return possibleStates.map(state => [state[0], state[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "dummy2"
    },
  ],
  output: null,
  colour: 235,
  inputsInline: true
}

const RULES_is_in_state_int =
{
  type: "RULES_is_in_state_int",
  tooltip: "",
  helpUrl: "",
  message0: "%1 %2 is in state %3 %4",
  args0: [
    {
      type: "field_dropdown",
      name: "device",
      options: function() {
        return devices.map(device => [device[0], device[1]]);
      }
    },
    {
      type: "input_dummy",
      name: "dummy1"
    },
    {
      type: "field_input",
      name: "state",
      text: "number"
    },
    {
      type: "input_dummy",
      name: "dummy2"
    },
  ],
  output: null,
  colour: 235,
  inputsInline: true
}

const RULES_and = 
{
  type: "RULES_and",
  tooltip: "",
  helpUrl: "",
  message0: "%1 and %2",
  args0: [
    {
      type: "input_value",
      name: "part_1"
    },
    {
      type: "input_value",
      name: "part_2"
    }
  ],
  output: null,
  colour: 145,
  inputsInline: true
}

const TIME_time = 
{
  "type": "TIME_time",
  "tooltip": "",
  "helpUrl": "",
  "message0": "it is %1 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "TIME",
      "text": "time"
    },
    {
      "type": "input_dummy",
      "name": "NAME"
    }
  ],
  "output": null,
  "colour": 145
}

const RULES_or = 
{
  "type": "RULES_or",
  "tooltip": "",
  "helpUrl": "",
  "message0": "%1 or %2",
  "args0": [
    {
      "type": "input_value",
      "name": "part_1"
    },
    {
      "type": "input_value",
      "name": "part_2"
    }
  ],
  "output": null,
  "colour": 145,
  "inputsInline": true
}

const RULES_xor = 
{
  "type": "RULES_xor",
  "tooltip": "",
  "helpUrl": "",
  "message0": "either %1 or %2",
  "args0": [
    {
      "type": "input_value",
      "name": "part_1"
    },
    {
      "type": "input_value",
      "name": "part_2"
    }
  ],
  "output": null,
  "colour": 145,
  "inputsInline": true
}









                    

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  DEVICE_new_device,
  DEVICE_device_type_dropdown,
  DEVICE_device_type,
  STATE_number_state,
  DEVICE_device_dropdown,

  STATES_states_dropdown,
  STATE_value,
  STATE_int,
  AREA_area_dropdwon,
  AREA_relations,

  RULES_equivalence,
  RULES_is_always_in_same_state,
  RULES_single_rule,

  RULES_for_all_devices_of_type,
  RULES_for_all_devices_in_area_of_type,
  RULES_for_all_devices_of_type_equivalence_number,
  RULES_for_all_devices_of_type_equivalence_string,
  
  RULES_is_in_state_string,
  RULES_is_in_state_int,
  RULES_and,
  RULES_or,
  RULES_xor,

  TIME_time,
]); 
