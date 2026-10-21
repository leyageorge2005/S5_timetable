import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { ScheduleRow } from "@/components/schedule-row";
import { buildDaySchedule, currentDayKey } from "@/lib/schedule";
import { DAY_LABEL, DAY_ORDER, DAY_SHORT, type DayKey } from "@/lib/timetable";
import { SubjectDetailsModal } from "@/components/subject-details-modal";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule · SJCET CSE-B" },
      { name: "description", content: "Full weekly timetable for SJCET CSE-B." },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  const [day, setDay] = useState<DayKey>("mon");
  const [todayKey, setTodayKey] = useState<DayKey | "sat" | "sun" | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);

  useEffect(() => {
    const key = currentDayKey(new Date());
    setTodayKey(key);
    if (DAY_ORDER.includes(key as DayKey)) {
      setDay(key as DayKey);
    }
  }, []);
  const items = buildDaySchedule(day);
  const classCount = items.filter((x) => x.kind === "class").length;

  return (
    <AppShell
      header={
        <header className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo">
            SJCET CSE-B ✦
          </p>
          <h1 className="mt-1 font-display text-[28px] font-bold text-ink">
            The week 🗓️
          </h1>
        </header>
      }
    >
      <div className="no-scrollbar -mx-5 mb-5 flex gap-2 overflow-x-auto px-5">
        {DAY_ORDER.map((d) => {
          const active = d === day;
          const isToday = d === todayKey;
          return (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`relative shrink-0 rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
                active
                  ? "bg-indigo-deep text-white shadow-[0_10px_24px_-12px_oklch(0.32_0.19_285_/_0.6)]"
                  : "bg-surface text-ink-soft"
              }`}
            >
              {DAY_SHORT[d]}

            </button>
          );
        })}
      </div>

      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
        <h2 className="truncate font-display text-lg font-bold text-ink">
          {DAY_LABEL[day]}
        </h2>
        <p className="shrink-0 rounded-full bg-lilac-soft px-2.5 py-1 text-[11px] font-bold text-indigo-deep">
          {classCount} classes
        </p>
      </div>
      <div className="space-y-2.5">
        {items.map((item) => (
          <ScheduleRow
            key={item.key}
            item={item}
            status="upcoming"
            onClick={
              item.kind === "class"
                ? () => {
                    setSelectedSubject(item.subject!);
                    setSelectedItemKey(item.key);
                  }
                : undefined
            }
          />
        ))}
      </div>

      <SubjectDetailsModal
        subjectName={selectedSubject}
        itemKey={selectedItemKey}
        onClose={() => {
          setSelectedSubject(null);
          setSelectedItemKey(null);
        }}
      />
    </AppShell>
  );
}
