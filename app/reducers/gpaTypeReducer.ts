const gpaTypeReducer = (state = { scoreType: "weighted" }, action) => {
  switch (action.type) {
    case "SET_SCORE_TYPE":
      state = {
        ...state,
        scoreType: action.payload
      }
      break
  }
  return state
}
export default gpaTypeReducer
