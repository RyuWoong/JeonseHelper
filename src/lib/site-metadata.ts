export const siteTitle = "전세사기 도움집";

export const siteDescription =
  "전세사기 예방부터 피해 대응, 보증보험, 법원 절차, 주거 안정까지 공식 자료와 함께 정리한 전세사기 대응 도움집입니다.";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
);

export function buildDocumentTitle(documentTitle?: string): string {
  return documentTitle ? `${siteTitle} | ${documentTitle}` : siteTitle;
}
