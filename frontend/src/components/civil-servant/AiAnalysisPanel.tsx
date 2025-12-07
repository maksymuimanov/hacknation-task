import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, RefreshCcw, Sparkles, FileQuestion } from "lucide-react";
import type { AccidentCase } from "./types";
import { useAiAnalysis } from "./hooks/useAiAnalysis";

interface AiAnalysisPanelProps {
  selectedCase: AccidentCase | null;
}

export function AiAnalysisPanel({ selectedCase }: AiAnalysisPanelProps) {
  const { analyzing, analysis, error, analyze, resetAnalysis } = useAiAnalysis();

  const handleAnalyze = () => {
    if (selectedCase) {
      analyze(selectedCase);
    }
  };

  if (!selectedCase) {
    return (
      <aside className="w-96 border-l border-border bg-card flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground flex items-center gap-2 pt-3">
            <Sparkles className="h-4 w-4 text-primary" />
            Asystent AI
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              Wybierz sprawę, aby przeprowadzić analizę AI.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-96 border-l border-border bg-card flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Asystent AI
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Analiza zgodności z definicją wypadku
        </p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {!analysis ? (
          <div className="space-y-4">
            <Card className="border-dashed border-2 border-border bg-transparent">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  System przeanalizuje dokumentację i sprawdzi zgodność z 4 filarami wypadku przy pracy.
                </p>
                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full"
                >
                  {analyzing ? (
                    <>
                      <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                      Analizowanie...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Rozpocznij analizę
                    </>
                  )}
                </Button>
                {error && (
                  <div className="mt-3 p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">
                    <p className="font-medium">Błąd:</p>
                    <p>{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Weryfikacja 4 filarów
              </h3>
              {analysis.pillars.map((pillar, idx) => (
                <Card key={idx} className="bg-background border-border">
                  <CardHeader className="p-3 pb-1">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      {pillar.name}
                      {pillar.status ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-1">
                    <p className="text-xs text-muted-foreground">{pillar.reason}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Projekt opinii
              </h3>
              <div className="p-3 rounded-lg bg-background border border-border text-sm leading-relaxed">
                {analysis.opinion}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Rekomendacja
              </h3>
              <div
                className={`p-3 rounded-lg text-center font-semibold border ${analysis.recommendation === "approve"
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-destructive/10 text-destructive border-destructive/20"
                  }`}
              >
                {analysis.recommendation === "approve"
                  ? "✓ UZNAĆ WYPADEK PRZY PRACY"
                  : "✗ ODMÓWIĆ UZNANIA"}
              </div>
            </div>

            <Button
              variant="outline"
              onClick={resetAnalysis}
              className="w-full border-border mb-5"
            >
              Nowa analiza
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
