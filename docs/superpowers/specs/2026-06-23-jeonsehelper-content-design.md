# JeonseHelper Content Design

## Goal

Build JeonseHelper as a question-tree guide for jeonse basics, fraud prevention, and suspected fraud response. The key product value is a situation-based roadmap that helps ordinary tenants navigate a long, multi-agency recovery process.

## Audience

- First-time jeonse tenants
- Young workers, newly married couples, and foreign residents
- Tenants who suspect jeonse fraud or deposit return risk
- Non-experts who need scattered official information organized into steps

## Content Model

Each major topic is stored as a separate JSON document:

- `jeonse-basics.json`
- `fraud-prevention.json`
- `suspected-fraud-roadmap.json`

Content follows this hierarchy:

```text
section
└─ representative question
   └─ first-level followup
      └─ deeper child question
```

Fraud-response items can include `actions`, `requiredDocuments`, `relatedAgencies`, `deadlineNote`, `situationTags`, `urgency`, and official `sources`.

## Core Roadmap

The main response flow starts at `1. 전세 사기가 의심 돼요`.

The first diagnosis order is:

1. Guaranty insurance status: present, absent, unknown
2. Landlord contact status: cooperative, delaying, unreachable
3. Contract status: before end, near end, after end with unpaid deposit
4. Evidence collection: contract, transfer records, messages, call logs, registration documents

## Source Policy

Policy and procedure content must reference official sources and include `lastVerifiedAt`. Local government and private sources can support explanation, but national official sources should be preferred for final procedural guidance.

## Technical Direction

Start with a static JSON-driven web app:

- Next.js
- TypeScript
- Zod or JSON Schema validation
- Static JSON content
- Search and expand/collapse viewer
- Source metadata rendering

## Verification Requirements

Implementation work should finish with:

- lint
- type check
- content schema validation
- representative desktop and mobile UI verification

