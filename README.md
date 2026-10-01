# AI Support Triage Console

A modern customer-support operations workspace that helps agents triage conversations, understand customer issues quickly, prioritize risk, and draft better responses with AI-assisted guidance.

## Overview

This project was originally a basic chat application built on top of React Chat Engine. It has been redesigned into a standalone support operations product that demonstrates customer-service workflow thinking, triage logic, agent assistance, and human-in-the-loop decision making.

## Features

- Customer support queue
- Ticket search and filtering
- Priority and status signals
- Customer sentiment context
- AI-generated issue summaries
- AI-assisted recommended responses
- Agent-controlled reply workflow
- Open, Pending, and Resolved statuses
- Local browser persistence
- Queue-level metrics
- Responsive support dashboard
- No dependency on an external chat backend

## Support Workflow

Each support ticket surfaces:

- Customer issue
- Ticket category
- Priority
- Sentiment
- Current status
- AI-generated summary
- Recommended response guidance

The agent can review the AI suggestion, edit the final reply, and control the customer-facing action.

## Human-in-the-Loop Design

AI assists with understanding and drafting, but does not automatically send customer-facing responses.

This keeps the agent responsible for:

- final response quality
- escalation decisions
- workflow status
- customer communication

## Tech Stack

- React
- Vite
- Lucide React
- CSS
- Local Storage

## Run Locally

```bash
git clone https://github.com/DhritiGada/chat-o-matic.git
cd chat-o-matic
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The production output is generated in:

```text
dist/
```

## Project Evolution

The original Chat-o-Matic implementation depended on React Chat Engine credentials and an external hosted chat backend.

The redesigned version removes that dependency and reframes the project as an AI-assisted support triage console focused on support operations, prioritization, structured issue understanding, and human-controlled resolution.
