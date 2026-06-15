"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { MetricsGrid } from "@/features/analytics/components/metrics-grid";
import { OnboardingForm } from "@/features/onboarding/components/onboarding-form";
import { useAnalyticsSnapshot } from "@/features/analytics/hooks/useAnalytics";
import { TeamCard } from "@/features/users/components/team-card";

const AnalyticsChart = dynamic(
  () =>
    import("@/features/analytics/components/analytics-chart-client").then(
      (module) => module.AnalyticsChart,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-80 items-center justify-center rounded-3xl border border-slate-800 bg-slate-950/70 text-sm text-slate-400">
        Loading chart module...
      </div>
    ),
  },
);

export function DashboardOverview() {
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
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card>
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Dynamic visualisation</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Adoption and revenue momentum</h2>
            <p className="mt-2 text-sm text-slate-400">
              Recharts is loaded dynamically so the first server-rendered payload stays small.
            </p>
          </div>
          <AnalyticsChart data={data.trend} />
        </Card>
        <OnboardingForm />
      </div>
      <TeamCard previewCount={4} />
    </div>
  );
}
