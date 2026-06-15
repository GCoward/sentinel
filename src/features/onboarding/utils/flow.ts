import type { OnboardingInput } from "@/lib/validators";

export const onboardingSteps = [
  "Company details",
  "Data priorities",
  "Launch checklist",
] as const;

export function getCompletionRatio(stepIndex: number) {
  return Math.round(((stepIndex + 1) / onboardingSteps.length) * 100);
}

export function buildOnboardingSummary(values: OnboardingInput) {
  return [
    `${values.companyName} • ${values.teamSize} operators`,
    `Goal: ${values.primaryGoal}`,
    `Residency: ${values.dataResidency} • Alerts ${values.enableAlerts ? "enabled" : "disabled"}`,
  ];
}
