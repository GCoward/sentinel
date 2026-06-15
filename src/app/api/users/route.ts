import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createTeamMember, listTeamMembers } from "@/lib/db";
import { createUserSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json(await listTeamMembers());
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = createUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message:
          parsed.error.issues[0]?.message ??
          "Please provide valid name, email, and role.",
      },
      { status: 400 },
    );
  }

  try {
    return NextResponse.json(await createTeamMember(parsed.data), { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_EXISTS") {
      return NextResponse.json({ message: "A teammate with that email already exists." }, { status: 409 });
    }

    return NextResponse.json({ message: "Unable to create teammate." }, { status: 500 });
  }
}
