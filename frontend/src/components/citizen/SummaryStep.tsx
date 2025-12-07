import { useFormContext } from "react-hook-form";
import type { CitizenSchema } from "./validations/citizen-schema";
import { CheckCircle2 } from "lucide-react";
import { useSummaryFormatters } from "./hooks/useSummaryFormatters";
import { Section, Row, LongRow } from "./SummaryComponents";
import { NextStepsInfo } from "./NextStepsInfo";
import { AISummaryCard } from "./AISummaryCard";

export const SummaryStep = () => {
  const { watch } = useFormContext<CitizenSchema>();
  const data = watch();

  const { formatDate, formatAddress, getDocumentTypeName, getCorrespondenceTypeName } =
    useSummaryFormatters();

  const formatOptionalAddress = (address?: {
    street?: string;
    houseNumber?: string;
    apartmentNumber?: string;
    zipCode?: string;
    city?: string;
    country?: string;
  }) => {
    if (!address?.street && !address?.city) return undefined;
    const parts = [];
    if (address.street) {
      parts.push(address.street);
      if (address.houseNumber) {
        parts[0] += ` ${address.houseNumber}`;
        if (address.apartmentNumber) parts[0] += `/${address.apartmentNumber}`;
      }
    }
    if (address.zipCode && address.city) {
      parts.push(`${address.zipCode} ${address.city}`);
    } else if (address.city) {
      parts.push(address.city);
    }
    if (address.country && address.country !== "Polska") {
      parts.push(address.country);
    }
    return parts.join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted border border-border">
        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Sprawdź dane przed zapisaniem.</span>
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

      {data.isProxy && data.proxy?.name && (
        <Section title="Dane pełnomocnika">
          <Row label="Imię i nazwisko" value={data.proxy.name} />
          <Row label="PESEL" value={data.proxy.pesel} />
          {data.proxy.identityType && (
            <>
              <Row label="Dokument" value={getDocumentTypeName(data.proxy.identityType)} />
              <Row
                label="Seria i numer"
                value={
                  data.proxy.identitySeries && data.proxy.identityNumber
                    ? `${data.proxy.identitySeries} ${data.proxy.identityNumber}`
                    : undefined
                }
              />
            </>
          )}
          <Row label="Telefon" value={data.proxy.phoneNumber} />
          <Row label="Adres" value={formatOptionalAddress(data.proxy.address)} />
        </Section>
      )}

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
          <div className="border-t border-border/50 pt-4 mt-6">
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

          {/* Sekcja świadka - gdy hasWitness === true */}
          {data.hasWitness && data.witness?.name && (
            <Section title="Dane świadka">
              <Row label="Imię i nazwisko" value={data.witness.name} />
              <Row label="Adres" value={formatOptionalAddress(data.witness.address)} />
              <LongRow label="Zeznanie świadka" value={data.witness.testimony} />
            </Section>
          )}

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
          <div className="border-t border-border/50 pt-4 mt-6">
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

      <AISummaryCard data={data} />

      <NextStepsInfo />
    </div>
  );
};
