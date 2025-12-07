import { useState, useCallback } from "react";
import { OpenRouter } from "@openrouter/sdk";

interface UseSimpleAIHelpProps {
  fieldLabel: string;
  context?: string;
}

export const useSimpleAIHelp = ({ fieldLabel, context }: UseSimpleAIHelpProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const askForHelp = useCallback(async (currentText: string) => {
    setIsLoading(true);
    setError(null);
    setQuestions([]);

    try {
      const client = new OpenRouter({
        apiKey: import.meta.env.VITE_OPEN_ROUTER_API_KEY,
      });

      const prompt = `Jesteś pomocnym asystentem wspierającym osoby zgłaszające wypadek przy pracy do ZUS.

Użytkownik wypełnia pole: "${fieldLabel}"
${currentText ? `Dotychczas wpisał: "${currentText}"` : "Pole jest jeszcze puste."}
${context ? `Dodatkowy kontekst: ${context}` : ""}

Twoim zadaniem jest zadanie 2-3 konkretnych pytań, które pomogą użytkownikowi wypełnić to pole szczegółowo i zgodnie z wymaganiami ZUS.

Pytania powinny:
- Być proste i zrozumiałe
- Pomóc ustalić sekwencję zdarzeń, przyczyny zewnętrzne i skutki
- Być konkretne dla tego pola formularza
- Zachęcać do podania szczegółów

Zwróć TYLKO listę 2-3 pytań, każde w osobnej linii, zaczynając od "- ".`;

      const response = await client.chat.send({
        model: "x-ai/grok-4.1-fast",
        messages: [
          { role: "user", content: prompt }
        ],
      });

      const content = response.choices[0]?.message?.content;
      const aiResponse = typeof content === "string" ? content : "";

      const parsedQuestions = aiResponse
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim().substring(1).trim())
        .filter(q => q.length > 0);

      setQuestions(parsedQuestions);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Nie udało się połączyć z AI";
      setError(errorMessage);
      console.error("AI Help Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [fieldLabel, context]);

  const clearQuestions = useCallback(() => {
    setQuestions([]);
    setError(null);
  }, []);

  return {
    isLoading,
    questions,
    error,
    askForHelp,
    clearQuestions,
    hasQuestions: questions.length > 0,
  };
};
