import { c as createComponent, b as createAstro, r as renderTemplate, e as renderSlot, f as renderHead, g as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_COFyh_ip.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { useMemo, useRef, useReducer, useEffect, useCallback, forwardRef, useImperativeHandle, Fragment as Fragment$1, useState } from 'react';
import { RadioGroup, Radio, Listbox, ListboxButton, ListboxOptions, ListboxOption, Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import { ChevronDown, Check, X, Loader2, Camera, HeartPulse, Settings, CircleUserRound, Search, Volume2, Info, Pill, AlertTriangle, Leaf, MicOff, Mic, Send } from 'lucide-react';
import { IoFemale, IoMale } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { fromEvent } from 'file-selector';
import _accepts from 'attr-accept';
import { toast, Toaster } from 'sonner';
export { renderers } from '../renderers.mjs';

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator" content="MedLex+"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"><script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"><\/script><title>', "</title>", "</head> <body> ", " </body></html>"])), title, renderHead(), renderSlot($$result, $$slots["default"]));
}, "/home/stephen/medlexy/medlex/src/layouts/Layout.astro", void 0);

const medicalConditions = {
  shared: [
    { id: "diabetes", label: "Diabetes" },
    { id: "hypertension", label: "Hypertension" },
    { id: "heartDisease", label: "Heart Disease" },
    { id: "allergies", label: "Allergies" },
    { id: "asthma", label: "Asthma" }
  ],
  male: [
    { id: "prostate", label: "Prostate Issues" },
    { id: "erectileDysfunction", label: "Erectile Dysfunction" },
    { id: "lowTestosterone", label: "Low Testosterone" }
  ],
  female: [
    { id: "pcos", label: "PCOS (Polycystic Ovary Syndrome)" },
    { id: "menopause", label: "Menopause" },
    { id: "endometriosis", label: "Endometriosis" }
  ]
};
const ageRanges = [
  { id: 1, range: "Child (0–12)" },
  { id: 2, range: "Teen (13–17)" },
  { id: 3, range: "Adult (18–50)" },
  { id: 4, range: "Senior (50+)" }
];
const languages = [
  { id: "en", name: "English" },
  { id: "es", name: "Spanish" },
  { id: "ar", name: "Arabic" },
  { id: "bn", name: "Bengali" },
  { id: "bg", name: "Bulgarian" },
  { id: "zh", name: "Chinese" },
  { id: "hr", name: "Croatian" },
  { id: "cs", name: "Czech" },
  { id: "da", name: "Danish" },
  { id: "nl", name: "Dutch" },
  { id: "fa", name: "Farsi" },
  { id: "fi", name: "Finnish" },
  { id: "fr", name: "French" },
  { id: "de", name: "German" },
  { id: "el", name: "Greek" },
  { id: "gu", name: "Gujarati" },
  { id: "he", name: "Hebrew" },
  { id: "hi", name: "Hindi" },
  { id: "hu", name: "Hungarian" },
  { id: "id", name: "Indonesian" },
  { id: "it", name: "Italian" },
  { id: "ja", name: "Japanese" },
  { id: "kn", name: "Kannada" },
  { id: "ko", name: "Korean" },
  { id: "lv", name: "Latvian" },
  { id: "lt", name: "Lithuanian" },
  { id: "ms", name: "Malay" },
  { id: "ml", name: "Malayalam" },
  { id: "mr", name: "Marathi" },
  { id: "no", name: "Norwegian" },
  { id: "pl", name: "Polish" },
  { id: "pt", name: "Portuguese" },
  { id: "pa", name: "Punjabi" },
  { id: "ro", name: "Romanian" },
  { id: "ru", name: "Russian" },
  { id: "sr", name: "Serbian" },
  { id: "sk", name: "Slovak" },
  { id: "sl", name: "Slovenian" },
  { id: "sw", name: "Swahili" },
  { id: "sv", name: "Swedish" },
  { id: "ta", name: "Tamil" },
  { id: "te", name: "Telugu" },
  { id: "th", name: "Thai" },
  { id: "tr", name: "Turkish" },
  { id: "uk", name: "Ukrainian" },
  { id: "ur", name: "Urdu" },
  { id: "vi", name: "Vietnamese" }
];
const clarityLevels = [
  { id: "simple", label: "Very Simple" },
  { id: "standard", label: "Standard" },
  { id: "technical", label: "Detailed and Technical" }
];
const defaultSettings = {
  sex: "female",
  age: { id: 3, range: "Adult (18–50)" },
  conditions: [],
  language: { id: "en", name: "English" },
  clarity: { id: "standard", label: "Standard" }
};

const getStoredSettings = () => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("userSettings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.language || !parsed.language.id || !parsed.language.name) {
          parsed.language = defaultSettings.language;
        }
        if (!parsed.clarity || !parsed.clarity.id) {
          parsed.clarity = defaultSettings.clarity;
        } else {
          const matchingClarity = clarityLevels.find(
            (level) => level.id === parsed.clarity.id
          );
          parsed.clarity = matchingClarity || defaultSettings.clarity;
        }
        return parsed;
      }
    } catch (error) {
    }
  }
  return defaultSettings;
};
const saveSettings = (settings) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userSettings", JSON.stringify(settings));
  }
};

