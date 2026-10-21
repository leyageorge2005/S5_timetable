import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ScheduleRow } from "@/components/schedule-row";
import { useNow } from "@/hooks/use-now";
import { computeNowState, fmt12, type ScheduleItem } from "@/lib/schedule";
import { DAY_LABEL } from "@/lib/timetable";
import {
  niceTimeLeft,
  progressRingPath,
  subjectEmoji,
} from "@/lib/cute";
import {
  Coffee,
  UtensilsCrossed,
  Sun,
  Moon,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { SubjectDetailsModal } from "@/components/subject-details-modal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SJCET CSE-B Timetable" },
      {
        name: "description",
        content:
          "Live class schedule for SJCET CSE-B — know exactly what's happening right now.",
      },
      { property: "og:title", content: "SJCET CSE-B Timetable" },
      { property: "og:description", content: "Live class schedule for SJCET CSE-B." },
    ],
  }),
  component: Home,
});


function Home() {
  const now = useNow(1000);
  const state = useMemo(() => (now ? computeNowState(now) : null), [now]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);

  const handleSelectSubject = (name: string, key?: string) => {
    setSelectedSubject(name);
    setSelectedItemKey(key || null);
  };

  if (!now || !state) {
    return (
      <AppShell>
        <div className="flex h-[50vh] items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo border-t-transparent" />
        </div>
      </AppShell>
    );
  }

  const headerDay =
    state.phase === "weekend" ? "Weekend" : DAY_LABEL[state.day];
  const dateLabel = now.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
  });
  const timeLabel = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <AppShell
      header={
        <header className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo">
              SJCET CSE-B ✦
            </p>
            <h1 className="mt-1 truncate font-display text-[28px] font-bold leading-tight text-ink">
              {headerDay}
            </h1>
            <p className="text-xs font-medium text-ink-soft">
              {dateLabel} · {timeLabel}
            </p>
          </div>
          <div className="shrink-0 rounded-full bg-indigo-deep px-3 py-2 font-display text-sm font-bold text-white">
            {getGreetingEmoji(now)}
          </div>
        </header>
      }
    >
      {state.phase === "in-class" && (
        <InClass state={state} onSelectSubject={handleSelectSubject} />
      )}
      {(state.phase === "break" || state.phase === "lunch") && (
        <BreakBento state={state} onSelectSubject={handleSelectSubject} />
      )}
      {state.phase === "before-day" && (
        <BeforeDay state={state} onSelectSubject={handleSelectSubject} />
      )}
      {state.phase === "after-day" && (
        <AfterDay state={state} onSelectSubject={handleSelectSubject} />
      )}
      {state.phase === "weekend" && (
        <Weekend state={state} onSelectSubject={handleSelectSubject} />
      )}

      {state.phase !== "weekend" && state.phase !== "after-day" && (
        <TodaySchedule
          state={state}
          now={now}
          onSelectSubject={handleSelectSubject}
        />
      )}

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

function getGreetingEmoji(d: Date): string {
  const h = d.getHours();
  if (h < 12) return "🐣🌤️";
  if (h < 17) return "🐼🕶️";
  if (h < 20) return "🐱🌇";
  return "🧸💤";
}

/* -------------------------- Bento tiles -------------------------- */

function HeroCurrent({
  item,
  minutesLeft,
  progress,
  onClick,
}: {
  item: ScheduleItem;
  minutesLeft: number;
  progress: number;
  onClick?: () => void;
}) {
  const ring = progressRingPath(progress, 96, 9);
  return (
    <div
      onClick={onClick}
      className="relative col-span-3 overflow-hidden rounded-[28px] bg-indigo-deep p-5 text-white shadow-[0_20px_60px_-24px_oklch(0.32_0.19_285_/_0.7)] cursor-pointer hover:scale-[1.005] active:scale-[0.995] transition duration-200"
    >
      <div className="pointer-events-none absolute inset-0 bg-dots text-white/10" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5 blur-2xl" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> Happening now
          </span>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.05]">
            {item.subject}
          </h2>
          <p className="mt-1 text-xs font-medium text-white/75">
            {item.label} · {fmt12(item.start)} – {fmt12(item.end)}
          </p>
        </div>
        <div className="text-5xl leading-none">{subjectEmoji(item.subject)}</div>
      </div>

      <div className="relative mt-5 flex items-center gap-4">
        <div className="relative shrink-0" style={{ width: 96, height: 96 }}>
          <svg width={96} height={96} className="-rotate-90">
            <circle
              cx={ring.center}
              cy={ring.center}
              r={ring.r}
              stroke="oklch(1 0 0 / 0.18)"
              strokeWidth={ring.stroke}
              fill="none"
            />
            <circle
              cx={ring.center}
              cy={ring.center}
              r={ring.r}
              stroke="white"
              strokeWidth={ring.stroke}
              strokeLinecap="round"
              strokeDasharray={ring.c}
              strokeDashoffset={ring.offset}
              fill="none"
              className="transition-[stroke-dashoffset] duration-700"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-lg font-bold">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">
            Time left
          </p>
          <p className="font-display text-3xl font-bold leading-tight">
            {niceTimeLeft(minutesLeft)}
          </p>
          <p className="text-[11px] text-white/70">until the bell 🔔</p>
        </div>
      </div>
    </div>
  );
}

