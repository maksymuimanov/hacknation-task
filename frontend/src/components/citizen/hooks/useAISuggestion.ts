import { useState, useCallback } from "react";
import { OpenRouter } from "@openrouter/sdk";

interface UseAISuggestionProps {
  context?: string;
  customPrompt?: string;
}

export const useAISuggestion = ({ context, customPrompt }: UseAISuggestionProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const generateSuggestion = useCallback(async (currentText: string) => {
    if (!customPrompt && (!currentText || currentText.trim().length < 10)) {
      setError("Wpisz przynajmniej kilka słów, aby AI mogło pomóc");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const client = new OpenRouter({
        apiKey: import.meta.env.VITE_OPEN_ROUTER_API_KEY,
      });

      const prompt = customPrompt
        ? currentText
        : `Jesteś pomocnym asystentem wspierającym osoby zgłaszające wypadek przy pracy do ZUS. 

Użytkownik zaczął opisywać wypadek: "${currentText}"

${context ? `Kontekst: ${context}` : ""}

Twoim zadaniem jest odpowiednie zadanie 2-3 pytań, aby użytkownik mógł się rozwinąć i wypełnić formularz.

Nie powtarzaj tego co użytkownik już napisał. Bądź konkretny i pomocny.`;

      const response = await client.chat.send({
        model: "x-ai/grok-4.1-fast",
        messages: [
          { role: "user", content: prompt }
        ],
      });

      const content = response.choices[0]?.message?.content;
      const aiSuggestion = typeof content === "string" ? content : "";
      setSuggestion(aiSuggestion);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Nie udało się połączyć z AI";
      setError(errorMessage);
      console.error("AI Suggestion Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [context, customPrompt]);

  const clearSuggestion = useCallback(() => {
    setSuggestion("");
    setError(null);
  }, []);

  return {
    isLoading,
    suggestion,
    error,
    generateSuggestion,
    clearSuggestion,
  };
};
