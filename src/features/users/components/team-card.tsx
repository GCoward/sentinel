"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useCreateTeamMember, useTeamMembers } from "@/features/users/hooks/useUsers";
import type { NewTeamMember, TeamMember } from "@/features/users/types";
import { createUserSchema } from "@/lib/validators";

export function TeamCard({
  initialTeam,
  previewCount,
}: {
  initialTeam?: TeamMember[];
  previewCount?: number;
}) {
  const { data = [], isLoading, error } = useTeamMembers(initialTeam);
  const createMember = useCreateTeamMember();
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [values, setValues] = useState<NewTeamMember>({
    name: "",
    email: "",
    role: "Analyst",
  });

  const members = useMemo(
    () => (previewCount ? data.slice(0, previewCount) : data),
    [data, previewCount],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = createUserSchema.safeParse(values);

    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Provide valid teammate details.");
      return;
    }

    setFormError("");

    try {
      await createMember.mutateAsync(parsed.data);
      setValues({
        name: "",
        email: "",
        role: "Analyst",
      });
      setIsOpen(false);
    } catch (mutationError) {
      setFormError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to invite the teammate.",
      );
    }
  };

  return (
    <>
      <Card className="h-full">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Team operations</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Workspace roster</h2>
          </div>
          <Button onClick={() => setIsOpen(true)}>Invite teammate</Button>
        </div>
        {isLoading ? <p className="text-sm text-slate-400">Loading teammates...</p> : null}
        {error ? <p className="text-sm text-rose-300">{error.message}</p> : null}
        <div className="overflow-hidden rounded-2xl border border-slate-800">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead className="bg-slate-950/80 text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Last active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="px-4 py-4">
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-slate-400">{member.email}</p>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{member.role}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{member.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal
        description="Optimistic updates keep the roster responsive while the secure route handler persists data."
        onClose={() => setIsOpen(false)}
        open={isOpen}
        title="Invite a teammate"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-sm text-slate-300">
            <span>Name</span>
            <Input
              name="name"
              onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
              value={values.name}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-300">
            <span>Email</span>
            <Input
              name="email"
              onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
              type="email"
              value={values.email}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-300">
            <span>Role</span>
            <select
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
              name="role"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  role: event.target.value as NewTeamMember["role"],
                }))
              }
              value={values.role}
            >
              <option value="Admin">Admin</option>
              <option value="Analyst">Analyst</option>
              <option value="Support">Support</option>
            </select>
          </label>
          {formError ? (
            <p aria-live="polite" className="text-sm text-rose-300">
              {formError}
            </p>
          ) : null}
          <div className="flex justify-end gap-3">
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button disabled={createMember.isPending} type="submit">
              {createMember.isPending ? "Inviting..." : "Send invite"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
