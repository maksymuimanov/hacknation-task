import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import type { CitizenSchema } from "./validations/citizen-schema";
import { CheckCircle2 } from "lucide-react";

export const SummaryStep = () => {
  const { watch } = useFormContext<CitizenSchema>();
  const data = watch();

  const formatDate = (date?: Date) => {
    if (!date) return "-";
    return format(date, "d MMMM yyyy", { locale: pl });
  };

  const formatAddress = (address?: {
    street?: string;
    houseNumber?: string;
    apartmentNumber?: string;
    zipCode?: string;
    city?: string;
  }) => {
    if (!address?.street) return "-";

    const parts = [address.street, address.houseNumber, address.apartmentNumber ? `/${address.apartmentNumber}` : ""]
      .filter(Boolean)
      .join(" ");

    return `${parts}, ${address.zipCode} ${address.city}`;
  };

  const getDocumentTypeName = (type?: string) => {
    const types: Record<string, string> = {
      ID_CARD: "Dowód osobisty",
      PASSPORT: "Paszport",
    };
    return type ? types[type] || type : "-";
  };

  const getCorrespondenceTypeName = (type?: string) => {
    const types: Record<string, string> = {
      ADDRESS: "Adres",
      POSTE_RESTANTE: "Poste restante",
      PO_BOX: "Skrytka pocztowa",
    };
    return type ? types[type] || type : "-";
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );

  const Row = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground flex-shrink-0">{label}</span>
      <span className="font-medium text-right break-words">{value || "-"}</span>
    </div>
  );

  const LongRow = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="space-y-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <p className="font-medium text-sm break-words whitespace-pre-wrap">{value || "-"}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 text-primary">
        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
        <span className="text-sm">Sprawdź dane przed zapisaniem.</span>
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

      {data.accident && (
        <>
          <div className="border-t pt-4 mt-6">
            <h2 className="text-base font-semibold mb-4">Informacje o wypadku</h2>
          </div>

          <Section title="Podstawowe dane">
            <Row label="Data wypadku" value={formatDate(data.accident.date)} />
            <Row label="Godzina wypadku" value={data.accident.time} />
            <Row
              label="Planowane godziny pracy"
              value={
                data.accident.plannedWorkStart && data.accident.plannedWorkEnd
                  ? `${data.accident.plannedWorkStart} - ${data.accident.plannedWorkEnd}`
                  : "-"
              }
            />
            <LongRow label="Miejsce wypadku" value={data.accident.location} />
          </Section>

          <Section title="Urazy i pomoc medyczna">
            <LongRow label="Rodzaj urazów" value={data.accident.injuries} />
            <Row
              label="Udzielono pomocy medycznej"
              value={data.accident.medicalAidProvided ? "Tak" : "Nie"}
            />
            {data.accident.medicalAidProvided && (
              <>
                <Row label="Placówka" value={data.accident.medicalFacilityName} />
                <Row label="Adres placówki" value={data.accident.medicalFacilityAddress} />
                <Row label="Okres hospitalizacji" value={data.accident.hospitalizationPeriod} />
              </>
            )}
          </Section>

          <Section title="Okoliczności wypadku">
            <LongRow label="Czynności przed wypadkiem" value={data.accident.activitiesBeforeAccident} />
            <LongRow label="Przebieg wypadku" value={data.accident.detailedDescription} />
            <LongRow label="Przyczyna" value={data.accident.causeDescription} />
          </Section>
        </>
      )}

      {data.documents && data.documents.length > 0 && (
        <>
          <div className="border-t pt-4 mt-6">
            <h2 className="text-base font-semibold mb-4">Załączone dokumenty</h2>
          </div>

          <Section title={`Pliki (${data.documents.length})`}>
            {data.documents.map((file, index) => (
              <Row
                key={index}
                label={file.name}
                value={`${(file.size / 1024).toFixed(1)} KB`}
              />
            ))}
          </Section>
        </>
      )}
    </div>
  );
};
