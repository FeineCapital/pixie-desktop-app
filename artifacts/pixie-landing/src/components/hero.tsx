import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

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
    <div style={{ width: "100%", maxWidth: "720px", margin: "0 auto" }}>
      <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "#111" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0d0d0d" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
        </div>

        <div style={{ position: "relative", padding: "24px", minHeight: "240px", background: "#111", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <motion.div
            style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", padding: "16px", position: "relative" }}
            animate={{
              borderColor: isHovered && !isCaptured ? "rgba(52,211,153,0.5)" : isCaptured ? "rgba(52,211,153,0.8)" : "rgba(255,255,255,0.06)",
              boxShadow: isCaptured ? "0 0 20px rgba(52,211,153,0.15)" : isHovered ? "0 0 12px rgba(52,211,153,0.08)" : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Hover to capture</div>
            <div style={{ height: "8px", width: "80%", borderRadius: "4px", background: "rgba(255,255,255,0.08)", marginBottom: "8px" }} />
            <div style={{ height: "8px", width: "60%", borderRadius: "4px", background: "rgba(255,255,255,0.05)", marginBottom: "8px" }} />
            <div style={{ height: "8px", width: "70%", borderRadius: "4px", background: "rgba(255,255,255,0.05)" }} />

            <motion.div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "16px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#34D399",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5"><path d="M5 3l14 9-7 1-4 7L5 3z"/></svg>
              Click to capture
            </motion.div>
          </motion.div>

          <div style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", padding: "16px" }}>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>App element</div>
            <div style={{ height: "8px", width: "65%", borderRadius: "4px", background: "rgba(255,255,255,0.08)", marginBottom: "8px" }} />
            <div style={{ height: "8px", width: "90%", borderRadius: "4px", background: "rgba(255,255,255,0.05)", marginBottom: "8px" }} />
            <div style={{ height: "8px", width: "50%", borderRadius: "4px", background: "rgba(255,255,255,0.05)" }} />
          </div>

          <div style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", padding: "16px" }}>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Images</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              <div style={{ height: "32px", borderRadius: "4px", background: "rgba(255,255,255,0.05)" }} />
              <div style={{ height: "32px", borderRadius: "4px", background: "rgba(255,255,255,0.05)" }} />
            </div>
          </div>

          <div style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", padding: "16px" }}>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Text blocks</div>
            <div style={{ height: "8px", width: "90%", borderRadius: "4px", background: "rgba(255,255,255,0.05)", marginBottom: "6px" }} />
            <div style={{ height: "8px", width: "70%", borderRadius: "4px", background: "rgba(255,255,255,0.05)", marginBottom: "6px" }} />
            <div style={{ height: "8px", width: "80%", borderRadius: "4px", background: "rgba(255,255,255,0.05)" }} />
          </div>

          <motion.div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "10px",
              background: "rgba(10,10,10,0.96)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(14px)",
            }}
            animate={{ opacity: showToolbar ? 1 : 0, y: showToolbar ? 0 : 8 }}
            transition={{ duration: 0.3 }}
          >
            {["#ef4444","#facc15","#60a5fa","#34D399"].map(c => (
              <div key={c} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
            ))}
            <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />
            <motion.span
              style={{ fontSize: "11px", fontWeight: 700, color: "#000", background: "#fff", borderRadius: "6px", padding: "3px 10px" }}
              animate={{ scale: isDone ? [1, 1.08, 1] : 1 }}
            >Copy</motion.span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", padding: "3px 10px" }}>Save</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "120px 24px 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: "720px", width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.0 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "100px",
            padding: "6px 14px 6px 10px",
            marginBottom: "32px",
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34D399" }} />
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            AI powered screen capturing
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "Arial, sans-serif", fontSize: "64px", fontWeight: 700, color: "#ffffff", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "20px" }}
        >
          The easiest way to take screenshots on desktop
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "Arial, sans-serif", fontSize: "17px", fontWeight: 400, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: "36px", maxWidth: "520px" }}
        >
          Pixie makes screen capturing effortless. Hover over any element on your screen, click once, and capture it perfectly without dragging, cropping, or memorizing keyboard shortcuts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "56px" }}
        >
          <a
            href="https://github.com/FeineCapital/pixie-desktop-app/releases/latest/download/Pixie.dmg"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "15px",
              color: "#000", background: "#fff", borderRadius: "12px",
              padding: "14px 28px", textDecoration: "none",
            }}
          >
            <AppleIcon />
            Download for Mac
          </a>
          <a
            href="#showcase"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "15px",
              color: "#fff", background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px",
              padding: "14px 28px", textDecoration: "none",
            }}
          >
            How it works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%" }}
        >
          <CaptureDemo />
        </motion.div>
      </div>

      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: "800px", height: "600px",
        background: "radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
    </section>
  );
}
