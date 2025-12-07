import { Info, FileDown, FileCheck, Send } from "lucide-react";
import { useState } from "react";

export const NextStepsInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-6 p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-primary text-primary-foreground flex-shrink-0">
          <Info className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base text-foreground mb-2">
            Następne kroki po zapisaniu
          </h3>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <FileDown className="h-3.5 w-3.5 text-primary" />
                <span>Pobierz dokument</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileCheck className="h-3.5 w-3.5 text-secondary" />
                <span>Podpisz</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5 text-accent-foreground" />
                <span>Wyślij przez PUE/eZUS lub osobiście</span>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded px-1"
            >
              {isExpanded ? "Zwiń szczegóły ▲" : "Rozwiń szczegóły ▼"}
            </button>

            {isExpanded && (
              <div className="mt-3 space-y-3 pt-3 border-t border-border">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <FileDown className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        1. Pobierz zawiadomienie o wypadku
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Zapoznaj się z treścią dokumentu
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <FileCheck className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        2. Złóż podpis
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Jeśli akceptujesz treść dokumentu
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Send className="h-4 w-4 text-accent-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        3. Prześlij do ZUS
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-0.5 mt-1">
                        <li>- Elektronicznie: PUE/eZUS</li>
                        <li>- Osobiście: dowolna placówka ZUS</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
