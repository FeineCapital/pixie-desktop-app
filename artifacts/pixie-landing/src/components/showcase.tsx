import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%",
      borderRadius: "10px",
      overflow: "hidden",
      background: "#1a1a1a",
      border: "1px solid rgba(255,255,255,0.06)",
      position: "relative",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 10px",
        background: "#2a2a2a",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", gap: "4px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#28c840" }} />
        </div>
        <div style={{
          flex: 1,
          marginLeft: "4px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "4px",
          height: "16px",
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
        }}>
          <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.35)", fontFamily: "Arial, sans-serif" }}>{url}</span>
        </div>
      </div>
      <div style={{ position: "relative", height: "240px", overflow: "hidden", background: "#fff" }}>
        {children}
      </div>
    </div>
  );
}

function Cursor({ x, y }: { x: string; y: string }) {
  return (
    <motion.div
      className="absolute z-40 pointer-events-none"
      animate={{ left: x, top: y }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
        <path d="M4 2L4 17L7.5 13.5L10 19L12 18L9.5 12.5L14 12.5L4 2Z" fill="white" stroke="#555" strokeWidth="0.8" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  );
}

function CopiedNotif({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute z-50"
          style={{ bottom: "10px", right: "10px", background: "#171717", borderRadius: "6px", padding: "5px 10px", display: "flex", alignItems: "center", gap: "5px" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
          <span style={{ fontSize: "9px", fontWeight: 600, color: "#34D399" }}>Copied</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StripeDashboard() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timings = [1800, 1200, 600, 1600, 1200];
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

  const hoveredCard = step >= 1 && step <= 3;
  const captured = step >= 2 && step <= 3;
  const showNotif = step === 3;

  const positions: Record<number, { x: string; y: string }> = {
    0: { x: "60%", y: "20%" },
    1: { x: "20%", y: "35%" },
    2: { x: "20%", y: "35%" },
    3: { x: "20%", y: "35%" },
    4: { x: "60%", y: "20%" },
  };
  const pos = positions[step] || positions[0];

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: "42px", background: "#f7f8fa", borderRight: "1px solid #e3e8ee", padding: "10px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#635bff" }} />
          <div style={{ width: "14px", height: "2px", borderRadius: "1px", background: "#d0d5dd" }} />
          <div style={{ width: "14px", height: "2px", borderRadius: "1px", background: "#d0d5dd" }} />
          <div style={{ width: "14px", height: "2px", borderRadius: "1px", background: "#d0d5dd" }} />
          <div style={{ width: "14px", height: "2px", borderRadius: "1px", background: "#d0d5dd" }} />
        </div>

        <div style={{ flex: 1, padding: "12px 14px", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <div>
              <div style={{ fontSize: "7px", color: "#697386", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "1px" }}>Total Revenue</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a1f36", letterSpacing: "-0.02em" }}>$482,194.00</div>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              <div style={{ fontSize: "8px", color: "#fff", background: "#1a1f36", borderRadius: "4px", padding: "3px 8px", fontWeight: 600 }}>12M</div>
              <div style={{ fontSize: "8px", color: "#697386", background: "#f0f2f5", borderRadius: "4px", padding: "3px 8px" }}>30D</div>
              <div style={{ fontSize: "8px", color: "#697386", background: "#f0f2f5", borderRadius: "4px", padding: "3px 8px" }}>7D</div>
            </div>
          </div>

          <svg width="100%" height="60" viewBox="0 0 220 60" preserveAspectRatio="none" style={{ marginBottom: "10px" }}>
            <defs>
              <linearGradient id="stripeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#635bff" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#635bff" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0 55 L20 50 L40 46 L60 42 L80 38 L100 34 L120 30 L140 26 L160 20 L180 16 L200 12 L220 6" fill="none" stroke="#635bff" strokeWidth="2"/>
            <path d="M0 55 L20 50 L40 46 L60 42 L80 38 L100 34 L120 30 L140 26 L160 20 L180 16 L200 12 L220 6 L220 60 L0 60 Z" fill="url(#stripeGrad)"/>
          </svg>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
            <motion.div
              animate={{
                boxShadow: hoveredCard
                  ? "0 0 0 2px #34D399, 0 2px 8px rgba(52,211,153,0.15)"
                  : "0 0 0 1px #e3e8ee",
              }}
              transition={{ duration: 0.25 }}
              style={{ borderRadius: "6px", background: "#fff", padding: "8px 10px" }}
            >
              <div style={{ fontSize: "7px", color: "#697386", marginBottom: "2px" }}>MRR</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1f36" }}>$41,280</div>
              <div style={{ fontSize: "7px", color: "#0e6245", marginTop: "2px" }}>+12.4%</div>
            </motion.div>
            <div style={{ borderRadius: "6px", boxShadow: "0 0 0 1px #e3e8ee", background: "#fff", padding: "8px 10px" }}>
              <div style={{ fontSize: "7px", color: "#697386", marginBottom: "2px" }}>Customers</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1f36" }}>3,847</div>
              <div style={{ fontSize: "7px", color: "#0e6245", marginTop: "2px" }}>+8.2%</div>
            </div>
            <div style={{ borderRadius: "6px", boxShadow: "0 0 0 1px #e3e8ee", background: "#fff", padding: "8px 10px" }}>
              <div style={{ fontSize: "7px", color: "#697386", marginBottom: "2px" }}>Churn</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1f36" }}>1.8%</div>
              <div style={{ fontSize: "7px", color: "#697386", marginTop: "2px" }}>-0.3%</div>
            </div>
          </div>

          <div style={{ marginTop: "8px" }}>
            {[
              { name: "Enterprise Plan", amount: "$2,400.00", status: "Succeeded" },
              { name: "Pro Monthly", amount: "$199.00", status: "Succeeded" },
            ].map((tx, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderTop: "1px solid #f2f5f9" }}>
                <div>
                  <div style={{ fontSize: "8px", fontWeight: 600, color: "#1a1f36" }}>{tx.name}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "7px", color: "#0e6245", background: "#edfcf2", borderRadius: "3px", padding: "1px 5px", fontWeight: 500 }}>{tx.status}</span>
                  <span style={{ fontSize: "8px", fontWeight: 600, color: "#1a1f36" }}>{tx.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.3)", zIndex: 3 }}
        animate={{ opacity: captured ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <CopiedNotif show={showNotif} />
      <Cursor x={pos.x} y={pos.y} />
    </div>
  );
}

function NewsArticle() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timings = [1600, 800, 1400, 600, 1600, 1200];
    let t: ReturnType<typeof setTimeout>;
    function advance(s: number) {
      t = setTimeout(() => {
        const next = (s + 1) % 6;
        setStep(next);
        advance(next);
      }, timings[s]);
    }
    advance(0);
    return () => clearTimeout(t);
  }, []);

  const dragging = step >= 2 && step <= 3;
  const captured = step >= 3 && step <= 4;
  const showNotif = step === 4;

  const positions: Record<number, { x: string; y: string }> = {
    0: { x: "50%", y: "15%" },
    1: { x: "8%", y: "8%" },
    2: { x: "92%", y: "72%" },
    3: { x: "92%", y: "72%" },
    4: { x: "92%", y: "72%" },
    5: { x: "50%", y: "15%" },
  };
  const pos = positions[step] || positions[0];

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ padding: "14px 16px", height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#1a1f36", letterSpacing: "-0.01em" }}>The Chronicle</div>
          <div style={{ display: "flex", gap: "12px" }}>
            {["World", "Tech", "Science", "Culture"].map(s => (
              <span key={s} style={{ fontSize: "7px", color: "#697386" }}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "2px solid #1a1f36", paddingTop: "10px" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1f36", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: "6px" }}>
            The Future of Renewable Energy Is Closer Than We Think
          </div>
          <div style={{ fontSize: "7px", color: "#697386", marginBottom: "8px" }}>By Sarah Mitchell  |  December 14, 2024  |  8 min read</div>

          <div style={{
            width: "100%",
            height: "90px",
            borderRadius: "6px",
            overflow: "hidden",
            marginBottom: "8px",
            position: "relative",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                <rect x="0" y="60" width="30" height="40" fill="rgba(255,255,255,0.15)" rx="2"/>
                <rect x="35" y="45" width="30" height="55" fill="rgba(255,255,255,0.2)" rx="2"/>
                <rect x="70" y="50" width="30" height="50" fill="rgba(255,255,255,0.15)" rx="2"/>
                <rect x="105" y="30" width="30" height="70" fill="rgba(255,255,255,0.2)" rx="2"/>
                <rect x="140" y="35" width="30" height="65" fill="rgba(255,255,255,0.15)" rx="2"/>
                <rect x="175" y="20" width="30" height="80" fill="rgba(255,255,255,0.25)" rx="2"/>
                <rect x="210" y="25" width="30" height="75" fill="rgba(255,255,255,0.2)" rx="2"/>
                <rect x="245" y="10" width="30" height="90" fill="rgba(255,255,255,0.3)" rx="2"/>
                <circle cx="250" cy="20" r="12" fill="rgba(255,255,255,0.15)"/>
              </svg>
            </div>
            <div style={{ position: "absolute", bottom: "6px", left: "8px", fontSize: "7px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>Solar panel installations worldwide, 2024</div>
          </div>

          <div style={{ fontSize: "8px", color: "#4f566b", lineHeight: 1.6 }}>
            Recent breakthroughs in solar efficiency and battery storage have dramatically accelerated the timeline for global energy transition. Leading researchers now project that renewable sources could account for over 80% of electricity generation by 2035.
          </div>
        </div>
      </div>

      <AnimatePresence>
        {(step === 1 || dragging) && (
          <motion.div
            className="absolute z-30 pointer-events-none"
            style={{
              border: "2px solid #34D399",
              borderRadius: "4px",
              background: "rgba(52,211,153,0.06)",
            }}
            initial={{ left: "8%", top: "8%", width: "0%", height: "0%" }}
            animate={{
              left: "8%",
              top: "8%",
              width: dragging ? "84%" : "0%",
              height: dragging ? "64%" : "0%",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: dragging ? 1.4 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.3)", zIndex: 3 }}
        animate={{ opacity: captured ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <CopiedNotif show={showNotif} />
      <Cursor x={pos.x} y={pos.y} />
    </div>
  );
}

function ClothingStore() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timings = [2200, 500, 1800, 1400];
    let t: ReturnType<typeof setTimeout>;
    function advance(s: number) {
      t = setTimeout(() => {
        const next = (s + 1) % 4;
        setStep(next);
        advance(next);
      }, timings[s]);
    }
    advance(0);
    return () => clearTimeout(t);
  }, []);

  const captured = step >= 1 && step <= 2;
  const showNotif = step === 2;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a1a1a", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>MAISON</div>
          <div style={{ display: "flex", gap: "14px" }}>
            {["New In", "Women", "Men", "Sale"].map(s => (
              <span key={s} style={{ fontSize: "7px", color: "#666", fontWeight: 500 }}>{s}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
          </div>
        </div>

        <div style={{
          height: "110px",
          background: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "4px" }}>Spring/Summer 2025</div>
            <div style={{ fontSize: "16px", fontWeight: 300, color: "#fff", letterSpacing: "0.06em" }}>New Collection</div>
            <div style={{ marginTop: "8px", fontSize: "7px", color: "#fff", background: "rgba(255,255,255,0.15)", borderRadius: "3px", padding: "3px 12px", display: "inline-block", fontWeight: 500 }}>Shop Now</div>
          </div>
        </div>

        <div style={{ padding: "10px 16px" }}>
          <div style={{ fontSize: "7px", color: "#999", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "8px" }}>Trending Now</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {[
              { name: "Wool Coat", price: "$285", color: "#c4a882" },
              { name: "Silk Blouse", price: "$165", color: "#d4bba8" },
              { name: "Linen Pants", price: "$120", color: "#a8b5c4" },
            ].map((item) => (
              <div key={item.name}>
                <div style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  borderRadius: "4px",
                  background: `linear-gradient(160deg, ${item.color}, ${item.color}aa)`,
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "4px",
                }}>
                  <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.3)", borderRadius: "1px" }} />
                </div>
                <div style={{ fontSize: "7px", fontWeight: 600, color: "#1a1a1a" }}>{item.name}</div>
                <div style={{ fontSize: "7px", color: "#999" }}>{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ inset: "0", background: "rgba(0,0,0,0.3)", zIndex: 3 }}
        animate={{ opacity: captured ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />

      <AnimatePresence>
        {captured && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute z-30 pointer-events-none"
            style={{
              inset: "0",
              border: "3px solid #34D399",
            }}
          />
        )}
      </AnimatePresence>

      <CopiedNotif show={showNotif} />
    </div>
  );
}

export function Showcase() {
  const modes = [
    {
      title: "Click to capture",
      desc: "Hover over any element, click, and copy.",
      keys: ["\u2318", "\u21E7", "6"],
      url: "dashboard.stripe.com",
      demo: <StripeDashboard />,
    },
    {
      title: "Drag to select",
      desc: "Click and drag to draw a custom selection area.",
      keys: ["\u2318", "\u21E7", "7"],
      url: "thechronicle.com/article",
      demo: <NewsArticle />,
    },
    {
      title: "Full screenshot",
      desc: "Capture your entire screen in one click.",
      keys: ["\u2318", "\u21E7", "8"],
      url: "maison.com/new-collection",
      demo: <ClothingStore />,
    },
  ];

  return (
    <section id="showcase" className="w-full px-6 md:px-8 pt-0 pb-16 md:pb-24 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "36px" }}
      >
        <h2 style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "42px",
          fontWeight: 700,
          color: "#171717",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "14px",
        }}>
          Three ways to capture
        </h2>
        <p style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "15px",
          color: "rgba(0,0,0,0.45)",
          lineHeight: 1.6,
        }}>
          Every workflow covered. No dragging files, no cropping, no extra steps.
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", maxWidth: "960px", width: "100%" }}>
        {modes.map((mode, i) => (
          <motion.div
            key={mode.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <BrowserChrome url={mode.url}>{mode.demo}</BrowserChrome>
            <div style={{ padding: "0 2px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                <h3 style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#171717",
                  margin: 0,
                }}>
                  {mode.title}
                </h3>
                <div style={{ display: "flex", gap: "3px" }}>
                  {mode.keys.map((k, idx) => (
                    <kbd
                      key={idx}
                      style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "#171717",
                        background: "rgba(0,0,0,0.04)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "4px",
                        padding: "2px 6px",
                        display: "inline-block",
                      }}
                    >
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
              <p style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "13px",
                color: "rgba(0,0,0,0.4)",
                lineHeight: 1.5,
                margin: 0,
              }}>
                {mode.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
