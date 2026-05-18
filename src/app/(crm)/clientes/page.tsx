"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronRight, Mail, MapPin, Phone, Search, User } from "lucide-react";
import { clients, type Client, type ClientSource, type ClientStatus } from "@/lib/demo-data";

const statusLabel: Record<ClientStatus, string> = {
  lead: "Lead",
  negociacao: "Em negociação",
  cliente: "Cliente",
  inativo: "Inativo",
};

const statusClass: Record<ClientStatus, string> = {
  lead: "bg-sky-500/15 text-sky-900 ring-sky-500/20",
  negociacao: "bg-gold/35 text-charcoal ring-gold/40",
  cliente: "bg-emerald-500/15 text-emerald-900 ring-emerald-500/25",
  inativo: "bg-charcoal/10 text-charcoal/50 ring-charcoal/10",
};

const sourceClass: Record<ClientSource, string> = {
  WhatsApp: "bg-[#25D366]/15 text-emerald-900",
  Loja: "bg-charcoal/10 text-charcoal/75",
  Webmotors: "bg-red-500/10 text-red-900",
  Site: "bg-violet-500/10 text-violet-900",
  Indicação: "bg-amber-500/15 text-amber-900",
  OLX: "bg-purple-500/10 text-purple-900",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function ClientesPage() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "todos">("todos");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return clients.filter((c) => {
      if (statusFilter !== "todos" && c.status !== statusFilter) return false;
      if (!t) return true;
      return (
        c.name.toLowerCase().includes(t) ||
        c.email.toLowerCase().includes(t) ||
        c.phone.includes(t) ||
        c.city.toLowerCase().includes(t) ||
        c.vehicleInterest.toLowerCase().includes(t) ||
        c.financing.toLowerCase().includes(t) ||
        c.tradeIn.toLowerCase().includes(t) ||
        c.realInterestNote.toLowerCase().includes(t)
      );
    });
  }, [q, statusFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-charcoal">Clientes</h1>
          <p className="mt-1 text-charcoal/50">Base demo — contatos, origem e interesse em veículos.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-charcoal/60 shadow-sm ring-1 ring-charcoal/5">
            {clients.length} cadastros
          </span>
          <span className="rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-white shadow-soft">
            {filtered.length} na lista
          </span>
        </div>
      </div>

      <div className="card-glass flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <div className="relative min-w-0 flex-1 md:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/35" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome, e-mail, telefone, cidade ou veículo…"
            className="w-full rounded-2xl border border-charcoal/10 bg-white/90 py-3 pl-11 pr-4 text-sm text-charcoal outline-none placeholder:text-charcoal/35 focus:border-gold/50 focus:ring-2 focus:ring-gold/25"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["todos", "lead", "negociacao", "cliente", "inativo"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                statusFilter === s
                  ? "bg-charcoal text-white shadow-soft"
                  : "bg-white/80 text-charcoal/55 ring-1 ring-charcoal/10 hover:bg-white"
              }`}
            >
              {s === "todos" ? "Todos" : statusLabel[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-[2rem] border border-white/70 bg-white/65 shadow-soft backdrop-blur-md md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-charcoal/8 text-xs font-semibold uppercase tracking-wide text-charcoal/45">
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Contato</th>
              <th className="px-6 py-4">Origem</th>
              <th className="px-6 py-4">Interesse</th>
              <th className="px-6 py-4">Último contato</th>
              <th className="px-6 py-4">Status</th>
              <th className="w-12 px-4 py-4" aria-label="Abrir ficha" />
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {filtered.map((c) => (
              <ClientRow key={c.id} c={c} />
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-6 py-12 text-center text-sm text-charcoal/45">Nenhum cliente encontrado.</p>
        )}
      </div>

      <div className="grid gap-4 md:hidden">
        {filtered.map((c) => (
          <Link key={c.id} href={`/clientes/${c.id}`} className="block outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-[2rem]">
            <ClientCard c={c} />
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-charcoal/45">Nenhum cliente encontrado.</p>
        )}
      </div>
    </div>
  );
}

function ClientRow({ c }: { c: Client }) {
  const router = useRouter();
  return (
    <tr
      role="link"
      tabIndex={0}
      title="Abrir ficha completa"
      onClick={() => router.push(`/clientes/${c.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/clientes/${c.id}`);
        }
      }}
      className="cursor-pointer transition hover:bg-white/80"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/90 to-amber-300 text-xs font-bold text-charcoal">
            {initials(c.name)}
          </span>
          <div>
            <p className="font-medium text-charcoal">{c.name}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-charcoal/45">
              <MapPin className="h-3 w-3 shrink-0" />
              {c.city}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="flex items-center gap-1.5 text-charcoal/80">
          <Mail className="h-3.5 w-3.5 shrink-0 text-charcoal/35" />
          {c.email}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-charcoal/50">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          {c.phone}
        </p>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${sourceClass[c.source]}`}>
          {c.source}
        </span>
      </td>
      <td className="max-w-[200px] px-6 py-4 text-charcoal/70">
        <span className="line-clamp-2">{c.vehicleInterest}</span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-charcoal/55">{c.lastContact}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusClass[c.status]}`}>
          {statusLabel[c.status]}
        </span>
      </td>
      <td className="px-4 py-4 text-charcoal/35">
        <ChevronRight className="h-5 w-5" aria-hidden />
      </td>
    </tr>
  );
}

function ClientCard({ c }: { c: Client }) {
  return (
    <article className="card-glass h-full p-5 transition hover:shadow-card-hover">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/90 to-amber-300 text-sm font-bold text-charcoal">
          {initials(c.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-charcoal">{c.name}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-charcoal/45">
            <MapPin className="h-3 w-3 shrink-0" />
            {c.city}
          </p>
          <div className="mt-3 space-y-1.5 text-sm text-charcoal/65">
            <p className="flex items-center gap-2 truncate">
              <Mail className="h-3.5 w-3.5 shrink-0 text-charcoal/35" />
              {c.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 shrink-0 text-charcoal/35" />
              {c.phone}
            </p>
          </div>
          <p className="mt-3 flex items-start gap-2 text-sm text-charcoal/55">
            <User className="mt-0.5 h-3.5 w-3.5 shrink-0 text-charcoal/35" />
            <span>{c.vehicleInterest}</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${sourceClass[c.source]}`}>{c.source}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusClass[c.status]}`}>
                {statusLabel[c.status]}
              </span>
              <span className="text-xs text-charcoal/40">{c.lastContact}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal/50">
              Ficha <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
