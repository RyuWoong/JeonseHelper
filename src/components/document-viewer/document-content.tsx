import type { ContentDocument } from "@/lib/content-schema";
import { countQuestions } from "@/lib/content-utils";
import { DiagnosisRoadmap } from "./diagnosis-roadmap";
import { DocumentReferences } from "./document-references";
import { DocumentToc } from "./document-toc";
import { QuestionBlock } from "./question-block";

type DocumentContentProps = {
  document: ContentDocument;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
};

export function DocumentContent({
  document,
  expandedIds,
  onToggle
}: DocumentContentProps) {
  const isCurrentSituationDiagnosis =
    document.meta.title === "현재 상황 진단하기";

  return (
    <div className="document-content-layout">
      <article className="document-content">
        <header className="document-hero">
          <a className="back-link" href="#top">
            &lt; 튜토리얼 목록
          </a>
          <p>{document.meta.audience}</p>
          <h1>{document.meta.title}</h1>
          <div className="updated-row">
            <small>업데이트 {document.meta.lastUpdatedAt}</small>
          </div>
          <dl>
            <div>
              <dt>버전</dt>
              <dd>{document.meta.version}</dd>
            </div>
            <div>
              <dt>마지막 업데이트</dt>
              <dd>{document.meta.lastUpdatedAt}</dd>
            </div>
            <div>
              <dt>질문</dt>
              <dd>{countQuestions(document)}개</dd>
            </div>
          </dl>
        </header>

        {document.document.sections.map((section, sectionIndex) => (
          <section className="doc-section" id={section.id} key={section.id}>
            <div className="section-heading">
              <span>
                {`섹션 ${String(sectionIndex + 1).padStart(2, "0")}`}
              </span>
              <h2>{section.title}</h2>
              <p>{section.overview}</p>
            </div>

            {isCurrentSituationDiagnosis && section.id === "s1" ? (
              <DiagnosisRoadmap />
            ) : null}

            <div className="question-stack">
              {section.questions.map((question) => (
                <QuestionBlock
                  childrenByParentId={document.children}
                  expandedIds={expandedIds}
                  key={question.id}
                  onToggle={onToggle}
                  question={question}
                />
              ))}
            </div>
          </section>
        ))}

        <DocumentReferences document={document} />
      </article>
      <DocumentToc document={document} />
    </div>
  );
}
