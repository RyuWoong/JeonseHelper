# JeonseHelper Project Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up a Next.js + TypeScript project that can render and validate JeonseHelper's question-tree JSON content.

**Architecture:** Use Next.js App Router with static JSON content copied into the app source. Add a focused content schema module, a reusable validator, and npm scripts for lint, type check, and content validation.

**Tech Stack:** Next.js, React, TypeScript, Zod, ESLint, npm.

---

## File Structure

- Create: `package.json` for scripts and dependencies.
- Create: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `next-env.d.ts`.
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`.
- Create: `src/content/*.json` as app-consumable copies of research JSON.
- Create: `src/lib/content-schema.ts` for Zod schema and TypeScript types.
- Create: `src/lib/content-loader.ts` for static document registry.
- Create: `scripts/validate-content.mjs` for repository-level JSON validation.

## Tasks

### Task 1: Scaffold Next.js App Router

- [ ] Create the Next.js TypeScript app files.
- [ ] Install dependencies: `next`, `react`, `react-dom`, `zod`.
- [ ] Install dev dependencies: `typescript`, `eslint`, `eslint-config-next`, `@types/node`, `@types/react`, `@types/react-dom`.
- [ ] Run `npm install`.

### Task 2: Add Content Schema and Validation

- [ ] Define Zod schemas for `meta`, `sections`, `questions`, `followups`, `children`, and `sources`.
- [ ] Validate duplicate IDs.
- [ ] Validate `hasChildren: true` references.
- [ ] Validate child keys point to existing visible IDs.
- [ ] Add `npm run validate:content`.

### Task 3: Add Initial App Screen

- [ ] Render document titles and section summaries from JSON.
- [ ] Render a simple project-ready first screen, not a marketing landing page.
- [ ] Keep UI modest until visual design work starts.

### Task 4: Verify

- [ ] Run `npm run validate:content`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.

