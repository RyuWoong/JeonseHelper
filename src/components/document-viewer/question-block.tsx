import type { ContentDocument } from "@/lib/content-schema";
import type { DocumentQuestion } from "./document-viewer-types";
import { FollowupItem } from "./followup-item";
import { LinkedText } from "./linked-text";
import { QuestionMeta } from "./question-meta";

type QuestionBlockProps = {
  childrenByParentId: ContentDocument["children"];
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  question: DocumentQuestion;
};

export function QuestionBlock({
  childrenByParentId,
  expandedIds,
  onToggle,
  question
}: QuestionBlockProps) {
  return (
    <article className="question-block" id={question.id}>
      <h3>{question.question}</h3>
      <p>
        <LinkedText text={question.answer} />
      </p>
      <QuestionMeta question={question} />

      {question.followups.length > 0 ? (
        <div className="followup-list">
          {question.followups.map((followup) => (
            <FollowupItem
              childrenQuestions={childrenByParentId[followup.id] ?? []}
              followup={followup}
              isExpanded={expandedIds.has(followup.id)}
              key={followup.id}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}
