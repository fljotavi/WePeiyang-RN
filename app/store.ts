import { combineReducers, createStore } from "redux"
import { authReducer, gpaTypeReducer } from "./reducers/general-reducer"
import { courseDataReducer, gpaDataReducer } from "./reducers/data-reducer"

export default createStore(
  combineReducers({ gpaTypeReducer, authReducer, gpaDataReducer, courseDataReducer })
)
