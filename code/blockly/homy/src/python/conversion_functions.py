import json

def new_device(vocabulary: list[str], theory: list[str], structure: list[str], arguments: dict[str, str]) -> tuple[list[str], list[str], list[str]]:
    """
    Create a new device in the vocabulary, theory and structure code.

    Args:
        vocabulary (list[str]): The current vocabulary code.
        theory (list[str]): The current theory code.
        structure (list[str]): The current structure code.
        arguments (dict[str, str]): The arguments for the function. KEY: argument name, VALUE: argument value.

    Returns:
        tuple (tuple[list[str], list[str], list[str]]): The updated vocabulary, theory and structure code.
    """
    if arguments["deviceType"].strip() == "No_device_types":
        # not a valid device type, skip it
        return vocabulary, theory, structure
    
    # set flags wether the device is a string or int device
    line = next((s for s in vocabulary if arguments["deviceType"].strip() in s), None) # search for the device type in the vocabulary
    is_int = True if line.endswith("NumberDevice") else False

    for i, line in enumerate(vocabulary):
        key = "NumberDevice" if is_int else "StringDevice"
        # add it to the correct device-group
        if f"type {key} :=" in line:
            if line.strip().endswith("{}"):
                # leave the "," if it is the first device
                new_input_string = f"{arguments['deviceName'].strip()}"
            else:
                new_input_string = f", {arguments['deviceName'].strip()}"
            updated_line = line.rstrip("}") + new_input_string + "}"
            vocabulary[i] = updated_line

        if f"type {arguments["deviceType"].strip()}Device :=" in line:
            endswith = "NumberDevice" if is_int else "StringDevice"
            # update the devicetype
            if line.strip().endswith(f"{{}} <: {endswith}"):
                # leave the "," if it is the first device
                new_input_string = f"{arguments['deviceName'].strip()}"
            else:
                new_input_string = f", {arguments['deviceName'].strip()}"
            updated_line = line.rstrip(f" <: {endswith}").rstrip("}") + new_input_string + f"}} <: {endswith}"
            vocabulary[i] = updated_line
    
    for i, line in enumerate(structure):
        key = "numberDeviceIsInArea" if is_int else "stringDeviceIsInArea"
        # update the device area relation
        if f"{key} :=" in line:
            if line.strip().endswith("{} ."):
                # leave the "," if it is the first device
                new_input_string = f"{arguments['deviceName'].strip()} -> {arguments['deviceArea'].strip()}"
            else:
                new_input_string = f", {arguments['deviceName'].strip()} -> {arguments['deviceArea'].strip()}"
            updated_line = line.rstrip("} .") + new_input_string + "} ."
            structure[i] = updated_line
            break
    return vocabulary, theory, structure

def new_device_type(vocabulary: list[str], theory: list[str], structure: list[str], arguments: dict[str, str]) -> tuple[list[str], list[str], list[str]]:
    """
    Create a new device type in the vocabulary, theory and structure code.

    Args:
        vocabulary (list[str]): The current vocabulary code.
        theory (list[str]): The current theory code.
        structure (list[str]): The current structure code.
        arguments (dict[str, str]): The arguments for the function. KEY: argument name, VALUE: argument value.

    Returns:
        tuple (tuple[list[str], list[str], list[str]]): The updated vocabulary, theory and structure code.
    """
    if arguments["deviceTypeName"].strip() == "No_device_types":
        # not a valid device type, skip it
        return vocabulary, theory, structure

    # set flags wether the device is a string or int device
    is_int = True if arguments['deviceTypeStates'][0]["type"] == "number" else False

    key = "NumberDevice" if is_int else "StringDevice"
    vocabulary.append(f"\ttype {arguments['deviceTypeName'].strip()}Device := {{}} <: {key}")

    if is_int:
        formatted_states = arguments["deviceTypeStates"][0]["range"]
        formatted_states = f"{formatted_states['min']}..{formatted_states['max']}"
        key = "Int"
    else:
        formatted_states = arguments['deviceTypeStates'][0]["states"].split(",")
        formatted_states = [state.strip() for state in formatted_states]
        formatted_states = ', '.join(formatted_states)
        key = "StringState"

    vocabulary.append(f"\ttype {arguments['deviceTypeName'].strip()}DeviceStates := {{{formatted_states}}} <: {key}")

    #theory.append(f"\t!dt in {arguments['deviceTypeName'].strip()}Device: ?x in {arguments['deviceTypeName'].strip()}DeviceStates: deviceIsInState(dt) = x.") # make sure only the defined states show up in the IC
    return vocabulary, theory, structure

