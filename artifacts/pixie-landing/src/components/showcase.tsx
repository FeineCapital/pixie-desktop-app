import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%",
      borderRadius: "14px",
      overflow: "hidden",
      background: "#1a1a1a",
      border: "1px solid rgba(255,255,255,0.06)",
      position: "relative",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px 14px",
        background: "#2a2a2a",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#28c840" }} />
        </div>
        <div style={{
          flex: 1,
          marginLeft: "6px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "6px",
          height: "22px",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
        }}>
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "Arial, sans-serif" }}>{url}</span>
        </div>
      </div>
      <div style={{ position: "relative", height: "380px", overflow: "hidden", background: "#fff" }}>
        {children}
      </div>
    </div>
  );
}

function Cursor({ x, y }: { x: string; y: string }) {
  return (
    <motion.div
      style={{ position: "absolute", zIndex: 40, pointerEvents: "none" }}
      animate={{ left: x, top: y }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
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
          style={{ position: "absolute", zIndex: 50, bottom: "14px", right: "14px", background: "#171717", borderRadius: "8px", padding: "6px 12px", display: "flex", alignItems: "center", gap: "6px" }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#34D399", fontFamily: "Arial, sans-serif" }}>Copied</span>
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
    0: { x: "55%", y: "14%" },
    1: { x: "12%", y: "58%" },
    2: { x: "12%", y: "58%" },
    3: { x: "12%", y: "58%" },
    4: { x: "55%", y: "14%" },
  };
  const pos = positions[step] || positions[0];

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: "52px", background: "#f7f8fa", borderRight: "1px solid #e3e8ee", padding: "14px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "5px", background: "#635bff" }} />
          <div style={{ width: "16px", height: "2px", borderRadius: "1px", background: "#d0d5dd" }} />
          <div style={{ width: "16px", height: "2px", borderRadius: "1px", background: "#d0d5dd" }} />
          <div style={{ width: "16px", height: "2px", borderRadius: "1px", background: "#d0d5dd" }} />
          <div style={{ width: "16px", height: "2px", borderRadius: "1px", background: "#d0d5dd" }} />
        </div>

        <div style={{ flex: 1, padding: "16px 20px", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <div>
              <div style={{ fontSize: "9px", color: "#697386", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "2px" }}>Total Revenue</div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#1a1f36", letterSpacing: "-0.02em" }}>$482,194.00</div>
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <div style={{ fontSize: "10px", color: "#fff", background: "#1a1f36", borderRadius: "5px", padding: "4px 10px", fontWeight: 600 }}>12M</div>
              <div style={{ fontSize: "10px", color: "#697386", background: "#f0f2f5", borderRadius: "5px", padding: "4px 10px" }}>30D</div>
              <div style={{ fontSize: "10px", color: "#697386", background: "#f0f2f5", borderRadius: "5px", padding: "4px 10px" }}>7D</div>
            </div>
          </div>

          <svg width="100%" height="80" viewBox="0 0 220 60" preserveAspectRatio="none" style={{ marginBottom: "14px" }}>
            <defs>
              <linearGradient id="stripeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#635bff" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#635bff" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0 55 L20 50 L40 46 L60 42 L80 38 L100 34 L120 30 L140 26 L160 20 L180 16 L200 12 L220 6" fill="none" stroke="#635bff" strokeWidth="2"/>
            <path d="M0 55 L20 50 L40 46 L60 42 L80 38 L100 34 L120 30 L140 26 L160 20 L180 16 L200 12 L220 6 L220 60 L0 60 Z" fill="url(#stripeGrad)"/>
          </svg>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            <motion.div
              animate={{
                boxShadow: hoveredCard
                  ? "0 0 0 2px #34D399, 0 2px 8px rgba(52,211,153,0.15)"
                  : "0 0 0 1px #e3e8ee",
              }}
              transition={{ duration: 0.25 }}
              style={{ borderRadius: "8px", background: "#fff", padding: "10px 12px" }}
            >
              <div style={{ fontSize: "9px", color: "#697386", marginBottom: "3px" }}>MRR</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#1a1f36" }}>$41,280</div>
              <div style={{ fontSize: "9px", color: "#0e6245", marginTop: "3px" }}>+12.4%</div>
            </motion.div>
            <div style={{ borderRadius: "8px", boxShadow: "0 0 0 1px #e3e8ee", background: "#fff", padding: "10px 12px" }}>
              <div style={{ fontSize: "9px", color: "#697386", marginBottom: "3px" }}>Customers</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#1a1f36" }}>3,847</div>
              <div style={{ fontSize: "9px", color: "#0e6245", marginTop: "3px" }}>+8.2%</div>
            </div>
            <div style={{ borderRadius: "8px", boxShadow: "0 0 0 1px #e3e8ee", background: "#fff", padding: "10px 12px" }}>
              <div style={{ fontSize: "9px", color: "#697386", marginBottom: "3px" }}>Churn</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#1a1f36" }}>1.8%</div>
              <div style={{ fontSize: "9px", color: "#697386", marginTop: "3px" }}>-0.3%</div>
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            {[
              { name: "Enterprise Plan", amount: "$2,400.00", status: "Succeeded" },
              { name: "Pro Monthly", amount: "$199.00", status: "Succeeded" },
              { name: "Starter Annual", amount: "$588.00", status: "Succeeded" },
            ].map((tx, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderTop: "1px solid #f2f5f9" }}>
                <div style={{ fontSize: "10px", fontWeight: 600, color: "#1a1f36" }}>{tx.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "9px", color: "#0e6245", background: "#edfcf2", borderRadius: "4px", padding: "2px 6px", fontWeight: 500 }}>{tx.status}</span>
                  <span style={{ fontSize: "10px", fontWeight: 600, color: "#1a1f36" }}>{tx.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 3, pointerEvents: "none" }}
        animate={{ opacity: captured ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <CopiedNotif show={showNotif} />
      <Cursor x={pos.x} y={pos.y} />
    </div>
  );
}

function DragSelectDashboard() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timings = [1600, 600, 1800, 500, 1400, 1200];
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

  const dragStart = step === 1;
  const dragging = step === 2;
  const captured = step === 3 || step === 4;
  const showNotif = step === 4;

  const cursorPositions: Record<number, { x: string; y: string }> = {
    0: { x: "50%", y: "12%" },
    1: { x: "4%", y: "18%" },
    2: { x: "65%", y: "70%" },
    3: { x: "65%", y: "70%" },
    4: { x: "65%", y: "70%" },
    5: { x: "50%", y: "12%" },
  };
  const pos = cursorPositions[step] || cursorPositions[0];

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ padding: "20px 24px", height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div>
            <div style={{ fontSize: "9px", color: "#697386", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "2px" }}>Total Revenue</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#1a1f36", letterSpacing: "-0.02em" }}>$482,194.00</div>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <div style={{ fontSize: "10px", color: "#fff", background: "#1a1f36", borderRadius: "5px", padding: "4px 10px", fontWeight: 600 }}>12M</div>
            <div style={{ fontSize: "10px", color: "#697386", background: "#f0f2f5", borderRadius: "5px", padding: "4px 10px" }}>30D</div>
          </div>
        </div>

        <svg width="100%" height="100" viewBox="0 0 220 60" preserveAspectRatio="none" style={{ marginBottom: "18px" }}>
          <defs>
            <linearGradient id="dragGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#635bff" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#635bff" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 55 L20 50 L40 46 L60 42 L80 38 L100 34 L120 30 L140 26 L160 20 L180 16 L200 12 L220 6" fill="none" stroke="#635bff" strokeWidth="2"/>
          <path d="M0 55 L20 50 L40 46 L60 42 L80 38 L100 34 L120 30 L140 26 L160 20 L180 16 L200 12 L220 6 L220 60 L0 60 Z" fill="url(#dragGrad)"/>
        </svg>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div style={{ borderRadius: "8px", boxShadow: "0 0 0 1px #e3e8ee", background: "#fff", padding: "12px 14px" }}>
            <div style={{ fontSize: "9px", color: "#697386", marginBottom: "3px" }}>Monthly Recurring Revenue</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a1f36" }}>$41,280</div>
            <div style={{ fontSize: "9px", color: "#0e6245", marginTop: "3px" }}>+12.4% vs last month</div>
          </div>
          <div style={{ borderRadius: "8px", boxShadow: "0 0 0 1px #e3e8ee", background: "#fff", padding: "12px 14px" }}>
            <div style={{ fontSize: "9px", color: "#697386", marginBottom: "3px" }}>Active Subscribers</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a1f36" }}>3,847</div>
            <div style={{ fontSize: "9px", color: "#0e6245", marginTop: "3px" }}>+8.2% vs last month</div>
          </div>
        </div>

        <div style={{ marginTop: "14px" }}>
          {[
            { name: "Enterprise Plan", amount: "$2,400.00", status: "Succeeded" },
            { name: "Pro Monthly", amount: "$199.00", status: "Succeeded" },
            { name: "Starter Annual", amount: "$588.00", status: "Succeeded" },
          ].map((tx, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderTop: "1px solid #f2f5f9" }}>
              <div style={{ fontSize: "10px", fontWeight: 600, color: "#1a1f36" }}>{tx.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "9px", color: "#0e6245", background: "#edfcf2", borderRadius: "4px", padding: "2px 6px", fontWeight: 500 }}>{tx.status}</span>
                <span style={{ fontSize: "10px", fontWeight: 600, color: "#1a1f36" }}>{tx.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {(dragStart || dragging) && (
          <motion.div
            style={{
              position: "absolute",
              zIndex: 30,
              pointerEvents: "none",
              border: "2px solid #34D399",
              borderRadius: "4px",
              background: "rgba(52,211,153,0.06)",
            }}
            initial={{ left: "4%", top: "18%", width: "0%", height: "0%" }}
            animate={{
              left: "4%",
              top: "18%",
              width: dragging ? "61%" : "0%",
              height: dragging ? "52%" : "0%",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: dragging ? 1.8 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      <motion.div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 3, pointerEvents: "none" }}
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>MAISON</div>
          <div style={{ display: "flex", gap: "18px" }}>
            {["New In", "Women", "Men", "Sale"].map(s => (
              <span key={s} style={{ fontSize: "9px", color: "#666", fontWeight: 500 }}>{s}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
          </div>
        </div>

        <div style={{
          height: "160px",
          background: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "6px" }}>Spring/Summer 2025</div>
            <div style={{ fontSize: "22px", fontWeight: 300, color: "#fff", letterSpacing: "0.06em" }}>New Collection</div>
            <div style={{ marginTop: "12px", fontSize: "9px", color: "#fff", background: "rgba(255,255,255,0.15)", borderRadius: "4px", padding: "4px 16px", display: "inline-block", fontWeight: 500 }}>Shop Now</div>
          </div>
        </div>

        <div style={{ padding: "14px 20px" }}>
          <div style={{ fontSize: "9px", color: "#999", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "10px" }}>Trending Now</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {[
              { name: "Wool Coat", price: "$285", color: "#c4a882" },
              { name: "Silk Blouse", price: "$165", color: "#d4bba8" },
              { name: "Linen Pants", price: "$120", color: "#a8b5c4" },
            ].map((item) => (
              <div key={item.name}>
                <div style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  borderRadius: "5px",
                  background: `linear-gradient(160deg, ${item.color}, ${item.color}aa)`,
                  marginBottom: "6px",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "6px",
                }}>
                  <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.3)", borderRadius: "1px" }} />
                </div>
                <div style={{ fontSize: "9px", fontWeight: 600, color: "#1a1a1a" }}>{item.name}</div>
                <div style={{ fontSize: "9px", color: "#999" }}>{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        style={{ position: "absolute", inset: "0", background: "rgba(0,0,0,0.3)", zIndex: 3, pointerEvents: "none" }}
        animate={{ opacity: captured ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />

      <AnimatePresence>
        {captured && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              zIndex: 30,
              pointerEvents: "none",
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
      desc: "Hover over any element, click, and copy. Pixie automatically detects UI boundaries.",
      keys: ["\u2318", "\u21E7", "6"],
      url: "dashboard.stripe.com",
      demo: <StripeDashboard />,
    },
    {
      title: "Drag to select",
      desc: "Click and drag to draw a precise selection around exactly what you need.",
      keys: ["\u2318", "\u21E7", "7"],
      url: "dashboard.stripe.com/revenue",
      demo: <DragSelectDashboard />,
    },
    {
      title: "Full screenshot",
      desc: "Capture your entire screen in one click. No cropping needed.",
      keys: ["\u2318", "\u21E7", "8"],
      url: "maison.com/new-collection",
      demo: <ClothingStore />,
    },
  ];

  return (
    <section id="showcase" style={{ width: "100%", padding: "0 24px 64px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "48px" }}
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

      <div style={{ display: "flex", flexDirection: "column", gap: "48px", maxWidth: "680px", width: "100%" }}>
        {modes.map((mode, i) => (
          <motion.div
            key={mode.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <BrowserChrome url={mode.url}>{mode.demo}</BrowserChrome>
            <div style={{ padding: "0 4px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <h3 style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#171717",
                  margin: 0,
                }}>
                  {mode.title}
                </h3>
                <div style={{ display: "flex", gap: "4px" }}>
                  {mode.keys.map((k, idx) => (
                    <kbd
                      key={idx}
                      style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "#171717",
                        background: "rgba(0,0,0,0.04)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "4px",
                        padding: "3px 8px",
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
                fontSize: "14px",
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
