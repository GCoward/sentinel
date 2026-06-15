import { listAnalyticsPoints } from "@/lib/db";
import { buildAnalyticsSnapshot } from "@/features/analytics/utils/metrics";

export async function getAnalyticsSnapshot() {
  const trend = await listAnalyticsPoints();
  return buildAnalyticsSnapshot(trend);
}
