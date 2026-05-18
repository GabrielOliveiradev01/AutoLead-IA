export const kpiBars = [
  { label: "Conversão de leads", value: 72 },
  { label: "Meta mensal", value: 64 },
  { label: "Giro de estoque", value: 81 },
  { label: "Satisfação (NPS)", value: 89 },
] as const;

export const kpiNumbers = [
  { label: "Leads", value: "78" },
  { label: "Vendas", value: "56" },
  { label: "Veículos", value: "203" },
] as const;

export const featuredSeller = {
  name: "Marina Alves",
  role: "Consultora de vendas",
  badge: "Top do mês",
  initials: "MA",
};

export const progressWeek = [
  { day: "Seg", h: 4.2, active: false },
  { day: "Ter", h: 5.1, active: false },
  { day: "Qua", h: 6.1, active: true },
  { day: "Qui", h: 3.8, active: false },
  { day: "Sex", h: 5.4, active: false },
];

export const pipeline = {
  percent: 18,
  segments: [22, 18, 35, 25] as const,
  tasks: [
    "Follow-up WhatsApp — Civic 2022",
    "Proposta financiamento — Hilux",
    "Test drive agendado — Corolla",
  ],
};

export const responseRing = {
  label: "Tempo médio de resposta",
  value: "12m",
  percent: 78,
};

export const sidebarSections = [
  {
    title: "Categorias de estoque",
    items: ["SUVs", "Sedãs", "Picapes", "Elétricos / Híbridos"],
  },
  {
    title: "Financeiro",
    items: ["Simulador", "Bancos parceiros", "Seguros"],
  },
  {
    title: "Base de clientes",
    items: ["Leads ativos", "Pós-venda", "Indicações"],
  },
  {
    title: "Relatórios",
    items: ["Vendas por vendedor", "Mix de produtos", "Funil"],
  },
] as const;

export type CalendarEvent = {
  id: string;
  title: string;
  dayIndex: number;
  start: string;
  end: string;
  people: number;
};

export const calendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Test drive — Compass",
    dayIndex: 0,
    start: "09:00",
    end: "10:00",
    people: 2,
  },
  {
    id: "2",
    title: "Entrega — Onix Plus",
    dayIndex: 1,
    start: "11:00",
    end: "12:00",
    people: 3,
  },
  {
    id: "3",
    title: "Negociação — HR-V",
    dayIndex: 2,
    start: "14:30",
    end: "15:30",
    people: 2,
  },
  {
    id: "4",
    title: "Revisão — cliente fidelidade",
    dayIndex: 3,
    start: "10:00",
    end: "11:30",
    people: 1,
  },
  {
    id: "5",
    title: "Visita showroom",
    dayIndex: 4,
    start: "16:00",
    end: "17:00",
    people: 4,
  },
];

export const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;

export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  km: number;
  fuel: string;
  status: "disponível" | "reservado" | "vendido";
  highlight?: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    brand: "Honda",
    model: "Civic Touring",
    year: 2024,
    price: 189900,
    km: 0,
    fuel: "Flex",
    status: "disponível",
    highlight: "Novo",
  },
  {
    id: "v2",
    brand: "Toyota",
    model: "Corolla XEi",
    year: 2023,
    price: 142500,
    km: 18500,
    fuel: "Híbrido",
    status: "disponível",
  },
  {
    id: "v3",
    brand: "Jeep",
    model: "Compass Longitude",
    year: 2022,
    price: 168000,
    km: 42000,
    fuel: "Diesel",
    status: "reservado",
  },
  {
    id: "v4",
    brand: "Chevrolet",
    model: "Onix Plus Premier",
    year: 2024,
    price: 98900,
    km: 1200,
    fuel: "Flex",
    status: "disponível",
  },
  {
    id: "v5",
    brand: "Volkswagen",
    model: "T-Cross Highline",
    year: 2023,
    price: 135900,
    km: 22000,
    fuel: "Flex",
    status: "disponível",
  },
  {
    id: "v6",
    brand: "Ford",
    model: "Ranger XLT",
    year: 2022,
    price: 249000,
    km: 55000,
    fuel: "Diesel",
    status: "vendido",
  },
];

export type ClientStatus = "lead" | "negociacao" | "cliente" | "inativo";

export type ClientSource = "WhatsApp" | "Loja" | "Webmotors" | "Site" | "Indicação" | "OLX";

export type ClientUrgency = "baixa" | "media" | "alta";

export type ClientRealInterest = "alto" | "medio" | "baixo";

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  source: ClientSource;
  status: ClientStatus;
  lastContact: string;
  /** Veículo desejado */
  vehicleInterest: string;
  /** Referência de valor do veículo (demo) */
  vehiclePriceRef: number;
  /** Valor de entrada informado / previsto */
  entryValue: number;
  /** Condições de financiamento desejadas ou pré-análise (texto demo) */
  financing: string;
  /** Score de crédito (demo — não é consulta real) */
  creditScore: number;
  urgency: ClientUrgency;
  /** Veículo na troca ou "Sem troca" */
  tradeIn: string;
  realInterest: ClientRealInterest;
  /** Observação sobre intenção de compra */
  realInterestNote: string;
};

export function getClientById(id: string): Client | undefined {
  return clients.find((c) => c.id === id);
}