function SettingsPanel({
  settings,
  setSettings,
  selectedLanguage,
  setSelectedLanguage,
  selectedClarity,
  setSelectedClarity,
  languageQuery,
  setLanguageQuery
}) {
  const handleSexChange = (newSex) => {
    setSettings((prev) => ({
      ...prev,
      sex: newSex,
      conditions: prev.conditions.filter(
        (condition) => medicalConditions.shared.some((c) => c.id === condition)
      )
    }));
  };
  const handleConditionToggle = (conditionId) => {
    setSettings((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(conditionId) ? prev.conditions.filter((c) => c !== conditionId) : [...prev.conditions, conditionId]
    }));
  };
  const getAvailableConditions = () => [
    ...medicalConditions.shared,
    ...medicalConditions[settings.sex]
  ];
  const filteredLanguages = languageQuery === "" ? languages : languages.filter(
    (language) => language.name.toLowerCase().includes(languageQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-4 transition-all", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-6 text-gray-800", children: "Settings" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-4 border border-emerald-100 hover:border-emerald-200 transition-all shadow-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "block text-lg font-medium text-emerald-900 mb-3", children: "Sex" }),
          /* @__PURE__ */ jsx(
            RadioGroup,
            {
              value: settings.sex,
              onChange: handleSexChange,
              className: "space-y-3",
              "aria-label": "Select sex",
              children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsx(Radio, { value: "female", className: "group", children: ({ checked }) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `
                      flex items-center justify-center p-4 rounded-xl cursor-pointer
                      border-2 transition-all duration-200
                      ${checked ? "bg-pink-50 border-pink-300 shadow-sm shadow-pink-100" : "bg-white border-gray-200 hover:border-pink-200"}
                    `,
                    children: [
                      /* @__PURE__ */ jsx(
                        IoFemale,
                        {
                          className: `h-6 w-6 mr-2 ${checked ? "text-pink-500" : "text-gray-400"}`
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: `font-medium ${checked ? "text-pink-700" : "text-gray-600"}`,
                          children: "Female"
                        }
                      )
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx(Radio, { value: "male", className: "group", children: ({ checked }) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `
                      flex items-center justify-center p-4 rounded-xl cursor-pointer
                      border-2 transition-all duration-200
                      ${checked ? "bg-blue-50 border-blue-300 shadow-sm shadow-blue-100" : "bg-white border-gray-200 hover:border-blue-200"}
                    `,
                    children: [
                      /* @__PURE__ */ jsx(
                        IoMale,
                        {
                          className: `h-6 w-6 mr-2 ${checked ? "text-blue-500" : "text-gray-400"}`
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: `font-medium ${checked ? "text-blue-700" : "text-gray-600"}`,
                          children: "Male"
                        }
                      )
                    ]
                  }
                ) })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-4 border border-emerald-100 hover:border-emerald-200 transition-all shadow-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "block text-lg font-medium text-emerald-900 mb-3", children: "Medical Conditions" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: getAvailableConditions().map((condition) => /* @__PURE__ */ jsxs(
            "label",
            {
              className: "flex items-center p-3 bg-white rounded-lg border border-gray-100 \n                  hover:border-emerald-200 transition-all cursor-pointer group",
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: settings.conditions.includes(condition.id),
                    onChange: () => handleConditionToggle(condition.id),
                    className: "h-5 w-5 rounded-md\n                    text-emerald-600\n                    border-emerald-300\n                    focus:ring-emerald-500\n                    focus:ring-offset-0\n                    focus:ring-2\n                    checked:bg-emerald-600\n                    checked:hover:bg-emerald-700\n                    indeterminate:bg-emerald-600\n                    hover:cursor-pointer"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-3 text-gray-700 group-hover:text-emerald-900 font-medium", children: condition.label })
              ]
            },
            condition.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-4 border border-emerald-100 hover:border-emerald-200 transition-all shadow-sm", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "age",
              className: "block text-lg font-medium text-gray-800 mb-3",
              children: "Age Range"
            }
          ),
          /* @__PURE__ */ jsx(
            Listbox,
            {
              value: settings.age,
              onChange: (newAge) => setSettings((prev) => ({ ...prev, age: newAge })),
              children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxs(
                  ListboxButton,
                  {
                    className: "relative w-full rounded-xl bg-white py-3 pl-4 pr-10 text-left border border-gray-200 \n                  shadow-sm cursor-pointer hover:border-blue-200 transition-all duration-200\n                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "block truncate text-gray-700", children: settings.age.range }),
                      /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3", children: /* @__PURE__ */ jsx(
                        ChevronDown,
                        {
                          className: "h-5 w-5 text-gray-400",
                          "aria-hidden": "true"
                        }
                      ) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  ListboxOptions,
                  {
                    className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1\n                  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                    children: ageRanges.map((age) => /* @__PURE__ */ jsx(
                      ListboxOption,
                      {
                        value: age,
                        className: ({ selected }) => `
                      relative cursor-pointer select-none py-2 pl-10 pr-4
                      ${selected ? "bg-blue-50 text-blue-700" : "text-gray-700"}
                    `,
                        children: ({ selected }) => /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: `block truncate ${selected ? "font-medium" : "font-normal"}`,
                              children: age.range
                            }
                          ),
                          selected ? /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: `absolute inset-y-0 left-0 flex items-center pl-3
                              ${selected ? "text-blue-600" : "text-blue-500"}`,
                              children: /* @__PURE__ */ jsx(Check, { className: "h-5 w-5", "aria-hidden": "true" })
                            }
                          ) : null
                        ] })
                      },
                      age.id
                    ))
                  }
                )
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-4 border border-emerald-100 hover:border-emerald-200 transition-all shadow-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "block text-lg font-medium text-emerald-900 mb-3", children: "Language Settings" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Select Language" }),
              /* @__PURE__ */ jsx(
                Combobox,
                {
                  value: selectedLanguage,
                  onChange: (value) => {
                    if (value) {
                      setSelectedLanguage(value);
                      setSettings((prev) => ({
                        ...prev,
                        language: value
                      }));
                    }
                  },
                  onClose: () => setLanguageQuery(""),
                  children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      ComboboxInput,
                      {
                        className: "w-full rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm\n                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
                        displayValue: (language) => language?.name,
                        onChange: (event) => setLanguageQuery(event.target.value),
                        placeholder: "Search language..."
                      }
                    ),
                    /* @__PURE__ */ jsx(ComboboxButton, { className: "absolute inset-y-0 right-0 flex items-center px-2", children: /* @__PURE__ */ jsx(
                      ChevronDown,
                      {
                        className: "h-5 w-5 text-gray-400",
                        "aria-hidden": "true"
                      }
                    ) }),
                    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                      ComboboxOptions,
                      {
                        className: "absolute z-10 mt-1 max-h-60 min-w-full overflow-auto rounded-md bg-white py-1\n                        text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                        children: filteredLanguages.map((language) => /* @__PURE__ */ jsx(
                          ComboboxOption,
                          {
                            value: language,
                            className: ({ selected }) => `
                            relative cursor-default select-none py-2 pl-10 pr-4
                            ${selected ? "bg-emerald-50 text-emerald-900" : "text-gray-900"}
                          `,
                            children: ({ selected }) => /* @__PURE__ */ jsxs(Fragment, { children: [
                              /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: `block truncate ${selected ? "font-medium" : "font-normal"}`,
                                  children: language.name
                                }
                              ),
                              selected ? /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: `absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600`,
                                  children: /* @__PURE__ */ jsx(Check, { className: "h-5 w-5", "aria-hidden": "true" })
                                }
                              ) : null
                            ] })
                          },
                          language.id
                        ))
                      }
                    ) })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Clarity Level" }),
              /* @__PURE__ */ jsx(
                Listbox,
                {
                  value: selectedClarity,
                  onChange: (value) => {
                    setSelectedClarity(value);
                    setSettings((prev) => ({
                      ...prev,
                      clarity: value
                    }));
                  },
                  children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxs(
                      ListboxButton,
                      {
                        className: "relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-200 \n                      shadow-sm cursor-pointer hover:border-emerald-200 transition-all duration-200\n                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "block truncate text-gray-700", children: selectedClarity.label }),
                          /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx(
                            ChevronDown,
                            {
                              className: "h-5 w-5 text-gray-400",
                              "aria-hidden": "true"
                            }
                          ) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ListboxOptions,
                      {
                        className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1\n                      text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                        children: clarityLevels.map((level) => /* @__PURE__ */ jsx(
                          ListboxOption,
                          {
                            value: level,
                            className: ({ selected }) => `
                          relative cursor-pointer select-none py-2 pl-10 pr-4
                          ${selected ? "bg-emerald-50 text-emerald-900" : "text-gray-900"}
                        `,
                            children: ({ selected }) => /* @__PURE__ */ jsxs(Fragment, { children: [
                              /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: `block truncate ${selected ? "font-medium" : "font-normal"}`,
                                  children: level.label
                                }
                              ),
                              selected ? /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: `absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600`,
                                  children: /* @__PURE__ */ jsx(Check, { className: "h-5 w-5", "aria-hidden": "true" })
                                }
                              ) : null
                            ] })
                          },
                          level.id
                        ))
                      }
                    )
                  ] })
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}

function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }

function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }

function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$1(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var accepts = typeof _accepts === "function" ? _accepts : _accepts.default; // Error codes

var FILE_INVALID_TYPE = "file-invalid-type";
var FILE_TOO_LARGE = "file-too-large";
var FILE_TOO_SMALL = "file-too-small";
var TOO_MANY_FILES = "too-many-files";
/**
 *
 * @param {string} accept
 */

var getInvalidTypeRejectionErr = function getInvalidTypeRejectionErr() {
  var accept = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var acceptArr = accept.split(",");
  var msg = acceptArr.length > 1 ? "one of ".concat(acceptArr.join(", ")) : acceptArr[0];
  return {
    code: FILE_INVALID_TYPE,
    message: "File type must be ".concat(msg)
  };
};
var getTooLargeRejectionErr = function getTooLargeRejectionErr(maxSize) {
  return {
    code: FILE_TOO_LARGE,
    message: "File is larger than ".concat(maxSize, " ").concat(maxSize === 1 ? "byte" : "bytes")
  };
};
var getTooSmallRejectionErr = function getTooSmallRejectionErr(minSize) {
  return {
    code: FILE_TOO_SMALL,
    message: "File is smaller than ".concat(minSize, " ").concat(minSize === 1 ? "byte" : "bytes")
  };
};
var TOO_MANY_FILES_REJECTION = {
  code: TOO_MANY_FILES,
  message: "Too many files"
};
/**
 * Check if file is accepted.
 *
 * Firefox versions prior to 53 return a bogus MIME type for every file drag,
 * so dragovers with that MIME type will always be accepted.
 *
 * @param {File} file
 * @param {string} accept
 * @returns
 */

function fileAccepted(file, accept) {
  var isAcceptable = file.type === "application/x-moz-file" || accepts(file, accept);
  return [isAcceptable, isAcceptable ? null : getInvalidTypeRejectionErr(accept)];
}
function fileMatchSize(file, minSize, maxSize) {
  if (isDefined(file.size)) {
    if (isDefined(minSize) && isDefined(maxSize)) {
      if (file.size > maxSize) return [false, getTooLargeRejectionErr(maxSize)];
      if (file.size < minSize) return [false, getTooSmallRejectionErr(minSize)];
    } else if (isDefined(minSize) && file.size < minSize) return [false, getTooSmallRejectionErr(minSize)];else if (isDefined(maxSize) && file.size > maxSize) return [false, getTooLargeRejectionErr(maxSize)];
  }

  return [true, null];
}

function isDefined(value) {
  return value !== undefined && value !== null;
}
/**
 *
 * @param {object} options
 * @param {File[]} options.files
 * @param {string} [options.accept]
 * @param {number} [options.minSize]
 * @param {number} [options.maxSize]
 * @param {boolean} [options.multiple]
 * @param {number} [options.maxFiles]
 * @param {(f: File) => FileError|FileError[]|null} [options.validator]
 * @returns
 */


function allFilesAccepted(_ref) {
  var files = _ref.files,
      accept = _ref.accept,
      minSize = _ref.minSize,
      maxSize = _ref.maxSize,
      multiple = _ref.multiple,
      maxFiles = _ref.maxFiles,
      validator = _ref.validator;

  if (!multiple && files.length > 1 || multiple && maxFiles >= 1 && files.length > maxFiles) {
    return false;
  }

  return files.every(function (file) {
    var _fileAccepted = fileAccepted(file, accept),
        _fileAccepted2 = _slicedToArray$1(_fileAccepted, 1),
        accepted = _fileAccepted2[0];

    var _fileMatchSize = fileMatchSize(file, minSize, maxSize),
        _fileMatchSize2 = _slicedToArray$1(_fileMatchSize, 1),
        sizeMatch = _fileMatchSize2[0];

    var customErrors = validator ? validator(file) : null;
    return accepted && sizeMatch && !customErrors;
  });
} // React's synthetic events has event.isPropagationStopped,
// but to remain compatibility with other libs (Preact) fall back
// to check event.cancelBubble

function isPropagationStopped(event) {
  if (typeof event.isPropagationStopped === "function") {
    return event.isPropagationStopped();
  } else if (typeof event.cancelBubble !== "undefined") {
    return event.cancelBubble;
  }

  return false;
}
function isEvtWithFiles(event) {
  if (!event.dataTransfer) {
    return !!event.target && !!event.target.files;
  } // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#file


  return Array.prototype.some.call(event.dataTransfer.types, function (type) {
    return type === "Files" || type === "application/x-moz-file";
  });
}

function onDocumentDragOver(event) {
  event.preventDefault();
}

function isIe(userAgent) {
  return userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1;
}

function isEdge(userAgent) {
  return userAgent.indexOf("Edge/") !== -1;
}

function isIeOrEdge() {
  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.navigator.userAgent;
  return isIe(userAgent) || isEdge(userAgent);
}
/**
 * This is intended to be used to compose event handlers
 * They are executed in order until one of them calls `event.isPropagationStopped()`.
 * Note that the check is done on the first invoke too,
 * meaning that if propagation was stopped before invoking the fns,
 * no handlers will be executed.
 *
 * @param {Function} fns the event hanlder functions
 * @return {Function} the event handler to add to an element
 */

function composeEventHandlers() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return fns.some(function (fn) {
      if (!isPropagationStopped(event) && fn) {
        fn.apply(void 0, [event].concat(args));
      }

      return isPropagationStopped(event);
    });
  };
}
/**
 * canUseFileSystemAccessAPI checks if the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)
 * is supported by the browser.
 * @returns {boolean}
 */

