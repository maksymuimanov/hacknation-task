import { useFormContext, Controller } from "react-hook-form";
import { Label } from "../ui/label";
import * as FileUpload from "@/components/ui/file-upload";
import { FileText, Upload, AlertCircle, X } from "lucide-react";
import type { CitizenSchema } from "./validations/citizen-schema";

export const DocumentUploadStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CitizenSchema>();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Dokumenty potwierdzające
        </h3>
        <p className="text-xs text-muted-foreground">
          Załącz dokumenty związane z wypadkiem (opcjonalnie)
        </p>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100 border border-amber-200 dark:border-amber-900">
        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p><strong>Zalecane dokumenty:</strong></p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li>Karta informacyjna ze szpitala</li>
            <li>Notatka służbowa policji (przy wypadku komunikacyjnym)</li>
            <li>Kopie umów, faktur potwierdzających wykonywanie działalności</li>
            <li>Dokumenty od świadków</li>
            <li>Zdjęcia miejsca wypadku</li>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          <FileText className="h-4 w-4 inline-block mr-2" />
          Dokumenty (opcjonalnie)
        </Label>

        <Controller
          name="documents"
          control={control}
          render={({ field }) => (
            <FileUpload.Root
              value={field.value}
              onValueChange={field.onChange}
              accept="application/pdf,image/jpeg,image/jpg,image/png,image/webp"
              maxFiles={10}
              maxSize={10 * 1024 * 1024}
              multiple
            >
              <FileUpload.Dropzone className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Kliknij lub przeciągnij pliki tutaj
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG do 5MB (max. 10 plików)
                    </p>
                  </div>
                </div>
              </FileUpload.Dropzone>

              {field.value && field.value.length > 0 && (
                <div className="space-y-2 mt-4">
                  {field.value.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                    >
                      <div className="h-10 w-10 rounded overflow-hidden bg-muted flex items-center justify-center">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const newFiles = field.value?.filter((_, i) => i !== index);
                          field.onChange(newFiles);
                        }}
                        className="text-destructive hover:text-destructive/80 transition-colors p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => field.onChange([])}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Usuń wszystkie pliki
                  </button>
                </div>
              )}
            </FileUpload.Root>
          )}
        />

        {errors.documents && (
          <p className="text-xs text-destructive">{errors.documents.message}</p>
        )}

        <p className="text-xs text-muted-foreground mt-2">
          <strong>Wskazówka:</strong> Dokumenty nie są wymagane do złożenia zgłoszenia,
          ale mogą przyspieszyć proces rozpatrzenia sprawy.
        </p>
      </div>
    </div>
  );
};
