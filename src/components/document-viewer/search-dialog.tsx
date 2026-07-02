import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { ContentDocumentEntry } from "@/lib/content-loader";
import { searchDocuments } from "@/lib/content-utils";
import { documentLabels } from "./document-viewer-constants";

type SearchDialogProps = {
  documents: ContentDocumentEntry[];
  isOpen: boolean;
  onClose: () => void;
  onSelectDocument: (slug: string) => void;
};

export function SearchDialog({
  documents,
  isOpen,
  onClose,
  onSelectDocument
}: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => (query.trim() ? searchDocuments(documents, query) : []),
    [documents, query]
  );

  if (!isOpen) {
    return null;
  }

  const hasQuery = query.trim().length > 0;

  return (
    <div
      className="search-dialog-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        aria-label="문서 검색"
        aria-modal="true"
        className="search-dialog"
        role="dialog"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            onClose();
          }
        }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="search-dialog-input-row">
          <Search size={18} />
          <input
            autoFocus
            type="search"
            value={query}
            placeholder="보증보험, 임차권등기, 경찰..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            className="icon-button"
            type="button"
            aria-label="검색 닫기"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="search-dialog-results">
          {!hasQuery ? (
            <p className="search-dialog-empty">
              찾고 싶은 절차, 기관, 서류명을 입력하세요.
            </p>
          ) : results.length ? (
            results.map((result) => {
              const label = documentLabels[result.slug] ?? {
                number: "",
                title: result.document.meta.title
              };

              return (
                <button
                  className="search-result"
                  type="button"
                  key={result.slug}
                  onClick={() => {
                    onSelectDocument(result.slug);
                    onClose();
                  }}
                >
                  <span className="search-result-kicker">
                    {label.number ? `${label.number} ` : ""}
                    {label.title}
                  </span>
                  <strong>{result.document.meta.title}</strong>
                  <span className="search-result-matches">
                    {result.matches.map((match) => (
                      <span
                        className="search-result-match"
                        key={`${result.slug}-${match.fieldLabel}-${match.text}`}
                      >
                        <b>{match.fieldLabel}</b>
                        {match.text}
                      </span>
                    ))}
                  </span>
                </button>
              );
            })
          ) : (
            <p className="search-dialog-empty">검색 결과가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}
