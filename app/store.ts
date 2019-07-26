import { applyMiddleware, combineReducers, createStore } from "redux"
import logger from "redux-logger"
import { authReducer, gpaTypeReducer } from "./reducers/general-reducer"
import { courseDataReducer, gpaDataReducer, userDataReducer, libraryDataReducer } from "./reducers/data-reducer"
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from "@react-native-community/async-storage"

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const topLevelReducer = combineReducers({ gpaTypeReducer, userDataReducer, authReducer, gpaDataReducer, courseDataReducer, libraryDataReducer })
const persistedReducer = persistReducer(persistConfig, topLevelReducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(logger))
  let persistor = persistStore(store)
  return { store, persistor }
}
