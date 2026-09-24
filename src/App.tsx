import { MotionConfig } from "framer-motion";
import { BackToTop } from "./components/BackToTop";
import { Nav } from "./components/Nav";
import { Footer } from "./sections/Footer";
import { Home } from "./pages/Home";
import { BestCrmForRealtors } from "./pages/BestCrmForRealtors";
import { NotFound } from "./pages/NotFound";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";

export const ROUTE_PATHS = ["/", "/best-crm-for-realtors", "/privacy", "/terms", "/404"] as const;
export type RoutePath = (typeof ROUTE_PATHS)[number];

/**
 * Unknown paths resolve to "/404" rather than silently rendering the home
 * page. Serving home content at a wrong URL is what produces a soft 404: the
 * crawler gets HTTP 200 and real content, so the bad URL stays indexed and
 * competes with the page it was pretending to be.
 */
export function normalisePath(pathname: string): RoutePath {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return (ROUTE_PATHS as readonly string[]).includes(clean) ? (clean as RoutePath) : "/404";
}

export default function App({ path }: { path: RoutePath }) {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link fixed left-4 top-4 z-[60] rounded-full bg-teal px-4 py-2 text-sm font-bold text-white">
        Skip to content
      </a>
      <Nav overDark={path === "/"} />
      <main id="main">
        {path === "/404" ? (
          <NotFound />
        ) : path === "/privacy" ? (
          <Privacy />
        ) : path === "/terms" ? (
          <Terms />
        ) : path === "/best-crm-for-realtors" ? (
          <BestCrmForRealtors />
        ) : (
          <Home />
        )}
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
