"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTeamMemberRequest, fetchTeamMembers } from "@/features/users/services/api";
import type { NewTeamMember, TeamMember } from "@/features/users/types";

export const teamQueryKey = ["team", "members"] as const;

export function useTeamMembers(initialData?: TeamMember[]) {
  return useQuery({
    queryKey: teamQueryKey,
    queryFn: fetchTeamMembers,
    initialData,
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newMember: NewTeamMember) => createTeamMemberRequest(newMember),
    onMutate: async (newMember) => {
      await queryClient.cancelQueries({ queryKey: teamQueryKey });

      const previousTeam = queryClient.getQueryData<TeamMember[]>(teamQueryKey) ?? [];
      const optimisticMember: TeamMember = {
        id: Date.now(),
        status: "Invited",
        lastActive: "Just now",
        ...newMember,
      };

      queryClient.setQueryData<TeamMember[]>(teamQueryKey, [
        optimisticMember,
        ...previousTeam,
      ]);

      return { previousTeam };
    },
    onError: (_error, _member, context) => {
      queryClient.setQueryData(teamQueryKey, context?.previousTeam ?? []);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: teamQueryKey });
    },
  });
}
