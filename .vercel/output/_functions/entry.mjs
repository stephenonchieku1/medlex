import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DLBktMvi.mjs';
import { manifest } from './manifest_o7IMBDK7.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/confirmmed.astro.mjs');
const _page2 = () => import('./pages/api/fda.astro.mjs');
const _page3 = () => import('./pages/api/health-chat.astro.mjs');
const _page4 = () => import('./pages/api/img-analyze.astro.mjs');
const _page5 = () => import('./pages/api/med-analyze.astro.mjs');
const _page6 = () => import('./pages/api/sideeffect.astro.mjs');
const _page7 = () => import('./pages/api/watsonx.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/confirmMed.ts", _page1],
    ["src/pages/api/fda.ts", _page2],
    ["src/pages/api/health-chat.ts", _page3],
    ["src/pages/api/img-analyze.ts", _page4],
    ["src/pages/api/med-analyze.ts", _page5],
    ["src/pages/api/sideEffect.ts", _page6],
    ["src/pages/api/watsonx.ts", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "890ce027-865d-43e6-8c53-671566c7d65c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
