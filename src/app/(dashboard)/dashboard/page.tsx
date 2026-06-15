import { Suspense } from "react";
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import { getAnalyticsSnapshot } from "@/features/analytics/services/snapshot";
import { listTeamMembers } from "@/lib/db";

async function DashboardContent() {
  const [initialAnalytics, initialTeam] = await Promise.all([
    getAnalyticsSnapshot(),
    listTeamMembers(),
  ]);

  return <DashboardOverview initialAnalytics={initialAnalytics} initialTeam={initialTeam} />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-400">Streaming dashboard modules...</p>}>
      <DashboardContent />
    </Suspense>
  );
}
