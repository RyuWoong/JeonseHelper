import agencyContacts from "../../docs/research/agency-contacts.json";
import afterMoveInCheck from "../../docs/research/after-move-in-check.json";
import auctionCompleted from "../../docs/research/auction-completed.json";
import auctionDistributionResponse from "../../docs/research/auction-distribution-response.json";
import beforeContractCheck from "../../docs/research/before-contract-check.json";
import caseNumberTracker from "../../docs/research/case-number-tracker.json";
import consultationLog from "../../docs/research/consultation-log.json";
import contributing from "../../docs/research/contributing.json";
import contractDayCheck from "../../docs/research/contract-day-check.json";
import currentSituationDiagnosis from "../../docs/research/current-situation-diagnosis.json";
import documentChecklist from "../../docs/research/document-checklist.json";
import enforcementLongTermRecovery from "../../docs/research/enforcement-long-term-recovery.json";
import evidenceArchive from "../../docs/research/evidence-archive.json";
import fraudPrevention from "../../docs/research/fraud-prevention.json";
import housingLifeStabilization from "../../docs/research/housing-life-stabilization.json";
import insuranceClaim from "../../docs/research/insurance-claim.json";
import insuranceClaimCompleted from "../../docs/research/insurance-claim-completed.json";
import insuranceStatusCheck from "../../docs/research/insurance-status-check.json";
import introduction from "../../docs/research/introduction.json";
import jeonseBasics from "../../docs/research/jeonse-basics.json";
import juniorPriorityResponse from "../../docs/research/junior-priority-response.json";
import leaseRegistrationOrder from "../../docs/research/lease-registration-order.json";
import officialResources from "../../docs/research/official-resources.json";
import partialDepositRecovery from "../../docs/research/partial-deposit-recovery.json";
import paymentOrderLawsuit from "../../docs/research/payment-order-lawsuit.json";
import renewalCheck from "../../docs/research/renewal-check.json";
import safeNextHome from "../../docs/research/safe-next-home.json";
import seniorPriorityResponse from "../../docs/research/senior-priority-response.json";
import suspectedFraudRoadmap from "../../docs/research/suspected-fraud-roadmap.json";
import victimApplication from "../../docs/research/victim-application.json";
import victimDecisionCompleted from "../../docs/research/victim-decision-completed.json";
import {
  type ContentDocument,
  contentDocumentSchema
} from "./content-schema";

export type ContentDocumentEntry = {
  slug: string;
  document: ContentDocument;
};

const rawDocuments = [
  ["introduction", introduction],
  ["contributing", contributing],
  ["jeonse-basics", jeonseBasics],
  ["fraud-prevention", fraudPrevention],
  ["suspected-fraud-roadmap", suspectedFraudRoadmap],
  ["current-situation-diagnosis", currentSituationDiagnosis],
  ["insurance-status-check", insuranceStatusCheck],
  ["senior-priority-response", seniorPriorityResponse],
  ["junior-priority-response", juniorPriorityResponse],
  ["victim-application", victimApplication],
  ["insurance-claim", insuranceClaim],
  ["lease-registration-order", leaseRegistrationOrder],
  ["payment-order-lawsuit", paymentOrderLawsuit],
  ["auction-distribution-response", auctionDistributionResponse],
  ["enforcement-long-term-recovery", enforcementLongTermRecovery],
  ["insurance-claim-completed", insuranceClaimCompleted],
  ["victim-decision-completed", victimDecisionCompleted],
  ["auction-completed", auctionCompleted],
  ["partial-deposit-recovery", partialDepositRecovery],
  ["housing-life-stabilization", housingLifeStabilization],
  ["safe-next-home", safeNextHome],
  ["before-contract-check", beforeContractCheck],
  ["contract-day-check", contractDayCheck],
  ["after-move-in-check", afterMoveInCheck],
  ["renewal-check", renewalCheck],
  ["document-checklist", documentChecklist],
  ["agency-contacts", agencyContacts],
  ["case-number-tracker", caseNumberTracker],
  ["consultation-log", consultationLog],
  ["evidence-archive", evidenceArchive],
  ["official-resources", officialResources]
] as const;

export function getContentDocuments(): ContentDocumentEntry[] {
  return rawDocuments.map(([slug, rawDocument]) => ({
    slug,
    document: contentDocumentSchema.parse(rawDocument)
  }));
}
