export interface MetricCard {
  id: string;
  label: string;
  description: string;
  format: "currency" | "number" | "percent";
  value: number;
  change: number;
}

export interface TrendPoint {
  id: number;
  label: string;
  revenue: number;
  activeUsers: number;
  conversionRate: number;
}

export interface AnalyticsSnapshot {
  metrics: MetricCard[];
  trend: TrendPoint[];
  lastUpdated: string;
}
