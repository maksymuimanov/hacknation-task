import accident1Zawiadomienie from "@/assets/accident-1/zawiadomienie o wypadku 1.pdf";
import accident1Wyjasnienia from "@/assets/accident-1/wyjaśnienia poszkodowanego 1.pdf";
import accident1Opinia from "@/assets/accident-1/opinia 1.pdf";
import accident1Karta from "@/assets/accident-1/karta wypadku 1.pdf";

import accident23Zawiadomienie from "@/assets/accident-23/zawiadomienie o wypadku 23.pdf";
import accident23Wyjasnienia from "@/assets/accident-23/wyjaśnienia poszkodowanego 23.pdf";
import accident23Opinia from "@/assets/accident-23/opinia 23.pdf";
import accident23Karta from "@/assets/accident-23/karta wypadku 23.pdf";

import accident37Zawiadomienie from "@/assets/accident-37/zawiadomienie o wypadku 37.pdf";
import accident37Wyjasnienia from "@/assets/accident-37/wyjaśnienia poszkodowanego 37.pdf";
import accident37Opinia from "@/assets/accident-37/opinia 37.pdf";
import accident37Karta from "@/assets/accident-37/karta wypadku 37.pdf";

import accident54Zawiadomienie from "@/assets/accident-54/zawiadomienie o wypadku 54.pdf";
import accident54Wyjasnienia from "@/assets/accident-54/wyjaśnienia poszkodowanego 54.pdf";
import accident54Opinia from "@/assets/accident-54/opinia 54.pdf";
import accident54Karta from "@/assets/accident-54/karta wypadku 54.pdf";

import accident70Zawiadomienie from "@/assets/accident-70/zawiadomienie o wypadku 70.pdf";
import accident70Wyjasnienia from "@/assets/accident-70/wyjaśnienia poszkodowanego 70.pdf";
import accident70Opinia from "@/assets/accident-70/opinia 70.pdf";
import accident70Karta from "@/assets/accident-70/karta wypadku 70.pdf";

import type { AccidentCase } from "./types";

/**
 * Pre-loaded mock cases from assets.
 * In a real app, these would be fetched from an API.
 */
export const MOCK_CASES: AccidentCase[] = [
  {
    id: "accident-1",
    applicantName: "Jan Kowalski",
    accidentDate: "2025-01-15",
    status: "pending",
    isUploaded: false,
    documents: [
      { type: "zawiadomienie", name: "Zawiadomienie o wypadku", url: accident1Zawiadomienie },
      { type: "wyjasnienia", name: "Wyjaśnienia poszkodowanego", url: accident1Wyjasnienia },
      { type: "opinia", name: "Opinia", url: accident1Opinia },
      { type: "karta", name: "Karta wypadku", url: accident1Karta },
    ],
  },
  {
    id: "accident-23",
    applicantName: "Anna Nowak",
    accidentDate: "2025-02-10",
    status: "pending",
    isUploaded: false,
    documents: [
      { type: "zawiadomienie", name: "Zawiadomienie o wypadku", url: accident23Zawiadomienie },
      { type: "wyjasnienia", name: "Wyjaśnienia poszkodowanego", url: accident23Wyjasnienia },
      { type: "opinia", name: "Opinia", url: accident23Opinia },
      { type: "karta", name: "Karta wypadku", url: accident23Karta },
    ],
  },
  {
    id: "accident-37",
    applicantName: "Piotr Wiśniewski",
    accidentDate: "2025-03-05",
    status: "approved",
    isUploaded: false,
    documents: [
      { type: "zawiadomienie", name: "Zawiadomienie o wypadku", url: accident37Zawiadomienie },
      { type: "wyjasnienia", name: "Wyjaśnienia poszkodowanego", url: accident37Wyjasnienia },
      { type: "opinia", name: "Opinia", url: accident37Opinia },
      { type: "karta", name: "Karta wypadku", url: accident37Karta },
    ],
  },
  {
    id: "accident-54",
    applicantName: "Maria Zielińska",
    accidentDate: "2025-04-20",
    status: "rejected",
    isUploaded: false,
    documents: [
      { type: "zawiadomienie", name: "Zawiadomienie o wypadku", url: accident54Zawiadomienie },
      { type: "wyjasnienia", name: "Wyjaśnienia poszkodowanego", url: accident54Wyjasnienia },
      { type: "opinia", name: "Opinia", url: accident54Opinia },
      { type: "karta", name: "Karta wypadku", url: accident54Karta },
    ],
  },
  {
    id: "accident-70",
    applicantName: "Tomasz Lewandowski",
    accidentDate: "2025-05-12",
    status: "pending",
    isUploaded: false,
    documents: [
      { type: "zawiadomienie", name: "Zawiadomienie o wypadku", url: accident70Zawiadomienie },
      { type: "wyjasnienia", name: "Wyjaśnienia poszkodowanego", url: accident70Wyjasnienia },
      { type: "opinia", name: "Opinia", url: accident70Opinia },
      { type: "karta", name: "Karta wypadku", url: accident70Karta },
    ],
  },
];
