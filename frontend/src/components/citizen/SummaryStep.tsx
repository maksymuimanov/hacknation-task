import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import type { CitizenSchema } from "./validations/citizen-schema";
import { CheckCircle2 } from "lucide-react";

export const SummaryStep = () => {
  const { watch } = useFormContext<CitizenSchema>();
  const data = watch();

  const formatDate = (date?: Date) => {
    if (!date) return "—";
    return format(date, "d MMMM yyyy", { locale: pl });
  };

  const formatAddress = (address?: {
    street?: string;
    houseNumber?: number;
    apartmentNumber?: number;
    zipCode?: string;
    city?: string;
    country?: string;
  }) => {
    if (!address?.street) return "—";

    const parts = [address.street, address.houseNumber, address.apartmentNumber ? `/${address.apartmentNumber}` : ""]
      .filter(Boolean)
      .join(" ");

    return `${parts}, ${address.zipCode} ${address.city}${address.country && address.country !== "Polska" ? `, ${address.country}` : ""}`;
  };

  const getDocumentTypeName = (type?: string) => {
    const types: Record<string, string> = {
      ID_CARD: "Dowód osobisty",
      PASSPORT: "Paszport",
      OTHER: "Inny",
    };
    return type ? types[type] || type : "—";
  };

  const getCorrespondenceTypeName = (type?: string) => {
    const types: Record<string, string> = {
      ADDRESS: "Adres",
      POSTE_RESTANTE: "Poste restante",
      PO_BOX: "Skrytka pocztowa",
    };
    return type ? types[type] || type : "—";
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );

  const Row = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right max-w-[60%]">{value || "—"}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 text-primary">
        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
        <span className="text-sm">Sprawdź dane przed zapisaniem</span>
      </div>

      <Section title="Dane osobowe">
        <Row label="Imię i nazwisko" value={data.name} />
        <Row label="PESEL" value={data.pesel} />
        <Row label="Dokument" value={getDocumentTypeName(data.identity?.type)} />
        <Row
          label="Seria i numer"
          value={
            data.identity?.series && data.identity?.number
              ? `${data.identity.series} ${data.identity.number}`
              : undefined
          }
        />
        <Row label="Telefon" value={data.phoneNumber} />
      </Section>

      <Section title="Urodzenie">
        <Row label="Data" value={formatDate(data.birth?.date)} />
        <Row label="Miejsce" value={data.birth?.city} />
      </Section>

      <Section title="Adres zamieszkania">
        <Row label="Adres" value={formatAddress(data.residentialAddress)} />
      </Section>

      {data.livesAbroad && data.lastKnownAddress?.street && (
        <Section title="Ostatni adres w Polsce">
          <Row label="Adres" value={formatAddress(data.lastKnownAddress)} />
        </Section>
      )}

      <Section title="Adres korespondencyjny">
        <Row label="Rodzaj" value={getCorrespondenceTypeName(data.correspondenceAddress?.type)} />
        {data.correspondenceAddress?.type === "ADDRESS" && (
          <Row label="Adres" value={formatAddress(data.correspondenceAddress)} />
        )}
        {data.correspondenceAddress?.type === "POSTE_RESTANTE" && (
          <>
            <Row label="Kod pocztowy" value={data.correspondenceAddress?.posteRestante?.zipCode} />
            <Row label="Placówka" value={data.correspondenceAddress?.posteRestante?.postOfficeName} />
          </>
        )}
        {data.correspondenceAddress?.type === "PO_BOX" && (
          <>
            <Row label="Nr skrytki" value={data.correspondenceAddress?.poBox?.number} />
            <Row label="Kod pocztowy" value={data.correspondenceAddress?.poBox?.zipCode} />
            <Row label="Placówka" value={data.correspondenceAddress?.poBox?.postOfficeName} />
          </>
        )}
      </Section>

      <Section title="Adres działalności">
        <Row label="Adres" value={formatAddress(data.businessAddress)} />
      </Section>
    </div>
  );
};
