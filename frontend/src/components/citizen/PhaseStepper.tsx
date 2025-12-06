import { User, Car, FileText, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const PHASES = [
  {
    id: 1,
    title: "Dane kontaktowe",
    icon: User,
    stepRange: { start: 1, end: 5 },
  },
  {
    id: 2,
    title: "Opis zdarzenia",
    icon: Car,
    stepRange: { start: 6, end: 8 },
  },
  {
    id: 3,
    title: "Dokumenty",
    icon: FileText,
    stepRange: { start: 9, end: 10 },
  },
];

interface PhaseStepperProps {
  currentStep: number;
}

export function PhaseStepper({ currentStep }: PhaseStepperProps) {
  const getPhaseStatus = (phase: (typeof PHASES)[number]) => {
    if (currentStep > phase.stepRange.end) return "completed";
    if (currentStep >= phase.stepRange.start && currentStep <= phase.stepRange.end) return "active";
    return "pending";
  };

  return (
    <div className="w-full mb-8 px-4">
      <div className="relative flex justify-between items-start">
        <div className="absolute top-4 left-0 w-full h-[2px] bg-border z-0" />

        {PHASES.map((phase, index) => {
          const status = getPhaseStatus(phase);
          const Icon = phase.icon;
          const isLast = index === PHASES.length - 1;

          return (
            <div
              key={phase.id}
              className={cn(
                "relative z-10 flex flex-col items-center gap-2",
                isLast ? "items-end" : index === 0 ? "items-start" : "items-center"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 bg-background",
                  status === "completed" && "border-primary bg-primary text-primary-foreground",
                  status === "active" && "border-primary text-primary ring-4 ring-primary/10",
                  status === "pending" && "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {status === "completed" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>

              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300 absolute top-10 w-32",
                  index === 0 ? "left-0 text-left" :
                    isLast ? "right-0 text-right" :
                      "left-1/2 -translate-x-1/2 text-center",

                  status === "active" && "text-primary font-semibold",
                  status === "completed" && "text-primary",
                  status === "pending" && "text-muted-foreground"
                )}
              >
                {phase.title}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-8" />
    </div>
  );
}
