"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendPoint } from "@/features/analytics/types";

export function AnalyticsChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.18)" strokeDasharray="4 4" />
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: "18px",
            }}
          />
          <Legend />
          <Line dataKey="revenue" name="Revenue" stroke="#38bdf8" strokeWidth={3} type="monotone" />
          <Line dataKey="activeUsers" name="Active users" stroke="#34d399" strokeWidth={3} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