function canUseFileSystemAccessAPI() {
  return "showOpenFilePicker" in window;
}
/**
 * Convert the `{accept}` dropzone prop to the
 * `{types}` option for https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker
 *
 * @param {AcceptProp} accept
 * @returns {{accept: string[]}[]}
 */

function pickerOptionsFromAccept(accept) {
  if (isDefined(accept)) {
    var acceptForPicker = Object.entries(accept).filter(function (_ref2) {
      var _ref3 = _slicedToArray$1(_ref2, 2),
          mimeType = _ref3[0],
          ext = _ref3[1];

      var ok = true;

      if (!isMIMEType(mimeType)) {
        console.warn("Skipped \"".concat(mimeType, "\" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types."));
        ok = false;
      }

      if (!Array.isArray(ext) || !ext.every(isExt)) {
        console.warn("Skipped \"".concat(mimeType, "\" because an invalid file extension was provided."));
        ok = false;
      }

      return ok;
    }).reduce(function (agg, _ref4) {
      var _ref5 = _slicedToArray$1(_ref4, 2),
          mimeType = _ref5[0],
          ext = _ref5[1];

      return _objectSpread$1(_objectSpread$1({}, agg), {}, _defineProperty$1({}, mimeType, ext));
    }, {});
    return [{
      // description is required due to https://crbug.com/1264708
      description: "Files",
      accept: acceptForPicker
    }];
  }

  return accept;
}
/**
 * Convert the `{accept}` dropzone prop to an array of MIME types/extensions.
 * @param {AcceptProp} accept
 * @returns {string}
 */

function acceptPropAsAcceptAttr(accept) {
  if (isDefined(accept)) {
    return Object.entries(accept).reduce(function (a, _ref6) {
      var _ref7 = _slicedToArray$1(_ref6, 2),
          mimeType = _ref7[0],
          ext = _ref7[1];

      return [].concat(_toConsumableArray$1(a), [mimeType], _toConsumableArray$1(ext));
    }, []) // Silently discard invalid entries as pickerOptionsFromAccept warns about these
    .filter(function (v) {
      return isMIMEType(v) || isExt(v);
    }).join(",");
  }

  return undefined;
}
/**
 * Check if v is an exception caused by aborting a request (e.g window.showOpenFilePicker()).
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/DOMException.
 * @param {any} v
 * @returns {boolean} True if v is an abort exception.
 */

function isAbort(v) {
  return v instanceof DOMException && (v.name === "AbortError" || v.code === v.ABORT_ERR);
}
/**
 * Check if v is a security error.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/DOMException.
 * @param {any} v
 * @returns {boolean} True if v is a security error.
 */

function isSecurityError(v) {
  return v instanceof DOMException && (v.name === "SecurityError" || v.code === v.SECURITY_ERR);
}
/**
 * Check if v is a MIME type string.
 *
 * See accepted format: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers.
 *
 * @param {string} v
 */

function isMIMEType(v) {
  return v === "audio/*" || v === "video/*" || v === "image/*" || v === "text/*" || v === "application/*" || /\w+\/[-+.\w]+/g.test(v);
}
/**
 * Check if v is a file extension.
 * @param {string} v
 */

function isExt(v) {
  return /^.*\.[\w]+$/.test(v);
}
/**
 * @typedef {Object.<string, string[]>} AcceptProp
 */

/**
 * @typedef {object} FileError
 * @property {string} message
 * @property {ErrorCode|string} code
 */

/**
 * @typedef {"file-invalid-type"|"file-too-large"|"file-too-small"|"too-many-files"} ErrorCode
 */

var _excluded = ["children"],
    _excluded2 = ["open"],
    _excluded3 = ["refKey", "role", "onKeyDown", "onFocus", "onBlur", "onClick", "onDragEnter", "onDragOver", "onDragLeave", "onDrop"],
    _excluded4 = ["refKey", "onChange", "onClick"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Convenience wrapper component for the `useDropzone` hook
 *
 * ```jsx
 * <Dropzone>
 *   {({getRootProps, getInputProps}) => (
 *     <div {...getRootProps()}>
 *       <input {...getInputProps()} />
 *       <p>Drag 'n' drop some files here, or click to select files</p>
 *     </div>
 *   )}
 * </Dropzone>
 * ```
 */

var Dropzone = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var children = _ref.children,
      params = _objectWithoutProperties(_ref, _excluded);

  var _useDropzone = useDropzone(params),
      open = _useDropzone.open,
      props = _objectWithoutProperties(_useDropzone, _excluded2);

  useImperativeHandle(ref, function () {
    return {
      open: open
    };
  }, [open]); // TODO: Figure out why react-styleguidist cannot create docs if we don't return a jsx element

  return /*#__PURE__*/React.createElement(Fragment$1, null, children(_objectSpread(_objectSpread({}, props), {}, {
    open: open
  })));
});
Dropzone.displayName = "Dropzone"; // Add default props for react-docgen

var defaultProps = {
  disabled: false,
  getFilesFromEvent: fromEvent,
  maxSize: Infinity,
  minSize: 0,
  multiple: true,
  maxFiles: 0,
  preventDropOnDocument: true,
  noClick: false,
  noKeyboard: false,
  noDrag: false,
  noDragEventsBubbling: false,
  validator: null,
  useFsAccessApi: false,
  autoFocus: false
};
Dropzone.defaultProps = defaultProps;
Dropzone.propTypes = {
  /**
   * Render function that exposes the dropzone state and prop getter fns
   *
   * @param {object} params
   * @param {Function} params.getRootProps Returns the props you should apply to the root drop container you render
   * @param {Function} params.getInputProps Returns the props you should apply to hidden file input you render
   * @param {Function} params.open Open the native file selection dialog
   * @param {boolean} params.isFocused Dropzone area is in focus
   * @param {boolean} params.isFileDialogActive File dialog is opened
   * @param {boolean} params.isDragActive Active drag is in progress
   * @param {boolean} params.isDragAccept Dragged files are accepted
   * @param {boolean} params.isDragReject Some dragged files are rejected
   * @param {File[]} params.acceptedFiles Accepted files
   * @param {FileRejection[]} params.fileRejections Rejected files and why they were rejected
   */
  children: PropTypes.func,

  /**
   * Set accepted file types.
   * Checkout https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker types option for more information.
   * Keep in mind that mime type determination is not reliable across platforms. CSV files,
   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
   * Windows. In some cases there might not be a mime type set at all (https://github.com/react-dropzone/react-dropzone/issues/276).
   */
  accept: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),

  /**
   * Allow drag 'n' drop (or selection from the file dialog) of multiple files
   */
  multiple: PropTypes.bool,

  /**
   * If false, allow dropped items to take over the current browser window
   */
  preventDropOnDocument: PropTypes.bool,

  /**
   * If true, disables click to open the native file selection dialog
   */
  noClick: PropTypes.bool,

  /**
   * If true, disables SPACE/ENTER to open the native file selection dialog.
   * Note that it also stops tracking the focus state.
   */
  noKeyboard: PropTypes.bool,

  /**
   * If true, disables drag 'n' drop
   */
  noDrag: PropTypes.bool,

  /**
   * If true, stops drag event propagation to parents
   */
  noDragEventsBubbling: PropTypes.bool,

  /**
   * Minimum file size (in bytes)
   */
  minSize: PropTypes.number,

  /**
   * Maximum file size (in bytes)
   */
  maxSize: PropTypes.number,

  /**
   * Maximum accepted number of files
   * The default value is 0 which means there is no limitation to how many files are accepted.
   */
  maxFiles: PropTypes.number,

  /**
   * Enable/disable the dropzone
   */
  disabled: PropTypes.bool,

  /**
   * Use this to provide a custom file aggregator
   *
   * @param {(DragEvent|Event|Array<FileSystemFileHandle>)} event A drag event or input change event (if files were selected via the file dialog)
   */
  getFilesFromEvent: PropTypes.func,

  /**
   * Cb for when closing the file dialog with no selection
   */
  onFileDialogCancel: PropTypes.func,

  /**
   * Cb for when opening the file dialog
   */
  onFileDialogOpen: PropTypes.func,

  /**
   * Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
   * to open the file picker instead of using an `<input type="file">` click event.
   */
  useFsAccessApi: PropTypes.bool,

  /**
   * Set to true to focus the root element on render
   */
  autoFocus: PropTypes.bool,

  /**
   * Cb for when the `dragenter` event occurs.
   *
   * @param {DragEvent} event
   */
  onDragEnter: PropTypes.func,

  /**
   * Cb for when the `dragleave` event occurs
   *
   * @param {DragEvent} event
   */
  onDragLeave: PropTypes.func,

  /**
   * Cb for when the `dragover` event occurs
   *
   * @param {DragEvent} event
   */
  onDragOver: PropTypes.func,

  /**
   * Cb for when the `drop` event occurs.
   * Note that this callback is invoked after the `getFilesFromEvent` callback is done.
   *
   * Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
   * `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
   * If `multiple` is set to false and additional files are dropped,
   * all files besides the first will be rejected.
   * Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
   *
   * Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
   * If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
   *
   * `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
   * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
   *
   * ```js
   * function onDrop(acceptedFiles) {
   *   const req = request.post('/upload')
   *   acceptedFiles.forEach(file => {
   *     req.attach(file.name, file)
   *   })
   *   req.end(callback)
   * }
   * ```
   *
   * @param {File[]} acceptedFiles
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  onDrop: PropTypes.func,

  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are accepted, this callback is not invoked.
   *
   * @param {File[]} files
   * @param {(DragEvent|Event)} event
   */
  onDropAccepted: PropTypes.func,

  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are rejected, this callback is not invoked.
   *
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event
   */
  onDropRejected: PropTypes.func,

  /**
   * Cb for when there's some error from any of the promises.
   *
   * @param {Error} error
   */
  onError: PropTypes.func,

  /**
   * Custom validation function. It must return null if there's no errors.
   * @param {File} file
   * @returns {FileError|FileError[]|null}
   */
  validator: PropTypes.func
};
/**
 * A function that is invoked for the `dragenter`,
 * `dragover` and `dragleave` events.
 * It is not invoked if the items are not files (such as link, text, etc.).
 *
 * @callback dragCb
 * @param {DragEvent} event
 */

