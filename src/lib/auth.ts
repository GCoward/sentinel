import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginInput } from "@/lib/validators";

export const SESSION_COOKIE = "sentinel_session";

const secret = new TextEncoder().encode(
  process.env.SENTINEL_JWT_SECRET ?? "sentinel-demo-secret",
);

const demoUser = {
  id: "operator-1",
  email: "admin@sentinel.app",
  password: "Sentinel123!",
  name: "Avery Lane",
  role: "Platform Admin",
};

export interface Session {
  sub: string;
  email: string;
  name: string;
  role: string;
}

export async function authenticateUser(credentials: LoginInput): Promise<Session | null> {
  if (
    credentials.email !== demoUser.email ||
    credentials.password !== demoUser.password
  ) {
    return null;
  }

  return {
    sub: demoUser.id,
    email: demoUser.email,
    name: demoUser.name,
    role: demoUser.role,
  };
}

export async function createSessionToken(session: Session) {
  return new SignJWT({
    email: session.email,
    name: session.name,
    role: session.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.sub)
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify<Session>(token, secret);

    if (!payload.sub || !payload.email || !payload.name || !payload.role) {
      return null;
    }

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function requireSession() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}
