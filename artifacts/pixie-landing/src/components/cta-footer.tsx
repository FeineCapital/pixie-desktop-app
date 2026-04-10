import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CtaFooter() {
  return (
    <footer className="w-full bg-secondary border-t border-border pt-20 md:pt-32 pb-10 md:pb-12 px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold mb-6 md:mb-8 text-foreground"
        >
          Ready to click?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of designers and engineers who have upgraded their workflow. It's free, light, and private.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button size="lg" className="rounded-full h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl font-bold bg-foreground text-background hover:bg-foreground/90">
            Add to Chrome — It's Free
          </Button>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 md:mt-32 flex flex-col md:flex-row justify-between items-center pt-6 md:pt-8 border-t border-border/50 text-xs sm:text-sm text-muted-foreground gap-4">
        <p>&copy; {new Date().getFullYear()} Pixie. All rights reserved.</p>
        <div className="flex gap-4 sm:gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