export const clients: Client[] = [
  {
    id: "c1",
    name: "Roberto Nascimento",
    email: "roberto.nascimento@email.com",
    phone: "(11) 98765-4321",
    city: "São Paulo, SP",
    source: "WhatsApp",
    status: "negociacao",
    lastContact: "Hoje, 14:22",
    vehicleInterest: "Honda HR-V EXL 2023",
    vehiclePriceRef: 184900,
    entryValue: 45000,
    financing: "48x — banco parceiro, parcela alvo até R$ 3.400. CPF sem restrição.",
    creditScore: 782,
    urgency: "alta",
    tradeIn: "Sem troca",
    realInterest: "alto",
    realInterestNote: "Quer fechar após test drive; já enviou comprovante de renda.",
  },
  {
    id: "c2",
    name: "Juliana Costa",
    email: "ju.costa@email.com",
    phone: "(11) 97654-1098",
    city: "Guarulhos, SP",
    source: "Webmotors",
    status: "lead",
    lastContact: "Ontem",
    vehicleInterest: "Jeep Compass Longitude 2022",
    vehiclePriceRef: 168000,
    entryValue: 28000,
    financing: "60x — avaliando entrada maior para reduzir parcela.",
    creditScore: 701,
    urgency: "media",
    tradeIn: "Sim — Honda Fit 2016 EX, ~R$ 52 mil na troca",
    realInterest: "medio",
    realInterestNote: "Comparando com outra loja; pediu vídeo do motor.",
  },
  {
    id: "c3",
    name: "Família Mendes",
    email: "carla.mendes@email.com",
    phone: "(21) 99888-7766",
    city: "Rio de Janeiro, RJ",
    source: "Site",
    status: "cliente",
    lastContact: "10/05",
    vehicleInterest: "Chevrolet Onix Plus Premier (entregue)",
    vehiclePriceRef: 98900,
    entryValue: 32000,
    financing: "Financiamento aprovado 36x — contrato assinado.",
    creditScore: 815,
    urgency: "baixa",
    tradeIn: "Sem troca",
    realInterest: "alto",
    realInterestNote: "Cliente fechado; indicou vizinho para HR-V.",
  },
  {
    id: "c4",
    name: "Leandro Vieira",
    email: "leandro.v@email.com",
    phone: "(11) 96543-2211",
    city: "Osasco, SP",
    source: "OLX",
    status: "lead",
    lastContact: "Hoje, 09:15",
    vehicleInterest: "Volkswagen T-Cross Highline 2023",
    vehiclePriceRef: 135900,
    entryValue: 15000,
    financing: "Busca parcela máxima R$ 2.800 — score em análise.",
    creditScore: 612,
    urgency: "alta",
    tradeIn: "Sim — Gol 1.6 2019, avaliação pendente",
    realInterest: "alto",
    realInterestNote: "Disponível para vir na loja ainda esta semana.",
  },
  {
    id: "c5",
    name: "Patrícia Souza",
    email: "patricia.s@email.com",
    phone: "(19) 99123-4455",
    city: "Campinas, SP",
    source: "Loja",
    status: "negociacao",
    lastContact: "08/05",
    vehicleInterest: "Toyota Corolla XEi 2023",
    vehiclePriceRef: 142500,
    entryValue: 55000,
    financing: "48x com seguro prestamista — simulação enviada.",
    creditScore: 768,
    urgency: "media",
    tradeIn: "Sem troca",
    realInterest: "alto",
    realInterestNote: "Decide junto com esposo no fim de semana.",
  },
  {
    id: "c6",
    name: "Marcos Antônio Lima",
    email: "marcos.lima@email.com",
    phone: "(11) 94321-8877",
    city: "Santo André, SP",
    source: "Indicação",
    status: "cliente",
    lastContact: "02/05",
    vehicleInterest: "Ford Ranger XLT 4x4 Diesel",
    vehiclePriceRef: 249000,
    entryValue: 80000,
    financing: "Parcelado 60x — retomada de frota leve.",
    creditScore: 734,
    urgency: "baixa",
    tradeIn: "Sim — Toro 2020 Freedom na troca",
    realInterest: "alto",
    realInterestNote: "Uso misto trabalho + lazer; já comprou na loja.",
  },
  {
    id: "c7",
    name: "Amanda Ribeiro",
    email: "amanda.r@email.com",
    phone: "(11) 91234-5678",
    city: "São Paulo, SP",
    source: "WhatsApp",
    status: "inativo",
    lastContact: "22/04",
    vehicleInterest: "Fiat Pulse Audace 2024",
    vehiclePriceRef: 112000,
    entryValue: 8000,
    financing: "Ainda não definiu banco; renda informal.",
    creditScore: 498,
    urgency: "baixa",
    tradeIn: "Sem troca",
    realInterest: "baixo",
    realInterestNote: "Parou de responder após primeira simulação.",
  },
  {
    id: "c8",
    name: "Eduardo Gomes",
    email: "eduardo.gomes@email.com",
    phone: "(47) 98877-6655",
    city: "Joinville, SC",
    source: "Webmotors",
    status: "lead",
    lastContact: "Hoje, 11:40",
    vehicleInterest: "Picape média diesel (Ranger ou S10)",
    vehiclePriceRef: 265000,
    entryValue: 90000,
    financing: "À vista parcial + 36x — aguardando retorno do gerente.",
    creditScore: 801,
    urgency: "media",
    tradeIn: "Sem troca",
    realInterest: "medio",
    realInterestNote: "Frota pequena — pode comprar CNPJ se der desconto.",
  },
];

export const whatsappChats = [
  { name: "Roberto — HR-V", last: "Posso ir amanhã às 15h?", time: "14:22", unread: 2 },
  { name: "Família Mendes", last: "Aprovamos o financiamento.", time: "Ontem", unread: 0 },
  { name: "Juliana — Compass", last: "Tem desconto à vista?", time: "Ontem", unread: 1 },
  { name: "Leandro", last: "Manda a ficha do veículo", time: "Seg", unread: 0 },
] as const;
