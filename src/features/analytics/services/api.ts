import type { AnalyticsSnapshot } from "@/features/analytics/types";

export async function fetchAnalyticsSnapshot(): Promise<AnalyticsSnapshot> {
  const response = await fetch("/api/analytics", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to load analytics.");
  }

  return response.json();
}
