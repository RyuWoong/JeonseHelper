import type { ContentDocument } from "@/lib/content-schema";
import type { ContentDocumentEntry } from "@/lib/content-loader";
import { chapterConfig, documentLabels } from "./document-viewer-constants";
import type { DocumentChapter } from "./document-viewer-types";

export type ViewerUrlState = {
  selectedSlug: string;
};

export type DiagnosisSelections = {
  evidenceStatus: "complete" | "partial" | "missing";
  insuranceStatus: "present" | "absent" | "unknown";
  landlordStatus: "cooperative" | "delaying" | "unreachable";
  leaseStatus: "before-end" | "near-end" | "after-end";
};

type RoadmapSectionId =
  | "diagnosis"
  | "insurance-status"
  | "victim-application"
  | "insurance-claim"
  | "senior-priority"
  | "junior-priority"
  | "lease-registration";

type RoadmapDocumentSlug =
  | "current-situation-diagnosis"
  | "insurance-status-check"
  | "victim-application"
  | "insurance-claim"
  | "senior-priority-response"
  | "junior-priority-response"
  | "lease-registration-order";

const documentSlugBySectionId: Record<RoadmapSectionId, RoadmapDocumentSlug> = {
  diagnosis: "current-situation-diagnosis",
  "insurance-status": "insurance-status-check",
  "victim-application": "victim-application",
  "insurance-claim": "insurance-claim",
  "senior-priority": "senior-priority-response",
  "junior-priority": "junior-priority-response",
  "lease-registration": "lease-registration-order"
};

type RoadmapRecommendationCandidate = {
  sectionId: RoadmapSectionId;
  title: string;
  reason: string;
};

export type RecommendedRoadmapItem = RoadmapRecommendationCandidate & {
  documentSlug: RoadmapDocumentSlug;
};

export type LinkedTextSegment = {
  href?: string;
  text: string;
};

const documentReferencePatterns = Object.entries(documentLabels)
  .map(([slug, label]) => ({
    href: `?doc=${slug}`,
    text: `${label.number.replace(".", "")} ${label.title}`
  }))
  .sort((first, second) => second.text.length - first.text.length);

export function linkDocumentReferences(text: string): LinkedTextSegment[] {
  const segments: LinkedTextSegment[] = [];
  let position = 0;

  while (position < text.length) {
    const nextMatch = documentReferencePatterns
      .map((pattern) => ({
        ...pattern,
        index: text.indexOf(pattern.text, position)
      }))
      .filter((match) => match.index >= 0)
      .sort((first, second) => first.index - second.index)[0];

    if (!nextMatch) {
      segments.push({ text: text.slice(position) });
      break;
    }

    if (nextMatch.index > position) {
      segments.push({ text: text.slice(position, nextMatch.index) });
    }

    segments.push({
      href: nextMatch.href,
      text: nextMatch.text
    });
    position = nextMatch.index + nextMatch.text.length;
  }

  return segments.filter((segment) => segment.text.length > 0);
}

export function getVisibleChapters(
  entries: ContentDocumentEntry[]
): DocumentChapter[] {
  return chapterConfig
    .map((chapter) => ({
      ...chapter,
      entries: chapter.slugs
        .map((slug) => entries.find((entry) => entry.slug === slug))
        .filter((entry): entry is ContentDocumentEntry => Boolean(entry))
    }))
    .filter((chapter) => chapter.entries.length > 0);
}

export function getActiveChapterId(
  chapters: DocumentChapter[],
  activeSlug: string
): string {
  return (
    chapters.find((chapter) =>
      chapter.entries.some((entry) => entry.slug === activeSlug)
    )?.id ?? ""
  );
}

export function getExpandableIds(document?: ContentDocument): string[] {
  if (!document) {
    return [];
  }

  return document.document.sections.flatMap((section) =>
    section.questions.flatMap((question) =>
      question.followups
        .filter((followup) => followup.hasChildren)
        .map((followup) => followup.id)
    )
  );
}

export function readViewerUrlState(
  href: string,
  validSlugs: string[],
  fallbackSlug: string
): ViewerUrlState {
  const url = new URL(href);
  const slug = url.searchParams.get("doc") ?? "";

  return {
    selectedSlug: validSlugs.includes(slug) ? slug : fallbackSlug
  };
}

