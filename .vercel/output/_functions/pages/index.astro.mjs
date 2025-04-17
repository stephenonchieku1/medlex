import { c as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BSUnbTpa.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CFS40U79.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const links = [
  {
    title: "Product",
    items: [
      "Overview",
      "Features",
      "Solutions",
      "Tutorials",
      "Pricing",
      "Releases"
    ]
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News", "Media kit", "Contact"]
  },
  {
    title: "Resource",
    items: [
      "Blog",
      "Newsletter",
      "Events",
      "Help center",
      "Tutorials",
      "Support"
    ]
  }
];
const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "mt-10 px-8 pt-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 justify-between gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-2xl font-bold mb-6", children: "MedLex AI" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 justify-between gap-4", children: links.map(({ title, items }) => /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("h5", { className: "text-sm text-gray-500 mb-3 font-medium opacity-40", children: title }),
        items.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            className: "text-gray-800 py-1.5 font-normal transition-colors hover:text-gray-900",
            children: link
          }
        ) }, link))
      ] }, title)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16 flex flex-wrap items-end justify-center gap-y-4 gap-x-8 border-t border-gray-200 py-6 md:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center md:text-start", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-2xl text-gray-600 mb-2", children: "Your AI-Powered Medical Assistant" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-normal", children: "Get accurate medical information and assistance at your fingertips." })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-800 text-center font-normal", children: [
        "© ",
        currentYear,
        " MedLex AI, All rights reserved."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-italics", children: "developed by stephen Onchieku " })
    ] })
  ] }) });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", ` <script>
  function takeLocation(data, instance) {
    instance.send({
      input: {
        text: "Ok I've shared my location.",
      },
      context: {
        skills: {
          "actions skill": {
            skill_variables: {
              User_Latitude: data.coords.latitude,
              User_Longitude: data.coords.longitude,
            },
          },
        },
      },
    });
  }

  function getLocationError(error, instance) {
    let text = "There was an error sharing my location.";
    // See https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError.
    if (error.code === GeolocationPositionError.PERMISSION_DENIED) {
      text = "I don't want to share my location at this time.";
    } else if (error.code === GeolocationPositionError.POSITION_UNAVAILABLE) {
      text = "The browser encountered an error sharing my location.";
    }
    instance.send({ input: { text } });
  }

  window.getWatsonInstance = async function (maxAttempts = 10) {
    return new Promise((resolve, reject) => {
      let attempts = 0;

      const checkInstance = () => {
        const instance = window.watsonAssistantChatOptions?.instance;
        if (instance) {
          resolve(instance);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkInstance, 500); // Try again in 500ms
        } else {
          reject(new Error("Failed to get Watson Assistant instance"));
        }
      };

      checkInstance();
    });
  };

  window.sendWatsonMessage = async function (text) {
    try {
      const instance = await window.getWatsonInstance();
      await instance.send({ input: { text } });
    } catch (error) {}
  };

  window.watsonAssistantChatOptions = {
    integrationID: "014df85f-00b8-4372-8bb7-80fe1988a97a",
    region: "eu-de",
    serviceInstanceID: "7a8af923-faf2-4b22-8822-f29c70886c77",
    onLoad: async (instance) => {
      window.watsonAssistantChatOptions.instance = instance;

      // Add event listener for user messages
      instance.on({
        type: "send",
        handler: (event) => {
          const userMessage = event.data.input?.text?.toLowerCase() || "";
          const locationKeywords = [
            "location",
            "where",
            "nearby",
            "close to me",
            "near me",
          ];

          if (
            locationKeywords.some((keyword) => userMessage.includes(keyword))
          ) {
            navigator.geolocation.getCurrentPosition(
              (data) => takeLocation(data, instance),
              (error) => getLocationError(error, instance)
            );
          }
        },
      });

      await instance.render();
    },
  };
  setTimeout(function () {
    const t = document.createElement("script");
    t.src =
      "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
      (window.watsonAssistantChatOptions.clientVersion || "latest") +
      "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
<\/script> `])), renderComponent($$result, "Layout", $$Layout, { "title": "MedLex AI - Your Medical AI Assistant" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gradient-to-b from-white to-blue-50"> <!-- Hero Section --> <section class="container mx-auto px-4 py-20"> <div class="flex flex-col items-center text-center"> <h1 class="text-5xl font-bold text-gray-900 mb-6">
Your AI-Powered Medical Assistant
</h1> <p class="text-xl text-gray-600 mb-8 max-w-2xl">
MedLex AI helps you understand medical terminology, provides accurate health information, and assists in making informed healthcare decisions.
</p> <div class="flex gap-4"> <a href="/get-started" class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-medium">
Get Started
</a> <a href="/dashboard" class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 text-lg font-medium">
Try Medlex Ai
</a> <a href="#learn-more" class="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 text-lg font-medium">
Learn More
</a> </div> </div> </section> <!-- Features Section --> <section class="container mx-auto px-4 py-20 bg-white"> <h2 class="text-3xl font-bold text-center mb-12">Why Choose MedLex AI?</h2> <div class="grid md:grid-cols-3 gap-8"> <div class="p-6 rounded-lg shadow-lg"> <div class="text-4xl mb-4">🤖</div> <h3 class="text-xl font-semibold mb-2">AI-Powered Assistance</h3> <p class="text-gray-600">Get instant, accurate answers to your medical questions using advanced AI technology.</p> </div> <div class="p-6 rounded-lg shadow-lg"> <div class="text-4xl mb-4">📚</div> <h3 class="text-xl font-semibold mb-2">Comprehensive Knowledge</h3> <p class="text-gray-600">Access a vast database of medical information and terminology explanations.</p> </div> <div class="p-6 rounded-lg shadow-lg"> <div class="text-4xl mb-4">🔒</div> <h3 class="text-xl font-semibold mb-2">Privacy Focused</h3> <p class="text-gray-600">Your health information is kept secure and confidential at all times.</p> </div> </div> </section> <!-- How It Works Section --> <section class="container mx-auto px-4 py-20"> <h2 class="text-3xl font-bold text-center mb-12">How It Works</h2> <div class="grid md:grid-cols-3 gap-8"> <div class="text-center"> <div class="text-4xl mb-4">1️⃣</div> <h3 class="text-xl font-semibold mb-2">Ask Your Question</h3> <p class="text-gray-600">Type your medical question or describe your symptoms.</p> </div> <div class="text-center"> <div class="text-4xl mb-4">2️⃣</div> <h3 class="text-xl font-semibold mb-2">AI Analysis</h3> <p class="text-gray-600">Our AI processes your query and searches through medical databases.</p> </div> <div class="text-center"> <div class="text-4xl mb-4">3️⃣</div> <h3 class="text-xl font-semibold mb-2">Get Your Answer</h3> <p class="text-gray-600">Receive clear, accurate, and easy-to-understand responses.</p> </div> </div> </section> <!-- CTA Section --> <section class="container mx-auto px-4 py-20 bg-blue-600 text-white"> <div class="text-center"> <h2 class="text-3xl font-bold mb-6">Ready to Get Started?</h2> <p class="text-xl mb-8">Join thousands of users who trust MedLex AI for their medical information needs.</p> <div class="flex justify-center gap-4"> <a href="/signup" class="px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 text-lg font-medium">
Start Free Trial
</a> <a href="/dashboard" class="px-8 py-3 border border-white text-white rounded-md hover:bg-blue-700 text-lg font-medium">
Try chatbot
</a> </div> </div> </section> <div> ${renderComponent($$result2, "Footer", Footer, {})} </div> </main> ` }));
}, "/home/stephen/medlexy/medlex/src/pages/index.astro", void 0);

const $$file = "/home/stephen/medlexy/medlex/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
