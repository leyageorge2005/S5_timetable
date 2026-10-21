import type { ScheduleItem } from "@/lib/schedule";
import { fmt12 } from "@/lib/schedule";
import { subjectEmoji } from "@/lib/timetable";
import { Coffee, UtensilsCrossed, Check, Sparkles } from "lucide-react";

interface Props {
  item: ScheduleItem;
  status: "done" | "current" | "upcoming";
  onClick?: () => void;
}

export function ScheduleRow({ item, status, onClick }: Props) {
  if (item.kind === "break" || item.kind === "lunch") {
    const Icon = item.kind === "lunch" ? UtensilsCrossed : Coffee;
    const isCurrent = status === "current";
    return (
      <div
        className={`flex items-center gap-3 rounded-3xl border border-dashed px-4 py-3 ${
          isCurrent
            ? "border-indigo bg-lilac-soft"
            : "border-border bg-surface/60"
        } ${status === "done" ? "opacity-45" : ""}`}
      >
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${
            isCurrent ? "bg-indigo text-white" : "bg-muted text-ink-soft"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">
            {item.kind === "lunch" ? "Lunch Break 🍱" : "Chill Break ☕"}
          </p>
          <p className="text-[11px] text-ink-soft">
            {fmt12(item.start)} – {fmt12(item.end)}
          </p>
        </div>
        {isCurrent && (
          <span className="shrink-0 rounded-full bg-indigo-deep px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Now
          </span>
        )}
      </div>
    );
  }

  const isCurrent = status === "current";
  const isDone = status === "done";

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center gap-3 rounded-3xl border px-4 py-3.5 transition cursor-pointer hover:border-indigo/35 active:scale-[0.99] ${
        isCurrent
          ? "border-transparent bg-indigo-deep text-white shadow-[0_16px_40px_-16px_oklch(0.32_0.19_285_/_0.55)]"
          : "border-border bg-surface text-ink"
      } ${isDone ? "opacity-50" : ""}`}
    >
      <div
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-lg font-bold ${
          isCurrent
            ? "bg-white/15 text-white"
            : isDone
              ? "bg-mint text-ink"
              : "bg-lilac-soft text-indigo-deep"
        }`}
      >
        {isDone ? (
          <Check className="h-5 w-5" strokeWidth={2.6} />
        ) : (
          subjectEmoji(item.subject!)
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[15px] font-bold">{item.subject}</p>
          {item.isMerged && (
            <span
              className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                isCurrent ? "bg-white/20 text-white" : "bg-lilac-soft text-indigo-deep"
              }`}
            >
              Lab
            </span>
          )}
        </div>
        <p
          className={`mt-0.5 text-[11px] ${
            isCurrent ? "text-white/75" : "text-ink-soft"
          }`}
        >
          {item.label} · {fmt12(item.start)} – {fmt12(item.end)}
        </p>
      </div>
      {isCurrent && (
        <Sparkles className="h-4 w-4 shrink-0 text-white/80" />
      )}
    </div>
  );
}
