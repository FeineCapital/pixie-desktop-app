import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Install Pixie",
    description: "Download and install Pixie on your Mac in under 30 seconds. No setup, no account required.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Hover anything",
    description: "Move your cursor over any element on your screen. Pixie automatically detects and outlines it.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M5 3l14 9-7 1-4 7L5 3z"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Click to capture",
    description: "One click creates a perfect screenshot. No cropping, no dragging, no shortcuts needed.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 14l2 2 4-4"/>
      </svg>
    ),
  },
];

export function Showcase() {
  return (
    <section id="showcase" style={{ width: "100%", maxWidth: "1080px", margin: "0 auto", padding: "96px 24px 96px" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
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
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            How it works
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          style={{ fontFamily: "Arial, sans-serif", fontSize: "48px", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          Three steps. Zero friction.
        </motion.h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.2)", letterSpacing: "0.02em" }}>{s.num}</span>
              <div style={{ color: "rgba(255,255,255,0.4)" }}>{s.icon}</div>
            </div>
            <div>
              <h3 style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>{s.title}</h3>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
