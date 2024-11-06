
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import express from "express";

// eslint-disable-next-line no-undef
const port = process.env.PORT || 4000;

// eslint-disable-next-line no-undef
const title = process.env.VITE_APP_TITLE || "App";

// eslint-disable-next-line no-undef
const isProd = process.env.NODE_ENV === "production";

const createServer = async () => {

  const indexProd = isProd ? readFileSync(resolve("./dist/client/index.html"), "utf-8") : "";

  const manifest = isProd ? JSON.parse(readFileSync(resolve("./dist/client/.vite/ssr-manifest.json"), "utf-8")) : {};

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;

  if (!isProd) {

    vite = await (await import("vite")).createServer({

      base: "/",
      // eslint-disable-next-line no-undef
      root: process.cwd(),
      logLevel: isProd ? "info" : "error",
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

  } else {

    app.use((await import("compression")).default());

    app.use("/", (await import("serve-static")).default(resolve("./dist/client"), { index: false }));
  }

  app.use("*", async (req, res) => {

    try {

      const url = req.originalUrl;

      let template, render;

      if (!isProd) {

        template = readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);

        render = (await vite.ssrLoadModule("./src/entry-server.ts")).render;

      } else {

        template = indexProd;

        render = (await import("./dist/server/entry-server.js")).render;
      }

      const [appHtml, initialState, preloadLinks] = await render(url, manifest);

      const renderState = `<script id="initial_state">window.__INITIAL_STATE__=${JSON.stringify(initialState)};document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("initial_state");s&&s?.parentElement?.removeChild(s);});</script>`;

      let html = template;

      html = html.replace("<!--app-title-->", title);
      html = html.replace("<!--app-state-->", renderState);
      html = html.replace("<!--preload-links-->", preloadLinks);
      html = html.replace("<!--app-html-->", appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);

    } catch (e) {

      vite && vite.ssrFixStacktrace(e);

      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
};

createServer().then(({ app }) => {

  app.listen(port, () => {

    // eslint-disable-next-line no-undef
    console.log(`Server running on http://localhost:${port}`);
  });
});
