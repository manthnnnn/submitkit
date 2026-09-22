# AutoResearch: Autonomous Multi-Agent LLM

An advanced framework built on LangChain and OpenAI. It spawns multiple AI agents that collaborate: one agent browses the web for raw data, another agent fact-checks, and a third synthesizes it into a markdown report.

## Features
- **LangChain Integration:** Advanced agentic chains and memory.
- **Tools:** DuckDuckGo search integration for live web data.
- **FastAPI Backend:** Triggers the research chain asynchronously.

## Setup Instructions
1. Install dependencies: `pip install -r requirements.txt`
2. Create a `.env` file with `OPENAI_API_KEY=your_key`
3. Run the server: `python app.py`
