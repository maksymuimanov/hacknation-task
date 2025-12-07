import { CaseSidebar } from "./CaseSidebar";
import { PdfViewer } from "./PdfViewer";
import { AiAnalysisPanel } from "./AiAnalysisPanel";
import { useCases } from "./hooks/useCases";

/**
 * Main dashboard component for ZUS Civil Servants.
 * Implements Stage 2 requirements: PDF viewing + AI analysis.
 * 
 * Layout: Sidebar (Cases) | Main (PDF Viewer) | Right Panel (AI Analysis)
 */
function CivilServant() {
  const { cases, selectedCase, selectedCaseId, selectCase, addUploadedCase } = useCases();

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Left Sidebar - Cases List */}
      <CaseSidebar
        cases={cases}
        selectedCaseId={selectedCaseId}
        onSelectCase={selectCase}
        onUploadFile={addUploadedCase}
      />

      {/* Main Content - PDF Viewer */}
      <main className="flex-1 flex flex-col">
        <PdfViewer selectedCase={selectedCase} />
      </main>

      {/* Right Panel - AI Analysis */}
      <AiAnalysisPanel selectedCase={selectedCase} />
    </div>
  );
}

export default CivilServant;
