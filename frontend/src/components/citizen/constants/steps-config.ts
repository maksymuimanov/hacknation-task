import { PersonalDataStep } from "../PersonalDataStep";
import { BirthDataStep } from "../BirthDataStep";
import { AddressStep } from "../AddressStep";
import { LastPolishAddressStep } from "../LastPolishAddressStep";
import { CorrespondenceAddressStep } from "../CorrespondenceAddressStep";
import { BusinessAddressStep } from "../BusinessAddressStep";
import { SummaryStep } from "../SummaryStep";
import { User, Calendar, Home, MapPin, Mail, Building2, CheckSquare } from "lucide-react";

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
    title: "Data urodzenia",
    description: "Informacje o urodzeniu",
    fields: ["birth.date", "birth.city"],
    component: BirthDataStep,
    icon: Calendar,
  },
  {
    id: 3,
    title: "Adres zamieszkania",
    description: "Twój aktualny adres",
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
    id: 4,
    title: "Ostatni adres w Polsce",
    description: "Dla osób mieszkających za granicą",
    fields: ["lastKnownAddress"],
    component: LastPolishAddressStep,
    icon: MapPin,
    conditional: true,
  },
  {
    id: 5,
    title: "Adres korespondencyjny",
    description: "Gdzie wysłać korespondencję",
    fields: ["correspondenceAddress.type"],
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
    title: "Podsumowanie",
    description: "Sprawdź wprowadzone dane",
    fields: [],
    component: SummaryStep,
    icon: CheckSquare,
  },
] as const;

export type StepConfig = (typeof STEPS)[number];