function NextUpTile({ item, onClick }: { item: ScheduleItem; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative col-span-2 overflow-hidden rounded-[24px] bg-lilac-soft p-4 cursor-pointer hover:scale-[1.005] active:scale-[0.995] transition duration-200"
    >
      <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-deep/70 dark:text-lilac/70">
        Up next
      </p>
      <div className="mt-1 flex items-start justify-between gap-2">
        <p className="font-display text-[17px] font-bold leading-tight text-indigo-deep dark:text-lilac">
          {item.subject}
        </p>
        <span className="text-2xl leading-none">{subjectEmoji(item.subject)}</span>
      </div>
      <p className="mt-2 text-[11px] font-medium text-indigo-deep/70 dark:text-lilac/70">
        {fmt12(item.start)} – {fmt12(item.end)}
      </p>
    </div>
  );
}

function StatTile({
  bg,
  label,
  value,
  sub,
  emoji,
  span = 1,
}: {
  bg: string;
  label: string;
  value: string;
  sub?: string;
  emoji?: string;
  span?: 1 | 2 | 3;
}) {
  const spanClass =
    span === 1 ? "col-span-1" : span === 2 ? "col-span-2" : "col-span-3";
  return (
    <div className={`${spanClass} rounded-[24px] ${bg} p-4`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
          {label}
        </p>
        {emoji && <span className="text-lg leading-none">{emoji}</span>}
      </div>
      <p className="mt-2 font-display text-2xl font-bold text-ink">{value}</p>
      {sub && <p className="mt-0.5 text-[11px] font-medium text-ink-soft">{sub}</p>}
    </div>
  );
}

function InClass({
  state,
  onSelectSubject,
}: {
  state: Extract<ReturnType<typeof computeNowState>, { phase: "in-class" }>;
  onSelectSubject: (name: string, key?: string) => void;
}) {
  const navigate = useNavigate();
  const remainingClasses = state.today.filter(
    (x) => x.kind === "class" && x.startMin > state.current.startMin,
  ).length;

  return (
    <section className="grid grid-cols-3 gap-3">
      <HeroCurrent
        item={state.current}
        minutesLeft={state.minutesLeft}
        progress={state.progress}
        onClick={() => navigate({ to: "/countdown" })}
      />
      {state.next ? (
        <NextUpTile
          item={state.next}
          onClick={() => onSelectSubject(state.next!.subject!, state.next!.key)}
        />
      ) : (
        <StatTile
          bg="bg-mint"
          label="Almost done"
          value="Last one"
          sub="No more after this ✌️"
          emoji="🎯"
          span={2}
        />
      )}
      <StatTile
        bg="bg-blush"
        label="Left today"
        value={`${remainingClasses}`}
        sub={remainingClasses === 1 ? "class to go" : "classes to go"}
        emoji="📚"
      />
    </section>
  );
}

function pickVibe(p: number): string {
  if (p < 0.25) return "Warmup 🐣";
  if (p < 0.6) return "Cruising 🦦";
  if (p < 0.9) return "Cooking 🚀";
  return "Freedom 🎉";
}
function pickVibeEmoji(p: number): string {
  if (p < 0.25) return "🌱";
  if (p < 0.6) return "🕶️";
  if (p < 0.9) return "🔥";
  return "🥳";
}

function BreakBento({
  state,
  onSelectSubject,
}: {
  state: Extract<
    ReturnType<typeof computeNowState>,
    { phase: "break" | "lunch" }
  >;
  onSelectSubject: (name: string, key?: string) => void;
}) {
  const navigate = useNavigate();
  const isLunch = state.phase === "lunch";
  const Icon = isLunch ? UtensilsCrossed : Coffee;
  return (
    <section className="grid grid-cols-3 gap-3">
      <div
        onClick={() => navigate({ to: "/countdown" })}
        className="relative col-span-3 overflow-hidden rounded-[28px] bg-indigo-deep p-5 text-white shadow-[0_20px_60px_-24px_oklch(0.32_0.19_285_/_0.7)] cursor-pointer hover:scale-[1.005] active:scale-[0.995] transition duration-200"
      >
        <div className="pointer-events-none absolute inset-0 bg-dots text-white/10" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              <Icon className="h-3 w-3" />{" "}
              {isLunch ? "Lunch time" : "Break time"}
            </span>
            <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.05]">
              Breathe. {niceTimeLeft(state.minutesUntilNext)} of peace.
            </h2>
            <p className="mt-2 text-xs text-white/75">
              Until {fmt12(state.current.end)}
            </p>
          </div>
          <div className="text-5xl">{isLunch ? "🐼🍱" : "🍩☕"}</div>
        </div>
      </div>
      {state.next && (
        <NextUpTile
          item={state.next}
          onClick={() => onSelectSubject(state.next!.subject!, state.next!.key)}
        />
      )}
      <StatTile
        bg="bg-butter"
        label="Starts in"
        value={niceTimeLeft(state.minutesUntilNext)}
        emoji="⏳"
      />
    </section>
  );
}

