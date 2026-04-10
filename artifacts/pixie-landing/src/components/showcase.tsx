import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function CaptureDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timings = [1800, 1200, 1000, 1400, 1800];
    let t: ReturnType<typeof setTimeout>;
    function advance(s: number) {
      t = setTimeout(() => {
        const next = (s + 1) % 5;
        setStep(next);
        advance(next);
      }, timings[s]);
    }
    advance(0);
    return () => clearTimeout(t);
  }, []);

  const isHovered = step >= 1;
  const isCaptured = step >= 2;
  const showToolbar = step >= 3;
  const isDone = step === 4;

  return (
    <div className="relative w-full max-w-2xl mx-auto select-none">
      <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl" style={{ background: '#16181f' }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]" style={{ background: '#111318' }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-8 h-5 bg-white/[0.06] rounded-full" />
        </div>

        <div className="relative p-8 min-h-[340px]" style={{ background: '#1a1d25' }}>
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            animate={{ opacity: isCaptured ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: 'rgba(0,0,0,0.45)' }}
          />

          <div className="space-y-3 mb-7">
            <div className="h-4 w-2/5 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
            <div className="h-3 w-full rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <div className="h-3 w-5/6 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>

          <motion.div
            className="relative rounded-xl p-6 z-20"
            animate={{
              boxShadow: isCaptured
                ? "0 0 0 2px rgba(0,230,118,0.8), 0 0 16px rgba(0,230,118,0.2)"
                : isHovered
                ? "0 0 0 2px rgba(0,230,118,0.6), 0 0 12px rgba(0,230,118,0.15)"
                : "0 0 0 1px rgba(255,255,255,0.06)",
              backgroundColor: isCaptured
                ? "rgba(0,230,118,0.06)"
                : isHovered
                ? "rgba(0,230,118,0.03)"
                : "rgba(255,255,255,0.02)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute -top-9 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-4 py-2 rounded-[10px] whitespace-nowrap z-30"
              style={{
                background: 'rgba(18,18,22,0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              }}
              animate={{ opacity: isHovered && !isCaptured ? 1 : 0, y: isHovered && !isCaptured ? 0 : 6 }}
              transition={{ duration: 0.2 }}
            >
              Click to capture
            </motion.div>

            <div className="h-3 w-1/2 rounded mb-3" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <div className="h-3 w-full rounded mb-2" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="h-3 w-4/5 rounded mb-5" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="h-9 w-28 rounded-full" style={{ background: 'linear-gradient(135deg, #065f46, #059669, #10b981)' }} />
          </motion.div>

          <div className="space-y-2 mt-6">
            <div className="h-3 w-3/4 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <div className="h-3 w-1/2 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>

          <motion.div
            className="absolute z-30 pointer-events-none"
            animate={{
              left: isCaptured ? "58%" : isHovered ? "52%" : "25%",
              top: isCaptured ? "58%" : isHovered ? "54%" : "18%",
              opacity: isDone ? 0 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="#111" strokeWidth="1.5">
              <path d="M5 3l14 9-7 1-4 7L5 3z" />
            </svg>
          </motion.div>

          {isCaptured && (
            <motion.div
              key={`ripple-${step}`}
              className="absolute z-30 pointer-events-none rounded-full"
              style={{ left: "calc(58% - 14px)", top: "calc(58% - 14px)", width: 28, height: 28, border: '2px solid rgba(0,230,118,0.6)' }}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}

          <motion.div
            className="absolute z-40 left-1/2 -translate-x-1/2 bottom-5 flex items-center gap-2 rounded-xl px-4 py-2.5 shadow-2xl"
            style={{
              background: 'rgba(10,11,22,0.96)',
              border: '1px solid rgba(0,230,118,0.2)',
              backdropFilter: 'blur(14px)',
            }}
            animate={{ opacity: showToolbar ? 1 : 0, y: showToolbar ? 0 : 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-1.5 rounded-md" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </div>
            <div className="p-1.5 rounded-md" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/></svg>
            </div>
            <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.09)' }} />
            <div className="flex gap-1.5">
              {["#ef4444","#facc15","#60a5fa","#00e676"].map(c => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.09)' }} />
            <motion.span
              className="text-xs font-semibold px-3 py-1 rounded-md"
              style={{ background: 'linear-gradient(135deg, #065f46, #059669)', color: '#fff' }}
              animate={{ scale: isDone ? [1, 1.08, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              Copy
            </motion.span>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-md"
              style={{ background: 'rgba(99,102,241,0.18)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              Save
            </span>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-5">
        {[1,2,3,4].map(i => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: step === i ? 20 : 6,
              height: 6,
              backgroundColor: step >= i ? "#00e676" : "rgba(255,255,255,0.1)",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

export function Showcase() {
  return (
    <section id="showcase" className="w-full px-6 md:px-8 py-24 md:py-36 flex flex-col items-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-4"
      >
        How it works
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground text-center mb-4 leading-tight"
      >
        Hover. Click. Done.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-muted-foreground text-lg text-center max-w-md mb-16"
      >
        No dragging, no cropping. Just hover over anything and click.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="w-full"
      >
        <CaptureDemo />
      </motion.div>
    </section>
  );
}
