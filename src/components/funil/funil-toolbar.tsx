"use client";

import { Flame, LayoutGrid, Search, SlidersHorizontal, Snowflake, ThermometerSun } from "lucide-react";
import type { LeadTemperature } from "@/lib/funil-data";
import { ORIGINS, SELLERS } from "@/lib/funil-data";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  period: string;
  onPeriodChange: (v: string) => void;
  seller: string;
  onSellerChange: (v: string) => void;
  origin: string;
  onOriginChange: (v: string) => void;
  temperature: "todas" | LeadTemperature;
  onTemperatureChange: (v: "todas" | LeadTemperature) => void;
};

export function FunilToolbar({
  search,
  onSearchChange,
  period,
  onPeriodChange,
  seller,
  onSellerChange,
  origin,
  onOriginChange,
  temperature,
  onTemperatureChange,
}: Props) {
  return (
    <div className="card-glass space-y-4 p-4 md:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/35" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Busca global — nome, veículo, cidade, telefone…"
            className="w-full rounded-2xl border border-charcoal/10 bg-white/95 py-3 pl-11 pr-4 text-sm text-charcoal outline-none placeholder:text-charcoal/35 focus:border-gold/50 focus:ring-2 focus:ring-gold/25"
          />
        </div>
        <div className="flex items-center gap-2 text-charcoal/45">
          <SlidersHorizontal className="h-4 w-4 shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wide">Filtros</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        <select
          value={period}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="rounded-2xl border border-charcoal/10 bg-white/90 px-4 py-2.5 text-sm font-medium text-charcoal outline-none focus:ring-2 focus:ring-gold/25"
        >
          <option value="7d">Período: 7 dias</option>
          <option value="30d">Período: 30 dias</option>
          <option value="90d">Período: 90 dias</option>
          <option value="all">Período: tudo</option>
        </select>
        <select
          value={seller}
          onChange={(e) => onSellerChange(e.target.value)}
          className="rounded-2xl border border-charcoal/10 bg-white/90 px-4 py-2.5 text-sm font-medium text-charcoal outline-none focus:ring-2 focus:ring-gold/25"
        >
          {SELLERS.map((s) => (
            <option key={s} value={s}>
              Vendedor: {s}
            </option>
          ))}
        </select>
        <select
          value={origin}
          onChange={(e) => onOriginChange(e.target.value)}
          className="rounded-2xl border border-charcoal/10 bg-white/90 px-4 py-2.5 text-sm font-medium text-charcoal outline-none focus:ring-2 focus:ring-gold/25"
        >
          <option value="Todas">Origem: todas</option>
          {ORIGINS.map((o) => (
            <option key={o} value={o}>
              Origem: {o}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { id: "todas" as const, label: "Todas", Icon: LayoutGrid },
              { id: "quente" as const, label: "Quente", Icon: Flame },
              { id: "morno" as const, label: "Morno", Icon: ThermometerSun },
              { id: "frio" as const, label: "Frio", Icon: Snowflake },
            ] as const
          ).map((t) => {
            const Icon = t.Icon;
            return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTemperatureChange(t.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition ${
                temperature === t.id
                  ? "bg-charcoal text-white shadow-soft"
                  : "bg-white/80 text-charcoal/55 ring-1 ring-charcoal/10 hover:bg-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              {t.id === "todas" ? "Temp.: todas" : t.label}
            </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
