import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { CitizenSchema } from "./validations/citizen-schema";

export const CorrespondenceAddressStep = () => {
  const {
    register,
    formState: { errors },
    control,
    watch,
  } = useFormContext<CitizenSchema>();
  const correspondenceType = watch("correspondenceAddress.type");

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Rodzaj adresu *</Label>
        <Controller
          name="correspondenceAddress.type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Wybierz rodzaj" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADDRESS">Adres</SelectItem>
                <SelectItem value="POSTE_RESTANTE">Poste restante</SelectItem>
                <SelectItem value="PO_BOX">Skrytka pocztowa</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {correspondenceType === "ADDRESS" && (
        <>
          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.street">Ulica</Label>
            <Input
              id="correspondenceAddress.street"
              placeholder="ul. Przykładowa"
              {...register("correspondenceAddress.street")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="correspondenceAddress.houseNumber">Nr domu</Label>
              <Input
                id="correspondenceAddress.houseNumber"
                type="number"
                placeholder="12"
                {...register("correspondenceAddress.houseNumber")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="correspondenceAddress.apartmentNumber">Nr lokalu</Label>
              <Input
                id="correspondenceAddress.apartmentNumber"
                type="number"
                placeholder="5"
                {...register("correspondenceAddress.apartmentNumber")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="correspondenceAddress.zipCode">Kod pocztowy</Label>
              <Input
                id="correspondenceAddress.zipCode"
                placeholder="00-001"
                {...register("correspondenceAddress.zipCode")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="correspondenceAddress.city">Miejscowość</Label>
              <Input
                id="correspondenceAddress.city"
                placeholder="Warszawa"
                {...register("correspondenceAddress.city")}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.country">Państwo</Label>
            <Input
              id="correspondenceAddress.country"
              placeholder="Polska"
              {...register("correspondenceAddress.country")}
            />
          </div>
        </>
      )}

      {correspondenceType === "POSTE_RESTANTE" && (
        <>
          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.posteRestante.zipCode">Kod pocztowy *</Label>
            <Input
              id="correspondenceAddress.posteRestante.zipCode"
              placeholder="00-001"
              {...register("correspondenceAddress.posteRestante.zipCode")}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.posteRestante.postOfficeName">Placówka pocztowa *</Label>
            <Input
              id="correspondenceAddress.posteRestante.postOfficeName"
              placeholder="UP Warszawa 1"
              {...register("correspondenceAddress.posteRestante.postOfficeName")}
            />
          </div>
        </>
      )}

      {correspondenceType === "PO_BOX" && (
        <>
          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.poBox.number">Nr skrytki *</Label>
            <Input
              id="correspondenceAddress.poBox.number"
              placeholder="123"
              {...register("correspondenceAddress.poBox.number")}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.poBox.zipCode">Kod pocztowy *</Label>
            <Input
              id="correspondenceAddress.poBox.zipCode"
              placeholder="00-001"
              {...register("correspondenceAddress.poBox.zipCode")}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.poBox.postOfficeName">Placówka pocztowa *</Label>
            <Input
              id="correspondenceAddress.poBox.postOfficeName"
              placeholder="UP Warszawa 1"
              {...register("correspondenceAddress.poBox.postOfficeName")}
            />
          </div>
        </>
      )}
    </div>
  );
};
