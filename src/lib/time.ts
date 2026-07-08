import { useEffect, useState } from "react";

export const IST_TIMEZONE = "Asia/Kolkata";
export const TOTAL_DAYS = 30;

/** Day 1 launch: July 16, 2026 at 00:00:00 IST */
export const LAUNCH_TARGET_MS = Date.parse("2026-07-16T00:00:00+05:30");

/** Unlock instant for a timeline day (1–30), always 00:00:00 IST on that calendar day. */
export function getDayUnlockTimestamp(day: number): number {
  if (day < 1 || day > TOTAL_DAYS) {
    throw new RangeError(`Day must be between 1 and ${TOTAL_DAYS}, got ${day}`);
  }
  return LAUNCH_TARGET_MS + (day - 1) * 86_400_000;
}

export function isBeforeLaunch(now = Date.now()): boolean {
  return now < LAUNCH_TARGET_MS;
}

export function isDayUnlocked(day: number, now = Date.now()): boolean {
  return now >= getDayUnlockTimestamp(day);
}

/** Highest unlocked day (0 if launch has not started). */
export function getCurrentDay(now = Date.now()): number {
  if (isBeforeLaunch(now)) return 0;
  for (let day = TOTAL_DAYS; day >= 1; day--) {
    if (isDayUnlocked(day, now)) return day;
  }
  return 0;
}

export type NodeState = "locked" | "current" | "completed";

export function getNodeState(day: number, now = Date.now()): NodeState {
  if (!isDayUnlocked(day, now)) return "locked";
  const current = getCurrentDay(now);
  if (day === current) return "current";
  return "completed";
}

export function getCountdownParts(targetMs: number, now: number) {
  const diff = Math.max(0, targetMs - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    done: diff === 0,
  };
}

/** Ticks every second so countdown and unlock states stay in sync with IST boundaries. */
export function useISTClock() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}

/** Format an IST calendar date for display (optional helper). */
export function formatISTDate(ms: number): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIMEZONE,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(ms));
}
