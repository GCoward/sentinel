"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Overview" },
  { href: "/analytics", label: "Analytics" },
  { href: "/team", label: "Team" },
];

interface DashboardShellProps {
  session: {
    name: string;
    email: string;
    role: string;
  };
  children: React.ReactNode;
}

export function DashboardShell({ session, children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/login");
    router.refresh();
  };

  const sidebar = (
    <div className="flex h-full flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Sentinel</p>
        <h1 className={cn("text-xl font-semibold text-white", isCollapsed && "sr-only")}>
          Operator Console
        </h1>
      </div>
      <nav aria-label="Dashboard navigation" className="space-y-2">
        {navigation.map((item) => (
          <Link
            className={cn(
              "block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white",
              pathname === item.href && "bg-sky-500/15 text-sky-200",
            )}
            href={item.href}
            key={item.href}
            onClick={() => setIsDrawerOpen(false)}
          >
            {isCollapsed ? item.label.slice(0, 1) : item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
        <p className="font-semibold text-white">{session.name}</p>
        {!isCollapsed ? (
          <>
            <p className="mt-1">{session.role}</p>
            <p className="mt-1 text-slate-400">{session.email}</p>
          </>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-4 lg:px-6">
        <aside
          className={cn(
            "panel hidden rounded-3xl p-4 lg:block",
            isCollapsed ? "w-24" : "w-72",
          )}
        >
          {sidebar}
        </aside>
        <div className="flex-1">
          <header className="panel mb-6 flex items-center justify-between rounded-3xl px-4 py-3">
            <div className="flex items-center gap-3">
              <Button
                aria-controls="mobile-nav"
                aria-expanded={isDrawerOpen}
                className="lg:hidden"
                onClick={() => setIsDrawerOpen(true)}
                variant="secondary"
              >
                Menu
              </Button>
              <Button className="hidden lg:inline-flex" onClick={() => setIsCollapsed((current) => !current)} variant="secondary">
                {isCollapsed ? "Expand" : "Collapse"}
              </Button>
              <div>
                <p className="text-sm text-slate-400">Realtime operations</p>
                <h2 className="text-lg font-semibold text-white">Admin &amp; analytics workspace</h2>
              </div>
            </div>
            <Button onClick={handleLogout} variant="ghost">
              Sign out
            </Button>
          </header>
          <main>{children}</main>
        </div>
      </div>
      {isDrawerOpen ? (
        <div
          aria-hidden={!isDrawerOpen}
          className="fixed inset-0 z-50 bg-slate-950/80 p-4 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        >
          <aside
            className="panel h-full max-w-xs rounded-3xl p-4"
            id="mobile-nav"
            onClick={(event) => event.stopPropagation()}
          >
            {sidebar}
          </aside>
        </div>
      ) : null}
    </div>
  );
}
