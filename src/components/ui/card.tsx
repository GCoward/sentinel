import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("panel rounded-3xl p-6 shadow-2xl shadow-slate-950/30", className)} {...props} />;
}
