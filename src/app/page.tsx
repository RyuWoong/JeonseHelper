import { DocumentViewer } from "@/components/document-viewer";
import { getContentDocuments } from "@/lib/content-loader";

export default function Home() {
  const documents = getContentDocuments();

  return <DocumentViewer documents={documents} />;
}
