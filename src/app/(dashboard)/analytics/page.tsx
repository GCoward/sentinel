import { Suspense } from "react";
import { AnalyticsPanel } from "@/features/analytics/components/analytics-panel";
import { getAnalyticsSnapshot } from "@/features/analytics/services/snapshot";

async function AnalyticsContent() {
  const initialAnalytics = await getAnalyticsSnapshot();

  return <AnalyticsPanel initialAnalytics={initialAnalytics} />;
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-400">Preparing chart stream...</p>}>
      <AnalyticsContent />
    </Suspense>
  );
}
