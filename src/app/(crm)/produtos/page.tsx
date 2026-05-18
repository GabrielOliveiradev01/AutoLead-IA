import { Car, Fuel, Gauge } from "lucide-react";
import { vehicles } from "@/lib/demo-data";

function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

const statusStyle = {
  disponível: "bg-emerald-500/15 text-emerald-800 ring-emerald-500/20",
  reservado: "bg-gold/30 text-charcoal ring-gold/40",
  vendido: "bg-charcoal/10 text-charcoal/55 ring-charcoal/10",
} as const;

export default function ProdutosPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-charcoal">Produtos</h1>
          <p className="text-charcoal/50">Estoque demo — veículos e status comerciais.</p>
        </div>
        <div className="flex gap-3">
          <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-charcoal/60 shadow-sm ring-1 ring-charcoal/5">
            {vehicles.filter((v) => v.status === "disponível").length} disponíveis
          </span>
          <span className="rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-white shadow-soft">
            {vehicles.length} no catálogo
          </span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {vehicles.map((v) => (
          <article
            key={v.id}
            className="group card-glass flex flex-col overflow-hidden transition-shadow hover:shadow-card-hover"
          >
            <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-charcoal/8 via-white to-gold/15">
              <Car className="h-16 w-16 text-charcoal/15 transition-transform group-hover:scale-105" strokeWidth={1} />
              {v.highlight && (
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-charcoal shadow-sm">
                  {v.highlight}
                </span>
              )}
              <span
                className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyle[v.status]}`}
              >
                {v.status}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40">{v.brand}</p>
              <h2 className="mt-1 text-lg font-semibold text-charcoal">
                {v.model}{" "}
                <span className="font-normal text-charcoal/45">· {v.year}</span>
              </h2>
              <p className="mt-3 text-2xl font-light tabular-nums text-charcoal">{formatBRL(v.price)}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-charcoal/50">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal/5 px-3 py-1.5">
                  <Gauge className="h-3.5 w-3.5" />
                  {v.km.toLocaleString("pt-BR")} km
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal/5 px-3 py-1.5">
                  <Fuel className="h-3.5 w-3.5" />
                  {v.fuel}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
