export const FUNIL_STORAGE_KEY = "autolead_demo_funil_leads";

export type FunnelStage =
  | "novo_lead"
  | "primeiro_contato"
  | "qualificado"
  | "simulacao"
  | "agendamento"
  | "proposta"
  | "negociacao"
  | "fechado"
  | "perdido";

export type LeadTemperature = "quente" | "morno" | "frio";

export type LeadIndicator = "responde_rapido" | "quer_financiar" | "possui_troca" | "visita_hoje";

export type FunnelLead = {
  id: string;
  name: string;
  initials: string;
  temperature: LeadTemperature;
  stage: FunnelStage;
  vehicleModel: string;
  vehiclePrice: number;
  origin: string;
  city: string;
  seller: string;
  lastInteraction: string;
  indicators: LeadIndicator[];
  nextFollowUp: { dateLabel: string; time: string; overdueDays?: number } | null;
  timeline: { at: string; text: string }[];
  iaSuggestion: string | null;
  iaHot?: boolean;
  phone: string;
  income: string;
  entrada: number;
  idealInstallment: string;
  financiamento: string;
  troca: string;
  history: { at: string; type: string; detail: string }[];
  iaInsights: string[];
  chat: { from: "cliente" | "loja" | "ia"; text: string; time: string }[];
  /** opcional: link para ficha em /clientes */
  clientId?: string;
};

export const FUNNEL_STAGES: FunnelStage[] = [
  "novo_lead",
  "primeiro_contato",
  "qualificado",
  "simulacao",
  "agendamento",
  "proposta",
  "negociacao",
  "fechado",
  "perdido",
];

export const STAGE_LABEL: Record<FunnelStage, string> = {
  novo_lead: "Novo Lead",
  primeiro_contato: "Primeiro Contato",
  qualificado: "Qualificado",
  simulacao: "Simulação",
  agendamento: "Agendamento",
  proposta: "Proposta",
  negociacao: "Negociação",
  fechado: "Fechado",
  perdido: "Perdido",
};

export const SELLERS = ["Marina Alves", "Carlos Lima", "Ana Ribeiro", "Todos"] as const;

export const ORIGINS = ["WhatsApp", "Webmotors", "Site", "OLX", "Loja", "Indicação"] as const;

