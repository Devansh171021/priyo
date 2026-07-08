import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, X, Play, Pause, MapPin, Heart, Lock, Target, Sparkles } from "lucide-react";
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

  const [aimingDay, setAimingDay] = useState<number | null>(null);
  const [openDay, setOpenDay] = useState<number | null>(null);
  const [shootingDay, setShootingDay] = useState<number | null>(null);
  const shotTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (shotTimerRef.current) window.clearTimeout(shotTimerRef.current);
    };
  }, []);

  const handleShootDay = (day: number) => {
    if ((!devBypass && !isDayUnlocked(day, now)) || shootingDay !== null || openDay !== null || aimingDay !== null) return;

    setShootingDay(day);
    playSuppressedShot();

    shotTimerRef.current = window.setTimeout(() => {
      setShootingDay(null);
      if (devBypass || isDayUnlocked(day, Date.now())) {
        setAimingDay(day);
      }
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
      {aimingDay !== null && (
        <ShootingRingModal
          day={aimingDay}
          onClose={() => setAimingDay(null)}
          onUnlock={() => {
            const unlockedDay = aimingDay;
            setAimingDay(null);
            setOpenDay(unlockedDay);
          }}
        />
      )}
      {openDay !== null && (devBypass || isDayUnlocked(openDay, now)) && (
        <DayModal day={openDay} onClose={() => setOpenDay(null)} />
      )}
    </div>
  );
}

// ---------- Waiting Room (pre-launch overlay) ----------
// ---------- Waiting Room (Ultra-Exciting Pre-Launch Experience) ----------
function WaitingRoom({
  days, hours, minutes, seconds, onBypass,
}: {
  days: number; hours: number; minutes: number; seconds: number; onBypass: () => void;
}) {
  const timer = useRef<number | null>(null);
  const [tapCount, setTapCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const start = () => { timer.current = window.setTimeout(onBypass, 2000); };
  const cancel = () => { if (timer.current) window.clearTimeout(timer.current); };

  const handleHeartClick = () => {
    playSuppressedShot();
    setIsShaking(true);
    setTapCount((c) => c + 1);
    setTimeout(() => setIsShaking(false), 450);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 overflow-y-auto select-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, oklch(0.24 0.05 25 / 0.92), oklch(0.16 0.04 22 / 0.98))",
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Floating Radar & Particle Background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[460px] w-[460px] rounded-full border border-dashed border-primary/20 animate-[spin_30s_linear_infinite] opacity-40" />
        <div className="absolute h-[620px] w-[620px] rounded-full border border-primary/10 animate-[spin_45s_linear_infinite_reverse] opacity-30" />
        <div className="absolute top-12 left-10 text-primary/30 animate-float-soft">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="absolute bottom-16 right-12 text-primary/30 animate-float-soft" style={{ animationDelay: "1.5s" }}>
          <Heart className="h-5 w-5" fill="currentColor" />
        </div>
        <div className="absolute top-1/4 right-8 text-primary/20 animate-pulse">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>

      <div className="glass-card animate-modal-in relative w-full max-w-md rounded-[2.5rem] px-5 py-8 sm:px-7 sm:py-10 text-center my-auto border border-primary/40 shadow-[0_0_80px_rgba(244,114,182,0.22)] backdrop-blur-2xl">
        {/* Top System Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-primary mb-6 sm:mb-8 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Project Anmona &middot; Armed &amp; Waiting
        </div>

        {/* Interactive Heart Lock (Tapping plays shot sound + shakes + increments counter!) */}
        <div className="relative mx-auto mb-6 sm:mb-8 w-fit">
          <button
            type="button"
            onMouseDown={start}
            onMouseUp={cancel}
            onMouseLeave={cancel}
            onTouchStart={start}
            onTouchEnd={cancel}
            onClick={handleHeartClick}
            className={
              "group relative mx-auto grid h-22 w-22 sm:h-24 sm:w-24 place-items-center rounded-full pearl-rose transition duration-200 cursor-pointer shadow-[0_0_40px_rgba(244,114,182,0.5)] " +
              (isShaking ? "animate-target-recoil scale-90" : "animate-float-soft hover:scale-105 active:scale-95")
            }
            aria-label="Locked — click to test aim, hold for Dev Access"
            title="Tap to test aim, hold for Dev Access"
          >
            <div className="absolute inset-2 rounded-full border border-primary-foreground/30 pointer-events-none" />
            <Heart className="h-10 w-10 sm:h-11 sm:w-11 text-primary-foreground group-hover:scale-110 transition animate-pulse" strokeWidth={1.4} fill="currentColor" />
            <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-background/95 backdrop-blur border border-primary/50 shadow-md transition group-hover:scale-110">
              <Lock className="h-4 w-4 text-primary" strokeWidth={2} />
            </span>
          </button>

          {/* Tap counter badge if tapped at least once */}
          {tapCount > 0 && (
            <span className="absolute -top-2 -left-2 grid h-6 min-w-[24px] px-1.5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-lg animate-bounce">
              {tapCount}x
            </span>
          )}
        </div>

        {/* Shimmering Countdown */}
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          Time until target unlock
        </p>
        <div className="mb-6 sm:mb-8 grid grid-cols-4 gap-2 sm:gap-3">
          {[
            { v: days, l: "Days" },
            { v: hours, l: "Hours" },
            { v: minutes, l: "Min" },
            { v: seconds, l: "Sec" },
          ].map((u) => (
            <div
              key={u.l}
              className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-background/70 py-3.5 backdrop-blur shadow-md transition hover:border-primary hover:scale-105"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-60" />
              <div className="display text-2xl sm:text-3xl font-medium tabular-nums text-espresso text-glow-rose">
                {String(u.v).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
                {u.l}
              </div>
            </div>
          ))}
        </div>

        {/* Copy */}
        <h1 className="display text-2xl sm:text-3xl font-semibold tracking-wide text-espresso text-glow-rose">
          Target Locked
        </h1>
        <p className="mt-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-primary font-semibold">
          Initiating &ldquo;Project Anmona&rdquo;
        </p>

        <p className="serif mt-4 text-[15px] sm:text-[16px] leading-relaxed italic text-foreground/90 max-h-[28vh] overflow-y-auto px-1">
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

        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          Sealed with love
          <span className="h-px w-8 bg-border" />
        </div>

        {/* Developer Access Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={onBypass}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/20 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary transition hover:bg-primary hover:text-primary-foreground active:scale-95 shadow-lg"
          >
            ⚡ Dev Access (Unlock All)
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Shooting Ring Target Bullseye Minigame Modal ----------
function ShootingRingModal({
  day, onClose, onUnlock,
}: {
  day: number;
  onClose: () => void;
  onUnlock: () => void;
}) {
  const [isHit, setIsHit] = useState(false);
  const content = getDayContent(day);

  const handleBullseyeHit = () => {
    if (isHit) return;
    setIsHit(true);
    playSuppressedShot();
    setTimeout(() => {
      onUnlock();
    }, 650);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 py-6 sm:px-6 backdrop-blur-xl animate-modal-in overflow-y-auto"
      style={{ background: "oklch(0.16 0.04 22 / 0.88)" }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-sm sm:max-w-md rounded-[2.5rem] glass-card p-6 sm:p-8 text-center my-auto border border-primary/40 shadow-[0_0_60px_rgba(244,114,182,0.25)]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-background/80 text-espresso backdrop-blur transition hover:bg-primary hover:text-primary-foreground active:scale-90 border border-border shadow-sm"
          aria-label="Close Target"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* Header */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary mb-3">
          <Target className="h-3 w-3 animate-pulse" /> Target {String(day).padStart(2, "0")} Ready
        </div>
        
        <h3 className="display text-2xl sm:text-3xl font-semibold italic text-espresso text-glow-rose line-clamp-1">
          {content?.title ?? `Day ${day}`}
        </h3>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {isHit ? "✦ Bullseye Confirmed · Unlocking ✦" : "Tap the Bullseye to unlock her letter"}
        </p>

        {/* Interactive Shooting Target Bullseye */}
        <div className="relative mx-auto mt-6 mb-6 flex h-64 w-64 sm:h-72 sm:w-72 items-center justify-center select-none">
          {/* Outer rotating dashed radar ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/35 animate-[spin_12s_linear_infinite]" />
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-6 rounded-full border border-primary/50 bg-primary/5 backdrop-blur-xs animate-pulse-rose" />

          {/* Radar crosshair lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="h-full w-px bg-primary/60" />
            <div className="w-full h-px bg-primary/60 absolute" />
          </div>

          {/* Inner ring */}
          <div className="absolute inset-14 rounded-full border-2 border-primary/60 bg-primary/10 shadow-[inset_0_0_20px_rgba(244,114,182,0.2)]" />

          {/* Shockwave Rings when hit */}
          {isHit && (
            <>
              <div className="absolute inset-16 rounded-full border-2 border-primary/90 bg-primary/30 animate-bullseye-ripple pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-primary/80 bg-primary/20 animate-bullseye-ripple-delay pointer-events-none" />
            </>
          )}

          {/* THE BULLSEYE CENTER BUTTON */}
          <button
            type="button"
            onClick={handleBullseyeHit}
            disabled={isHit}
            className={
              "group relative z-10 grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-full pearl-rose shadow-[0_0_45px_rgba(244,114,182,0.65)] transition duration-200 cursor-pointer " +
              (isHit ? "animate-target-recoil scale-95" : "hover:scale-105 active:scale-90")
            }
            aria-label="Aim and shoot Bullseye"
          >
            {/* inner ring inside bullseye */}
            <div className="absolute inset-2 rounded-full border border-primary-foreground/30 pointer-events-none" />

            {isHit ? (
              <div className="animate-bullet-hole grid place-items-center text-primary-foreground">
                <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 animate-pulse" />
              </div>
            ) : (
              <div className="grid place-items-center text-primary-foreground transition transform group-hover:scale-110">
                <Heart className="h-9 w-9 sm:h-10 sm:w-10 animate-pulse" fill="currentColor" strokeWidth={0.5} />
                <span className="absolute text-xs font-bold uppercase tracking-widest text-primary-foreground/90 mt-12 sm:mt-14 drop-shadow">
                  AIM
                </span>
              </div>
            )}
          </button>
        </div>

        <div className="text-[10px] uppercase tracking-[0.35em] text-primary/80 font-medium">
          {isHit ? "Unlocking memory..." : "Touch directly in the center of the heart"}
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
        "relative mx-auto min-h-screen w-full max-w-lg px-4 sm:px-5 pb-28 pt-10 sm:pt-14 transition-[filter,opacity] duration-500 " +
        (hidden ? "pointer-events-none select-none opacity-0 blur-sm" : "")
      }
      aria-hidden={hidden}
    >
      {devBypass && (
        <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 flex items-center gap-2 rounded-full border border-primary/50 bg-background/95 px-3.5 py-1.5 shadow-xl backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-primary">
            Dev Mode: All 30 Unlocked
          </span>
          <button
            onClick={onExitDev}
            className="ml-1 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition active:scale-90"
            title="Exit Dev Mode"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <header className="mb-8 sm:mb-10 text-center px-2">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">
          Project Anmona &middot; Day Map
        </p>
        <h2 className="display mt-2 sm:mt-3 text-3xl sm:text-4xl font-medium italic text-espresso text-glow-rose">
          The Journey Home
        </h2>
        <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
          <MapPin className="h-3 w-3 text-primary" /> {START_CITY}
          <span className="opacity-40">&rarr;</span> {END_CITY}
        </div>
      </header>

      <CityMarker name={START_CITY} tone="start" />

      <ol className="relative mx-auto mt-4 w-full">
        {/* Main Vertical Dotted Spine */}
        <div className="timeline-dotted pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2" />
        {nodes.map((n) => {
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

      <CityMarker name={END_CITY} tone="end" />
    </div>
  );
}

function CityMarker({ name, tone }: { name: string; tone: "start" | "end" }) {
  return (
    <div className="my-5 sm:my-6 flex flex-col items-center gap-2">
      <div
        className={
          "grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full shadow-lg border border-primary/30 " +
          (tone === "end" ? "pearl-rose animate-pulse-rose" : "pearl")
        }
      >
        <MapPin className={"h-4.5 w-4.5 sm:h-5 sm:w-5 " + (tone === "end" ? "text-primary-foreground" : "text-primary")} />
      </div>
      <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-semibold">
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
  const isCurrent = state === "current";

  return (
    <li
      className={
        "relative grid grid-cols-2 items-center py-4 sm:py-5 transition-opacity duration-500 " +
        (!isUnlocked ? "opacity-30 hover:opacity-45" : "opacity-100")
      }
    >
      {/* Thin Horizontal Spine Connector Line connecting center target to vertical spine */}
      <div
        className={
          "pointer-events-none absolute top-1/2 h-[1px] -translate-y-1/2 w-8 sm:w-10 border-t border-dashed transition-colors duration-300 " +
          (isLeft ? "left-1/2 border-primary/40" : "right-1/2 border-primary/40") +
          (isCurrent ? " !border-primary border-solid shadow-[0_0_8px_rgba(244,114,182,0.8)]" : "")
        }
      />

      <div className={isLeft ? "col-start-1 pr-6 sm:pr-8 text-right" : "col-start-2 pl-6 sm:pl-8 text-left"}>
        <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
          Day
        </div>
        <div
          className={
            "display text-3xl sm:text-4xl font-medium italic transition duration-300 " +
            (state === "locked"
              ? "text-espresso/40"
              : isCurrent
              ? "text-primary text-glow-rose font-bold sm:scale-105 inline-block"
              : "text-espresso")
          }
        >
          {String(n).padStart(2, "0")}
        </div>
        {content?.target && (
          <div
            className={
              "mt-1 text-[10px] sm:text-[11px] font-semibold tracking-[0.06em] line-clamp-1 " +
              (state === "locked"
                ? "text-muted-foreground/50"
                : isCurrent
                ? "text-primary font-bold"
                : "text-muted-foreground/90")
            }
          >
            {content.target.replace(/^Target\s*\d+:\s*/i, "")}
          </div>
        )}
      </div>

      <div className={isLeft ? "col-start-2 pl-6 sm:pl-8 relative flex items-center" : "col-start-1 pr-6 sm:pr-8 relative flex justify-end items-center"}>
        {/* Continuous Slow Pulsing Ring for Current Active Day */}
        {isCurrent && (
          <span
            className="pointer-events-none absolute h-20 w-20 sm:h-22 sm:w-22 rounded-full border-2 border-primary/50 animate-ping opacity-60"
            style={{ animationDuration: "2.8s" }}
          />
        )}

        <button
          type="button"
          disabled={disabled || !isUnlocked}
          onClick={onShoot}
          aria-label={`Open Day ${n}`}
          className={
            "group relative grid h-13 w-13 sm:h-14 sm:w-14 place-items-center rounded-full transition-all duration-300 " +
            (isShooting ? "animate-target-recoil scale-90 " : "") +
            (!isUnlocked
              ? "cursor-not-allowed border border-border/50 bg-background/40 text-muted-foreground/30"
              : isCurrent
              ? "pearl-rose animate-pulse cursor-pointer scale-105 hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(244,114,182,0.8)] border-2 border-primary"
              : "pearl cursor-pointer hover:scale-105 active:scale-90 shadow-md border border-primary/30")
          }
        >
          <span
            className={
              "pointer-events-none absolute inset-1.5 rounded-full border transition " +
              (!isUnlocked
                ? "border-border/30"
                : isCurrent
                ? "border-primary-foreground/40 animate-pulse"
                : "border-primary/20 group-hover:border-primary/40")
            }
          />

          {!isUnlocked ? (
            <Lock className="h-4 w-4 sm:h-4.5 sm:w-4.5 opacity-50" />
          ) : isShooting ? (
            <span className="animate-bullet-hole text-primary-foreground">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </span>
          ) : (
            <Target
              className={
                "h-5 w-5 sm:h-5.5 sm:w-5.5 transition duration-300 group-hover:scale-110 " +
                (isCurrent ? "text-primary-foreground animate-bounce" : "text-primary")
              }
            />
          )}

          <span className="absolute -inset-2 rounded-full sm:-inset-3" />
        </button>
      </div>
    </li>
  );
}

// ---------- Day Letter Modal ----------
// ---------- Zero-Config Auto Media Frame ----------
function AutoMediaFrame({ day, photoUrl }: { day: number; photoUrl?: string }) {
  const pad = String(day).padStart(2, "0");
  const candidates = useMemo(() => {
    if (photoUrl) return [photoUrl];
    return [
      `/media/day-${pad}.jpg`,
      `/media/day-${pad}.png`,
      `/media/day-${pad}.gif`,
      `/media/day-${pad}.mp4`,
      `/media/day-${day}.jpg`,
      `/media/day-${day}.png`,
      `/media/day-${day}.gif`,
      `/media/day-${day}.mp4`,
    ];
  }, [day, photoUrl]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [day, photoUrl]);

  const current = candidates[index];
  const isVideo = current ? /\.(mp4|webm|mov)$/i.test(current) : false;

  if (!current || index >= candidates.length) {
    return (
      <div
        className="flex h-full w-full items-center justify-center"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 20%, oklch(0.35 0.08 26), oklch(0.26 0.06 24) 60%, oklch(0.20 0.04 22))",
        }}
      >
        <div className="text-center text-primary/90 px-4">
          <Heart className="mx-auto h-7 w-7 text-primary animate-pulse" fill="currentColor" strokeWidth={0} />
          <div className="display mt-3 text-2xl italic text-espresso">Memory Photo · Day {day}</div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-1.5 leading-relaxed">
            Drop <span className="font-mono text-primary font-semibold">day-{pad}.jpg/.gif/.mp4</span><br />in <span className="font-mono text-primary/80">public/media/</span>
          </p>
        </div>
      </div>
    );
  }

  if (isVideo) {
    return (
      <video
        key={current}
        src={current}
        className="h-full w-full object-cover"
        controls
        autoPlay
        loop
        playsInline
        onError={() => setIndex((i) => i + 1)}
      />
    );
  }

  return (
    <img
      key={current}
      src={current}
      alt={`Day ${day} memory`}
      className="h-full w-full object-cover"
      onError={() => setIndex((i) => i + 1)}
    />
  );
}

// ---------- Zero-Config Auto Audio Player ----------
function AutoAudioPlayer({
  day, voiceNoteUrl, voiceNoteDurationSec,
}: {
  day: number;
  voiceNoteUrl?: string;
  voiceNoteDurationSec?: number;
}) {
  const pad = String(day).padStart(2, "0");
  const candidates = useMemo(() => {
    if (voiceNoteUrl) return [voiceNoteUrl];
    return [
      `/media/day-${pad}-voice.mp3`,
      `/media/day-${pad}-voice.m4a`,
      `/media/day-${pad}-voice.wav`,
      `/media/day-${day}-voice.mp3`,
    ];
  }, [day, voiceNoteUrl]);

  const [index, setIndex] = useState(0);
  const [availableUrl, setAvailableUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(voiceNoteDurationSec ?? 42);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIndex(0);
    setAvailableUrl(null);
    setPlaying(false);
  }, [day, voiceNoteUrl]);

  useEffect(() => {
    if (availableUrl || index >= candidates.length) return;
    const testUrl = candidates[index];
    const testAudio = new Audio(testUrl);
    
    const onLoaded = () => {
      if (testAudio.duration && !isNaN(testAudio.duration) && testAudio.duration !== Infinity) {
        setDuration(testAudio.duration);
      } else if (voiceNoteDurationSec) {
        setDuration(voiceNoteDurationSec);
      }
      setAvailableUrl(testUrl);
    };
    const onError = () => {
      setIndex((i) => i + 1);
    };

    testAudio.addEventListener("loadedmetadata", onLoaded);
    testAudio.addEventListener("canplaythrough", onLoaded);
    testAudio.addEventListener("error", onError);
    testAudio.load();

    return () => {
      testAudio.removeEventListener("loadedmetadata", onLoaded);
      testAudio.removeEventListener("canplaythrough", onLoaded);
      testAudio.removeEventListener("error", onError);
    };
  }, [index, candidates, availableUrl, voiceNoteDurationSec]);

  useEffect(() => {
    if (!availableUrl) return;
    audioRef.current = new Audio(availableUrl);
    const audio = audioRef.current;
    const updateTime = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onEnded = () => setPlaying(false);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [availableUrl]);

  const togglePlay = () => {
    if (!availableUrl || !audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  if (!availableUrl) return null;

  return (
    <div className="mx-6 mt-4 sm:mx-7 flex items-center gap-3.5 rounded-2xl border border-primary/30 bg-background/60 p-3.5 backdrop-blur shadow-sm">
      <button
        type="button"
        onClick={togglePlay}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full pearl-rose text-primary-foreground transition hover:brightness-105 active:scale-90 shadow-md"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          <span className="truncate">Voice note message</span>
          <span className="tabular-nums font-mono">
            {fmt((progress / 100) * duration)} / {fmt(duration)}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-border/80">
          <div
            className="h-full rounded-full bg-primary transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ---------- Day Letter Modal ----------
function DayModal({ day, onClose }: { day: number; onClose: () => void }) {
  const content = getDayContent(day);
  const hasAudio = Boolean(content?.voiceNoteUrl || content?.voiceNoteDurationSec);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto px-3 py-4 sm:px-4 sm:py-6 backdrop-blur-xl sm:items-center animate-modal-in"
      style={{ background: "oklch(0.15 0.04 22 / 0.85)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="paper-card animate-modal-slide-in relative w-full max-w-md overflow-hidden rounded-[2.2rem] my-auto border border-primary/40 shadow-[0_0_60px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-inset ring-white/10" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-background/90 text-espresso backdrop-blur transition hover:bg-primary hover:text-primary-foreground active:scale-90 border border-border shadow-md"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-between px-6 pt-6 sm:px-7 sm:pt-7 pr-16">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
            {content?.target ?? "A letter"}
          </span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-medium">
            Day {String(day).padStart(2, "0")} / 30
          </span>
        </div>

        {content?.title && (
          <div className="px-6 pt-3 sm:px-7 pr-14">
            <h3 className="display text-2xl sm:text-3xl font-semibold italic text-espresso text-glow-rose">
              {content.title}
            </h3>
          </div>
        )}

        <div
          className="mx-6 mt-4 sm:mx-7 overflow-hidden rounded-2xl shadow-[0_20px_40px_-24px_oklch(0.1_0.05_20/0.8)] border border-primary/25"
          style={{ aspectRatio: "4 / 5" }}
        >
          <AutoMediaFrame day={day} photoUrl={content?.photoUrl} />
        </div>

        <AutoAudioPlayer
          day={day}
          voiceNoteUrl={content?.voiceNoteUrl}
          voiceNoteDurationSec={content?.voiceNoteDurationSec}
        />

        <div className={"mx-6 mb-7 sm:mx-7 " + (hasAudio ? "mt-4" : "mt-5")}>
          <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-medium">
            <span className="h-px flex-1 bg-border" />
            Letter
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="max-h-[38vh] overflow-y-auto pr-2 pb-2">
            <p className="serif whitespace-pre-line text-[16px] sm:text-[17px] leading-[1.8] text-foreground/95">
              <span className="display float-left mr-2.5 text-5xl italic leading-[0.85] text-primary">
                {"“"}
              </span>
              {content?.letter ??
                "This day has not unlocked yet. Check back when the timer reaches midnight IST."}
            </p>
            <p className="serif mt-6 text-right text-[17px] italic text-primary font-medium">
              &mdash; yours, D
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
