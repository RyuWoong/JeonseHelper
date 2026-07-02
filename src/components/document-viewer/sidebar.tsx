import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import { documentLabels } from "./document-viewer-constants";
import { getActiveChapterId } from "./document-viewer-utils";
import type { DocumentChapter } from "./document-viewer-types";

type ChapterExpansionState =
  | { mode: "active" }
  | { mode: "all" }
  | { ids: Set<string>; mode: "custom" };

type SidebarProps = {
  activeSlug: string;
  chapters: DocumentChapter[];
  isOpen: boolean;
  onClose: () => void;
  onSelectDocument: (slug: string) => void;
};

export function Sidebar({
  activeSlug,
  chapters,
  isOpen,
  onClose,
  onSelectDocument
}: SidebarProps) {
  const activeChapterId = useMemo(
    () => getActiveChapterId(chapters, activeSlug),
    [activeSlug, chapters]
  );
  const [chapterExpansion, setChapterExpansion] =
    useState<ChapterExpansionState>({ mode: "active" });

  const expandedChapterIds = useMemo(
    () =>
      getExpandedChapterIds(chapterExpansion, chapters, activeChapterId),
    [activeChapterId, chapterExpansion, chapters]
  );

  const toggleChapter = (chapterId: string) => {
    setChapterExpansion(() => {
      const next = new Set(expandedChapterIds);

      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }

      if (activeChapterId) {
        next.add(activeChapterId);
      }

      return { ids: next, mode: "custom" };
    });
  };

  const expandAllChapters = () => {
    setChapterExpansion({ mode: "all" });
  };

  const collapseToActiveChapter = () => {
    setChapterExpansion({ mode: "active" });
  };

  return (
    <aside
      className={isOpen ? "sidebar is-open" : "sidebar"}
      aria-label="문서 목록"
    >
      <div className="sidebar-header">
        <div>
          <strong>목차</strong>
        </div>
        <button
          className="icon-button sidebar-close"
          type="button"
          aria-label="문서 메뉴 닫기"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>

      <nav className="document-nav">
        {chapters.map((chapter) => {
          const isExpanded = expandedChapterIds.has(chapter.id);

          return (
            <div className="nav-chapter" key={chapter.id}>
              <button
                className="chapter-heading"
                type="button"
                aria-expanded={isExpanded}
                aria-controls={`${chapter.id}-chapter-links`}
                onClick={() => toggleChapter(chapter.id)}
              >
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                <span>{chapter.title}</span>
                <small>{chapter.description}</small>
              </button>
              {isExpanded ? (
                <div className="chapter-links" id={`${chapter.id}-chapter-links`}>
                  {chapter.entries.map((entry) => {
                    const isActive = entry.slug === activeSlug;
                    const label = documentLabels[entry.slug] ?? {
                      number: "",
                      title: entry.document.meta.title
                    };

                    return (
                      <div className="nav-entry" key={entry.slug}>
                        <button
                          className={isActive ? "nav-item is-active" : "nav-item"}
                          type="button"
                          onClick={() => onSelectDocument(entry.slug)}
                        >
                          <span className="nav-marker" aria-hidden="true">
                            {isActive ? "-" : ""}
                          </span>
                          <span className="nav-number">{label.number}</span>
                          <span className="nav-title">{label.title}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-actions">
        <button type="button" onClick={expandAllChapters}>
          모두 펼치기
        </button>
        <button type="button" onClick={collapseToActiveChapter}>
          모두 접기
        </button>
      </div>
    </aside>
  );
}

function getExpandedChapterIds(
  expansion: ChapterExpansionState,
  chapters: DocumentChapter[],
  activeChapterId: string
): Set<string> {
  if (expansion.mode === "all") {
    return new Set(chapters.map((chapter) => chapter.id));
  }

  if (expansion.mode === "custom") {
    return new Set([
      ...expansion.ids,
      ...(activeChapterId ? [activeChapterId] : [])
    ]);
  }

  return new Set(activeChapterId ? [activeChapterId] : []);
}
