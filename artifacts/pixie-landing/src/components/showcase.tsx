import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function FakeWebsite({ step }: { step: number }) {
  const isHovered = step >= 1;
  const isCaptured = step >= 2;

  return (
    <div style={{ width: "100%", height: "100%", background: "#ffffff", position: "relative", overflow: "hidden" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid #eee",
        background: "#fff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }} />
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", fontWeight: 700, color: "#111" }}>Acme Store</span>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Products", "Pricing", "About"].map(t => (
            <span key={t} style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: "#666" }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>Featured Products</div>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: "#999" }}>Top picks this week</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #eee" }}>
            <div style={{ height: "80px", background: "linear-gradient(135deg, #fef3c7, #fde68a)" }} />
            <div style={{ padding: "10px" }}>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 600, color: "#111", marginBottom: "2px" }}>Wireless Speaker</div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: "#999" }}>$49.99</div>
            </div>
          </div>

          <motion.div
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
              zIndex: 5,
            }}
            animate={{
              boxShadow: isCaptured
                ? "0 0 0 2.5px #34D399, 0 0 20px rgba(52,211,153,0.3)"
                : isHovered
                ? "0 0 0 2.5px #34D399, 0 0 16px rgba(52,211,153,0.2)"
                : "0 0 0 1px #eee",
            }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ height: "80px", background: "linear-gradient(135deg, #dbeafe, #93c5fd)", position: "relative" }}>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div style={{ padding: "10px", background: "#fff" }}>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 600, color: "#111", marginBottom: "2px" }}>Smart Watch Pro</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: "#999" }}>$199.99</div>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: "9px", fontWeight: 600, color: "#fff", background: "#3b82f6", borderRadius: "4px", padding: "2px 6px" }}>NEW</div>
              </div>
            </div>
          </motion.div>

          <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #eee" }}>
            <div style={{ height: "80px", background: "linear-gradient(135deg, #d1fae5, #6ee7b7)" }} />
            <div style={{ padding: "10px" }}>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 600, color: "#111", marginBottom: "2px" }}>Desk Lamp</div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: "#999" }}>$34.99</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div style={{ borderRadius: "8px", padding: "12px", background: "#f9fafb", border: "1px solid #f3f4f6" }}>
            <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>Recent Orders</div>
            {["Order #1234 — Shipped", "Order #1233 — Delivered"].map(o => (
              <div key={o} style={{ fontFamily: "Arial, sans-serif", fontSize: "10px", color: "#888", marginBottom: "2px" }}>{o}</div>
            ))}
          </div>
          <div style={{ borderRadius: "8px", padding: "12px", background: "#f9fafb", border: "1px solid #f3f4f6" }}>
            <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>Quick Stats</div>
            <div style={{ display: "flex", gap: "16px" }}>
              <div>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: "16px", fontWeight: 700, color: "#111" }}>247</div>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: "9px", color: "#888" }}>Products</div>
              </div>
              <div>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: "16px", fontWeight: 700, color: "#111" }}>1.2k</div>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: "9px", color: "#888" }}>Sales</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ opacity: isCaptured ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function CaptureDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timings = [2000, 1400, 800, 1200, 1600, 2000];
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
  const showToolbar = step >= 3;
  const isCopied = step >= 4;
  const showNotif = step === 5;

  return (
    <div className="relative w-full max-w-3xl mx-auto select-none">
      <div className="overflow-hidden" style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "#111111" }}>
        <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#1a1a1a" }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-6 flex items-center justify-center h-6 rounded-md" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>acmestore.com/products</span>
            </div>
          </div>
          <div style={{ width: "48px" }} />
        </div>

        <div className="relative" style={{ height: "380px", overflow: "hidden" }}>
          <FakeWebsite step={step} />

          <motion.div
            className="absolute z-30 pointer-events-none"
            animate={{
              left: isCaptured ? "52%" : isHovered ? "50%" : "20%",
              top: isCaptured ? "52%" : isHovered ? "42%" : "15%",
              opacity: showNotif ? 0 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="#333" strokeWidth="1">
              <path d="M5 3l14 9-7 1-4 7L5 3z" />
            </svg>
          </motion.div>

          <AnimatePresence>
            {isCaptured && !showNotif && (
              <motion.div
                key={`ripple-${step}`}
                className="absolute z-30 pointer-events-none rounded-full"
                style={{ left: "calc(52% - 12px)", top: "calc(52% - 12px)", width: 24, height: 24, border: "2px solid rgba(52,211,153,0.7)" }}
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>

          <motion.div
            className="absolute z-40 left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2 px-4 py-2.5"
            style={{
              borderRadius: "12px",
              background: "rgba(10,10,10,0.96)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
            animate={{ opacity: showToolbar ? 1 : 0, y: showToolbar ? 0 : 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-1.5 rounded-md" style={{ color: "rgba(255,255,255,0.5)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </div>
            <div className="p-1.5 rounded-md" style={{ color: "rgba(255,255,255,0.5)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/></svg>
            </div>
            <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.09)" }} />
            <div className="flex gap-1.5">
              {["#ef4444","#facc15","#60a5fa","#34D399"].map(c => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.09)" }} />
            <motion.span
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: isCopied ? "#fff" : "#000",
                background: isCopied ? "#34D399" : "#ffffff",
                borderRadius: "8px",
                padding: "4px 12px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "background 0.2s, color 0.2s",
              }}
              animate={{ scale: isCopied ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isCopied && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
              {isCopied ? "Copied!" : "Copy"}
            </motion.span>
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: "#ffffff",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "4px 12px",
              }}
            >
              Save
            </span>
          </motion.div>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: -10, x: 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute z-50"
                style={{
                  top: "16px",
                  right: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: "rgba(10,10,10,0.95)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: "rgba(52,211,153,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 700, color: "#fff" }}>Copied to clipboard</div>
                  <div style={{ fontFamily: "Arial, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.45)" }}>Paste anywhere — ⌘V</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isHovered && !isCaptured && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="absolute z-30"
                style={{
                  left: "50%",
                  top: "18%",
                  transform: "translateX(-50%)",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#ffffff",
                  padding: "5px 12px",
                  borderRadius: "8px",
                  background: "rgba(10,10,10,0.9)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                Click to capture
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-5">
        {["Hover", "Capture", "Annotate", "Copy"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <motion.div
              className="flex items-center gap-1.5"
              animate={{ opacity: step >= i + 1 ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="rounded-full"
                animate={{
                  width: step === i + 1 ? 18 : 6,
                  height: 6,
                  backgroundColor: step >= i + 1 ? "#34D399" : "rgba(255,255,255,0.15)",
                }}
                transition={{ duration: 0.3 }}
              />
              <span style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "11px",
                color: step >= i + 1 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                transition: "color 0.3s",
              }}>
                {label}
              </span>
            </motion.div>
            {i < 3 && <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.08)" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Showcase() {
  return (
    <section id="showcase" className="w-full px-6 md:px-8 py-24 md:py-36 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "100px",
          padding: "6px 14px 6px 10px",
          marginBottom: "20px",
        }}
      >
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34D399" }} />
        <span style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>
          How it works
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "52px",
          fontWeight: 700,
          color: "#ffffff",
          textAlign: "center",
          marginBottom: "16px",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        Hover. Click. Done.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "17px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.45)",
          textAlign: "center",
          maxWidth: "420px",
          marginBottom: "56px",
          lineHeight: 1.6,
        }}
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
