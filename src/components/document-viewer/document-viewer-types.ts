import type { ContentDocument } from "@/lib/content-schema";
import type { ContentDocumentEntry } from "@/lib/content-loader";

export type DocumentViewerProps = {
  documents: ContentDocumentEntry[];
};

export type DocumentSection = ContentDocument["document"]["sections"][number];

export type DocumentQuestion = DocumentSection["questions"][number];

export type DocumentFollowup = DocumentQuestion["followups"][number];

export type DocumentChildQuestion = ContentDocument["children"][string][number];

export type DocumentChapter = {
  id: string;
  title: string;
  description: string;
  entries: ContentDocumentEntry[];
};

export type DocumentLabel = {
  number: string;
  title: string;
};