/**
 * A function that is invoked for the `drop` or input change event.
 * It is not invoked if the items are not files (such as link, text, etc.).
 *
 * @callback dropCb
 * @param {File[]} acceptedFiles List of accepted files
 * @param {FileRejection[]} fileRejections List of rejected files and why they were rejected
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is invoked for the `drop` or input change event.
 * It is not invoked if the items are files (such as link, text, etc.).
 *
 * @callback dropAcceptedCb
 * @param {File[]} files List of accepted files that meet the given criteria
 * (`accept`, `multiple`, `minSize`, `maxSize`)
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is invoked for the `drop` or input change event.
 *
 * @callback dropRejectedCb
 * @param {File[]} files List of rejected files that do not meet the given criteria
 * (`accept`, `multiple`, `minSize`, `maxSize`)
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is used aggregate files,
 * in a asynchronous fashion, from drag or input change events.
 *
 * @callback getFilesFromEvent
 * @param {(DragEvent|Event|Array<FileSystemFileHandle>)} event A drag event or input change event (if files were selected via the file dialog)
 * @returns {(File[]|Promise<File[]>)}
 */

/**
 * An object with the current dropzone state.
 *
 * @typedef {object} DropzoneState
 * @property {boolean} isFocused Dropzone area is in focus
 * @property {boolean} isFileDialogActive File dialog is opened
 * @property {boolean} isDragActive Active drag is in progress
 * @property {boolean} isDragAccept Dragged files are accepted
 * @property {boolean} isDragReject Some dragged files are rejected
 * @property {File[]} acceptedFiles Accepted files
 * @property {FileRejection[]} fileRejections Rejected files and why they were rejected
 */

/**
 * An object with the dropzone methods.
 *
 * @typedef {object} DropzoneMethods
 * @property {Function} getRootProps Returns the props you should apply to the root drop container you render
 * @property {Function} getInputProps Returns the props you should apply to hidden file input you render
 * @property {Function} open Open the native file selection dialog
 */

var initialState = {
  isFocused: false,
  isFileDialogActive: false,
  isDragActive: false,
  isDragAccept: false,
  isDragReject: false,
  acceptedFiles: [],
  fileRejections: []
};
/**
 * A React hook that creates a drag 'n' drop area.
 *
 * ```jsx
 * function MyDropzone(props) {
 *   const {getRootProps, getInputProps} = useDropzone({
 *     onDrop: acceptedFiles => {
 *       // do something with the File objects, e.g. upload to some server
 *     }
 *   });
 *   return (
 *     <div {...getRootProps()}>
 *       <input {...getInputProps()} />
 *       <p>Drag and drop some files here, or click to select files</p>
 *     </div>
 *   )
 * }
 * ```
 *
 * @function useDropzone
 *
 * @param {object} props
 * @param {import("./utils").AcceptProp} [props.accept] Set accepted file types.
 * Checkout https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker types option for more information.
 * Keep in mind that mime type determination is not reliable across platforms. CSV files,
 * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
 * Windows. In some cases there might not be a mime type set at all (https://github.com/react-dropzone/react-dropzone/issues/276).
 * @param {boolean} [props.multiple=true] Allow drag 'n' drop (or selection from the file dialog) of multiple files
 * @param {boolean} [props.preventDropOnDocument=true] If false, allow dropped items to take over the current browser window
 * @param {boolean} [props.noClick=false] If true, disables click to open the native file selection dialog
 * @param {boolean} [props.noKeyboard=false] If true, disables SPACE/ENTER to open the native file selection dialog.
 * Note that it also stops tracking the focus state.
 * @param {boolean} [props.noDrag=false] If true, disables drag 'n' drop
 * @param {boolean} [props.noDragEventsBubbling=false] If true, stops drag event propagation to parents
 * @param {number} [props.minSize=0] Minimum file size (in bytes)
 * @param {number} [props.maxSize=Infinity] Maximum file size (in bytes)
 * @param {boolean} [props.disabled=false] Enable/disable the dropzone
 * @param {getFilesFromEvent} [props.getFilesFromEvent] Use this to provide a custom file aggregator
 * @param {Function} [props.onFileDialogCancel] Cb for when closing the file dialog with no selection
 * @param {boolean} [props.useFsAccessApi] Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
 * to open the file picker instead of using an `<input type="file">` click event.
 * @param {boolean} autoFocus Set to true to auto focus the root element.
 * @param {Function} [props.onFileDialogOpen] Cb for when opening the file dialog
 * @param {dragCb} [props.onDragEnter] Cb for when the `dragenter` event occurs.
 * @param {dragCb} [props.onDragLeave] Cb for when the `dragleave` event occurs
 * @param {dragCb} [props.onDragOver] Cb for when the `dragover` event occurs
 * @param {dropCb} [props.onDrop] Cb for when the `drop` event occurs.
 * Note that this callback is invoked after the `getFilesFromEvent` callback is done.
 *
 * Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
 * `accept` must be an object with keys as a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) and the value an array of file extensions (optional).
 * If `multiple` is set to false and additional files are dropped,
 * all files besides the first will be rejected.
 * Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
 *
 * Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
 * If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
 *
 * `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
 * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
 *
 * ```js
 * function onDrop(acceptedFiles) {
 *   const req = request.post('/upload')
 *   acceptedFiles.forEach(file => {
 *     req.attach(file.name, file)
 *   })
 *   req.end(callback)
 * }
 * ```
 * @param {dropAcceptedCb} [props.onDropAccepted]
 * @param {dropRejectedCb} [props.onDropRejected]
 * @param {(error: Error) => void} [props.onError]
 *
 * @returns {DropzoneState & DropzoneMethods}
 */

