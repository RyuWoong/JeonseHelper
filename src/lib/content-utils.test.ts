import assert from "node:assert/strict";
import test from "node:test";
import type { ContentDocument } from "./content-schema";
import {
  collectDocumentSources,
  documentMatchesQuery,
  scoreDocumentSearch,
  searchDocuments
} from "./content-utils";

function createDocument(
  title: string,
  question: string,
  answer: string,
  overrides: Partial<ContentDocument> = {}
): ContentDocument {
  return {
    meta: {
      title,
      audience: "테스트 독자",
      contentType: "question-tree-roadmap",
      version: "0.0.0",
      lastUpdatedAt: "2026-06-24"
    },
    document: {
      sections: [
        {
          id: "s1",
          title: "기본 섹션",
          overview: "기본 개요",
          questions: [
            {
              id: "q1",
              question,
              answer,
              situationTags: [],
              urgency: "low",
              actions: [],
              requiredDocuments: [],
              relatedAgencies: [],
              deadlineNote: "",
              sources: [],
              followups: []
            }
          ]
        }
      ]
    },
    children: {},
    ...overrides
  };
}

test("collectDocumentSources returns unique sources in document order", () => {
  const document = {
    meta: {
      title: "테스트 문서",
      audience: "테스트 독자",
      contentType: "question-tree-roadmap",
      version: "0.0.0",
      lastUpdatedAt: "2026-06-24"
    },
    document: {
      sections: [
        {
          id: "s1",
          title: "섹션",
          overview: "개요",
          questions: [
            {
              id: "q1",
              question: "첫 질문",
              answer: "첫 답변",
              situationTags: [],
              urgency: "low",
              actions: [],
              requiredDocuments: [],
              relatedAgencies: [],
              deadlineNote: "",
              sources: [
                {
                  title: "첫 출처",
                  url: "https://example.com/first",
                  publisher: "첫 기관",
                  lastVerifiedAt: "2026-06-24",
                  note: "첫 메모"
                }
              ],
              followups: []
            },
            {
              id: "q2",
              question: "둘째 질문",
              answer: "둘째 답변",
              situationTags: [],
              urgency: "low",
              actions: [],
              requiredDocuments: [],
              relatedAgencies: [],
              deadlineNote: "",
              sources: [
                {
                  title: "중복 출처",
                  url: "https://example.com/first",
                  publisher: "첫 기관",
                  lastVerifiedAt: "2026-06-24",
                  note: "중복 메모"
                },
                {
                  title: "둘째 출처",
                  url: "https://example.com/second",
                  publisher: "둘째 기관",
                  lastVerifiedAt: "2026-06-24",
                  note: ""
                }
              ],
              followups: []
            }
          ]
        }
      ]
    },
    children: {}
  } satisfies ContentDocument;

  assert.deepEqual(
    collectDocumentSources(document).map((source) => source.url),
    ["https://example.com/first", "https://example.com/second"]
  );
});

test("documentMatchesQuery returns true for an empty search query", () => {
  assert.equal(
    documentMatchesQuery(
      createDocument("보증보험 안내", "가입 여부", "가입 상태를 확인합니다."),
      "   "
    ),
    true
  );
});

test("scoreDocumentSearch gives title and question matches higher scores than answer and source matches", () => {
  const titleMatch = createDocument("보증보험 안내", "기본 질문", "기본 답변");
  const questionMatch = createDocument("기본 문서", "보증보험 확인", "기본 답변");
  const answerMatch = createDocument("기본 문서", "기본 질문", "보증보험을 확인합니다.");
  const sourceMatch = createDocument("기본 문서", "기본 질문", "기본 답변", {
    document: {
      sections: [
        {
          id: "s1",
          title: "기본 섹션",
          overview: "기본 개요",
          questions: [
            {
              id: "q1",
              question: "기본 질문",
              answer: "기본 답변",
              situationTags: [],
              urgency: "low",
              actions: [],
              requiredDocuments: [],
              relatedAgencies: [],
              deadlineNote: "",
              sources: [
                {
                  title: "보증보험 기관",
                  url: "https://example.com",
                  publisher: "테스트 기관",
                  lastVerifiedAt: "2026-06-24",
                  note: ""
                }
              ],
              followups: []
            }
          ]
        }
      ]
    }
  });

  assert.ok(
    scoreDocumentSearch(titleMatch, "보증보험").score >
      scoreDocumentSearch(questionMatch, "보증보험").score
  );
  assert.ok(
    scoreDocumentSearch(questionMatch, "보증보험").score >
      scoreDocumentSearch(answerMatch, "보증보험").score
  );
  assert.ok(
    scoreDocumentSearch(answerMatch, "보증보험").score >
      scoreDocumentSearch(sourceMatch, "보증보험").score
  );
});

test("searchDocuments accumulates token scores and sorts by relevance", () => {
  const entries = [
    {
      slug: "single",
      document: createDocument("보증보험 안내", "기본 질문", "기본 답변")
    },
    {
      slug: "combined",
      document: createDocument(
        "보증보험 안내",
        "임차권등기 준비",
        "기본 답변"
      )
    }
  ];

  assert.deepEqual(
    searchDocuments(entries, "보증보험 임차권등기").map((result) => result.slug),
    ["combined", "single"]
  );
});

test("searchDocuments keeps original order when relevance scores tie", () => {
  const entries = [
    {
      slug: "first",
      document: createDocument("보증보험 안내", "기본 질문", "기본 답변")
    },
    {
      slug: "second",
      document: createDocument("보증보험 절차", "기본 질문", "기본 답변")
    }
  ];

  assert.deepEqual(
    searchDocuments(entries, "보증보험").map((result) => result.slug),
    ["first", "second"]
  );
});

test("searchDocuments limits match summaries to the highest scoring evidence", () => {
  const [result] = searchDocuments(
    [
      {
        slug: "insurance",
        document: createDocument("보증보험 안내", "보증보험 질문", "보증보험 답변")
      }
    ],
    "보증보험"
  );

  assert.deepEqual(
    result.matches.map((match) => match.fieldLabel),
    ["문서", "질문"]
  );
});
