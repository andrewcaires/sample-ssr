import type { TypeObjectAny, TypeObjectFunction } from "@andrewcaires/utils.js";
import { renderToString } from "vue/server-renderer";

import { createApp } from "./main";

export const render = async (url: string, manifest: TypeObjectAny) => {

  const { app, router, store } = createApp();

  await router.push(url);
  await router.isReady();

  const ctx: TypeObjectAny = {};
  const html = await renderToString(app, ctx);

  const initialState = store.state.value;

  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

  return [html, initialState, preloadLinks];
};

const renderPreloadLinks = (modules: any, manifest: TypeObjectAny) => {

  let links = "";

  const seen = new Set();

  modules.forEach((id: string) => {

    const files = manifest[id];

    if (files) {

      files.forEach((file: any) => {

        if (!seen.has(file)) {

          seen.add(file);

          const filename = file.split("/").pop();

          if (manifest[filename]) {

            for (const depFile of manifest[filename]) {

              links += renderPreloadLink(depFile);

              seen.add(depFile);
            }
          }

          links += renderPreloadLink(file);
        }
      });
    }
  });

  return links;
};

const renderPreloadTypes: TypeObjectFunction = {

  "*": (file: string) => "",

  js: (file: string) => `<link rel="modulepreload" crossorigin href="${file}">`,
  css: (file: string) => `<link rel="stylesheet" href="${file}">`,

  gif: (file: string) => `<link rel="preload" href="${file}" as="image" type="image/gif">`,
  jpg: (file: string) => `<link rel="preload" href="${file}" as="image" type="image/jpeg">`,
  png: (file: string) => `<link rel="preload" href="${file}" as="image" type="image/png">`,

  woff: (file: string) => `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`,
  woff2: (file: string) => `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`,

};

const renderPreloadLink = (file: string) => renderPreloadTypes[file.split(".").pop() || "*"]?.(file) ?? "";
