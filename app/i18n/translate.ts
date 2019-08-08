import i18n from "i18n-js"

export function translate(key: string, lang, options?: object) {
  i18n.locale = lang
  return key ? i18n.t(key, options) : null
}
