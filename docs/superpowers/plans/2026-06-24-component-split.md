# Component Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the large document viewer into reusable components without changing current behavior.

**Architecture:** Keep `DocumentViewer` as the stateful client shell. Move presentational and reusable UI into focused components under `src/components/document-viewer/`, with shared types and constants colocated in the same feature folder.

**Tech Stack:** Next.js App Router, React, TypeScript, lucide-react.

---

## File Structure

- Create: `src/components/document-viewer/document-viewer-types.ts` for shared viewer types.
- Create: `src/components/document-viewer/document-viewer-constants.ts` for document labels and chapter config.
- Create: `src/components/document-viewer/document-viewer-utils.ts` for `getVisibleChapters` and `getExpandableIds`.
- Create: `src/components/document-viewer/topbar.tsx` for brand, mobile menu button, and search.
- Create: `src/components/document-viewer/sidebar.tsx` for chapter navigation, current document TOC, and expand/collapse controls.
- Create: `src/components/document-viewer/document-content.tsx` for article hero and section rendering.
- Create: `src/components/document-viewer/question-block.tsx` for representative question rendering.
- Create: `src/components/document-viewer/question-meta.tsx` for actions, documents, agencies, deadline, and sources.
- Create: `src/components/document-viewer/followup-item.tsx` for first-level and child questions.
- Modify: `src/components/document-viewer.tsx` to become the state shell.

## Tasks

### Task 1: Extract Shared Types, Constants, and Utilities

- [ ] Move `DocumentViewerProps`, `DocumentContentProps`, label config, chapter config, `getVisibleChapters`, and `getExpandableIds` into focused files.

### Task 2: Extract Shell Components

- [ ] Move top bar JSX into `Topbar`.
- [ ] Move sidebar JSX into `Sidebar`.

### Task 3: Extract Content Components

- [ ] Move article rendering into `DocumentContent`.
- [ ] Move question rendering into `QuestionBlock`.
- [ ] Move metadata rendering into `QuestionMeta`.
- [ ] Move followup rendering into `FollowupItem`.

### Task 4: Verify

- [ ] Run `npm run validate:content`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run a Playwright smoke check for navigation, expand/collapse, and mobile sidebar.

