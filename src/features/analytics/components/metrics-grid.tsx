import { Card } from "@/components/ui/card";
import type { MetricCard } from "@/features/analytics/types";
import { formatCompactNumber, formatCurrency, formatMetricChange } from "@/lib/utils";

function formatMetricValue(metric: MetricCard) {
  if (metric.format === "currency") {
    return formatCurrency(metric.value);
  }

  if (metric.format === "percent") {
    return `${metric.value.toFixed(1)}%`;
  }

  return formatCompactNumber(metric.value);
}

export function MetricsGrid({ metrics }: { metrics: MetricCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{metric.label}</p>
          <p className="mt-4 text-3xl font-semibold text-white">{formatMetricValue(metric)}</p>
          <p className="mt-3 text-sm text-slate-300">{metric.description}</p>
          <p className="mt-4 text-sm font-medium text-emerald-300">{formatMetricChange(metric.change)} period over period</p>
        </Card>
      ))}
    </div>
  );
}
