import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { CitizenSchema } from "./validations/citizen-schema";
import { UserCheck } from "lucide-react";

export const ProxyDataStep = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<CitizenSchema>();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 rounded-lg text-sm font-medium text-muted-foreground mb-5">
        <UserCheck className="h-4 w-4 shrink-0" />
        <p>Jako pełnomocnik poszkodowanego, podaj swoje dane identyfikacyjne.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="proxy.name">
          Imię i nazwisko pełnomocnika <span className="text-destructive">*</span>
        </Label>
        <Input id="proxy.name" placeholder="Jan Kowalski" {...register("proxy.name")} />
        {errors.proxy?.name && <p className="text-xs text-destructive">{errors.proxy.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="proxy.pesel">PESEL pełnomocnika <span className="text-destructive">*</span></Label>
        <Input id="proxy.pesel" placeholder="12345678901" maxLength={11} {...register("proxy.pesel")} />
        {errors.proxy?.pesel && <p className="text-xs text-destructive">{errors.proxy.pesel.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Rodzaj dokumentu</Label>
        <Controller
          name="proxy.identityType"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Wybierz dokument *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ID_CARD">Dowód osobisty</SelectItem>
                <SelectItem value="PASSPORT">Paszport</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="proxy.identitySeries">Seria <span className="text-destructive">*</span></Label>
          <Input id="proxy.identitySeries" placeholder="ABC" {...register("proxy.identitySeries")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="proxy.identityNumber">Numer <span className="text-destructive">*</span></Label>
          <Input id="proxy.identityNumber" placeholder="123456" {...register("proxy.identityNumber")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="proxy.phoneNumber">Telefon (opcjonalnie)</Label>
        <Input id="proxy.phoneNumber" type="tel" placeholder="+48 123 456 789" {...register("proxy.phoneNumber")} />
      </div>

      <div className="space-y-3 pt-3 border-t border-border/50">
        <h4 className="text-sm font-medium text-muted-foreground">Adres zamieszkania pełnomocnika</h4>

        <div className="space-y-2">
          <Label htmlFor="proxy.address.street">Ulica <span className="text-destructive">*</span></Label>
          <Input id="proxy.address.street" placeholder="ul. Przykładowa" {...register("proxy.address.street")} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="proxy.address.houseNumber">Numer domu <span className="text-destructive">*</span></Label>
            <Input id="proxy.address.houseNumber" placeholder="12" {...register("proxy.address.houseNumber")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proxy.address.apartmentNumber">Numer lokalu <span className="text-destructive">*</span></Label>
            <Input id="proxy.address.apartmentNumber" placeholder="5" {...register("proxy.address.apartmentNumber")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="proxy.address.zipCode">Kod pocztowy <span className="text-destructive">*</span></Label>
            <Input id="proxy.address.zipCode" placeholder="00-000" {...register("proxy.address.zipCode")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proxy.address.city">Miejscowość <span className="text-destructive">*</span></Label>
            <Input id="proxy.address.city" placeholder="Warszawa" {...register("proxy.address.city")} />
          </div>
        </div>
      </div>
    </div>
  );
};
