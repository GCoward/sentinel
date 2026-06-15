import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import { analyticsQueryKey } from "@/features/analytics/hooks/useAnalytics";
import { getAnalyticsSnapshot } from "@/features/analytics/services/snapshot";
import { teamQueryKey } from "@/features/users/hooks/useUsers";
import { listTeamMembers } from "@/lib/db";
import { makeQueryClient } from "@/lib/query-client";

async function DashboardContent() {
  const queryClient = makeQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: analyticsQueryKey,
      queryFn: getAnalyticsSnapshot,
    }),
    queryClient.prefetchQuery({
      queryKey: teamQueryKey,
      queryFn: listTeamMembers,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardOverview />
    </HydrationBoundary>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-400">Streaming dashboard modules...</p>}>
      <DashboardContent />
    </Suspense>
  );
}
