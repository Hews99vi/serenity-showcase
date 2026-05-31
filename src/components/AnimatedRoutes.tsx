import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";

const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const TestimonialsPage = lazy(() => import("@/pages/TestimonialsPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AdminLoginPage = lazy(() => import("@/pages/admin/AdminLoginPage"));
const AdminHomePage = lazy(() => import("@/pages/admin/AdminHomePage"));
const AdminPortfolioPage = lazy(() => import("@/pages/admin/AdminPortfolioPage"));
const AdminTestimonialsPage = lazy(() => import("@/pages/admin/AdminTestimonialsPage"));
const AdminServicesPage = lazy(() => import("@/pages/admin/AdminServicesPage"));
const AdminSitePage = lazy(() => import("@/pages/admin/AdminSitePage"));
const AdminSeoPage = lazy(() => import("@/pages/admin/AdminSeoPage"));
const ProtectedAdminRoute = lazy(() => import("./admin/ProtectedAdminRoute"));
const AdminShell = lazy(() => import("./admin/AdminShell"));

const adminFallback = (
  <div className="flex h-screen items-center justify-center bg-charcoal text-cream/80">
    Loading admin...
  </div>
);

const routeFallback = (
  <div className="flex min-h-screen items-center justify-center bg-charcoal text-cream/80">
    Loading...
  </div>
);

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
              <Suspense fallback={routeFallback}>
                <PageTransition>
                  <PortfolioPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/services"
            element={
              <Suspense fallback={routeFallback}>
                <PageTransition>
                  <ServicesPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={routeFallback}>
                <PageTransition>
                  <ContactPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/testimonials"
            element={
              <Suspense fallback={routeFallback}>
                <PageTransition>
                  <TestimonialsPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={adminFallback}>
                <AdminLoginPage />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={adminFallback}>
                <ProtectedAdminRoute />
              </Suspense>
            }
          >
            <Route
              element={
                <Suspense fallback={adminFallback}>
                  <AdminShell />
                </Suspense>
              }
            >
              <Route index element={<Navigate to="/admin/home" replace />} />
              <Route
                path="home"
                element={
                  <Suspense fallback={adminFallback}>
                    <AdminHomePage />
                  </Suspense>
                }
              />
              <Route
                path="portfolio"
                element={
                  <Suspense fallback={adminFallback}>
                    <AdminPortfolioPage />
                  </Suspense>
                }
              />
              <Route
                path="testimonials"
                element={
                  <Suspense fallback={adminFallback}>
                    <AdminTestimonialsPage />
                  </Suspense>
                }
              />
              <Route
                path="services"
                element={
                  <Suspense fallback={adminFallback}>
                    <AdminServicesPage />
                  </Suspense>
                }
              />
              <Route
                path="site"
                element={
                  <Suspense fallback={adminFallback}>
                    <AdminSitePage />
                  </Suspense>
                }
              />
              <Route
                path="seo"
                element={
                  <Suspense fallback={adminFallback}>
                    <AdminSeoPage />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <Suspense fallback={routeFallback}>
                <PageTransition>
                  <NotFound />
                </PageTransition>
              </Suspense>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
