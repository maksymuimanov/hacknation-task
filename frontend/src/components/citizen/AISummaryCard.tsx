import type { CitizenSchema } from "./validations/citizen-schema";
import { Sparkles, Loader2, ChevronDown, ChevronUp, FileText, ClipboardList, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useAISuggestion } from "./hooks/useAISuggestion";

interface AISummaryCardProps {
  data: CitizenSchema;
}

export const AISummaryCard = ({ data }: AISummaryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const buildContextPrompt = (): string => {
    const parts: string[] = [];

    parts.push(`Dane osobowe: ${data.name}`);

    if (data.accident) {
      parts.push(`\nWypadek:`);
      parts.push(`- Data: ${data.accident.date?.toLocaleDateString('pl-PL')}`);
      parts.push(`- Miejsce: ${data.accident.location}`);
      parts.push(`- Urazy: ${data.accident.injuries}`);

      if (data.accident.medicalAidProvided) {
        parts.push(`- Udzielono pomocy medycznej: ${data.accident.medicalFacilityName || 'Tak'}`);
        if (data.accident.hospitalizationPeriod) {
          parts.push(`- Hospitalizacja: ${data.accident.hospitalizationPeriod}`);
        }
      }

      parts.push(`- Przebieg: ${data.accident.detailedDescription}`);
      parts.push(`- Przyczyna: ${data.accident.causeDescription}`);
    }

    const customPrompt = `Jesteś ekspertem ZUS wspierającym osoby prowadzące działalność gospodarczą, które zgłaszają wypadek przy pracy.

Na podstawie poniższych danych z formularza systemu wspierania zgłoszeń i decyzji ZUS:
${parts.join('\n')}

Przygotuj ZWIĘZŁE, SPERSONALIZOWANE podsumowanie zawierające:

1. **Kolejne kroki** - listę 3-5 konkretnych czynności, które poszkodowany powinien podjąć po zapisaniu zgłoszenia
2. **Dokumenty do przedłożenia** - spersonalizowaną listę dokumentów, które należy dołączyć do zawiadomienia (uwzględnij specyfikę tego konkretnego wypadku)

Dane, które otrzymałeś są już z formularza wspierającego osoby prowadzące działalność gospodarczą, które zgłaszają wypadek przy pracy.

Formatowanie:
- Używaj markdown (nagłówki ##, listy -)
- Bądź konkretny i zwięzły
- Nie powtarzaj informacji już podanych w formularzu

Max 150 słów (nie podawaj ilości słów).`;

    return customPrompt;
  };

  const { isLoading, suggestion, error, generateSuggestion } = useAISuggestion({
    customPrompt: "true",
  });

  const handleGenerate = async () => {
    setIsExpanded(true);
    await generateSuggestion(buildContextPrompt());
  };

  return (
    <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-primary text-primary-foreground flex-shrink-0">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-base text-foreground">
              Spersonalizowane rekomendacje AI
            </h3>
            {suggestion && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring rounded px-2 py-1 flex items-center gap-1"
                aria-label={isExpanded ? "Zwiń" : "Rozwiń"}
              >
                {isExpanded ? (
                  <>
                    Zwiń <ChevronUp className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Rozwiń <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </button>
            )}
          </div>

          {!suggestion && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                AI przeanalizuje Twoje zgłoszenie i wygeneruje listę czynności oraz dokumentów dopasowanych do Twojej sytuacji.
              </p>
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Myślę...</span>
                  </>
                ) : (
                  <>
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span>Pomoc AI</span>
                  </>
                )}
              </button>
            </div>
          )}

          {error && (
            <div className="mt-3 p-3 rounded-md bg-destructive/10 text-destructive text-xs">
              <p className="font-medium">Błąd:</p>
              <p>{error}</p>
            </div>
          )}

          {isExpanded && suggestion && (
            <div className="mt-3 space-y-3 pt-3 border-t border-border animate-in fade-in duration-200">
              <div className="prose prose-sm max-w-none">
                <div className="text-sm text-foreground whitespace-pre-wrap">
                  {suggestion.split('\n').map((line, idx) => {
                    if (line.startsWith('## ')) {
                      return (
                        <div key={idx} className="flex items-center gap-2 font-semibold text-primary mt-3 mb-2">
                          {line.includes('krok') || line.includes('Krok') || line.includes('czynności') ? (
                            <ClipboardList className="h-4 w-4 flex-shrink-0" />
                          ) : (
                            <FileText className="h-4 w-4 flex-shrink-0" />
                          )}
                          <span>{line.replace('## ', '')}</span>
                        </div>
                      );
                    }
                    if (line.trim().startsWith('-')) {
                      return (
                        <div key={idx} className="flex items-start gap-2 ml-6 mb-1">
                          <span className="text-primary mt-1">•</span>
                          <span className="flex-1">{line.replace(/^-\s*/, '')}</span>
                        </div>
                      );
                    }

                    if (line.trim()) {
                      return <p key={idx} className="mb-2">{line}</p>;
                    }
                    return <br key={idx} />;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
