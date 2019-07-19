import { combineReducers, createStore } from "redux"
import { authReducer, gpaTypeReducer } from "./reducers/generalReducer"

// const saveAuthToken = store => next => action => {
//   if (action.type === 'SAVE_TOKEN') {
//     let token = action.payload
//     setToken(token)
//   }
//   return next(action)
// }

export default createStore(
  combineReducers({ gpaTypeReducer, authReducer })
)
