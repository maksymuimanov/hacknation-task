import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { CitizenSchema } from "./validations/citizen-schema";

export const LastPolishAddressStep = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<CitizenSchema>();
  const livesAbroad = watch("livesAbroad");

  if (!livesAbroad) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>Ten krok dotyczy tylko osób mieszkających za granicą.</p>
        <p className="text-sm mt-1">Kliknij "Dalej" aby kontynuować.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Podaj ostatni adres zamieszkania w Polsce.</p>

      <div className="space-y-1.5">
        <Label htmlFor="lastKnownAddress.street">Ulica *</Label>
        <Input id="lastKnownAddress.street" placeholder="ul. Przykładowa" {...register("lastKnownAddress.street")} />
        {errors.lastKnownAddress?.street && (
          <p className="text-xs text-destructive">{errors.lastKnownAddress.street.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="lastKnownAddress.houseNumber">Nr domu *</Label>
          <Input
            id="lastKnownAddress.houseNumber"
            type="number"
            placeholder="12"
            {...register("lastKnownAddress.houseNumber")}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastKnownAddress.apartmentNumber">Nr lokalu</Label>
          <Input
            id="lastKnownAddress.apartmentNumber"
            type="number"
            placeholder="5"
            {...register("lastKnownAddress.apartmentNumber")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="lastKnownAddress.zipCode">Kod pocztowy *</Label>
          <Input id="lastKnownAddress.zipCode" placeholder="00-001" {...register("lastKnownAddress.zipCode")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastKnownAddress.city">Miejscowość *</Label>
          <Input id="lastKnownAddress.city" placeholder="Warszawa" {...register("lastKnownAddress.city")} />
        </div>
      </div>
    </div>
  );
};
