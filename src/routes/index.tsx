import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, X, Play, Pause, MapPin, Heart, Lock } from "lucide-react";
import { END_CITY, getDayContent, START_CITY, type DayContent } from "@/data/days";
import { playSuppressedShot } from "@/lib/shotSound";
import {
  getCountdownParts,
  getNodeState,
  isDayUnlocked,
  LAUNCH_TARGET_MS,
  TOTAL_DAYS,
  useISTClock,
  type NodeState,
} from "@/lib/time";

const SHOT_ANIMATION_MS = 500;

export const Route = createFileRoute("/")({
  component: Index,
});

// ---------- Root ----------
function Index() {
  const now = useISTClock();
  const { days, hours, minutes, seconds, done } = useMemo(
    () => getCountdownParts(LAUNCH_TARGET_MS, now),
    [now],
  );
  const [devBypass, setDevBypass] = useState(false);
  const waitingRoomActive = !done && !devBypass;

  const [openDay, setOpenDay] = useState<number | null>(null);
  const [shootingDay, setShootingDay] = useState<number | null>(null);
  const shotTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (shotTimerRef.current) window.clearTimeout(shotTimerRef.current);
    };
  }, []);

  const handleShootDay = (day: number) => {
    if ((!devBypass && !isDayUnlocked(day, now)) || shootingDay !== null || openDay !== null) return;

    setShootingDay(day);
    playSuppressedShot();

    shotTimerRef.current = window.setTimeout(() => {
      setShootingDay(null);
      if (devBypass || isDayUnlocked(day, Date.now())) setOpenDay(day);
      shotTimerRef.current = null;
    }, SHOT_ANIMATION_MS);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <Dashboard
        now={now}
        devBypass={devBypass}
        shootingDay={shootingDay}
        onShoot={handleShootDay}
        onExitDev={() => setDevBypass(false)}
        hidden={waitingRoomActive}
      />
      {waitingRoomActive && (
        <WaitingRoom
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          onBypass={() => setDevBypass(true)}
        />
      )}
      {openDay !== null && (devBypass || isDayUnlocked(openDay, now)) && (
        <DayModal day={openDay} onClose={() => setOpenDay(null)} />
      )}
    </div>
  );
}

