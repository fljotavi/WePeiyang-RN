import { digitsFromScoreType } from "../utils/common"

const userDataReducerInitialState = {
  status: "NOT_RECEIVED",
  data: {}
}

export const userDataReducer = (state = userDataReducerInitialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      state = {
        ...state,
        status: "VALID",
        data: action.payload
      }
  }
  return state
}

const gpaDataReducerInitialState = {
  status: "NOT_RECEIVED",
  data: {
    gpaSemestral: {
    },
    gpaDetailed: {

    },
    gpaOverall: {
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
          weighted: semestralData.map((raw, index) => { return { x: index + 1, y: raw.stat.score } }),
          gradePoints: semestralData.map((raw, index) => { return { x: index + 1, y: raw.stat.gpa } }),
          credits: semestralData.map((raw, index) => { return { x: index + 1, y: raw.stat.credit } }),
        },
        gpaOverall: {
          weighted: statData.total.score.toFixed(digitsFromScoreType("weighted")),
          gradePoints: statData.total.gpa.toFixed(digitsFromScoreType("gradePoints")),
          credits: statData.total.credit.toFixed(digitsFromScoreType("credits")),
        },
        gpaDetailed: {
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
      let payload = action.payload
      delete Object.assign(payload, { 'courses': payload['data'] })['data'] // Replace object key 'data' with 'courses', semantically
      state = {
        ...state,
        status: "VALID",
        data: payload
      }
  }
  return state
}

const libraryDataReducerInitialState = {
  status: "NOT_RECEIVED",
  data: {}
}

export const libraryDataReducer = (state = libraryDataReducerInitialState, action) => {
  switch (action.type) {
    case "SET_LIBRARY_DATA":
      state = {
        ...state,
        status: "VALID",
        data: action.payload
      }
  }
  return state
}
