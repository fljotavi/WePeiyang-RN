/*
 * i18n
 * Created by Tzingtao Chow
 * ---
 *
 * WePeiyang 4.0 now ships with multilingual support!
 * 每添加一个新语言，请在这里分别更新语言信息，并同时更新 date-fns 翻译库的 require 内容。
 *
 */

import i18n from "i18n-js"

const en = require("./en")
const ja = require("./ja")
const zh = require("./zh")
const es = require("./es")
const ar = require("./ar")
const th = require("./th")

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
  th: {
    native: "ไทย",
    common: "Thai",
  },
}

i18n.fallbacks = true
i18n.translations = { en, ja, zh, es, ar, th }
