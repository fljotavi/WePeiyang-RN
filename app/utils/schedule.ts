export const getWeek = (timestamp, semesterStart) => {
  return Math.floor((timestamp - semesterStart) / (1000 * 60 * 60 * 24 * 7)) + 1
}

export const mapTimeSlotToFlatIndex = timeSlot => {
  if (timeSlot <= 2) return 0
  if (timeSlot <= 4) return 1
  if (timeSlot <= 6) return 2
  if (timeSlot <= 8) return 3
  else return 4
}

export const getFullSchedule = data => {
  let weeks = []
  for (let week = 1; week < 22; week++) {
    let days = []
    let matrix = []
    for (let day = 1; day < 6; day++) {
      let termStart = Number(data.term_start) * 1000
      let thisDay = termStart + ((week - 1) * 7 + (day - 1)) * 86400000
      let courses = getCoursesByDay(thisDay, data)
      days.push({
        day: day,
        timestamp: thisDay,
        courses: courses,
      })

      let column = [0, 0, 0, 0, 0]
      courses.forEach(course => {
        let start = Number(course.activeArrange.start)
        let end = Number(course.activeArrange.end)
        for (let timeSlot = start; timeSlot <= end; timeSlot++) {
          column[mapTimeSlotToFlatIndex(timeSlot)] += 1
        }
      })
      matrix.push(column)
    }
    weeks.push({
      week,
      days,
      matrix,
    })
  }
  return weeks
}

export const getCoursesByDay = (timestamp, data) => {
  let now = new Date(timestamp)
  let semesterStart = data.term_start * 1000
  let currentWeek = getWeek(timestamp, semesterStart)
  let res = []
  data.courses.forEach(course => {
    if (course.week.start <= currentWeek && currentWeek <= course.week.end) {
      course.arrange.forEach(arrangement => {
        let dayOfWeek = now.getDay()
        if (arrangement.day === "7") {
          arrangement.day = "0"
        }
        if (Number(arrangement.day) === dayOfWeek) {
          let arrangedThisWeek = true
          switch (arrangement.week) {
            case "单周":
              if (currentWeek % 2 === 0) {
                arrangedThisWeek = false
              }
              break
            case "双周":
              if (currentWeek % 2 === 1) {
                arrangedThisWeek = false
              }
              break
          }
          if (arrangedThisWeek) {
            // Finally
            res.push({
              ...course,
              activeArrange: arrangement,
            })
          }
        }
      })
    }
  })
  return res
}
