import { ChevronDown, ChevronRight } from "lucide-react";
import type {
  DocumentChildQuestion,
  DocumentFollowup
} from "./document-viewer-types";
import { LinkedText } from "./linked-text";

type FollowupItemProps = {
  childrenQuestions: DocumentChildQuestion[];
  followup: DocumentFollowup;
  isExpanded: boolean;
  onToggle: (id: string) => void;
};

export function FollowupItem({
  childrenQuestions,
  followup,
  isExpanded,
  onToggle
}: FollowupItemProps) {
  return (
    <div className="followup-item">
      <button
        className="followup-trigger"
        type="button"
        aria-expanded={isExpanded}
        aria-controls={`${followup.id}-children`}
        onClick={() => onToggle(followup.id)}
      >
        {followup.hasChildren ? (
          isExpanded ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )
        ) : (
          <span className="trigger-spacer" />
        )}
        <span>{followup.question}</span>
      </button>
      <p>
        <LinkedText text={followup.answer} />
      </p>

      {followup.hasChildren && isExpanded ? (
        <div className="child-list" id={`${followup.id}-children`}>
          {childrenQuestions.map((child) => (
            <article className="child-question" key={child.id}>
              <h4>{child.question}</h4>
              <p>
                <LinkedText text={child.answer} />
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
