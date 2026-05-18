"use client";

import { useDroppable } from "@dnd-kit/core";
import type { FunnelLead, FunnelStage } from "@/lib/funil-data";
import { LeadKanbanCard } from "./lead-kanban-card";

type Props = {
  stage: FunnelStage;
  title: string;
  leads: FunnelLead[];
  onOpenLead: (id: string) => void;
  onMoveLeadStage: (leadId: string, stage: FunnelStage) => void;
};

export function FunilKanbanColumn({ stage, title, leads, onOpenLead, onMoveLeadStage }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-[min(280px,85vw)] shrink-0 flex-col rounded-[1.75rem] border bg-white/50 p-3 transition-colors ${
        isOver ? "border-gold bg-gold/10 ring-2 ring-gold/30" : "border-charcoal/8 border-dashed"
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2 px-1">
        <h2 className="text-sm font-semibold text-charcoal">{title}</h2>
        <span className="rounded-full bg-charcoal/10 px-2.5 py-0.5 text-xs font-bold tabular-nums text-charcoal/70">
          {leads.length}
        </span>
      </div>
      <div className="flex min-h-[120px] flex-1 flex-col gap-3">
        {leads.map((lead) => (
          <LeadKanbanCard
            key={lead.id}
            lead={lead}
            onOpenLead={onOpenLead}
            onMoveLeadStage={onMoveLeadStage}
          />
        ))}
      </div>
    </div>
  );
}
