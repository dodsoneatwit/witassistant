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
    return response