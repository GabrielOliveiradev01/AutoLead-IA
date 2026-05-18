"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  defaultFunilLeads,
  FUNNEL_STAGES,
  readFunilLeads,
  STAGE_LABEL,
  writeFunilLeads,
  type FunnelLead,
  type FunnelStage,
  type LeadTemperature,
} from "@/lib/funil-data";
import { FunilToolbar } from "./funil-toolbar";
import { FunilMetrics } from "./funil-metrics";
import { FunilKanbanColumn } from "./funil-kanban-column";
import { LeadKanbanDragPreview } from "./lead-kanban-card";
import { LeadDrawer } from "./lead-drawer";
import { FollowUpCenter } from "./follow-up-center";

const STAGE_SET = new Set<string>(FUNNEL_STAGES);

export function FunilView() {
  const [leads, setLeads] = useState<FunnelLead[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("30d");
  const [seller, setSeller] = useState("Todos");
  const [origin, setOrigin] = useState("Todas");
  const [temperature, setTemperature] = useState<"todas" | LeadTemperature>("todas");
  const [drawerLeadId, setDrawerLeadId] = useState<string | null>(null);
  const [activeDrag, setActiveDrag] = useState<FunnelLead | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hidratar sessionStorage
    setLeads(readFunilLeads());
    setLoaded(true);
  }, []);

  const persist = useCallback((next: FunnelLead[]) => {
    setLeads(next);
    writeFunilLeads(next);
  }, []);

  const moveLeadStage = useCallback(
    (leadId: string, stage: FunnelStage) => {
      persist(leads.map((l) => (l.id === leadId ? { ...l, stage } : l)));
    },
    [leads, persist],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      if (seller !== "Todos" && l.seller !== seller) return false;
      if (origin !== "Todas" && l.origin !== origin) return false;
      if (temperature !== "todas" && l.temperature !== temperature) return false;
      if (q) {
        const blob = `${l.name} ${l.vehicleModel} ${l.city} ${l.phone} ${l.origin} ${l.seller}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [leads, search, seller, origin, temperature]);

  const leadsByStage = useMemo(() => {
    const map = {} as Record<FunnelStage, FunnelLead[]>;
    for (const s of FUNNEL_STAGES) map[s] = [];
    for (const l of filtered) {
      if (map[l.stage]) map[l.stage].push(l);
    }
    return map;
  }, [filtered]);

  const metrics = useMemo(() => {
    const open = filtered.filter((l) => l.stage !== "fechado" && l.stage !== "perdido");
    const hot = open.filter((l) => l.temperature === "quente").length;
    const negociacaoValor = filtered
      .filter((l) => ["proposta", "negociacao", "simulacao"].includes(l.stage))
      .reduce((s, l) => s + l.vehiclePrice, 0);
    const followToday = filtered.filter((l) => l.nextFollowUp?.dateLabel === "Hoje").length;
    const testDrives = filtered.filter(
      (l) => l.stage === "agendamento" || l.indicators.includes("visita_hoje"),
    ).length;
    const fechados = leads.filter((l) => l.stage === "fechado").length;
    const perdidos = leads.filter((l) => l.stage === "perdido").length;
    const encerrados = fechados + perdidos;
    const conversao =
      encerrados > 0 ? Math.round((fechados / encerrados) * 100) : fechados > 0 ? 100 : 0;
    return { hot, negociacaoValor, followToday, testDrives, conversao };
  }, [filtered, leads]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  function onDragStart(e: DragStartEvent) {
    const id = String(e.active.id);
    const lead = leads.find((l) => l.id === id);
    setActiveDrag(lead ?? null);
  }

  function onDragEnd(e: DragEndEvent) {
    setActiveDrag(null);
    const leadId = String(e.active.id);
    const overRaw = e.over?.id != null ? String(e.over.id) : null;
    if (!overRaw) return;
    let newStage: FunnelStage | null = null;
    if (STAGE_SET.has(overRaw)) newStage = overRaw as FunnelStage;
    else {
      const overLead = leads.find((l) => l.id === overRaw);
      if (overLead) newStage = overLead.stage;
    }
    if (!newStage) return;
    const next = leads.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l));
    persist(next);
  }

  const drawerLead = drawerLeadId ? leads.find((l) => l.id === drawerLeadId) ?? null : null;

  if (!loaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-charcoal/15 border-t-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-charcoal">Funil de vendas</h1>
          <p className="mt-1 max-w-2xl text-sm text-charcoal/50 md:text-base">
            Organize leads, acelere follow-up e priorize o que fecha. Arraste os cards entre etapas — dados
            salvos neste navegador (demo).
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            const fresh = defaultFunilLeads();
            persist(fresh);
          }}
          className="self-start rounded-full border border-charcoal/10 bg-white/90 px-4 py-2 text-sm font-medium text-charcoal/70 shadow-sm hover:bg-white"
        >
          Restaurar demo
        </button>
      </header>

      <FunilToolbar
        search={search}
        onSearchChange={setSearch}
        period={period}
        onPeriodChange={setPeriod}
        seller={seller}
        onSellerChange={setSeller}
        origin={origin}
        onOriginChange={setOrigin}
        temperature={temperature}
        onTemperatureChange={setTemperature}
      />

      <FunilMetrics
        hotLeads={metrics.hot}
        negotiationValue={metrics.negociacaoValor}
        followUpsToday={metrics.followToday}
        testDrives={metrics.testDrives}
        conversionPct={metrics.conversao}
        responseTimeLabel="12 min"
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:thin]">
          {FUNNEL_STAGES.map((stage) => (
            <FunilKanbanColumn
              key={stage}
              stage={stage}
              title={STAGE_LABEL[stage]}
              leads={leadsByStage[stage]}
              onOpenLead={setDrawerLeadId}
              onMoveLeadStage={moveLeadStage}
            />
          ))}
        </div>
        <DragOverlay dropAnimation={null}>
          {activeDrag ? (
            <div className="w-[280px] rotate-1 scale-[1.02] shadow-2xl">
              <LeadKanbanDragPreview lead={activeDrag} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <FollowUpCenter leads={filtered} onOpenLead={setDrawerLeadId} />

      <LeadDrawer lead={drawerLead} open={!!drawerLead} onClose={() => setDrawerLeadId(null)} />
    </div>
  );
}
