import { twtGet } from "../services/twt-fetch"

const ERROR_PREFIX = "Error returned with success network request: "

export function clearAllData() {
  return {
    type: "CLEAR_ALL_DATA"
  }
}

export function fetchGpaData() {
  return dispatch => {
    return twtGet("v1/gpa")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_GPA_DATA",
            payload: responseJson.data
          })
        } else throw new Error(ERROR_PREFIX + responseJson.message || "Unknown Error" + " in fetchGpaData")
      })
  }
}

export function fetchCourseData() {
  return dispatch => {
    return twtGet("v1/classtable")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_COURSE_DATA",
            payload: responseJson.data
          })
        } else throw new Error(ERROR_PREFIX + responseJson.message || "Unknown Error" + "in fetchCourseData")
      })
  }
}

export function fetchUserData() {
  return dispatch => {
    return twtGet("v2/auth/self")
      .then((response) => response.json())
      .then((responseJson) => {
        // Inconsistent response formatting here, no error_code. Bad server-side api design, yet there's nothing I can do about it.
        if (responseJson.twtuname) {
          dispatch({
            type: "SET_USER_DATA",
            payload: responseJson
          })
        } else throw new Error(ERROR_PREFIX + responseJson.message || "Unknown Error" + "in fetchUserData")
      })
  }
}

export function fetchLibraryData() {
  return dispatch => {
    return twtGet("v1/library/user/info")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_LIBRARY_DATA",
            payload: responseJson.data
          })
        } else throw new Error(ERROR_PREFIX + responseJson.message || "Unknown Error" + "in fetchLibraryData")
      })
  }
}

export function renewBook(barcode) {
  return dispatch => {
    return twtGet(`v1/library/renew${barcode}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
  }
}

export function fetchEcardData(cardId, password) {
  return dispatch => {
    return twtGet("v1/ecard/profile", { cardnum: cardId, password: password })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Ecard Data Format", responseJson)
        if (responseJson.error_code === -1) {
          dispatch({
            type: "SET_ECARD_DATA",
            payload: responseJson.data
          })
        } else throw responseJson
      })
  }
}

export function setEcardAuth(cardId, password) {
  return {
    type: "SET_ECARD_AUTH",
    payload: { cardId, password }
  }
}
