import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/features/auth/components/login-form";
import { getSession } from "@/lib/auth";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <section className="space-y-6">
        <span className="inline-flex rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-200">
          Secure access with signed JWT cookies
        </span>
        <h1 className="text-5xl font-semibold tracking-tight text-white">
          Enterprise-grade admin workflows without losing speed.
        </h1>
        <p className="max-w-xl text-lg text-slate-300">
          Sentinel combines server-side data loading, optimistic client workflows, and secure route handlers so
          operators can act fast without bypassing guardrails.
        </p>
        <div className="panel inline-flex rounded-3xl p-6">
          <Image alt="Sentinel security illustration" height={72} priority src="/file.svg" width={72} />
        </div>
      </section>
      <LoginForm />
    </main>
  );
}
