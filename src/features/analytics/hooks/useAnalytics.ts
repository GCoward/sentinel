"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsSnapshot } from "@/features/analytics/services/api";
import type { AnalyticsSnapshot } from "@/features/analytics/types";

export const analyticsQueryKey = ["analytics", "snapshot"] as const;

export function useAnalyticsSnapshot(initialData?: AnalyticsSnapshot) {
  return useQuery({
    queryKey: analyticsQueryKey,
    queryFn: fetchAnalyticsSnapshot,
    initialData,
  });
}
