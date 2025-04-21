from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/run-python', methods=['POST'])
def run_python():

    data = request.get_json()  # Receive JSON data from JavaScript
    code = data.get("text", "")  # Extract the "text" field

    subprocess.Popen(["python3", "src/python/convert.py", code])  # Non-blocking execution
    return jsonify({"message": "Python script started"}), 202

if __name__ == '__main__':
    app.run(port=7000)
