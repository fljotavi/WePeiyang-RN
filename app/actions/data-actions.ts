export function setGpaData(data) {
  return {
    type: "SET_GPA_DATA",
    payload: data
  }
}

export function setCourseData(data) {
  return {
    type: "SET_COURSE_DATA",
    payload: data
  }
}
