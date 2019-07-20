import {digitsFromScoreType} from "../utils/common";

export const gpaTypeReducer = (state = "weighted", action) => {
  switch (action.type) {
    case "SET_SCORE_TYPE":
      state = action.payload
  }
  return state
}

const gpaDataReducerInitialState = {
  status: "NOT_RECEIVED",
  data: {
    gpaSemestral: {
      status: "NOT_RECEIVED"
    },
    gpaDetailed: {

    },
    gpaOverall: {
      status: "NOT_RECEIVED"
    }
  }
}

export const gpaDataReducer = (state = gpaDataReducerInitialState, action) => {
  switch (action.type) {
    case "SET_GPA_DATA":
      const semestralData = action.payload.data
      const statData = action.payload.stat
      let extractedData = {
        gpaSemestral: {
          status: "VALID",
          weighted: semestralData.map((raw, index) => { return { x: index + 1, y: raw.stat.score } }),
          gradePoints: semestralData.map((raw, index) => { return { x: index + 1, y: raw.stat.gpa } }),
          credits: semestralData.map((raw, index) => { return { x: index + 1, y: raw.stat.credit } }),
        },
        gpaOverall: {
          status: "VALID",
          weighted: statData.total.score.toFixed(digitsFromScoreType("weighted")),
          gradePoints: statData.total.gpa.toFixed(digitsFromScoreType("gradePoints")),
          credits: statData.total.credit.toFixed(digitsFromScoreType("credits")),
        },
        gpaDetailed: {
          status: "VALID",
        }
      }
      state = {
        ...state,
        status: "VALID",
        data: extractedData
      }
  }
  return state
}

const courseDataReducerInitialState = {
  status: "NOT_RECEIVED",
  data: {}
}

export const courseDataReducer = (state = courseDataReducerInitialState, action) => {
  switch (action.type) {
    case "SET_COURSE_DATA":
      state = {
        ...state,
        status: "VALID",
        data: action.payload
      }
  }
  return state
}

export const authReducer = (state = { token: null, logged: false }, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      state = {
        ...state,
        token: action.payload
      }
      break
    case "LOGIN_SUCCESS":
      state = {
        ...state,
        logged: true
      }
      break
  }
  return state
}
