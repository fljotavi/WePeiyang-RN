/*
 * TWT Fetch
 * Created by Tzingtao Chow
 * ---
 *
 * TWT Fetch 模块用于存储应用发起 Open.twtstudio.com 域下的标准网络请求的底层流程。
 * 它会帮你处理请求签名、Token 鉴权等必要流程，调用时只需给出相对 URL 即可。
 * 由于签名和鉴权是发送网络请求给 Open 必须的步骤，所以它们默认开启。但你可以通过传递参数来覆写这些设置。
 *
 * 当然，由于 App Key 和 Secret 很早就被开源，所以签名本质并没有什么用，只是徒增了前后端开发人员的负担而已。
 *
 */

import sha1 from "../../utils/sha1"
import { mergeDeepLeft } from "ramda"
import AsyncStorage from "@react-native-community/async-storage"
import configureStore from "../../store"

const TWT_BASE_URL = "https://open.twtstudio.com/api/"
const TWT_BASE_URL_MOCK = "https://vote.twtstudio.com/open-mock/"
const TWT_APP = { key: "8UuaoZs2TNLFfqnmyllp", secret: "vOl62dPR2k8BeVTPxLrtuyDcx0AQhm" }
const { store } = configureStore

let query = params =>
  Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&")

export const passTokenToStore = token => {
  store.dispatch({
    type: "SET_TOKEN",
    payload: token,
  })
}

export const deleteTokenFromStore = () => {
  store.dispatch({
    type: "SET_TOKEN",
    payload: null,
  })
}

export const processAuthStatus = async () => {
  const token = await AsyncStorage.getItem("@WePeiyangRN_token")
  if (token !== null) {
    passTokenToStore(token)
    return true
  } else {
    return false
  }
}

export const twtGet = (url, parameters: any = {}, options: any = {}, tokenNeeded = true) => {
  const CHOSEN_BASE_URL =
    store.getState().dataReducer.mode === "MOCK" ? TWT_BASE_URL_MOCK : TWT_BASE_URL

  let para = parameters
  para.t = String(Date.now())
  let keys = Object.keys(para).sort()

  // Generate SIGN with sha1 encryption
  let tempSign = ""
  for (let key of keys) {
    tempSign += key + para[key]
  }
  let sign = sha1(TWT_APP.key + tempSign + TWT_APP.secret)
  para.sign = sign.toUpperCase()
  para.app_key = TWT_APP.key

  let fullUrl = CHOSEN_BASE_URL + url + "?" + query(para)

  if (tokenNeeded) {
    let tokenValue = `Bearer { ${store.getState().authReducer.token} }`
    // Override token to passed object, do deep replacement
    options = mergeDeepLeft({ headers: { Authorization: tokenValue } }, options)
  }

  return fetch(fullUrl, { ...options, method: "GET" })
}
