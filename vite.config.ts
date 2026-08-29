// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Inside Lovable the preview runs on SSR (LOVABLE_NITRO_PRESET is set).
// Outside it (e.g. GitHub Actions), build a fully static site: every route is
// prerendered to HTML into .output/public, with no server needed in production.
const isStaticBuild = !process.env.LOVABLE_NITRO_PRESET;

export default defineConfig({
  nitro: isStaticBuild ? false : undefined,
  tanstackStart: isStaticBuild
    ? {
        // Prerender all crawlable routes to static HTML (index.html at the root).
        prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true },
        pages: [{ path: "/", prerender: { enabled: true } }],
      }
    : {
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        // nitro/vite builds from this
        server: { entry: "server" },
      },
});
