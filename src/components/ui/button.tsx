import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const styles = {
  primary:
    "bg-sky-500 text-slate-950 hover:bg-sky-400 disabled:bg-sky-700 disabled:text-slate-300",
  secondary:
    "border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500 hover:bg-slate-800",
  ghost: "text-slate-300 hover:bg-slate-900 hover:text-white",
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof styles;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed",
        styles[variant],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
