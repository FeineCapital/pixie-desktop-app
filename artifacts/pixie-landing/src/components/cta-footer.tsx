export function CtaFooter() {
  return (
    <footer style={{ width: "100%", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px" }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        fontSize: "13px",
        color: "rgba(255,255,255,0.35)",
      }}>
        <p>&copy; {new Date().getFullYear()} Pixie. All rights reserved.</p>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="#" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>Twitter</a>
          <a href="https://github.com/FeineCapital/pixie-desktop-app" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>GitHub</a>
          <a href="#" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>Privacy</a>
        </div>
      </div>
    </footer>
  );
}
