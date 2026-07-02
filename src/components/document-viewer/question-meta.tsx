import type { DocumentQuestion } from "./document-viewer-types";
import { LinkedText } from "./linked-text";

type QuestionMetaProps = {
  question: DocumentQuestion;
};

export function QuestionMeta({ question }: QuestionMetaProps) {
  const hasMeta =
    question.actions.length > 0 ||
    question.requiredDocuments.length > 0 ||
    question.relatedAgencies.length > 0 ||
    Boolean(question.deadlineNote);

  if (!hasMeta) {
    return null;
  }

  return (
    <div className="question-meta">
      <MetaList title="해야 할 일" items={question.actions} />
      <MetaList title="필요 자료" items={question.requiredDocuments} />
      <MetaList title="관련 기관" items={question.relatedAgencies} compact />
      {question.deadlineNote ? (
        <div className="meta-panel">
          <strong>기한 메모</strong>
          <p>
            <LinkedText text={question.deadlineNote} />
          </p>
        </div>
      ) : null}
    </div>
  );
}

function MetaList({
  title,
  items,
  compact = false
}: {
  title: string;
  items: string[];
  compact?: boolean;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="meta-panel">
      <strong>{title}</strong>
      <ul className={compact ? "pill-list" : undefined}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
