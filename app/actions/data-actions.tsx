/*
 * Data actions
 * Created by Tzingtao Chow
 * ---
 *
 * Data actions 中包含了所有与获取和储存数据相关的 Redux actions。
 *
 * 微北洋内部的网络请求在这里发起，并且经过必要的错误捕捉与处理等步骤。
 * 捕捉到的错误一般会统一格式，并注入错误来源（主要考虑到 HomeScreen 中 Promise.all 的刷新错误定位）后抛出。
 * 如果数据格式本身存在设计弊端，也一般在本层提前处理。其它的数据处理步骤，请参见 Reducers。
 *
 */

import { twtGet } from "../services/twt-fetch"

export function clearAllData() {
  return {
    type: "CLEAR_ALL_DATA",
  }
}

export function setRequestMode(mode) {
  return {
    type: "SET_REQUEST_MODE",
    payload: mode,
  }
}

export function bindTjuAccount(tjuuname, tjupasswd) {
  let path = `v1/auth/bind/tju`

  return twtGet(path, { tjuuname, tjupasswd })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.error_code === -1) {
        return responseJson
      } else {
        responseJson.origin = path
        throw responseJson
      }
    })
}

export function bindLibAccount(libpasswd) {
  let path = `v1/auth/bind/lib`

  return twtGet(path, { libpasswd })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.error_code === -1) {
        return responseJson
      } else {
        responseJson.origin = path
        throw responseJson
      }
    })
}

export function unbindTjuAccount() {
  let path = `v1/auth/unbind/tju`
  return twtGet(path)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.error_code === -1) {
        return responseJson
      } else {
        responseJson.origin = path
        throw responseJson
      }
    })
}

export function unbindLibAccount() {
  let path = `v1/auth/unbind/lib`
  return twtGet(path)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.error_code === -1) {
        return responseJson
      } else {
        responseJson.origin = path
        throw responseJson
      }
    })
}

export function fetchGpaData() {
  let path = "v1/gpa"
  return dispatch => {
    return twtGet(path)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_GPA_DATA",
            payload: responseJson.data,
          })
          return responseJson
        } else {
          responseJson.origin = path
          throw responseJson
        }
      })
  }
}

export function fetchCourseData() {
  let path = "v1/classtable"
  return dispatch => {
    return twtGet(path)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_COURSE_DATA",
            payload: responseJson.data,
          })
          return responseJson
        } else {
          responseJson.origin = path
          throw responseJson
        }
      })
  }
}

export function setGeneratedSchedule(payload) {
  return {
    type: "SET_GENERATED_SCHEDULE",
    payload: payload,
  }
}

export function fetchUserData() {
  let path = "v2/auth/self"
  return dispatch => {
    return twtGet(path)
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status)
        }
        return response.json()
      })
      .then(responseJson => {
        // Inconsistent response formatting here, no error_code. Bad server-side api design, yet there's nothing I can do about it.
        if (responseJson.twtuname) {
          dispatch({
            type: "SET_USER_DATA",
            payload: responseJson,
          })
          return responseJson
        } else {
          responseJson.origin = path
          responseJson.message = "Failed to fetch User Data..."
          throw responseJson
        }
      })
  }
}

export function fetchLibraryData() {
  let path = "v1/library/user/info"
  return dispatch => {
    return twtGet(path)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          // I can't believe this API returns NULL (instead of an empty array) if zero book is borrowed
          responseJson.data.books = responseJson.data.books || []
          dispatch({
            type: "SET_LIBRARY_DATA",
            payload: responseJson.data,
          })
          return responseJson
        } else {
          responseJson.origin = path
          throw responseJson
        }
      })
  }
}

export function fetchYellowPagesData() {
  let path = "v1/yellowpage/data3"
  return dispatch => {
    return twtGet(path)
      .then(response => response.json())
      .then(responseJson => {
        // Inconsistent response formatting here, no error_code. Bad server-side api design, yet there's nothing I can do about it.
        if (responseJson.category_list) {
          dispatch({
            type: "SET_YELLOW_PAGES_DATA",
            payload: responseJson.category_list,
          })
          return responseJson
        } else {
          responseJson.origin = path
          responseJson.message = "Failed to fetch yellow pages data..."
          throw responseJson
        }
      })
  }
}

export function renewBook(barcode) {
  let path = `v1/library/renew${barcode}`
  return () => {
    return twtGet(path)
      .then(response => response.json())
      .then(responseJson => {
        return responseJson // TODO: Fix after fixing API Malfunction
      })
  }
}

export function fetchEcardProfile(cardId, password) {
  let path = "v1/ecard/profile"
  return dispatch => {
    return twtGet(path, { cardnum: cardId, password: password })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_ECARD_PROFILE",
            payload: responseJson.data,
          })
          return responseJson
        } else {
          responseJson.origin = path
          throw responseJson
        }
      })
  }
}

export function fetchEcardTurnover(cardId, password, days) {
  let path = "v1/ecard/turnover"
  return dispatch => {
    return twtGet(path, { cardnum: cardId, password: password, term: days })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_ECARD_TURNOVER",
            payload: responseJson.data,
          })
          return responseJson
        } else {
          responseJson.origin = path
          throw responseJson
        }
      })
  }
}

export function fetchEcardTotal(cardId, password) {
  let path = "v1/ecard/total"
  return dispatch => {
    return twtGet(path, { cardnum: cardId, password: password })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_ECARD_TOTAL",
            payload: responseJson.data,
          })
          return responseJson
        } else {
          responseJson.origin = path
          throw responseJson
        }
      })
  }
}

export function fetchEcardLineChart(cardId, password) {
  let path = "v1/ecard/lineChart"
  return dispatch => {
    return twtGet(path, { cardnum: cardId, password: password })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_ECARD_LINE_CHART",
            payload: responseJson.data,
          })
          return responseJson
        } else {
          responseJson.origin = path
          throw responseJson
        }
      })
  }
}

export function setEcardAuth(cardId, password) {
  return {
    type: "SET_ECARD_AUTH",
    payload: { cardId, password },
  }
}

export function setNetworkAuth(username, password) {
  return {
    type: "SET_NETWORK_AUTH",
    payload: { username, password },
  }
}
