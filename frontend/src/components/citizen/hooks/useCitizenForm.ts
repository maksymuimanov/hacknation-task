import { useState } from "react";
import { useForm, type SubmitHandler, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { citizenSchema, type CitizenSchema } from "../validations/citizen-schema";
import { STEPS } from "../constants/steps-config";

const API_URL = "https://hacknation-task-backend-latest.onrender.com/api/v1.0/accidents/persons/injured";

type ApiPayload = Omit<CitizenSchema, "livesAbroad">;

export const useCitizenForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const totalSteps = STEPS.length;
  const progress = (currentStep / totalSteps) * 100;

  const form = useForm<CitizenSchema>({
    resolver: zodResolver(citizenSchema) as any,
    mode: "onChange",
    defaultValues: {
      pesel: "",
      identity: {
        type: "",
        series: "",
        number: "",
      },
      name: "",
      birth: {
        date: undefined,
        city: "",
      },
      phoneNumber: "",
      residentialAddress: {
        street: "",
        city: "",
        houseNumber: "",
        apartmentNumber: "",
        zipCode: "",
      },
      correspondenceAddress: {
        street: "",
        city: "",
        houseNumber: "",
        apartmentNumber: "",
        zipCode: "",
        type: "ADDRESS",
        posteRestante: {
          zipCode: "",
          postOfficeName: "",
        },
        poBox: {
          zipCode: "",
          postOfficeName: "",
          number: "",
        },
      },
      businessAddress: {
        street: "",
        city: "",
        houseNumber: "",
        apartmentNumber: "",
        zipCode: "",
      },
      livesAbroad: false,
    },
  });

  const prepareApiPayload = (data: CitizenSchema): ApiPayload => {
    const { livesAbroad, ...rest } = data;

    const payload: ApiPayload = {
      ...rest,
      birth: {
        ...rest.birth,
        date: rest.birth.date,
      },
    };

    return payload;
  };

  const submitToApi = async (payload: ApiPayload): Promise<void> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Błąd serwera: ${response.status}`);
    }
  };

  const onSubmit: SubmitHandler<CitizenSchema> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = prepareApiPayload(data);
      await submitToApi(payload);
      setSubmitSuccess(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = STEPS[currentStep - 1];

  const shouldSkipStep = (stepIndex: number): boolean => {
    const step = STEPS[stepIndex];
    if (!step) return false;

    return false;
  };

  const nextStep = async () => {
    const fields = currentStepData.fields;

    if (fields.length === 0) {
      await form.handleSubmit(onSubmit)();
      return;
    }

    const isStepValid = await form.trigger([...fields] as FieldPath<CitizenSchema>[]);

    if (isStepValid) {
      let nextStepIndex = currentStep;

      do {
        nextStepIndex++;
      } while (nextStepIndex <= totalSteps && shouldSkipStep(nextStepIndex - 1));

      if (nextStepIndex <= totalSteps) {
        setCurrentStep(nextStepIndex);
      } else {
        await form.handleSubmit(onSubmit)();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      let prevStepIndex = currentStep;

      do {
        prevStepIndex--;
      } while (prevStepIndex > 0 && shouldSkipStep(prevStepIndex - 1));

      if (prevStepIndex > 0) {
        setCurrentStep(prevStepIndex);
      }
    }
  };

  const resetForm = () => {
    form.reset();
    setCurrentStep(1);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return {
    currentStep,
    totalSteps,
    progress,
    isSubmitting,
    submitError,
    submitSuccess,
    form,
    currentStepData,
    nextStep,
    prevStep,
    resetForm,
  };
};
