import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type PreviewServer, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Vite's own endpoints, which must never be rewritten. */
const isInternal = (url: string) =>
  url.startsWith("/@") || url.startsWith("/__") || url.startsWith("/node_modules");

/**
 * Makes both local servers resolve extensionless routes the way a real host
 * will.
 *
 * `vite preview` in MPA mode serves files verbatim and 404s on "/some-route",
 * whereas real static hosts (Netlify, Vercel, Cloudflare Pages, S3, nginx)
 * resolve it to "/some-route/index.html".
 *
 * `vite dev` has a different version of the same problem: the prerendered
 * files only exist after a build, so in dev there is no "/privacy/index.html"
 * to find at all, and appType:"mpa" means Vite will not fall back either. So
 * dev hands those routes the root document and lets the client router resolve
 * the path, which is what it does on a prerendered page anyway. Unknown paths
 * land on the 404 page through normalisePath, matching production.
 */
function directoryIndexes() {
  return {
    name: "directory-indexes",
    configureServer(server: ViteDevServer) {
      // Returning a function installs this after Vite's own middlewares, so
      // real files and HMR endpoints are served first and only unmatched
      // requests fall through to here.
      return () => {
        server.middlewares.use((req, _res, next) => {
          const url = req.url?.split("?")[0] ?? "/";
          if (req.method === "GET" && !url.includes(".") && !isInternal(url)) {
            req.url = "/index.html";
          }
          next();
        });
      };
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0] ?? "/";
        if (!url.includes(".") && url !== "/" && !isInternal(url)) {
          const candidate = resolve(
            import.meta.dirname,
            "dist",
            `.${url.replace(/\/$/, "")}/index.html`.replace(/^\.\//, ""),
          );
          if (existsSync(candidate)) {
            req.url = `${url.replace(/\/$/, "")}/index.html`;
          }
        }
        next();
      });
    },
  };
}

/**
 * Nothing here is bound to a fixed port: no OAuth callback, webhook or CORS
 * origin depends on one. So honour an assigned PORT and let Vite pick another
 * if that one is taken, rather than failing outright the way strictPort does.
 */
const assignedPort = Number(process.env.PORT) || undefined;

export default defineConfig({
  plugins: [react(), tailwindcss(), directoryIndexes()],
  // Every route is prerendered to its own HTML file, so no SPA fallback.
  // directoryIndexes() above puts back what each local server needs instead.
  appType: "mpa",
  server: { port: assignedPort ?? 5173 },
  preview: { port: assignedPort ?? 4173 },
});
