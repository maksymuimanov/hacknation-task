import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { CitizenSchema } from "./validations/citizen-schema";

export const BusinessAddressStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CitizenSchema>();

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="businessAddress.street">Ulica <span className="text-destructive">*</span></Label>
        <Input id="businessAddress.street" placeholder="ul. Biznesowa" {...register("businessAddress.street")} />
        {errors.businessAddress?.street && (
          <p className="text-xs text-destructive">{errors.businessAddress.street.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="businessAddress.houseNumber">Numer domu <span className="text-destructive">*</span></Label>
          <Input
            id="businessAddress.houseNumber"
            type="number"
            placeholder="12"
            {...register("businessAddress.houseNumber")}
          />
          {errors.businessAddress?.houseNumber && (
            <p className="text-xs text-destructive">{errors.businessAddress.houseNumber.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="businessAddress.apartmentNumber">Numer lokalu (opcjonalnie)</Label>
          <Input
            id="businessAddress.apartmentNumber"
            type="number"
            placeholder="5"
            {...register("businessAddress.apartmentNumber")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="businessAddress.zipCode">Kod pocztowy <span className="text-destructive">*</span></Label>
          <Input id="businessAddress.zipCode" placeholder="00-001" {...register("businessAddress.zipCode")} />
          {errors.businessAddress?.zipCode && (
            <p className="text-xs text-destructive">{errors.businessAddress.zipCode.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="businessAddress.city">Miejscowość <span className="text-destructive">*</span></Label>
          <Input id="businessAddress.city" placeholder="Bydgoszcz" {...register("businessAddress.city")} />
          {errors.businessAddress?.city && (
            <p className="text-xs text-destructive">{errors.businessAddress.city.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
