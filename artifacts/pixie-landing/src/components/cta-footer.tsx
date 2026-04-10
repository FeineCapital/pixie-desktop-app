import { Link } from "wouter";

export function CtaFooter() {
  const linkStyle = {
    color: "rgba(0,0,0,0.4)",
    textDecoration: "none" as const,
    transition: "color 0.2s",
    fontFamily: "Arial, sans-serif",
    fontSize: "13px",
  };

  return (
    <footer style={{ width: "100%", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "48px 24px 48px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "15px", color: "#171717", marginBottom: "8px" }}>Pixie</div>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: "rgba(0,0,0,0.4)", maxWidth: "260px", lineHeight: 1.5 }}>
              The easiest way to take screenshots on Mac.
            </p>
          </div>

          <div style={{ display: "flex", gap: "48px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Product</span>
              <a href="#features" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = "#171717"} onMouseLeave={e => e.currentTarget.style.color = "rgba(0,0,0,0.4)"}>Features</a>
              <a href="#pricing" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = "#171717"} onMouseLeave={e => e.currentTarget.style.color = "rgba(0,0,0,0.4)"}>Pricing</a>
              <Link href="/download" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = "#171717"} onMouseLeave={e => e.currentTarget.style.color = "rgba(0,0,0,0.4)"}>Download</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Connect</span>
              <a href="#" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = "#171717"} onMouseLeave={e => e.currentTarget.style.color = "rgba(0,0,0,0.4)"}>Twitter</a>
              <a href="https://github.com/FeineCapital/pixie-desktop-app" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = "#171717"} onMouseLeave={e => e.currentTarget.style.color = "rgba(0,0,0,0.4)"}>GitHub</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Legal</span>
              <a href="#" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = "#171717"} onMouseLeave={e => e.currentTarget.style.color = "rgba(0,0,0,0.4)"}>Privacy</a>
              <a href="#" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = "#171717"} onMouseLeave={e => e.currentTarget.style.color = "rgba(0,0,0,0.4)"}>Terms</a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "24px" }}>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: "rgba(0,0,0,0.3)" }}>
            &copy; {new Date().getFullYear()} Pixie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
