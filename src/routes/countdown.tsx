import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppShell } from "@/components/app-shell";
import { useNow } from "@/hooks/use-now";
import { computeNowState, currentDayKey, fmt12 } from "@/lib/schedule";
import { PERIOD_SLOTS } from "@/lib/timetable";
import { Bell, Coffee, UtensilsCrossed, Sun, Moon, Timer, BookOpen, Utensils } from "lucide-react";

export const Route = createFileRoute("/countdown")({
  head: () => ({
    meta: [
      { title: "Countdown · SJCET CSE-B" },
      { name: "description", content: "Live bell countdown for SJCET CSE-B." },
    ],
  }),
  component: CountdownPage,
});

function CountdownPage() {
  const now = useNow(1000);
  const state = useMemo(() => (now ? computeNowState(now) : null), [now]);

  if (!now || !state) {
    return (
      <AppShell>
        <div className="flex h-[50vh] items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo border-t-transparent" />
        </div>
      </AppShell>
    );
  }

  const dk = currentDayKey(now);
  const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  let targetMin = 0;
  let label = "";
  let subLabel = "";
  let startMin = 0;
  let icon = <Bell className="h-6 w-6 text-white" />;
  let cardBg = "bg-indigo-deep text-white";

  if (state.phase === "before-day") {
    targetMin = state.next.startMin;
    label = "Morning Bell";
    subLabel = "First class is starting soon";
    startMin = state.next.startMin - 30;
    icon = <Sun className="h-6 w-6 text-white" />;
    cardBg = "bg-gradient-to-br from-indigo to-indigo-deep text-white";
  } else if (state.phase === "in-class") {
    targetMin = state.current.endMin;
    label = state.current.subject || "Class period";
    subLabel = `Until this period (${state.current.label}) ends`;
    startMin = state.current.startMin;
    icon = <Timer className="h-6 w-6 text-white" />;
    cardBg = "bg-gradient-to-br from-indigo-deep to-indigo/90 text-white";
  } else if (state.phase === "break" || state.phase === "lunch") {
    targetMin = state.current.endMin;
    label = state.phase === "lunch" ? "Lunch break" : "Break time";
    subLabel = "Until break ends and next class starts";
    startMin = state.current.startMin;
    icon = state.phase === "lunch" ? <UtensilsCrossed className="h-6 w-6 text-white" /> : <Coffee className="h-6 w-6 text-white" />;
    cardBg = "bg-gradient-to-br from-lilac to-indigo-deep text-white";
  } else {
    // after-day or weekend
    const firstTomorrow = state.tomorrowSchedule?.find((x) => x.kind === "class");
    if (firstTomorrow) {
      let addedMinutes = 0;
      if (dk === "fri") {
        addedMinutes = 1440 * 2;
        label = "Monday's classes";
      } else if (dk === "sat") {
        addedMinutes = 1440;
        label = "Monday's classes";
      } else if (dk === "sun") {
        label = "Monday's classes";
      } else {
        label = "Tomorrow's classes";
      }
      subLabel = `Starts at ${firstTomorrow.start} (${firstTomorrow.subject || "First Class"})`;
      targetMin = 1440 + addedMinutes + firstTomorrow.startMin;
      startMin = nowMin;
      icon = <Moon className="h-6 w-6 text-white" />;
      cardBg = "bg-gradient-to-br from-indigo-deep to-slate-900 text-white";
    } else {
      label = "No classes upcoming";
      subLabel = "Enjoy your free time!";
    }
  }

  const totalSecondsLeft = Math.max(0, Math.floor((targetMin - nowMin) * 60));
  const hrs = Math.floor(totalSecondsLeft / 3600);
  const min = Math.floor((totalSecondsLeft % 3600) / 60);
  const sec = totalSecondsLeft % 60;

  const countdownStr = hrs > 0
    ? `${hrs}h ${min}m ${sec.toString().padStart(2, "0")}s`
    : `${min}:${sec.toString().padStart(2, "0")}`;

  const totalDurationSec = (targetMin - startMin) * 60;
  const elapsedSec = totalDurationSec - totalSecondsLeft;
  const progressPercent = totalDurationSec > 0 ? Math.min(100, Math.max(0, (elapsedSec / totalDurationSec) * 100)) : 100;

  return (
    <AppShell
      header={
        <header className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo">
            SJCET CSE-B ✦
          </p>
          <h1 className="mt-1 font-display text-[28px] font-bold text-ink">
            Bell Timer 🔔
          </h1>
        </header>
      }
    >
      <div className={`relative overflow-hidden rounded-[32px] ${cardBg} p-6 shadow-xl`}>
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-10" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur-md">
            {icon}
          </div>
          <div>
            <h2 className="font-display text-lg font-bold leading-tight tracking-wide">
              {label}
            </h2>
            <p className="text-[11px] font-medium text-white/80">
              {subLabel}
            </p>
          </div>
        </div>

        <div className="my-10 flex flex-col items-center justify-center text-center">
          <p className="font-display text-[48px] font-black tracking-tighter tabular-nums leading-none">
            {countdownStr}
          </p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            {hrs > 0 ? "time remaining" : "minutes & seconds left"}
          </p>
        </div>

        {hrs === 0 && targetMin > 0 && (
          <div className="mt-4 space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div 
                className="h-full rounded-full bg-white transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-white/60">
              <span>Start</span>
              <span>{Math.round(progressPercent)}% completed</span>
              <span>Bell 🔔</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-[28px] border border-border/60 bg-surface p-5">
        <h3 className="font-display text-[17px] font-bold text-ink text-center">
          College Bell Schedule ⏰
        </h3>
        <p className="mt-1 text-center text-xs text-ink-soft mb-5">
          Bell rings precisely at these period intervals
        </p>
        
        <div className="space-y-2.5">
          {(() => {
            const parseMin = (t: string) => {
              const [h, m] = t.split(":").map(Number);
              return h * 60 + m;
            };

            return PERIOD_SLOTS.map((slot) => {
              const isBreak = slot.kind === "break";
              const isLunch = slot.kind === "lunch";
              
              let icon = <BookOpen className="h-4.5 w-4.5" />;
              let labelText = slot.label;
              
              if (isBreak) {
                icon = <Coffee className="h-4.5 w-4.5" />;
                labelText = "Short Break ☕";
              } else if (isLunch) {
                icon = <Utensils className="h-4.5 w-4.5" />;
                labelText = "Lunch Break 🍱";
              } else {
                labelText = `Period ${slot.label}`;
              }

              const startM = parseMin(slot.start);
              const endM = parseMin(slot.end);
              const isActive =
                nowMin >= startM &&
                nowMin < endM &&
                state.phase !== "weekend" &&
                state.phase !== "after-day" &&
                state.phase !== "before-day";

              const isDone = nowMin >= endM && state.phase !== "weekend" && state.phase !== "before-day";

              return (
                <div
                  key={slot.id}
                  className={`flex items-center gap-3.5 rounded-[22px] border px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "border-transparent bg-indigo-deep text-white shadow-[0_16px_36px_-16px_oklch(0.32_0.19_285_/_0.55)] scale-[1.01]"
                      : isDone
                        ? "border-border/40 bg-surface/50 opacity-40"
                        : "border-border/60 bg-surface hover:border-indigo/25 dark:hover:border-lilac/25"
                  }`}
                >
                  {/* Left Icon with color tone */}
                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-lg font-bold transition duration-300 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : isBreak
                          ? "bg-mint text-emerald-700 dark:text-emerald-400"
                          : isLunch
                            ? "bg-butter text-amber-700 dark:text-amber-400"
                            : "bg-lilac-soft text-indigo-deep dark:bg-lilac-soft/10 dark:text-lilac"
                    }`}
                  >
                    {icon}
                  </div>

                  {/* Middle Text details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className={`text-[14px] font-bold ${isActive ? "text-white" : "text-ink"}`}>
                        {labelText}
                      </p>
                      {isActive && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 text-white px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider animate-pulse">
                          Active 📍
                        </span>
                      )}
                    </div>
                    <p className={`text-[11px] font-semibold mt-0.5 ${isActive ? "text-white/75" : "text-ink-soft"}`}>
                      {fmt12(slot.start)} – {fmt12(slot.end)}
                    </p>
                  </div>

                  {/* Right Badge */}
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider ${
                      isActive
                        ? "bg-white/20 text-white"
                        : isBreak || isLunch
                          ? "bg-muted/80 dark:bg-surface-2 text-ink-soft"
                          : "bg-indigo-deep/10 dark:bg-lilac-soft/20 text-indigo-deep dark:text-lilac"
                    }`}
                  >
                    {slot.kind}
                  </span>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </AppShell>
  );
}
