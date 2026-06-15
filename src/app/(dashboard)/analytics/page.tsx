import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import { AnalyticsPanel } from "@/features/analytics/components/analytics-panel";
import { analyticsQueryKey } from "@/features/analytics/hooks/useAnalytics";
import { getAnalyticsSnapshot } from "@/features/analytics/services/snapshot";
import { makeQueryClient } from "@/lib/query-client";

async function AnalyticsContent() {
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: analyticsQueryKey,
    queryFn: getAnalyticsSnapshot,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnalyticsPanel />
    </HydrationBoundary>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-400">Preparing chart stream...</p>}>
      <AnalyticsContent />
    </Suspense>
  );
}