def new_area_relation(vocabulary: list[str], theory: list[str], structure: list[str], arguments: dict[str, str]) -> tuple[list[str], list[str], list[str]]:
    """
    Create a new area relation in the vocabulary, theory and structure code.

    Args:
        vocabulary (list[str]): The current vocabulary code.
        theory (list[str]): The current theory code.
        structure (list[str]): The current structure code.
        arguments (dict[str, str]): The arguments for the function. KEY: argument name, VALUE: argument value.

    Returns:
        tuple (tuple[list[str], list[str], list[str]]): The updated vocabulary, theory and structure code.
    """
    # search for the correct line in the structure code and add the new subArea-superArea pair
    for i, line in enumerate(structure):
        if "areaIsSubAreaOf :=" in line:
            if line.strip().endswith("{} ."):
                # leave the "," if it is the first subArea-superArea pair
                new_input_string = f"({arguments['subArea'].strip()}, {arguments['superArea'].strip()})"
            else:
                new_input_string = f", ({arguments['subArea'].strip()}, {arguments['superArea'].strip()})"
            updated_line = line.rstrip("} .") + new_input_string + "} ."
            structure[i] = updated_line # update the structure code
            break
    return vocabulary, theory, structure
    
def areas(vocabulary: list[str], theory: list[str], structure: list[str], arguments: dict[str, str]) -> tuple[list[str], list[str], list[str]]:
    """
    Create a new area in the vocabulary, theory and structure code.

    Args:
        vocabulary (list[str]): The current vocabulary code.
        theory (list[str]): The current theory code.
        structure (list[str]): The current structure code.
        arguments (dict[str, str]): The arguments for the function. KEY: argument name, VALUE: argument value.

    Returns:
        tuple (tuple[list[str], list[str], list[str]]): The updated vocabulary, theory and structure code.
    """
    new_input_string = ""
    for i, line in enumerate(vocabulary):
        if "type Area :=" in line:
            if line.strip().endswith("{}"):
                for j, key in enumerate(arguments.keys()):
                    if j == 0:
                        new_input_string += f"{key.strip()}"
                    else:
                        new_input_string += f", {key.strip()}"
            else:
                for j, key in enumerate(arguments.keys()):
                    new_input_string += f", {key.strip()}"
            updated_line = line.rstrip("}") + new_input_string + "}"
            vocabulary[i] = updated_line
            break
    return vocabulary, theory, structure

def states(vocabulary: list[str], theory: list[str], structure: list[str], arguments: dict[str, str]) -> tuple[list[str], list[str], list[str]]:
    """
    Create a new state in the vocabulary, theory and structure code.

    Args:
        vocabulary (list[str]): The current vocabulary code.
        theory (list[str]): The current theory code.
        structure (list[str]): The current structure code.
        arguments (dict[str, str]): The arguments for the function. KEY: argument name, VALUE: argument value.

    Returns:
        tuple[list[str], list[str], list[str]]: The updated vocabulary, theory and structure code.
    """
    new_input_string = ""
    for i, line in enumerate(vocabulary):
        if "type StringState :=" in line:
            if line.strip().endswith("{}"):
                for j, key in enumerate(arguments.keys()):
                    if j == 0:
                        new_input_string += f"{key.strip()}"
                    else:
                        new_input_string += f", {key.strip()}"
            else:
                for j, key in enumerate(arguments.keys()):
                    new_input_string += f", {key.strip()}"
            updated_line = line.rstrip("}") + new_input_string + "}"
            vocabulary[i] = updated_line
            break
    return vocabulary, theory, structure

