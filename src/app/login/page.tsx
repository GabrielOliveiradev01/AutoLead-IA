"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Lock, Mail } from "lucide-react";
import { readStoredUser, storeUser, type DemoUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("consultor@demo.autolead.com");
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState("");

  useEffect(() => {
    if (readStoredUser()) router.replace("/dashboard");
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Informe o e-mail.");
      return;
    }
    const localPart = email.split("@")[0] ?? "Consultor";
    const pretty = localPart
      .split(/[._-]/)
      .filter(Boolean)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
      .join(" ");
    const user: DemoUser = {
      email: email.trim(),
      name: pretty.length >= 3 ? pretty : "Carlos Silva",
    };
    storeUser(user);
    router.replace("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-page px-4 py-12">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal text-white shadow-soft">
            <Car className="h-7 w-7" strokeWidth={1.75} />
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-charcoal">AutoLead CRM</h1>
          <p className="mt-2 text-sm text-charcoal/50">Concessionárias — acesse o painel demo.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-glass space-y-5 p-8 shadow-card-hover md:p-10"
        >
          <div>
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-charcoal/45">
              E-mail
            </label>
            <div className="relative mt-2">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal/30" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-charcoal/10 bg-white/90 py-3.5 pl-12 pr-4 text-charcoal outline-none ring-0 transition placeholder:text-charcoal/30 focus:border-gold/50 focus:ring-2 focus:ring-gold/30"
                placeholder="voce@concessionaria.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-charcoal/45">
              Senha
            </label>
            <div className="relative mt-2">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal/30" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-charcoal/10 bg-white/90 py-3.5 pl-12 pr-4 text-charcoal outline-none transition placeholder:text-charcoal/30 focus:border-gold/50 focus:ring-2 focus:ring-gold/30"
                placeholder="••••••••"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-2xl bg-charcoal py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-charcoal/90"
          >
            Entrar
          </button>
          <p className="text-center text-xs text-charcoal/40">
            Qualquer combinação funciona neste protótipo — dados são apenas para demonstração.
          </p>
        </form>
      </div>
    </div>
  );
}
