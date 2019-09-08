export const WEEK_LIMIT = 21

export function getScheduleTimeSlot(raw) {
  if (typeof raw === "number") {
    raw = String(raw)
  }
  switch (raw) {
    case "1":
      return ["08:30", "09:15"]
    case "2":
      return ["09:20", "10:05"]
    case "3":
      return ["10:25", "11:10"]
    case "4":
      return ["11:15", "12:00"]
    case "5":
      return ["13:30", "14:15"]
    case "6":
      return ["14:20", "15:05"]
    case "7":
      return ["15:25", "16:10"]
    case "8":
      return ["16:15", "17:00"]
    case "9":
      return ["18:30", "19:15"]
    case "10":
      return ["19:20", "20:05"]
    case "11":
      return ["20:10", "20:55"]
    case "12":
      return ["21:00", "21:45"]
  }
  return ["Indefinite Time", "Indefinite Time"]
}

// Transform standard arrangement objects into strings like "13:30-15:05"
export function getScheduledTimeFromArrangement(arrangement) {
  return `${getScheduleTimeSlot(arrangement.start)[0]} - ${getScheduleTimeSlot(arrangement.end)[1]}`
}

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

export const getFullSchedule = (data, daysEachWeek) => {
  let weeks = []
  for (let week = 1; week <= WEEK_LIMIT; week++) {
    let occupiedIndex = 0
    let days = []
    let matrix = []
    for (let day = 1; day < daysEachWeek + 1; day++) {
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
        if (course.thisWeek) {
          let start = Number(course.activeArrange.start)
          let end = Number(course.activeArrange.end)
          for (let timeSlot = start; timeSlot <= end; timeSlot++) {
            occupiedIndex += 1
            column[mapTimeSlotToFlatIndex(timeSlot)] += 1
          }
        }
      })
      matrix.push(column)
    }
    weeks.push({
      week,
      days,
      matrix,
      occupiedIndex,
    })
  }
  console.log("Full schedd", weeks)
  return weeks
}

export const getCoursesByDay = (timestamp, data) => {
  let now = new Date(timestamp)
  let semesterStart = data.term_start * 1000
  let currentWeek = getWeek(timestamp, semesterStart)
  let res = []
  data.courses.forEach(course => {
    course.arrange.forEach(arrangement => {
      let dayOfWeek = now.getDay()
      if (arrangement.day === "7") arrangement.day = "0"
      if (Number(arrangement.day) === dayOfWeek) {
        // 星期几符合
        if (course.week.start <= currentWeek && currentWeek <= course.week.end) {
          // 在开始结束周数之内
          if (
            !(
              (arrangement.week === "单周" && currentWeek % 2 === 0) ||
              (arrangement.week === "双周" && currentWeek % 2 === 1)
            )
          ) {
            // 没有被卡单双周
            // Arranged this week!
            res.push({
              ...course,
              activeArrange: arrangement,
              thisWeek: true,
            })
          }
        } else {
          // 符合显示非本周课程定义
          res.push({
            ...course,
            activeArrange: arrangement,
            thisWeek: false,
          })
        }
      }
    })
  })
  // 额外一步检查：是否选定的"非本周"课程中，有无和本周课程当天时间安排完全一样的？
  // 如果有，应当去除，因为它会完全和本周课程重叠绘制，从而无需绘制
  res = res.filter(course => {
    if (!course.thisWeek) {
      for (let i = 0; i < res.length; i++) {
        let anotherCourse = res[i]
        if (
          anotherCourse.thisWeek &&
          anotherCourse.activeArrange.start === course.activeArrange.start &&
          anotherCourse.activeArrange.end === course.activeArrange.end
        ) {
          return false
        }
      }
    }
    return true
  })
  // 排序结果，保证开始时间靠后的课程总是后渲染，避免重叠或冲突课程时，先渲染的课程被完全覆盖而无法触发点按
  res.sort((a, b) => {
    return a.activeArrange.start - b.activeArrange.start
  })
  return res
}

export const getCalculatedDaysEachWeek = courses => {
  let currentMax = 4
  courses.forEach(course => {
    course.arrange.forEach(arrange => {
      const n = Number(arrange.day)
      if (n > currentMax) currentMax = n
    })
  })
  return currentMax
}

export const deleteTitle = str => str.replace(/\s*\(.*?\)\s*/g, "").replace(/\s*（.*?）\s*/g, "")

export const dayOffActivities = (timestamp, hashParam) => {
  let activities = [
    "golf_course",
    "fitness_center",
    "casino",
    "beach_access",
    "cake",
    "pool",
    "airline_seat_flat",
    "wc",
    "local_dining",
    "local_laundry_service",
    "directions_boat",
    "palette",
    "headset",
    "videogame_asset",
    "format_paint",
    "shopping_cart",
    "rowing",
    "remove_shopping_cart",
    "motorcycle",
    "favorite",
    "camera_enhance",
    "flight_takeoff",
    "ondemand_video",
    "free_breakfast",
    "whatshot",
    "plusone",
    "notifications",
    "library_music",
    "4k",
    "album",
    "work",
    "trending_up",
    "thumbs_up_down",
    "supervisor_account",
    "store",
    "loyalty",
    "home",
    "extension",
    "explore",
    "build",
    "accessibility",
    "hot_tub",
    "room_service",
  ]
  let hashed = Math.floor(timestamp / (5489 + (hashParam % 11)) / 19)
  return activities[hashed % activities.length]
}
