import os
import time
import requests
from dotenv import load_dotenv
from langchain_pinecone import Pinecone
from langchain_ai21 import AI21ContextualAnswers
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

def process_links(response, links):

    no_dupes_links = list(set(links))
    response += ""
    num_of_links = 5
    for index in range(len(no_dupes_links)):
        if index == num_of_links:
            break
        response += no_dupes_links[index] + '\n'

    return response

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

def run_model(question):

    # searchs for results within database that link to question
    query_result = generalWit.max_marginal_relevance_search(question, k=5, fetch_k=10)
    found_docs = ""

    # invokes a response from queried data and context
    for i, doc in enumerate(query_result):
        found_docs = found_docs + doc.page_content + " "
    response = chain.invoke(
        {"context": found_docs, "question": question},
    )

    links = []
    num_of_links = 5
    for index in range(len(query_result)):
        if len(links) == num_of_links:
            break
        if query_result[index].metadata != {} and query_result[index].metadata['source'] not in links:
            links.append(query_result[index].metadata['source'])
    
    return response, links

def arrayToString(links):
    new_string = ""
    for i in links:
        new_string += i + "\n"
    return new_string