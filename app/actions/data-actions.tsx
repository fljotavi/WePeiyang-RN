import { twtGet } from "../services/twt-fetch"
import { schedule1 } from "../utils/mock-course"

export function clearAllData() {
  return {
    type: "CLEAR_ALL_DATA",
  }
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
            payload: schedule1.data, // responseJson.data,
          })
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
      .then(response => response.json())
      .then(responseJson => {
        // Inconsistent response formatting here, no error_code. Bad server-side api design, yet there's nothing I can do about it.
        if (responseJson.twtuname) {
          dispatch({
            type: "SET_USER_DATA",
            payload: responseJson,
          })
        } else {
          responseJson.origin = path
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
        } else {
          responseJson.origin = path
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
        console.log(responseJson)
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
        console.log("Ecard Total Format", responseJson)
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_ECARD_TOTAL",
            payload: responseJson.data,
          })
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
        console.log("Ecard LineChart Format", responseJson)
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_ECARD_LINE_CHART",
            payload: responseJson.data,
          })
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
