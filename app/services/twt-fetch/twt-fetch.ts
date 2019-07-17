import sha1 from "./sha1.js"
import { mergeDeepLeft } from "ramda"

const TWT_BASE_URL = 'https://open.twtstudio.com/api/'
const TWT_APP = { key: '8UuaoZs2TNLFfqnmyllp', secret: 'vOl62dPR2k8BeVTPxLrtuyDcx0AQhm' }
const TWT_TOKEN = "token_placeholder"

let query = params => Object.keys(params)
  .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
  .join('&')

export const twtGet = (url, parameters: any = {}, options: any = {}, token?) => {
  let para = parameters
  para["t"] = String(Date.now())
  let keys = Object.keys(para).sort()

  // Generate SIGN with sha1 encryption
  let tempSign = ""
  for (let key of keys) {
    tempSign += (key + para[key])
  }
  let sign = sha1(TWT_APP.key + tempSign + TWT_APP.secret)
  para["sign"] = sign.toUpperCase()
  para["app_key"] = TWT_APP.key

  let fullUrl = TWT_BASE_URL + url + "?" + query(para)
  let tokenValue = "Bearer { " + (token || TWT_TOKEN) + " }"

  // Override token to passed object, do deep replacement
  options = mergeDeepLeft({ headers: { Authorization: tokenValue } }, options)

  return fetch(fullUrl, {
    ...options,
    method: 'GET'
  })
}
