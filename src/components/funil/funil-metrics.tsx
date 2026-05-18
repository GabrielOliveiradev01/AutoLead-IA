"use client";

import { Banknote, Car, Flame, Phone, Timer, TrendingUp } from "lucide-react";

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

type Props = {
  hotLeads: number;
  negotiationValue: number;
  followUpsToday: number;
  testDrives: number;
  conversionPct: number;
  responseTimeLabel: string;
};

const cards = [
  { key: "hot", icon: Flame, label: "Leads quentes", color: "from-orange-500/20 to-amber-400/10", iconClass: "text-orange-600" },
  { key: "value", icon: Banknote, label: "Valor negociações", color: "from-emerald-500/15 to-teal-500/10", iconClass: "text-emerald-700" },
  { key: "follow", icon: Phone, label: "Follow-ups hoje", color: "from-sky-500/15 to-blue-500/10", iconClass: "text-sky-700" },
  { key: "td", icon: Car, label: "Test drives / visitas", color: "from-violet-500/15 to-purple-500/10", iconClass: "text-violet-700" },
  { key: "conv", icon: TrendingUp, label: "Conversão (demo)", color: "from-gold/40 to-amber-200/30", iconClass: "text-charcoal" },
  { key: "resp", icon: Timer, label: "Tempo resposta", color: "from-charcoal/10 to-charcoal/5", iconClass: "text-charcoal/60" },
] as const;

export function FunilMetrics({
  hotLeads,
  negotiationValue,
  followUpsToday,
  testDrives,
  conversionPct,
  responseTimeLabel,
}: Props) {
  const values: Record<(typeof cards)[number]["key"], string> = {
    hot: String(hotLeads),
    value: brl(negotiationValue),
    follow: String(followUpsToday),
    td: String(testDrives),
    conv: `${conversionPct}%`,
    resp: responseTimeLabel,
  };

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map(({ key, icon: Icon, label, color, iconClass }) => (
        <div
          key={key}
          className={`card-glass relative overflow-hidden bg-gradient-to-br p-4 ${color} md:p-5`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 shadow-sm">
            <Icon className={`h-5 w-5 ${iconClass}`} strokeWidth={2} aria-hidden />
          </div>
          <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight text-charcoal md:text-3xl">
            {values[key]}
          </p>
          <p className="mt-1 text-xs font-medium leading-tight text-charcoal/50">{label}</p>
        </div>
      ))}
    </div>
  );
}
