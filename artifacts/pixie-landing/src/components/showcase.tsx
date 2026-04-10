import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function StepChart({ values, height = 50 }: { values: number[]; height?: number }) {
  const max = Math.max(...values);
  const w = 200;
  const h = height;
  const step = w / (values.length - 1);
  let d = `M 0 ${h - (values[0] / max) * (h - 2)}`;
  for (let i = 1; i < values.length; i++) {
    const x = i * step;
    const y = h - (values[i] / max) * (h - 2);
    const prevX = (i - 1) * step;
    const prevY = h - (values[i - 1] / max) * (h - 2);
    d += ` L ${prevX} ${prevY} L ${x} ${y}`;
  }
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={d} fill="none" stroke="#7c3aed" strokeWidth="1.5" />
    </svg>
  );
}

const MRR_VALS = [1,1,1.2,1.2,1.5,1.5,1.8,1.8,2.2,2.2,2.8,2.8,3.2,3.2,3.8,3.8,4.2,4.2,4.8,4.8,5.2,5.2,5.6,5.9];
const ARR_VALS = [8,8,10,10,14,14,18,18,24,24,32,32,40,40,48,48,55,55,62,62,66,66,70,70.8];
const GROSS_VALS = [2,4,3,5,4,7,5,8,9,7,10,12,9,11,13,12,14,12,15,14,16,14,16,16];
const SUBS_VALS = [0,0,0,1,1,1,1,2,2,2,3,3,3,3,4,4,4,5,5,5];

