import os
import time
import requests
from dotenv import load_dotenv
from langchain_pinecone import Pinecone
from langchain_ai21 import AI21ContextualAnswers
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

load_dotenv()

# Access the environment variables
openai_api_key = os.getenv('OPENAI_API_KEY')
ai_twentyone_api_key = os.getenv('AI_TWENTYONE_API_KEY')
pinecone_api_key = os.getenv('PINECONE_API_KEY')
pc_index_wit = os.getenv('PINECONE_WIT_SEMANTIC')
url = os.getenv('FLASK_SERVER')

os.environ["AI21_API_KEY"] = ai_twentyone_api_key
os.environ['OPENAI_API_KEY'] = openai_api_key
os.environ['PINECONE_API_KEY'] = pinecone_api_key


generalWit = Pinecone(
    index_name=pc_index_wit,
    embedding=OpenAIEmbeddings()
)

tsm = AI21ContextualAnswers()
chain = tsm | StrOutputParser()

def get_api_response(url):
    response = requests.get(url)

    if response.status_code == 200:
        print(f"Successful api response: {response.text}")
        return response.text
    else:
        print(f"Failed to retrieve Q&A API response: {response.status_code}")
        return None


polling_interval = 5 # wait time to check for API response change
previous_question = None
current_question = get_api_response(url) # initializes first question if one exists

print("TESTING")
while (True):

    while (True):
        # Wait for the defined interval
        time.sleep(polling_interval)

        new_question = requests.get(url)
        current_question = new_question

        if current_question != previous_question and current_question != "":
            print("API data as changed!")
            print(f"New response: {current_question}")
            break
    

    current_question = previous_question

    # searchs for results within database that link to question
    query_result = generalWit.max_marginal_relevance_search(current_question, k=5, fetch_k=10)
    found_docs = ""

    # invokes a response from queried data and context
    for i, doc in enumerate(query_result):
        found_docs = found_docs + doc.page_content + " "
    response = chain.invoke(
        {"context": found_docs, "question": current_question},
    )

    # sends related links alongside response
    response += "\n\n --Related Links-- \n"
    for i in query_result:
        if i.metadata != {}:
            response += "i.metadata['source']\n"

    # posts answer to api to be retrieved from front-end
    payload = {
        'text': response
    }
    response = requests.post(url, json=payload)
    previous_question = current_question