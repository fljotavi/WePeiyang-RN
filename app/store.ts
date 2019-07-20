import { combineReducers, createStore } from "redux"
import { authReducer, gpaTypeReducer, gpaDataReducer } from "./reducers/general-reducer"

// const saveAuthToken = store => next => action => {
//   if (action.type === 'SAVE_TOKEN') {
//     let token = action.payload
//     setToken(token)
//   }
//   return next(action)
// }

export default createStore(
  combineReducers({ gpaTypeReducer, authReducer, gpaDataReducer })
)
