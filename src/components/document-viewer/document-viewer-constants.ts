import type { DocumentLabel } from "./document-viewer-types";

export const rootNavigationSlugs = ["introduction", "contributing"] as const;

export const documentLabels: Record<string, DocumentLabel> = {
  "jeonse-basics": {
    number: "0-1.",
    title: "전세란?"
  },
  "fraud-prevention": {
    number: "0-2.",
    title: "전세 사기 예방"
  },
  "suspected-fraud-roadmap": {
    number: "1-1.",
    title: "전세사기가 의심 돼요"
  },
  "current-situation-diagnosis": {
    number: "1-2.",
    title: "현재 상황 진단하기"
  },
  "insurance-status-check": {
    number: "1-3.",
    title: "보증보험 여부 확인하기"
  },
  "senior-priority-response": {
    number: "1-4.",
    title: "선순위일 때"
  },
  "junior-priority-response": {
    number: "1-5.",
    title: "후순위일 때"
  },
  "victim-application": {
    number: "2-1.",
    title: "전세사기 피해자 신청하기"
  },
  "insurance-claim": {
    number: "2-2.",
    title: "보증보험 이행 청구하기"
  },
  "lease-registration-order": {
    number: "2-3.",
    title: "임차권등기명령 신청하기"
  },
  "payment-order-lawsuit": {
    number: "2-4.",
    title: "지급명령·보증금반환소송 진행하기"
  },
  "auction-distribution-response": {
    number: "2-5.",
    title: "경매·공매와 배당 대응하기"
  },
  "enforcement-long-term-recovery": {
    number: "2-6.",
    title: "강제집행과 장기 회수 관리하기"
  },
  "insurance-claim-completed": {
    number: "3-1.",
    title: "보증보험 이행이 완료됐을 때"
  },
  "victim-decision-completed": {
    number: "3-2.",
    title: "전세사기 피해자로 결정됐을 때"
  },
  "auction-completed": {
    number: "3-3.",
    title: "경매·공매가 끝났을 때"
  },
  "partial-deposit-recovery": {
    number: "3-4.",
    title: "보증금을 일부만 회수했을 때"
  },
  "housing-life-stabilization": {
    number: "3-5.",
    title: "주거와 생활을 다시 안정시키기"
  },
  "safe-next-home": {
    number: "4-1.",
    title: "새 전셋집을 구할 때"
  },
  "before-contract-check": {
    number: "4-2.",
    title: "계약서 쓰기 전 확인할 것"
  },
  "contract-day-check": {
    number: "4-3.",
    title: "계약 당일 확인할 것"
  },
  "after-move-in-check": {
    number: "4-4.",
    title: "입주 후 바로 해야 할 것"
  },
  "renewal-check": {
    number: "4-5.",
    title: "재계약·갱신할 때"
  },
  "document-checklist": {
    number: "5-1.",
    title: "필요한 서류 한눈에 보기"
  },
  "agency-contacts": {
    number: "5-2.",
    title: "기관별 연락처와 역할"
  },
  "case-number-tracker": {
    number: "5-3.",
    title: "접수번호와 사건번호 정리하기"
  },
  "consultation-log": {
    number: "5-4.",
    title: "담당자와 상담 기록 정리하기"
  },
  "evidence-archive": {
    number: "5-5.",
    title: "증거 자료 정리하기"
  },
  "official-resources": {
    number: "5-6.",
    title: "참고 링크와 공식 자료"
  }
};

export const chapterConfig = [
  {
    id: "basics",
    title: "0. 이해와 예방",
    description: "전세를 알고 위험을 줄이기",
    slugs: ["jeonse-basics", "fraud-prevention"]
  },
  {
    id: "response",
    title: "1. 피해 대응",
    description: "의심 상황에서 내 위치 찾기",
    slugs: [
      "suspected-fraud-roadmap",
      "current-situation-diagnosis",
      "insurance-status-check",
      "senior-priority-response",
      "junior-priority-response"
    ]
  },
  {
    id: "application",
    title: "2. 신청과 법적 대응",
    description: "신청, 청구, 법원 절차 실행하기",
    slugs: [
      "victim-application",
      "insurance-claim",
      "lease-registration-order",
      "payment-order-lawsuit",
      "auction-distribution-response",
      "enforcement-long-term-recovery"
    ]
  },
  {
    id: "recovery",
    title: "3. 피해 회복",
    description: "결과 이후 돈과 주거 정리하기",
    slugs: [
      "insurance-claim-completed",
      "victim-decision-completed",
      "auction-completed",
      "partial-deposit-recovery",
      "housing-life-stabilization"
    ]
  },
  {
    id: "next-home",
    title: "4. 다음 집은 안전하게",
    description: "새 계약과 재계약 다시 점검하기",
    slugs: [
      "safe-next-home",
      "before-contract-check",
      "contract-day-check",
      "after-move-in-check",
      "renewal-check"
    ]
  },
  {
    id: "resources",
    title: "5. 서류와 자료",
    description: "서류, 번호, 공식 자료 모아두기",
    slugs: [
      "document-checklist",
      "agency-contacts",
      "case-number-tracker",
      "consultation-log",
      "evidence-archive",
      "official-resources"
    ]
  }
] as const;