function useDropzone() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _defaultProps$props = _objectSpread(_objectSpread({}, defaultProps), props),
      accept = _defaultProps$props.accept,
      disabled = _defaultProps$props.disabled,
      getFilesFromEvent = _defaultProps$props.getFilesFromEvent,
      maxSize = _defaultProps$props.maxSize,
      minSize = _defaultProps$props.minSize,
      multiple = _defaultProps$props.multiple,
      maxFiles = _defaultProps$props.maxFiles,
      onDragEnter = _defaultProps$props.onDragEnter,
      onDragLeave = _defaultProps$props.onDragLeave,
      onDragOver = _defaultProps$props.onDragOver,
      onDrop = _defaultProps$props.onDrop,
      onDropAccepted = _defaultProps$props.onDropAccepted,
      onDropRejected = _defaultProps$props.onDropRejected,
      onFileDialogCancel = _defaultProps$props.onFileDialogCancel,
      onFileDialogOpen = _defaultProps$props.onFileDialogOpen,
      useFsAccessApi = _defaultProps$props.useFsAccessApi,
      autoFocus = _defaultProps$props.autoFocus,
      preventDropOnDocument = _defaultProps$props.preventDropOnDocument,
      noClick = _defaultProps$props.noClick,
      noKeyboard = _defaultProps$props.noKeyboard,
      noDrag = _defaultProps$props.noDrag,
      noDragEventsBubbling = _defaultProps$props.noDragEventsBubbling,
      onError = _defaultProps$props.onError,
      validator = _defaultProps$props.validator;

  var acceptAttr = useMemo(function () {
    return acceptPropAsAcceptAttr(accept);
  }, [accept]);
  var pickerTypes = useMemo(function () {
    return pickerOptionsFromAccept(accept);
  }, [accept]);
  var onFileDialogOpenCb = useMemo(function () {
    return typeof onFileDialogOpen === "function" ? onFileDialogOpen : noop;
  }, [onFileDialogOpen]);
  var onFileDialogCancelCb = useMemo(function () {
    return typeof onFileDialogCancel === "function" ? onFileDialogCancel : noop;
  }, [onFileDialogCancel]);
  /**
   * @constant
   * @type {React.MutableRefObject<HTMLElement>}
   */

  var rootRef = useRef(null);
  var inputRef = useRef(null);

  var _useReducer = useReducer(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var isFocused = state.isFocused,
      isFileDialogActive = state.isFileDialogActive;
  var fsAccessApiWorksRef = useRef(typeof window !== "undefined" && window.isSecureContext && useFsAccessApi && canUseFileSystemAccessAPI()); // Update file dialog active state when the window is focused on

  var onWindowFocus = function onWindowFocus() {
    // Execute the timeout only if the file dialog is opened in the browser
    if (!fsAccessApiWorksRef.current && isFileDialogActive) {
      setTimeout(function () {
        if (inputRef.current) {
          var files = inputRef.current.files;

          if (!files.length) {
            dispatch({
              type: "closeDialog"
            });
            onFileDialogCancelCb();
          }
        }
      }, 300);
    }
  };

  useEffect(function () {
    window.addEventListener("focus", onWindowFocus, false);
    return function () {
      window.removeEventListener("focus", onWindowFocus, false);
    };
  }, [inputRef, isFileDialogActive, onFileDialogCancelCb, fsAccessApiWorksRef]);
  var dragTargetsRef = useRef([]);

  var onDocumentDrop = function onDocumentDrop(event) {
    if (rootRef.current && rootRef.current.contains(event.target)) {
      // If we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
      return;
    }

    event.preventDefault();
    dragTargetsRef.current = [];
  };

  useEffect(function () {
    if (preventDropOnDocument) {
      document.addEventListener("dragover", onDocumentDragOver, false);
      document.addEventListener("drop", onDocumentDrop, false);
    }

    return function () {
      if (preventDropOnDocument) {
        document.removeEventListener("dragover", onDocumentDragOver);
        document.removeEventListener("drop", onDocumentDrop);
      }
    };
  }, [rootRef, preventDropOnDocument]); // Auto focus the root when autoFocus is true

  useEffect(function () {
    if (!disabled && autoFocus && rootRef.current) {
      rootRef.current.focus();
    }

    return function () {};
  }, [rootRef, autoFocus, disabled]);
  var onErrCb = useCallback(function (e) {
    if (onError) {
      onError(e);
    } else {
      // Let the user know something's gone wrong if they haven't provided the onError cb.
      console.error(e);
    }
  }, [onError]);
  var onDragEnterCb = useCallback(function (event) {
    event.preventDefault(); // Persist here because we need the event later after getFilesFromEvent() is done

    event.persist();
    stopPropagation(event);
    dragTargetsRef.current = [].concat(_toConsumableArray(dragTargetsRef.current), [event.target]);

    if (isEvtWithFiles(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function (files) {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }

        var fileCount = files.length;
        var isDragAccept = fileCount > 0 && allFilesAccepted({
          files: files,
          accept: acceptAttr,
          minSize: minSize,
          maxSize: maxSize,
          multiple: multiple,
          maxFiles: maxFiles,
          validator: validator
        });
        var isDragReject = fileCount > 0 && !isDragAccept;
        dispatch({
          isDragAccept: isDragAccept,
          isDragReject: isDragReject,
          isDragActive: true,
          type: "setDraggedFiles"
        });

        if (onDragEnter) {
          onDragEnter(event);
        }
      }).catch(function (e) {
        return onErrCb(e);
      });
    }
  }, [getFilesFromEvent, onDragEnter, onErrCb, noDragEventsBubbling, acceptAttr, minSize, maxSize, multiple, maxFiles, validator]);
  var onDragOverCb = useCallback(function (event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    var hasFiles = isEvtWithFiles(event);

    if (hasFiles && event.dataTransfer) {
      try {
        event.dataTransfer.dropEffect = "copy";
      } catch (_unused) {}
      /* eslint-disable-line no-empty */

    }

    if (hasFiles && onDragOver) {
      onDragOver(event);
    }

    return false;
  }, [onDragOver, noDragEventsBubbling]);
  var onDragLeaveCb = useCallback(function (event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event); // Only deactivate once the dropzone and all children have been left

    var targets = dragTargetsRef.current.filter(function (target) {
      return rootRef.current && rootRef.current.contains(target);
    }); // Make sure to remove a target present multiple times only once
    // (Firefox may fire dragenter/dragleave multiple times on the same element)

    var targetIdx = targets.indexOf(event.target);

    if (targetIdx !== -1) {
      targets.splice(targetIdx, 1);
    }

    dragTargetsRef.current = targets;

    if (targets.length > 0) {
      return;
    }

    dispatch({
      type: "setDraggedFiles",
      isDragActive: false,
      isDragAccept: false,
      isDragReject: false
    });

    if (isEvtWithFiles(event) && onDragLeave) {
      onDragLeave(event);
    }
  }, [rootRef, onDragLeave, noDragEventsBubbling]);
  var setFiles = useCallback(function (files, event) {
    var acceptedFiles = [];
    var fileRejections = [];
    files.forEach(function (file) {
      var _fileAccepted = fileAccepted(file, acceptAttr),
          _fileAccepted2 = _slicedToArray(_fileAccepted, 2),
          accepted = _fileAccepted2[0],
          acceptError = _fileAccepted2[1];

      var _fileMatchSize = fileMatchSize(file, minSize, maxSize),
          _fileMatchSize2 = _slicedToArray(_fileMatchSize, 2),
          sizeMatch = _fileMatchSize2[0],
          sizeError = _fileMatchSize2[1];

      var customErrors = validator ? validator(file) : null;

      if (accepted && sizeMatch && !customErrors) {
        acceptedFiles.push(file);
      } else {
        var errors = [acceptError, sizeError];

        if (customErrors) {
          errors = errors.concat(customErrors);
        }

        fileRejections.push({
          file: file,
          errors: errors.filter(function (e) {
            return e;
          })
        });
      }
    });

    if (!multiple && acceptedFiles.length > 1 || multiple && maxFiles >= 1 && acceptedFiles.length > maxFiles) {
      // Reject everything and empty accepted files
      acceptedFiles.forEach(function (file) {
        fileRejections.push({
          file: file,
          errors: [TOO_MANY_FILES_REJECTION]
        });
      });
      acceptedFiles.splice(0);
    }

    dispatch({
      acceptedFiles: acceptedFiles,
      fileRejections: fileRejections,
      isDragReject: fileRejections.length > 0,
      type: "setFiles"
    });

    if (onDrop) {
      onDrop(acceptedFiles, fileRejections, event);
    }

    if (fileRejections.length > 0 && onDropRejected) {
      onDropRejected(fileRejections, event);
    }

    if (acceptedFiles.length > 0 && onDropAccepted) {
      onDropAccepted(acceptedFiles, event);
    }
  }, [dispatch, multiple, acceptAttr, minSize, maxSize, maxFiles, onDrop, onDropAccepted, onDropRejected, validator]);
  var onDropCb = useCallback(function (event) {
    event.preventDefault(); // Persist here because we need the event later after getFilesFromEvent() is done

    event.persist();
    stopPropagation(event);
    dragTargetsRef.current = [];

    if (isEvtWithFiles(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function (files) {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }

        setFiles(files, event);
      }).catch(function (e) {
        return onErrCb(e);
      });
    }

    dispatch({
      type: "reset"
    });
  }, [getFilesFromEvent, setFiles, onErrCb, noDragEventsBubbling]); // Fn for opening the file dialog programmatically

  var openFileDialog = useCallback(function () {
    // No point to use FS access APIs if context is not secure
    // https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts#feature_detection
    if (fsAccessApiWorksRef.current) {
      dispatch({
        type: "openDialog"
      });
      onFileDialogOpenCb(); // https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker

      var opts = {
        multiple: multiple,
        types: pickerTypes
      };
      window.showOpenFilePicker(opts).then(function (handles) {
        return getFilesFromEvent(handles);
      }).then(function (files) {
        setFiles(files, null);
        dispatch({
          type: "closeDialog"
        });
      }).catch(function (e) {
        // AbortError means the user canceled
        if (isAbort(e)) {
          onFileDialogCancelCb(e);
          dispatch({
            type: "closeDialog"
          });
        } else if (isSecurityError(e)) {
          fsAccessApiWorksRef.current = false; // CORS, so cannot use this API
          // Try using the input

          if (inputRef.current) {
            inputRef.current.value = null;
            inputRef.current.click();
          } else {
            onErrCb(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."));
          }
        } else {
          onErrCb(e);
        }
      });
      return;
    }

    if (inputRef.current) {
      dispatch({
        type: "openDialog"
      });
      onFileDialogOpenCb();
      inputRef.current.value = null;
      inputRef.current.click();
    }
  }, [dispatch, onFileDialogOpenCb, onFileDialogCancelCb, useFsAccessApi, setFiles, onErrCb, pickerTypes, multiple]); // Cb to open the file dialog when SPACE/ENTER occurs on the dropzone

  var onKeyDownCb = useCallback(function (event) {
    // Ignore keyboard events bubbling up the DOM tree
    if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
      return;
    }

    if (event.key === " " || event.key === "Enter" || event.keyCode === 32 || event.keyCode === 13) {
      event.preventDefault();
      openFileDialog();
    }
  }, [rootRef, openFileDialog]); // Update focus state for the dropzone

  var onFocusCb = useCallback(function () {
    dispatch({
      type: "focus"
    });
  }, []);
  var onBlurCb = useCallback(function () {
    dispatch({
      type: "blur"
    });
  }, []); // Cb to open the file dialog when click occurs on the dropzone

  var onClickCb = useCallback(function () {
    if (noClick) {
      return;
    } // In IE11/Edge the file-browser dialog is blocking, therefore, use setTimeout()
    // to ensure React can handle state changes
    // See: https://github.com/react-dropzone/react-dropzone/issues/450


    if (isIeOrEdge()) {
      setTimeout(openFileDialog, 0);
    } else {
      openFileDialog();
    }
  }, [noClick, openFileDialog]);

  var composeHandler = function composeHandler(fn) {
    return disabled ? null : fn;
  };

  var composeKeyboardHandler = function composeKeyboardHandler(fn) {
    return noKeyboard ? null : composeHandler(fn);
  };

  var composeDragHandler = function composeDragHandler(fn) {
    return noDrag ? null : composeHandler(fn);
  };

  var stopPropagation = function stopPropagation(event) {
    if (noDragEventsBubbling) {
      event.stopPropagation();
    }
  };

  var getRootProps = useMemo(function () {
    return function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$refKey = _ref2.refKey,
          refKey = _ref2$refKey === void 0 ? "ref" : _ref2$refKey,
          role = _ref2.role,
          onKeyDown = _ref2.onKeyDown,
          onFocus = _ref2.onFocus,
          onBlur = _ref2.onBlur,
          onClick = _ref2.onClick,
          onDragEnter = _ref2.onDragEnter,
          onDragOver = _ref2.onDragOver,
          onDragLeave = _ref2.onDragLeave,
          onDrop = _ref2.onDrop,
          rest = _objectWithoutProperties(_ref2, _excluded3);

      return _objectSpread(_objectSpread(_defineProperty({
        onKeyDown: composeKeyboardHandler(composeEventHandlers(onKeyDown, onKeyDownCb)),
        onFocus: composeKeyboardHandler(composeEventHandlers(onFocus, onFocusCb)),
        onBlur: composeKeyboardHandler(composeEventHandlers(onBlur, onBlurCb)),
        onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
        onDragEnter: composeDragHandler(composeEventHandlers(onDragEnter, onDragEnterCb)),
        onDragOver: composeDragHandler(composeEventHandlers(onDragOver, onDragOverCb)),
        onDragLeave: composeDragHandler(composeEventHandlers(onDragLeave, onDragLeaveCb)),
        onDrop: composeDragHandler(composeEventHandlers(onDrop, onDropCb)),
        role: typeof role === "string" && role !== "" ? role : "presentation"
      }, refKey, rootRef), !disabled && !noKeyboard ? {
        tabIndex: 0
      } : {}), rest);
    };
  }, [rootRef, onKeyDownCb, onFocusCb, onBlurCb, onClickCb, onDragEnterCb, onDragOverCb, onDragLeaveCb, onDropCb, noKeyboard, noDrag, disabled]);
  var onInputElementClick = useCallback(function (event) {
    event.stopPropagation();
  }, []);
  var getInputProps = useMemo(function () {
    return function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$refKey = _ref3.refKey,
          refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey,
          onChange = _ref3.onChange,
          onClick = _ref3.onClick,
          rest = _objectWithoutProperties(_ref3, _excluded4);

      var inputProps = _defineProperty({
        accept: acceptAttr,
        multiple: multiple,
        type: "file",
        style: {
          border: 0,
          clip: "rect(0, 0, 0, 0)",
          clipPath: "inset(50%)",
          height: "1px",
          margin: "0 -1px -1px 0",
          overflow: "hidden",
          padding: 0,
          position: "absolute",
          width: "1px",
          whiteSpace: "nowrap"
        },
        onChange: composeHandler(composeEventHandlers(onChange, onDropCb)),
        onClick: composeHandler(composeEventHandlers(onClick, onInputElementClick)),
        tabIndex: -1
      }, refKey, inputRef);

      return _objectSpread(_objectSpread({}, inputProps), rest);
    };
  }, [inputRef, accept, multiple, onDropCb, disabled]);
  return _objectSpread(_objectSpread({}, state), {}, {
    isFocused: isFocused && !disabled,
    getRootProps: getRootProps,
    getInputProps: getInputProps,
    rootRef: rootRef,
    inputRef: inputRef,
    open: composeHandler(openFileDialog)
  });
}
/**
 * @param {DropzoneState} state
 * @param {{type: string} & DropzoneState} action
 * @returns {DropzoneState}
 */

