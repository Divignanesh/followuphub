import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type PreviewServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * `vite preview` in MPA mode serves files verbatim and 404s on "/some-route",
 * whereas real static hosts (Netlify, Vercel, Cloudflare Pages, S3, nginx)
 * resolve it to "/some-route/index.html". This middleware reproduces that so
 * the local preview matches what will actually be deployed.
 */
function directoryIndexes() {
  return {
    name: "directory-indexes",
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0] ?? "/";
        if (!url.includes(".") && url !== "/") {
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
  appType: "mpa",
  server: { port: assignedPort ?? 5173 },
  preview: { port: assignedPort ?? 4173 },
});
