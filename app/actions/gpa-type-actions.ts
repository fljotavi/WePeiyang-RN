export function setScoreType(newType) {
  return {
    type: "SET_SCORE_TYPE",
    payload: newType
  }
}

export function setSemesterIndex(newIndex) {
  return {
    type: "SET_SEMESTER_INDEX",
    payload: newIndex
  }
}
