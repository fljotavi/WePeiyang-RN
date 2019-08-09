import { twtGet } from "../services/twt-fetch"
import { schedule1 } from "../utils/mock-course"

export function clearAllData() {
  return {
    type: "CLEAR_ALL_DATA",
  }
}

export function fetchGpaData() {
  return dispatch => {
    return twtGet("v1/gpa")
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_GPA_DATA",
            payload: responseJson.data,
          })
        } else {
          throw responseJson
        }
      })
  }
}

export function fetchCourseData() {
  return dispatch => {
    return twtGet("v1/classtable")
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_COURSE_DATA",
            payload: schedule1.data, // responseJson.data,
          })
        } else {
          throw responseJson
        }
      })
  }
}

export function fetchUserData() {
  return dispatch => {
    return twtGet("v2/auth/self")
      .then(response => response.json())
      .then(responseJson => {
        // Inconsistent response formatting here, no error_code. Bad server-side api design, yet there's nothing I can do about it.
        if (responseJson.twtuname) {
          dispatch({
            type: "SET_USER_DATA",
            payload: responseJson,
          })
        } else {
          throw responseJson
        }
      })
  }
}

export function fetchLibraryData() {
  return dispatch => {
    return twtGet("v1/library/user/info")
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          // I can't believe this API returns NULL (instead of an empty array) if zero book is borrowed
          responseJson.data.books = responseJson.data.books || []
          dispatch({
            type: "SET_LIBRARY_DATA",
            payload: responseJson.data,
          })
        } else {
          throw responseJson
        }
      })
  }
}

export function renewBook(barcode) {
  return () => {
    return twtGet(`v1/library/renew${barcode}`)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
      })
  }
}

export function fetchEcardProfile(cardId, password) {
  return dispatch => {
    return twtGet("v1/ecard/profile", { cardnum: cardId, password: password })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_ECARD_PROFILE",
            payload: responseJson.data,
          })
        } else {
          throw responseJson
        }
      })
  }
}

export function fetchEcardTurnover(cardId, password, days) {
  return dispatch => {
    return twtGet("v1/ecard/turnover", { cardnum: cardId, password: password, term: days })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_ECARD_TURNOVER",
            payload: responseJson.data,
          })
        } else {
          throw responseJson
        }
      })
  }
}

export function fetchEcardTotal(cardId, password) {
  return dispatch => {
    return twtGet("v1/ecard/total", { cardnum: cardId, password: password })
      .then(response => response.json())
      .then(responseJson => {
        console.log("Ecard Total Format", responseJson)
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_ECARD_TOTAL",
            payload: responseJson.data,
          })
        } else {
          throw responseJson
        }
      })
  }
}

export function fetchEcardLineChart(cardId, password) {
  return dispatch => {
    return twtGet("v1/ecard/lineChart", { cardnum: cardId, password: password })
      .then(response => response.json())
      .then(responseJson => {
        console.log("Ecard LineChart Format", responseJson)
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_ECARD_LINE_CHART",
            payload: responseJson.data,
          })
        } else {
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
