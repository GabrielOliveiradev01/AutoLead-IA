"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Car,
  GitBranch,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Package,
  Plug,
  Settings,
  Users,
} from "lucide-react";
import { clearStoredUser, readStoredUser, type DemoUser } from "@/lib/auth";
import { AuthGate } from "./auth-gate";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/funil", label: "Funil", icon: GitBranch },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/produtos", label: "Produtos", icon: Package },
  { href: "/integracao", label: "Integração", icon: Plug },
  { href: "/whatsapp", label: "WhatsApp", icon: MessageCircle },
] as const;

export function CrmShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sessionUser, setSessionUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- avatar após hidratação
    setSessionUser(readStoredUser());
  }, []);

  function handleLogout() {
    clearStoredUser();
    router.replace("/login");
  }

  const initials =
    sessionUser?.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("") ?? "?";

  return (
    <AuthGate>
      <div className="relative min-h-screen bg-page pb-24">
        <header className="sticky top-0 z-40 border-b border-white/60 bg-page/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-charcoal text-lg text-white shadow-soft">
                <Car className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="text-lg font-semibold tracking-tight text-charcoal">
                AutoLead
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {nav.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                      active
                        ? "bg-charcoal text-white shadow-soft"
                        : "text-charcoal/55 hover:bg-white/70 hover:text-charcoal"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hidden rounded-full border border-charcoal/10 bg-white/80 p-2.5 text-charcoal/70 shadow-sm hover:bg-white md:inline-flex"
                aria-label="Configurações"
              >
                <Settings className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                className="relative rounded-full border border-charcoal/10 bg-white/80 p-2.5 text-charcoal/70 shadow-sm hover:bg-white"
                aria-label="Notificações"
              >
                <Bell className="h-5 w-5" strokeWidth={1.5} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold ring-2 ring-white" />
              </button>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-400 text-sm font-bold text-charcoal shadow-soft"
                title={sessionUser?.name}
              >
                {initials}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="ml-1 rounded-full p-2 text-charcoal/45 hover:bg-white/80 hover:text-charcoal"
                aria-label="Sair"
              >
                <LogOut className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="flex border-t border-white/50 px-5 py-2 md:hidden">
            {nav.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex-1 rounded-xl py-2 text-center text-xs font-medium ${
                    active ? "bg-charcoal text-white" : "text-charcoal/55"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">{children}</main>

        <Link
          href="/whatsapp"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/25 transition-transform hover:scale-105"
          aria-label="Abrir WhatsApp"
        >
          <MessageCircle className="h-7 w-7" strokeWidth={1.75} />
        </Link>
      </div>
    </AuthGate>
  );
}
