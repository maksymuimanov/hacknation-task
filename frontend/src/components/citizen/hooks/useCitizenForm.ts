import { useState } from "react";
import { useForm, type SubmitHandler, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { citizenSchema, type CitizenSchema } from "../validations/citizen-schema";
import { STEPS } from "../constants/steps-config";
import {
  submitInjuredPerson,
  submitAccidentInfo,
  generateAccidentFile,
  downloadFile,
} from "../services/accident-api";

export type SubmissionPhase = "person" | "accident" | "pdf" | null;

export const useCitizenForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionPhase, setSubmissionPhase] = useState<SubmissionPhase>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [docxBlob, setDocxBlob] = useState<Blob | null>(null);

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
        country: "Polska",
        street: "",
        city: "",
        houseNumber: "",
        apartmentNumber: "",
        zipCode: "",
      },
      correspondenceAddress: {
        country: "Polska",
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
        country: "Polska",
        street: "",
        city: "",
        houseNumber: "",
        apartmentNumber: "",
        zipCode: "",
      },
      livesAbroad: false,
      isProxy: false,
      proxy: {
        pesel: "",
        identityType: "",
        identitySeries: "",
        identityNumber: "",
        name: "",
        phoneNumber: "",
        address: {
          country: "Polska",
          street: "",
          city: "",
          houseNumber: "",
          apartmentNumber: "",
          zipCode: "",
        },
      },
      hasWitness: false,
      witness: {
        name: "",
        address: {
          country: "Polska",
          street: "",
          city: "",
          houseNumber: "",
          apartmentNumber: "",
          zipCode: "",
        },
        testimony: "",
      },
    },
  });

  const getPhaseMessage = (phase: SubmissionPhase): string => {
    switch (phase) {
      case "person":
        return "Wysyłanie danych osobowych...";
      case "accident":
        return "Wysyłanie informacji o wypadku...";
      case "pdf":
        return "Generowanie dokumentu PDF...";
      default:
        return "Wysyłanie...";
    }
  };

  const onSubmit: SubmitHandler<CitizenSchema> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setPdfBlob(null);

    try {
      setSubmissionPhase("person");
      const userId = await submitInjuredPerson(data);

      setSubmissionPhase("accident");
      const accidentInfoId = await submitAccidentInfo(data, userId);

      setSubmissionPhase("pdf");
      const pdfFile = await generateAccidentFile(userId, accidentInfoId, "pdf");
      const docxFile = await generateAccidentFile(userId, accidentInfoId, "docx");
      setPdfBlob(pdfFile);
      setDocxBlob(docxFile);

      downloadFile(pdfFile, "zgloszenie-wypadku.pdf");
      downloadFile(docxFile, "zgloszenie-wypadku.docx");

      setSubmitSuccess(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
      setSubmissionPhase(null);
    }
  };

  const redownloadFiles = () => {
    if (pdfBlob) {
      downloadFile(pdfBlob, "zgloszenie-wypadku.pdf");
    }

    if (docxBlob) {
      downloadFile(docxBlob, "zgloszenie-wypadku.docx");
    }
  };

  const currentStepData = STEPS[currentStep - 1];

  const shouldSkipStep = (stepIndex: number): boolean => {
    const step = STEPS[stepIndex];
    if (!step) return false;

    // Check if step has a conditional field
    if ("conditional" in step && step.conditional) {
      const conditionalField = step.conditional;
      const fieldValue = form.watch(conditionalField as any);
      // Skip this step if the conditional checkbox is NOT checked
      return !fieldValue;
    }

    return false;
  };

  const nextStep = async () => {
    const fields = currentStepData.fields;

    if (fields.length === 0) {
      await form.handleSubmit(onSubmit)();
      return;
    }

    let isStepValid = await form.trigger([...fields] as FieldPath<CitizenSchema>[]);

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
    setSubmissionPhase(null);
    setPdfBlob(null);
    setDocxBlob(null);
  };

  return {
    currentStep,
    totalSteps,
    progress,
    isSubmitting,
    submitError,
    submitSuccess,
    submissionPhase,
    pdfBlob,
    form,
    currentStepData,
    nextStep,
    prevStep,
    resetForm,
    redownloadFiles,
    getPhaseMessage,
  };
};
