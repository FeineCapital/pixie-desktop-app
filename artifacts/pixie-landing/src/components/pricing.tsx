import { motion } from "framer-motion";

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const freePlan = ["Hover-to-capture", "Full screen capture", "Annotation tools", "Copy to clipboard", "Save to Desktop", "Menu bar app"];
const proPlan = ["Everything in Free", "AI element detection", "Cloud history", "Custom shortcuts", "Team sharing", "Priority support"];

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 8l3.5 3.5L13 4.5" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" style={{ width: "100%", maxWidth: "1080px", margin: "0 auto", padding: "96px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Pricing</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          style={{ fontFamily: "Arial, sans-serif", fontSize: "48px", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          Simple pricing.
        </motion.h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", maxWidth: "720px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)", padding: "32px",
            display: "flex", flexDirection: "column",
          }}
        >
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "20px" }}>Free</span>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", marginBottom: "28px" }}>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "48px", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>$0</span>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>/ forever</span>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
            {freePlan.map(item => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Arial, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)" }}>
                <Check />{item}
              </li>
            ))}
          </ul>
          <a
            href="https://github.com/FeineCapital/pixie-desktop-app/releases/latest/download/Pixie.dmg"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "15px",
              color: "#fff", background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px",
              padding: "14px 28px", textDecoration: "none", width: "100%",
            }}
          >
            <AppleIcon />
            Download Free
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            borderRadius: "16px", border: "1px solid rgba(52,211,153,0.2)",
            background: "rgba(52,211,153,0.03)", padding: "32px",
            display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: "20px", right: "20px",
            fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: 600,
            color: "#34D399", background: "rgba(52,211,153,0.1)",
            border: "1px solid rgba(52,211,153,0.2)", borderRadius: "100px", padding: "4px 12px",
          }}>Coming soon</div>
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 600, color: "#34D399", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "20px" }}>Pro</span>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", marginBottom: "28px" }}>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "48px", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>$9</span>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>/ month</span>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
            {proPlan.map(item => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Arial, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)" }}>
                <Check />{item}
              </li>
            ))}
          </ul>
          <button style={{
            fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "15px",
            color: "#000", background: "#fff", borderRadius: "12px",
            padding: "14px 28px", border: "none", cursor: "pointer", width: "100%",
          }}>Join the waitlist</button>
        </motion.div>
      </div>
    </section>
  );
}
