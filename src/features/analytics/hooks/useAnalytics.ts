"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsSnapshot } from "@/features/analytics/services/api";

export const analyticsQueryKey = ["analytics", "snapshot"] as const;

export function useAnalyticsSnapshot() {
  return useQuery({
    queryKey: analyticsQueryKey,
    queryFn: fetchAnalyticsSnapshot,
  });
}
