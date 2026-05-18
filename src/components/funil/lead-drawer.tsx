"use client";

import Link from "next/link";
import {
  Bot,
  Building2,
  Car,
  Check,
  History,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import type { FunnelLead } from "@/lib/funil-data";
import { STAGE_LABEL } from "@/lib/funil-data";

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

type Props = {
  lead: FunnelLead | null;
  open: boolean;
  onClose: () => void;
};

export function LeadDrawer({ lead, open, onClose }: Props) {
  if (!open || !lead) return null;

  const wa = `https://wa.me/55${lead.phone.replace(/\D/g, "")}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]"
        aria-label="Fechar painel"
        onClick={onClose}
      />
      <aside className="relative flex h-full w-full max-w-md flex-col border-l border-white/60 bg-page shadow-2xl animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between border-b border-charcoal/8 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40">Lead · {STAGE_LABEL[lead.stage]}</p>
            <p className="text-lg font-semibold text-charcoal">{lead.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-charcoal/45 hover:bg-white/80 hover:text-charcoal"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <section className="rounded-2xl border border-charcoal/8 bg-white/80 p-4">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-charcoal/45">
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              Conversa WhatsApp (demo ao vivo)
            </h3>
            <div className="mt-3 max-h-56 space-y-2 overflow-y-auto rounded-xl bg-charcoal/[0.03] p-3">
              {lead.chat.length === 0 ? (
                <p className="text-center text-xs text-charcoal/40">Sem mensagens ainda.</p>
              ) : (
                lead.chat.map((m, i) => (
                  <div
                    key={i}
                    className={`flex flex-col gap-0.5 rounded-lg px-3 py-2 text-sm ${
                      m.from === "cliente"
                        ? "ml-4 bg-white text-charcoal shadow-sm"
                        : m.from === "ia"
                          ? "mr-4 bg-violet-100/90 text-charcoal"
                          : "mr-4 bg-gold/25 text-charcoal"
                    }`}
                  >
                    <span className="text-[10px] font-semibold uppercase text-charcoal/45">
                      {m.from === "cliente" ? "Cliente" : m.from === "ia" ? "IA" : "Loja"} · {m.time}
                    </span>
                    <span>{m.text}</span>
                  </div>
                ))
              )}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                readOnly
                placeholder="Digite uma mensagem… (demo)"
                className="min-w-0 flex-1 rounded-xl border border-charcoal/10 bg-white px-3 py-2 text-xs text-charcoal/50"
              />
              <button
                type="button"
                className="rounded-xl bg-[#25D366] p-2 text-white"
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </section>

          <section className="mt-5 rounded-2xl border border-charcoal/8 bg-white/80 p-4">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-charcoal/45">
              <Building2 className="h-4 w-4" />
              Dados do cliente
            </h3>
            <dl className="mt-3 grid grid-cols-1 gap-3 text-sm">
              <div>
                <dt className="text-xs text-charcoal/45">Telefone</dt>
                <dd className="font-medium text-charcoal">{lead.phone}</dd>
              </div>
              <div>
                <dt className="text-xs text-charcoal/45">Cidade</dt>
                <dd className="font-medium text-charcoal">{lead.city}</dd>
              </div>
              <div>
                <dt className="text-xs text-charcoal/45">Renda (informada)</dt>
                <dd className="font-medium text-charcoal">{lead.income}</dd>
              </div>
              <div>
                <dt className="text-xs text-charcoal/45">Entrada</dt>
                <dd className="font-medium text-charcoal">{brl(lead.entrada)}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-5 rounded-2xl border border-charcoal/8 bg-white/80 p-4">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-charcoal/45">
              <Car className="h-4 w-4" />
              Interesses
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-charcoal">
              <li>
                <span className="text-charcoal/45">Carro desejado: </span>
                {lead.vehicleModel}
              </li>
              <li>
                <span className="text-charcoal/45">Valor anúncio: </span>
                {brl(lead.vehiclePrice)}
              </li>
              <li>
                <span className="text-charcoal/45">Parcela ideal: </span>
                {lead.idealInstallment}
              </li>
              <li>
                <span className="text-charcoal/45">Financiamento: </span>
                {lead.financiamento}
              </li>
              <li>
                <span className="text-charcoal/45">Troca: </span>
                {lead.troca}
              </li>
            </ul>
          </section>

          <section className="mt-5 rounded-2xl border border-charcoal/8 bg-white/80 p-4">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-charcoal/45">
              <History className="h-4 w-4" />
              Histórico completo
            </h3>
            <ul className="mt-3 space-y-2">
              {lead.history.map((h, i) => (
                <li key={i} className="rounded-lg bg-charcoal/[0.04] px-3 py-2 text-sm">
                  <span className="text-xs font-mono text-charcoal/40">{h.at}</span>
                  <span className="ml-2 text-xs font-semibold text-gold">{h.type}</span>
                  <p className="mt-0.5 text-charcoal/80">{h.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-5 rounded-2xl border border-violet-200/60 bg-violet-50/50 p-4">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-violet-800">
              <Sparkles className="h-4 w-4" />
              IA Insights
            </h3>
            <ul className="mt-3 space-y-2">
              {lead.iaInsights.map((line, i) => (
                <li key={i} className="flex gap-2 text-sm text-charcoal/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
            {lead.iaSuggestion && (
              <p className="mt-3 rounded-xl bg-white/80 p-3 text-xs leading-relaxed text-charcoal/70">
                <strong className="text-violet-800">Sugestão:</strong> {lead.iaSuggestion}
              </p>
            )}
          </section>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="rounded-xl bg-charcoal py-3 text-xs font-bold text-white hover:bg-charcoal/90"
            >
              Gerar proposta
            </button>
            <button type="button" className="rounded-xl bg-gold py-3 text-xs font-bold text-charcoal hover:bg-gold/90">
              Agendar test drive
            </button>
            <button type="button" className="rounded-xl border border-charcoal/15 bg-white py-3 text-xs font-bold text-charcoal">
              Iniciar financiamento
            </button>
            <button
              type="button"
              className="rounded-xl border border-violet-300 bg-violet-100 py-3 text-xs font-bold text-violet-900"
            >
              <Bot className="mr-1 inline h-3.5 w-3.5" />
              Chamar IA
            </button>
            <button
              type="button"
              className="col-span-2 rounded-xl border border-charcoal/10 bg-white py-3 text-xs font-bold text-charcoal"
            >
              Enviar catálogo
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${lead.phone.replace(/\D/g, "")}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-charcoal/10 py-3 text-sm font-semibold text-charcoal"
            >
              <Phone className="h-4 w-4" />
              Ligar
            </a>
            {lead.clientId && (
              <Link
                href={`/clientes/${lead.clientId}`}
                className="w-full rounded-xl border border-charcoal/15 py-3 text-center text-sm font-semibold text-charcoal hover:bg-white"
              >
                Abrir cadastro em Clientes
              </Link>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
