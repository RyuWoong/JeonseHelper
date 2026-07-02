# GitBook Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the starter screen with a GitBook-like two-column document viewer for the question-tree JSON content.

**Architecture:** Keep content loading server-side in `src/app/page.tsx`, then pass parsed JSON to a client viewer component for search, document switching, and expand/collapse. Use a left sidebar for document navigation and a central reading pane that renders sections, representative questions, followups, child questions, actions, documents, agencies, deadlines, and sources.

**Tech Stack:** Next.js App Router, React, TypeScript, Zod, CSS modules via global CSS, lucide-react icons.

---

## File Structure

- Create: `src/components/document-viewer.tsx` for the interactive document shell.
- Create: `src/lib/content-utils.ts` for small text search and count helpers.
- Modify: `src/app/page.tsx` to render `DocumentViewer`.
- Modify: `src/app/globals.css` for the GitBook-like layout.
- Modify: `package.json` through `npm install lucide-react`.

## Tasks

### Task 1: Add UI Dependency

- [ ] Install `lucide-react` for search, menu, chevron, source, and document icons.
- [ ] Run `npm install`.

### Task 2: Add Content Helpers

- [ ] Create `src/lib/content-utils.ts`.
- [ ] Add `countQuestions(document)` to count visible and child questions.
- [ ] Add `documentMatchesQuery(document, query)` to filter documents by title, section, question, answer, action, document, agency, and source text.

### Task 3: Add Document Viewer

- [ ] Create `src/components/document-viewer.tsx` as a client component.
- [ ] Add state for selected document, mobile sidebar, search query, and expanded followups.
- [ ] Render left navigation and central reading pane.
- [ ] Render followups and child questions with accessible buttons.

### Task 4: Wire Page and Styles

- [ ] Modify `src/app/page.tsx` to pass `getContentDocuments()` into the viewer.
- [ ] Replace starter CSS with document-app layout styles.
- [ ] Verify mobile sidebar behavior and readable text.

### Task 5: Verify

- [ ] Run `npm run validate:content`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.

