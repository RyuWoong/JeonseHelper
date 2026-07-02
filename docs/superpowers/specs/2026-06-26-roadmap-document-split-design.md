# Roadmap Document Split Design

## Goal

The `1. 피해 대응` chapter should behave like `0. 이해와 예방`: each numbered navigation entry opens its own document. `1-1` remains a short roadmap entry page, while the existing detailed roadmap sections become separate documents from `1-2` through `1-6`.

## Content Structure

- `1-1. 전세사기가 의심 돼요`: keep as a concise entry and overview document. It introduces the response roadmap and points users toward the next steps.
- `1-2. 현재 상황 진단하기`: move the current diagnosis section here, including the interactive `DiagnosisRoadmap`.
- `1-3. 전세사기 피해자로 인정받고 지원을 신청해요`: move the current victim decision and support section here.
- `1-4. 살던 집을 어떻게 할지 선택해요`: move the current housing decision section here.
- `1-5. 돈을 회수하는 절차를 따라가요`: move the current recovery procedure section here.
- `1-6. 장기전을 관리해요`: move the current long-term management section here.

Each split document keeps the existing content schema: one or more sections, questions, followups, child questions, and sources. IDs must remain unique within each document.

## App Changes

- Add the new JSON content files under `docs/research`.
- Register each new document in `src/lib/content-loader.ts`.
- Update `documentLabels` and `chapterConfig` so `1. 피해 대응` contains six real document slugs.
- Remove the temporary sidebar behavior that rendered roadmap sections as pseudo-document links.
- Render `DiagnosisRoadmap` based on the new diagnosis document slug or title, not the old combined roadmap document.

## Behavior

Selecting any `1-x` entry changes the active document, just like selecting `0-1` or `0-2`. The left navigation is the source of truth for numbering. Search filtering should continue to show matching documents grouped under their configured chapter.

## Verification

Run:

- `npm run lint`
- `npm run typecheck`
- `npm run validate:content`
- `node --import tsx --test src/lib/content-utils.test.ts src/components/document-viewer/document-viewer-utils.test.ts`

Browser verification should confirm that `1-1` through `1-6` are separate navigation entries and each opens a distinct document.
