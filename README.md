# JeonseHelper

JeonseHelper is a static, JSON-driven Next.js guide for jeonse basics, fraud prevention, and response workflows. Content lives under `docs/research` and is validated with the Zod schema in `src/lib/content-schema.ts`.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the app.

## Verification

Run the full quality gate before finishing changes:

```bash
npm run check
```

The full check runs lint, TypeScript, content validation, unit tests, and a production build.

Useful individual commands:

```bash
npm run lint
npm run typecheck
npm run validate:content
npm test
npm run build
```
