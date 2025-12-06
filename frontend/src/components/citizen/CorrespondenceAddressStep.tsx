import { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { CitizenSchema } from "./validations/citizen-schema";

export const CorrespondenceAddressStep = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<CitizenSchema>();
  const correspondenceType = watch("correspondenceAddress.type");

  useEffect(() => {
    const residentialAddress = getValues("residentialAddress");

    if (residentialAddress && (!correspondenceType || correspondenceType === "ADDRESS")) {
      setValue("correspondenceAddress.type", "ADDRESS");
      setValue("correspondenceAddress.street", residentialAddress.street);
      setValue("correspondenceAddress.houseNumber", residentialAddress.houseNumber);
      setValue("correspondenceAddress.apartmentNumber", residentialAddress.apartmentNumber);
      setValue("correspondenceAddress.zipCode", residentialAddress.zipCode);
      setValue("correspondenceAddress.city", residentialAddress.city);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Rodzaj adresu <span className="text-red-500">*</span></Label>
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
        {errors.correspondenceAddress?.type && (
          <p className="text-sm text-red-500">{errors.correspondenceAddress.type.message}</p>
        )}
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
            {errors.correspondenceAddress?.street && (
              <p className="text-sm text-red-500">{errors.correspondenceAddress.street.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="correspondenceAddress.houseNumber">Numer domu</Label>
              <Input
                id="correspondenceAddress.houseNumber"
                type="number"
                placeholder="12"
                {...register("correspondenceAddress.houseNumber")}
              />
              {errors.correspondenceAddress?.houseNumber && (
                <p className="text-sm text-red-500">{errors.correspondenceAddress.houseNumber.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="correspondenceAddress.apartmentNumber">Numer lokalu</Label>
              <Input
                id="correspondenceAddress.apartmentNumber"
                type="number"
                placeholder="5"
                {...register("correspondenceAddress.apartmentNumber")}
              />
              {errors.correspondenceAddress?.apartmentNumber && (
                <p className="text-sm text-red-500">{errors.correspondenceAddress.apartmentNumber.message}</p>
              )}
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
              {errors.correspondenceAddress?.zipCode && (
                <p className="text-sm text-red-500">{errors.correspondenceAddress.zipCode.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="correspondenceAddress.city">Miejscowość</Label>
              <Input
                id="correspondenceAddress.city"
                placeholder="Bydgoszcz"
                {...register("correspondenceAddress.city")}
              />
              {errors.correspondenceAddress?.city && (
                <p className="text-sm text-red-500">{errors.correspondenceAddress.city.message}</p>
              )}
            </div>
          </div>
        </>
      )}

      {correspondenceType === "POSTE_RESTANTE" && (
        <>
          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.posteRestante.zipCode">Kod pocztowy <span className="text-red-500">*</span></Label>
            <Input
              id="correspondenceAddress.posteRestante.zipCode"
              placeholder="00-001"
              {...register("correspondenceAddress.posteRestante.zipCode")}
            />
            {errors.correspondenceAddress?.posteRestante?.zipCode && (
              <p className="text-sm text-red-500">{errors.correspondenceAddress.posteRestante.zipCode.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.posteRestante.postOfficeName">Placówka pocztowa <span className="text-red-500">*</span></Label>
            <Input
              id="correspondenceAddress.posteRestante.postOfficeName"
              placeholder="UP Warszawa 1"
              {...register("correspondenceAddress.posteRestante.postOfficeName")}
            />
            {errors.correspondenceAddress?.posteRestante?.postOfficeName && (
              <p className="text-sm text-red-500">{errors.correspondenceAddress.posteRestante.postOfficeName.message}</p>
            )}
          </div>
        </>
      )}

      {correspondenceType === "PO_BOX" && (
        <>
          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.poBox.number">Numer skrytki <span className="text-red-500">*</span></Label>
            <Input
              id="correspondenceAddress.poBox.number"
              placeholder="123"
              {...register("correspondenceAddress.poBox.number")}
            />
            {errors.correspondenceAddress?.poBox?.number && (
              <p className="text-sm text-red-500">{errors.correspondenceAddress.poBox.number.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.poBox.zipCode">Kod pocztowy <span className="text-red-500">*</span></Label>
            <Input
              id="correspondenceAddress.poBox.zipCode"
              placeholder="00-001"
              {...register("correspondenceAddress.poBox.zipCode")}
            />
            {errors.correspondenceAddress?.poBox?.zipCode && (
              <p className="text-sm text-red-500">{errors.correspondenceAddress.poBox.zipCode.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="correspondenceAddress.poBox.postOfficeName">Placówka pocztowa <span className="text-red-500">*</span></Label>
            <Input
              id="correspondenceAddress.poBox.postOfficeName"
              placeholder="UP Warszawa 1"
              {...register("correspondenceAddress.poBox.postOfficeName")}
            />
            {errors.correspondenceAddress?.poBox?.postOfficeName && (
              <p className="text-sm text-red-500">{errors.correspondenceAddress.poBox.postOfficeName.message}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
