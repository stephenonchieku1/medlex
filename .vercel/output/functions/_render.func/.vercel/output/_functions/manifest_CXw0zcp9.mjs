import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BaUHOuyv.mjs';
import 'es-module-lexer';
import { d as decodeKey } from './chunks/astro/server_BAjXwBrM.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/stephen/medlex/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DxxsS69i.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DxxsS69i.js"}],"styles":[],"routeData":{"route":"/api/confirmmed","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/confirmMed\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"confirmMed","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/confirmMed.ts","pathname":"/api/confirmMed","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DxxsS69i.js"}],"styles":[],"routeData":{"route":"/api/fda","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/fda\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"fda","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/fda.ts","pathname":"/api/fda","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DxxsS69i.js"}],"styles":[],"routeData":{"route":"/api/img-analyze","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/img-analyze\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"img-analyze","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/img-analyze.ts","pathname":"/api/img-analyze","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DxxsS69i.js"}],"styles":[],"routeData":{"route":"/api/med-analyze","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/med-analyze\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"med-analyze","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/med-analyze.ts","pathname":"/api/med-analyze","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DxxsS69i.js"}],"styles":[],"routeData":{"route":"/api/sideeffect","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/sideEffect\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"sideEffect","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/sideEffect.ts","pathname":"/api/sideEffect","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DxxsS69i.js"}],"styles":[],"routeData":{"route":"/api/watsonx","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/watsonx\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"watsonx","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/watsonx.ts","pathname":"/api/watsonx","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DxxsS69i.js"}],"styles":[{"type":"external","src":"/_astro/index.DlDTg7Ig.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/stephen/medlex/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/api/confirmMed@_@ts":"pages/api/confirmmed.astro.mjs","\u0000@astro-page:src/pages/api/fda@_@ts":"pages/api/fda.astro.mjs","\u0000@astro-page:src/pages/api/img-analyze@_@ts":"pages/api/img-analyze.astro.mjs","\u0000@astro-page:src/pages/api/med-analyze@_@ts":"pages/api/med-analyze.astro.mjs","\u0000@astro-page:src/pages/api/sideEffect@_@ts":"pages/api/sideeffect.astro.mjs","\u0000@astro-page:src/pages/api/watsonx@_@ts":"pages/api/watsonx.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/home/stephen/medlex/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_CXw0zcp9.mjs","/home/stephen/medlex/src/components/dashboard":"_astro/dashboard.Th1upP_5.js","@astrojs/react/client.js":"_astro/client.C0wQ6ffV.js","astro:scripts/page.js":"_astro/page.DxxsS69i.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.DlDTg7Ig.css","/favicon.svg","/_astro/client.C0wQ6ffV.js","/_astro/dashboard.Th1upP_5.js","/_astro/index.BmbdiC-L.js","/_astro/page.DxxsS69i.js","/_astro/page.DxxsS69i.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"M8VQMyHEQsXwFfIM3ZHs9r6UxVGO+AdJGRgw3fuBi40=","experimentalEnvGetSecretEnabled":false});

export { manifest };
