# app.py
from main import *
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize a variable to hold the API text
api_text = ""

@app.route('/api/q&a', methods=['GET'])
def get_text():
    return jsonify({'text': api_text})

@app.route('/api/q&a', methods=['POST'])
def process_question():
    global api_text  # 

    if request.method == 'POST':
        content = request.get_json()
        if content and 'text' in content:
            received_text = content['text']
            api_text = received_text  # Update the API text
            print(f"You sent: {received_text}")
            response = run_model(received_text)
            return jsonify({'response': response})
        else:
            return jsonify({'error': 'Invalid JSON payload'}), 400
    else:
        return jsonify({'error': 'Only POST requests are allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True)