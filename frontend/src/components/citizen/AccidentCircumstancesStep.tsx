import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { AlertCircle } from "lucide-react";
import type { CitizenSchema } from "./validations/citizen-schema";

export const AccidentCircumstancesStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CitizenSchema>();

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
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="accident.activitiesBeforeAccident">
          Czynności wykonywane przed wypadkiem <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="accident.activitiesBeforeAccident"
          placeholder="Opisz dokładnie jakie czynności wykonywałeś tuż przed wypadkiem (np. montowałem okno na pierwszym piętrze, obsługiwałem pilarkę tarczową, przenosiłem palety z towarem)"
          className="min-h-[100px] resize-none"
          {...register("accident.activitiesBeforeAccident")}
        />
        <p className="text-xs text-muted-foreground">
          Uwzględnij czynności związane z prowadzoną działalnością gospodarczą
        </p>
        {errors.accident?.activitiesBeforeAccident && (
          <p className="text-xs text-destructive">{errors.accident.activitiesBeforeAccident.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="accident.detailedDescription">
          Szczegółowy przebieg wypadku <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="accident.detailedDescription"
          placeholder="Opisz dokładnie jak doszło do wypadku - co się wydarzyło krok po kroku (np. podczas cięcia deski pilarka zablokowała się i wyskoczyła z rąk uderzając w nogę, poślizgnąłem się na mokrej podłodze i upadłem uderzając głową o kant biurka)"
          className="min-h-[150px] resize-none"
          {...register("accident.detailedDescription")}
        />
        <p className="text-xs text-muted-foreground">
          Zapisz sekwencję zdarzeń - co się wydarzyło najpierw, co potem, jaki był efekt
        </p>
        {errors.accident?.detailedDescription && (
          <p className="text-xs text-destructive">{errors.accident.detailedDescription.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="accident.causeDescription">
          Przyczyna wypadku <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="accident.causeDescription"
          placeholder="Określ co było przyczyną wypadku (np. nieodpowiednie zabezpieczenie narzędzia, nieprawidłowe oświetlenie pomieszczenia, brak odpowiedniego sprzętu ochronnego, awaria urządzenia)"
          className="min-h-[100px] resize-none"
          {...register("accident.causeDescription")}
        />
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
