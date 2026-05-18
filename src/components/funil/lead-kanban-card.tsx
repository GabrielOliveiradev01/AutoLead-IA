"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ComponentType } from "react";
import {
  AlertTriangle,
  ArrowLeftRight,
  Calendar,
  Clock,
  CreditCard,
  Flame,
  GripVertical,
  MessageCircle,
  Phone,
  Snowflake,
  Sparkles,
  ThermometerSun,
  User,
  Zap,
} from "lucide-react";
import { FUNNEL_STAGES, STAGE_LABEL, type FunnelLead, type FunnelStage, type LeadIndicator } from "@/lib/funil-data";

const indicatorIcon: Record<
  LeadIndicator,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  responde_rapido: Zap,
  quer_financiar: CreditCard,
  possui_troca: ArrowLeftRight,
  visita_hoje: Calendar,
};

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function TemperatureIcon({ t }: { t: FunnelLead["temperature"] }) {
  if (t === "quente") return <Flame className="h-3.5 w-3.5 shrink-0 text-orange-600" strokeWidth={2} aria-hidden />;
  if (t === "morno")
    return <ThermometerSun className="h-3.5 w-3.5 shrink-0 text-amber-600" strokeWidth={2} aria-hidden />;
  return <Snowflake className="h-3.5 w-3.5 shrink-0 text-sky-600" strokeWidth={2} aria-hidden />;
}

type Props = {
  lead: FunnelLead;
  onOpenLead: (id: string) => void;
  onMoveLeadStage?: (leadId: string, stage: FunnelStage) => void;
};

export function LeadKanbanDragPreview({ lead }: { lead: FunnelLead }) {
  return (
    <div className="w-[260px] rounded-2xl border border-white/90 bg-white p-3 shadow-xl">
      <CardInner lead={lead} />
      <p className="mt-2 text-center text-[10px] font-medium text-charcoal/40">Solte na etapa</p>
    </div>
  );
}

export function LeadKanbanCard({ lead, onOpenLead, onMoveLeadStage }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.35 : 1,
  };

  const wa = `https://wa.me/55${lead.phone.replace(/\D/g, "")}`;

  return (
    <div ref={setNodeRef} style={style} className="touch-manipulation">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpenLead(lead.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenLead(lead.id);
          }
        }}
        className="cursor-pointer rounded-2xl border border-white/80 bg-white/95 shadow-sm outline-none ring-charcoal/5 transition hover:shadow-md focus-visible:ring-2"
      >
        <div className="flex gap-0">
          <button
            type="button"
            className="flex shrink-0 cursor-grab items-start rounded-l-2xl border-r border-charcoal/5 bg-charcoal/[0.03] px-1 py-2.5 text-charcoal/30 hover:bg-charcoal/[0.06] hover:text-charcoal/50 active:cursor-grabbing"
            {...listeners}
            {...attributes}
            aria-label="Arrastar"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1 p-2.5 pr-2.5">
            <CardInner lead={lead} />
            <QuickRow lead={lead} wa={wa} onOpenLead={onOpenLead} onMoveLeadStage={onMoveLeadStage} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardInner({ lead }: { lead: FunnelLead }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold/90 to-amber-300 text-[10px] font-bold text-charcoal">
          {lead.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 truncate text-sm font-semibold leading-tight text-charcoal">
            <TemperatureIcon t={lead.temperature} />
            <span className="truncate">{lead.name}</span>
            {lead.iaHot && (
              <Sparkles className="ml-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" aria-label="Prioridade IA" />
            )}
          </p>
        </div>
      </div>

      <p className="mt-2 truncate text-xs font-medium text-charcoal">{lead.vehicleModel}</p>
      <p className="text-sm font-semibold tabular-nums text-charcoal">{brl(lead.vehiclePrice)}</p>

      <p className="mt-1.5 truncate text-[11px] text-charcoal/45">
        {lead.seller} · {lead.origin}
      </p>

      {lead.nextFollowUp && (
        <p
          className={`mt-1.5 flex items-center gap-1 truncate text-[11px] font-medium ${
            lead.nextFollowUp.overdueDays != null && lead.nextFollowUp.overdueDays > 0
              ? "text-red-700"
              : "text-charcoal/55"
          }`}
        >
          {lead.nextFollowUp.overdueDays != null && lead.nextFollowUp.overdueDays > 0 ? (
            <>
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
              <span>{lead.nextFollowUp.overdueDays}d atrasado</span>
            </>
          ) : (
            <>
              <Clock className="h-3.5 w-3.5 shrink-0 text-charcoal/40" strokeWidth={2} aria-hidden />
              <span>
                {lead.nextFollowUp.dateLabel}
                {lead.nextFollowUp.time ? ` ${lead.nextFollowUp.time}` : ""}
              </span>
            </>
          )}
        </p>
      )}

      {lead.indicators.length > 0 && (
        <div className="mt-1.5 flex items-center gap-1.5 text-charcoal/55" aria-label="Sinais rápidos">
          {lead.indicators.map((ind) => {
            const Icon = indicatorIcon[ind];
            return <Icon key={ind} className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />;
          })}
        </div>
      )}
    </>
  );
}

function QuickRow({
  lead,
  wa,
  onOpenLead,
  onMoveLeadStage,
}: {
  lead: FunnelLead;
  wa: string;
  onOpenLead: (id: string) => void;
  onMoveLeadStage?: (leadId: string, stage: FunnelStage) => void;
}) {
  return (
    <div className="mt-2 flex items-center gap-1 border-t border-charcoal/5 pt-2" onClick={(e) => e.stopPropagation()}>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a]"
        title="WhatsApp"
      >
        <MessageCircle className="h-3.5 w-3.5" />
      </a>
      <a
        href={`tel:${lead.phone.replace(/\D/g, "")}`}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-charcoal/10 text-charcoal hover:bg-charcoal/15"
        title="Ligar"
      >
        <Phone className="h-3.5 w-3.5" />
      </a>
      <button
        type="button"
        onClick={() => onOpenLead(lead.id)}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/50 text-charcoal hover:bg-gold/70"
        title="Abrir ficha"
      >
        <User className="h-3.5 w-3.5" />
      </button>
      <select
        aria-label="Mover etapa"
        value={lead.stage}
        onChange={(e) => {
          const stage = e.target.value as FunnelStage;
          onMoveLeadStage?.(lead.id, stage);
        }}
        className="ml-auto min-w-0 max-w-[52%] flex-1 truncate rounded-lg border border-charcoal/10 bg-white py-1.5 pl-2 pr-1 text-[10px] font-semibold text-charcoal"
      >
        {FUNNEL_STAGES.map((s) => (
          <option key={s} value={s}>
            {STAGE_LABEL[s]}
          </option>
        ))}
      </select>
    </div>
  );
}
