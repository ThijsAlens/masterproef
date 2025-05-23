import sys
import re
import json
import os
import subprocess
import webbrowser
import time


from lzstring import LZString
from urllib.parse import quote

from conversion_functions import * 

def match_function(function: str, arguments: dict[str, str], vocabulary: list[str], theory: list[str], structure: list[str]) -> tuple[list[str], list[str], list[str]]:
    """
    Match the function to the corresponding function and call it.

    Args:
        function (str): The function to call.
        arguments (dict[str, str]): The arguments for the function. KEY: argument name, VALUE: argument value.
        vocabulary (list[str]): The current vocabulary code.
        theory (list[str]): The current theory code.
        structure (list[str]): The current structure code.

    Returns:
        tuple[list[str], list[str], list[str]]: The updated vocabulary, theory and structure code.
    """
    res: tuple[list[str], list[str], list[str]] = ()
    match function:
        case "NEW_DEVICE":
            res = new_device(vocabulary[:], theory[:], structure[:], arguments)         # copy the list to avoid changing the original
        case "NEW_DEVICE_TYPE":
            res = new_device_type(vocabulary[:], theory[:], structure[:], arguments)    
        case "NEW_AREA_RELATION":
            res = new_area_relation(vocabulary[:], theory[:], structure[:], arguments)  
        case "AREAS":
            res = areas(vocabulary[:], theory[:], structure[:], arguments)
        case "STATES":
            res = states(vocabulary[:], theory[:], structure[:], arguments)
        case "NEW_RULE":
            res = new_rule(vocabulary[:], theory[:], structure[:], arguments)
        
        case _:
            # no matching function found, return the unchanged code
            print(f"no matching function found for {function}\n")
            res = (vocabulary[:], theory[:], structure[:])
    # print(f"original_vocabulary: {vocabulary}")
    # print(f"original_theory: {theory}")
    # print(f"original_structure: {structure}")
    # print(f"result_vocabulary: {res[0]}")
    # print(f"result_theory: {res[1]}")
    # print(f"result_structure: {res[2]}")
    
    # print the changes made by the function
    vocab_diff = [item for item in res[0] if item not in vocabulary]
    theory_diff = [item for item in res[1] if item not in theory]
    structure_diff = [item for item in res[2] if item not in structure]

    if not vocab_diff and not theory_diff and not structure_diff:
        print(f"NO changes made for functioncall {function} with arguments {arguments}")
    else:
        print(f"after calling {function}")
    # Print the updated lines, skipping if no changes
    if vocab_diff:
        print("updated lines to vocabulary:")
        for item in vocab_diff:
            print(f"{item}")

    if theory_diff:
        print("updated lines to theory:")
        for item in theory_diff:
            print(f"{item}")

    if structure_diff:
        print("updated lines to structure:")
        for item in structure_diff:
            print(f"{item}")

    print("--------------------------------------------------------------------------------------------------------------------\n")
    
    return res
    
def write_file(code: str, file_path: str = "./output/homy_fo_dot.idp") -> None:
    """
    Write the vocabulary, theory and structure code to a file.

    Args:
        code (str): The code to write to the file.
        file_path (str): The path of the file to write to.

    Returns:
        None
    """
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w") as file:
        file.write(code)
    return

def parse(code: str) -> str:
    """
    Parse the semi-code generated by the blockly blocks into a valid FO(.) description.

    Args:
        code (str): The semi-code generated by the blockly blocks.

    Returns:
        str: The valid FO(.) description
    """

    vocabulary: list[str] = []
    theory: list[str] = []
    structure: list[str] = []

    # default code for the vocabulary
    vocabulary.append("vocabulary V {")
    vocabulary.append("\t// DEFAULT NEEDED TYPES AND FUNCTIONS")
    vocabulary.append("\ttype StringDevice := {}")
    vocabulary.append("\ttype NumberDevice := {}")
    vocabulary.append("\ttype StringState := {}")
    vocabulary.append("\ttype Area := {}")
    vocabulary.append("\ttime: () -> Int")
    vocabulary.append("\n")
    vocabulary.append("\tstringDeviceIsInArea: StringDevice -> Area")
    vocabulary.append("\tnumberDeviceIsInArea: NumberDevice -> Area")
    vocabulary.append("\t// subArea * superArea -> Bool")
    vocabulary.append("\tareaIsSubAreaOf: Area * Area -> Bool")
    vocabulary.append("\n")
    vocabulary.append("\tstringDeviceIsInState: StringDevice -> StringState")
    vocabulary.append("\tnumberDeviceIsInState: NumberDevice -> Int")
    vocabulary.append("\t// GENERATED VOCABULARY")
    vocabulary.append("\n")

    # default code for the theory
    theory.append("theory T : V {")

    # default code for the structure
    structure.append("structure S : V {")
    structure.append("\tstringDeviceIsInArea := {} .")
    structure.append("\tnumberDeviceIsInArea := {} .")
    structure.append("\tareaIsSubAreaOf := {} .")

    # split the code into single function-calls
    pattern = r'__(.*?)__\{\{(.*?)\}\}\n'
    re_matches = re.findall(pattern, code)

    # device types must be handled first, because they are needed for the other functions, so put them first in the matches list
    for re_match in re_matches:
        if re_match[0] == "NEW_DEVICE_TYPE":
            re_matches.remove(re_match)
            re_matches.insert(0, re_match)
    print(f"re_matches after: {re_matches}")

    for re_match in re_matches:
        function: str = re_match[0]
        arguments: dict = json.loads("{"+re_match[1]+"}")
        vocabulary, theory, structure = match_function(function, arguments, vocabulary[:], theory[:], structure[:])

    vocabulary.append("}")
    theory.append("}")
    structure.append("}")
    return "\n".join(vocabulary) + "\n" + "\n".join(theory) + "\n" + "\n".join(structure)

def open_ic(code_string: str) -> None:
    """
    Open the IC with the given code string.

    Args:
        code_string (str): The code string to open in the IC.

    Returns:
        None
    """
    lz = LZString()
    compressed = lz.compressToEncodedURIComponent(code_string)
    url_safe_compressed = quote(compressed)
    webbrowser.open_new_tab(f"http://localhost:5000/?{url_safe_compressed}")
    return

if __name__ == '__main__':
    code = sys.argv[1]

    print("--------------------------------------------------------------------------------------------------------------------")
    print("-------------------------------------------------------CODE---------------------------------------------------------")
    print("--------------------------------------------------------------------------------------------------------------------\n")
    print(f"{code}\n")
    print("--------------------------------------------------------------------------------------------------------------------")
    print("----------------------------------------------------CONVERSION------------------------------------------------------")
    print("--------------------------------------------------------------------------------------------------------------------\n")

    # process the code
    fo_dot_code = parse(code)
    write_file(fo_dot_code)

    # run the IC
    project_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src', 'IDP-Z3_github') # get the correct path to start the poetry
    # Current file: /.../homy/src/python/server.py
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Move up one level to /.../homy/src
    src_dir = os.path.dirname(current_dir)
    
    # Build full path to IDP-Z3_github
    project_dir = os.path.join(src_dir, "IDP-Z3_github")
    subprocess.Popen(["poetry", "run", "python3", "main.py"], cwd=project_dir)
    open_ic(code_string=fo_dot_code)
    