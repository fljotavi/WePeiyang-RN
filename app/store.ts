import { combineReducers, createStore } from "redux"
import { authReducer, gpaTypeReducer } from "./reducers/general-reducer"
import { courseDataReducer, gpaDataReducer, userDataReducer, libraryDataReducer } from "./reducers/data-reducer"

export default createStore(
  combineReducers({ gpaTypeReducer, userDataReducer, authReducer, gpaDataReducer, courseDataReducer, libraryDataReducer })
)
