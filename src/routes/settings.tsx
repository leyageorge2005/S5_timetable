import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Info, Bell, Palette, Heart, Code2, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { SecretGames } from "@/components/secret-games";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · SJCET CSE-B" },
      { name: "description", content: "App preferences for SJCET CSE-B Timetable." },
    ],
  }),
  component: SettingsPage,
});

const rows = [
  { icon: Bell, label: "Class reminders", hint: "Soon ⏰", tone: "bg-blush" },
  { icon: Palette, label: "Appearance", hint: "System", tone: "bg-mint" },
  { icon: Heart, label: "Made for SJCET CSE-B", hint: "", tone: "bg-butter" },
  {
    icon: Code2,
    label: "Made by Codexora Studio",
    hint: "",
    tone: "bg-lilac-soft",
    href: "https://codexorastudio.vercel.app/",
  },
  { icon: Info, label: "About", hint: "v1.0", tone: "bg-surface-2" },
];

function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showGames, setShowGames] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  useEffect(() => {
    setNotificationsEnabled(
      localStorage.getItem("sjcet_notifications_enabled") === "true"
    );
    setTheme((localStorage.getItem("sjcet_theme") as any) || "light");
  }, []);

  const handleHeaderTap = () => {
    setTapCount((prev) => {
      const next = prev + 1;
      if (next >= 2) {
        setShowGames(true);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([80, 50, 80]);
        }
        return 0;
      }
      setTimeout(() => setTapCount(0), 800);
      return next;
    });
  };

  const applyTheme = (targetTheme: "light" | "dark") => {
    if (targetTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const changeTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("sjcet_theme", newTheme);
    applyTheme(newTheme);
  };

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notifications.");
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        localStorage.setItem("sjcet_notifications_enabled", "true");
        setNotificationsEnabled(true);
        new Notification("Class reminders active! 🔔", {
          body: "We will notify you 10 minutes before each class starts! 🧸✨",
          icon: "/favicon.png",
        });
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
      } else {
        alert(
          "Notification permissions denied. Please enable them in your browser settings."
        );
      }
    } else {
      localStorage.setItem("sjcet_notifications_enabled", "false");
      setNotificationsEnabled(false);
    }
  };

  return (
    <AppShell
      header={
        <header className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo">
            SJCET CSE-B ✦
          </p>
          <h1
            onClick={handleHeaderTap}
            className="mt-1 font-display text-[28px] font-bold text-ink cursor-pointer select-none active:scale-[0.97] transition inline-flex items-center gap-1"
          >
            Settings ⚙️
          </h1>
        </header>
      }
    >
      {showGames && <SecretGames onClose={() => setShowGames(false)} />}
      <div className="space-y-2.5">
        {rows.map((r) => {
          const isLink = !!r.href;
          const CardTag = isLink ? "a" : "div";
          const linkProps = isLink
            ? {
                href: r.href,
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "flex items-center gap-3 rounded-3xl border border-border/60 bg-surface px-4 py-3.5 no-underline hover:no-underline cursor-pointer transition active:scale-[0.99]",
              }
            : {
                className:
                  "flex items-center gap-3 rounded-3xl border border-border/60 bg-surface px-4 py-3.5",
              };

          return (
            <CardTag key={r.label} {...(linkProps as any)}>
              <div
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${r.tone} text-ink`}
              >
                <r.icon className="h-4 w-4" strokeWidth={2.4} />
              </div>
              <p className="min-w-0 flex-1 truncate text-sm font-bold text-ink no-underline">
                {r.label}
              </p>
              {r.label === "Class reminders" ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNotifications();
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notificationsEnabled ? "bg-indigo" : "bg-border/80"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notificationsEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              ) : r.label === "Appearance" ? (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="relative shrink-0 flex items-center bg-muted/60 dark:bg-surface-2 rounded-full p-0.75 border border-border/40 gap-0.5"
                >
                  <button
                    onClick={() => changeTheme("light")}
                    className={`rounded-full p-1.5 transition duration-200 active:scale-90 ${
                      theme === "light"
                        ? "bg-surface dark:bg-indigo-deep text-indigo dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                        : "text-ink-soft opacity-60 hover:opacity-100"
                    }`}
                    title="Light Mode"
                  >
                    <Sun className="h-4.5 w-4.5" strokeWidth={2.4} />
                  </button>
                  <button
                    onClick={() => changeTheme("dark")}
                    className={`rounded-full p-1.5 transition duration-200 active:scale-90 ${
                      theme === "dark"
                        ? "bg-indigo-deep text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                        : "text-ink-soft opacity-60 hover:opacity-100"
                    }`}
                    title="Dark Mode"
                  >
                    <Moon className="h-4.5 w-4.5" strokeWidth={2.4} />
                  </button>
                </div>
              ) : (
                <p className="shrink-0 text-[11px] font-semibold text-ink-soft">
                  {r.hint}
                </p>
              )}
            </CardTag>
          );
        })}
      </div>
    </AppShell>
  );
}
