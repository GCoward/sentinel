"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { MetricsGrid } from "@/features/analytics/components/metrics-grid";
import { useAnalyticsSnapshot } from "@/features/analytics/hooks/useAnalytics";

const AnalyticsChart = dynamic(
  () =>
    import("@/features/analytics/components/analytics-chart-client").then(
      (module) => module.AnalyticsChart,
    ),
  { ssr: false },
);

export function AnalyticsPanel() {
  const { data, isLoading, error } = useAnalyticsSnapshot();

  if (isLoading) {
    return <p className="text-sm text-slate-400">Loading analytics...</p>;
  }

  if (error || !data) {
    return (
      <Card>
        <p className="text-sm text-rose-300">
          {error instanceof Error ? error.message : "Unable to load analytics."}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <MetricsGrid metrics={data.metrics} />
      <Card>
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Analytics drilldown</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Performance trends</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Server components prefetch the snapshot and hydrate TanStack Query so the client keeps a warm cache
            for quick drilldowns and optimistic follow-up updates.
          </p>
        </div>
        <AnalyticsChart data={data.trend} />
      </Card>
    </div>
  );
}
