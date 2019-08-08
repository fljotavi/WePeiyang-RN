export const semesterReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_SEMESTER_INDEX":
      state = action.payload
  }
  return state
}

export const preferenceReducer = (
  state = {
    scoreType: "weighted",
    gpaOrderBy: "credits",
    language: "zh",
  },
  action,
) => {
  switch (action.type) {
    case "SET_SCORE_TYPE":
      state = {
        ...state,
        scoreType: action.payload,
      }
      break
    case "SET_GPA_ORDER_BY":
      state = {
        ...state,
        gpaOrderBy: action.payload,
      }
      break
    case "SET_LANGUAGE":
      state = {
        ...state,
        language: action.payload,
      }
      break
  }
  return state
}

export const authReducer = (state = { token: null, logged: false }, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      state = {
        ...state,
        token: action.payload,
      }
      break
    case "LOGIN_SUCCESS":
      state = {
        ...state,
        logged: true,
      }
      break
  }
  return state
}
