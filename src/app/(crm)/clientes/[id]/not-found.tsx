import Link from "next/link";

export default function ClienteNotFound() {
  return (
    <div className="card-glass mx-auto max-w-lg p-10 text-center">
      <h1 className="text-xl font-semibold text-charcoal">Cliente não encontrado</h1>
      <p className="mt-2 text-sm text-charcoal/50">Esse ID não existe na base demo.</p>
      <Link
        href="/clientes"
        className="mt-6 inline-flex rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-charcoal/90"
      >
        Voltar para clientes
      </Link>
    </div>
  );
}
