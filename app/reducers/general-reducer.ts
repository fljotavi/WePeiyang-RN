/*
 * General Reducers
 * Created by Tzingtao Chow
 * ---
 *
 * General Reducers 包含了所有与数据处理相关的 Reducers 之外的 Reducers。
 * 对于每一个 Reducer 的作用，请参见代码行内注释。
 *
 */

// Semester Reducer 用于记录当前显示的学期。
// 这一状态被 GPA 模块，主页的成绩曲线等使用。
// 它很特殊，既不属于需要 fetch 的数据，也非用户偏好，不需要持久性存储。但需要在不同界面下显示一致。因此抽离出单独的 Reducer。

export const semesterReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_SEMESTER_INDEX":
      state = action.payload
  }
  return state
}

// Preference Reducer 用于记录用户的偏好设置。

export const preferenceReducer = (
  state = {
    scoreType: "weighted",
    gpaOrderBy: "credits",
    language: "zh",
    daysEachWeek: 6,
  },
  action,
) => {
  switch (action.type) {
    case "SET_SCORE_TYPE":
      state = {
        ...state,
        scoreType: action.payload,
      }
      break
    case "SET_GPA_ORDER_BY":
      state = {
        ...state,
        gpaOrderBy: action.payload,
      }
      break
    case "SET_PREFERENCE":
      state = {
        ...state,
      }
      state[action.payload.key] = action.payload.value
      break
  }
  return state
}

// Auth Reducer 用于记录用户的登陆状态，并保存本地的 Token。

export const authReducer = (state = { token: null, logged: false }, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      state = {
        ...state,
        token: action.payload,
      }
      break
    case "LOGIN_SUCCESS":
      state = {
        ...state,
        logged: true,
      }
      break
  }
  return state
}
