import { motion } from "framer-motion";
import chromeLogo from "@assets/image_1775809932785.png";

function AppleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 8l3.5 3.5L13 4.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadHero() {
  return (
    <section style={{
      width: "100%",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "140px 24px 80px",
      textAlign: "center",
    }}>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "72px",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          marginBottom: "24px",
        }}
      >
        Download Pixie
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "17px",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.65,
          marginBottom: "48px",
          maxWidth: "480px",
        }}
      >
        Get the desktop app for Mac and the Chrome extension for precision web captures. Free to use, no account required.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", gap: "12px", alignItems: "center" }}
      >
        <a
          href="https://github.com/FeineCapital/pixie-desktop-app/releases/latest/download/Pixie.dmg"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            color: "#000000",
            background: "#ffffff",
            borderRadius: "12px",
            padding: "16px 32px",
            textDecoration: "none",
          }}
        >
          <AppleIcon size={16} />
          Download for Mac
        </a>
        <a
          href="https://github.com/FeineCapital/pixie-chrome-extension"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            color: "#ffffff",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "16px 32px",
            textDecoration: "none",
          }}
        >
          <img src={chromeLogo} alt="Chrome" style={{ width: "16px", height: "16px" }} />
          Chrome Extension
        </a>
      </motion.div>
    </section>
  );
}

function ChromeExtensionSection() {
  const features = [
    "Detects individual DOM elements on any web page",
    "Hover over buttons, images, cards — click to capture",
    "Works on any website, including complex web apps",
    "Lightweight — no performance impact on browsing",
  ];

  return (
    <section style={{
      width: "100%",
      maxWidth: "860px",
      margin: "0 auto",
      padding: "0 24px 120px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.03)",
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "36px",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "12px",
          letterSpacing: "-0.02em",
        }}>Chrome Extension</h2>
        <p style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "17px",
          color: "rgba(255,255,255,0.45)",
          marginBottom: "36px",
          maxWidth: "420px",
          lineHeight: 1.6,
        }}>
          Precision element-level capture for web pages. Hover over any DOM element and click to screenshot it perfectly.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start", marginBottom: "36px" }}>
          {features.map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Check />
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)" }}>{f}</span>
            </div>
          ))}
        </div>
        <a
          href="https://github.com/FeineCapital/pixie-chrome-extension"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "14px 28px",
            textDecoration: "none",
          }}
        >
          <img src={chromeLogo} alt="Chrome" style={{ width: "16px", height: "16px" }} />
          Get the Extension
        </a>
      </motion.div>
    </section>
  );
}

function DesktopAppSection() {
  const features = [
    "Three capture modes: hover, drag-to-select, and full screen",
    "Built-in annotation with pencil, eraser, and color picker",
    "Automatic clipboard copy — paste anywhere instantly",
    "Lives in your menu bar, always one shortcut away",
    "Retina-quality output on high-DPI displays",
    "Fully offline — nothing leaves your Mac",
  ];

  return (
    <section style={{
      width: "100%",
      maxWidth: "860px",
      margin: "0 auto",
      padding: "0 24px 120px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.03)",
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "36px",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "12px",
          letterSpacing: "-0.02em",
        }}>Desktop App for Mac</h2>
        <p style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "17px",
          color: "rgba(255,255,255,0.45)",
          marginBottom: "36px",
          maxWidth: "420px",
          lineHeight: 1.6,
        }}>
          OS-level window detection, keyboard shortcuts, and annotation tools. Capture anything on your screen in one click.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start", marginBottom: "36px" }}>
          {features.map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Check />
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)" }}>{f}</span>
            </div>
          ))}
        </div>
        <a
          href="https://github.com/FeineCapital/pixie-desktop-app/releases/latest/download/Pixie.dmg"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            color: "#000",
            background: "#ffffff",
            borderRadius: "12px",
            padding: "14px 28px",
            textDecoration: "none",
          }}
        >
          <AppleIcon size={16} />
          Download for Mac
        </a>
      </motion.div>
    </section>
  );
}

function BetterTogetherSection() {
  return (
    <section style={{
      width: "100%",
      maxWidth: "860px",
      margin: "0 auto",
      padding: "0 24px 140px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "42px",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "16px",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}
      >
        Download both. Cover everything.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "17px",
          color: "rgba(255,255,255,0.45)",
          marginBottom: "48px",
          maxWidth: "500px",
          lineHeight: 1.6,
        }}
      >
        Pixie comes in two parts — and you'll want both. Together they cover every screen, app, and web page you'll ever need to capture.
      </motion.p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", width: "100%", marginBottom: "40px" }}>
        {[
          {
            label: "Desktop App for Mac",
            desc: "Captures anything on your screen — windows, menus, dialogs, and native apps. Trigger with ⌘⇧6, ⌘⇧7, or ⌘⇧8. Lives in your menu bar, always one shortcut away. Nothing leaves your Mac.",
            cta: "Download for Mac",
            href: "https://github.com/FeineCapital/pixie-desktop-app/releases/latest/download/Pixie.dmg",
            icon: <AppleIcon size={15} />,
            dark: true,
          },
          {
            label: "Chrome Extension",
            desc: "Captures individual elements on any web page with DOM-level precision. Hover over a button, card, or image and click once — no dragging, no cropping, no noise.",
            cta: "Get the Extension",
            href: "https://github.com/FeineCapital/pixie-chrome-extension",
            icon: <img src={chromeLogo} alt="Chrome" style={{ width: "15px", height: "15px" }} />,
            dark: false,
          },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              padding: "32px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h3 style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>{item.label}</h3>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0, flexGrow: 1 }}>{item.desc}</p>
            <a
              href={item.href}
              target={item.dark ? undefined : "_blank"}
              rel={item.dark ? undefined : "noopener noreferrer"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: item.dark ? "#000" : "#fff",
                background: item.dark ? "#ffffff" : "transparent",
                border: item.dark ? "none" : "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "12px 20px",
                textDecoration: "none",
                alignSelf: "flex-start",
                marginTop: "4px",
              }}
            >
              {item.icon}
              {item.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function DownloadPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <DownloadHero />
      <ChromeExtensionSection />
      <DesktopAppSection />
      <BetterTogetherSection />
    </div>
  );
}
