export type PeriodKind = "class" | "break" | "lunch";

export interface PeriodSlot {
  id: string;
  kind: PeriodKind;
  label: string; // P1, Break, Lunch, etc.
  start: string; // "HH:MM" 24h
  end: string;
}

export const PERIOD_SLOTS: PeriodSlot[] = [
  { id: "p1", kind: "class", label: "P1", start: "09:00", end: "09:55" },
  { id: "p2", kind: "class", label: "P2", start: "09:55", end: "10:50" },
  { id: "b1", kind: "break", label: "Break", start: "10:50", end: "11:05" },
  { id: "p3", kind: "class", label: "P3", start: "11:05", end: "11:55" },
  { id: "p4", kind: "class", label: "P4", start: "11:55", end: "12:45" },
  { id: "lunch", kind: "lunch", label: "Lunch Break", start: "12:45", end: "13:35" },
  { id: "p5", kind: "class", label: "P5", start: "13:35", end: "14:30" },
  { id: "p6", kind: "class", label: "P6", start: "14:30", end: "15:25" },
  { id: "b2", kind: "break", label: "Break", start: "15:25", end: "15:40" },
  { id: "p7", kind: "class", label: "P7", start: "15:40", end: "16:30" },
];

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri";

export const DAY_ORDER: DayKey[] = ["mon", "tue", "wed", "thu", "fri"];
export const DAY_LABEL: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
};
export const DAY_SHORT: Record<DayKey, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
};

// Subject per class-period index (P1..P7 = 0..6)
export const TIMETABLE: Record<DayKey, string[]> = {
  mon: [
    "Microcontrollers",
    "Digital Signal Processing",
    "Digital Signal Processing",
    "Library",
    "Theory of Computation",
    "Microcontrollers",
    "Database Management Systems",
  ],
  tue: [
    "SNA / Cloud Computing",
    "Database Management Systems",
    "Microcontrollers",
    "Theory of Computation",
    "DSP Lab / DBMS Lab",
    "DSP Lab / DBMS Lab",
    "DSP Lab / DBMS Lab",
  ],
  wed: [
    "SNA / Cloud Computing",
    "Database Management Systems",
    "Theory of Computation",
    "Database Management Systems",
    "Placement Training",
    "Theory of Computation",
    "Activity / Association",
  ],
  thu: [
    "Digital Signal Processing",
    "SNA / Cloud Computing",
    "Microcontrollers",
    "SNA / Cloud Computing",
    "DSP Lab / DBMS Lab",
    "DSP Lab / DBMS Lab",
    "DSP Lab / DBMS Lab",
  ],
  fri: [
    "SNA / Cloud Computing",
    "Digital Signal Processing",
    "Microcontrollers",
    "Digital Signal Processing",
    "Database Management Systems",
    "Theory of Computation",
    "Placement Training",
  ],
};

// Subject visual tone (soft rotating palette).
const TONE_MAP: Record<string, string> = {
  "Microcontrollers": "butter",
  "Digital Signal Processing": "coral",
  "Theory of Computation": "lilac",
  "Database Management Systems": "sage",
  "SNA / Cloud Computing": "lilac",
  "Placement Training": "sage",
  "Library": "butter",
  "DSP Lab / DBMS Lab": "coral",
  "Activity / Association": "sage",
  // Fallbacks and legacy
  "Elective": "lilac",
  "Computer Networks": "coral",
  "Machine Learning": "sage",
  "Design and Analysis of Algorithms": "coral",
  "MC Project": "butter",
  "Lab": "coral",
  "Library / Mentoring": "butter",
  "MCI": "butter",
  "DSP": "coral",
  "TOC": "lilac",
  "DBMS": "sage",
  "SNA/CC": "lilac",
  "PLA": "sage",
};

export function subjectTone(subject: string): "coral" | "sage" | "butter" | "lilac" {
  return (TONE_MAP[subject] ?? "sage") as "coral" | "sage" | "butter" | "lilac";
}

export function subjectInitial(subject: string): string {
  const s = subject.replace(/[^A-Za-z]/g, "");
  return (s[0] ?? "?").toUpperCase();
}

export function subjectEmoji(subject: string): string {
  const map: Record<string, string> = {
    "Microcontrollers": "⚡",
    "Digital Signal Processing": "📡",
    "Theory of Computation": "🧩",
    "Database Management Systems": "🗄️",
    "SNA / Cloud Computing": "☁️",
    "Placement Training": "💼",
    "Library": "📖",
    "DSP Lab / DBMS Lab": "🧪",
    "Activity / Association": "🎉",
    "Elective": "🎨",
    "Computer Networks": "🌐",
    "Machine Learning": "🤖",
    "Design and Analysis of Algorithms": "🧩",
    "MC Project": "🚀",
    "Lab": "🧪",
    "Library / Mentoring": "📖",
    "MCI": "⚡",
    "DSP": "📡",
    "TOC": "🧩",
    "DBMS": "🗄️",
    "SNA/CC": "☁️",
    "PLA": "💼",
  };
  return map[subject] ?? "📚";
}
