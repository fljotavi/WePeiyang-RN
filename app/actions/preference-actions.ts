/*
 * Preference actions
 * Created by Tzingtao Chow
 * ---
 *
 * Preference actions 中包含了所有与用户偏好设置相关的 Actions，
 * 如界面语言、GPA 排序方式、课表是否显示周六日等。
 *
 * 通常来说，使用 setPreference 并传入 Key-value pair 即可调整设置项。
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

export function setPreference(key, value) {
  return {
    type: "SET_PREFERENCE",
    payload: { key, value },
  }
}

export function setPalette(key, value) {
  return {
    type: "SET_PALETTE",
    payload: { key, value },
  }
}

export function restorePalette() {
  console.log("In")
  return {
    type: "RESTORE_PALETTE",
  }
}
