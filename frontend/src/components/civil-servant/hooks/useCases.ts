import { useState, useCallback } from "react";
import type { AccidentCase, CaseDocument } from "../types";
import { MOCK_CASES } from "../mock-data";

/**
 * Hook for managing accident cases.
 * Handles both pre-loaded mock cases and user-uploaded cases.
 * Follows Single Responsibility Principle - only manages case state.
 */
export function useCases() {
  const [cases, setCases] = useState<AccidentCase[]>(MOCK_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const selectedCase = cases.find((c) => c.id === selectedCaseId) || null;

  /**
   * Add a new case from uploaded PDF file.
   * Stores the file in memory as a blob URL.
   */
  const addUploadedCase = useCallback((file: File) => {
    const blobUrl = URL.createObjectURL(file);
    const newCase: AccidentCase = {
      id: `uploaded-${Date.now()}`,
      applicantName: file.name.replace(".pdf", ""),
      accidentDate: new Date().toISOString().split("T")[0],
      status: "pending",
      isUploaded: true,
      documents: [
        {
          type: "zawiadomienie",
          name: file.name,
          url: blobUrl,
        },
      ],
    };

    setCases((prev) => [newCase, ...prev]);
    setSelectedCaseId(newCase.id);

    return newCase.id;
  }, []);

  /**
   * Select a case by ID
   */
  const selectCase = useCallback((id: string | null) => {
    setSelectedCaseId(id);
  }, []);

  /**
   * Get a specific document from the selected case
   */
  const getDocument = useCallback(
    (docType: CaseDocument["type"]): CaseDocument | null => {
      if (!selectedCase) return null;
      return selectedCase.documents.find((d) => d.type === docType) || null;
    },
    [selectedCase]
  );

  return {
    cases,
    selectedCase,
    selectedCaseId,
    selectCase,
    addUploadedCase,
    getDocument,
  };
}
