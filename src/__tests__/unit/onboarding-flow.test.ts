import { buildOnboardingSummary, getCompletionRatio } from "@/features/onboarding/utils/flow";

describe("onboarding flow helpers", () => {
  it("calculates progress based on the current step", () => {
    expect(getCompletionRatio(0)).toBe(33);
    expect(getCompletionRatio(2)).toBe(100);
  });

  it("builds a concise operator summary", () => {
    expect(
      buildOnboardingSummary({
        companyName: "Northstar Labs",
        teamSize: "11-50",
        primaryGoal: "Reduce time to first meaningful dashboard insight.",
        dataResidency: "EU",
        enableAlerts: true,
        acceptTerms: true,
      }),
    ).toContain("Goal: Reduce time to first meaningful dashboard insight.");
  });
});
