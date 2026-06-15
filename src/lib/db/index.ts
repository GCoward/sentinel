import Database from "better-sqlite3";
import { asc, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { analyticsPoints, teamMembers } from "@/lib/db/schema";
import type { NewTeamMemberInput } from "@/lib/validators";

const dataDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "sentinel.sqlite");

mkdirSync(dataDirectory, { recursive: true });

const sqlite = new Database(databasePath);

sqlite.pragma("journal_mode = WAL");

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS team_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    status TEXT NOT NULL,
    last_active TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS analytics_points (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    revenue INTEGER NOT NULL,
    active_users INTEGER NOT NULL,
    conversion_rate REAL NOT NULL
  );
`);

const seedTeamCount = sqlite
  .prepare("SELECT COUNT(*) as count FROM team_members")
  .get() as { count: number };

if (!seedTeamCount.count) {
  sqlite.exec(`
    INSERT INTO team_members (name, email, role, status, last_active)
    VALUES
      ('Avery Lane', 'admin@sentinel.app', 'Admin', 'Online', '2 minutes ago'),
      ('Jordan Quinn', 'jordan@sentinel.app', 'Analyst', 'Reviewing dashboards', '12 minutes ago'),
      ('Mika Chen', 'mika@sentinel.app', 'Support', 'On call', '31 minutes ago');
  `);
}

const seedAnalyticsCount = sqlite
  .prepare("SELECT COUNT(*) as count FROM analytics_points")
  .get() as { count: number };

if (!seedAnalyticsCount.count) {
  sqlite.exec(`
    INSERT INTO analytics_points (label, revenue, active_users, conversion_rate)
    VALUES
      ('Jan', 148000, 620, 4.6),
      ('Feb', 155000, 655, 4.9),
      ('Mar', 166000, 701, 5.1),
      ('Apr', 172000, 743, 5.4),
      ('May', 181000, 789, 5.7),
      ('Jun', 194000, 842, 6.1);
  `);
}

export const db = drizzle(sqlite, {
  schema: {
    analyticsPoints,
    teamMembers,
  },
});

export type TeamMember = typeof teamMembers.$inferSelect;
export type AnalyticsPoint = typeof analyticsPoints.$inferSelect;

export async function listTeamMembers() {
  return db.select().from(teamMembers).orderBy(desc(teamMembers.id));
}

export async function createTeamMember(input: NewTeamMemberInput) {
  const [existingMember] = await db
    .select({ id: teamMembers.id })
    .from(teamMembers)
    .where(eq(teamMembers.email, input.email));

  if (existingMember) {
    throw new Error("EMAIL_EXISTS");
  }

  const [record] = await db
    .insert(teamMembers)
    .values({
      ...input,
      status: "Invited",
      lastActive: "Just now",
    })
    .returning();

  return record;
}

export async function listAnalyticsPoints() {
  return db.select().from(analyticsPoints).orderBy(asc(analyticsPoints.id));
}

export async function getTeamSnapshotCount() {
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(teamMembers);

  return result?.count ?? 0;
}