// ---------- Waiting Room (pre-launch overlay) ----------
function WaitingRoom({
  days, hours, minutes, seconds, onBypass,
}: {
  days: number; hours: number; minutes: number; seconds: number; onBypass: () => void;
}) {
  const timer = useRef<number | null>(null);
  const start = () => { timer.current = window.setTimeout(onBypass, 2000); };
  const cancel = () => { if (timer.current) window.clearTimeout(timer.current); };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5 py-8"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, oklch(0.97 0.03 60 / 0.7), oklch(0.93 0.04 40 / 0.85))",
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="glass-card animate-modal-in relative w-full max-w-md rounded-[2rem] px-6 py-10 text-center">
        {/* Heart lock */}
        <button
          onMouseDown={start}
          onMouseUp={cancel}
          onMouseLeave={cancel}
          onTouchStart={start}
          onTouchEnd={cancel}
          onClick={onBypass}
          className="animate-float-soft group relative mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full pearl-rose transition active:scale-95 cursor-pointer"
          aria-label="Locked — click or hold for Dev Access"
          title="Click or hold for Dev Access"
        >
          <Heart className="h-8 w-8 text-primary-foreground" strokeWidth={1.6} fill="currentColor" />
          <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-background/90 backdrop-blur border border-border">
            <Lock className="h-3 w-3 text-primary" strokeWidth={2} />
          </span>
        </button>

        {/* Countdown */}
        <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Time until unlock
        </p>
        <div className="mb-8 grid grid-cols-4 gap-2 sm:gap-3">
          {[
            { v: days, l: "Days" },
            { v: hours, l: "Hours" },
            { v: minutes, l: "Min" },
            { v: seconds, l: "Sec" },
          ].map((u) => (
            <div key={u.l} className="rounded-2xl border border-border/60 bg-background/60 py-3 backdrop-blur">
              <div className="display text-3xl font-medium tabular-nums text-espresso sm:text-4xl">
                {String(u.v).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
                {u.l}
              </div>
            </div>
          ))}
        </div>

        {/* Copy */}
        <h1 className="display text-2xl font-semibold tracking-wide text-espresso text-glow-rose sm:text-3xl">
          Target Locked
        </h1>
        <p className="mt-1 text-[11px] uppercase tracking-[0.4em] text-primary">
          Initiating &ldquo;Project 20&rdquo;
        </p>

        <p className="serif mt-6 text-[16px] leading-relaxed italic text-espresso/85 sm:text-[17px]">
          You didn&rsquo;t actually think I was just going to say
          &ldquo;Happy Birthday&rdquo; on August 14th and leave it at that,
          did you? You are stepping into your twenties, and a milestone like
          that requires a proper buildup. Hidden behind this screen is a
          30-day map. 30 days of memories, truths, and exactly why you are
          the best part of my life. But you are impatient, and I know
          you&rsquo;re already trying to figure out how to bypass this lock.
          Nice try. The first target unlocks exactly when this timer hits
          zero. Save this link to your home screen, get comfortable, and
          wait. The countdown to 20 is about to begin.
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          Sealed with love
          <span className="h-px w-8 bg-border" />
        </div>

        {/* Developer Access Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={onBypass}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary transition hover:bg-primary hover:text-primary-foreground active:scale-95 shadow-sm"
          >
            ⚡ Dev Access (Unlock All)
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Dashboard ----------
function Dashboard({
  now, devBypass, shootingDay, onShoot, onExitDev, hidden,
}: {
  now: number;
  devBypass: boolean;
  shootingDay: number | null;
  onShoot: (d: number) => void;
  onExitDev: () => void;
  hidden: boolean;
}) {
  const nodes = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);

  return (
    <div
      className={
        "relative mx-auto min-h-screen w-full max-w-lg px-5 pb-24 pt-12 transition-[filter,opacity] duration-500 " +
        (hidden ? "pointer-events-none select-none opacity-0 blur-sm" : "")
      }
      aria-hidden={hidden}
    >
      {devBypass && (
        <div className="fixed top-4 right-4 z-40 flex items-center gap-2 rounded-full border border-primary/40 bg-background/90 px-3.5 py-1.5 shadow-lg backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            Dev Mode: All 30 Unlocked
          </span>
          <button
            onClick={onExitDev}
            className="ml-1 rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition"
            title="Exit Dev Mode"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <header className="mb-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary">
          Project 20 &middot; Day Map
        </p>
        <h2 className="display mt-3 text-4xl font-medium italic text-espresso">
          The Journey Home
        </h2>
        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <MapPin className="h-3 w-3 text-primary" /> {END_CITY}
          <span className="opacity-40">&larr;</span> {START_CITY}
        </div>
      </header>

      <CityMarker name={END_CITY} tone="end" />

      <ol className="relative mx-auto mt-4 w-full">
        {/* dotted spine */}
        <div className="timeline-dotted pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2" />

        {nodes.slice().reverse().map((n) => {
          const state = devBypass ? "completed" : getNodeState(n, now);
          const side = n % 2 === 0 ? "left" : "right";
          const content = getDayContent(n);
          return (
            <Waypoint
              key={n}
              n={n}
              side={side}
              state={state}
              content={content}
              isShooting={shootingDay === n}
              disabled={shootingDay !== null}
              onShoot={() => {
                if (devBypass || isDayUnlocked(n, now)) onShoot(n);
              }}
            />
          );
        })}
      </ol>

      <CityMarker name={START_CITY} tone="start" />
    </div>
  );
}

function CityMarker({ name, tone }: { name: string; tone: "start" | "end" }) {
  return (
    <div className="my-6 flex flex-col items-center gap-2">
      <div
        className={
          "grid h-10 w-10 place-items-center rounded-full " +
          (tone === "end" ? "pearl-rose" : "pearl")
        }
      >
        <MapPin className={"h-4 w-4 " + (tone === "end" ? "text-primary-foreground" : "text-muted-foreground")} />
      </div>
      <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        {name}
      </div>
    </div>
  );
}

