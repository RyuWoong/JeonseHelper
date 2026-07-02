import type { ContentDocument } from "@/lib/content-schema";

type DocumentTocProps = {
  document: ContentDocument;
};

export function DocumentToc({ document }: DocumentTocProps) {
  return (
    <aside className="document-toc" aria-label="현재 문서 목차">
      <strong>이 페이지</strong>
      <nav>
        {document.document.sections.map((section) => (
          <div className="toc-section" key={section.id}>
            <a className="toc-section-link" href={`#${section.id}`}>
              {section.title}
            </a>
            <ol>
              {section.questions.map((question) => (
                <li key={question.id}>
                  <a href={`#${question.id}`}>{question.question}</a>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </nav>
    </aside>
  );
}
