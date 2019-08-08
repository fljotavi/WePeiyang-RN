import i18n from "i18n-js"
import configureStore from "../store"
const { store } = configureStore()

export function translate(key: string, options?: object) {
  i18n.locale = store.getState().preferenceReducer.language
  return key ? i18n.t(key, options) : null
}
