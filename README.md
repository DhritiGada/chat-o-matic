# AI Support Triage Console

## Live Demo

[Open the AI Support Triage Console](https://chat-o-matic-xi.vercel.app/)

A modern customer-support operations workspace for triaging conversations, understanding customer issues quickly, prioritizing risk, and drafting responses with AI-style assistance.

## Overview

This project was originally a basic chat application built on React Chat Engine. It has been redesigned into a standalone support operations product that demonstrates customer-service workflow thinking, triage logic, agent assistance, and human-in-the-loop decision making.

The current public prototype runs entirely in the browser and does **not** call a live AI model or external chat backend.

## Current Features

- Customer support queue
- Ticket search and filtering
- Priority and status signals
- Customer sentiment context
- Seeded issue summaries
- Seeded recommended-response guidance
- Agent-controlled reply workflow
- Open, Pending, and Resolved statuses
- Local browser persistence
- Queue-level metrics
- Responsive support dashboard
- No dependency on React Chat Engine or another external chat backend

## Support Workflow

Each support ticket surfaces:

- customer issue
- ticket category
- priority
- sentiment
- current status
- issue summary
- recommended response guidance

The agent can review the suggested response, edit the final reply, and control the workflow status.

## How the Assistance Works

The current prototype uses prewritten summary and response-guidance fields for the seeded tickets.

The **Use AI suggestion** action is a deterministic browser-side drafting workflow that combines the selected ticket's stored guidance with the customer's name. It is designed to demonstrate the product experience of agent assistance without claiming a live LLM integration.

No customer-facing message is sent to an external system. Sending a reply stores the response locally and updates the ticket status to Pending.

## Human-in-the-Loop Design

The product keeps the agent in control of:

- final response quality
- escalation decisions
- workflow status
- customer communication

The assistance layer is intentionally advisory in this public prototype.

## Persistence

Ticket state and drafted responses are stored in browser Local Storage so the demo can preserve changes without requiring a backend.

## Tech Stack

- React
- Vite
- Lucide React
- CSS
- Browser Local Storage

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

## Deployment

The application is deployed on Vercel:

[https://chat-o-matic-xi.vercel.app/](https://chat-o-matic-xi.vercel.app/)

## Project Evolution

The original Chat-o-Matic implementation depended on React Chat Engine credentials and an external hosted chat backend.

The redesigned version removes that dependency and reframes the project as a support triage console focused on prioritization, structured issue understanding, response guidance, and human-controlled resolution.

A future version could replace the seeded assistance layer with a live model-backed summarization and response-generation service.
