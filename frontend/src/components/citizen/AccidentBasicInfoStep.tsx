import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { CitizenSchema } from "./validations/citizen-schema";

export const AccidentBasicInfoStep = () => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useFormContext<CitizenSchema>();

  const hasWitness = watch("hasWitness");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Podstawowe informacje o wypadku
        </h3>
        <p className="text-xs text-muted-foreground">
          Podaj dokładną datę, godzinę i miejsce zdarzenia
        </p>
      </div>

      <div className="space-y-2">
        <Label>
          Data wypadku <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="accident.date"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "d MMMM yyyy", { locale: pl })
                  ) : (
                    <span>Wybierz datę</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                  locale={pl}
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.accident?.date && <p className="text-xs text-destructive">{errors.accident.date.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="accident.time">
          Godzina wypadku <span className="text-destructive">*</span>
        </Label>
        <Input
          id="accident.time"
          placeholder="np. 14:30"
          type="time"
          {...register("accident.time")}
        />
        {errors.accident?.time && <p className="text-xs text-destructive">{errors.accident.time.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="accident.plannedWorkStart">Planowana godz. rozpoczęcia pracy</Label>
          <Input
            id="accident.plannedWorkStart"
            placeholder="np. 08:00"
            type="time"
            {...register("accident.plannedWorkStart")}
          />
          {errors.accident?.plannedWorkStart && (
            <p className="text-xs text-destructive">{errors.accident.plannedWorkStart.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="accident.plannedWorkEnd">Planowana godz. zakończenia pracy</Label>
          <Input
            id="accident.plannedWorkEnd"
            placeholder="np. 16:00"
            type="time"
            {...register("accident.plannedWorkEnd")}
          />
          {errors.accident?.plannedWorkEnd && (
            <p className="text-xs text-destructive">{errors.accident.plannedWorkEnd.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="accident.location">
          Miejsce wypadku <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="accident.location"
          placeholder="Opisz szczegółowo miejsce wypadku (np. warsztat przy ul. Polnej 5, parking przed budynkiem)"
          className="min-h-[100px] resize-none"
          {...register("accident.location")}
        />
        {errors.accident?.location && <p className="text-xs text-destructive">{errors.accident.location.message}</p>}
      </div>

      <div className="flex items-start space-x-3 pt-4 border-t border-border/50">
        <Checkbox
          id="hasWitness"
          checked={hasWitness}
          onCheckedChange={(checked) => setValue("hasWitness", checked === true)}
        />
        <div className="space-y-1">
          <Label htmlFor="hasWitness" className="font-medium cursor-pointer">
            Jest świadek wypadku
          </Label>
          <p className="text-xs text-muted-foreground">
            Zaznacz, jeśli są świadkowie, którzy widzieli wypadek lub mają o nim wiedzę
          </p>
        </div>
      </div>
    </div>
  );
};
