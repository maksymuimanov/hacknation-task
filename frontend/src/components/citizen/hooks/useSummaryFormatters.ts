import { useMemo } from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface Address {
  street?: string;
  houseNumber?: string;
  apartmentNumber?: string;
  zipCode?: string;
  city?: string;
}

export const useSummaryFormatters = () => {
  const formatters = useMemo(() => {
    const formatDate = (date?: Date): string => {
      if (!date) return "-";
      return format(date, "d MMMM yyyy", { locale: pl });
    };

    const formatAddress = (address?: Address): string => {
      if (!address?.street) return "-";

      const parts = [
        address.street,
        address.houseNumber,
        address.apartmentNumber ? `/${address.apartmentNumber}` : "",
      ]
        .filter(Boolean)
        .join(" ");

      return `${parts}, ${address.zipCode} ${address.city}`;
    };

    const getDocumentTypeName = (type?: string): string => {
      const types: Record<string, string> = {
        ID_CARD: "Dowód osobisty",
        PASSPORT: "Paszport",
      };
      return type ? types[type] || type : "-";
    };

    const getCorrespondenceTypeName = (type?: string): string => {
      const types: Record<string, string> = {
        ADDRESS: "Adres",
        POSTE_RESTANTE: "Poste restante",
        PO_BOX: "Skrytka pocztowa",
      };
      return type ? types[type] || type : "-";
    };

    return {
      formatDate,
      formatAddress,
      getDocumentTypeName,
      getCorrespondenceTypeName,
    };
  }, []);

  return formatters;
};
