# KRDS Analysis

## Why KRDS Fits JeonseHelper

JeonseHelper explains housing deposits, fraud prevention, official support, police reports, court procedures, and guaranty institution workflows. The product needs to feel trustworthy, readable, and procedural rather than expressive or promotional.

KRDS is a good reference because it is designed for public digital services that need consistency, accessibility, and efficient application across services.

## Official Principles To Reuse

KRDS describes design style as a core system for government sites that supports consistent user experience, government-service trust, and accessibility. It organizes design style into color, typography, shape, layout, icon, elevation, and design token areas.

JeonseHelper should reuse these principles:

- Consistency: repeated navigation, question, source, and action patterns should look and behave the same.
- Accessibility: color contrast, readable text size, keyboard-friendly disclosure controls, and clear focus states matter more than visual novelty.
- Efficiency: design decisions should be tokenized so the app can evolve without one-off CSS changes.

## Standard vs Adaptive

KRDS separates standard style and adaptive style. JeonseHelper is not an official government site, so it should not pretend to be one. It should use an adaptive approach:

- Keep the public-service clarity and accessibility mindset.
- Avoid government branding or official-emblem treatment.
- Use JeonseHelper's own restrained identity.
- Preserve official source links and verification dates so trust comes from evidence, not visual mimicry.

## Token Model

KRDS divides design tokens into three levels:

- Primitive token: raw reusable values such as color scales, font sizes, spacing, and radius.
- Semantic token: purpose-based values such as text color, border color, background color, or focus color.
- Component token: component-specific values derived from semantic tokens.

JeonseHelper should follow the same layered model in CSS:

```css
/* Primitive */
--jh-color-primary-60: #17685d;
--jh-space-4: 16px;

/* Semantic */
--jh-color-text-basic: var(--jh-color-gray-90);
--jh-color-border-subtle: var(--jh-color-gray-20);

/* Component */
--jh-sidebar-background: var(--jh-color-surface-basic);
--jh-question-border: var(--jh-color-border-subtle);
```

## Typography Implications

KRDS defines heading, body, navigation, and label roles separately. JeonseHelper should do the same:

- Heading: document title, section title, representative question.
- Body: answers and explanations.
- Navigation: sidebar chapter and document links.
- Label: metadata, source labels, small controls, search placeholder.

For now, JeonseHelper should use system Korean fonts and stable pixel/rem sizes. The goal is not a flashy editorial page; it is long-form procedural reading.

## Naming Implications

KRDS emphasizes predictable naming, avoiding visual names such as "blue button" or "round box." JeonseHelper should use role-based names:

- Good: `--jh-color-text-muted`, `--jh-sidebar-width`, `--jh-source-background`
- Avoid: `--green`, `--light-box`, `--big-radius`

CSS class names can stay product-oriented, but design variables should move toward role-based tokens.

## Components To Align First

Priority components:

1. App shell: top bar, left navigation, content pane.
2. Search input.
3. Side navigation: chapter, selected item, current document table of contents.
4. Article content: hero, section heading, question, followup, child question.
5. Supportive information: actions, required documents, related agencies, official sources.

## Sources

- KRDS Design Style Introduction: https://www.krds.go.kr/html/site/style/style_01.html
- KRDS Design Token: https://www.krds.go.kr/html/site/style/style_07.html
- KRDS Typography: https://www.krds.go.kr/html/site/style/style_03.html
- KRDS Naming Principles: https://www.krds.go.kr/html/site/utility/utility_03.html

