import i18n from "i18n-js"
import configureStore from "../store"

const en = require("./en")
const ja = require("./ja")
const zh = require("./zh")
const es = require("./es")

const { store } = configureStore()

i18n.fallbacks = true
i18n.translations = { en, ja, zh, es }

const fallback = { languageTag: "en", isRTL: false }
const { languageTag } = { languageTag: store.getState().preferenceReducer.language } || fallback
console.log(store.getState().preferenceReducer)
i18n.locale = languageTag
