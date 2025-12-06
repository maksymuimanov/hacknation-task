import { useFormContext, Controller } from "react-hook-form";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { CitizenSchema } from "./validations/citizen-schema";

export const BirthDataStep = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CitizenSchema>();

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Data urodzenia *</Label>
        <Controller
          control={control}
          name="birth.date"
          render={({ field }) => {
            return <>

              <DatePicker
                value={field.value}
                onChange={field.onChange}
                disabled={{ after: new Date() }}
              />
            </>;
          }}
        />
        {errors.birth?.date && <p className="text-xs text-destructive">{errors.birth.date.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="birth.city">Miejsce urodzenia *</Label>
        <Input id="birth.city" placeholder="Warszawa" {...register("birth.city")} />
        {errors.birth?.city && <p className="text-xs text-destructive">{errors.birth.city.message}</p>}
      </div>
    </div>
  );
};
