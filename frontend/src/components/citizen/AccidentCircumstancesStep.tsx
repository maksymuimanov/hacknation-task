import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { AlertCircle } from "lucide-react";
import type { CitizenSchema } from "./validations/citizen-schema";
import { useSimpleAIHelp } from "./hooks/useSimpleAIHelp";
import { AIHelpButton, AIQuestionsDisplay, AIErrorDisplay } from "./AIHelpComponents";

export const AccidentCircumstancesStep = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<CitizenSchema>();

  const activitiesBeforeAccident = watch("accident.activitiesBeforeAccident");
  const detailedDescription = watch("accident.detailedDescription");
  const causeDescription = watch("accident.causeDescription");

  // AI Help for each field
  const activitiesAI = useSimpleAIHelp({
    fieldLabel: "Czynności wykonywane przed wypadkiem",
  });

  const detailsAI = useSimpleAIHelp({
    fieldLabel: "Szczegółowy przebieg wypadku",
    context: activitiesBeforeAccident || undefined,
  });

  const causeAI = useSimpleAIHelp({
    fieldLabel: "Przyczyna wypadku",
    context: detailedDescription || undefined,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Szczegółowy opis okoliczności wypadku
        </h3>
        <p className="text-xs text-muted-foreground">
          Opisz dokładnie jak doszło do wypadku i co było jego przyczyną
        </p>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-900">
        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <p className="text-xs">
          <strong>Wskazówka:</strong> Opisz sekwencję zdarzeń krok po kroku.
          Podaj co robiłeś tuż przed wypadkiem, co się stało i dlaczego.
          Im bardziej szczegółowy opis, tym łatwiejsza będzie ocena zdarzenia.
          <br />
          <strong>Użyj przycisku "Pomoc AI"</strong> jeśli potrzebujesz wskazówek.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="accident.activitiesBeforeAccident">
            Czynności wykonywane przed wypadkiem <span className="text-destructive">*</span>
          </Label>
          <AIHelpButton
            onClick={() => activitiesAI.askForHelp(activitiesBeforeAccident || "")}
            isLoading={activitiesAI.isLoading}
          />
        </div>
        <Textarea
          id="accident.activitiesBeforeAccident"
          placeholder="Opisz dokładnie jakie czynności wykonywałeś tuż przed wypadkiem (np. montowałem okno na pierwszym piętrze, obsługiwałem pilarkę tarczową, przenosiłem palety z towarem)"
          className="min-h-[100px] resize-none"
          {...register("accident.activitiesBeforeAccident")}
        />

        {activitiesAI.hasQuestions && (
          <AIQuestionsDisplay
            questions={activitiesAI.questions}
            onClose={activitiesAI.clearQuestions}
          />
        )}

        {activitiesAI.error && <AIErrorDisplay error={activitiesAI.error} />}

        <p className="text-xs text-muted-foreground">
          Uwzględnij czynności związane z prowadzoną działalnością gospodarczą
        </p>
        {errors.accident?.activitiesBeforeAccident && (
          <p className="text-xs text-destructive">{errors.accident.activitiesBeforeAccident.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="accident.detailedDescription">
            Szczegółowy przebieg wypadku <span className="text-destructive">*</span>
          </Label>
          <AIHelpButton
            onClick={() => detailsAI.askForHelp(detailedDescription || "")}
            isLoading={detailsAI.isLoading}
          />
        </div>
        <Textarea
          id="accident.detailedDescription"
          placeholder="Opisz dokładnie jak doszło do wypadku - co się wydarzyło krok po kroku (np. podczas cięcia deski pilarka zablokowała się i wyskoczyła z rąk uderzając w nogę, poślizgnąłem się na mokrej podłodze i upadłem uderzając głową o kant biurka)"
          className="min-h-[150px] resize-none"
          {...register("accident.detailedDescription")}
        />

        {detailsAI.hasQuestions && (
          <AIQuestionsDisplay
            questions={detailsAI.questions}
            onClose={detailsAI.clearQuestions}
          />
        )}

        {detailsAI.error && <AIErrorDisplay error={detailsAI.error} />}

        <p className="text-xs text-muted-foreground">
          Zapisz sekwencję zdarzeń - co się wydarzyło najpierw, co potem, jaki był efekt
        </p>
        {errors.accident?.detailedDescription && (
          <p className="text-xs text-destructive">{errors.accident.detailedDescription.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="accident.causeDescription">
            Przyczyna wypadku <span className="text-destructive">*</span>
          </Label>
          <AIHelpButton
            onClick={() => causeAI.askForHelp(causeDescription || "")}
            isLoading={causeAI.isLoading}
          />
        </div>
        <Textarea
          id="accident.causeDescription"
          placeholder="Określ co było przyczyną wypadku (np. nieodpowiednie zabezpieczenie narzędzia, nieprawidłowe oświetlenie pomieszczenia, brak odpowiedniego sprzętu ochronnego, awaria urządzenia)"
          className="min-h-[100px] resize-none"
          {...register("accident.causeDescription")}
        />

        {causeAI.hasQuestions && (
          <AIQuestionsDisplay
            questions={causeAI.questions}
            onClose={causeAI.clearQuestions}
          />
        )}

        {causeAI.error && <AIErrorDisplay error={causeAI.error} />}

        <p className="text-xs text-muted-foreground">
          Wskaż bezpośrednie przyczyny, które doprowadziły do wypadku
        </p>
        {errors.accident?.causeDescription && (
          <p className="text-xs text-destructive">{errors.accident.causeDescription.message}</p>
        )}
      </div>
    </div>
  );
};
