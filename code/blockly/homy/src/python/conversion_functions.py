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
    if arguments["deviceType"].strip().capitalize() == "No_device_types":
        # not a valid device type, skip it
        return vocabulary, theory, structure
    for i, line in enumerate(vocabulary):
        if "type Device :=" in line:
            if line.strip().endswith("{}"):
                # leave the "," if it is the first device
                new_input_string = f"{arguments['deviceName'].strip()}"
            else:
                new_input_string = f", {arguments['deviceName'].strip()}"
            updated_line = line.rstrip("}") + new_input_string + "}"
            vocabulary[i] = updated_line
        if f"type {arguments["deviceType"].strip().capitalize()}Device :=" in line:
            if line.strip().endswith("{} <: Device"):
                # leave the "," if it is the first device
                new_input_string = f"{arguments['deviceName'].strip()}"
            else:
                new_input_string = f", {arguments['deviceName'].strip()}"
            updated_line = line.rstrip("} <: Device") + new_input_string + "} <: Device"
            vocabulary[i] = updated_line
    
    for i, line in enumerate(structure):
        if "deviceIsInArea :=" in line:
            if line.strip().endswith("{} ."):
                # leave the "," if it is the first device
                new_input_string = f"({arguments['deviceName'].strip()} -> {arguments['deviceArea'].strip()})"
            else:
                new_input_string = f", ({arguments['deviceName'].strip()} -> {arguments['deviceArea'].strip()})"
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
    if arguments["deviceTypeName"].strip().capitalize() == "No_device_types":
        # not a valid device type, skip it
        return vocabulary, theory, structure
    vocabulary.append(f"\ttype {arguments['deviceTypeName'].strip().capitalize()}Device := {{}} <: Device")
    formatted_states = arguments['deviceTypeStates'][0].split(",")
    formatted_states = ', '.join(formatted_states)
    vocabulary.append(f"\ttype {arguments['deviceTypeName'].strip().capitalize()}DeviceStates := {{{formatted_states}}}")
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

# def states(vocabulary: list[str], theory: list[str], structure: list[str], arguments: dict[str, str]) -> tuple[list[str], list[str], list[str]]:
#     """
#     Create a new state in the vocabulary, theory and structure code.
# 
#     Args:
#         vocabulary (list[str]): The current vocabulary code.
#         theory (list[str]): The current theory code.
#         structure (list[str]): The current structure code.
#         arguments (dict[str, str]): The arguments for the function. KEY: argument name, VALUE: argument value.
# 
#     Returns:
#         tuple[list[str], list[str], list[str]]: The updated vocabulary, theory and structure code.
#     """
#     pass
