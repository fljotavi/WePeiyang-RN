/*
 * Preference actions
 * Created by Tzingtao Chow
 * ---
 *
 * Preference actions 中包含了所有与用户偏好设置相关的 Actions，
 * 如界面语言、GPA 排序方式、课表是否显示周六日等。
 *
 */

export function setScoreType(newType) {
  return {
    type: "SET_SCORE_TYPE",
    payload: newType,
  }
}

export function setGpaOrderBy(newType) {
  return {
    type: "SET_GPA_ORDER_BY",
    payload: newType,
  }
}

export function setSemesterIndex(newIndex) {
  return {
    type: "SET_SEMESTER_INDEX",
    payload: newIndex,
  }
}

export function setLanguage(l) {
  return {
    type: "SET_LANGUAGE",
    payload: l,
  }
}
