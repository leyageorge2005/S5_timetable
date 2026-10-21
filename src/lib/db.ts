import { neon } from "@neondatabase/serverless";

export const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_bfk2EpLWdTP6@ep-dawn-pond-b4s9oozq-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require";

// Serverless Neon client (runs over HTTP/WebSocket, ultra-fast and serverless-friendly)
export const sql = neon(DATABASE_URL);

export interface DbTimetableEntry {
  entry_id: number;
  day_of_week: string;
  slot_label: string;
  period_kind: "class" | "break" | "lunch";
  start_time: string;
  end_time: string;
  sort_order: number;
  is_merged: boolean;
  short_code: string | null;
  display_title: string;
  course_code: string | null;
  subject_type: string | null;
  color_tone: "butter" | "coral" | "lilac" | "sage" | null;
  emoji: string | null;
  teacher_names: string;
  teacher_phones: string;
  teacher_whatsapps: string;
}

export interface DbTeacher {
  id: number;
  name: string;
  phone: string | null;
  whatsapp: string | null;
}

export interface DbTeamCredit {
  id: number;
  full_name: string;
  role: string;
  class_name: string;
}

/**
 * Fetch full weekly timetable ordered by Day (Mon-Fri) and Period slot
 */
export async function getFullTimetable(): Promise<DbTimetableEntry[]> {
  const rows = await sql`
    SELECT * FROM v_full_timetable
    ORDER BY 
      CASE day_of_week 
        WHEN 'Monday' THEN 1 
        WHEN 'Tuesday' THEN 2 
        WHEN 'Wednesday' THEN 3 
        WHEN 'Thursday' THEN 4 
        WHEN 'Friday' THEN 5 
        ELSE 6
      END, 
      sort_order;
  `;
  return rows as unknown as DbTimetableEntry[];
}

/**
 * Fetch timetable for a specific day of the week (e.g. 'Monday', 'mon')
 */
export async function getTimetableForDay(day: string): Promise<DbTimetableEntry[]> {
  const normalizedDay = day.trim().toLowerCase();
  const dayNameMap: Record<string, string> = {
    mon: "Monday",
    monday: "Monday",
    tue: "Tuesday",
    tuesday: "Tuesday",
    wed: "Wednesday",
    wednesday: "Wednesday",
    thu: "Thursday",
    thursday: "Thursday",
    fri: "Friday",
    friday: "Friday",
  };
  const targetDay = dayNameMap[normalizedDay] || day;

  const rows = await sql`
    SELECT * FROM v_full_timetable
    WHERE LOWER(day_of_week) = LOWER(${targetDay})
    ORDER BY sort_order;
  `;
  return rows as unknown as DbTimetableEntry[];
}

/**
 * Fetch all teachers and contact details from the database
 */
export async function getAllTeachers(): Promise<DbTeacher[]> {
  const rows = await sql`
    SELECT * FROM teachers ORDER BY id;
  `;
  return rows as unknown as DbTeacher[];
}

/**
 * Fetch student developers & team credits
 */
export async function getTeamCredits(): Promise<DbTeamCredit[]> {
  const rows = await sql`
    SELECT * FROM team_credits ORDER BY id;
  `;
  return rows as unknown as DbTeamCredit[];
}
