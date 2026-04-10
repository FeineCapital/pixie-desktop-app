import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{ padding: scrolled ? "10px 16px 0" : "12px 16px 0" }}
    >
      <motion.nav
        layout
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="glass-nav border border-border/50 flex items-center justify-between gap-4 md:gap-10"
        style={{
          maxWidth: scrolled ? "560px" : "720px",
          width: "100%",
          borderRadius: scrolled ? "9999px" : "16px",
          padding: scrolled ? "6px 6px 6px 18px" : "10px 10px 10px 20px",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)"
            : "0 2px 12px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.03)",
        }}
      >
        <Link
          href="/"
          className="font-display font-bold tracking-tight text-foreground flex items-center gap-2 shrink-0"
          style={{ fontSize: scrolled ? "15px" : "17px" }}
        >
          <div
            className="rounded-full bg-foreground transition-all duration-300"
            style={{
              width: scrolled ? "12px" : "16px",
              height: scrolled ? "12px" : "16px",
            }}
          />
          Pixie
        </Link>

        <div className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors whitespace-nowrap">
            Features
          </a>
          <a href="#showcase" className="hover:text-foreground transition-colors whitespace-nowrap">
            How it works
          </a>
          <a href="#use-cases" className="hover:text-foreground transition-colors whitespace-nowrap">
            Use cases
          </a>
        </div>

        <Button
          className="rounded-full font-semibold shrink-0 transition-all duration-300"
          size="sm"
        >
          Get for Chrome
        </Button>
      </motion.nav>
    </motion.header>
  );
}
