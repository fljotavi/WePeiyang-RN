import i18n from "i18n-js"

const en = require("./en")
const ja = require("./ja")
const zh = require("./zh")
const es = require("./es")
const ar = require("./ar")

export const languageFullnames = {
  en: {
    native: "English",
    common: "English",
  },
  ja: {
    native: "日本語",
    common: "Japanese",
  },
  zh: {
    native: "简体中文",
    common: "Simplified Chinese",
  },
  es: {
    native: "Espanol",
    common: "Spanish",
  },
  ar: {
    native: "عربى",
    common: "Arabic",
  },
}

i18n.fallbacks = true
i18n.translations = { en, ja, zh, es, ar }
