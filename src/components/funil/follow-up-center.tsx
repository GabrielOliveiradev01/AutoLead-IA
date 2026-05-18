"use client";

import { useMemo, useState } from "react";
import { AlarmClock, Bot, CalendarClock, ChevronRight, Zap } from "lucide-react";
import type { FunnelLead } from "@/lib/funil-data";

type Tab = "hoje" | "atrasados" | "automaticos" | "ia";

type Props = {
  leads: FunnelLead[];
  onOpenLead: (id: string) => void;
};

const tabs: { id: Tab; label: string; icon: typeof CalendarClock }[] = [
  { id: "hoje", label: "Hoje", icon: CalendarClock },
  { id: "atrasados", label: "Atrasados", icon: AlarmClock },
  { id: "automaticos", label: "Automáticos", icon: Zap },
  { id: "ia", label: "IA", icon: Bot },
];

export function FollowUpCenter({ leads, onOpenLead }: Props) {
  const [tab, setTab] = useState<Tab>("hoje");

  const list = useMemo(() => {
    if (tab === "hoje") {
      return leads.filter((l) => l.nextFollowUp?.dateLabel === "Hoje" && !l.nextFollowUp?.overdueDays);
    }
    if (tab === "atrasados") {
      return leads.filter((l) => (l.nextFollowUp?.overdueDays ?? 0) > 0);
    }
    if (tab === "automaticos") {
      return leads.filter((l) => l.iaSuggestion && !l.iaHot);
    }
    return leads.filter((l) => l.iaHot);
  }, [leads, tab]);

  return (
    <section className="card-glass overflow-hidden">
      <div className="border-b border-charcoal/8 bg-charcoal/[0.03] px-5 py-4 md:px-6">
        <h2 className="text-lg font-semibold text-charcoal">Central de follow-up</h2>
        <p className="mt-1 text-sm text-charcoal/45">
          Priorize retornos: hoje, atrasados, fluxos automáticos e alertas da IA.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === id
                  ? "bg-charcoal text-white shadow-soft"
                  : "bg-white/80 text-charcoal/55 ring-1 ring-charcoal/10 hover:bg-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
      <ul className="max-h-[320px] divide-y divide-charcoal/5 overflow-y-auto">
        {list.length === 0 ? (
          <li className="px-6 py-12 text-center text-sm text-charcoal/45">Nada nesta lista com os filtros atuais.</li>
        ) : (
          list.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => onOpenLead(l.id)}
                className="flex w-full items-start gap-4 px-5 py-4 text-left transition hover:bg-white/70 md:px-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/90 to-amber-300 text-xs font-bold text-charcoal">
                  {l.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-charcoal">{l.name}</p>
                  <p className="text-sm text-charcoal/55">{l.vehicleModel}</p>
                  <p className="mt-1 text-xs text-charcoal/40">
                    {l.seller} · {l.origin}
                    {l.nextFollowUp && (
                      <>
                        {" "}
                        ·{" "}
                        {l.nextFollowUp.overdueDays ? (
                          <span className="font-semibold text-red-700">
                            Atrasado {l.nextFollowUp.overdueDays}d
                          </span>
                        ) : (
                          <span>
                            {l.nextFollowUp.dateLabel} {l.nextFollowUp.time}
                          </span>
                        )}
                      </>
                    )}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-0.5 text-xs font-medium text-gold">
                  Abrir <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
