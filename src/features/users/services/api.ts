import type { NewTeamMember, TeamMember } from "@/features/users/types";

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const response = await fetch("/api/users", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to load the team roster.");
  }

  return response.json();
}

export async function createTeamMemberRequest(payload: NewTeamMember): Promise<TeamMember> {
  const response = await fetch("/api/users", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message ?? "Unable to add the teammate.");
  }

  return response.json();
}
