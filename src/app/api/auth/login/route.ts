import { NextResponse } from "next/server";
import { authenticateUser, createSessionToken, setSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid credentials." },
      { status: 400 },
    );
  }

  const session = await authenticateUser(parsed.data);

  if (!session) {
    return NextResponse.json({ message: "Use the demo operator credentials to continue." }, { status: 401 });
  }

  const token = await createSessionToken(session);
  await setSessionCookie(token);

  return NextResponse.json(session);
}
