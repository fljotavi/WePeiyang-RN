export const gpaTypeReducer = (state = "weighted", action) => {
  switch (action.type) {
    case "SET_SCORE_TYPE":
      state = action.payload
  }
  return state
}

export const authReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      state = {
        ...state,
        token: action.payload
      }
  }
  return state
}
