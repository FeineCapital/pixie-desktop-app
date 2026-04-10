import { motion } from "framer-motion";

const features = [
  {
    title: "Smart Element Detection",
    description: "Pixie uses AI to detect the exact boundary of any element on your screen.",
  },
  {
    title: "One Click Capture",
    description: "No dragging. No keyboard shortcuts. Just hover and click to get a pixel-perfect screenshot.",
  },
  {
    title: "Instant Save",
    description: "Screenshots save instantly to your clipboard or desktop, ready to paste or share immediately.",
  },
  {
    title: "Works Everywhere",
    description: "Works on any app, browser, or window on your Mac. Not just websites, anything on your screen.",
  },
  {
    title: "Zero Learning Curve",
    description: "If you can hover and click, you can use Pixie. It's that simple.",
  },
  {
    title: "Lightweight",
    description: "Pixie lives quietly in your menu bar and uses almost no memory or CPU when idle.",
  },
];

const shortcuts = [
  { keys: ["⌘", "⇧", "6"], label: "Click & capture" },
  { keys: ["⌘", "⇧", "7"], label: "Drag to select" },
  { keys: ["⌘", "⇧", "8"], label: "Full screen" },
  { keys: ["⌘", "C"], label: "Copy" },
  { keys: ["↵"], label: "Save" },
  { keys: ["Esc"], label: "Cancel" },
];

export function Features() {
  return (
    <section id="features" style={{ width: "100%", maxWidth: "1080px", margin: "0 auto", padding: "96px 24px" }}>
      <div style={{ marginBottom: "56px" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "100px", padding: "6px 14px 6px 10px", marginBottom: "20px",
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34D399" }} />
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Features</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          style={{ fontFamily: "Arial, sans-serif", fontSize: "48px", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          Built for speed and precision.
        </motion.h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "64px" }}>
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
          >
            <h3 style={{ fontFamily: "Arial, sans-serif", fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>{f.title}</h3>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{f.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          padding: "32px 36px",
        }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "100px", padding: "6px 14px 6px 10px", marginBottom: "24px",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34D399" }} />
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Keyboard Shortcuts</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px 24px" }}>
          {shortcuts.map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {s.keys.map((k, idx) => (
                  <kbd key={`${s.label}-${idx}`} style={{
                    fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 500, color: "#ffffff",
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px", padding: "4px 10px",
                  }}>{k}</kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
