# WorkFlow AI — AI Workplace Productivity Assistant

A modern, responsive SaaS web application that helps professionals automate daily workplace tasks with Artificial Intelligence. Built with **TanStack Start**, **React 19**, **TypeScript**, and **Tailwind CSS**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20App-4B5563?style=flat-square&logo=vercel)](https://workpulse-ai-suite.lovable.app)
[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-10B981?style=flat-square&logo=lovable)](https://lovable.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

---

## Overview

**WorkFlow AI** is an all-in-one AI workspace designed to streamline common professional tasks. It combines a clean, corporate-grade dashboard with five specialised AI tools, each powered by structured prompt engineering and a neutral, modern design system.

The application is fully responsive across desktop, tablet, and mobile, and includes a collapsible sidebar, breadcrumb navigation, and previous/next feature navigation for a polished user experience.

---

## Features

### Dashboard
- Welcome banner with quick-action shortcuts
- Productivity overview cards with progress indicators
- Card-based navigation to every AI tool

### Smart Email Generator
Generate professional emails with:
- **Purpose** — what the email is about
- **Recipient** — who it is for
- **Tone** — Formal, Friendly, or Persuasive
- **Audience** — Client, Manager, or Team

Outputs a structured email with a subject line, body, and closing.

### Meeting Notes Summarizer
Paste raw meeting notes or transcripts and receive:
- Executive Summary
- Key Points
- Decisions Made
- Action Items
- Deadlines
- Responsible Persons

### AI Task Planner
Turn a list of tasks into an actionable day plan:
- Task priorities
- Suggested daily schedule
- Time estimates
- Productivity recommendations

### AI Research Assistant
Research any workplace topic and get:
- Summary
- Key Insights
- Recommendations
- Suggested References

### AI Chatbot
- Interactive chat history
- Streaming AI responses
- Typing indicator
- Scrollable conversation interface
- Session persistence in the browser

---

## Design System

The UI uses a neutral, professional palette suitable for corporate environments:

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#F8F9FA` | Page canvas |
| Sidebar | `#FFFFFF` | Navigation surface |
| Primary Text | `#1F2937` | Headings and body text |
| Secondary Text | `#6B7280` | Captions and metadata |
| Borders | `#E5E7EB` | Cards, dividers, inputs |
| Primary Buttons | `#4B5563` | Primary actions |
| Success | `#10B981` | Positive states and badges |

---

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) — full-stack React framework with SSR/SSG and server functions
- **Routing:** [TanStack Router](https://tanstack.com/router) — file-based routing
- **UI Library:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 with custom CSS theme variables
- **Components:** Radix UI primitives + shadcn/ui patterns
- **AI SDK:** `ai` + `@ai-sdk/react` for streaming and server-side generation
- **Icons:** Lucide React
- **State:** React hooks and TanStack Query
- **Forms & Validation:** React Hook Form + Zod
- **Build Tool:** Vite 8

---

## Project Structure

```text
src/
├── components/          # Shared UI components (sidebar, breadcrumbs, AI output cards)
├── lib/                 # Server functions, AI gateway helpers, and utilities
├── routes/              # TanStack file-based routes
│   ├── index.tsx        # Dashboard
│   ├── email-generator.tsx
│   ├── meeting-summarizer.tsx
│   ├── task-planner.tsx
│   ├── research-assistant.tsx
│   ├── chat.tsx
│   ├── api/chat.ts      # Streaming chatbot API route
│   └── __root.tsx       # Root layout with sidebar and breadcrumbs
├── styles.css           # Global theme tokens and Tailwind imports
├── router.tsx           # Router configuration
└── start.ts             # TanStack Start entry configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS recommended)
- [Bun](https://bun.sh) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Install dependencies
bun install
# or
npm install
```

### Development

```bash
bun run dev
# or
npm run dev
```

The development server starts at `http://localhost:8080`.

### Build

```bash
bun run build
# or
npm run build
```

---

## AI Configuration

The application uses the Lovable AI Gateway. The following environment variables are required for AI features in production:

```bash
LOVABLE_API_KEY=your_lovable_api_key
```

AI prompts are structured server-side in `src/lib/ai.functions.ts` to ensure consistent, professional, and business-appropriate outputs. Every AI-generated response is displayed with the disclaimer:

> AI-generated content may require human review.

---

## Deployment

This project is configured for deployment through **Lovable**. The production build is optimised for edge/serverless runtimes.

- **Preview URL:** https://id-preview--fc24d9fa-2477-445b-a21f-d3b430ad3b94.lovable.app
- **Published URL:** https://workpulse-ai-suite.lovable.app

To deploy your own fork, connect the project to GitHub from the Lovable editor and publish via the Lovable dashboard.

---

## Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start the Vite development server |
| `build` | Create an optimised production build |
| `build:dev` | Create a development-mode build |
| `preview` | Preview the production build locally |
| `lint` | Run ESLint across the project |
| `format` | Format the codebase with Prettier |

---

## License

This project is provided as-is for demonstration and educational purposes. Refer to your workspace or organisation agreement for commercial usage terms.

---

Built using [Lovable](https://lovable.dev).
