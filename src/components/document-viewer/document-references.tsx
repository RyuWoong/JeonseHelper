import { ExternalLink } from "lucide-react";
import { collectDocumentSources } from "@/lib/content-utils";
import type { ContentDocument } from "@/lib/content-schema";

type DocumentReferencesProps = {
  document: ContentDocument;
};

export function DocumentReferences({ document }: DocumentReferencesProps) {
  const sources = collectDocumentSources(document);

  if (sources.length === 0) {
    return null;
  }

  return (
    <footer className="document-references" aria-labelledby="document-references-title">
      <div className="references-heading">
        <span>Reference</span>
        <h2 id="document-references-title">레퍼런스</h2>
      </div>
      <ol className="reference-list">
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.title}
              <ExternalLink size={14} />
            </a>
            <span>
              {source.publisher} · 확인일 {source.lastVerifiedAt}
            </span>
            {source.note ? <p>{source.note}</p> : null}
          </li>
        ))}
      </ol>
    </footer>
  );
}
