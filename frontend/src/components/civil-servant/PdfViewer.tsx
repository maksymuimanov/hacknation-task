import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
  Loader2,
} from "lucide-react";
import type { CaseDocument, AccidentCase } from "./types";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfViewerProps {
  selectedCase: AccidentCase | null;
}

/**
 * PDF Viewer component with document tabs, pagination and zoom.
 * Follows Single Responsibility - only handles PDF display logic.
 */
export function PdfViewer({ selectedCase }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [activeDocIndex, setActiveDocIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const activeDocument: CaseDocument | null =
    selectedCase?.documents[activeDocIndex] || null;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
  }

  function onDocumentLoadStart(): void {
    setIsLoading(true);
  }

  function changePage(offset: number) {
    setPageNumber((prev) => Math.max(1, Math.min(numPages, prev + offset)));
  }

  function handleDocumentChange(index: number) {
    setActiveDocIndex(index);
    setPageNumber(1);
  }

  // Empty state
  if (!selectedCase) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-3 p-8">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <p className="text-muted-foreground">
            Wybierz zgłoszenie z listy, aby wyświetlić dokumenty.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-muted/10">
      {/* Document Tabs */}
      <div className="border-b border-border bg-card/50 px-2 pt-2 flex gap-1 overflow-x-auto">
        {selectedCase.documents.map((doc, idx) => (
          <button
            key={doc.type}
            onClick={() => handleDocumentChange(idx)}
            className={`px-3 py-2 text-sm rounded-t-md border border-b-0 transition-colors whitespace-nowrap ${activeDocIndex === idx
                ? "bg-background border-border text-foreground font-medium"
                : "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
          >
            {doc.name}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="h-12 border-b border-border/50 flex items-center justify-between px-4 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Strona {pageNumber} z {numPages || "..."}
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs w-12 text-center tabular-nums">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={pageNumber <= 1 || isLoading}
            onClick={() => changePage(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={pageNumber >= numPages || isLoading}
            onClick={() => changePage(1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Display */}
      <div className="flex-1 overflow-auto p-6 flex justify-center">
        {activeDocument && (
          <Document
            file={activeDocument.url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadStart={onDocumentLoadStart}
            loading={
              <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            }
            className="shadow-lg rounded-lg overflow-hidden"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="bg-white"
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        )}
      </div>
    </div>
  );
}
