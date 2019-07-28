import { digitsFromScoreType } from "../utils/common"

const dataReducerInitialState = {
  status: "INIT",
  userInfo: {
    status: "NOT_RECEIVED",
    data: {}
  },
  gpa: {
    status: "NOT_RECEIVED",
    data: {
      gpaSemestral: {
      },
      gpaDetailed: {

      },
      gpaOverall: {
      }
    }
  },
  library: {
    status: "NOT_RECEIVED",
    data: {}
  },
  course: {
    status: "NOT_RECEIVED",
    data: {}
  }
}

export const dataReducer = (state = dataReducerInitialState, action) => {
  switch (action.type) {

    case "CLEAR_ALL_DATA":
      state = dataReducerInitialState
      break

    case "SET_USER_DATA":
      state = {
        ...state,
        status: "MODIFIED",
        userInfo: {
          status: "VALID",
          data: action.payload
        },
      }
      break

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
        status: "MODIFIED",
        gpa: {
          status: "VALID",
          data: extractedData
        }
      }
      break

    case "SET_COURSE_DATA":
      let payload = action.payload
      delete Object.assign(payload, { 'courses': payload['data'] })['data'] // Replace object key 'data' with 'courses', semantically
      state = {
        ...state,
        status: "MODIFIED",
        course: {
          status: "VALID",
          data: payload
        }
      }
      break

    case "SET_LIBRARY_DATA":
      state = {
        ...state,
        status: "MODIFIED",
        library: {
          status: "VALID",
          data: action.payload
        }
      }

  }
  return state
}