function BeforeDay({
  state,
  onSelectSubject,
}: {
  state: Extract<ReturnType<typeof computeNowState>, { phase: "before-day" }>;
  onSelectSubject: (name: string, key?: string) => void;
}) {
  const navigate = useNavigate();
  return (
    <section className="grid grid-cols-3 gap-3">
      <div
        onClick={() => navigate({ to: "/countdown" })}
        className="relative col-span-3 overflow-hidden rounded-[28px] bg-indigo-deep p-5 text-white shadow-[0_20px_60px_-24px_oklch(0.32_0.19_285_/_0.7)] cursor-pointer hover:scale-[1.005] active:scale-[0.995] transition duration-200"
      >
        <div className="pointer-events-none absolute inset-0 bg-dots text-white/10" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              <Sun className="h-3 w-3" /> Morning
            </span>
            <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.05]">
              First class in {niceTimeLeft(state.minutesUntilNext)}
            </h2>
            <p className="mt-2 text-xs text-white/75">
              You've got time. Grab chai ☕
            </p>
          </div>
          <div className="text-5xl">🐣🌤️</div>
        </div>
      </div>
      <NextUpTile
        item={state.next}
        onClick={() => onSelectSubject(state.next.subject!, state.next.key)}
      />
      <StatTile
        bg="bg-butter"
        label="Kicks off"
        value={fmt12(state.next.start)}
        emoji="🚀"
      />
    </section>
  );
}