def _parse_single_rule(rule: dict[str, str]) -> str:
    """
    parse a single rule based on its type and return the correct fodot rule

    Args:
        rule (dict[str, str]): The rule that needs to be parsed
    
    Returns:
        string (string): The parsed fodot rule (no '.' is added after the rule, so if used as a standalone, it should be added)
    """
    fo_dot_rule = ""
    # Thijs ni vergete van het type argument nog toe te voegen aan de js
    match rule["type"]:
        case "equivalence":
            fo_dot_rule = f"deviceIsInState({rule['sensor_name'].strip()}) = {rule['sensor_state'].strip()} <=> deviceIsInState({rule['actuator_name'].strip()}) = {rule['actuator_state'].strip()}"
        case "for_all_of_devicetype":
            fo_dot_rule = f"!DT in {rule['deviceTypeName'].strip()}: "
            for i, rule in enumerate(rule["rules"]):
                rule["actuator_name"] = "DT"
                rule["type"] = "equivalence"
                if i == 0:
                    fo_dot_rule += f"{_parse_single_rule(rule)}"
                else:
                    fo_dot_rule += f" & {_parse_single_rule(rule)}"
        case "for_all_in_area_of_devicetype":
            fo_dot_rule = ""
            orig_rule = rule.copy()
            for i, rule in enumerate(orig_rule["rules"]):
                if orig_rule['deviceTypeName'].strip().startswith("STRING_"):
                    fo_dot_rule += f"!d in {orig_rule['deviceTypeName'].strip().removeprefix("STRING_")}: (stringDeviceIsInArea(d) = {orig_rule['areaName'].strip()} & stringDeviceIsInState({rule['sensor_name'].strip()}) = {rule['sensor_state'].strip()}) <=> stringDeviceIsInState(d) = {rule['actuator_state'].strip()}"
            for i, rule in enumerate(orig_rule["rules"]):
                if orig_rule['deviceTypeName'].strip().startswith("INT_"):
                    fo_dot_rule += f"!d in {orig_rule['deviceTypeName'].strip().removeprefix("INT_")}: (stringDeviceIsInArea(d) = {orig_rule['areaName'].strip()} & stringDeviceIsInState({rule['sensor_name'].strip()}) = {rule['sensor_state'].strip()}) <=> stringDeviceIsInState(d) = {rule['actuator_state'].strip()}"
        case _:
            pass
    return fo_dot_rule

def new_rule_for_all_devices_in_area(vocabulary: list[str], theory: list[str], structure: list[str], arguments: dict[str, str]) -> tuple[list[str], list[str], list[str]]:
    """
    Create a new rule for all devices in an area in the vocabulary, theory and structure code.

    Args:
        vocabulary (list[str]): The current vocabulary code.
        theory (list[str]): The current theory code.
        structure (list[str]): The current structure code.
        arguments (dict[str, str]): The arguments for the function. KEY: argument name, VALUE: argument value.

    Returns:
        tuple (tuple[list[str], list[str], list[str]]): The updated vocabulary, theory and structure code.
    """
    theory.append(f"\t{_parse_single_rule(arguments)}.")
    return vocabulary, theory, structure

def new_rule_for_all_devices_of_type(vocabulary: list[str], theory: list[str], structure: list[str], arguments: dict[str, str]) -> tuple[list[str], list[str], list[str]]:
    """
    Create a new rule for all devices of a type in the vocabulary, theory and structure code.

    Args:
        vocabulary (list[str]): The current vocabulary code.
        theory (list[str]): The current theory code.
        structure (list[str]): The current structure code.
        arguments (dict[str, str]): The arguments for the function. KEY: argument name, VALUE: argument value.

    Returns:
        tuple (tuple[list[str], list[str], list[str]]): The updated vocabulary, theory and structure code.
    """
    for rule in json.loads(arguments['rules']):
        rule["deviceTypeName"] = arguments["deviceTypeName"]
        theory.append(f"\t{_parse_single_rule(rule)}.")
    return vocabulary, theory, structure

def new_single_rule(vocabulary: list[str], theory: list[str], structure: list[str], arguments: dict[str, str]) -> tuple[list[str], list[str], list[str]]:
    """
    Create a new single rule in the vocabulary, theory and structure code.

    Args:
        vocabulary (list[str]): The current vocabulary code.
        theory (list[str]): The current theory code.
        structure (list[str]): The current structure code.
        arguments (dict[str, str]): The arguments for the function. KEY: argument name, VALUE: argument value.

    Returns:
        tuple (tuple[list[str], list[str], list[str]]): The updated vocabulary, theory and structure code.
    """
    theory.append(f"\t{_parse_single_rule(arguments['rule'])}.")
    return vocabulary, theory, structure
