# Tech Stack

## Recommendation

Use a static JSON-driven web app first.

Recommended stack:

- Next.js
- TypeScript
- Zod or JSON Schema for content validation
- Markdown-compatible inline renderer for answers
- Static JSON files under `docs/research` or a future `content/` directory
- Client-side search for the first version
- Static hosting through Vercel, Cloudflare Pages, or similar

## Why This Fits

- The first product is content-heavy and read-oriented.
- JSON documents can be validated before deployment.
- Question-tree content maps cleanly to table of contents, search, expand/collapse, and situation filters.
- Static deployment keeps operations simple.
- The schema can later move to a CMS or database without changing the viewer concept.

## Initial App Capabilities

- Render question-tree JSON.
- Validate unique IDs and `hasChildren` references.
- Show source metadata and verification dates.
- Support search across question, answer, actions, documents, and agencies.
- Support expand/collapse and deep links.
- Render tooltip syntax, prompt blocks, code blocks, and image placeholders.

## Deferred Capabilities

- User progress tracking
- Personalized checklist state
- CMS admin screen
- Scheduled source freshness checks
- Multilingual content
- Case timeline builder

## Quality Gates

Before finishing implementation work:

- Run lint.
- Run type check.
- Run content schema validation.
- Test representative desktop and mobile layouts.