function AfterDay({
  state,
  onSelectSubject,
}: {
  state: Extract<ReturnType<typeof computeNowState>, { phase: "after-day" }>;
  onSelectSubject: (name: string, key?: string) => void;
}) {
  const firstTomorrow = state.tomorrowSchedule.find((x) => x.kind === "class");
  return (
    <section className="grid grid-cols-3 gap-3">
      <div className="relative col-span-3 overflow-hidden rounded-[28px] bg-indigo-deep p-6 text-white shadow-[0_20px_60px_-24px_oklch(0.32_0.19_285_/_0.7)]">
        <div className="pointer-events-none absolute inset-0 bg-dots text-white/10" />
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              <Moon className="h-3 w-3" /> Wrapped
            </span>
            <h2 className="mt-3 font-display text-[30px] font-bold leading-[1.03]">
              Innathekk mathi 🧸✨
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Classes done. Go rest, superstar.
            </p>
          </div>
          <div className="text-5xl">🌙</div>
        </div>
      </div>

      {firstTomorrow && (
        <>
          <div className="col-span-3 mt-2 flex items-baseline justify-between">
            <h3 className="font-display text-lg font-bold text-ink">
              Tomorrow ✨
            </h3>
            <p className="text-[11px] font-semibold text-ink-soft">
              {state.tomorrow ? DAY_LABEL[state.tomorrow] : ""}
            </p>
          </div>
          <NextUpTile
            item={firstTomorrow}
            onClick={() => onSelectSubject(firstTomorrow.subject!, firstTomorrow.key)}
          />
          <StatTile
            bg="bg-butter"
            label="Starts at"
            value={fmt12(firstTomorrow.start)}
            emoji="⏰"
          />
          <div className="col-span-3 mt-2 space-y-2.5">
            {state.tomorrowSchedule.map((item) => (
              <ScheduleRow
                key={item.key}
                item={item}
                status="upcoming"
                onClick={
                  item.kind === "class"
                    ? () => onSelectSubject(item.subject!, item.key)
                    : undefined
                }
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function Weekend({
  state,
  onSelectSubject,
}: {
  state: Extract<ReturnType<typeof computeNowState>, { phase: "weekend" }>;
  onSelectSubject: (name: string, key?: string) => void;
}) {
  const firstTomorrow = state.tomorrowSchedule.find((x) => x.kind === "class");
  return (
    <section className="grid grid-cols-3 gap-3">
      <div className="relative col-span-3 overflow-hidden rounded-[28px] bg-indigo-deep p-6 text-white shadow-[0_20px_60px_-24px_oklch(0.32_0.19_285_/_0.7)]">
        <div className="pointer-events-none absolute inset-0 bg-dots text-white/10" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              Weekend
            </span>
            <h2 className="mt-3 font-display text-[28px] font-bold leading-[1.05]">
              No classes today.
              <br />
              Enjoy 🎈
            </h2>
          </div>
          <div className="text-5xl">🐼💤</div>
        </div>
      </div>
      {firstTomorrow && state.tomorrow && (
        <>
          <div className="col-span-3 mt-2 flex items-baseline justify-between">
            <h3 className="font-display text-lg font-bold text-ink">
              {DAY_LABEL[state.tomorrow]} coming up
            </h3>
          </div>
          <NextUpTile
            item={firstTomorrow}
            onClick={() => onSelectSubject(firstTomorrow.subject!, firstTomorrow.key)}
          />
          <StatTile
            bg="bg-butter"
            label="Kicks off"
            value={fmt12(firstTomorrow.start)}
            emoji="🎯"
          />
          <div className="col-span-3 mt-2 space-y-2.5">
            {state.tomorrowSchedule.map((item) => (
              <ScheduleRow
                key={item.key}
                item={item}
                status="upcoming"
                onClick={
                  item.kind === "class"
                    ? () => onSelectSubject(item.subject!, item.key)
                    : undefined
                }
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function TodaySchedule({
  state,
  now,
  onSelectSubject,
}: {
  state: Extract<
    ReturnType<typeof computeNowState>,
    { phase: "in-class" | "break" | "lunch" | "before-day" }
  >;
  now: Date;
  onSelectSubject: (name: string, key?: string) => void;
}) {
  const nowMin =
    now.getHours() * 60 + now.getMinutes();
  const total = state.today.filter((x) => x.kind === "class").length;
  const done = state.today.filter(
    (x) => x.kind === "class" && nowMin >= x.endMin,
  ).length;
  return (
    <section className="mt-8">
      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
        <h3 className="font-display text-xl font-bold text-ink">
          Today's flow
        </h3>
        <p className="shrink-0 rounded-full bg-lilac-soft px-2.5 py-1 text-[11px] font-bold text-indigo-deep">
          {done}/{total} done
        </p>
      </div>
      <div className="space-y-2.5">
        {state.today.map((item) => {
          let status: "done" | "current" | "upcoming" = "upcoming";
          if (nowMin >= item.endMin) status = "done";
          else if (nowMin >= item.startMin) status = "current";
          return (
            <ScheduleRow
              key={item.key}
              item={item}
              status={status}
              onClick={
                item.kind === "class"
                  ? () => onSelectSubject(item.subject!, item.key)
                  : undefined
              }
            />
          );
        })}
      </div>
      <p className="mt-6 text-center text-[11px] font-medium text-ink-soft">
        <ArrowUpRight className="mr-1 inline h-3 w-3" />
        Full week in the Schedule tab
      </p>
    </section>
  );
}
