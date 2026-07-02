import { linkDocumentReferences } from "./document-viewer-utils";

type LinkedTextProps = {
  text: string;
};

export function LinkedText({ text }: LinkedTextProps) {
  return (
    <>
      {linkDocumentReferences(text).map((segment, index) =>
        segment.href ? (
          <a href={segment.href} key={`${segment.href}-${index}`}>
            {segment.text}
          </a>
        ) : (
          <span key={`${segment.text}-${index}`}>{segment.text}</span>
        )
      )}
    </>
  );
}
