"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readStoredUser, type DemoUser } from "@/lib/auth";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<DemoUser | null | undefined>(undefined);

  useEffect(() => {
    // sessionStorage só existe no cliente; sincroniza após o mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura de storage pós-hidratação
    setUser(readStoredUser());
  }, []);

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [user, router]);

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-charcoal/20 border-t-gold" />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
