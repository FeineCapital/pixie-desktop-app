export function CtaFooter() {
  return (
    <footer className="w-full border-t border-white/[0.06] py-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Pixie. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="https://github.com/FeineCapital/pixie-desktop-app" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
