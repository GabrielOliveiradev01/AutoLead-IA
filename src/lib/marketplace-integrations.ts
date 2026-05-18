export const MARKETPLACE_CONFIG_KEY = "autolead_demo_marketplace_integrations";

export type MarketplaceId =
  | "webmotors"
  | "olx_autos"
  | "mobiauto"
  | "icarros"
  | "mercadolivre_veiculos"
  | "usadosbr";

export type MarketplaceConnection = {
  enabled: boolean;
  /** Código da loja / anunciante na plataforma */
  dealerRef: string;
  /** Contato vinculado à conta do portal (demo) */
  accountEmail: string;
  /** Enviar veículos do CRM como anúncios */
  publishFromCrm: boolean;
  /** Trazer perguntas e leads para o funil */
  importLeads: boolean;
  /** Marcar como vendido / pausar quando fechar no CRM */
  syncSoldStatus: boolean;
  notes: string;
};

export type MarketplaceIntegrationsConfig = {
  environment: "sandbox" | "production";
  /** URL para a plataforma postar eventos (demo) */
  inboundWebhookUrl: string;
  connections: Record<MarketplaceId, MarketplaceConnection>;
};

export const marketplaceCatalog: {
  id: MarketplaceId;
  name: string;
  domain: string;
  blurb: string;
  accent: string;
}[] = [
  {
    id: "webmotors",
    name: "Webmotors",
    domain: "webmotors.com.br",
    blurb: "Classificados, estoque e leads integrados ao fluxo comercial.",
    accent: "#c4122e",
  },
  {
    id: "olx_autos",
    name: "OLX Autos",
    domain: "olx.com.br",
    blurb: "Anúncios OLX no ecossistema de veículos; mensagens e visitas.",
    accent: "#6e0ad6",
  },
  {
    id: "mobiauto",
    name: "Mobiauto",
    domain: "mobiauto.com.br",
    blurb: "Gestão de anúncios e performance em um painel voltado a lojas.",
    accent: "#0066cc",
  },
  {
    id: "icarros",
    name: "iCarros",
    domain: "icarros.com.br",
    blurb: "Exposição nacional e captação de interessados.",
    accent: "#003366",
  },
  {
    id: "mercadolivre_veiculos",
    name: "Mercado Livre Veículos",
    domain: "mercadolivre.com.br",
    blurb: "Publicações no ML, perguntas e reservas alinhadas ao estoque.",
    accent: "#3483fa",
  },
  {
    id: "usadosbr",
    name: "UsadosBR",
    domain: "usadosbr.com.br",
    blurb: "Portal de usados; sincronização de fichas e contatos.",
    accent: "#0d9488",
  },
];

function emptyConnection(overrides?: Partial<MarketplaceConnection>): MarketplaceConnection {
  return {
    enabled: false,
    dealerRef: "",
    accountEmail: "",
    publishFromCrm: true,
    importLeads: true,
    syncSoldStatus: true,
    notes: "",
    ...overrides,
  };
}

export const defaultMarketplaceIntegrationsConfig: MarketplaceIntegrationsConfig = {
  environment: "sandbox",
  inboundWebhookUrl: "https://api.demo.autolead.app/v1/webhooks/classificados",
  connections: {
    webmotors: emptyConnection({
      enabled: true,
      dealerRef: "WM-DEMO-88291",
      accountEmail: "integracao@demo-concessionaria.com.br",
    }),
    olx_autos: emptyConnection({ dealerRef: "" }),
    mobiauto: emptyConnection({ dealerRef: "" }),
    icarros: emptyConnection({ dealerRef: "" }),
    mercadolivre_veiculos: emptyConnection({ dealerRef: "" }),
    usadosbr: emptyConnection({ dealerRef: "" }),
  },
};

function mergeConnections(
  partial?: Partial<Record<MarketplaceId, Partial<MarketplaceConnection>>>,
): Record<MarketplaceId, MarketplaceConnection> {
  const base = defaultMarketplaceIntegrationsConfig.connections;
  if (!partial) return { ...base };
  const out = { ...base };
  (Object.keys(base) as MarketplaceId[]).forEach((id) => {
    out[id] = { ...base[id], ...partial[id] };
  });
  return out;
}

export function readMarketplaceIntegrationsConfig(): MarketplaceIntegrationsConfig {
  if (typeof window === "undefined") return defaultMarketplaceIntegrationsConfig;
  try {
    const raw = sessionStorage.getItem(MARKETPLACE_CONFIG_KEY);
    if (!raw) return defaultMarketplaceIntegrationsConfig;
    const parsed = JSON.parse(raw) as Partial<MarketplaceIntegrationsConfig>;
    return {
      ...defaultMarketplaceIntegrationsConfig,
      ...parsed,
      connections: mergeConnections(parsed.connections),
    };
  } catch {
    return defaultMarketplaceIntegrationsConfig;
  }
}

export function writeMarketplaceIntegrationsConfig(config: MarketplaceIntegrationsConfig) {
  sessionStorage.setItem(MARKETPLACE_CONFIG_KEY, JSON.stringify(config));
}

export function maskedTokenDemo(id: MarketplaceId): string {
  const tail = id.slice(0, 4).toUpperCase();
  return `••••••••_${tail}_demo`;
}
