import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const freePlan = [
  "Hover-to-capture",
  "Full screen capture",
  "Pencil & eraser annotation",
  "Copy to clipboard",
  "Save to Desktop",
  "Menu bar app",
];

const proPlan = [
  "Everything in Free",
  "AI-powered element detection",
  "Cloud screenshot history",
  "Custom keyboard shortcuts",
  "Team sharing",
  "Priority support",
];

function Check() {
  return (
    <svg className="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-36">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-4"
      >
        Pricing
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-16 leading-tight"
      >
        Simple pricing.
        <br />
        Start for free.
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 flex flex-col"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">Free</p>
          <div className="flex items-end gap-1 mb-8">
            <span className="text-5xl font-bold font-display text-foreground">$0</span>
            <span className="text-muted-foreground mb-1.5 text-sm">/ forever</span>
          </div>
          <ul className="space-y-3.5 mb-10 flex-1">
            {freePlan.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Check />
                {item}
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full h-12 w-full border-white/10 hover:bg-white/[0.06] text-foreground gap-2"
            asChild
          >
            <a href="https://github.com/FeineCapital/pixie-desktop-app/releases/latest/download/Pixie.dmg">
              <AppleIcon className="w-4 h-4" />
              Download Free
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-8 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-5 right-5 text-xs font-semibold px-2.5 py-1 bg-emerald-500/15 text-emerald-400 rounded-full border border-emerald-500/25">
            Coming soon
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">Pro</p>
          <div className="flex items-end gap-1 mb-8">
            <span className="text-5xl font-bold font-display text-foreground">$9</span>
            <span className="text-muted-foreground mb-1.5 text-sm">/ month</span>
          </div>
          <ul className="space-y-3.5 mb-10 flex-1">
            {proPlan.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Check />
                {item}
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            className="rounded-full h-12 w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
          >
            Join the waitlist
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
