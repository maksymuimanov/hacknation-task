import type { CitizenSchema, AddressSchema } from "../validations/citizen-schema";

const API_BASE_URL = "https://hacknation-task-backend-latest.onrender.com/api/v1.0";
const REQUEST_TIMEOUT = 60000;

const fetchWithTimeout = async (url: string, options: RequestInit, timeout = REQUEST_TIMEOUT): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Przekroczono limit czasu oczekiwania na odpowiedź serwera. Spróbuj ponownie.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

// API Types
interface ApiAddress {
  country: string;
  street: string;
  city: string;
  houseNumber: number;
  apartmentNumber: number;
  zipCode: string;
}

interface ApiCorrespondenceAddress extends ApiAddress {
  type: "ADDRESS" | "POSTE_RESTANTE" | "PO_BOX";
  posteRestante?: {
    zipCode: string;
    postOfficeName: string;
  };
  poBox?: {
    zipCode: string;
    postOfficeName: string;
    number: string;
  };
}

interface InjuredPersonPayload {
  pesel: string;
  identity: {
    type: string;
    series: string;
    number: string;
  };
  name: string;
  birth: {
    date: string;
    city: string;
  };
  phoneNumber: string;
  residentialAddress: ApiAddress;
  lastKnownAddress: ApiAddress;
  correspondenceAddress: ApiCorrespondenceAddress;
  businessAddress: ApiAddress;
}

interface AccidentInfoPayload {
  userId: string;
  dateTime: string;
  location: ApiAddress;
  startTime: string;
  endTime: string;
  traumaTypes: string[];
  description: string;
  causeDescription: string;
  locationDescription: string;
  firstAid: {
    provided: boolean;
    name: string;
    address: ApiAddress;
  };
  investigation: {
    provided: boolean;
    name: string;
    address: ApiAddress;
  };
  equipment: {
    used: boolean;
    name: string;
    condition: string;
    usedAccordingInstructions: boolean;
    useDescription: string;
    hasCertificate: boolean;
    registeredInFixedAssets: boolean;
  };
  witnesses: Array<{
    name: string;
    address: ApiAddress;
  }>;
}

interface PdfPayload {
  userId: string;
  accidentInfoId: string;
}

// Helper functions
const transformAddress = (address: AddressSchema | undefined): ApiAddress => {
  if (!address) {
    return {
      country: "Polska",
      street: "",
      city: "",
      houseNumber: 0,
      apartmentNumber: 0,
      zipCode: "",
    };
  }
  return {
    country: address.country || "Polska",
    street: address.street,
    city: address.city,
    houseNumber: parseInt(address.houseNumber, 10) || 0,
    apartmentNumber: address.apartmentNumber ? parseInt(address.apartmentNumber, 10) || 0 : 0,
    zipCode: address.zipCode,
  };
};

const transformCorrespondenceAddress = (
  correspondence: CitizenSchema["correspondenceAddress"]
): ApiCorrespondenceAddress => {
  return {
    country: correspondence.country || "Polska",
    street: correspondence.street || "",
    city: correspondence.city || "",
    houseNumber: correspondence.houseNumber ? parseInt(correspondence.houseNumber, 10) || 0 : 0,
    apartmentNumber: correspondence.apartmentNumber ? parseInt(correspondence.apartmentNumber, 10) || 0 : 0,
    zipCode: correspondence.zipCode || "",
    type: correspondence.type,
    posteRestante: correspondence.posteRestante
      ? {
        zipCode: correspondence.posteRestante.zipCode || "",
        postOfficeName: correspondence.posteRestante.postOfficeName || "",
      }
      : undefined,
    poBox: correspondence.poBox
      ? {
        zipCode: correspondence.poBox.zipCode || "",
        postOfficeName: correspondence.poBox.postOfficeName || "",
        number: correspondence.poBox.number || "",
      }
      : undefined,
  };
};

const formatDateToISO = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const formatDateTime = (date: Date, time: string): string => {
  const [hours, minutes] = time.split(":");
  const dateTime = new Date(date);
  dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  return dateTime.toISOString();
};

const parseAddressFromString = (addressString: string): ApiAddress => {
  // Parse simple address - just use default structure with location in street
  return {
    country: "Polska",
    street: addressString,
    city: "",
    houseNumber: 0,
    apartmentNumber: 0,
    zipCode: "",
  };
};

