"use client";

import { readStoredUser } from "@/lib/auth";
import { DashboardView } from "@/components/crm/dashboard-view";

export default function DashboardPage() {
  const name = readStoredUser()?.name ?? "Consultor";
  return <DashboardView userName={name} />;
}
