import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { TeamCard } from "@/features/users/components/team-card";
import { teamQueryKey } from "@/features/users/hooks/useUsers";
import { listTeamMembers } from "@/lib/db";
import { makeQueryClient } from "@/lib/query-client";

export default async function TeamPage() {
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: teamQueryKey,
    queryFn: listTeamMembers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Collaborative administration</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Invite and coordinate workspace owners</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            TanStack Query keeps the roster responsive with optimistic updates while the secure API persists changes
            through Drizzle.
          </p>
        </div>
        <TeamCard />
      </div>
    </HydrationBoundary>
  );
}
