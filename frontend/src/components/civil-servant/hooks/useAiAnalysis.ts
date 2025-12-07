import { useState, useCallback } from "react";
import type { AccidentCase, AiAnalysisResult, PillarAnalysis } from "../types";

const ANALYSIS_PROMPT = `Jesteś ekspertem prawa pracy ZUS analizującym wypadki przy pracy.

UWAGA: Dokument może być skanem pisma odręcznego lub wydruku. Odczytaj tekst najlepiej jak potrafisz (OCR).

Przeanalizuj załączony dokument PDF i oceń czy zdarzenie spełnia 4 filary wypadku przy pracy zgodnie z ustawą z dnia 30 października 2002 r.:

1. **Nagłość zdarzenia** - czy zdarzenie było nagłe (trwało nie dłużej niż jedną dniówkę roboczą)?
2. **Przyczyna zewnętrzna** - czy przyczyna pochodziła spoza organizmu poszkodowanego (np. maszyna, warunki, inna osoba)?
3. **Uraz** - czy doszło do uszkodzenia ciała lub narządów?
4. **Związek z pracą** - czy wypadek nastąpił podczas wykonywania czynności związanych z prowadzoną działalnością gospodarczą?

Odpowiedz WYŁĄCZNIE poprawnym JSON (bez markdown, bez komentarzy):
{
  "pillars": [
    {"name": "Nagłość zdarzenia", "status": true, "reason": "uzasadnienie"},
    {"name": "Przyczyna zewnętrzna", "status": true, "reason": "uzasadnienie"},
    {"name": "Uraz", "status": true, "reason": "uzasadnienie"},
    {"name": "Związek z pracą", "status": true, "reason": "uzasadnienie"}
  ],
  "opinion": "Pełna treść projektu opinii prawnej z uzasadnieniem...",
  "recommendation": "approve"
}

Gdzie status to true jeśli filar jest spełniony, false jeśli nie.
Gdzie recommendation to "approve" jeśli wszystkie filary spełnione, "reject" jeśli którykolwiek nie.`;

function parseAiResponse(content: unknown): AiAnalysisResult {
  const text = typeof content === "string" ? content : "";

  // Extract JSON from potential markdown code blocks
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
  const jsonString = jsonMatch[1]?.trim() || text.trim();

  try {
    const parsed = JSON.parse(jsonString);

    // Validate structure
    if (!parsed.pillars || !Array.isArray(parsed.pillars)) {
      throw new Error("Invalid pillars format");
    }

    return {
      pillars: parsed.pillars.map((p: PillarAnalysis) => ({
        name: String(p.name || ""),
        status: Boolean(p.status),
        reason: String(p.reason || "Brak uzasadnienia"),
      })),
      opinion: String(parsed.opinion || "Brak opinii"),
      recommendation: parsed.recommendation === "reject" ? "reject" : "approve",
    };
  } catch {
    // Fallback if parsing fails
    return {
      pillars: [
        { name: "Nagłość zdarzenia", status: false, reason: "Nie udało się przeanalizować dokumentu" },
        { name: "Przyczyna zewnętrzna", status: false, reason: "Nie udało się przeanalizować dokumentu" },
        { name: "Uraz", status: false, reason: "Nie udało się przeanalizować dokumentu" },
        { name: "Związek z pracą", status: false, reason: "Nie udało się przeanalizować dokumentu" },
      ],
      opinion: `Błąd parsowania odpowiedzi AI. Surowa odpowiedź: ${text.substring(0, 500)}...`,
      recommendation: "reject",
    };
  }
}

async function fetchPdfAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Returns full data URL like: data:application/pdf;base64,xxxxx
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function useAiAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (selectedCase: AccidentCase) => {
    setAnalyzing(true);
    setError(null);

    try {
      const pdfUrl = selectedCase.documents[0]?.url;
      if (!pdfUrl) {
        throw new Error("Brak dokumentu do analizy");
      }

      const pdfDataUrl = await fetchPdfAsDataUrl(pdfUrl);

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPEN_ROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "ZUS Accident Notification Tool",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: pdfDataUrl,
                  },
                },
                {
                  type: "text",
                  text: ANALYSIS_PROMPT,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const parsed = parseAiResponse(data.choices?.[0]?.message?.content);
      setAnalysis(parsed);
    } catch (err) {
      console.error("AI Analysis Error:", err);
      setError(err instanceof Error ? err.message : "Błąd analizy AI");
    } finally {
      setAnalyzing(false);
    }
  }, []);

  return { analyzing, analysis, error, analyze, resetAnalysis: () => setAnalysis(null) };
}