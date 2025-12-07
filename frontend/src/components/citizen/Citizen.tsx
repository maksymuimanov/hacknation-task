import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle, RotateCcw, Home, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useCitizenForm } from "./hooks/useCitizenForm";
import { FormProvider } from "react-hook-form";
import { STEPS } from "./constants/steps-config";
import { PhaseStepper } from "./PhaseStepper";

function Citizen() {
  const {
    currentStep,
    totalSteps,
    progress,
    form,
    nextStep,
    prevStep,
    isSubmitting,
    submitError,
    submitSuccess,
    submissionPhase,
    pdfBlob,
    resetForm,
    redownloadFiles,
    getPhaseMessage,
  } = useCitizenForm();

  const currentStepConfig = STEPS[currentStep - 1];
  const CurrentComponent = currentStepConfig.component;
  const IconComponent = currentStepConfig.icon;

  const isLastStep = currentStep === totalSteps;

  if (submitSuccess) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md border border-border/50 shadow-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle className="h-8 w-8" />
            </div>
            <CardTitle className="text-xl font-semibold text-green-700">Formularz wysłany!</CardTitle>
            <CardDescription className="text-sm mt-2">
              Twoje zgłoszenie zostało pomyślnie zapisane. Dokument PDF został pobrany automatycznie.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-3 pt-4 border-t border-border/50">
            {pdfBlob && (
              <Button onClick={redownloadFiles} variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Pobierz pliki ponownie
              </Button>
            )}
            <Button onClick={resetForm} variant="outline" className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Wypełnij nowy formularz
            </Button>
            <Button asChild className="w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Wróć do strony głównej
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-xl space-y-4">
        <PhaseStepper currentStep={currentStep} />
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Krok {currentStep} z {totalSteps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="border border-border/50 shadow-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <IconComponent className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl font-semibold">{currentStepConfig.title}</CardTitle>
            <CardDescription className="text-sm">{currentStepConfig.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <FormProvider {...form}>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="animate-in fade-in duration-200 max-h-full overflow-y-auto p-3">
                  <CurrentComponent />
                </div>
              </form>
            </FormProvider>

            {submitError && (
              <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                <p className="font-medium">Wystąpił błąd:</p>
                <p>{submitError}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between pt-4 border-t border-border/50">
            {currentStep === 1 ? (
              <Button variant="ghost" asChild disabled={isSubmitting}>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anuluj
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" onClick={prevStep} disabled={isSubmitting}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Wstecz
              </Button>
            )}

            <Button onClick={nextStep} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {getPhaseMessage(submissionPhase)}
                </>
              ) : isLastStep ? (
                <>
                  Zapisz zgłoszenie
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Dalej
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default Citizen;

