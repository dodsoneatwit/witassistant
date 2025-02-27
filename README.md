# WISE (Wentworth Intelligent Support Entity)



## About

This project aims to answer the Wentworth community’s many questions by creating an AI chatbot that scrapes data from Wentworth-related social media, websites, emails, and events. Additional information will be sourced from Wentworth’s location to answer questions on nearby attractions, museums, and restaurants as well as from popular student resources such as ratemyprofessor.com. Answers from the bot will link back to relevant sources so users can verify the information or read more in depth on the topic.  

WISE can positively impact all members of the Wentworth community. Students can quickly find answers to straightforward questions, which will in turn reduce the workload on advisors who often must answer the same questions repeatedly, and it will allow all students, faculty, and staff to go to events and utilize resources by raising their awareness of what is currently happening and available. The positive impact on campus will extend to the local community as well, with WIT Assistant’s ability to inform users of what businesses are nearby. Overall, our goal is to improve the availability and accessibility of information regarding our school and community. 

## Initial Setup

Install the latest version of Node.js here at [nodejs.org](https://nodejs.org/en/download/package-manager)!

Install the latest version of Python at [python.org](https://www.python.org/downloads/)!

## Starting the Server

1. Navigate into the back-end environment using the terminal and enter <b>cd lib/src</b>

2. Enter the command <b> python server.py</b> to start the server

3. Server should run on <b>localhost:5173</b> (shows in terminal when running <b>npm run dev</b>)

<b>Note</b>: If <b>localhost</b> connection does not respond, connect to the IP address instead
instead by redirecting the URL in <b>witassistant/lib/src/main.py</b> and 
<b>witassistant/wit-assistant-web/src/stores/messages.ts</b> to <b>http://127.0.0.1:5000/api/q&a</b>

## Running the Front-End With Vue.js

1. Navigate into the UI environment using the terminal while entering <b>cd wit-assistant-web</b>

2. Run <b>npm install</b> and wait for packages to successfully install
   <b>NOTE:</b> If you get an error, try running <b>npm install --legacy-peer-deps</b> or 
   <b>npm install --force</b>. An the error message may mention these

3. Run <b>npm run dev</b> to start up the environment. A URL will populate within the terminal
   for you to navigate to.

## PIP commands for reference

<b>Separate Commands:</b>
- pip install beautifulsoup4
- pip install re (comes with Python's standard library, no need to install)
- pip install copy (comes with Python's standard library, no need to install)
- pip install os (comes with Python's standard library, no need to install)
- pip install python-dotenv
- pip install langchain
- pip install langchain-chroma
- pip install langchain-community
- pip install langchain-core
- pip install langchain-openai
- pip install langchain-ai21
- pip install langchain-pinecone
- pip install requests
- pip install unstructured
- pip install pinecone-client
- pip install ratemyprofessor
- pip install urllib3 (urlparse and urljoin come with Python's standard library)
- pip install getpass (comes with Python's standard library, no need to install)

<b>Single Line Command:</b> 
- pip install beautifulsoup4 python-dotenv langchain langchain-chroma langchain-community langchain-core langchain-openai langchain-ai21 langchain-pinecone requests unstructured pinecone-client ratemyprofessor urllib3


## Authors

- Elijah Dodson
- Mason Osborn
- Devin Macmillan
