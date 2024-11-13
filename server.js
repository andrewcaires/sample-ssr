import { noop } from "@andrewcaires/utils.js";
import express from "express";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "vite";
import compression from "compression";
import serveStatic from "serve-static";

// eslint-disable-next-line no-undef
const { cwd, env } = process ?? {};

const { NODE_ENV, VITE_PORT } = env ?? {};

const port = VITE_PORT ?? 4000;
const production = NODE_ENV === "production";

const main = async () => {

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;

  if (production) {

    app.use(compression());
    app.use("/", serveStatic("./dist/client", { index: false }));

  } else {

    vite = await createServer({

      base: "/",
      root: cwd(),
      logLevel: production ? "info" : "error",
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: { port: 3010 },
      },
      appType: "custom",

    });

    app.use(vite.middlewares);
  }

  const entry = "./dist/server/entry-server.js";
  let render = production && existsSync(entry) ? (await import(entry)).render : noop;

  let index = "./dist/client/index.html";
  let template = production && existsSync(index) ? readFileSync(index, "utf-8") : "";

  const json = "./dist/client/.vite/ssr-manifest.json";
  let manifest = production && existsSync(json) ? JSON.parse(readFileSync(json, "utf-8")) : {};

  app.use("*", async (req, res) => {

    try {

      const { originalUrl } = req;

      if (!production && vite) {

        index = "./index.html";

        if (existsSync(index)) {

          template = readFileSync(index, "utf-8");
        }

        template = await vite.transformIndexHtml(originalUrl, template);

        render = (await vite.ssrLoadModule("./src/entry-server.ts")).render;
      }

      const { appHtml, preloadLinks, initialState, headPayload } = await render(originalUrl, manifest);

      const renderState = `<script id="initial_state">window.__INITIAL_STATE__=${initialState};document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("initial_state");s&&s?.parentElement?.removeChild(s);});</script>`;

      let html = template;

      Object.entries(headPayload).forEach(([key, value]) => {

        html = html.replace(`<!--${key}-->`, value);
      });

      html = html.replace("<!--app-state-->", renderState);
      html = html.replace("<!--preload-links-->", preloadLinks);
      html = html.replace("<!--app-html-->", appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);

    } catch (e) {

      vite?.ssrFixStacktrace(e);

      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
};

main().then(({ app }) => {

  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
});
