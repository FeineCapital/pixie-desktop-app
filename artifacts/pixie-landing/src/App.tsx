import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Showcase } from "@/components/showcase";
import { Features } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { CtaFooter } from "@/components/cta-footer";
import { MobileGate } from "@/components/mobile-gate";
import DownloadPage from "@/pages/download";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <MobileGate />
      <div className="hidden md:flex flex-col min-h-screen w-full">
        <Nav />
        <main className="flex-1 flex flex-col items-center w-full">
          <Hero />
          <Showcase />
          <Features />
          <Pricing />
        </main>
        <CtaFooter />
      </div>
    </div>
  );
}

function Download() {
  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <MobileGate />
      <div className="hidden md:flex flex-col min-h-screen w-full">
        <Nav />
        <main className="flex-1 flex flex-col items-center w-full">
          <DownloadPage />
        </main>
        <CtaFooter />
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/download" component={Download} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
