export interface TeamMember {
  id: number | string;
  name: string;
  email: string;
  role: "Admin" | "Analyst" | "Support";
  status: string;
  lastActive: string;
}

export interface NewTeamMember {
  name: string;
  email: string;
  role: TeamMember["role"];
}