function StripeDashboard({ isHovered, isCaptured }: { isHovered: boolean; isCaptured: boolean }) {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#f6f9fc", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "44px", background: "#fff", borderRight: "1px solid #e5e8eb", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "14px", gap: "14px" }}>
        <div style={{ width: "22px", height: "22px", marginBottom: "4px" }}>
          <svg viewBox="0 0 24 24" fill="#635bff"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
        </div>
        {[
          "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
          "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
          "M22 12h-4l-3 9L9 3l-3 9H2",
          "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
        ].map((d, i) => (
          <div key={i} style={{ width: "18px", height: "18px", opacity: 0.4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#425466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={d} />
            </svg>
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "14px 16px", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#0d1117", marginBottom: "5px" }}>Your overview</div>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span style={{ fontSize: "10px", color: "#697386" }}>Date range</span>
              {["All time", "Daily"].map(t => (
                <span key={t} style={{ fontSize: "10px", color: "#425466", border: "1px solid #d9dde8", borderRadius: "4px", padding: "1px 6px" }}>{t} ▾</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ fontSize: "10px", color: "#425466", border: "1px solid #d9dde8", borderRadius: "4px", padding: "2px 8px" }}>+ Add</span>
            <span style={{ fontSize: "10px", color: "#425466", border: "1px solid #d9dde8", borderRadius: "4px", padding: "2px 8px" }}>✎ Edit</span>
          </div>
        </div>

        {/* Top metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "7px", marginBottom: "7px" }}>
          {/* MRR — highlighted */}
          <motion.div
            style={{ borderRadius: "8px", background: "#fff", padding: "10px 12px", position: "relative", zIndex: 5 }}
            animate={{
              boxShadow: isCaptured || isHovered ? "0 0 0 2px #34D399" : "0 0 0 1px #e5e8eb",
            }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "9px", color: "#697386", fontWeight: 500 }}>MRR ⓘ</span>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#c4c9d4" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            </div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#0d1117", margin: "4px 0" }}>$5,899.96</div>
            <div style={{ height: "44px" }}><StepChart values={MRR_VALS} height={44} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>Feb 1</span>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>Apr 1</span>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>$0</span>
            </div>
            <div style={{ fontSize: "7px", color: "#c4c9d4", marginTop: "3px" }}>Updated 20 minutes ago</div>
          </motion.div>

          {/* ARR */}
          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e5e8eb", padding: "10px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "9px", color: "#697386", fontWeight: 500 }}>ARR ⓘ</span>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#c4c9d4" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            </div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#0d1117", margin: "4px 0" }}>$70,799.52</div>
            <div style={{ height: "44px" }}><StepChart values={ARR_VALS} height={44} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>Feb 1</span>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>Apr 1</span>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>$0</span>
            </div>
            <div style={{ fontSize: "7px", color: "#c4c9d4", marginTop: "3px" }}>Updated 20 minutes ago</div>
          </div>

          {/* Gross volume */}
          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e5e8eb", padding: "10px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "9px", color: "#697386", fontWeight: 500 }}>Gross volume ⓘ</span>
            </div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#0d1117", margin: "4px 0" }}>$16,099.84</div>
            <div style={{ height: "44px" }}><StepChart values={GROSS_VALS} height={44} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>Feb 1</span>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>Apr 1</span>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>$0</span>
            </div>
            <div style={{ fontSize: "7px", color: "#c4c9d4", marginTop: "3px" }}>Updated 20 minutes ago</div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "7px" }}>
          {/* Top customers */}
          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e5e8eb", padding: "10px 12px" }}>
            <div style={{ fontSize: "9px", fontWeight: 600, color: "#0d1117", marginBottom: "7px" }}>Top customers by spend ⓘ</div>
            {[
              { name: "Hectors Magic Carpet", amount: "$5,699.91" },
              { name: "Cars2Work Auto Repair", amount: "$2,999.96" },
              { name: "Bullitt County Auto", amount: "$2,500.00" },
              { name: "Xtreme Pressure Washing", amount: "$2,400.00" },
            ].map(c => (
              <div key={c.name} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderTop: "1px solid #f6f9fc" }}>
                <span style={{ fontSize: "8px", color: "#425466" }}>{c.name}</span>
                <span style={{ fontSize: "8px", fontWeight: 600, color: "#0d1117" }}>{c.amount}</span>
              </div>
            ))}
            <div style={{ fontSize: "7px", color: "#c4c9d4", marginTop: "5px" }}>Updated yesterday · <span style={{ color: "#7c3aed" }}>View all</span></div>
          </div>

          {/* Active subscribers */}
          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e5e8eb", padding: "10px 12px" }}>
            <div style={{ fontSize: "9px", fontWeight: 600, color: "#0d1117", marginBottom: "2px" }}>Active subscribers ⓘ</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#0d1117", marginBottom: "4px" }}>5</div>
            <div style={{ height: "54px" }}><StepChart values={SUBS_VALS} height={54} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>Feb 1</span>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>Apr 1</span>
            </div>
            <div style={{ fontSize: "7px", color: "#c4c9d4", marginTop: "3px" }}>Updated 20 minutes ago</div>
          </div>

          {/* New customers */}
          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e5e8eb", padding: "10px 12px" }}>
            <div style={{ fontSize: "9px", fontWeight: 600, color: "#0d1117", marginBottom: "2px" }}>New customers ⓘ</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#0d1117", marginBottom: "4px" }}>10</div>
            <svg width="100%" height="54" viewBox="0 0 200 54" preserveAspectRatio="none">
              {[[15,35],[45,54],[75,28],[105,48],[135,22],[165,42],[185,36]].map(([x, h], i) => (
                <rect key={i} x={x - 8} y={54 - h} width="16" height={h} fill="#7c3aed" opacity="0.65" rx="1" />
              ))}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>Feb 1</span>
              <span style={{ fontSize: "7px", color: "#c4c9d4" }}>Apr 1</span>
            </div>
            <div style={{ fontSize: "7px", color: "#c4c9d4", marginTop: "3px" }}>Updated 20 minutes ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatView({ showPasted, showSent }: { showPasted: boolean; showSent: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1d21", display: "flex", flexDirection: "column", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "10px", background: "#1a1d21" }}>
        <div style={{ width: "30px", height: "30px", borderRadius: "6px", background: "#4a154b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>S</span>
        </div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Sarah Chen</div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>● Active now</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: "16px 14px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "#4a154b", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff" }}>S</span>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>Sarah <span style={{ fontSize: "10px", fontWeight: 400, color: "rgba(255,255,255,0.35)" }}>10:42 AM</span></div>
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "0 10px 10px 10px", padding: "8px 12px", maxWidth: "260px" }}>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>Hey, can you drop me the MRR screenshot? Need it for the deck 🙏</div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showSent && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end", maxWidth: "280px" }}>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginBottom: "2px" }}>You · 10:43 AM</div>
                {/* Screenshot thumbnail */}
                <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "#fff", width: "220px" }}>
                  <div style={{ padding: "8px 10px", background: "#f6f9fc" }}>
                    <div style={{ fontSize: "7px", color: "#697386", marginBottom: "2px" }}>MRR ⓘ</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#0d1117", marginBottom: "4px" }}>$5,899.96</div>
                    <svg width="100%" height="28" viewBox="0 0 200 28" preserveAspectRatio="none">
                      <path d="M0 26 L8 24 L8 22 L24 22 L24 19 L40 19 L40 16 L56 16 L56 13 L72 13 L72 10 L88 10 L88 7 L104 7 L104 5 L120 5 L120 3 L200 3" fill="none" stroke="#7c3aed" strokeWidth="1.5"/>
                    </svg>
                    <div style={{ fontSize: "7px", color: "#c4c9d4", marginTop: "2px" }}>Updated 20 minutes ago</div>
                  </div>
                </div>
                <div style={{ background: "#007a5a", borderRadius: "10px 10px 2px 10px", padding: "8px 12px" }}>
                  <div style={{ fontSize: "13px", color: "#fff" }}>Here you go! Just grabbed it 📸</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "8px 10px", display: "flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.1)", minHeight: "38px" }}>
          <AnimatePresence>
            {showPasted && !showSent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                style={{ width: "42px", height: "28px", borderRadius: "4px", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <div style={{ width: "100%", height: "100%", background: "#f6f9fc", padding: "3px 4px", boxSizing: "border-box" }}>
                  <div style={{ fontSize: "5px", color: "#697386", marginBottom: "1px" }}>MRR</div>
                  <div style={{ fontSize: "8px", fontWeight: 700, color: "#0d1117" }}>$5,899</div>
                  <svg width="100%" height="8" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M0 9 L40 9 L40 7 L80 7 L80 4 L120 4 L120 2 L200 2" fill="none" stroke="#7c3aed" strokeWidth="2"/>
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <span style={{ fontSize: "12px", color: showPasted && !showSent ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)", flex: 1 }}>
            {showPasted && !showSent ? "Here you go! Just grabbed it 📸" : "Message Sarah Chen..."}
          </span>
          <AnimatePresence>
            {showPasted && !showSent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#007a5a", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CaptureDemo() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0 = idle (cursor far away)
  // 1 = hover on MRR card (green border)
  // 2 = captured (ripple + overlay)
  // 3 = "Copied" notification bottom-right
  // 4 = switch to chat, screenshot pasted in input
  // 5 = message sent
  useEffect(() => {
    const timings = [2000, 1400, 800, 1200, 1400, 2200];
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

  const isHovered = step >= 1;
  const isCaptured = step >= 2;
  const showCopied = step === 3;
  const showChat = step >= 4;
  const showPasted = step >= 4;
  const showSent = step >= 5;

  return (
    <div className="relative w-full max-w-4xl mx-auto select-none">
      <div className="overflow-hidden" style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "#111111" }}>
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#1a1a1a" }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-6 flex items-center justify-center h-6 rounded-md" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>
                {showChat ? "messages.slack.com" : "dashboard.stripe.com"}
              </span>
            </div>
          </div>
          <div style={{ width: "48px" }} />
        </div>

        {/* Content */}
        <div className="relative" style={{ height: "560px", overflow: "hidden" }}>
          {/* Stripe dashboard */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: showChat ? 0 : 1, x: showChat ? -30 : 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <StripeDashboard isHovered={isHovered} isCaptured={isCaptured} />
          </motion.div>

          {/* Chat view */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: showChat ? 1 : 0, x: showChat ? 0 : 30 }}
            initial={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChatView showPasted={showPasted} showSent={showSent} />
          </motion.div>

          {/* Cursor + tooltip */}
          <motion.div
            className="absolute z-30 pointer-events-none"
            animate={{
              left: isCaptured ? "12%" : isHovered ? "10%" : "55%",
              top: isCaptured ? "42%" : isHovered ? "40%" : "25%",
              opacity: showChat ? 0 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute" }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 2L4 17L7.5 13.5L10 19L12 18L9.5 12.5L14 12.5L4 2Z" fill="white" stroke="#555" strokeWidth="0.8" strokeLinejoin="round"/>
            </svg>
            <AnimatePresence>
              {isHovered && !isCaptured && (
                <motion.div
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "16px",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#ffffff",
                    padding: "5px 10px",
                    borderRadius: "7px",
                    background: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Click to capture
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Dark overlay when captured */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.4)", zIndex: 3 }}
            animate={{ opacity: isCaptured && !showChat ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />


          {/* "Copied to clipboard" pill — bottom right, dark with green text */}
          <AnimatePresence>
            {showCopied && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="absolute z-50"
                style={{
                  bottom: "16px",
                  right: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 600, color: "#34D399" }}>Copied to clipboard</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Showcase() {
  return (
    <section id="showcase" className="w-full px-6 md:px-8 py-24 md:py-36 flex flex-col items-center">
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
          textAlign: "center",
          marginBottom: "24px",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
        }}
      >
        No dragging or dropping. Just hover and click.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="w-full"
      >
        <CaptureDemo />
      </motion.div>
    </section>
  );
}
