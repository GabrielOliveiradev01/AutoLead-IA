"use client";

import { useState } from "react";
import { MessageCircle, Phone, QrCode, ShieldCheck, Wifi } from "lucide-react";
import { whatsappChats } from "@/lib/demo-data";

export default function WhatsAppPage() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal">WhatsApp</h1>
        <p className="mt-1 text-charcoal/50">
          Conexão demo — simule o vínculo da API ou do app Business com o CRM.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card-glass p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#128C7E]">
              <MessageCircle className="h-7 w-7" strokeWidth={1.75} />
            </div>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
                connected
                  ? "bg-emerald-500/15 text-emerald-800 ring-1 ring-emerald-500/25"
                  : "bg-charcoal/5 text-charcoal/55 ring-1 ring-charcoal/10"
              }`}
            >
              <Wifi className="h-3.5 w-3.5" />
              {connected ? "Conectado (demo)" : "Desconectado"}
            </span>
          </div>
          <h2 className="mt-6 text-xl font-semibold text-charcoal">Canal oficial da loja</h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/55">
            Quando integrar de verdade, você poderá usar a Cloud API do WhatsApp ou um provedor
            certificado. Aqui você só alterna o estado para visualizar o layout.
          </p>
          <button
            type="button"
            onClick={() => setConnected((c) => !c)}
            className="mt-8 w-full rounded-2xl bg-charcoal py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-charcoal/90"
          >
            {connected ? "Desconectar (demo)" : "Conectar agora (demo)"}
          </button>
          <div className="mt-6 flex items-center gap-2 text-xs text-charcoal/40">
            <ShieldCheck className="h-4 w-4" />
            Mensagens e opt-in seguirão as políticas da Meta na implementação real.
          </div>
        </div>

        <div className="card-glass flex flex-col items-center justify-center p-8 text-center">
          <div className="flex h-48 w-48 items-center justify-center rounded-3xl border-2 border-dashed border-charcoal/15 bg-white/60">
            <QrCode className="h-24 w-24 text-charcoal/20" strokeWidth={1} />
          </div>
          <p className="mt-6 text-sm font-medium text-charcoal/45">Área do QR (placeholder)</p>
          <p className="mt-1 max-w-xs text-xs text-charcoal/40">
            No fluxo real, o par pareamento ou o token da API apareceria aqui.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-charcoal/5 px-4 py-2 text-xs text-charcoal/55">
            <Phone className="h-3.5 w-3.5" />
            Número demo: +55 (11) 99999-0000
          </div>
        </div>
      </div>

      <div className="card-glass p-6">
        <h3 className="text-lg font-semibold text-charcoal">Conversas recentes (demo)</h3>
        <ul className="mt-4 divide-y divide-charcoal/5">
          {whatsappChats.map((c) => (
            <li key={c.name} className="flex items-center justify-between gap-4 py-4 first:pt-0">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-sm font-bold text-white">
                  {c.name[0]}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium text-charcoal">{c.name}</p>
                  <p className="truncate text-sm text-charcoal/45">{c.last}</p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-charcoal/35">{c.time}</p>
                {c.unread > 0 && (
                  <span className="mt-1 inline-flex min-w-[22px] justify-center rounded-full bg-gold px-2 py-0.5 text-[11px] font-bold text-charcoal">
                    {c.unread}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
