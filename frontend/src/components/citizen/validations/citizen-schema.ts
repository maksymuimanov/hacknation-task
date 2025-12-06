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
});

export type CitizenSchema = z.infer<typeof citizenSchema>;
export type AddressSchema = z.infer<typeof addressSchema>;
