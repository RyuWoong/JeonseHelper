"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore
} from "react";
import { DocumentContent } from "./document-viewer/document-content";
import type { DocumentViewerProps } from "./document-viewer/document-viewer-types";
import {
  rootNavigationSlugs
} from "./document-viewer/document-viewer-constants";
import {
  buildViewerUrl,
  getVisibleChapters,
  readViewerUrlState
} from "./document-viewer/document-viewer-utils";
import { buildDocumentTitle } from "@/lib/site-metadata";
import { Sidebar } from "./document-viewer/sidebar";
import { SearchDialog } from "./document-viewer/search-dialog";
import { Topbar } from "./document-viewer/topbar";

const viewerUrlChangeEvent = "jeonsehelper-viewer-url-change";

export function DocumentViewer({ documents }: DocumentViewerProps) {
  const initialSlug = documents[0]?.slug ?? "";
  const documentSlugs = useMemo(
    () => documents.map((entry) => entry.slug),
    [documents]
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());

  const subscribeToViewerUrl = useCallback((onStoreChange: () => void) => {
    window.addEventListener("popstate", onStoreChange);
    window.addEventListener(viewerUrlChangeEvent, onStoreChange);

    return () => {
      window.removeEventListener("popstate", onStoreChange);
      window.removeEventListener(viewerUrlChangeEvent, onStoreChange);
    };
  }, []);

  const viewerHref = useSyncExternalStore(
    subscribeToViewerUrl,
    () => window.location.href,
    () => ""
  );

  const currentUrlState = useMemo(() => {
    if (!viewerHref) {
      return {
        selectedSlug: initialSlug
      };
    }

    return readViewerUrlState(viewerHref, documentSlugs, initialSlug);
  }, [documentSlugs, initialSlug, viewerHref]);

  const selectedSlug = currentUrlState.selectedSlug;

  const writeCurrentUrlState = useCallback(
    (
      state: { selectedSlug: string },
      mode: "push" | "replace",
      hash?: string
    ) => {
      const nextUrl = buildViewerUrl(window.location.href, state, hash);
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (nextUrl === currentUrl) {
        return;
      }

      if (mode === "push") {
        window.history.pushState(null, "", nextUrl);
      } else {
        window.history.replaceState(null, "", nextUrl);
      }

      window.dispatchEvent(new Event(viewerUrlChangeEvent));
    },
    []
  );

  const selectedEntry = documents.find((entry) => entry.slug === selectedSlug);
  const activeEntry = selectedEntry ?? documents[0];

  const visibleChapters = getVisibleChapters(documents);
  const rootEntries = rootNavigationSlugs
    .map((slug) => documents.find((entry) => entry.slug === slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  useEffect(() => {
    const nextTitle = buildDocumentTitle(activeEntry?.document.meta.title);
    document.title = nextTitle;

    const frameId = window.requestAnimationFrame(() => {
      document.title = nextTitle;
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [activeEntry]);

  const handleSelectDocument = (slug: string) => {
    setIsSidebarOpen(false);
    writeCurrentUrlState({ selectedSlug: slug }, "push", "");
  };

  const toggleExpanded = (id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  if (!activeEntry) {
    return null;
  }

  return (
    <div className="docs-app">
      <Topbar
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
      <SearchDialog
        documents={documents}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDocument={handleSelectDocument}
      />

      <div className="docs-layout">
        <Sidebar
          activeSlug={activeEntry.slug}
          chapters={visibleChapters}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSelectDocument={handleSelectDocument}
          rootEntries={rootEntries}
        />

        {isSidebarOpen ? (
          <button
            className="sidebar-backdrop"
            type="button"
            aria-label="문서 메뉴 닫기"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}

        <main className="content-pane" id="top">
          <DocumentContent
            document={activeEntry.document}
            expandedIds={expandedIds}
            onToggle={toggleExpanded}
          />
        </main>
      </div>
    </div>
  );
}
