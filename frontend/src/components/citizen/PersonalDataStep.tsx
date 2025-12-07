import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { CitizenSchema } from "./validations/citizen-schema";

export const PersonalDataStep = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<CitizenSchema>();

  const [nip, setNip] = useState<string>("");

  const mockupNip = {
    nip: "573-000-00-00",
    address: "ul. Testowa 1, 00-000 Test",
    pkd: "Test PKD",
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Imię i nazwisko <span className="text-destructive">*</span>
        </Label>
        <Input id="name" placeholder="Jan Kowalski" {...register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pesel">
          PESEL <span className="text-destructive">*</span>
        </Label>
        <Input id="pesel" placeholder="12345678901" maxLength={11} {...register("pesel")} />
        {errors.pesel && <p className="text-xs text-destructive">{errors.pesel.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nip">
          NIP (opcjonalnie)
        </Label>
        <Input id="nip" placeholder="573-000-00-00" onChange={(e) => setNip(e.target.value)} />

        {nip === "573-000-00-00" && (
          <div className="flex flex-col gap-2 p-4 rounded-md bg-accent/60 border border-accent/30 text-sm">
            <p className="text-foreground/80"><span className="font-medium text-black">NIP:</span> {mockupNip.nip}</p>
            <p className="text-foreground/80"><span className="font-medium text-black">Adres:</span> {mockupNip.address}</p>
            <p className="text-foreground/80"><span className="font-medium text-black">PKD:</span> {mockupNip.pkd}</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Rodzaj dokumentu <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="identity.type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Wybierz dokument" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ID_CARD">Dowód osobisty</SelectItem>
                <SelectItem value="PASSPORT">Paszport</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.identity?.type && <p className="text-xs text-destructive">{errors.identity.type.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="identity.series">
            Seria <span className="text-destructive">*</span>
          </Label>
          <Input id="identity.series" placeholder="ABC" {...register("identity.series")} />
          {errors.identity?.series && <p className="text-xs text-destructive">{errors.identity.series.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="identity.number">
            Numer <span className="text-destructive">*</span>
          </Label>
          <Input id="identity.number" placeholder="123456" {...register("identity.number")} />
          {errors.identity?.number && <p className="text-xs text-destructive">{errors.identity.number.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Telefon (opcjonalnie)</Label>
        <Input id="phoneNumber" type="tel" placeholder="+48 123 456 789" {...register("phoneNumber")} />
      </div>
    </div>
  );
};
