# Content Schema

## Format

Recommended authoring format is JSON. Markdown can be used only for human drafting before conversion.

The content is a question-tree tutorial:

```text
section
└─ representative question
   └─ first-level followup
      └─ deeper child question
```

## Base Shape

```json
{
  "meta": {
    "title": "문서 제목",
    "audience": "대상 독자",
    "contentType": "question-tree-roadmap",
    "version": "0.1.0",
    "lastUpdatedAt": "2026-06-23"
  },
  "document": {
    "sections": [
      {
        "id": "s1",
        "title": "섹션 제목",
        "overview": "섹션 개요",
        "questions": [
          {
            "id": "s1_q1",
            "question": "대표 질문?",
            "answer": "답변입니다.",
            "situationTags": ["example-tag"],
            "urgency": "medium",
            "actions": ["해야 할 일을 씁니다."],
            "requiredDocuments": ["필요 서류"],
            "relatedAgencies": ["기관명"],
            "deadlineNote": "기한 관련 주의사항",
            "sources": [
              {
                "title": "공식 자료명",
                "url": "https://official-source-url.go.kr",
                "publisher": "기관명",
                "lastVerifiedAt": "2026-06-23",
                "note": "확인할 항목"
              }
            ],
            "followups": [
              {
                "id": "s1_q1_f1",
                "question": "꼬리질문?",
                "answer": "답변입니다.",
                "hasChildren": true
              }
            ]
          }
        ]
      }
    ]
  },
  "children": {
    "s1_q1_f1": [
      {
        "id": "s1_q1_f1_c1",
        "question": "더 깊은 질문?",
        "answer": "답변입니다.",
        "hasChildren": false
      }
    ]
  }
}
```

## Required Rules

- Every `id` must be unique within one document.
- IDs should show hierarchy, such as `s1`, `s1_q1`, `s1_q1_f1`, `s1_q1_f1_c1`.
- If `hasChildren` is `true`, `children` must contain the same id as a key.
- `sections` are large topics.
- `questions` are representative questions.
- `followups` are first-level questions shown from the beginning.
- `children` are deeper questions shown after expansion.
- `answer` should usually be 2 to 5 clear sentences.

## Jeonse Fraud Roadmap Fields

The fraud-response roadmap may use these additional fields:

- `situationTags`: Situation matching tags, such as `insurance-unknown`, `landlord-unreachable`, `after-contract-end`.
- `urgency`: `low`, `medium`, `high`, or `critical`.
- `actions`: Concrete next actions.
- `requiredDocuments`: Documents or evidence to prepare.
- `relatedAgencies`: Related institutions, such as HUG, HF, SGI, police, court, local government.
- `deadlineNote`: Deadline or timing notes.
- `sources`: Official references with verification dates.

## Inline Body Syntax

`overview` and `answer` may include:

```md
{tip:용어}(설명 | 강조 설명 | 추가 설명)

`inline code`

```ts
const value = 1;
```

```prompt
LLM에게 복사해서 넣을 프롬프트 전문
```

> 참고: 참고 박스로 보여줄 내용

![이미지 설명](https://example.com/image.png){size=medium align=center caption="캡션"}

![자리표시](ph:이미지 자리표시 설명){size=large align=center}
```

Image options:

```text
size=small | medium | large
align=left | center | right | full
caption="캡션"
modal
thumb
```

## LLM Authoring Prompt

```text
당신은 "질문 트리형 인터랙티브 튜토리얼"을 작성하는 전문 기술 에디터입니다.

아래 JSON 스키마에 맞춰 유효한 JSON 객체만 출력하세요.
설명, 코드펜스, 주석, 부가 문장은 절대 붙이지 마세요.

이 튜토리얼은 일반 블로그 글이 아닙니다.
구조는 반드시 다음 계층을 따릅니다.

1. section: 큰 주제
2. question: 대표 질문
3. followup: 1차 꼬리질문
4. children: 펼쳤을 때 보이는 깊은 하위 질문

작성 규칙:
- 모든 id는 문서 전체에서 고유해야 합니다.
- id는 s1, s1_q1, s1_q1_f1, s1_q1_f1_c1처럼 계층을 알 수 있게 작성합니다.
- 대표 질문 1개당 followup은 2~4개 작성합니다.
- 깊은 설명이 필요한 followup 일부에만 hasChildren:true를 둡니다.
- hasChildren:true인 항목은 반드시 children 객체에 같은 id 키로 하위 질문 배열을 추가합니다.
- answer는 결론부터 2~5문장으로 작성합니다.
- 깊은 하위 질문으로 갈수록 더 구체적인 예시, 주의점, 실무 판단 기준을 씁니다.
- 문체는 담백하고 단정한 설명체로 씁니다.
- 과장, 감탄사, 마케팅 문구는 쓰지 않습니다.

이제 아래 조건으로 튜토리얼 JSON을 작성하세요.

주제: <작성할 주제>
대상 독자: <대상 독자>
난이도: [입문/중급/고급]
섹션 수: <숫자>
섹션당 대표 질문 수: <숫자>
반드시 포함할 내용: <포함할 내용>
```
