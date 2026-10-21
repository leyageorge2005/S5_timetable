import {
  DAY_ORDER,
  PERIOD_SLOTS,
  TIMETABLE,
  type DayKey,
  type PeriodSlot,
} from "./timetable";

export interface ScheduleItem {
  key: string;
  kind: "class" | "break" | "lunch";
  subject?: string; // for classes
  label: string; // P1 or P1-P3 or Break / Lunch
  start: string; // HH:MM
  end: string;
  startMin: number;
  endMin: number;
  periodIndexes: number[]; // 0..6 (class periods only)
  isMerged: boolean;
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function fmt12(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = ((h + 11) % 12) + 1;
  return `${hr}:${m.toString().padStart(2, "0")} ${suffix}`;
}

// Subjects that when adjacent should be merged into a single block.
const MERGEABLE = new Set(["Lab", "DSP Lab / DBMS Lab"]);

export function buildDaySchedule(day: DayKey): ScheduleItem[] {
  const subjects = TIMETABLE[day];
  const items: ScheduleItem[] = [];

  // Assign class periods first
  const classSlots: { slot: PeriodSlot; idx: number }[] = [];
  let ci = 0;
  for (const slot of PERIOD_SLOTS) {
    if (slot.kind === "class") {
      classSlots.push({ slot, idx: ci });
      ci++;
    }
  }

  // Build in-order items, merging consecutive same-mergeable subjects
  let i = 0;
  const nonClassSlots = PERIOD_SLOTS;
  // We need to interleave breaks/lunch in the natural order of PERIOD_SLOTS.
  // Walk PERIOD_SLOTS; for class slots, look at TIMETABLE index.
  let classCursor = 0;
  while (i < nonClassSlots.length) {
    const slot = nonClassSlots[i];
    if (slot.kind !== "class") {
      items.push({
        key: `${day}-${slot.id}`,
        kind: slot.kind,
        label: slot.label,
        start: slot.start,
        end: slot.end,
        startMin: toMinutes(slot.start),
        endMin: toMinutes(slot.end),
        periodIndexes: [],
        isMerged: false,
      });
      i++;
      continue;
    }
    // class slot
    const subj = subjects[classCursor];
    // Try to merge forward with subsequent class slots (only if directly adjacent — no break between)
    let j = i;
    const indexes: number[] = [];
    let lastEnd = slot.end;
    let cursor = classCursor;
    while (j < nonClassSlots.length) {
      const s = nonClassSlots[j];
      if (s.kind !== "class") break;
      const sSubj = subjects[cursor];
      if (indexes.length === 0) {
        indexes.push(cursor);
        lastEnd = s.end;
        cursor++;
        j++;
        continue;
      }
      // continuation attempt
      if (MERGEABLE.has(subj) && sSubj === subj) {
        indexes.push(cursor);
        lastEnd = s.end;
        cursor++;
        j++;
      } else {
        break;
      }
    }
    const startSlot = slot;
    const merged = indexes.length > 1;
    items.push({
      key: `${day}-p${indexes[0] + 1}${merged ? `-p${indexes[indexes.length - 1] + 1}` : ""}`,
      kind: "class",
      subject: subj,
      label: merged
        ? `P${indexes[0] + 1}–P${indexes[indexes.length - 1] + 1}`
        : `P${indexes[0] + 1}`,
      start: startSlot.start,
      end: lastEnd,
      startMin: toMinutes(startSlot.start),
      endMin: toMinutes(lastEnd),
      periodIndexes: indexes,
      isMerged: merged,
    });
    classCursor = cursor;
    i = j;
  }

  return items;
}

export type NowState =
  | {
      phase: "before-day";
      day: DayKey;
      today: ScheduleItem[];
      next: ScheduleItem; // first class of today
      minutesUntilNext: number;
    }
  | {
      phase: "in-class";
      day: DayKey;
      today: ScheduleItem[];
      current: ScheduleItem;
      next?: ScheduleItem;
      minutesLeft: number;
      progress: number; // 0..1
    }
  | {
      phase: "break" | "lunch";
      day: DayKey;
      today: ScheduleItem[];
      current: ScheduleItem;
      next?: ScheduleItem;
      minutesUntilNext: number;
    }
  | {
      phase: "after-day";
      day: DayKey;
      today: ScheduleItem[];
      tomorrow?: DayKey;
      tomorrowSchedule: ScheduleItem[];
    }
  | {
      phase: "weekend";
      day: DayKey;
      today: ScheduleItem[]; // empty
      tomorrow?: DayKey;
      tomorrowSchedule: ScheduleItem[];
    };

export function currentDayKey(date: Date): DayKey | "sat" | "sun" {
  // 0 sun .. 6 sat
  const d = date.getDay();
  const map: Record<number, DayKey | "sat" | "sun"> = {
    0: "sun",
    1: "mon",
    2: "tue",
    3: "wed",
    4: "thu",
    5: "fri",
    6: "sat",
  };
  return map[d];
}

export function nextWeekdayKey(day: DayKey | "sat" | "sun"): DayKey {
  const order: (DayKey | "sat" | "sun")[] = [
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
  ];
  const idx = order.indexOf(day);
  for (let i = 1; i <= 7; i++) {
    const k = order[(idx + i) % 7];
    if (DAY_ORDER.includes(k as DayKey)) return k as DayKey;
  }
  return "mon";
}

export function computeNowState(date: Date): NowState {
  const dk = currentDayKey(date);
  const nowMin = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;

  if (dk === "sat" || dk === "sun") {
    const tomorrow = nextWeekdayKey(dk);
    return {
      phase: "weekend",
      day: "mon",
      today: [],
      tomorrow,
      tomorrowSchedule: buildDaySchedule(tomorrow),
    };
  }

  const today = buildDaySchedule(dk);
  const firstClass = today.find((x) => x.kind === "class")!;
  const lastItem = today[today.length - 1];

  if (nowMin < firstClass.startMin) {
    return {
      phase: "before-day",
      day: dk,
      today,
      next: firstClass,
      minutesUntilNext: Math.max(0, Math.ceil(firstClass.startMin - nowMin)),
    };
  }

  if (nowMin >= lastItem.endMin) {
    const tomorrow = nextWeekdayKey(dk);
    return {
      phase: "after-day",
      day: dk,
      today,
      tomorrow,
      tomorrowSchedule: buildDaySchedule(tomorrow),
    };
  }

  // find containing item
  const idx = today.findIndex((x) => nowMin >= x.startMin && nowMin < x.endMin);
  if (idx === -1) {
    // gap fallback - shouldn't happen
    return {
      phase: "after-day",
      day: dk,
      today,
      tomorrow: nextWeekdayKey(dk),
      tomorrowSchedule: buildDaySchedule(nextWeekdayKey(dk)),
    };
  }
  const current = today[idx];
  const nextClass = today.slice(idx + 1).find((x) => x.kind === "class");

  if (current.kind === "class") {
    const duration = current.endMin - current.startMin;
    const elapsed = nowMin - current.startMin;
    return {
      phase: "in-class",
      day: dk,
      today,
      current,
      next: nextClass,
      minutesLeft: Math.max(0, Math.ceil(current.endMin - nowMin)),
      progress: Math.min(1, Math.max(0, elapsed / duration)),
    };
  }
  return {
    phase: current.kind,
    day: dk,
    today,
    current,
    next: nextClass,
    minutesUntilNext: Math.max(0, Math.ceil(current.endMin - nowMin)),
  };
}
