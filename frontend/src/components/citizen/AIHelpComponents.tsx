import { Lightbulb, X, Loader2 } from "lucide-react";

interface AIHelpButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const AIHelpButton = ({ onClick, isLoading, disabled }: AIHelpButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
      title="Otrzymaj pomoc AI w wypełnieniu tego pola"
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
  );
};

interface AIQuestionsDisplayProps {
  questions: string[];
  onClose: () => void;
}

export const AIQuestionsDisplay = ({ questions, onClose }: AIQuestionsDisplayProps) => {
  if (questions.length === 0) return null;

  return (
    <div className="p-4 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-900 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1">
          <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <p className="text-xs font-medium text-amber-900 dark:text-amber-100">
              Pomoc AI - odpowiedz na poniższe pytania:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {questions.map((question, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 font-medium flex-shrink-0">
                    {index + 1}.
                  </span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          title="Zamknij"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

interface AIErrorDisplayProps {
  error: string;
}

export const AIErrorDisplay = ({ error }: AIErrorDisplayProps) => {
  return (
    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
      <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
    </div>
  );
};
