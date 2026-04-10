import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function StepChart({ values, height = 50 }: { values: number[]; height?: number }) {
  const max = Math.max(...values);
  const w = 200;
  const h = height;
  let d = "";
  for (let i = 0; i < values.length; i++) {
    const x = (i / (values.length - 1)) * w;
    const y = h - (values[i] / max) * (h - 4) - 2;
    if (i === 0) {
      d = `M ${x} ${y}`;
    } else {
      const prevX = ((i - 1) / (values.length - 1)) * w;
      d += ` L ${x} ${y}`;
      if (i < values.length - 1) {
        const nextY = h - (values[i] / max) * (h - 4) - 2;
        d += ` L ${x} ${nextY}`;
      }
    }
  }
  const fillD = d + ` L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={fillD} fill="url(#chartGrad)" opacity="0.15" />
      <path d={d} fill="none" stroke="#635bff" strokeWidth="1.5" />
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#635bff" />
          <stop offset="100%" stopColor="#635bff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const MRR = [800,800,1200,1200,1800,1800,2200,2200,2600,2600,3100,3100,3400,3400,3900,3900,4200,4200,4600,4600,5100,5100,5600,5900];
const ARR = [8000,10000,10000,14000,14000,18000,18000,24000,24000,32000,32000,40000,40000,48000,48000,55000,55000,62000,62000,66000,66000,70000,70000,70800];
const GROSS = [2000,4000,3000,5000,4000,7000,5000,8000,9000,7000,10000,12000,9000,11000,13000,12000,14000,12000,15000,14000,16000,14000,16000,16100];
const SUBS = [0,0,1,1,1,2,2,2,3,3,3,4,4,4,4,5,5,5,5,5];

function StripeDashboard({ isHovered, isCaptured }: { isHovered: boolean; isCaptured: boolean }) {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#f6f9fc", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" }}>
      <div style={{ width: "44px", background: "#fff", borderRight: "1px solid #e3e8ee", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "12px", gap: "16px", flexShrink: 0 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#635bff"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
        <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: "#f0f0ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        </div>
        {[
          <svg key="a" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8792a2" strokeWidth="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
          <svg key="b" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8792a2" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg>,
          <svg key="c" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8792a2" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
          <svg key="d" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8792a2" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
          <svg key="e" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8792a2" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
        ].map((icon, i) => (
          <div key={i} style={{ width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
        ))}
      </div>

      <div style={{ flex: 1, padding: "14px 18px", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a1f36", marginBottom: "5px" }}>Your overview</div>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span style={{ fontSize: "10px", color: "#697386" }}>Date range</span>
              <span style={{ fontSize: "10px", color: "#1a1f36", border: "1px solid #d8dee4", borderRadius: "4px", padding: "1px 8px", background: "#fff" }}>All time ▾</span>
              <span style={{ fontSize: "10px", color: "#1a1f36", border: "1px solid #d8dee4", borderRadius: "4px", padding: "1px 8px", background: "#fff" }}>Daily ▾</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ fontSize: "10px", color: "#1a1f36", border: "1px solid #d8dee4", borderRadius: "5px", padding: "3px 10px", background: "#fff" }}>+ Add</span>
            <span style={{ fontSize: "10px", color: "#1a1f36", border: "1px solid #d8dee4", borderRadius: "5px", padding: "3px 10px", background: "#fff" }}>✎ Edit</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "8px" }}>
          <motion.div
            style={{ borderRadius: "8px", background: "#fff", padding: "12px 14px", position: "relative", zIndex: 5 }}
            animate={{
              boxShadow: isCaptured || isHovered
                ? "0 0 0 2px #34D399, 0 1px 3px rgba(0,0,0,0.08)"
                : "0 0 0 1px #e3e8ee, 0 1px 3px rgba(0,0,0,0.04)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "10px", color: "#697386" }}>MRR ⓘ</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c1c9d2" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            </div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a1f36", margin: "3px 0 6px" }}>$5,899.96</div>
            <div style={{ height: "48px" }}><StepChart values={MRR} height={48} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              {["Feb 1", "Apr 1"].map(l => <span key={l} style={{ fontSize: "8px", color: "#c1c9d2" }}>{l}</span>)}
              <span style={{ fontSize: "8px", color: "#c1c9d2" }}>$6K</span>
            </div>
            <div style={{ fontSize: "7px", color: "#c1c9d2", marginTop: "4px" }}>Updated 20 minutes ago · <span style={{ color: "#635bff" }}>More details</span></div>
          </motion.div>

          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e3e8ee, 0 1px 3px rgba(0,0,0,0.04)", padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "10px", color: "#697386" }}>ARR ⓘ</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c1c9d2" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            </div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a1f36", margin: "3px 0 6px" }}>$70,799.52</div>
            <div style={{ height: "48px" }}><StepChart values={ARR} height={48} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              {["Feb 1", "Apr 1"].map(l => <span key={l} style={{ fontSize: "8px", color: "#c1c9d2" }}>{l}</span>)}
              <span style={{ fontSize: "8px", color: "#c1c9d2" }}>$80K</span>
            </div>
            <div style={{ fontSize: "7px", color: "#c1c9d2", marginTop: "4px" }}>Updated 20 minutes ago · <span style={{ color: "#635bff" }}>More details</span></div>
          </div>

          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e3e8ee, 0 1px 3px rgba(0,0,0,0.04)", padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "10px", color: "#697386" }}>Gross volume ⓘ</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c1c9d2" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            </div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a1f36", margin: "3px 0 6px" }}>$16,099.84</div>
            <div style={{ height: "48px" }}><StepChart values={GROSS} height={48} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              {["Feb 1", "Apr 1"].map(l => <span key={l} style={{ fontSize: "8px", color: "#c1c9d2" }}>{l}</span>)}
              <span style={{ fontSize: "8px", color: "#c1c9d2" }}>$4K</span>
            </div>
            <div style={{ fontSize: "7px", color: "#c1c9d2", marginTop: "4px" }}>Updated 20 minutes ago · <span style={{ color: "#635bff" }}>More details</span></div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "8px" }}>
          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e3e8ee, 0 1px 3px rgba(0,0,0,0.04)", padding: "12px 14px" }}>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#1a1f36", marginBottom: "8px" }}>Top customers by spend ⓘ</div>
            {[
              { name: "Hectors Magic Carpet", email: "hectorsmagic@gmail.com", amount: "$5,699.91" },
              { name: "Cars2Work Auto Repair", email: "cars2workllc@gmail.com", amount: "$2,999.96" },
              { name: "Bullitt County Auto", email: "wilson74@cwi.com", amount: "$2,500.00" },
              { name: "Xtreme Pressure Washing", email: "jraystreme@hotmail.com", amount: "$2,400.00" },
            ].map(c => (
              <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0", borderTop: "1px solid #f2f5f9" }}>
                <div>
                  <div style={{ fontSize: "9px", fontWeight: 600, color: "#1a1f36" }}>{c.name}</div>
                  <div style={{ fontSize: "7px", color: "#8792a2" }}>{c.email}</div>
                </div>
                <span style={{ fontSize: "9px", fontWeight: 600, color: "#1a1f36" }}>{c.amount}</span>
              </div>
            ))}
            <div style={{ fontSize: "7px", color: "#8792a2", marginTop: "5px" }}>Updated yesterday · <span style={{ color: "#635bff" }}>View all</span></div>
          </div>

          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e3e8ee, 0 1px 3px rgba(0,0,0,0.04)", padding: "12px 14px" }}>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#1a1f36", marginBottom: "2px" }}>Active subscribers ⓘ</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#1a1f36", marginBottom: "4px" }}>5</div>
            <div style={{ height: "50px" }}><StepChart values={SUBS} height={50} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
              {["Feb 1", "Apr 1"].map(l => <span key={l} style={{ fontSize: "8px", color: "#c1c9d2" }}>{l}</span>)}
            </div>
            <div style={{ fontSize: "7px", color: "#c1c9d2", marginTop: "3px" }}>Updated 20 minutes ago</div>
          </div>

          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e3e8ee, 0 1px 3px rgba(0,0,0,0.04)", padding: "12px 14px" }}>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#1a1f36", marginBottom: "2px" }}>New customers ⓘ</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#1a1f36", marginBottom: "4px" }}>10</div>
            <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none">
              {[[12,32],[38,50],[64,26],[90,44],[116,20],[142,38],[168,46],[190,30]].map(([x, h], i) => (
                <rect key={i} x={x - 8} y={50 - h} width="14" height={h} fill="#635bff" opacity="0.6" rx="2" />
              ))}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
              {["Feb 1", "Apr 1"].map(l => <span key={l} style={{ fontSize: "8px", color: "#c1c9d2" }}>{l}</span>)}
            </div>
            <div style={{ fontSize: "7px", color: "#c1c9d2", marginTop: "3px" }}>Updated 20 minutes ago</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "8px" }}>
          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e3e8ee, 0 1px 3px rgba(0,0,0,0.04)", padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "#1a1f36" }}>Recent payments</span>
              <span style={{ fontSize: "9px", color: "#635bff", fontWeight: 500 }}>View all →</span>
            </div>
            {[
              { id: "pi_3R3x...KfL0", customer: "alex@startup.io", amount: "$99.00", status: "Succeeded", color: "#0e6245" },
              { id: "pi_3R3w...Mn2P", customer: "sarah@design.co", amount: "$49.00", status: "Succeeded", color: "#0e6245" },
              { id: "pi_3R3v...Qx7R", customer: "mike@agency.com", amount: "$199.00", status: "Pending", color: "#c26e13" },
            ].map(p => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderTop: "1px solid #f2f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.color }} />
                  <div>
                    <div style={{ fontSize: "9px", color: "#1a1f36", fontWeight: 500 }}>{p.amount} — {p.customer}</div>
                    <div style={{ fontSize: "7px", color: "#8792a2" }}>{p.id}</div>
                  </div>
                </div>
                <span style={{ fontSize: "8px", fontWeight: 500, color: p.color }}>{p.status}</span>
              </div>
            ))}
          </div>
          <div style={{ borderRadius: "8px", background: "#fff", boxShadow: "0 0 0 1px #e3e8ee, 0 1px 3px rgba(0,0,0,0.04)", padding: "12px 14px" }}>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#1a1f36", marginBottom: "8px" }}>Payouts</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a1f36", marginBottom: "2px" }}>$3,240.00</div>
            <div style={{ fontSize: "9px", color: "#0e6245", marginBottom: "8px" }}>On the way · Apr 3</div>
            <div style={{ height: "3px", background: "#e3e8ee", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "65%", height: "100%", background: "#635bff", borderRadius: "2px" }} />
            </div>
            <div style={{ fontSize: "8px", color: "#8792a2", marginTop: "4px" }}>$4,960 estimated this month</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlackChat({ showPasted, showSent }: { showPasted: boolean; showSent: boolean }) {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#1a1d21", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" }}>
      <div style={{ width: "54px", background: "#3f0e40", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "10px", gap: "8px", flexShrink: 0 }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#611f69", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "6px" }}>
          <span style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>F</span>
        </div>
        <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        </div>
        {[
          <svg key="a" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
          <svg key="b" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
        ].map((icon, i) => (
          <div key={i} style={{ width: "28px", height: "28px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
        ))}
      </div>

      <div style={{ width: "180px", background: "#19171d", borderRight: "1px solid rgba(255,255,255,0.08)", padding: "10px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 12px", marginBottom: "12px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>Feine Capital</div>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "6px", padding: "5px 8px", display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>Search</span>
          </div>
        </div>
        <div style={{ padding: "0 8px" }}>
          <div style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.5)", padding: "4px 6px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Channels</div>
          {["# general", "# engineering", "# design", "# growth"].map(ch => (
            <div key={ch} style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", padding: "3px 6px", borderRadius: "4px" }}>{ch}</div>
          ))}
          <div style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.5)", padding: "4px 6px", marginTop: "8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Direct Messages</div>
          <div style={{ fontSize: "11px", color: "#fff", padding: "3px 6px", borderRadius: "4px", background: "#1164a3", fontWeight: 500 }}>
            <span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "#2bac76", marginRight: "5px" }} />
            Sarah Chen
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", padding: "3px 6px" }}>Mike Johnson</div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", padding: "3px 6px" }}>Alex Thompson</div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "8px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#2bac76" }} />
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Sarah Chen</span>
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Active</span>
        </div>

        <div style={{ flex: 1, padding: "14px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: "#635bff", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>S</span>
            </div>
            <div>
              <div style={{ marginBottom: "3px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>Sarah Chen</span>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginLeft: "6px" }}>10:42 AM</span>
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>Hey, can you drop me the MRR screenshot? Need it for the deck 🙏</div>
            </div>
          </div>

          <AnimatePresence>
            {showSent && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: "#2bac76", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>Y</span>
                </div>
                <div>
                  <div style={{ marginBottom: "3px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>You</span>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginLeft: "6px" }}>10:43 AM</span>
                  </div>
                  <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#fff", width: "200px", marginBottom: "4px" }}>
                    <div style={{ padding: "8px 10px", background: "#f6f9fc" }}>
                      <div style={{ fontSize: "7px", color: "#697386", marginBottom: "1px" }}>MRR ⓘ</div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1f36", marginBottom: "3px" }}>$5,899.96</div>
                      <svg width="100%" height="24" viewBox="0 0 200 24" preserveAspectRatio="none">
                        <path d="M0 22 L20 20 L40 18 L60 16 L80 13 L100 11 L120 9 L140 7 L160 5 L180 3 L200 2" fill="none" stroke="#635bff" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>Here you go, just grabbed it 📸</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "8px 10px", display: "flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.1)", minHeight: "36px" }}>
            <AnimatePresence>
              {showPasted && !showSent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ width: "44px", height: "28px", borderRadius: "4px", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <div style={{ width: "100%", height: "100%", background: "#f6f9fc", padding: "2px 4px", boxSizing: "border-box" }}>
                    <div style={{ fontSize: "4px", color: "#697386" }}>MRR</div>
                    <div style={{ fontSize: "7px", fontWeight: 700, color: "#1a1f36" }}>$5,899</div>
                    <svg width="100%" height="6" viewBox="0 0 200 10" preserveAspectRatio="none">
                      <path d="M0 9 L40 7 L80 5 L120 3 L200 2" fill="none" stroke="#635bff" strokeWidth="2"/>
                    </svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <span style={{ fontSize: "12px", color: showPasted && !showSent ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)", flex: 1 }}>
              {showPasted && !showSent ? "Here you go, just grabbed it 📸" : "Message Sarah Chen..."}
            </span>
            <AnimatePresence>
              {showPasted && !showSent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ width: "24px", height: "24px", borderRadius: "4px", background: "#007a5a", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaptureDemo() {
  const [step, setStep] = useState(0);

  // 0 = idle on Stripe tab
  // 1 = cursor moves to MRR card, hover highlights it
  // 2 = click to capture, overlay darkens
  // 3 = "Copied to clipboard" notification
  // 4 = cursor moves to Slack tab and clicks it
  // 5 = Slack is open, cursor moves to input, paste appears
  // 6 = cursor clicks send, message sent
  useEffect(() => {
    const timings = [1800, 1200, 700, 1100, 800, 1200, 2200];
    let t: ReturnType<typeof setTimeout>;
    function advance(s: number) {
      t = setTimeout(() => {
        const next = (s + 1) % 7;
        setStep(next);
        advance(next);
      }, timings[s]);
    }
    advance(0);
    return () => clearTimeout(t);
  }, []);

  const isHovered = step >= 1 && step <= 3;
  const isCaptured = step >= 2 && step <= 3;
  const showCopied = step === 3;
  const showSlack = step >= 5;
  const showPasted = step >= 5;
  const showSent = step >= 6;
  const activeTab = step >= 4 ? "slack" : "stripe";

  const cursorPositions: Record<number, { left: string; top: string }> = {
    0: { left: "50%", top: "20%" },
    1: { left: "14%", top: "38%" },
    2: { left: "14%", top: "38%" },
    3: { left: "14%", top: "38%" },
    4: { left: "38%", top: "2%" },
    5: { left: "70%", top: "88%" },
    6: { left: "92%", top: "88%" },
  };
  const pos = cursorPositions[step] || { left: "50%", top: "20%" };

  return (
    <div className="relative w-full max-w-4xl mx-auto select-none">
      <div className="overflow-hidden" style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "#111" }}>
        {/* Browser tab bar */}
        <div style={{ display: "flex", alignItems: "flex-end", background: "#2a2a2a", paddingLeft: "8px", paddingTop: "6px" }}>
          <div className="flex gap-1.5 items-center" style={{ padding: "0 8px", alignSelf: "center", marginBottom: "2px" }}>
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "6px 14px 6px 10px",
              borderRadius: "8px 8px 0 0",
              background: activeTab === "stripe" ? "#1a1a1a" : "#333",
              marginLeft: "8px",
              cursor: "default",
              transition: "background 0.2s",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#635bff"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
            <span style={{ fontSize: "11px", color: activeTab === "stripe" ? "#ddd" : "#999" }}>Stripe Dashboard</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "6px 14px 6px 10px",
              borderRadius: "8px 8px 0 0",
              background: activeTab === "slack" ? "#1a1a1a" : "#333",
              cursor: "default",
              transition: "background 0.2s",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M14.5 2a2.5 2.5 0 0 0 0 5h2.5V4.5A2.5 2.5 0 0 0 14.5 2zM7 7a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2.5 2.5V7zM2 14.5A2.5 2.5 0 0 0 4.5 17V14.5H2zM9.5 10a2.5 2.5 0 0 1 5 0v2.5h-2.5A2.5 2.5 0 0 1 9.5 10zM17 9.5A2.5 2.5 0 0 0 22 9.5 2.5 2.5 0 0 0 19.5 7H17zM7 14.5A2.5 2.5 0 0 1 4.5 12H7zM17 14.5v2.5h2.5a2.5 2.5 0 0 0 0-5H17zM9.5 17v2.5A2.5 2.5 0 0 0 12 22a2.5 2.5 0 0 0 2.5-2.5V17z" fill="#e01e5a" stroke="none"/>
            </svg>
            <span style={{ fontSize: "11px", color: activeTab === "slack" ? "#ddd" : "#999" }}>Slack — Sarah Chen</span>
          </div>
          <div style={{ flex: 1 }} />
        </div>

        {/* URL bar */}
        <div style={{ padding: "0 14px", height: "30px", display: "flex", alignItems: "center", background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "6px", padding: "3px 12px", display: "flex", alignItems: "center", gap: "5px" }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>
                {activeTab === "slack" ? "app.slack.com/client/feine-capital" : "dashboard.stripe.com/dashboard"}
              </span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="relative" style={{ height: "530px", overflow: "hidden" }}>
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: showSlack ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <StripeDashboard isHovered={isHovered} isCaptured={isCaptured} />
          </motion.div>

          <motion.div
            className="absolute inset-0"
            animate={{ opacity: showSlack ? 1 : 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SlackChat showPasted={showPasted} showSent={showSent} />
          </motion.div>

          {/* Cursor */}
          <motion.div
            className="absolute z-40 pointer-events-none"
            animate={{ left: pos.left, top: pos.top }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
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
                    top: "18px",
                    left: "14px",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "6px",
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

          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.4)", zIndex: 3 }}
            animate={{ opacity: isCaptured && !showSlack ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* "Copied to clipboard" notification */}
          <AnimatePresence>
            {showCopied && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="absolute z-50"
                style={{
                  bottom: "14px",
                  right: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "7px 12px",
                  borderRadius: "8px",
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", fontWeight: 600, color: "#34D399" }}>Copied to clipboard</span>
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
    <section id="showcase" className="w-full px-6 md:px-8 pt-12 pb-24 md:pb-36 flex flex-col items-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "15px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.5)",
          textAlign: "center",
          marginBottom: "28px",
          letterSpacing: "0.01em",
        }}
      >
        No dragging or dropping. Just hover and click.
      </motion.p>

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