function reducer(state, action) {
  /* istanbul ignore next */
  switch (action.type) {
    case "focus":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFocused: true
      });

    case "blur":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFocused: false
      });

    case "openDialog":
      return _objectSpread(_objectSpread({}, initialState), {}, {
        isFileDialogActive: true
      });

    case "closeDialog":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFileDialogActive: false
      });

    case "setDraggedFiles":
      return _objectSpread(_objectSpread({}, state), {}, {
        isDragActive: action.isDragActive,
        isDragAccept: action.isDragAccept,
        isDragReject: action.isDragReject
      });

    case "setFiles":
      return _objectSpread(_objectSpread({}, state), {}, {
        acceptedFiles: action.acceptedFiles,
        fileRejections: action.fileRejections,
        isDragReject: action.isDragReject
      });

    case "reset":
      return _objectSpread({}, initialState);

    default:
      return state;
  }
}

function noop() {}

function ImageUpload({
  onImageCapture,
  isAnalyzing
}) {
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"]
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setError(null);
        const previewUrl = URL.createObjectURL(acceptedFiles[0]);
        setPreview(previewUrl);
        try {
          await onImageCapture(acceptedFiles[0]);
          toast.success("Image successfully uploaded");
        } catch (err) {
          toast.error("Failed to process image");
        }
      }
    },
    onDropRejected: () => {
      setError("Please upload a valid image file (PNG, JPG, or JPEG)");
      toast.error("Invalid file type");
    }
  });
  const clearPreview = (e) => {
    e.stopPropagation();
    setPreview(null);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...getRootProps(),
      className: "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors",
      children: [
        preview ? /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: preview,
              alt: "Preview",
              className: "mx-auto rounded-md max-h-48 object-contain"
            }
          ),
          !isAnalyzing && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: clearPreview,
              className: "absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full",
              children: /* @__PURE__ */ jsx(X, { size: 16 })
            }
          )
        ] }) : null,
        /* @__PURE__ */ jsx("input", { ...getInputProps() }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-3 rounded-full", children: isAnalyzing ? /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 text-blue-500 animate-spin" }) : /* @__PURE__ */ jsx(Camera, { className: "h-6 w-6 text-blue-500" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 font-medium", children: isDragActive ? "Drop the image here" : isAnalyzing ? "Analyzing..." : preview ? "Change Image" : "Scan Medicine" }),
          error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-2", children: error })
        ] })
      ]
    }
  );
}

const showToast = (message, type) => {
  toast.dismiss();
  toast[type](message, {
    duration: 3e3,
    position: "bottom-right",
    style: {
      background: "#f3f4f6",
      // light gray background
      color: "#1f2937",
      // dark gray text
      border: "1px solid #e5e7eb"
      // subtle border
    },
    icon: type === "success" ? "✅" : "❌",
    className: "toast-slide-in"
  });
};

function Header({
  isSettingsOpen,
  setIsSettingsOpen
}) {
  return /* @__PURE__ */ jsx("header", { className: "bg-blue-700 text-white p-4 shadow-md ", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex justify-between items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx(HeartPulse, { className: "h-8 w-8" }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Medlex+" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-centre space-x-10", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsSettingsOpen(!isSettingsOpen),
          className: "p rounded-full hover:bg-blue-700 transition-colors",
          "aria-label": isSettingsOpen ? "Close settings" : "Open settings",
          children: isSettingsOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Settings, { className: "h-6 w-6" })
        }
      ),
      /* @__PURE__ */ jsx(CircleUserRound, { className: "h-6 w-6" })
    ] })
  ] }) });
}

