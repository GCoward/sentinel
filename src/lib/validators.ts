import { z } from "zod";

export const roles = ["Admin", "Analyst", "Support"] as const;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(60),
  email: z.string().email(),
  role: z.enum(roles),
});

export const onboardingSchemas = [
  z.object({
    companyName: z.string().min(2, "Company name is required."),
    teamSize: z.enum(["1-10", "11-50", "51-200", "200+"]),
  }),
  z.object({
    primaryGoal: z
      .string()
      .min(12, "Describe the primary success metric for this rollout."),
    dataResidency: z.enum(["US", "EU", "APAC"]),
  }),
  z.object({
    enableAlerts: z.boolean(),
    acceptTerms: z.boolean().refine((value) => value, {
      message: "Review the checklist before activating the workspace.",
    }),
  }),
] as const;

export const onboardingSchema = onboardingSchemas[0]
  .merge(onboardingSchemas[1])
  .merge(onboardingSchemas[2]);

export type LoginInput = z.infer<typeof loginSchema>;
export type NewTeamMemberInput = z.infer<typeof createUserSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
