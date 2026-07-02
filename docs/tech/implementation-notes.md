# Implementation Notes

## Content Validation

The app should fail validation when:

- Duplicate IDs exist in one document.
- `hasChildren: true` is set without a matching `children` key.
- A `children` key points to an ID that does not exist.
- `urgency` is outside the allowed values.
- `sources.lastVerifiedAt` is not a valid date.

## Rendering Notes

- Render `sections` as major navigation groups.
- Render `questions` as primary cards or rows.
- Render `followups` as initially visible child rows.
- Render `children` only when expanded.
- Keep source metadata visually separate from the answer body.
- Mark policy-sensitive items with the last verified date.

## Accessibility Notes

- Expand/collapse must be keyboard accessible.
- Deep links should focus the selected question.
- Tooltips should have accessible fallback text.
- Image modal should support keyboard close and focus return.

## Risk Notes

This product deals with legal and administrative procedures. The app should avoid presenting itself as legal representation. Content should encourage users to verify official sources and seek professional help when deadlines, litigation, auction, or criminal complaint strategy is involved.

