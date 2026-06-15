import { TeamCard } from "@/features/users/components/team-card";
import { listTeamMembers } from "@/lib/db";

export default async function TeamPage() {
  const initialTeam = await listTeamMembers();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Collaborative administration</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Invite and coordinate workspace owners</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          TanStack Query keeps the roster responsive with optimistic updates while the secure API persists changes
          through Drizzle.
        </p>
      </div>
      <TeamCard initialTeam={initialTeam} />
    </div>
  );
}
