interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => (
  <div className="space-y-2">
    <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
    <div className="text-sm space-y-1">{children}</div>
  </div>
);

interface RowProps {
  label: string;
  value?: string | number | null;
}

export const Row = ({ label, value }: RowProps) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground flex-shrink-0">{label}</span>
    <span className="font-medium text-right break-words">{value || "-"}</span>
  </div>
);

export const LongRow = ({ label, value }: RowProps) => (
  <div className="space-y-1">
    <span className="text-muted-foreground text-xs">{label}</span>
    <p className="font-medium text-sm break-words whitespace-pre-wrap">
      {value || "-"}
    </p>
  </div>
);
