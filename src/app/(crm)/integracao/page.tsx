"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Link2,
  Plug,
  RefreshCw,
  Shield,
  Store,
} from "lucide-react";
import {
  defaultMarketplaceIntegrationsConfig,
  marketplaceCatalog,
  maskedTokenDemo,
  readMarketplaceIntegrationsConfig,
  writeMarketplaceIntegrationsConfig,
  type MarketplaceConnection,
  type MarketplaceId,
  type MarketplaceIntegrationsConfig,
} from "@/lib/marketplace-integrations";

export default function IntegracaoPage() {
  const [config, setConfig] = useState<MarketplaceIntegrationsConfig>(defaultMarketplaceIntegrationsConfig);
  const [loaded, setLoaded] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedId, setSelectedId] = useState<MarketplaceId>("webmotors");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hidratar a partir do sessionStorage
    setConfig(readMarketplaceIntegrationsConfig());
    setLoaded(true);
  }, []);

  function patchConnection(id: MarketplaceId, patch: Partial<MarketplaceConnection>) {
    setConfig((c) => ({
      ...c,
      connections: {
        ...c.connections,
        [id]: { ...c.connections[id], ...patch },
      },
    }));
  }

  function handleSave() {
    writeMarketplaceIntegrationsConfig(config);
    setSavedFlash(true);
  }

  useEffect(() => {
    if (!savedFlash) return;
    const id = window.setTimeout(() => setSavedFlash(false), 2200);
    return () => clearTimeout(id);
  }, [savedFlash]);

  function copyWebhook() {
    void navigator.clipboard.writeText(config.inboundWebhookUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  if (!loaded) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-charcoal/15 border-t-gold" />
      </div>
    );
  }

  const selectedMeta = marketplaceCatalog.find((m) => m.id === selectedId)!;
  const conn = config.connections[selectedId];
  const activeCount = marketplaceCatalog.filter((m) => config.connections[m.id].enabled).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-charcoal">Integração</h1>
          <p className="mt-1 max-w-2xl text-charcoal/50">
            Conecte o CRM aos principais <strong className="font-medium text-charcoal/70">classificados e marketplaces</strong>{" "}
            do Brasil. Tudo abaixo é <strong className="font-medium text-charcoal/70">simulação local</strong> — nenhuma
            chamada real às APIs das marcas.
          </p>
          <p className="mt-2 text-sm text-charcoal/40">
            Plataformas: Webmotors, OLX Autos, Mobiauto, iCarros, Mercado Livre Veículos e UsadosBR.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-charcoal/55 ring-1 ring-charcoal/10">
            {activeCount} ativa(s) — demo
          </span>
          {savedFlash && (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-800 ring-1 ring-emerald-500/25">
              <Check className="h-4 w-4" strokeWidth={2.5} />
              Salvo localmente
            </span>
          )}
          <button
            type="button"
            onClick={() => setConfig(readMarketplaceIntegrationsConfig())}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/90 px-5 py-2.5 text-sm font-medium text-charcoal/70 shadow-sm hover:bg-white"
          >
            <RefreshCw className="h-4 w-4" />
            Recarregar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-charcoal/90"
          >
            <Plug className="h-4 w-4" />
            Salvar
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        <section className="space-y-3 lg:col-span-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-charcoal/40">
            <Store className="h-4 w-4" />
            Portais e marketplaces
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {marketplaceCatalog.map((m) => {
              const c = config.connections[m.id];
              const selected = selectedId === m.id;
              return (
                <div
                  key={m.id}
                  className={`card-glass w-full transition-all hover:shadow-card-hover ${
                    selected ? "ring-2 ring-gold ring-offset-2 ring-offset-[#fffdf5]" : ""
                  }`}
                >
                  <div className="flex gap-3 p-4">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedId(m.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedId(m.id);
                        }
                      }}
                      className="flex min-w-0 flex-1 cursor-pointer gap-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                    >
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-sm"
                        style={{ backgroundColor: m.accent }}
                      >
                        {m.name
                          .split(/\s+/)[0]
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-charcoal">{m.name}</p>
                        <a
                          href={`https://${m.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-charcoal/45 hover:text-charcoal"
                        >
                          {m.domain}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-charcoal/45">{m.blurb}</p>
                        <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-charcoal/35">
                          {c.enabled ? "Integração ativa (demo)" : "Desligada"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={c.enabled}
                      aria-label={c.enabled ? `Desativar ${m.name}` : `Ativar ${m.name}`}
                      onClick={() => patchConnection(m.id, { enabled: !c.enabled })}
                      className={`relative mt-1 inline-flex h-7 w-12 shrink-0 self-start rounded-full transition-colors ${
                        c.enabled ? "bg-emerald-500/90" : "bg-charcoal/15"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                          c.enabled ? "left-5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-5 lg:col-span-7">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-charcoal/40">
            <Link2 className="h-4 w-4" />
            Configurar: {selectedMeta.name}
          </h2>

          <div className="card-glass space-y-5 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={conn.enabled}
                  onChange={(e) => patchConnection(selectedId, { enabled: e.target.checked })}
                  className="h-4 w-4 rounded border-charcoal/25 text-charcoal focus:ring-gold/40"
                />
                <span className="text-sm font-medium text-charcoal">Usar esta integração (demo)</span>
              </label>
              <div className="flex rounded-2xl border border-charcoal/10 bg-charcoal/[0.04] p-1">
                {(["sandbox", "production"] as const).map((env) => (
                  <button
                    key={env}
                    type="button"
                    onClick={() => setConfig((c) => ({ ...c, environment: env }))}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                      config.environment === env
                        ? "bg-white text-charcoal shadow-sm"
                        : "text-charcoal/45 hover:text-charcoal"
                    }`}
                  >
                    {env === "sandbox" ? "Sandbox" : "Produção"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="dealerRef" className="text-xs font-semibold uppercase tracking-wide text-charcoal/45">
                  ID / código da loja no {selectedMeta.name}
                </label>
                <input
                  id="dealerRef"
                  disabled={!conn.enabled}
                  value={conn.dealerRef}
                  onChange={(e) => patchConnection(selectedId, { dealerRef: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-charcoal/10 bg-white/90 px-4 py-3 text-sm text-charcoal outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/25 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Ex.: código fornecido pelo portal"
                />
              </div>
              <div>
                <label htmlFor="acct" className="text-xs font-semibold uppercase tracking-wide text-charcoal/45">
                  E-mail da conta no portal
                </label>
                <input
                  id="acct"
                  type="email"
                  disabled={!conn.enabled}
                  value={conn.accountEmail}
                  onChange={(e) => patchConnection(selectedId, { accountEmail: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-charcoal/10 bg-white/90 px-4 py-3 text-sm text-charcoal outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/25 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="contato@loja.com.br"
                />
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/45">O que sincroniza</span>
              <div className="mt-3 space-y-2 rounded-2xl border border-charcoal/8 bg-charcoal/[0.02] p-3">
                {(
                  [
                    {
                      key: "publishFromCrm" as const,
                      label: "Publicar e atualizar anúncios a partir do CRM",
                      sub: "Preço, fotos, opcionais e texto do veículo.",
                    },
                    {
                      key: "importLeads" as const,
                      label: "Importar leads e mensagens",
                      sub: "Chat, perguntas e formulários viram oportunidades no funil.",
                    },
                    {
                      key: "syncSoldStatus" as const,
                      label: "Baixar / pausar ao vender no CRM",
                      sub: "Evita anúncio ativo para carro já comercializado.",
                    },
                  ] as const
                ).map((row) => (
                  <label
                    key={row.key}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl p-3 hover:bg-white/60 ${
                      !conn.enabled ? "pointer-events-none opacity-45" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={conn[row.key]}
                      onChange={(e) => patchConnection(selectedId, { [row.key]: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-charcoal/20 text-charcoal focus:ring-gold/40"
                    />
                    <span>
                      <span className="block text-sm font-medium text-charcoal">{row.label}</span>
                      <span className="mt-0.5 block text-xs text-charcoal/45">{row.sub}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wide text-charcoal/45">
                Observações internas
              </label>
              <textarea
                id="notes"
                rows={2}
                disabled={!conn.enabled}
                value={conn.notes}
                onChange={(e) => patchConnection(selectedId, { notes: e.target.value })}
                className="mt-2 w-full resize-none rounded-2xl border border-charcoal/10 bg-white/90 px-4 py-3 text-sm text-charcoal outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/25 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Ex.: contrato assinado em 2025, filial Campinas…"
              />
            </div>

            <div className="rounded-2xl border border-dashed border-charcoal/12 bg-charcoal/[0.03] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                <Shield className="h-4 w-4 text-charcoal/45" />
                Credencial (demo — somente visual)
              </div>
              <p className="mt-1 font-mono text-sm text-charcoal/60">{maskedTokenDemo(selectedId)}</p>
              <p className="mt-2 text-xs text-charcoal/40">
                Na implementação real, tokens OAuth, chaves de parceiro ou XML/FTP variam por portal.
              </p>
            </div>
          </div>

          <div className="card-glass space-y-4 p-6 md:p-8">
            <h3 className="text-sm font-semibold text-charcoal">Webhook de entrada (todos os portais)</h3>
            <p className="text-xs text-charcoal/45">
              URL única demo para receber eventos simulados (novo lead, pergunta, alteração de anúncio).
            </p>
            <div className="flex gap-2">
              <input
                value={config.inboundWebhookUrl}
                onChange={(e) => setConfig((c) => ({ ...c, inboundWebhookUrl: e.target.value }))}
                className="min-w-0 flex-1 rounded-2xl border border-charcoal/10 bg-white/90 px-4 py-3 text-sm text-charcoal outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/25"
              />
              <button
                type="button"
                onClick={copyWebhook}
                className="shrink-0 rounded-2xl border border-charcoal/10 bg-white px-4 py-3 text-charcoal/60 hover:bg-charcoal/5"
                aria-label="Copiar webhook"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            {copied && <p className="text-xs font-medium text-emerald-700">Copiado.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
