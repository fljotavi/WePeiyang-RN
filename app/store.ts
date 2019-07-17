import { combineReducers, createStore } from "redux"
import gpaTypeReducer from "./reducers/gpaTypeReducer"

export default createStore(
  combineReducers({ gpaTypeReducer }),
  {}
)
