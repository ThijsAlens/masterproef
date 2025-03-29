/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// some global vairables to track the possible states and areas
export let possibleStates = [["on", "ON"], ["off", "OFF"]];
export let possibleAreas = [["home", "HOME"]];
export let deviceTypes = [["", ""]];

import * as Blockly from 'blockly';
import {blocks} from './blocks/text';
import {forBlock} from './generators/javascript';
import {javascriptGenerator} from 'blockly/javascript';
import {save, load} from './serialization';
import {homy} from './toolbox';
import './index.css';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {toolbox: homy});

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const code = javascriptGenerator.workspaceToCode(ws);
  codeDiv.innerText = code;

  outputDiv.innerHTML = '';

  //eval(code);
};

// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (
    e.isUiEvent ||
    e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  runCode();
});



// some callback functions to manage the buttons
ws.registerButtonCallback('createStateCallback', function(button) {
  let stateName = prompt('Enter a new state name:');
  if (stateName) {
    stateName = String(stateName);
    possibleStates.push([stateName, stateName.toUpperCase()]); // Add to the states list

    // Update the dropdown in existing "STATES_states_dropdown" blocks
    ws.getAllBlocks().forEach(block => {
      if (block.type === 'STATES_states_dropdown') {
        const field = block.getField('states_dropdown_value');
        if (field && field.menuGenerator_) {
          field.menuGenerator_ = () => possibleStates.map(state => [state[0], state[1]]);
          field.setValue(possibleStates[0][0]);
        }
      }
    });
  }
});

ws.registerButtonCallback('createAreaCallback', function(button) {
  let areaName = prompt('Enter a new area name:');
  if (areaName) {
    areaName = String(areaName);
    possibleAreas.push([areaName, areaName.toUpperCase()]); // Add to areas

    // Update the dropdown in existing "VOC_new_device" blocks
    ws.getAllBlocks().forEach(block => {
      if (block.type === 'VOC_new_device') {
        const field = block.getField('device_area_value');
        if (field && field.menuGenerator_) {
          field.menuGenerator_ = () => possibleAreas.map(area => [area[0], area[1]]);
          field.setValue(possibleAreas[0][0]);
        }
      }
    });
  }
});

ws.registerButtonCallback('saveCallback', function(button) {
  let code = javascriptGenerator.workspaceToCode(ws);
  code += `\n__STATES__${JSON.stringify(Object.fromEntries(possibleStates))}\n__AREAS__${JSON.stringify(Object.fromEntries(possibleAreas))}`;

  fetch('http://localhost:5000/run-python', { // Send a request to the server
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text: code })
})  
    .then(response => response.json())     // Wait for the server's response
    .catch(error => console.error('Error:', error));  // Handle any errors that may occur

});

ws.registerButtonCallback('createDeviceTypeCallback', function(button) {
  let deviceTypeName = prompt('Enter a new device type name:');
  if (deviceTypeName) {
    deviceTypeName = String(deviceTypeName);
    deviceTypes.push([deviceTypeName, deviceTypeName.toUpperCase()]); // Add to the states list
    if (Array.isArray(deviceTypes[0]) && deviceTypes[0].length === 2 && deviceTypes[0][0] === "" && deviceTypes[0][1] === ""){
      deviceTypes.shift(); // Remove the first element
    }

    // Update the dropdown in existing "STATES_states_dropdown" blocks
    ws.getAllBlocks().forEach(block => {
      if (block.type === 'DEVICE_device_type_dropdown') {
        const field = block.getField('device_type_dropdown');
        if (field && field.menuGenerator_) {
          field.menuGenerator_ = () => deviceTypes.map(state => [state[0], state[1]]);
          field.setValue(deviceTypes[0][0]);
        }
      }
    });
  }
});

