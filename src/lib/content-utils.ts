import type { ContentDocument } from "./content-schema";
import type { ContentDocumentEntry } from "./content-loader";

export type DocumentSource = ContentDocument["document"]["sections"][number]["questions"][number]["sources"][number];

export type ContentDocumentSearchMatch = {
  fieldLabel: string;
  text: string;
  score: number;
};

export type ContentDocumentSearchResult = ContentDocumentEntry & {
  score: number;
  matches: ContentDocumentSearchMatch[];
};

type SearchField = {
  fieldLabel: string;
  text: string;
  weight: number;
};

const exactPhraseBonusMultiplier = 1.5;
const maxSearchMatches = 2;

export function countQuestions(document: ContentDocument): number {
  const visibleCount = document.document.sections.reduce((sectionTotal, section) => {
    const questionCount = section.questions.reduce((questionTotal, question) => {
      return questionTotal + 1 + question.followups.length;
    }, 0);

    return sectionTotal + questionCount;
  }, 0);

  const childCount = Object.values(document.children).reduce(
    (total, children) => total + children.length,
    0
  );

  return visibleCount + childCount;
}

export function documentMatchesQuery(
  document: ContentDocument,
  query: string
): boolean {
  return scoreDocumentSearch(document, query).score > 0;
}

export function searchDocuments(
  entries: ContentDocumentEntry[],
  query: string
): ContentDocumentSearchResult[] {
  const parsedQuery = parseSearchQuery(query);

  if (!parsedQuery.normalizedQuery) {
    return entries.map((entry) => ({
      ...entry,
      score: 0,
      matches: []
    }));
  }

  return entries
    .map((entry, index) => ({
      ...entry,
      ...scoreDocumentSearch(entry.document, query),
      originalIndex: index
    }))
    .filter((entry) => entry.score > 0)
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score;
      }

      return first.originalIndex - second.originalIndex;
    })
    .map((entry) => ({
      slug: entry.slug,
      document: entry.document,
      score: entry.score,
      matches: entry.matches
    }));
}

export function scoreDocumentSearch(
  document: ContentDocument,
  query: string
): Pick<ContentDocumentSearchResult, "score" | "matches"> {
  const parsedQuery = parseSearchQuery(query);

  if (!parsedQuery.normalizedQuery) {
    return {
      score: 1,
      matches: []
    };
  }

  const matches = collectSearchFields(document)
    .map((field) => ({
      fieldLabel: field.fieldLabel,
      text: field.text,
      score: scoreSearchField(field, parsedQuery)
    }))
    .filter((match) => match.score > 0)
    .sort((first, second) => second.score - first.score);

  return {
    score: matches.reduce((total, match) => total + match.score, 0),
    matches: matches.slice(0, maxSearchMatches)
  };
}

export function collectDocumentSources(document: ContentDocument): DocumentSource[] {
  const sourcesByUrl = new Map<string, DocumentSource>();

  document.document.sections.forEach((section) => {
    section.questions.forEach((question) => {
      question.sources.forEach((source) => {
        if (!sourcesByUrl.has(source.url)) {
          sourcesByUrl.set(source.url, source);
        }
      });
    });
  });

  return Array.from(sourcesByUrl.values());
}

function collectSearchFields(document: ContentDocument): SearchField[] {
  const fields: SearchField[] = [
    {
      fieldLabel: "문서",
      text: document.meta.title,
      weight: 100
    },
    {
      fieldLabel: "대상",
      text: document.meta.audience,
      weight: 20
    },
    {
      fieldLabel: "유형",
      text: document.meta.contentType,
      weight: 10
    }
  ];

  document.document.sections.forEach((section) => {
    fields.push(
      {
        fieldLabel: "섹션",
        text: section.title,
        weight: 80
      },
      {
        fieldLabel: "개요",
        text: section.overview,
        weight: 45
      }
    );
    if (section.analogyBox) {
      fields.push(
        {
          fieldLabel: "비유",
          text: section.analogyBox.title,
          weight: 35
        },
        {
          fieldLabel: "비유",
          text: section.analogyBox.body,
          weight: 35
        }
      );
    }

    section.questions.forEach((question) => {
      fields.push(
        {
          fieldLabel: "질문",
          text: question.question,
          weight: 70
        },
        {
          fieldLabel: "답변",
          text: question.answer,
          weight: 45
        }
      );
      fields.push(
        ...question.actions.map((action) => ({
          fieldLabel: "행동",
          text: action,
          weight: 35
        }))
      );
      fields.push(
        ...question.requiredDocuments.map((documentName) => ({
          fieldLabel: "서류",
          text: documentName,
          weight: 30
        }))
      );
      fields.push(
        ...question.relatedAgencies.map((agency) => ({
          fieldLabel: "기관",
          text: agency,
          weight: 30
        }))
      );
      fields.push({
        fieldLabel: "기한",
        text: question.deadlineNote,
        weight: 25
      });
      question.sources.forEach((source) => {
        fields.push(
          {
            fieldLabel: "출처",
            text: source.title,
            weight: 15
          },
          {
            fieldLabel: "출처",
            text: source.publisher,
            weight: 15
          },
          {
            fieldLabel: "출처",
            text: source.note,
            weight: 10
          },
          {
            fieldLabel: "출처",
            text: source.url,
            weight: 5
          }
        );
      });

      question.followups.forEach((followup) => {
        fields.push(
          {
            fieldLabel: "후속 질문",
            text: followup.question,
            weight: 55
          },
          {
            fieldLabel: "후속 답변",
            text: followup.answer,
            weight: 35
          }
        );
      });
    });
  });

  Object.values(document.children).forEach((children) => {
    children.forEach((child) => {
      fields.push(
        {
          fieldLabel: "하위 질문",
          text: child.question,
          weight: 50
        },
        {
          fieldLabel: "하위 답변",
          text: child.answer,
          weight: 30
        }
      );
    });
  });

  return fields;
}

function scoreSearchField(
  field: SearchField,
  parsedQuery: ReturnType<typeof parseSearchQuery>
): number {
  const normalizedText = normalize(field.text);

  if (!normalizedText) {
    return 0;
  }

  const exactPhraseScore = normalizedText.includes(parsedQuery.normalizedQuery)
    ? field.weight * exactPhraseBonusMultiplier
    : 0;
  const tokenScore = parsedQuery.tokens.reduce((score, token) => {
    return normalizedText.includes(token) ? score + field.weight : score;
  }, 0);

  return exactPhraseScore + tokenScore;
}

function parseSearchQuery(query: string): {
  normalizedQuery: string;
  tokens: string[];
} {
  const normalizedQuery = normalize(query);

  return {
    normalizedQuery,
    tokens: normalizedQuery ? normalizedQuery.split(" ") : []
  };
}

function normalize(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("ko-KR");
}
