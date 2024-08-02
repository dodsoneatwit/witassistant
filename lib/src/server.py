# app.py
from main import *
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize a variable to hold the API text
api_text = ""

# retrieves text sent to server from UI
@app.route('/api/q&a', methods=['GET'])
def get_text():
    return jsonify({'text': api_text})

# sends AI generated response to UI for display
@app.route('/api/q&a', methods=['POST'])
def process_question():
    global api_text  # 

    if request.method == 'POST':
        # retrieve content in json format
        content = request.get_json()
        if content and 'text' in content:
            received_text = content['text']
            api_text = received_text  # Update the API text
            print(f"You sent: {received_text}") # Logs message sent from UI

            # runs RAG model for AI generated response adn links
            response, links = run_model(received_text)

            # displays helpful link message when AI fails to find answer
            if response == "Answer not in context":
                response = f"I'm not quite sure. This link may help instead: {links[0]}"
            return jsonify({'response': response, 'related_links': links})
        else:
            return jsonify({'error': 'Invalid JSON payload'}), 400
    else:
        return jsonify({'error': 'Only POST requests are allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True)