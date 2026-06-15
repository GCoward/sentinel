import type { AnalyticsSnapshot, MetricCard, TrendPoint } from "@/features/analytics/types";

function calculateChange(current: number, previous: number) {
  if (previous === 0) {
    return current === 0 ? 0 : Number.POSITIVE_INFINITY;
  }

  return ((current - previous) / previous) * 100;
}

export function buildMetricCards(points: TrendPoint[]): MetricCard[] {
  const latest = points.at(-1);
  const previous = points.at(-2) ?? latest;

  if (!latest || !previous) {
    return [];
  }

  return [
    {
      id: "revenue",
      label: "MRR",
      description: "Subscription revenue across managed workspaces.",
      format: "currency",
      value: latest.revenue,
      change: calculateChange(latest.revenue, previous.revenue),
    },
    {
      id: "users",
      label: "Active users",
      description: "Weekly active operators and analysts.",
      format: "number",
      value: latest.activeUsers,
      change: calculateChange(latest.activeUsers, previous.activeUsers),
    },
    {
      id: "conversion",
      label: "Activation rate",
      description: "Onboarding to first dashboard interaction.",
      format: "percent",
      value: latest.conversionRate,
      change: calculateChange(latest.conversionRate, previous.conversionRate),
    },
  ];
}

export function buildAnalyticsSnapshot(points: TrendPoint[]): AnalyticsSnapshot {
  return {
    metrics: buildMetricCards(points),
    trend: points,
    lastUpdated: new Date().toISOString(),
  };
}
