import { PersonalDataStep } from "../PersonalDataStep";
import { ProxyDataStep } from "../ProxyDataStep";
import { BirthDataStep } from "../BirthDataStep";
import { AddressStep } from "../AddressStep";
import { CorrespondenceAddressStep } from "../CorrespondenceAddressStep";
import { BusinessAddressStep } from "../BusinessAddressStep";
import { SummaryStep } from "../SummaryStep";
import { AccidentBasicInfoStep } from "../AccidentBasicInfoStep";
import { WitnessDataStep } from "../WitnessDataStep";
import { AccidentInjuriesStep } from "../AccidentInjuriesStep";
import { AccidentCircumstancesStep } from "../AccidentCircumstancesStep";
import { DocumentUploadStep } from "../DocumentUploadStep";
import {
  User,
  UserCheck,
  Calendar,
  Home,
  Mail,
  Building2,
  CheckSquare,
  AlertTriangle,
  Eye,
  Stethoscope,
  FileText,
  Upload,
} from "lucide-react";

export const STEPS = [
  {
    id: 1,
    title: "Dane osobowe",
    description: "Podstawowe dane identyfikacyjne.",
    fields: ["pesel", "identity.type", "identity.series", "identity.number", "name", "phoneNumber"],
    component: PersonalDataStep,
    icon: User,
  },
  {
    id: 2,
    title: "Dane pełnomocnika",
    description: "Dane osoby zgłaszającej wypadek",
    fields: ["proxy.name"],
    component: ProxyDataStep,
    icon: UserCheck,
    conditional: "isProxy" as const,
  },
  {
    id: 3,
    title: "Data urodzenia",
    description: "Informacje o urodzeniu.",
    fields: ["birth.date", "birth.city"],
    component: BirthDataStep,
    icon: Calendar,
  },
  {
    id: 4,
    title: "Adres zamieszkania",
    description: "Twój aktualny adres.",
    fields: [
      "residentialAddress.street",
      "residentialAddress.houseNumber",
      "residentialAddress.zipCode",
      "residentialAddress.city",
      "livesAbroad",
    ],
    component: AddressStep,
    icon: Home,
  },
  {
    id: 5,
    title: "Adres korespondencyjny",
    description: "Gdzie wysłać korespondencję.",
    fields: ["correspondenceAddress"],
    component: CorrespondenceAddressStep,
    icon: Mail,
  },
  {
    id: 6,
    title: "Adres działalności",
    description: "Adres prowadzenia działalności",
    fields: [
      "businessAddress.street",
      "businessAddress.houseNumber",
      "businessAddress.zipCode",
      "businessAddress.city",
    ],
    component: BusinessAddressStep,
    icon: Building2,
  },
  {
    id: 7,
    title: "Podstawowe informacje",
    description: "Data, godzina i miejsce wypadku",
    fields: ["accident.date", "accident.time", "accident.location"],
    component: AccidentBasicInfoStep,
    icon: AlertTriangle,
  },
  {
    id: 8,
    title: "Dane świadka",
    description: "Dane świadka i jego zeznanie",
    fields: ["witness.name", "witness.testimony"],
    component: WitnessDataStep,
    icon: Eye,
    conditional: "hasWitness" as const,
  },
  {
    id: 9,
    title: "Urazy i pomoc medyczna",
    description: "Rodzaj urazów i pierwsza pomoc",
    fields: ["accident.injuries", "accident.medicalAidProvided"],
    component: AccidentInjuriesStep,
    icon: Stethoscope,
  },
  {
    id: 10,
    title: "Opis okoliczności",
    description: "Szczegółowy przebieg wypadku",
    fields: ["accident.detailedDescription", "accident.activitiesBeforeAccident"],
    component: AccidentCircumstancesStep,
    icon: FileText,
  },
  {
    id: 11,
    title: "Załączniki",
    description: "Dokumenty potwierdzające",
    fields: ["documents"],
    component: DocumentUploadStep,
    icon: Upload,
  },
  {
    id: 12,
    title: "Podsumowanie",
    description: "Sprawdź wprowadzone dane",
    fields: [],
    component: SummaryStep,
    icon: CheckSquare,
  },
] as const;

export type StepConfig = (typeof STEPS)[number];

