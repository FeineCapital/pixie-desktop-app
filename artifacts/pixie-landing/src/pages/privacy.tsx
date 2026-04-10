export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 32px 120px", fontFamily: "system-ui, -apple-system, sans-serif", color: "#171717" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ fontSize: 14, color: "#666", marginBottom: 48 }}>Last updated: April 10, 2026</p>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Overview</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "#444" }}>
          Pixie is a screenshot tool for macOS and Chrome that lets you capture any element or
          region on your screen and copy it to your clipboard. We take your privacy seriously.
          Pixie does not collect, store, or transmit any personal data — everything happens
          locally on your device.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Data We Collect</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "#444" }}>
          <strong>None.</strong> Pixie does not collect any personal information, browsing history,
          screenshots, clipboard contents, or any other user data. All screenshot activity
          stays entirely on your device.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Permissions</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "#444", marginBottom: 16 }}>
          The Pixie Chrome extension requests the following permissions solely to provide its
          core screenshot functionality:
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.9, color: "#444", paddingLeft: 24 }}>
          <li><strong>activeTab</strong> — to access the page you are currently viewing in order to take a screenshot of it.</li>
          <li><strong>clipboardWrite</strong> — to copy the captured screenshot image to your clipboard.</li>
          <li><strong>scripting</strong> — to inject the capture script into the active page so elements can be selected and captured.</li>
          <li><strong>tabs</strong> — to identify which tab is active when a screenshot is triggered.</li>
          <li><strong>Host permissions</strong> — to enable screenshots on any website you visit.</li>
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "#444", marginTop: 16 }}>
          None of these permissions are used to collect, transmit, or store any data about you
          or your browsing activity.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Third-Party Services</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "#444" }}>
          Pixie does not integrate with any third-party analytics, advertising, or data
          collection services. No data is shared with any third party under any circumstances.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Remote Code</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "#444" }}>
          Pixie does not execute remote code. All extension logic is fully self-contained and
          bundled locally within the extension package at install time.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Changes to This Policy</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "#444" }}>
          If we ever change this policy, we will update the date at the top of this page and,
          where appropriate, notify users through the extension update notes.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Contact</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "#444" }}>
          Questions about this policy? Reach us at{" "}
          <a href="mailto:hello@pixiedownload.com" style={{ color: "#171717", textDecoration: "underline" }}>
            hello@pixiedownload.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
