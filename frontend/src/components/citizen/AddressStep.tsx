import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { CitizenSchema } from "./validations/citizen-schema";

export const AddressStep = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<CitizenSchema>();

  const livesAbroad = watch("livesAbroad");

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="residentialAddress.street">Ulica <span className="text-destructive">*</span></Label>
        <Input
          id="residentialAddress.street"
          placeholder="ul. Przykładowa"
          {...register("residentialAddress.street")}
        />
        {errors.residentialAddress?.street && (
          <p className="text-xs text-destructive">{errors.residentialAddress.street.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="residentialAddress.houseNumber">Numer domu <span className="text-destructive">*</span></Label>
          <Input
            id="residentialAddress.houseNumber"
            type="text"
            placeholder="12"
            {...register("residentialAddress.houseNumber")}
          />
          {errors.residentialAddress?.houseNumber && (
            <p className="text-xs text-destructive">{errors.residentialAddress.houseNumber.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="residentialAddress.apartmentNumber">Numer lokalu (opcjonalne)</Label>
          <Input
            id="residentialAddress.apartmentNumber"
            type="text"
            placeholder="5"
            {...register("residentialAddress.apartmentNumber")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="residentialAddress.zipCode">Kod pocztowy <span className="text-destructive">*</span></Label>
          <Input id="residentialAddress.zipCode" placeholder="00-001" {...register("residentialAddress.zipCode")} />
          {errors.residentialAddress?.zipCode && (
            <p className="text-xs text-destructive">{errors.residentialAddress.zipCode.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="residentialAddress.city">Miejscowość <span className="text-destructive">*</span></Label>
          <Input id="residentialAddress.city" placeholder="Bydgoszcz" {...register("residentialAddress.city")} />
          {errors.residentialAddress?.city && (
            <p className="text-xs text-destructive">{errors.residentialAddress.city.message}</p>
          )}
        </div>
      </div>

      <label className="flex items-center gap-2 pt-2 cursor-pointer m-0">
        <input
          type="checkbox"
          checked={livesAbroad}
          onChange={(e) => setValue("livesAbroad", e.target.checked)}
          className="h-4 w-4 rounded border-input accent-primary"
        />
        <span className="text-sm leading-relaxed">
          Mieszkam za granicą
        </span>
      </label>
      <span className="text-sm text-muted-foreground">(podany adres będzie ostatnim miejscem zamieszkania w Polsce)</span>
    </div>
  );
};
