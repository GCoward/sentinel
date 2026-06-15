import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getAnalyticsSnapshot } from "@/features/analytics/services/snapshot";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json(await getAnalyticsSnapshot());
}