export function buildViewerUrl(
  href: string,
  state: ViewerUrlState,
  hash = new URL(href).hash
): string {
  const url = new URL(href);

  if (state.selectedSlug) {
    url.searchParams.set("doc", state.selectedSlug);
  } else {
    url.searchParams.delete("doc");
  }

  url.searchParams.delete("q");

  url.hash = hash;

  return `${url.pathname}${url.search}${url.hash}`;
}

export function getRecommendedRoadmap(
  selections: DiagnosisSelections
): RecommendedRoadmapItem[] {
  const recommendations = new Map<
    RoadmapSectionId,
    RoadmapRecommendationCandidate & { score: number }
  >();

  const addRecommendation = (
    item: RoadmapRecommendationCandidate,
    score: number
  ) => {
    const current = recommendations.get(item.sectionId);

    if (!current || score > current.score) {
      recommendations.set(item.sectionId, { ...item, score });
    }
  };

  if (selections.evidenceStatus === "missing") {
    addRecommendation({
      sectionId: "diagnosis",
      title: "상황 진단과 증거 정리",
      reason: "접수보다 계약서, 이체내역, 대화 기록, 등기사항증명서 확보가 먼저입니다."
    }, 60);
  }

  if (selections.insuranceStatus === "present") {
    addRecommendation({
      sectionId: "insurance-claim",
      title: "보증보험 이행청구",
      reason: "가입 기관의 보증사고 요건과 이행청구 서류를 먼저 확인해야 합니다."
    }, 100);
  } else if (selections.insuranceStatus === "unknown") {
    addRecommendation({
      sectionId: "insurance-status",
      title: "보증보험 가입 여부 확인",
      reason: "가입 기관을 알아야 보증기관 경로와 법원·지원 경로의 우선순위를 정할 수 있습니다."
    }, 100);
    addRecommendation({
      sectionId: "diagnosis",
      title: "현재 상황 진단",
      reason: "계약 단계, 집주인 연락 상태, 경공매 여부를 함께 봐야 다음 경로를 정할 수 있습니다."
    }, 90);
  }

  if (
    selections.insuranceStatus !== "present" ||
    selections.landlordStatus !== "cooperative"
  ) {
    const supportScore = selections.insuranceStatus === "present" ? 55 : 80;

    addRecommendation({
      sectionId: "victim-application",
      title: "피해자 결정 및 공적 지원",
      reason: "지원 대상 여부, 제출서류, 이의신청 가능성을 함께 확인하는 편이 안전합니다."
    }, supportScore);
  }

  if (
    selections.leaseStatus === "after-end" ||
    selections.landlordStatus === "unreachable"
  ) {
    addRecommendation({
      sectionId: "junior-priority",
      title: "후순위 위험과 회수 전략",
      reason: "만료 후 미반환이나 연락 두절은 회수 가능성과 지원 절차를 함께 확인해야 합니다."
    }, 95);
  }

  if (
    selections.landlordStatus === "cooperative" &&
    selections.insuranceStatus !== "present"
  ) {
    addRecommendation({
      sectionId: "senior-priority",
      title: "선순위 여부 확인",
      reason: "협의가 가능해도 대항력, 우선변제권, 배당 가능성을 확인해야 합니다."
    }, 90);
  }

  if (selections.landlordStatus === "delaying") {
    addRecommendation({
      sectionId: "lease-registration",
      title: "반환 요구와 회수 준비",
      reason: "지연·회피가 반복되면 내용증명, 임차권등기명령, 반환 청구 준비가 필요합니다."
    }, 70);
  }

  if (selections.leaseStatus === "near-end") {
    addRecommendation({
      sectionId: "lease-registration",
      title: "만료 전 반환 준비",
      reason: "반환 요구 기록, 내용증명, 임차권등기명령 필요 여부를 미리 점검해야 합니다."
    }, 70);
  }

  addRecommendation({
    sectionId: "diagnosis",
    title: "현재 상황 진단",
    reason: "보증보험, 계약 상태, 집주인 연락, 증거 보유 상태를 한 번에 정리해야 합니다."
  }, 20);

  return Array.from(recommendations.values())
    .sort((first, second) => second.score - first.score)
    .slice(0, 3)
    .map((recommendation) => ({
      documentSlug: documentSlugBySectionId[recommendation.sectionId],
      reason: recommendation.reason,
      sectionId: recommendation.sectionId,
      title: recommendation.title
    }));
}