function SearchSection({
  searchQuery,
  setSearchQuery,
  handleSearch,
  setSelectedMedicine,
  setImgAnalyzed
}) {
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex-1 flex", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: searchQuery,
        onChange: (e) => {
          setSearchQuery(e.target.value);
          if (e.target.value === "") {
            setSelectedMedicine("");
            setImgAnalyzed(null);
          }
        },
        placeholder: "Enter medicine name...",
        className: "flex-1  text-black rounded-l-lg border-y border-l border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C62E2E] focus:border-transparent"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-[#C62E2E] transition-colors",
        children: /* @__PURE__ */ jsx(Search, { className: "h-5 w-5" })
      }
    )
  ] });
}

function TabSkeleton() {
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 flex-1", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "h-6 w-24 bg-gray-200 rounded animate-pulse mb-2" }),
        /* @__PURE__ */ jsx("div", { className: "h-20 bg-gray-200 rounded animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "h-6 w-24 bg-gray-200 rounded animate-pulse mb-2" }),
        /* @__PURE__ */ jsx("div", { className: "h-20 bg-gray-200 rounded animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "h-6 w-32 bg-gray-200 rounded animate-pulse mb-2" }),
        /* @__PURE__ */ jsx("div", { className: "h-20 bg-gray-200 rounded animate-pulse" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ml-2 p-2 h-9 w-9 bg-gray-200 rounded animate-pulse" })
  ] }) });
}

let currentUtterance = null;
let currentText = null;
const speakText = (text, options = {}) => {
  const {
    rate = 0.9,
    pitch = 1,
    languageCode = "en-US",
    languageName = "English"
  } = options;
  if (!("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported in this browser");
    return;
  }
  if (currentText === text && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    currentText = null;
    currentUtterance = null;
    return;
  }
  window.speechSynthesis.cancel();
  currentText = text;
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.rate = rate;
  currentUtterance.pitch = pitch;
  try {
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (voice) => voice.lang.startsWith(languageCode)
    );
    if (preferredVoice) {
      currentUtterance.voice = preferredVoice;
      currentUtterance.lang = preferredVoice.lang;
    } else {
      const englishVoice = voices.find((voice) => voice.lang.startsWith("en"));
      if (englishVoice) {
        currentUtterance.voice = englishVoice;
        currentUtterance.lang = "en-US";
      }
      console.warn(
        `Voice not available for ${languageName}, falling back to English`
      );
    }
  } catch (error) {
    console.error("Error setting voice language:", error);
    currentUtterance.lang = "en-US";
  }
  window.speechSynthesis.speak(currentUtterance);
};

function OverviewTab({
  fdaData,
  isLoading
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsx(TabSkeleton, {});
  }
  const purposeText = fdaData?.data?.results?.[0]?.purpose?.[0];
  const indicationsText = fdaData?.data?.results?.[0]?.indications_and_usage?.[0];
  const warningsText = fdaData?.data?.results?.[0]?.warnings_and_cautions?.[0];
  const patientInfoText = fdaData?.data?.results?.[0]?.information_for_patients?.[0];
  const storageText = fdaData?.data?.results?.[0]?.storage_and_handling?.[0];
  const speechText = [
    purposeText && `Purpose: ${purposeText}`,
    indicationsText && `Indications and Usage: ${indicationsText}`,
    warningsText && `Warnings and Cautions: ${warningsText}`,
    patientInfoText && `Information for Patients: ${patientInfoText}`,
    storageText && `Storage and Handling: ${storageText}`
  ].filter(Boolean).join(". ");
  const handleVoiceClick = () => {
    if (speechText) {
      speakText(speechText, {
        rate: 0.9,
        pitch: 1,
        languageCode: "en-US",
        languageName: "English"
      });
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 flex-1", children: [
      purposeText && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Purpose" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: purposeText })
      ] }),
      indicationsText && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Indications & Usage" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: indicationsText })
      ] }),
      warningsText && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Warnings & Cautions" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: warningsText })
      ] }),
      patientInfoText && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Information for Patients" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: patientInfoText })
      ] }),
      storageText && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Storage & Handling" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: storageText })
      ] })
    ] }),
    speechText && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleVoiceClick,
        className: "ml-2 p-2 text-gray-500 hover:text-emerald-600 flex-shrink-0",
        title: "Text to speech",
        children: /* @__PURE__ */ jsx(Volume2, { className: "h-5 w-5" })
      }
    )
  ] }) });
}

function IngredientsTab({
  fdaData,
  isLoading
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsx(TabSkeleton, {});
  }
  const StructuredProductLabeling = fdaData?.data.results?.[0]?.spl_product_data_elements?.[0];
  const activeIngredients = fdaData?.data.results?.[0]?.active_ingredient?.[0];
  const inactiveIngredients = fdaData?.data.results?.[0]?.inactive_ingredient?.[0];
  const hasAnyIngredients = activeIngredients || inactiveIngredients || StructuredProductLabeling;
  if (!hasAnyIngredients) {
    return /* @__PURE__ */ jsx("div", { className: "text-gray-500", children: "No ingredients information available." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Ingredients" }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
      activeIngredients && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Active Ingredients:" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: Array.isArray(activeIngredients) ? activeIngredients.join(", ") : activeIngredients })
      ] }),
      inactiveIngredients && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Inactive Ingredients:" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: Array.isArray(inactiveIngredients) ? inactiveIngredients.join(", ") : inactiveIngredients })
      ] }),
      StructuredProductLabeling && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Structured Product Labeling:" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: StructuredProductLabeling })
      ] })
    ] })
  ] });
}

function SideEffectsTab({
  sideEffectData,
  handleSpeak,
  isLoading
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsx(TabSkeleton, {});
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Side Effects" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleSpeak(
            Object.entries(sideEffectData).map(
              ([category, effects]) => `${category} effects include: ${effects.join(
                ", "
              )}`
            ).join(". ")
          ),
          className: "p-2 rounded-full hover:bg-gray-100",
          children: /* @__PURE__ */ jsx(Volume2, { className: "h-5 w-5" })
        }
      )
    ] }),
    Object.entries(sideEffectData).map(
      ([category, effects]) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(
          "h4",
          {
            className: `font-medium ${category === "common" ? "text-gray-700" : category === "serious" ? "text-red-600" : "text-orange-600"}`,
            children: [
              category.charAt(0).toUpperCase() + category.slice(1),
              " Side Effects"
            ]
          }
        ),
        /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5", children: effects.map((effect, index) => /* @__PURE__ */ jsx("li", { children: effect }, index)) })
      ] }, category)
    )
  ] });
}

function HerbalAlternativesTab({
  herbalData,
  handleSpeak
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Herbal Alternatives" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleSpeak(
            herbalData.options.map(
              (option) => `${option.name}: ${option.benefits}`
            ).join(". ")
          ),
          className: "p-2 rounded-full hover:bg-gray-100",
          children: /* @__PURE__ */ jsx(Volume2, { className: "h-5 w-5" })
        }
      )
    ] }),
    herbalData.options.map((option, index) => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-4 space-y-2", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-medium text-lg", children: option.name }),
      /* @__PURE__ */ jsxs("p", { className: "text-green-600", children: [
        "Benefits: ",
        option.benefits
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-red-600", children: [
        "Warning: ",
        option.warnings
      ] })
    ] }, index)),
    herbalData.disclaimer && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 italic mt-4", children: herbalData.disclaimer })
  ] });
}

