import type { Metadata } from "next";
import { DocumentViewer } from "@/components/document-viewer";
import { getContentDocuments } from "@/lib/content-loader";
import { buildDocumentTitle, siteDescription } from "@/lib/site-metadata";

type HomeProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams
}: HomeProps): Promise<Metadata> {
  const params = await searchParams;
  const selectedSlug = Array.isArray(params?.doc) ? params.doc[0] : params?.doc;
  const documents = getContentDocuments();
  const selectedDocument = documents.find(
    (entry) => entry.slug === selectedSlug
  ) ?? documents[0];

  return {
    title: {
      absolute: buildDocumentTitle(selectedDocument?.document.meta.title)
    },
    description: siteDescription,
    openGraph: {
      title: buildDocumentTitle(selectedDocument?.document.meta.title),
      description: siteDescription
    },
    twitter: {
      title: buildDocumentTitle(selectedDocument?.document.meta.title),
      description: siteDescription
    }
  };
}

export default function Home() {
  const documents = getContentDocuments();

  return <DocumentViewer documents={documents} />;
}
