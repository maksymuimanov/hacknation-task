import { z } from "zod";

/**
 * Schemat adresu zgodny z API
 */
const addressSchema = z.object({
  country: z.string().optional(),
  street: z.string().min(1, "Ulica jest wymagana"),
  city: z.string().min(1, "Miejscowość jest wymagana"),
  houseNumber: z
    .union([z.string(), z.number()])
    .transform((val) => (val === "" ? undefined : Number(val)))
    .pipe(z.number({ message: "Nr domu jest wymagany" }).min(1, "Nr domu jest wymagany")),
  apartmentNumber: z
    .union([z.string(), z.number()])
    .transform((val) => (val === "" || val === undefined ? undefined : Number(val)))
    .pipe(z.number().optional())
    .optional(),
  zipCode: z.string().min(1, "Kod pocztowy jest wymagany"),
});

/**
 * Schemat adresu opcjonalnego (lastKnownAddress)
 */
const optionalAddressSchema = z.object({
  country: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  houseNumber: z
    .union([z.string(), z.number()])
    .transform((val) => (val === "" || val === undefined ? undefined : Number(val)))
    .pipe(z.number().optional())
    .optional(),
  apartmentNumber: z
    .union([z.string(), z.number()])
    .transform((val) => (val === "" || val === undefined ? undefined : Number(val)))
    .pipe(z.number().optional())
    .optional(),
  zipCode: z.string().optional(),
});

/**
 * Główny schemat formularza obywatela zgodny z API
 */
export const citizenSchema = z.object({
  // Dane osobowe
  pesel: z.string().length(11, "PESEL musi mieć 11 cyfr").regex(/^\d+$/, "PESEL musi składać się tylko z cyfr"),

  identity: z.object({
    type: z.string().min(1, "Wybierz rodzaj dokumentu"),
    series: z.string().min(1, "Seria dokumentu jest wymagana"),
    number: z.string().min(1, "Numer dokumentu jest wymagany"),
  }),

  name: z.string().min(1, "Imię i nazwisko jest wymagane"),

  birth: z.object({
    date: z.date({ message: "Data urodzenia jest wymagana" }),
    city: z.string().min(1, "Miejsce urodzenia jest wymagane"),
  }),

  phoneNumber: z.string().optional(),

  // Adresy
  residentialAddress: addressSchema,

  lastKnownAddress: optionalAddressSchema.optional(),

  correspondenceAddress: z.object({
    country: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    houseNumber: z
      .union([z.string(), z.number()])
      .transform((val) => (val === "" || val === undefined ? undefined : Number(val)))
      .pipe(z.number().optional())
      .optional(),
    apartmentNumber: z
      .union([z.string(), z.number()])
      .transform((val) => (val === "" || val === undefined ? undefined : Number(val)))
      .pipe(z.number().optional())
      .optional(),
    zipCode: z.string().optional(),
    type: z.enum(["ADDRESS", "POSTE_RESTANTE", "PO_BOX"]),
    posteRestante: z
      .object({
        zipCode: z.string(),
        postOfficeName: z.string(),
      })
      .optional(),
    poBox: z
      .object({
        zipCode: z.string(),
        postOfficeName: z.string(),
        number: z.string(),
      })
      .optional(),
  }),

  businessAddress: addressSchema,

  // Flaga pomocnicza (nie wysyłana do API)
  livesAbroad: z.boolean().default(false),
});

export type CitizenSchema = z.infer<typeof citizenSchema>;
export type AddressSchema = z.infer<typeof addressSchema>;
