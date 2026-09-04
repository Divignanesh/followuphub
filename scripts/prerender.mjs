import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

const { ROUTES, render, renderHead } = await import(
  resolve(root, "dist-ssr/entry-server.js")
);

const template = readFileSync(resolve(dist, "index.html"), "utf8");
if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  throw new Error("Template is missing the <!--app-html--> / <!--app-head--> placeholders.");
}

for (const route of ROUTES) {
  const html = template
    .replace("<!--app-head-->", renderHead(route))
    .replace("<!--app-html-->", render(route.path));

  const outPath = resolve(dist, route.out);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf8");
  console.log(`  prerendered  ${route.path.padEnd(26)} -> dist/${route.out}  (${Math.round(html.length / 1024)} kB)`);
}

/* ---------------- sitemap.xml, generated from the same route table ------- */

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
).join("\n")}
</urlset>
`;
writeFileSync(resolve(dist, "sitemap.xml"), sitemap, "utf8");
console.log(`  wrote        sitemap.xml (${ROUTES.length} URLs)`);
