/*
 * General Reducers
 * Created by Tzingtao Chow
 * ---
 *
 * General Reducers 包含了所有与数据处理相关的 Reducers 之外的 Reducers。
 * 对于每一个 Reducer 的作用，请参见代码行内注释。
 *
 */

// Preference Reducer 用于记录用户的偏好设置。

import { palette } from "../theme/palette"
import Color from "color"

const white = alpha => `rgba(255,255,255,${alpha})`
export const preferenceReducer = (
  state = {
    scoreType: "weighted",
    gpaOrderBy: "credits",
    language: "en",
    daysEachWeek: 6,
    showCoursesNotThisWeek: true,
    hideGpaOnHomeScreen: false,
    autoReconnect: true,
    moduleOrder: [
      "schedule",
      "gpa",
      "contact",
      "ecard",
      "network",
      "learning",
      "docs",
      "library",
      "mall",
      "news",
      "bbs",
      "career",
      "party",
      "vote",
      "survey",
      "socialPractice",
    ],
    scheduleHeight: 100,
    scheduleTextSize: 100,
    owlIndex: 21,
    displayNotThisWeek: true,
    palette: {
      gpa: [palette.matcha, white(0.95), white(0.35), white(0.08)],
      ecard: [palette.offBlack, palette.silver, palette.gold],
      yellowPages: [palette.paper, palette.ink, palette.rouge],
      schedule: [
        palette.offPale4,
        palette.offPale3,
        palette.offPale,
        palette.offPale2,
        palette.pale,
        palette.offBlack,
      ].map(c => Color(c).fade(0.1).toString()),
    },
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
    case "SET_PALETTE":
      state = {
        ...state,
        palette: {
          ...state.palette,
        },
      }
      state.palette[action.payload.key] = action.payload.value
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
