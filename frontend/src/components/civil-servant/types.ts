/**
 * Types for the ZUS Civil Servant dashboard
 */

export type CaseStatus = "pending" | "approved" | "rejected";

export type DocumentType =
  | "zawiadomienie"
  | "wyjasnienia"
  | "opinia"
  | "karta";

export interface CaseDocument {
  type: DocumentType;
  name: string;
  url: string;
}

export interface AccidentCase {
  id: string;
  applicantName: string;
  accidentDate: string;
  status: CaseStatus;
  documents: CaseDocument[];
  isUploaded: boolean; // Distinguishes user-uploaded cases from pre-loaded ones
}

export interface PillarAnalysis {
  name: string;
  status: boolean;
  reason: string;
}

export interface AiAnalysisResult {
  pillars: PillarAnalysis[];
  opinion: string;
  recommendation: "approve" | "reject";
}
