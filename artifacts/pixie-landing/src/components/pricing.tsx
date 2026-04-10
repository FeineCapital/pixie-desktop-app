import { motion } from "framer-motion";

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const planFeatures = [
  "Hover-to-capture",
  "Full screen capture",
  "Drag-to-select capture",
  "Pencil & eraser annotation",
  "Copy to clipboard",
  "Save to Desktop",
  "Menu bar app",
  "Chrome extension",
  "Automatic updates",
];

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 8l3.5 3.5L13 4.5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-36 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "52px",
          fontWeight: 700,
          color: "#171717",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "56px",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        Simple pricing. Start for free.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.08)",
          background: "rgba(0,0,0,0.02)",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "480px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", marginBottom: "8px" }}>
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "56px", fontWeight: 700, color: "#171717", lineHeight: 1 }}>$10</span>
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "15px", color: "rgba(0,0,0,0.4)", marginBottom: "8px" }}>/ month</span>
        </div>
        <p style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "rgba(0,0,0,0.4)", marginBottom: "32px" }}>
          Everything included. No tiers, no upsells.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px 0", display: "flex", flexDirection: "column", gap: "14px" }}>
          {planFeatures.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Arial, sans-serif", fontSize: "14px", color: "rgba(0,0,0,0.5)" }}>
              <Check />
              {item}
            </li>
          ))}
        </ul>
        <a
          href="https://github.com/FeineCapital/pixie-desktop-app/releases/latest/download/Pixie.dmg"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            color: "#ffffff",
            background: "#171717",
            borderRadius: "12px",
            padding: "16px 32px",
            textDecoration: "none",
            width: "100%",
          }}
        >
          <AppleIcon />
          Download Pixie
        </a>
      </motion.div>
    </section>
  );
}
