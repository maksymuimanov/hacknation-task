import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { CitizenSchema } from "./validations/citizen-schema";
import { Eye } from "lucide-react";

export const WitnessDataStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CitizenSchema>();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
        <Eye className="h-4 w-4 shrink-0" />
        <p>Podaj dane świadka wypadku oraz jego zeznanie dotyczące zdarzenia.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="witness.name">
          Imię i nazwisko świadka <span className="text-destructive">*</span>
        </Label>
        <Input id="witness.name" placeholder="Anna Nowak" {...register("witness.name")} />
        {errors.witness?.name && <p className="text-xs text-destructive">{errors.witness.name.message}</p>}
      </div>

      <div className="space-y-3 pt-3 border-t border-gray-200">
        <h4 className="text-sm font-medium text-muted-foreground">Adres świadka <span className="text-destructive">*</span></h4>

        <div className="space-y-2">
          <Label htmlFor="witness.address.street">Ulica <span className="text-destructive">*</span></Label>
          <Input id="witness.address.street" placeholder="ul. Przykładowa" {...register("witness.address.street")} />
          {errors.witness?.address?.street && <p className="text-xs text-destructive">{errors.witness.address.street.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="witness.address.houseNumber">Numer domu <span className="text-destructive">*</span></Label>
            <Input id="witness.address.houseNumber" placeholder="12" {...register("witness.address.houseNumber")} />
            {errors.witness?.address?.houseNumber && <p className="text-xs text-destructive">{errors.witness.address.houseNumber.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="witness.address.apartmentNumber">Numer lokalu</Label>
            <Input
              id="witness.address.apartmentNumber"
              placeholder="5"
              {...register("witness.address.apartmentNumber")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="witness.address.zipCode">Kod pocztowy <span className="text-destructive">*</span></Label>
            <Input id="witness.address.zipCode" placeholder="00-000" {...register("witness.address.zipCode")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="witness.address.city">Miejscowość <span className="text-destructive">*</span></Label>
            <Input id="witness.address.city" placeholder="Warszawa" {...register("witness.address.city")} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="witness.address.country">Państwo (jeśli za granicą)</Label>
          <Input id="witness.address.country" placeholder="Polska" {...register("witness.address.country")} />
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t border-gray-200">
        <h4 className="text-sm font-medium text-muted-foreground">Zeznanie świadka <span className="text-destructive">*</span></h4>
        <div className="space-y-2">
          <Label htmlFor="witness.testimony">
            Opis zdarzenia z perspektywy świadka <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="witness.testimony"
            placeholder="Opisz szczegółowo co świadek widział lub o czym ma wiedzę w związku z wypadkiem..."
            className="min-h-[150px] resize-none"
            {...register("witness.testimony")}
          />
          {errors.witness?.testimony && (
            <p className="text-xs text-destructive">{errors.witness.testimony.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
