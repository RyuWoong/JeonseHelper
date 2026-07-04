import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { QuestionBlock } from "./question-block";
import type { DocumentQuestion } from "./document-viewer-types";

const baseQuestion: DocumentQuestion = {
  id: "q-test",
  question: "보증금을 못 받으면 바로 전세사기인가요?",
  answer: "먼저 보증금 반환 채무가 이행되지 않는 문제로 볼 수 있습니다.",
  situationTags: [],
  urgency: "low",
  actions: [],
  requiredDocuments: [],
  relatedAgencies: [],
  deadlineNote: "",
  sources: [],
  followups: []
};

test("QuestionBlock keeps answer content visible without expansion", () => {
  const markup = renderToStaticMarkup(
    createElement(QuestionBlock, {
      childrenByParentId: {},
      expandedIds: new Set<string>(),
      onToggle: () => undefined,
      question: baseQuestion
    })
  );

  assert.match(markup, /보증금을 못 받으면 바로 전세사기인가요\?/);
  assert.match(markup, /보증금 반환 채무가 이행되지 않는 문제/);
  assert.doesNotMatch(markup, /question-trigger/);
});
