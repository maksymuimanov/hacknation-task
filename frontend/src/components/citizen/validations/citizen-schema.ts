import { z } from "zod";

export const addressSchema = z.object({
  country: z.string().optional(),
  street: z.string().min(1, "Ulica jest wymagana"),
  city: z.string().min(1, "Miejscowość jest wymagana"),
  houseNumber: z
    .string()
    .min(1, "Numer domu jest wymagany")
    .regex(/^[0-9]+$/, "Numer domu musi składać się z cyfr"),
  apartmentNumber: z.string().optional(),
  zipCode: z
    .string()
    .min(1, "Kod pocztowy jest wymagany")
    .regex(/^[0-9]{2}-[0-9]{3}$/, "Kod pocztowy musi składać się z 5 cyfr"),
});

// Schemat pełnomocnika (strict)
export const proxySchema = z.object({
  name: z.string().min(1, "Imię i nazwisko pełnomocnika jest wymagane"),
  pesel: z.string().length(11, "PESEL pełnomocnika musi mieć 11 cyfr").regex(/^\d+$/, "PESEL musi składać się tylko z cyfr"),
  identityType: z.string().min(1, "Wybierz rodzaj dokumentu"),
  identitySeries: z
    .string()
    .min(3, "Seria dokumentu jest wymagana (3 znaki)")
    .max(3, "Seria dokumentu może zawierać maksymalnie 3 znaki")
    .regex(/^[A-Z]+$/, "Seria dokumentu może składać się tylko z dużych liter"),
  identityNumber: z
    .string()
    .min(6, "Numer dokumentu jest wymagany (6 znaków)")
    .max(6, "Numer dokumentu może zawierać maksymalnie 6 znaków")
    .regex(/^[0-9]+$/, "Numer dokumentu może składać się tylko z cyfr"),
  phoneNumber: z.string().optional(),
  address: addressSchema,
});

// Schemat świadka (strict)
export const witnessSchema = z.object({
  name: z.string().min(1, "Imię i nazwisko świadka jest wymagane"),
  address: addressSchema,
  testimony: z.string().min(20, "Zeznanie świadka jest wymagane (minimum 20 znaków)"),
});

