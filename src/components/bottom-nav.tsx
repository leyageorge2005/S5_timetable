import { Link, useRouterState } from "@tanstack/react-router";
import { Home, CalendarDays, Bell, Settings } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/schedule", label: "Schedule", icon: CalendarDays },
  { to: "/countdown", label: "Countdown", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(env(safe-area-inset-bottom),0.75rem)]">
      <div className="pointer-events-auto mx-4 flex w-full max-w-md items-center justify-between rounded-full border border-border/60 bg-surface/95 p-1.5 shadow-[0_16px_40px_-16px_oklch(0.32_0.19_285_/_0.35)] backdrop-blur">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[12px] font-bold transition-all ${
                active
                  ? "bg-indigo-deep text-white shadow-[0_10px_20px_-10px_oklch(0.32_0.19_285_/_0.6)]"
                  : "text-ink-soft"
              }`}
            >
              <Icon className="h-[16px] w-[16px]" strokeWidth={2.4} />
              {active && <span>{label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
