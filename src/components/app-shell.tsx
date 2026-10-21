import { useState, useEffect, type ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { currentDayKey, buildDaySchedule } from "@/lib/schedule";

interface AppShellProps {
  header?: ReactNode;
  children: ReactNode;
}

export function AppShell({ header, children }: AppShellProps) {
  useEffect(() => {
    // Schedule check every 30 seconds
    const checkSchedule = () => {
      if (typeof window === "undefined" || !("Notification" in window)) return;
      if (Notification.permission !== "granted") return;
      if (localStorage.getItem("sjcet_notifications_enabled") !== "true") return;

      const now = new Date();
      const dk = currentDayKey(now);
      if (dk === "sat" || dk === "sun") return;

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const schedule = buildDaySchedule(dk);

      for (const item of schedule) {
        if (item.kind !== "class") continue;
        const diff = item.startMin - currentMinutes;

        // If class starts in 10 minutes or less
        if (diff > 0 && diff <= 10) {
          const lastNotified = localStorage.getItem("sjcet_last_notified_class");
          if (lastNotified !== item.key) {
            new Notification(`${item.subject} starting soon! ⏰`, {
              body: `Class starts in ${Math.round(diff)} minutes (${item.start} – ${item.end})! 🧸✨`,
              icon: "/favicon.png",
            });
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              navigator.vibrate([100, 50, 100]);
            }
            localStorage.setItem("sjcet_last_notified_class", item.key);
          }
          break; // only notify for one upcoming class at a time
        }
      }
    };

    // Run check immediately on mount
    checkSchedule();

    const id = setInterval(checkSchedule, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const selectedTheme = localStorage.getItem("sjcet_theme") || "light";
    if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-32 pt-[max(env(safe-area-inset-top),1.25rem)]">
        {header}
        <main className="flex-1">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}

export function AppHeader({ day }: { day: string }) {
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
      })
    );
  }, []);

  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
          SJCET CSE-B
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">{day}</h1>
      </div>
      <div className="rounded-full border border-border/60 bg-surface px-3 py-1.5 text-[11px] font-medium text-ink-soft">
        {dateStr}
      </div>
    </header>
  );
}
