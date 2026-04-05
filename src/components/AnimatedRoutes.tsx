import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import PortfolioPage from "@/pages/PortfolioPage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import NotFound from "@/pages/NotFound";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminHomePage from "@/pages/admin/AdminHomePage";
import AdminPortfolioPage from "@/pages/admin/AdminPortfolioPage";
import AdminTestimonialsPage from "@/pages/admin/AdminTestimonialsPage";
import AdminServicesPage from "@/pages/admin/AdminServicesPage";
import AdminSitePage from "@/pages/admin/AdminSitePage";
import AdminSeoPage from "@/pages/admin/AdminSeoPage";
import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";
import AdminShell from "./admin/AdminShell";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Index />
              </PageTransition>
            }
          />
          <Route
            path="/portfolio"
            element={
              <PageTransition>
                <PortfolioPage />
              </PageTransition>
            }
          />
          <Route
            path="/services"
            element={
              <PageTransition>
                <ServicesPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
          <Route
            path="/testimonials"
            element={
              <PageTransition>
                <TestimonialsPage />
              </PageTransition>
            }
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<ProtectedAdminRoute />}>
            <Route element={<AdminShell />}>
              <Route index element={<Navigate to="/admin/home" replace />} />
              <Route path="home" element={<AdminHomePage />} />
              <Route path="portfolio" element={<AdminPortfolioPage />} />
              <Route path="testimonials" element={<AdminTestimonialsPage />} />
              <Route path="services" element={<AdminServicesPage />} />
              <Route path="site" element={<AdminSitePage />} />
              <Route path="seo" element={<AdminSeoPage />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
