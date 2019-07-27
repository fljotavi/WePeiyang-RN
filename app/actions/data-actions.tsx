import { twtGet } from "../services/twt-fetch"
import Toast from "react-native-root-toast"
import { Text } from "../components/text"
import toastOptions from "../theme/toast"
import * as React from "react"

export function fetchGpaData() {
  return dispatch => {
    return twtGet("v1/gpa")
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: "SET_GPA_DATA",
          payload: responseJson.data
        })
      })
      .catch(error => {
        Toast.show(<Text text="fetchGpaData failed" style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
        console.log(error)
      })

  }
}

export function fetchCourseData() {
  return dispatch => {
    return twtGet("v1/classtable")
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: "SET_COURSE_DATA",
          payload: responseJson.data
        })
      })
      .catch(error => {
        Toast.show(<Text text="fetchCourseData failed" style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
        console.log(error)
      })
  }
}

export function fetchUserData() {
  return dispatch => {
    return twtGet("v2/auth/self")
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: "SET_USER_DATA",
          payload: responseJson
        })
      })
      .catch(error => {
        Toast.show(<Text text="fetchUserData failed" style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
        console.log(error)
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
        }
      })
      .catch(error => {
        Toast.show(<Text text="fetchLibraryData failed" style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
        console.log(error)
      })
  }
}

export function fetchEcardData() {
  return dispatch => {
    return twtGet("v1/ecard/profile", { cardnum: '3016218162', password: '262144' })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Ecard Data Format", responseJson)
      })
      .catch(error => {
        Toast.show(<Text text="Ecard Fetch failed" style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
        console.log(error)
      })
  }
}
