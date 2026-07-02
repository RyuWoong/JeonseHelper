import assert from "node:assert/strict";
import test from "node:test";
import { getContentDocuments } from "@/lib/content-loader";
import {
  buildViewerUrl,
  getActiveChapterId,
  getVisibleChapters,
  getRecommendedRoadmap,
  linkDocumentReferences,
  readViewerUrlState
} from "./document-viewer-utils";

test("readViewerUrlState reads only the document from URL params", () => {
  assert.deepEqual(
    readViewerUrlState(
      "https://example.com/?doc=fraud-prevention&q=%EB%B3%B4%EC%A6%9D%EB%B3%B4%ED%97%98#s1",
      ["jeonse-basics", "fraud-prevention"],
      "jeonse-basics"
    ),
    {
      selectedSlug: "fraud-prevention"
    }
  );
});

test("readViewerUrlState falls back when document slug is unknown", () => {
  assert.deepEqual(
    readViewerUrlState(
      "https://example.com/?doc=unknown&q=test#s1",
      ["jeonse-basics", "fraud-prevention"],
      "jeonse-basics"
    ),
    {
      selectedSlug: "jeonse-basics"
    }
  );
});

test("buildViewerUrl writes only the document while preserving hash", () => {
  assert.equal(
    buildViewerUrl("https://example.com/?doc=jeonse-basics#s1", {
      selectedSlug: "suspected-fraud-roadmap"
    }),
    "/?doc=suspected-fraud-roadmap#s1"
  );
});

test("buildViewerUrl removes stale search query and can clear hash", () => {
  assert.equal(
    buildViewerUrl(
      "https://example.com/?doc=jeonse-basics&q=%EB%B3%B4%EC%A6%9D%EB%B3%B4%ED%97%98#s1",
      {
        selectedSlug: "jeonse-basics"
      },
      ""
    ),
    "/?doc=jeonse-basics"
  );
});

test("linkDocumentReferences links numbered document mentions", () => {
  assert.deepEqual(
    linkDocumentReferences(
      "1-3 보증보험 여부 확인하기를 보고 2-2 보증보험 이행 청구하기로 이동합니다."
    ),
    [
      {
        text: "1-3 보증보험 여부 확인하기",
        href: "?doc=insurance-status-check"
      },
      {
        text: "를 보고 "
      },
      {
        text: "2-2 보증보험 이행 청구하기",
        href: "?doc=insurance-claim"
      },
      {
        text: "로 이동합니다."
      }
    ]
  );
});

test("linkDocumentReferences keeps plain text when no document mention exists", () => {
  assert.deepEqual(linkDocumentReferences("그냥 안내 문장입니다."), [
    { text: "그냥 안내 문장입니다." }
  ]);
});

test("getVisibleChapters exposes the revised response chapter as five documents", () => {
  const responseChapter = getVisibleChapters(getContentDocuments()).find(
    (chapter) => chapter.id === "response"
  );

  assert.deepEqual(
    responseChapter?.entries.map((entry) => entry.slug),
    [
      "suspected-fraud-roadmap",
      "current-situation-diagnosis",
      "insurance-status-check",
      "senior-priority-response",
      "junior-priority-response"
    ]
  );
});

test("getActiveChapterId returns the chapter that contains the active document", () => {
  assert.equal(
    getActiveChapterId(getVisibleChapters(getContentDocuments()), "insurance-claim"),
    "application"
  );
});

test("getVisibleChapters exposes application, recovery, next-home, and resource chapters", () => {
  const chapters = getVisibleChapters(getContentDocuments());

  assert.deepEqual(
    chapters.map((chapter) => chapter.id),
    ["basics", "response", "application", "recovery", "next-home", "resources"]
  );
  assert.deepEqual(
    chapters.find((chapter) => chapter.id === "application")?.entries.map(
      (entry) => entry.slug
    ),
    [
      "victim-application",
      "insurance-claim",
      "lease-registration-order",
      "payment-order-lawsuit",
      "auction-distribution-response",
      "enforcement-long-term-recovery"
    ]
  );
  assert.deepEqual(
    chapters.find((chapter) => chapter.id === "recovery")?.entries.map(
      (entry) => entry.slug
    ),
    [
      "insurance-claim-completed",
      "victim-decision-completed",
      "auction-completed",
      "partial-deposit-recovery",
      "housing-life-stabilization"
    ]
  );
  assert.deepEqual(
    chapters.find((chapter) => chapter.id === "next-home")?.entries.map(
      (entry) => entry.slug
    ),
    [
      "safe-next-home",
      "before-contract-check",
      "contract-day-check",
      "after-move-in-check",
      "renewal-check"
    ]
  );
  assert.deepEqual(
    chapters.find((chapter) => chapter.id === "resources")?.entries.map(
      (entry) => entry.slug
    ),
    [
      "document-checklist",
      "agency-contacts",
      "case-number-tracker",
      "consultation-log",
      "evidence-archive",
      "official-resources"
    ]
  );
});

test("getRecommendedRoadmap prioritizes insurance, late contract, unreachable landlord, and missing evidence", () => {
  assert.deepEqual(
    getRecommendedRoadmap({
      evidenceStatus: "missing",
      insuranceStatus: "present",
      landlordStatus: "unreachable",
      leaseStatus: "after-end"
    }).map((item) => item.documentSlug),
    [
      "insurance-claim",
      "junior-priority-response",
      "current-situation-diagnosis"
    ]
  );
});

test("getRecommendedRoadmap routes unknown insurance before contract end to diagnosis and support", () => {
  assert.deepEqual(
    getRecommendedRoadmap({
      evidenceStatus: "partial",
      insuranceStatus: "unknown",
      landlordStatus: "delaying",
      leaseStatus: "before-end"
    }).map((item) => item.documentSlug),
    [
      "insurance-status-check",
      "current-situation-diagnosis",
      "victim-application"
    ]
  );
});
