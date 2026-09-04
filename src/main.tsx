import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App, { normalisePath } from "./App";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App path={normalisePath(window.location.pathname)} />
  </StrictMode>
);

// The production build ships prerendered HTML, so hydrate it. The dev server
// serves the bare template, whose only child is the <!--app-html--> comment —
// hence firstElementChild rather than hasChildNodes, which a comment satisfies.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