function Waypoint({
  n, side, state, content, isShooting, disabled, onShoot,
}: {
  n: number;
  side: "left" | "right";
  state: NodeState;
  content?: DayContent;
  isShooting: boolean;
  disabled: boolean;
  onShoot: () => void;
}) {
  const isUnlocked = state !== "locked";
  const isLeft = side === "left";
  return (
    <li className="relative grid grid-cols-2 items-center py-4">
      <div className={isLeft ? "col-start-1 pr-8 text-right" : "col-start-2 pl-8 text-left"}>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Day
        </div>
        <div
          className={
            "display text-3xl font-medium italic " +
            (state === "locked"
              ? "text-espresso/35"
              : state === "current"
              ? "text-primary text-glow-rose"
              : "text-espresso")
          }
        >
          {String(n).padStart(2, "0")}
        </div>
        {content?.target && (
          <div
            className={
              "mt-1 text-[11px] font-medium tracking-[0.05em] line-clamp-1 " +
              (state === "locked"
                ? "text-muted-foreground/60"
                : state === "current"
                ? "text-primary font-semibold"
                : "text-muted-foreground/90")
            }
          >
            {content.target.replace(/^Target\s*\d+:\s*/i, "")}
          </div>
        )}
      </div>

      <div className={isLeft ? "col-start-2 pl-8" : "col-start-1 pr-8 flex justify-end"}>
        <button
          type="button"
          onClick={onShoot}
          disabled={!isUnlocked || disabled}
          aria-label={`Day ${n} — ${state}${isShooting ? " — target hit" : ""}`}
          className={
            "relative grid h-12 w-12 place-items-center rounded-full transition-all duration-300 " +
            (state === "locked"
              ? "pearl cursor-not-allowed opacity-80"
              : state === "current"
              ? "pearl-rose animate-pulse-rose cursor-crosshair-target"
              : "pearl cursor-crosshair-target hover:scale-105") +
            (isShooting ? " animate-target-recoil" : "")
          }
        >
          {state === "locked" && <Lock className="h-3.5 w-3.5 text-muted-foreground/70" strokeWidth={1.5} />}
          {state === "current" && !isShooting && (
            <span className="display text-sm font-semibold text-primary-foreground">{n}</span>
          )}
          {state === "completed" && !isShooting && (
            <Check className="h-5 w-5 text-primary" strokeWidth={2.2} />
          )}

          {isShooting && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <span className="absolute inset-0 rounded-full border-2 border-espresso/50 animate-bullseye-ripple" />
              <span className="absolute inset-0 rounded-full border border-primary/45 animate-bullseye-ripple-delay" />
              <span className="absolute h-2.5 w-2.5 rounded-full bg-espresso shadow-[0_0_0_2px_oklch(0.28_0.035_40/0.25)] animate-bullet-hole" />
              <span className="absolute h-5 w-5 rounded-full ring-1 ring-espresso/30" />
            </span>
          )}
        </button>
      </div>
    </li>
  );
}

// ---------- Modal ----------
function DayModal({ day, onClose }: { day: number; onClose: () => void }) {
  const content = getDayContent(day);
  const hasAudio = Boolean(content?.voiceNoteUrl ?? content?.voiceNoteDurationSec);
  const voiceDurationSec = content?.voiceNoteDurationSec ?? 90;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.7)), 100);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto px-4 py-6 backdrop-blur-md sm:items-center animate-modal-in"
      style={{ background: "oklch(0.4 0.04 40 / 0.35)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="paper-card animate-modal-slide-in relative w-full max-w-md overflow-hidden rounded-[1.75rem]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* subtle paper texture edge */}
        <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/60" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-espresso backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            {content?.target ?? "A letter"}
          </span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary">
            Day {String(day).padStart(2, "0")} / 30
          </span>
        </div>

        {/* Title */}
        {content?.title && (
          <div className="px-6 pt-3">
            <h3 className="display text-2xl font-medium italic text-espresso">
              {content.title}
            </h3>
          </div>
        )}

        {/* Image — 4:5 */}
        <div
          className="mx-6 mt-4 overflow-hidden rounded-2xl shadow-[0_20px_40px_-24px_oklch(0.4_0.05_40/0.35)]"
          style={{ aspectRatio: "4 / 5" }}
        >
          {content?.photoUrl ? (
            <img
              src={content.photoUrl}
              alt={`Day ${day} memory`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background:
                  "radial-gradient(120% 90% at 30% 20%, oklch(0.94 0.05 60), oklch(0.88 0.06 40) 60%, oklch(0.82 0.08 40))",
              }}
            >
              <div className="text-center text-primary-foreground/90">
                <Heart className="mx-auto h-5 w-5" fill="currentColor" strokeWidth={0} />
                <div className="display mt-2 text-2xl italic">Photo · Day {day}</div>
              </div>
            </div>
          )}
        </div>

        {/* Conditional audio */}
        {hasAudio && (
          <div className="mx-6 mt-4 flex items-center gap-3 rounded-2xl border border-border/70 bg-ivory/60 p-3">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full pearl-rose text-primary-foreground transition hover:brightness-105"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            </button>
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="truncate">Voice note</span>
                <span className="tabular-nums">
                  {fmt((progress / 100) * voiceDurationSec)} / {fmt(voiceDurationSec)}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/70">
                <div
                  className="h-full rounded-full bg-primary transition-[width]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Letter */}
        <div className={"mx-6 mb-6 " + (hasAudio ? "mt-4" : "mt-5")}>
          <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            Letter
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="max-h-[38vh] overflow-y-auto pr-1">
            <p className="serif whitespace-pre-line text-[17px] leading-[1.75] text-espresso">
              <span className="display float-left mr-2 text-5xl italic leading-[0.9] text-primary">
                {"“"}
              </span>
              {content?.letter ??
                "This day has not unlocked yet. Check back when the timer reaches midnight IST."}
            </p>
            <p className="serif mt-5 text-right text-base italic text-primary">
              &mdash; yours,
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
