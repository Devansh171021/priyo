let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

/** Short suppressed-shot click via Web Audio (no external asset). */
export function playSuppressedShot() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") void ctx.resume();

  const t = ctx.currentTime;
  const duration = 0.14;

  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.07));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(900, t);
  filter.frequency.exponentialRampToValueAtTime(180, t + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.32, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(t);
  noise.stop(t + duration);

  const click = ctx.createOscillator();
  click.type = "square";
  click.frequency.setValueAtTime(110, t);

  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(0.06, t);
  clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

  click.connect(clickGain);
  clickGain.connect(ctx.destination);
  click.start(t);
  click.stop(t + 0.025);
}