function MedicineInfo({
  fdaData,
  sideEffectData,
  // This contains both sideEffects and herbalAlternatives
  handleSpeak,
  isLoading
}) {
  const tabs = [
    // { name: "Extracted Text" , icon : Info},
    { name: "Overview", icon: Info },
    { name: "Ingredients", icon: Pill },
    { name: "Side Effects", icon: AlertTriangle },
    { name: "Herbal Alternatives", icon: Leaf }
  ];
  return /* @__PURE__ */ jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxs(TabGroup, { children: [
    /* @__PURE__ */ jsx(TabList, { className: "flex space-x-1 rounded-xl bg-emerald-900/20 p-1", children: tabs.map((tab) => /* @__PURE__ */ jsx(
      Tab,
      {
        className: ({ selected }) => `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected ? "bg-white text-emerald-700 shadow" : "text-gray-600 hover:bg-white/[0.12] hover:text-emerald-600"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2", children: [
          /* @__PURE__ */ jsx(tab.icon, { className: "h-6 w-4" }),
          /* @__PURE__ */ jsx("span", { children: tab.name })
        ] })
      },
      tab.name
    )) }),
    /* @__PURE__ */ jsxs(TabPanels, { className: "mt-4", children: [
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(
        OverviewTab,
        {
          fdaData,
          handleSpeak,
          isLoading,
          sideEffectData
        }
      ) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(
        IngredientsTab,
        {
          fdaData,
          handleSpeak,
          isLoading,
          sideEffectData
        }
      ) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(
        SideEffectsTab,
        {
          sideEffectData: sideEffectData?.data?.sideEffects,
          fdaData,
          handleSpeak,
          isLoading
        }
      ) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(
        HerbalAlternativesTab,
        {
          fdaData,
          herbalData: sideEffectData?.data?.herbalAlternatives,
          sideEffectData,
          handleSpeak,
          isLoading
        }
      ) })
    ] })
  ] }) });
}

function HealthChat({ userSettings, selectedClarity }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      content: "Hello! I'm your health assistant. How can I help you with your health-related questions today?",
      sender: "assistant",
      timestamp: /* @__PURE__ */ new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const [suggestedQuestions] = useState([
    "What are common side effects of antibiotics?",
    "How can I manage my blood pressure naturally?",
    "What should I know about my medication interactions?",
    "How much exercise is recommended weekly?"
  ]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);
    try {
      const userSettingsText = `User Info:
        Sex: ${userSettings.sex.charAt(0).toUpperCase() + userSettings.sex.slice(1)}
        Medical Conditions: ${userSettings.conditions.join(", ") || "None specified"}
        Age Range: ${userSettings.age.range}
        Clarity Level: ${selectedClarity.label}
        Language: ${userSettings.language.name}`;
      const response = await fetch("/api/health-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMessage,
          userSettings: userSettingsText,
          history: messages.slice(-6)
          // Send last 6 messages for context
        })
      });
      if (!response.ok) {
        throw new Error("Failed to get a response");
      }
      const data = await response.json();
      const assistantMessage = {
        id: Date.now().toString() + "-assistant",
        content: data.response || "I apologize, but I couldn't process your request. Please try again.",
        sender: "assistant",
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString() + "-error",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        sender: "assistant",
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
  };
  const toggleSpeechRecognition = () => {
    if (!isListening) {
      setIsListening(true);
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognitionAPI) {
          const recognition = new SpeechRecognitionAPI();
          recognition.lang = "en-US";
          recognition.interimResults = false;
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputMessage(transcript);
          };
          recognition.onerror = () => {
            setIsListening(false);
          };
          recognition.onend = () => {
            setIsListening(false);
          };
          recognition.start();
        } else {
          alert("Failed to initialize speech recognition.");
          setIsListening(false);
        }
      } else {
        alert("Speech recognition is not supported in your browser.");
        setIsListening(false);
      }
    } else {
      setIsListening(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-4 flex flex-col h-[600px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 pb-3 border-b", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-blue-600", children: "Health Assistant" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-black-500 italic", children: "Always consult with healthcare professionals for medical advice" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: suggestedQuestions.map((question, index) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleSuggestedQuestion(question),
        className: "text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition",
        children: question
      },
      index
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto mb-4 space-y-4 p-2", children: [
      messages.map((message) => /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex ${message.sender === "user" ? "justify-end" : "justify-start"}`,
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: `max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`,
              children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: message.content }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-right mt-1 opacity-70", children: message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                }) })
              ]
            }
          )
        },
        message.id
      )),
      isProcessing && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 text-gray-800 rounded-lg p-3 flex items-center", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Processing your request..." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: toggleSpeechRecognition,
          className: `p-2 rounded-full ${isListening ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`,
          children: isListening ? /* @__PURE__ */ jsx(MicOff, { size: 20 }) : /* @__PURE__ */ jsx(Mic, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: inputMessage,
          onChange: (e) => setInputMessage(e.target.value),
          placeholder: "Ask a health-related question...",
          className: "flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400",
          disabled: isProcessing
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50",
          disabled: !inputMessage.trim() || isProcessing,
          children: /* @__PURE__ */ jsx(Send, { size: 20 })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 text-xs text-black-500 text-center", children: "This assistant provides general health information and is not a substitute for professional medical advice." })
  ] });
}

const api_calls = async (data, settings, selectedClarity) => {
  try {
    const userSettingsText = `User Info:
Sex: ${settings.sex.charAt(0).toUpperCase() + settings.sex.slice(1)}
Medical Conditions: ${settings.conditions.join(", ") || "None specified"}
Age Range: ${settings.age.range}
The user requested that you use ${selectedClarity.label.toLowerCase()} clarity level with your responses and reply in ${settings.language.name} language.`;
    const medResponse = await fetch("/api/confirmMed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicine: data })
    });
    const medData = await medResponse.json();
    showToast("Medicine information verified", "success");
    if (!medData.brand_name) {
      throw new Error("Failed to get medication name");
    }
    const fdaResponse = await fetch("/api/fda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand_name: medData.brand_name
      })
    });
    const fdaData = await fdaResponse.json();
    showToast("Fetched FDA data", "success");
    const sideEffectResponse = await fetch("/api/sideEffect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        medicineName: medData.brand_name,
        purposeText: fdaData.data.results?.[0]?.purpose?.[0] || "",
        indicationsText: fdaData.data.results?.[0]?.indications_and_usage?.[0] || "",
        warningsText: fdaData.data.results?.[0]?.warnings?.[0] || "",
        patientInfoText: fdaData.data.results?.[0]?.patient_information?.[0] || "",
        storageText: fdaData.data.results?.[0]?.storage_and_handling?.[0] || "",
        inactiveIngredients: fdaData.data.results?.[0]?.inactive_ingredient || [],
        activeIngredients: fdaData.data.results?.[0]?.active_ingredient || [],
        structuredProductLabeling: fdaData.data.results?.[0]?.spl_product_data_elements || [],
        userSettings: userSettingsText
      })
    });
    const sideEffectData = await sideEffectResponse.json();
    showToast("Analyzed side effects and alternatives", "success");
    await window.sendWatsonMessage(
      `I'm looking up information about ${medData.brand_name}

${userSettingsText}`
    );
    return {
      fdaData,
      sideEffectData
    };
  } catch (error) {
    throw error;
  }
};
function Dashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [settings, setSettings] = useState(getStoredSettings);
  const [languageQuery, setLanguageQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(settings.language);
  const [selectedClarity, setSelectedClarity] = useState(() => {
    const storedSettings = getStoredSettings();
    return clarityLevels.find((level) => level.id === storedSettings.clarity.id) || clarityLevels[0];
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imgAnalyzed, setImgAnalyzed] = useState(null);
  const [isLoadingMedInfo, setIsLoadingMedInfo] = useState(false);
  const [fdaData, setFdaData] = useState(null);
  const [sideEffectData, setSideEffectData] = useState(null);
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedMedicine(searchQuery);
      setIsLoadingMedInfo(true);
      showToast("Fetching medicine information...", "success");
      try {
        const result = await api_calls(searchQuery, settings, selectedClarity);
        setFdaData(result.fdaData);
        setSideEffectData(result.sideEffectData);
        showToast("Medicine information retrieved successfully", "success");
      } catch (error) {
        showToast(
          error instanceof Error ? error.message : "Failed to fetch medicine information",
          "error"
        );
      } finally {
        setIsLoadingMedInfo(false);
        setImgAnalyzed(null);
      }
    }
  };
  const handleSpeak = (text) => {
    console.log("Speaking:", text);
  };
  const handleImageCapture = async (file) => {
    setIsAnalyzing(true);
    showToast("Analyzing image...", "success");
    try {
      const reader = new FileReader();
      const result = await new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const base64Data = result.split(",")[1];
      const response = await fetch("/api/med-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          imageData: base64Data,
          mimeType: file.type
        })
      });
      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }
      const data = await response.json();
      if (data.brand_name) {
        setSelectedMedicine(data.brand_name);
        showToast(`Medicine detected: ${data.brand_name}`, "success");
        setIsLoadingMedInfo(true);
        const result2 = await api_calls(
          data.brand_name,
          settings,
          selectedClarity
        );
        setFdaData(result2.fdaData);
        setSideEffectData(result2.sideEffectData);
      } else {
        showToast("Could not detect medicine name clearly", "error");
      }
    } catch (error) {
      showToast("Failed to analyze image", "error");
      throw error;
    } finally {
      setIsAnalyzing(false);
      setIsLoadingMedInfo(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 text-gray-900 ", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-right" }),
    /* @__PURE__ */ jsx(
      Header,
      {
        isSettingsOpen,
        setIsSettingsOpen
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto p-4", children: [
      isSettingsOpen && /* @__PURE__ */ jsx(
        SettingsPanel,
        {
          settings,
          setSettings,
          selectedLanguage,
          setSelectedLanguage,
          selectedClarity,
          setSelectedClarity,
          languageQuery,
          setLanguageQuery
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-white rounded-lg shadow-md p-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold p-4 border-b", children: "Medlex ai healthcare Assistant Chat" }),
        /* @__PURE__ */ jsx(
          HealthChat,
          {
            userSettings: settings,
            selectedClarity
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex space-x-3 mb-3 ", children: /* @__PURE__ */ jsx(
          ImageUpload,
          {
            onImageCapture: handleImageCapture,
            isAnalyzing
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "p-4 max-w-md ", children: /* @__PURE__ */ jsx(
          SearchSection,
          {
            searchQuery,
            setSearchQuery,
            handleSearch,
            setSelectedMedicine,
            setImgAnalyzed
          }
        ) }),
        selectedMedicine && /* @__PURE__ */ jsx(
          MedicineInfo,
          {
            selectedMedicine,
            imgAnalyzed,
            fdaData,
            sideEffectData,
            handleSpeak,
            isLoading: isLoadingMedInfo
          }
        )
      ] })
    ] })
  ] });
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
<\/script> `])), renderComponent($$result, "Layout", $$Layout, { "title": "Medlex+" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> ${renderComponent($$result2, "Dashboard", Dashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/stephen/medlexy/medlex/src/components/dashboard", "client:component-export": "default" })} </div> ` }));
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
