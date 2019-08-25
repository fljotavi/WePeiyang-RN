// import { setPrefColor } from "../theme"

export const interceptChangePrefColors = () => next => action => {
  if (action.type === "SET_PALETTE") {
    // setPrefColor(action.payload.key, action.payload.value)
  }
  return next(action)
}
