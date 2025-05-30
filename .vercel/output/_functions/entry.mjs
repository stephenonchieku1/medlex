import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_Cvr5p5ov.mjs';
import { manifest } from './manifest_DfKKd51X.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/confirmmed.astro.mjs');
const _page2 = () => import('./pages/api/fda.astro.mjs');
const _page3 = () => import('./pages/api/health-chat.astro.mjs');
const _page4 = () => import('./pages/api/img-analyze.astro.mjs');
const _page5 = () => import('./pages/api/med-analyze.astro.mjs');
const _page6 = () => import('./pages/api/sideeffect.astro.mjs');
const _page7 = () => import('./pages/api/watsonx.astro.mjs');
const _page8 = () => import('./pages/dashboard.astro.mjs');
const _page9 = () => import('./pages/login.astro.mjs');
const _page10 = () => import('./pages/signup.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/confirmMed.ts", _page1],
    ["src/pages/api/fda.ts", _page2],
    ["src/pages/api/health-chat.ts", _page3],
    ["src/pages/api/img-analyze.ts", _page4],
    ["src/pages/api/med-analyze.ts", _page5],
    ["src/pages/api/sideEffect.ts", _page6],
    ["src/pages/api/watsonx.ts", _page7],
    ["src/pages/dashboard.astro", _page8],
    ["src/pages/login.astro", _page9],
    ["src/pages/signup.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ca603ee3-e2e5-4bb5-b1d5-6873a7d58f4d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
