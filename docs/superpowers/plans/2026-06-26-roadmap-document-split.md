# Roadmap Document Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the combined suspected-fraud roadmap into six real `1-x` documents so the `1. 피해 대응` navigation works like the existing `0. 이해와 예방` chapter.

**Architecture:** Keep the existing `ContentDocument` schema. Generate five new JSON documents from the current roadmap sections, rewrite `suspected-fraud-roadmap.json` as the `1-1` overview document, and register all six slugs in the existing loader and navigation constants.

**Tech Stack:** Next.js, React, TypeScript, Zod content validation, JSON content files.

---

### Task 1: Content Document Split

**Files:**
- Modify: `docs/research/suspected-fraud-roadmap.json`
- Create: `docs/research/current-situation-diagnosis.json`
- Create: `docs/research/victim-support-application.json`
- Create: `docs/research/housing-decision.json`
- Create: `docs/research/deposit-recovery-process.json`
- Create: `docs/research/long-term-response-management.json`

- [ ] **Step 1: Generate split documents**

Use a Node script to parse the existing combined JSON. Keep section `s1` through `s5` content intact in the five new files. Replace `suspected-fraud-roadmap.json` with a concise overview section that links the full response flow conceptually.

- [ ] **Step 2: Validate JSON shape**

Run: `npm run validate:content`

Expected: all six roadmap-related documents plus the two existing `0-x` documents pass `contentDocumentSchema`.

### Task 2: Loader And Navigation

**Files:**
- Modify: `src/lib/content-loader.ts`
- Modify: `src/components/document-viewer/document-viewer-constants.ts`
- Modify: `src/components/document-viewer/sidebar.tsx`

- [ ] **Step 1: Register new documents**

Import the five new JSON files in `content-loader.ts` and add slugs in navigation order:

- `suspected-fraud-roadmap`
- `current-situation-diagnosis`
- `victim-support-application`
- `housing-decision`
- `deposit-recovery-process`
- `long-term-response-management`

- [ ] **Step 2: Update labels and chapter config**

Set `documentLabels` to map these slugs to `1-1.` through `1-6.`. Set `chapterConfig[1].slugs` to the same ordered slug list.

- [ ] **Step 3: Remove pseudo-section navigation**

Remove the temporary sidebar logic that renders `suspected-fraud-roadmap` sections as `nav-section-item` links. Sidebar entries should only render real documents.

### Task 3: Diagnosis Roadmap Placement

**Files:**
- Modify: `src/components/document-viewer/document-content.tsx`

- [ ] **Step 1: Move diagnosis UI trigger**

Render `DiagnosisRoadmap` when the active document is `현재 상황 진단하기` and the section id is `s1`. Do not render it on the `1-1` overview page.

### Task 4: Verification

**Files:**
- Test existing code and rendered app.

- [ ] **Step 1: Run static checks**

Run:

```bash
npm run lint
npm run typecheck
npm run validate:content
node --import tsx --test src/lib/content-utils.test.ts src/components/document-viewer/document-viewer-utils.test.ts
```

Expected: all commands pass.

- [ ] **Step 2: Browser check**

Open the app and verify the left navigation shows `1-1` through `1-6` as real document entries. Click at least `1-1`, `1-2`, and `1-6`; each should change the `doc` query param and render a distinct page title.
