import { z } from "zod";

const sourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  publisher: z.string().min(1),
  lastVerifiedAt: z.string().date(),
  note: z.string()
});

const childQuestionSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  hasChildren: z.literal(false)
});

const followupSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  hasChildren: z.boolean()
});

const questionSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  situationTags: z.array(z.string()).default([]),
  urgency: z.enum(["low", "medium", "high", "critical"]).optional(),
  actions: z.array(z.string()).default([]),
  requiredDocuments: z.array(z.string()).default([]),
  relatedAgencies: z.array(z.string()).default([]),
  deadlineNote: z.string().default(""),
  sources: z.array(sourceSchema).default([]),
  followups: z.array(followupSchema).default([])
});

const sectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  overview: z.string().min(1),
  analogyBox: z
    .object({
      title: z.string().min(1),
      body: z.string().min(1)
    })
    .optional(),
  questions: z.array(questionSchema)
});

export const contentDocumentSchema = z
  .object({
    meta: z.object({
      title: z.string().min(1),
      audience: z.string().min(1),
      contentType: z.string().min(1),
      version: z.string().min(1),
      lastUpdatedAt: z.string().date()
    }),
    document: z.object({
      sections: z.array(sectionSchema)
    }),
    children: z.record(z.string(), z.array(childQuestionSchema)).default({})
  })
  .superRefine((document, context) => {
    const visibleIds = new Set<string>();
    const allIds = new Set<string>();
    const requiredChildren = new Set<string>();

    const registerId = (id: string, path: (string | number)[]) => {
      if (allIds.has(id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate id: ${id}`,
          path
        });
      }

      allIds.add(id);
    };

    document.document.sections.forEach((section, sectionIndex) => {
      registerId(section.id, ["document", "sections", sectionIndex, "id"]);
      visibleIds.add(section.id);

      section.questions.forEach((question, questionIndex) => {
        registerId(question.id, [
          "document",
          "sections",
          sectionIndex,
          "questions",
          questionIndex,
          "id"
        ]);
        visibleIds.add(question.id);

        question.followups.forEach((followup, followupIndex) => {
          registerId(followup.id, [
            "document",
            "sections",
            sectionIndex,
            "questions",
            questionIndex,
            "followups",
            followupIndex,
            "id"
          ]);
          visibleIds.add(followup.id);

          if (followup.hasChildren) {
            requiredChildren.add(followup.id);
          }
        });
      });
    });

    Object.entries(document.children).forEach(([parentId, children]) => {
      if (!visibleIds.has(parentId)) {
        context.addIssue({
          code: "custom",
          message: `Children key does not match a visible id: ${parentId}`,
          path: ["children", parentId]
        });
      }

      children.forEach((child, childIndex) => {
        registerId(child.id, ["children", parentId, childIndex, "id"]);
      });
    });

    requiredChildren.forEach((id) => {
      if (!document.children[id]) {
        context.addIssue({
          code: "custom",
          message: `Missing children entry for ${id}`,
          path: ["children"]
        });
      }
    });
  });

export type ContentDocument = z.infer<typeof contentDocumentSchema>;
