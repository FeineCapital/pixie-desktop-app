export function MobileGate() {
  return (
    <div className="flex md:hidden fixed inset-0 z-[9999] bg-background items-center justify-center px-8">
      <div className="text-center flex flex-col items-center gap-6">
        <div className="w-10 h-10 rounded-full bg-foreground" />
        <h1 className="font-display font-bold text-3xl text-foreground">Pixie</h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-xs">
          Visit <span className="font-semibold text-foreground">Pixie.app</span> on desktop to download and learn more.
        </p>
      </div>
    </div>
  );
}
