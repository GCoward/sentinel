import { buildMetricCards } from "@/features/analytics/utils/metrics";

describe("buildMetricCards", () => {
  it("builds comparative metric cards from the latest trend points", () => {
    const metrics = buildMetricCards([
      { id: 1, label: "May", revenue: 181000, activeUsers: 789, conversionRate: 5.7 },
      { id: 2, label: "Jun", revenue: 194000, activeUsers: 842, conversionRate: 6.1 },
    ]);

    expect(metrics).toHaveLength(3);
    expect(metrics[0]).toMatchObject({
      id: "revenue",
      value: 194000,
    });
    expect(metrics[1]?.change).toBeGreaterThan(0);
    expect(metrics[2]).toMatchObject({
      format: "percent",
      value: 6.1,
    });
  });
});
