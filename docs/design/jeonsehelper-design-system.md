# JeonseHelper Design System

## Positioning

JeonseHelper uses a KRDS-inspired adaptive design system. It should feel like a calm public-service guide, not like a government portal clone.

The design should support:

- Long reading
- Situation diagnosis
- Step-by-step action
- Official source verification
- Mobile access during stressful housing situations

## Visual Principles

### Trust Before Decoration

Use restrained color, simple borders, strong typography hierarchy, and visible official sources. Avoid decorative illustrations, marketing cards, heavy gradients, and unnecessary badges.

### Procedural Clarity

Every content block should answer:

- What is this?
- What should I do next?
- Which documents or agencies are involved?
- Where can I verify it?

### Accessibility First

Use sufficient contrast, comfortable line height, keyboard-accessible disclosure controls, visible focus states, and mobile-first navigation behavior.

## Token Naming

Use `--jh-*` for JeonseHelper tokens.

Token layers:

- Primitive: `--jh-color-primary-60`, `--jh-space-4`, `--jh-radius-2`
- Semantic: `--jh-color-text-basic`, `--jh-color-border-subtle`
- Component: `--jh-sidebar-background`, `--jh-question-border`

Avoid visual-only names such as `--green` or `--rounded-card`.

## Color Tokens

Primary color should communicate calm support, not alarm. Gray should carry most UI structure.

```css
--jh-color-primary-5: #eef8f5;
--jh-color-primary-10: #dff0ec;
--jh-color-primary-60: #17685d;
--jh-color-primary-70: #0d544b;

--jh-color-gray-0: #ffffff;
--jh-color-gray-5: #fafafa;
--jh-color-gray-10: #f5f5f5;
--jh-color-gray-20: #eeeeee;
--jh-color-gray-40: #dcdcdc;
--jh-color-gray-60: #87909c;
--jh-color-gray-70: #636b75;
--jh-color-gray-90: #171a1f;
```

Semantic examples:

```css
--jh-color-background-basic: var(--jh-color-gray-0);
--jh-color-surface-basic: var(--jh-color-gray-0);
--jh-color-surface-subtle: var(--jh-color-gray-5);
--jh-color-text-basic: var(--jh-color-gray-90);
--jh-color-text-muted: var(--jh-color-gray-70);
--jh-color-text-subtle: var(--jh-color-gray-60);
--jh-color-border-subtle: var(--jh-color-gray-20);
--jh-color-border-basic: var(--jh-color-gray-40);
--jh-color-action-primary: var(--jh-color-primary-70);
--jh-color-focus: var(--jh-color-primary-60);
```

## Typography Tokens

Use system fonts for Korean readability:

```css
--jh-font-family-base: Arial, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
```

Roles:

- Document title: large heading, strong weight.
- Section title: medium-large heading.
- Question title: body-bold to small heading.
- Answer: medium body.
- Navigation and labels: small body or label.

Keep letter spacing at `0`.

## Layout Tokens

```css
--jh-layout-header-height: 72px;
--jh-layout-sidebar-width: 260px;
--jh-layout-content-width: 760px;
--jh-layout-content-offset: 76px;
```

Reading content should be left-aligned with a controlled width. Do not center the article in a way that creates excessive left whitespace next to the sidebar.

## Component Rules

### Top Bar

- Keep it thin and utilitarian.
- Brand mark and search are enough for now.
- Do not add decorative navigation until there are real destinations.

### Sidebar

- Group documents by chapter.
- Active state uses `-`, not a thick border or card highlight.
- Keep chapter labels quiet.
- Include current document table of contents and expand/collapse controls.

### Article

- Use article flow: title, metadata, section, question, answer, followups.
- Use lines and spacing over cards.
- Keep official source blocks visually distinct but not noisy.

### Disclosure Questions

- Use chevrons for expandable questions.
- Non-expandable followups should align with expandable ones.
- `모두 펼치기` and `모두 접기` should affect the current document only.

### Source Blocks

- Preserve source title, publisher, verification date, and note.
- External links open in a new tab.
- Avoid implying legal certainty when the source only supports general guidance.

## Application Plan

1. Define KRDS-inspired tokens in `:root`.
2. Keep legacy aliases temporarily mapped to new tokens.
3. Move component styles to component tokens as each component stabilizes.
4. Add focus-visible states to interactive controls.
5. Later, add high-contrast mode only after the base UI stabilizes.