const baseLeads: FunnelLead[] = [
  {
    id: "f1",
    name: "João Silva",
    initials: "JS",
    temperature: "quente",
    stage: "proposta",
    vehicleModel: "Corolla XEI 2022",
    vehiclePrice: 128900,
    origin: "WhatsApp",
    city: "São Paulo, SP",
    seller: "Marina Alves",
    lastInteraction: "Hoje 10:15",
    indicators: ["responde_rapido", "quer_financiar", "visita_hoje"],
    nextFollowUp: { dateLabel: "Hoje", time: "16:30" },
    timeline: [
      { at: "10:32", text: "Lead entrou" },
      { at: "10:34", text: "IA respondeu" },
      { at: "11:02", text: "Simulação enviada" },
    ],
    iaSuggestion: "Cliente visualizou a proposta e não respondeu há 2 dias. Envie um follow-up personalizado.",
    iaHot: true,
    phone: "(11) 98765-1111",
    income: "R$ 8.200 / mês",
    entrada: 25000,
    idealInstallment: "Até R$ 2.400",
    financiamento: "48x com seguro",
    troca: "Sem troca",
    history: [
      { at: "10/05 10:32", type: "Lead", detail: "Entrada pelo WhatsApp" },
      { at: "10/05 11:00", type: "Ligação", detail: "Apresentação do Corolla" },
      { at: "11/05 09:00", type: "Proposta", detail: "PDF enviado por e-mail" },
    ],
    iaInsights: [
      "Alta chance de fechamento",
      "Cliente focado em parcela baixa",
      "Melhor horário para contato: noite (18h–21h)",
    ],
    chat: [
      { from: "cliente", text: "Oi, vi o Corolla no site. Ainda tem?", time: "10:32" },
      { from: "ia", text: "Olá! Sim, temos unidades. Quer simular financiamento?", time: "10:34" },
      { from: "loja", text: "Marina aqui — te mando a ficha completa em 2 min.", time: "10:38" },
      { from: "cliente", text: "Manda a proposta com 48x por favor.", time: "11:02" },
    ],
    clientId: "c1",
  },
  {
    id: "f2",
    name: "Carlos Lima",
    initials: "CL",
    temperature: "morno",
    stage: "qualificado",
    vehicleModel: "HR-V EXL 2023",
    vehiclePrice: 184900,
    origin: "Webmotors",
    city: "Guarulhos, SP",
    seller: "Carlos Lima",
    lastInteraction: "Ontem",
    indicators: ["quer_financiar", "possui_troca"],
    nextFollowUp: { dateLabel: "Hoje", time: "14:00" },
    timeline: [
      { at: "09:10", text: "Lead qualificado" },
      { at: "09:45", text: "Troca avaliada" },
    ],
    iaSuggestion: "Pediu desconto na troca — sugerir visita à loja para fechar avaliação.",
    phone: "(11) 97654-2222",
    income: "R$ 11.000 / mês",
    entrada: 40000,
    idealInstallment: "R$ 3.200",
    financiamento: "60x em análise",
    troca: "Civic 2019 — avaliação R$ 72 mil",
    history: [
      { at: "08/05 09:10", type: "Mensagem", detail: "Pediu vídeo do motor" },
      { at: "08/05 14:00", type: "Simulação", detail: "Pré-análise enviada" },
    ],
    iaInsights: ["Responde em média em 25 min", "Sensível a taxa de juros"],
    chat: [
      { from: "cliente", text: "Quanto vocês dão no meu Civic?", time: "09:12" },
      { from: "loja", text: "Precisamos ver o carro. Posso agendar amanhã?", time: "09:45" },
    ],
  },
  {
    id: "f3",
    name: "Pedro Santos",
    initials: "PS",
    temperature: "frio",
    stage: "novo_lead",
    vehicleModel: "Onix Plus 2024",
    vehiclePrice: 98900,
    origin: "Site",
    city: "Campinas, SP",
    seller: "Ana Ribeiro",
    lastInteraction: "Há 3 dias",
    indicators: [],
    nextFollowUp: { dateLabel: "Atrasado", time: "", overdueDays: 2 },
    timeline: [
      { at: "08/05 14:00", text: "Formulário preenchido" },
      { at: "08/05 14:02", text: "IA boas-vindas" },
    ],
    iaSuggestion: "Sem resposta há 3 dias — disparar follow-up automático com cupom revisão.",
    phone: "(19) 99123-3333",
    income: "—",
    entrada: 0,
    idealInstallment: "—",
    financiamento: "A definir",
    troca: "Não informou",
    history: [{ at: "08/05 14:00", type: "Lead", detail: "Landing campanha Onix" }],
    iaInsights: ["Baixo engajamento nas últimas mensagens"],
    chat: [{ from: "ia", text: "Obrigado pelo interesse! Um consultor vai chamar você.", time: "14:02" }],
  },
  {
    id: "f4",
    name: "Fernanda Costa",
    initials: "FC",
    temperature: "quente",
    stage: "agendamento",
    vehicleModel: "Compass Longitude 2022",
    vehiclePrice: 168000,
    origin: "WhatsApp",
    city: "Osasco, SP",
    seller: "Marina Alves",
    lastInteraction: "Hoje 08:40",
    indicators: ["responde_rapido", "visita_hoje", "quer_financiar"],
    nextFollowUp: { dateLabel: "Hoje", time: "15:00" },
    timeline: [
      { at: "08:40", text: "Test drive agendado" },
      { at: "08:42", text: "Lembrete IA enviado" },
    ],
    iaSuggestion: "Lead quente: responde rápido e quer visitar hoje. Confirmar presença às 15h.",
    iaHot: true,
    phone: "(11) 96543-4444",
    income: "R$ 14.500 / mês",
    entrada: 50000,
    idealInstallment: "Máx. R$ 3.000",
    financiamento: "Banco parceiro A",
    troca: "Sem troca",
    history: [{ at: "Hoje 08:40", type: "Agenda", detail: "Test drive Compass" }],
    iaInsights: ["Alta urgência", "Cliente pediu parcelas em 3 mensagens seguidas"],
    chat: [
      { from: "cliente", text: "Consigo ir hoje à tarde?", time: "08:40" },
      { from: "loja", text: "15h está livre. Te mando o endereço.", time: "08:41" },
    ],
  },
  {
    id: "f5",
    name: "Ricardo Melo",
    initials: "RM",
    temperature: "quente",
    stage: "negociacao",
    vehicleModel: "Ranger XLT Diesel",
    vehiclePrice: 249000,
    origin: "Loja",
    city: "Santo André, SP",
    seller: "Carlos Lima",
    lastInteraction: "Hoje 09:20",
    indicators: ["possui_troca", "quer_financiar", "responde_rapido"],
    nextFollowUp: { dateLabel: "Hoje", time: "18:00" },
    timeline: [
      { at: "Ontem 16:00", text: "Proposta revisada" },
      { at: "Hoje 09:20", text: "Contraproposta cliente" },
    ],
    iaSuggestion: "Negociação ativa — cliente pediu desconto. Sugestão: kit acessórios em vez de desconto à vista.",
    iaHot: true,
    phone: "(11) 94321-5555",
    income: "CNPJ + renda comprovada",
    entrada: 90000,
    idealInstallment: "Fluxo de caixa empresa",
    financiamento: "PJ 60x",
    troca: "Toro 2020 na troca",
    history: [
      { at: "Ontem", type: "Proposta", detail: "R$ 242 mil à vista" },
      { at: "Hoje", type: "Mensagem", detail: "Pediu R$ 235 mil" },
    ],
    iaInsights: ["Cliente focado em desconto", "Melhor abordagem: valor agregado"],
    chat: [{ from: "cliente", text: "Consegue 235?", time: "09:20" }],
    clientId: "c6",
  },
  {
    id: "f6",
    name: "Luciana Prado",
    initials: "LP",
    temperature: "morno",
    stage: "simulacao",
    vehicleModel: "T-Cross Highline",
    vehiclePrice: 135900,
    origin: "OLX",
    city: "São Paulo, SP",
    seller: "Ana Ribeiro",
    lastInteraction: "Hoje 11:40",
    indicators: ["quer_financiar"],
    nextFollowUp: { dateLabel: "Amanhã", time: "10:00" },
    timeline: [{ at: "11:40", text: "Simulação gerada" }],
    iaSuggestion: null,
    phone: "(11) 91234-6666",
    income: "R$ 7.800 / mês",
    entrada: 18000,
    idealInstallment: "R$ 2.600",
    financiamento: "48x simulado",
    troca: "Gol 2019",
    history: [{ at: "Hoje 11:40", type: "Simulação", detail: "PDF enviado" }],
    iaInsights: ["Perguntou parcelas 2x — elevar prioridade"],
    chat: [{ from: "cliente", text: "Qual a parcela com 18 mil de entrada?", time: "11:40" }],
    clientId: "c4",
  },
  {
    id: "f7",
    name: "Marcelo Duarte",
    initials: "MD",
    temperature: "frio",
    stage: "primeiro_contato",
    vehicleModel: "Pulse Audace",
    vehiclePrice: 112000,
    origin: "Indicação",
    city: "São Paulo, SP",
    seller: "Marina Alves",
    lastInteraction: "Há 5 dias",
    indicators: [],
    nextFollowUp: { dateLabel: "Atrasado", time: "", overdueDays: 4 },
    timeline: [{ at: "06/05", text: "Primeira ligação" }],
    iaSuggestion: "Lead frio — campanha de reativação com vídeo do veículo.",
    phone: "(11) 98877-7777",
    income: "—",
    entrada: 0,
    idealInstallment: "—",
    financiamento: "—",
    troca: "—",
    history: [{ at: "06/05", type: "Ligação", detail: "Caixa postal" }],
    iaInsights: ["Pouca resposta em canais"],
    chat: [],
    clientId: "c7",
  },
  {
    id: "f8",
    name: "Amanda Freitas",
    initials: "AF",
    temperature: "quente",
    stage: "fechado",
    vehicleModel: "Onix Plus Premier",
    vehiclePrice: 98900,
    origin: "Site",
    city: "Rio de Janeiro, RJ",
    seller: "Carlos Lima",
    lastInteraction: "10/05",
    indicators: ["responde_rapido"],
    nextFollowUp: null,
    timeline: [
      { at: "09/05", text: "Contrato" },
      { at: "10/05", text: "Entrega" },
    ],
    iaSuggestion: null,
    phone: "(21) 99888-8888",
    income: "R$ 10.200 / mês",
    entrada: 32000,
    idealInstallment: "—",
    financiamento: "36x aprovado",
    troca: "Sem troca",
    history: [{ at: "10/05", type: "Entrega", detail: "Cliente satisfeito" }],
    iaInsights: ["Oportunidade de indicação — NPS alto esperado"],
    chat: [{ from: "loja", text: "Obrigado pela confiança!", time: "10/05" }],
    clientId: "c3",
  },
  {
    id: "f9",
    name: "Bruno Azevedo",
    initials: "BA",
    temperature: "morno",
    stage: "perdido",
    vehicleModel: "Civic Touring",
    vehiclePrice: 189900,
    origin: "Webmotors",
    city: "São Paulo, SP",
    seller: "Ana Ribeiro",
    lastInteraction: "01/05",
    indicators: [],
    nextFollowUp: null,
    timeline: [{ at: "01/05", text: "Comprou em outra loja" }],
    iaSuggestion: "Registrar motivo e incluir em remarketing 90 dias.",
    phone: "(11) 97766-9999",
    income: "—",
    entrada: 0,
    idealInstallment: "—",
    financiamento: "—",
    troca: "—",
    history: [{ at: "01/05", type: "Perda", detail: "Preço" }],
    iaInsights: ["Concorrente mais agressivo em preço"],
    chat: [],
  },
  {
    id: "f10",
    name: "Eduardo Gomes",
    initials: "EG",
    temperature: "quente",
    stage: "simulacao",
    vehicleModel: "Picape diesel (Ranger/S10)",
    vehiclePrice: 265000,
    origin: "Webmotors",
    city: "Joinville, SC",
    seller: "Marina Alves",
    lastInteraction: "Hoje 11:40",
    indicators: ["responde_rapido", "quer_financiar"],
    nextFollowUp: { dateLabel: "Hoje", time: "17:00" },
    timeline: [
      { at: "11:40", text: "Lead entrou" },
      { at: "11:41", text: "IA respondeu" },
    ],
    iaSuggestion: "Cliente perguntou parcelas e respondeu em < 2 min — prioridade máxima.",
    iaHot: true,
    phone: "(47) 98877-0000",
    income: "CNPJ",
    entrada: 90000,
    idealInstallment: "Fluxo mensal",
    financiamento: "36x + entrada",
    troca: "Sem troca",
    history: [{ at: "Hoje", type: "Lead", detail: "Picape frota" }],
    iaInsights: ["Lead quente: responde rápido", "Foco em parcelas e prazo"],
    chat: [{ from: "cliente", text: "Manda simulação CNPJ por favor", time: "11:40" }],
    clientId: "c8",
  },
];

export function defaultFunilLeads(): FunnelLead[] {
  return JSON.parse(JSON.stringify(baseLeads)) as FunnelLead[];
}

export function readFunilLeads(): FunnelLead[] {
  if (typeof window === "undefined") return defaultFunilLeads();
  try {
    const raw = sessionStorage.getItem(FUNIL_STORAGE_KEY);
    if (!raw) return defaultFunilLeads();
    const parsed = JSON.parse(raw) as FunnelLead[];
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultFunilLeads();
    return parsed;
  } catch {
    return defaultFunilLeads();
  }
}

export function writeFunilLeads(leads: FunnelLead[]) {
  sessionStorage.setItem(FUNIL_STORAGE_KEY, JSON.stringify(leads));
}
