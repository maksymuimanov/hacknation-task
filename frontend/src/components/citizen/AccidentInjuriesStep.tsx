import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import type { CitizenSchema } from "./validations/citizen-schema";

export const AccidentInjuriesStep = () => {
  const {
    register,
    formState: { errors },
    control,
    watch,
  } = useFormContext<CitizenSchema>();

  const medicalAidProvided = watch("accident.medicalAidProvided");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Urazy i pierwsza pomoc medyczna
        </h3>
        <p className="text-xs text-muted-foreground">
          Opisz doznane obrażenia i udzieloną pomoc medyczną
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="accident.injuries">
          Rodzaj doznanych urazów <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="accident.injuries"
          placeholder="Opisz szczegółowo rodzaj urazów (np. złamanie przedramienia prawego, rozcięcie głowy, oparzenie dłoni)"
          className="min-h-[120px] resize-none"
          {...register("accident.injuries")}
        />
        <p className="text-xs text-muted-foreground">
          Podaj dokładny opis wszystkich obrażeń ciała powstałych w wyniku wypadku
        </p>
        {errors.accident?.injuries && <p className="text-xs text-destructive">{errors.accident.injuries.message}</p>}
      </div>

      <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
        <Controller
          name="accident.medicalAidProvided"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="accident.medicalAidProvided"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <div className="space-y-1 leading-none">
          <Label htmlFor="accident.medicalAidProvided" className="cursor-pointer">
            Czy udzielono pierwszej pomocy medycznej?
          </Label>
          <p className="text-xs text-muted-foreground">
            Zaznacz jeśli otrzymałeś pomoc medyczną
          </p>
        </div>
      </div>

      {medicalAidProvided && (
        <div className="space-y-4 pl-4 border-l-2 border-primary/20">
          <div className="space-y-2">
            <Label htmlFor="accident.medicalFacilityName">Nazwa placówki służby zdrowia</Label>
            <Input
              id="accident.medicalFacilityName"
              placeholder="np. Szpital Wojewódzki w Poznaniu"
              {...register("accident.medicalFacilityName")}
            />
            {errors.accident?.medicalFacilityName && (
              <p className="text-xs text-destructive">{errors.accident.medicalFacilityName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accident.medicalFacilityAddress">Adres placówki</Label>
            <Input
              id="accident.medicalFacilityAddress"
              placeholder="np. ul. Szwajcarska 3, 61-285 Poznań"
              {...register("accident.medicalFacilityAddress")}
            />
            {errors.accident?.medicalFacilityAddress && (
              <p className="text-xs text-destructive">{errors.accident.medicalFacilityAddress.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accident.hospitalizationPeriod">Okres hospitalizacji (opcjonalnie)</Label>
            <Input
              id="accident.hospitalizationPeriod"
              placeholder="np. 5 dni, od 12.01 do 17.01.2025"
              {...register("accident.hospitalizationPeriod")}
            />
            <p className="text-xs text-muted-foreground">
              Podaj jeśli byłeś hospitalizowany
            </p>
            {errors.accident?.hospitalizationPeriod && (
              <p className="text-xs text-destructive">{errors.accident.hospitalizationPeriod.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
