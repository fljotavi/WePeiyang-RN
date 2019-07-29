import { applyMiddleware, combineReducers, createStore } from "redux"
import { authReducer, gpaTypeReducer, semesterReducer } from "./reducers/general-reducer"
import { dataReducer } from "./reducers/data-reducer"
import { persistStore, persistReducer } from 'redux-persist'
import thunk from "redux-thunk"
import AsyncStorage from "@react-native-community/async-storage"

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const topLevelReducer = combineReducers({ gpaTypeReducer, semesterReducer, dataReducer, authReducer })
const persistedReducer = persistReducer(persistConfig, topLevelReducer)

export default () => {
  let store = createStore(persistedReducer, {}, applyMiddleware(thunk))
  let persistor = persistStore(store)
  return { store, persistor }
}
