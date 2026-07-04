import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FollowupItem } from "./followup-item";
import type { DocumentFollowup } from "./document-viewer-types";

const baseFollowup: DocumentFollowup = {
  id: "followup-test",
  question: "채무불이행과 사기는 어떻게 다르게 보나요?",
  answer: "사기로 보려면 계약 당시 속인 정황을 함께 봐야 합니다.",
  hasChildren: false
};

test("FollowupItem hides answer content when collapsed", () => {
  const markup = renderToStaticMarkup(
    createElement(FollowupItem, {
      childrenQuestions: [],
      followup: baseFollowup,
      isExpanded: false,
      onToggle: () => undefined
    })
  );

  assert.match(markup, /채무불이행과 사기는 어떻게 다르게 보나요\?/);
  assert.match(markup, /aria-expanded="false"/);
  assert.doesNotMatch(markup, /계약 당시 속인 정황/);
});

test("FollowupItem shows answer content when expanded", () => {
  const markup = renderToStaticMarkup(
    createElement(FollowupItem, {
      childrenQuestions: [],
      followup: baseFollowup,
      isExpanded: true,
      onToggle: () => undefined
    })
  );

  assert.match(markup, /aria-expanded="true"/);
  assert.match(markup, /계약 당시 속인 정황/);
});
