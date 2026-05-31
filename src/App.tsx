import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import AnimatedRoutes from "./components/AnimatedRoutes";
import ErrorBoundary from "@/components/ErrorBoundary";
import SplashScreen from "./components/SplashScreen";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const AppContent = () => {
  const location = useLocation();
  const { data: siteContent } = useSiteSettings();
  const [showSplash, setShowSplash] = useState(() => {
    if (location.pathname !== "/") return false;
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    return !hasSeenSplash;
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true");
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            onComplete={handleSplashComplete}
            tagline={siteContent.siteSettings.tagline}
          />
        )}
      </AnimatePresence>
      <ErrorBoundary>
        <AnimatedRoutes />
      </ErrorBoundary>
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminAuthProvider>
            <AppContent />
          </AdminAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
