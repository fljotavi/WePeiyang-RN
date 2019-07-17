const gpaTypeReducer = (state = "weighted", action) => {
  switch (action.type) {
    case "SET_SCORE_TYPE":
      state = action.payload
  }
  return state
}
export default gpaTypeReducer
