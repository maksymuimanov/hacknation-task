import { useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, AlertCircle, Upload, Plus } from "lucide-react";
import type { AccidentCase } from "./types";

interface CaseSidebarProps {
  cases: AccidentCase[];
  selectedCaseId: string | null;
  onSelectCase: (id: string) => void;
  onUploadFile: (file: File) => void;
}

/**
 * Sidebar component displaying list of accident cases.
 * Includes upload functionality for new PDF files.
 * Uses sidebar-* CSS variables from the design system.
 */
export function CaseSidebar({
  cases,
  selectedCaseId,
  onSelectCase,
  onUploadFile,
}: CaseSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onUploadFile(file);
    }
    // Reset input so the same file can be uploaded again
    event.target.value = "";
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const getStatusIcon = (status: AccidentCase["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-rose-500" />;
    }
  };

  return (
    <aside className="w-80 border-r border-sidebar-border bg-sidebar flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="font-semibold text-lg text-sidebar-foreground tracking-tight">
          Zgłoszenia wypadków
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {cases.filter((c) => c.status === "pending").length} oczekujących
        </p>
      </div>

      {/* Upload Button */}
      <div className="p-3 border-b border-sidebar-border">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          onClick={triggerUpload}
          variant="outline"
          className="w-full justify-center gap-2 border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-colors"
        >
          <Upload className="h-4 w-4" />
          Wgraj nowy PDF
        </Button>
      </div>

      {/* Cases List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {cases.map((caseItem) => (
            <Button
              key={caseItem.id}
              variant={selectedCaseId === caseItem.id ? "secondary" : "ghost"}
              className={`w-full justify-start h-auto py-3 px-3 ${selectedCaseId === caseItem.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/50"
                }`}
              onClick={() => onSelectCase(caseItem.id)}
            >
              <div className="flex gap-3 text-left w-full items-start">
                <div className="mt-0.5 shrink-0">
                  {getStatusIcon(caseItem.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate text-sm">
                    {caseItem.applicantName}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                    <FileText className="h-3 w-3 shrink-0" />
                    <span>{caseItem.accidentDate}</span>
                    {caseItem.isUploaded && (
                      <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-medium">
                        <Plus className="h-2 w-2 inline -mt-0.5" /> Nowy
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
