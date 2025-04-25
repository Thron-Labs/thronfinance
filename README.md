# Thron Finance AI Agent 🤖
This is an AI financial agent.  This agent helps you to explore the use of AI for investment research.



<img width="1709" alt="Screenshot 2025-01-06 at 5 53 59 PM" src="https://github.com/user-attachments/assets/7ef1729b-f2e1-477c-99e2-1184c1bfa1cd" />

## Disclaimer

- No warranties or guarantees provided
- Past performance does not indicate future results
- Creator assumes no liability for financial losses
- Consult a financial advisor for investment decisions

By using this software, you agree to use it solely for learning purposes.

## Table of Contents 📖
- [Features](#features)
- [Setup](#setup)
- [Run the Agent](#run-the-agent)
- [Financial Data API](#financial-data-api)
- [Deploy Your Own Agent](#deploy-your-own-agent)

## Features
- [AI Financial Agent](https://chat.financialdatasets.ai)
  - Productized version of this project
  - Chat assistant for financial research, stock analysis, and more
  - Uses generative UI to display stock prices, fundamentals, and more
- [Financial Datasets API](https://financialdatasets.ai)
  - Access to real-time and historical stock market data
  - Data is optimized for AI financial agents
  - 30+ years of financial data with 100% market coverage
  - Documentation available [here](https://docs.financialdatasets.ai)

## Setup

```bash
git clone https://github.com/Thron-Labs/thronfinance.git
cd thronfinance
```

> If you do not have npm installed, please install it from [here](https://nodejs.org/en/download/).

1. Install pnpm (if not already installed):
```bash
npm install -g pnpm
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your environment variables:
```bash
# Create .env file for your API keys
cp .env.example .env
```

Set the API keys in the .env file:
```
# Get your OpenAI API key from https://platform.openai.com/
OPENAI_API_KEY=your-openai-api-key

# Get your Financial Datasets API key from https://financialdatasets.ai/
FINANCIAL_DATASETS_API_KEY=your-financial-datasets-api-key

# Get your LangSmith API key from https://smith.langchain.com/
LANGCHAIN_API_KEY=your-langsmith-api-key
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=thronfinance
```

**Important**: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

## Run the Agent

After completing the steps above, simply run the following command to start the development server:
```bash
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).

## Financial Data API

This template uses the [Financial Datasets API](https://financialdatasets.ai) as the financial data provider.  The Financial Datasets API is specifically designed for AI financial agents and LLMs.

The Financial Datasets API provides real-time and historical stock market data and covers 100% of the US market over the past 30 years.  

Data includes financial statements, stock prices, options data, insider trades, institutional ownership, and much more.  You can learn more about the API via the documentation [here](https://docs.financialdatasets.ai).



