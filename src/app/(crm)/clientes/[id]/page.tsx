import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Banknote, Car, Gauge, MessageSquareText, Shield, Star, Zap } from "lucide-react";
import {
  getClientById,
  type ClientRealInterest,
  type ClientSource,
  type ClientStatus,
  type ClientUrgency,
} from "@/lib/demo-data";

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

const urgencyLabel: Record<ClientUrgency, string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};

const urgencyClass: Record<ClientUrgency, string> = {
  baixa: "bg-charcoal/8 text-charcoal/60 ring-charcoal/10",
  media: "bg-amber-500/15 text-amber-900 ring-amber-500/25",
  alta: "bg-red-500/12 text-red-900 ring-red-500/25",
};

const interestLabel: Record<ClientRealInterest, string> = {
  alto: "Alto",
  medio: "Médio",
  baixo: "Baixo",
};

const interestClass: Record<ClientRealInterest, string> = {
  alto: "bg-emerald-500/15 text-emerald-900 ring-emerald-500/25",
  medio: "bg-amber-500/15 text-amber-900 ring-amber-500/20",
  baixo: "bg-charcoal/10 text-charcoal/55 ring-charcoal/10",
};

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

type Props = { params: Promise<{ id: string }> };

export default async function ClienteFichaPage({ params }: Props) {
  const { id } = await params;
  const c = getClientById(id);
  if (!c) notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/clientes"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-charcoal/10 bg-white/90 px-4 py-2 text-sm font-medium text-charcoal/70 shadow-sm transition hover:bg-white hover:text-charcoal"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para clientes
        </Link>
      </div>

      <header className="card-glass flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/90 to-amber-300 text-lg font-bold text-charcoal shadow-sm">
            {initials(c.name)}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-charcoal md:text-3xl">{c.name}</h1>
            <p className="mt-1 text-sm text-charcoal/45">Último contato: {c.lastContact}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusClass[c.status]}`}>
                {statusLabel[c.status]}
              </span>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${sourceClass[c.source]}`}>
                {c.source}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <FichaBlock
          icon={Car}
          title="Carro desejado"
          highlight
          rows={[
            { label: "Veículo", value: c.vehicleInterest },
            { label: "Referência de valor (demo)", value: brl(c.vehiclePriceRef) },
          ]}
        />
        <FichaBlock
          icon={Banknote}
          title="Entrada e financiamento"
          rows={[
            { label: "Valor de entrada", value: brl(c.entryValue) },
            { label: "Financiamento", value: c.financing },
          ]}
        />
        <FichaBlock
          icon={Gauge}
          title="Score e perfil"
          rows={[
            {
              label: "Score (demo)",
              value: `${c.creditScore} — dado ilustrativo, sem consulta a birô.`,
            },
            { label: "Cidade", value: c.city },
          ]}
        />
        <FichaBlock
          icon={Zap}
          title="Urgência e troca"
          rows={[
            {
              label: "Urgência",
              value: (
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${urgencyClass[c.urgency]}`}>
                  {urgencyLabel[c.urgency]}
                </span>
              ),
            },
            { label: "Troca", value: c.tradeIn },
          ]}
        />
        <FichaBlock
          icon={Star}
          title="Interesse real"
          className="lg:col-span-2"
          rows={[
            {
              label: "Nível",
              value: (
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${interestClass[c.realInterest]}`}>
                  {interestLabel[c.realInterest]}
                </span>
              ),
            },
            { label: "Observação", value: c.realInterestNote },
          ]}
        />
      </div>

      <div className="card-glass flex flex-col gap-4 p-6 text-sm text-charcoal/50 md:flex-row md:items-center md:justify-between">
        <p className="flex items-start gap-2">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-charcoal/35" />
          Ficha demo para uso interno da equipe. Campos de score e valores não substituem análise de crédito oficial.
        </p>
        <Link
          href={`https://wa.me/55${c.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-charcoal px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-charcoal/90"
        >
          <MessageSquareText className="h-4 w-4" />
          WhatsApp (link demo)
        </Link>
      </div>
    </div>
  );
}

function FichaBlock({
  icon: Icon,
  title,
  rows,
  highlight,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  rows: { label: string; value: ReactNode }[];
  highlight?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`card-glass p-6 md:p-8 ${highlight ? "ring-1 ring-gold/35" : ""} ${className ?? ""}`}
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-charcoal/40">
        <Icon className="h-4 w-4" />
        {title}
      </h2>
      <dl className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal/40">{row.label}</dt>
            <dd className="mt-1.5 text-base leading-relaxed text-charcoal">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
