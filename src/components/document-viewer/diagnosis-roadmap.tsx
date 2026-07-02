"use client";

import { ArrowRight, ClipboardList } from "lucide-react";
import { useMemo, useState } from "react";
import {
  type DiagnosisSelections,
  getRecommendedRoadmap
} from "./document-viewer-utils";

const diagnosisGroups = [
  {
    key: "insuranceStatus",
    title: "보증보험",
    options: [
      { label: "가입함", value: "present" },
      { label: "가입 안 함", value: "absent" },
      { label: "모름", value: "unknown" }
    ]
  },
  {
    key: "leaseStatus",
    title: "계약 상태",
    options: [
      { label: "만료 전", value: "before-end" },
      { label: "만료 임박", value: "near-end" },
      { label: "만료 후 미반환", value: "after-end" }
    ]
  },
  {
    key: "landlordStatus",
    title: "집주인 연락",
    options: [
      { label: "협의 가능", value: "cooperative" },
      { label: "지연·회피", value: "delaying" },
      { label: "연락 두절", value: "unreachable" }
    ]
  },
  {
    key: "evidenceStatus",
    title: "증거 보유",
    options: [
      { label: "충분함", value: "complete" },
      { label: "일부 있음", value: "partial" },
      { label: "부족함", value: "missing" }
    ]
  }
] as const;

const initialSelections: DiagnosisSelections = {
  evidenceStatus: "partial",
  insuranceStatus: "unknown",
  landlordStatus: "delaying",
  leaseStatus: "near-end"
};

const sectionIndexById = {
  diagnosis: "1-2",
  "insurance-status": "1-3",
  "senior-priority": "1-4",
  "junior-priority": "1-5",
  "victim-application": "2-1",
  "insurance-claim": "2-2",
  "lease-registration": "2-3"
} as const;

export function DiagnosisRoadmap() {
  const [selections, setSelections] =
    useState<DiagnosisSelections>(initialSelections);

  const recommendations = useMemo(
    () => getRecommendedRoadmap(selections),
    [selections]
  );

  const updateSelection = <Key extends keyof DiagnosisSelections>(
    key: Key,
    value: DiagnosisSelections[Key]
  ) => {
    setSelections((current) => ({
      ...current,
      [key]: value
    }));
  };

  return (
    <section
      className="diagnosis-roadmap"
      id="diagnosis"
      aria-labelledby="diagnosis-title"
    >
      <div className="diagnosis-heading">
        <span className="diagnosis-icon" aria-hidden="true">
          <ClipboardList size={18} strokeWidth={2.4} />
        </span>
        <div>
          <h2 id="diagnosis-title">내 상황 진단하기</h2>
          <p>
            네 가지 상태를 고르면 지금 먼저 볼 절차가 자동으로 정렬됩니다.
          </p>
        </div>
      </div>

      <div className="diagnosis-grid">
        {diagnosisGroups.map((group) => (
          <fieldset className="diagnosis-fieldset" key={group.key}>
            <legend>{group.title}</legend>
            <div className="segmented-options">
              {group.options.map((option) => {
                const isSelected = selections[group.key] === option.value;

                return (
                  <button
                    aria-pressed={isSelected}
                    className={isSelected ? "is-selected" : ""}
                    key={option.value}
                    onClick={() =>
                      updateSelection(
                        group.key,
                        option.value as DiagnosisSelections[typeof group.key]
                      )
                    }
                    type="button"
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="recommendation-panel">
        <div className="recommendation-heading">
          <strong>추천 경로</strong>
          <span>상황에 따라 우선순위를 정렬했어요</span>
        </div>
        <ol>
          {recommendations.map((item, index) => (
            <li key={item.sectionId}>
              <span>{index + 1}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.reason}</p>
                <a href={`?doc=${item.documentSlug}`}>
                  목차 {sectionIndexById[item.sectionId]}로 이동
                  <ArrowRight size={15} strokeWidth={2.4} />
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
