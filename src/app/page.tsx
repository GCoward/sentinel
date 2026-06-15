import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const highlights = [
  "Server-rendered dashboard data hydration for fast first paint and SEO-friendly summaries.",
  "Secure route handlers backed by Zod validation, signed JWT cookies, and Drizzle ORM queries.",
  "Interactive analytics and team workflows powered by TanStack Query optimistic updates.",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-10 px-6 py-12 lg:flex-row lg:items-center">
      <section className="max-w-2xl space-y-6">
        <span className="inline-flex rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-200">
          Enterprise SaaS Admin &amp; Analytics Platform
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Sentinel keeps revenue, onboarding, and team operations in one secure control plane.
        </h1>
        <p className="max-w-xl text-lg text-slate-300">
          This reference implementation demonstrates a feature-based Next.js architecture with secure APIs,
          high-performance visualisation, accessible workflows, and reusable UI primitives.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            className="rounded-full bg-sky-500 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-400"
            href="/login"
          >
            Open operator login
          </Link>
          <Link
            className="rounded-full border border-slate-700 px-5 py-3 font-semibold text-white hover:border-sky-400"
            href="/dashboard"
          >
            Preview the dashboard
          </Link>
        </div>
      </section>
      <Card className="w-full max-w-2xl overflow-hidden">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Platform overview</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Why these decisions improve the project</h2>
          </div>
          <Image alt="Sentinel dashboard preview" height={64} priority src="/window.svg" width={64} />
        </div>
        <ul className="space-y-4">
          {highlights.map((item) => (
            <li className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </main>
  );
}
