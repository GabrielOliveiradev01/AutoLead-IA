"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  calendarEvents,
  featuredSeller,
  kpiBars,
  kpiNumbers,
  pipeline,
  progressWeek,
  responseRing,
  sidebarSections,
  weekDays,
} from "@/lib/demo-data";

function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

export function DashboardView({ userName }: { userName: string }) {
  const [openSection, setOpenSection] = useState(0);

  const maxH = Math.max(...progressWeek.map((d) => d.h));

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
            Bem-vindo de volta, {userName.split(" ")[0]}
          </h1>
          <p className="mt-1 text-charcoal/50">Visão geral da sua concessionária — dados demo.</p>
        </div>
        <div className="flex flex-wrap items-end gap-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {kpiBars.map((k) => (
              <div key={k.label} className="min-w-[140px]">
                <div className="mb-1 flex justify-between text-xs text-charcoal/45">
                  <span>{k.label}</span>
                  <span className="font-medium text-charcoal">{k.value}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-charcoal/10">
                  <div
                    className="h-full rounded-full bg-gold transition-all"
                    style={{ width: `${k.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-6 border-l border-charcoal/10 pl-8">
            {kpiNumbers.map((n) => (
              <div key={n.label} className="text-right">
                <p className="text-3xl font-light tabular-nums text-charcoal md:text-4xl">{n.value}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-charcoal/40">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-12">
        <div className="card-glass relative overflow-hidden lg:col-span-4">
          <div className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-charcoal shadow-sm">
            {featuredSeller.badge}
          </div>
          <div className="flex aspect-[4/3] items-end justify-start bg-gradient-to-br from-charcoal via-charcoal/90 to-charcoal/70 p-6 md:aspect-auto md:min-h-[220px]">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white/10 text-2xl font-semibold text-white ring-2 ring-gold/40">
              {featuredSeller.initials}
            </div>
            <div className="ml-4 text-white">
              <p className="text-lg font-semibold">{featuredSeller.name}</p>
              <p className="text-sm text-white/65">{featuredSeller.role}</p>
            </div>
          </div>
        </div>

        <div className="card-glass flex flex-col justify-between p-6 lg:col-span-3">
          <p className="text-sm font-medium text-charcoal/45">Atividade (horas)</p>
          <p className="mt-2 text-4xl font-light tabular-nums text-charcoal">
            {progressWeek.find((d) => d.active)?.h ?? 0}
            <span className="text-xl text-charcoal/35">h</span>
          </p>
          <div className="mt-6 flex h-36 items-end justify-between gap-2">
            {progressWeek.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={`w-full max-w-[44px] rounded-t-2xl transition-colors ${
                    d.active ? "bg-gold" : "bg-charcoal/10"
                  }`}
                  style={{ height: `${(d.h / maxH) * 100}%`, minHeight: "28%" }}
                />
                <span
                  className={`text-[11px] font-medium ${d.active ? "text-charcoal" : "text-charcoal/40"}`}
                >
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass flex flex-col items-center justify-center p-6 lg:col-span-2">
          <p className="mb-4 text-center text-sm font-medium text-charcoal/45">{responseRing.label}</p>
          <div className="relative flex h-36 w-36 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                className="stroke-charcoal/10"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                className="stroke-gold"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${responseRing.percent * 2.64} 264`}
              />
            </svg>
            <div className="absolute text-center">
              <p className="text-2xl font-semibold tabular-nums text-charcoal">{responseRing.value}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-3">
          <div className="card-glass p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-charcoal/45">Funil de vendas</span>
              <span className="text-lg font-semibold text-charcoal">{pipeline.percent}%</span>
            </div>
            <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-charcoal/10">
              {pipeline.segments.map((w, i) => (
                <div
                  key={i}
                  className={i === 1 ? "bg-gold" : i % 2 === 0 ? "bg-charcoal/25" : "bg-charcoal/15"}
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-1 flex-col rounded-[2rem] bg-charcoal p-5 text-white shadow-soft">
            <p className="text-sm font-medium text-white/55">Tarefas do funil</p>
            <ul className="mt-4 space-y-3">
              {pipeline.tasks.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/90 text-charcoal">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-white/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-12 lg:items-start">
        <aside className="card-glass p-2 lg:col-span-3">
          {sidebarSections.map((sec, idx) => {
            const open = openSection === idx;
            return (
              <div key={sec.title} className="border-b border-charcoal/5 last:border-0">
                <button
                  type="button"
                  onClick={() => setOpenSection(open ? -1 : idx)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold text-charcoal hover:bg-white/50"
                >
                  {sec.title}
                  <ChevronDown
                    className={`h-4 w-4 text-charcoal/35 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <ul className="space-y-1 px-4 pb-3">
                    {sec.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-xl px-3 py-2 text-sm text-charcoal/60 hover:bg-white/60 hover:text-charcoal"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>

        <div className="card-glass p-6 lg:col-span-9">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-charcoal">Agenda da semana</h2>
            <span className="rounded-full bg-gold/25 px-4 py-1.5 text-xs font-semibold text-charcoal/80">
              {formatBRL(428900)} em negociações
            </span>
          </div>
          <div className="grid grid-cols-6 gap-3 max-lg:overflow-x-auto max-lg:pb-2">
            {weekDays.map((day, dayIndex) => (
              <div key={day} className="min-w-[100px] rounded-2xl bg-charcoal/[0.04] p-3">
                <p className="text-center text-xs font-semibold uppercase tracking-wide text-charcoal/40">
                  {day}
                </p>
                <div className="mt-3 space-y-2">
                  {calendarEvents
                    .filter((e) => e.dayIndex === dayIndex)
                    .map((ev) => (
                      <div
                        key={ev.id}
                        className="rounded-xl border border-white/80 bg-white/90 p-2 shadow-sm"
                      >
                        <p className="text-[11px] font-semibold leading-tight text-charcoal">{ev.title}</p>
                        <p className="mt-1 text-[10px] text-charcoal/45">
                          {ev.start} — {ev.end}
                        </p>
                        <div className="mt-2 flex -space-x-1.5">
                          {Array.from({ length: ev.people }).map((_, i) => (
                            <span
                              key={i}
                              className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-gold to-amber-300 text-[9px] font-bold text-charcoal"
                            >
                              {String.fromCharCode(65 + i)}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
