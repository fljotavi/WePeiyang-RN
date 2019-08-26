/*
 * Store
 * Created by Tzingtao Chow
 * ---
 *
 * Store 用于存储应用内全局的、唯一的事实状态树 (Single source of truth)。
 * 状态树中包含了用户偏好设置、GPA 课表等主要数据、登陆状态和 Token 等，并通过 Async storage 实现持久化存储。
 * 在应用运行的任何时刻，组件都可以派遣 Actions 对状态树做出变更，并随时读取某一个具体状态，用于组件渲染。
 *
 * 关于更多 Redux 架构的解释，请参见 https://redux.js.org。
 *
 */

import { applyMiddleware, combineReducers, createStore } from "redux"
import { authReducer, preferenceReducer } from "./reducers/general-reducer"
import { dataReducer } from "./reducers/data-reducer"
import { persistStore, persistReducer } from "redux-persist"
import thunk from "redux-thunk"
import AsyncStorage from "@react-native-community/async-storage"
import { interceptChangePrefColors } from "./middlewares/general-middlewares"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
}

const topLevelReducer = combineReducers({
  preferenceReducer,
  dataReducer,
  authReducer,
})
const persistedReducer = persistReducer(persistConfig, topLevelReducer)

let store = createStore(persistedReducer, {}, applyMiddleware(thunk, interceptChangePrefColors))
let persistor = persistStore(store)
export default { store, persistor }
