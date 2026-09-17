import { MotionConfig } from "framer-motion";
import { Nav } from "./components/Nav";
import { Footer } from "./sections/Footer";
import { Home } from "./pages/Home";
import { BestCrmForRealtors } from "./pages/BestCrmForRealtors";

export const ROUTE_PATHS = ["/", "/best-crm-for-realtors"] as const;
export type RoutePath = (typeof ROUTE_PATHS)[number];

export function normalisePath(pathname: string): RoutePath {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return (ROUTE_PATHS as readonly string[]).includes(clean) ? (clean as RoutePath) : "/";
}

export default function App({ path }: { path: RoutePath }) {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link fixed left-4 top-4 z-[60] rounded-full bg-teal px-4 py-2 text-sm font-bold text-white">
        Skip to content
      </a>
      <Nav />
      <main id="main">{path === "/best-crm-for-realtors" ? <BestCrmForRealtors /> : <Home />}</main>
      <Footer />
    </MotionConfig>
  );
}