// API Functions
export const prepareInjuredPersonPayload = (data: CitizenSchema): InjuredPersonPayload => {
  return {
    pesel: data.pesel,
    identity: {
      type: data.identity.type,
      series: data.identity.series,
      number: data.identity.number,
    },
    name: data.name,
    birth: {
      date: formatDateToISO(data.birth.date),
      city: data.birth.city,
    },
    phoneNumber: data.phoneNumber || "",
    residentialAddress: transformAddress(data.residentialAddress),
    lastKnownAddress: transformAddress(data.lastKnownAddress || data.residentialAddress),
    correspondenceAddress: transformCorrespondenceAddress(data.correspondenceAddress),
    businessAddress: transformAddress(data.businessAddress),
  };
};

export const prepareAccidentInfoPayload = (data: CitizenSchema, userId: string): AccidentInfoPayload => {
  const accident = data.accident;
  if (!accident) {
    throw new Error("Dane wypadku są wymagane");
  }

  const emptyAddress: ApiAddress = {
    country: "Polska",
    street: "",
    city: "",
    houseNumber: 0,
    apartmentNumber: 0,
    zipCode: "",
  };

  return {
    userId,
    dateTime: formatDateTime(accident.date, accident.time),
    location: parseAddressFromString(accident.location),
    startTime: accident.plannedWorkStart,
    endTime: accident.plannedWorkEnd,
    traumaTypes: [accident.injuries],
    description: accident.detailedDescription,
    causeDescription: accident.causeDescription,
    locationDescription: accident.location,
    firstAid: {
      provided: accident.medicalAidProvided || false,
      name: accident.medicalFacilityName || "",
      address: accident.medicalFacilityAddress
        ? parseAddressFromString(accident.medicalFacilityAddress)
        : emptyAddress,
    },
    investigation: {
      provided: accident.legalProceedingsConducted || false,
      name: accident.proceedingAuthority || "",
      address: accident.proceedingAuthorityAddress
        ? parseAddressFromString(accident.proceedingAuthorityAddress)
        : emptyAddress,
    },
    equipment: {
      used: false,
      name: "",
      condition: "",
      usedAccordingInstructions: false,
      useDescription: "",
      hasCertificate: false,
      registeredInFixedAssets: false,
    },
    witnesses: [],
  };
};

export const submitInjuredPerson = async (data: CitizenSchema): Promise<string> => {
  const payload = prepareInjuredPersonPayload(data);

  console.log("[API] Wysyłanie danych osobowych...", payload);

  const response = await fetchWithTimeout(`${API_BASE_URL}/accidents/persons/injured`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("[API] Błąd odpowiedzi:", response.status, errorData);
    throw new Error(errorData?.message || `Błąd podczas wysyłania danych osobowych: ${response.status}`);
  }

  const result = await response.json();
  console.log("[API] Odpowiedź:", result);
  return result.id || result.userId || result;
};

export const submitAccidentInfo = async (data: CitizenSchema, userId: string): Promise<string> => {
  const payload = prepareAccidentInfoPayload(data, userId);

  console.log("[API] Wysyłanie informacji o wypadku...", payload);

  const response = await fetchWithTimeout(`${API_BASE_URL}/accidents/infos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("[API] Błąd odpowiedzi:", response.status, errorData);
    throw new Error(errorData?.message || `Błąd podczas wysyłania informacji o wypadku: ${response.status}`);
  }

  const result = await response.json();
  console.log("[API] Odpowiedź:", result);
  return result.id || result.accidentInfoId || result;
};

export const generateAccidentFile = async (userId: string, accidentInfoId: string, fileType: string): Promise<Blob> => {
  const payload: PdfPayload = {
    userId,
    accidentInfoId,
  };

  console.log(`[API] Generowanie pliku ${fileType}...`, payload);

  const response = await fetchWithTimeout(`${API_BASE_URL}/accidents/files/${fileType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("[API] Błąd odpowiedzi:", response.status, errorData);
    throw new Error(errorData?.message || `Błąd podczas generowania pliku: ${response.status}`);
  }

  console.log(`[API] Plik ${fileType} wygenerowany pomyślnie`);
  return await response.blob();
};

export const downloadFile = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
