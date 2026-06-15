"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { buildOnboardingSummary, getCompletionRatio, onboardingSteps } from "@/features/onboarding/utils/flow";
import { onboardingSchemas, type OnboardingInput } from "@/lib/validators";

const initialState: OnboardingInput = {
  companyName: "Northstar Labs",
  teamSize: "11-50",
  primaryGoal: "Reduce time to first meaningful dashboard insight.",
  dataResidency: "EU",
  enableAlerts: true,
  acceptTerms: false,
};

export function OnboardingForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<OnboardingInput>(initialState);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(() => getCompletionRatio(stepIndex), [stepIndex]);

  const handleNext = () => {
    const parsed = onboardingSchemas[stepIndex].safeParse(values);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Complete the current step.");
      return;
    }

    setError("");

    if (stepIndex === onboardingSteps.length - 1) {
      setSubmitted(true);
      return;
    }

    setStepIndex((current) => current + 1);
  };

  return (
    <Card className="h-full">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Guided onboarding</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{onboardingSteps[stepIndex]}</h2>
        </div>
        <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">{progress}%</span>
      </div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-900">
        <div className="h-full rounded-full bg-sky-500" style={{ width: `${progress}%` }} />
      </div>
      {stepIndex === 0 ? (
        <div className="space-y-4">
          <label className="block space-y-2 text-sm text-slate-300">
            <span>Workspace name</span>
            <Input
              name="companyName"
              onChange={(event) => setValues((current) => ({ ...current, companyName: event.target.value }))}
              value={values.companyName}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-300">
            <span>Operating team size</span>
            <select
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
              name="teamSize"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  teamSize: event.target.value as OnboardingInput["teamSize"],
                }))
              }
              value={values.teamSize}
            >
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
          </label>
        </div>
      ) : null}
      {stepIndex === 1 ? (
        <div className="space-y-4">
          <label className="block space-y-2 text-sm text-slate-300">
            <span>Primary business goal</span>
            <Input
              name="primaryGoal"
              onChange={(event) => setValues((current) => ({ ...current, primaryGoal: event.target.value }))}
              value={values.primaryGoal}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-300">
            <span>Data residency</span>
            <select
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
              name="dataResidency"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  dataResidency: event.target.value as OnboardingInput["dataResidency"],
                }))
              }
              value={values.dataResidency}
            >
              <option value="US">United States</option>
              <option value="EU">European Union</option>
              <option value="APAC">APAC</option>
            </select>
          </label>
        </div>
      ) : null}
      {stepIndex === 2 ? (
        <div className="space-y-4 text-sm text-slate-300">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-800 px-4 py-3">
            <input
              checked={values.enableAlerts}
              name="enableAlerts"
              onChange={(event) =>
                setValues((current) => ({ ...current, enableAlerts: event.target.checked }))
              }
              type="checkbox"
            />
            Enable proactive alert digests for the launch team.
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-slate-800 px-4 py-3">
            <input
              checked={values.acceptTerms}
              name="acceptTerms"
              onChange={(event) =>
                setValues((current) => ({ ...current, acceptTerms: event.target.checked }))
              }
              type="checkbox"
            />
            Confirm governance owners reviewed the activation checklist.
          </label>
          <ul className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            {buildOnboardingSummary(values).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {error ? (
        <p aria-live="polite" className="mt-4 text-sm text-rose-300">
          {error}
        </p>
      ) : null}
      {submitted ? (
        <p aria-live="polite" className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Workspace configuration ready. Operators can start using dashboards immediately.
        </p>
      ) : null}
      <div className="mt-6 flex gap-3">
        <Button
          disabled={stepIndex === 0}
          onClick={() => {
            setError("");
            setStepIndex((current) => Math.max(current - 1, 0));
          }}
          variant="secondary"
        >
          Back
        </Button>
        <Button className="flex-1" onClick={handleNext}>
          {stepIndex === onboardingSteps.length - 1 ? "Activate workspace" : "Continue"}
        </Button>
      </div>
    </Card>
  );
}