export const citizenSchema = z.object({
  pesel: z.string().length(11, "PESEL musi mieć 11 cyfr").regex(/^\d+$/, "PESEL musi składać się tylko z cyfr"),

  identity: z.object({
    type: z.string().min(1, "Wybierz rodzaj dokumentu"),
    series: z
      .string()
      .min(3, "Seria dokumentu może zawierać co najmniej 3 znaki")
      .max(3, "Seria dokumentu może zawierać maksymalnie 3 znaki")
      .regex(/^[A-Z]+$/, "Seria dokumentu może składać się tylko z dużych liter"),
    number: z.string().min(6, "Numer dokumentu jest wymagany").max(6, "Numer dokumentu może zawierać maksymalnie 6 znaków").regex(/^[0-9]+$/, "Numer dokumentu może składać się tylko z cyfr"),
  }),

  name: z.string().min(1, "Imię i nazwisko jest wymagane").refine((val) => val.trim().split(" ").length >= 2, {
    message: "Imię i nazwisko musi zawierać co najmniej dwie części",
  }),

  birth: z.object({
    date: z.date({ message: "Data urodzenia jest wymagana" }).max(new Date(), { message: "Data urodzenia nie może być z przyszłości" }),
    city: z.string().min(1, "Miejsce urodzenia jest wymagane"),
  }),

  phoneNumber: z.string().optional(),

  residentialAddress: addressSchema,

  lastKnownAddress: addressSchema.optional(),

  correspondenceAddress: z
    .object({
      country: z.string().optional(),
      street: z.string().optional(),
      city: z.string().optional(),
      houseNumber: z.string().optional(),
      apartmentNumber: z.string().optional(),
      zipCode: z.string().optional(),
      type: z.enum(["ADDRESS", "POSTE_RESTANTE", "PO_BOX"]),
      posteRestante: z
        .object({
          zipCode: z.string().optional(),
          postOfficeName: z.string().optional(),
        })
        .optional(),
      poBox: z
        .object({
          zipCode: z.string().optional(),
          postOfficeName: z.string().optional(),
          number: z.string().optional(),
        })
        .optional(),
    })
    .superRefine((data, ctx) => {
      if (data.type === "ADDRESS") {
        const result = addressSchema.safeParse(data);
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            ctx.addIssue({ ...issue, path: issue.path });
          });
        }
      }
      if (data.type === "POSTE_RESTANTE") {
        if (!data.posteRestante?.zipCode) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Kod pocztowy jest wymagany",
            path: ["posteRestante", "zipCode"],
          });
        }
        if (!data.posteRestante?.postOfficeName) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Placówka pocztowa jest wymagana",
            path: ["posteRestante", "postOfficeName"],
          });
        }
      }
      if (data.type === "PO_BOX") {
        if (!data.poBox?.number) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Numer skrytki jest wymagany",
            path: ["poBox", "number"],
          });
        }
        if (!data.poBox?.zipCode) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Kod pocztowy jest wymagany",
            path: ["poBox", "zipCode"],
          });
        }
        if (!data.poBox?.postOfficeName) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Placówka pocztowa jest wymagana",
            path: ["poBox", "postOfficeName"],
          });
        }
      }
    }),

  businessAddress: addressSchema,

  livesAbroad: z.boolean().optional(),

  isProxy: z.boolean().optional(),
  proxy: proxySchema.optional(),

  hasWitness: z.boolean().optional(),
  witness: witnessSchema.optional(),

  accident: z.object({
    date: z.date({ message: "Data wypadku jest wymagana" }),
    time: z.string().min(1, "Godzina wypadku jest wymagana").regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Godzina musi być w formacie HH:MM"),
    location: z.string().min(10, "Podaj szczegółowy opis miejsca wypadku (minimum 10 znaków)"),
    plannedWorkStart: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Godzina musi być w formacie HH:MM"),
    plannedWorkEnd: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Godzina musi być w formacie HH:MM"),

    injuries: z.string().min(10, "Opisz rodzaj doznanych urazów (minimum 10 znaków)"),
    medicalAidProvided: z.boolean().optional(),
    medicalFacilityName: z.string().optional(),
    medicalFacilityAddress: z.string().optional(),
    hospitalizationPeriod: z.string().optional(),

    detailedDescription: z.string().min(50, "Opisz szczegółowo okoliczności wypadku (minimum 50 znaków)"),
    activitiesBeforeAccident: z.string().min(20, "Opisz czynności wykonywane przed wypadkiem (minimum 20 znaków)"),
    causeDescription: z.string().min(20, "Opisz przyczynę wypadku (minimum 20 znaków)"),

    legalProceedingsConducted: z.boolean().optional(),
    proceedingAuthority: z.string().optional(),
    proceedingAuthorityAddress: z.string().optional(),
  }).optional(),

  documents: z.array(z.instanceof(File)).optional(),
}).superRefine((data, ctx) => {
  if (data.isProxy) {
    if (!data.proxy?.name || data.proxy.name.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Imię i nazwisko pełnomocnika jest wymagane",
        path: ["proxy", "name"],
      });
    }
  }

  if (data.hasWitness) {
    if (!data.witness?.name || data.witness.name.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Imię i nazwisko świadka jest wymagane",
        path: ["witness", "name"],
      });
    }
    if (!data.witness?.testimony || data.witness.testimony.trim().length < 20) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Zeznanie świadka jest wymagane (minimum 20 znaków)",
        path: ["witness", "testimony"],
      });
    }
  }
});

export type CitizenSchema = z.infer<typeof citizenSchema>;
export type AddressSchema = z.infer<typeof addressSchema>;
