import * as React from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { CourseBlock } from "../course-block"
import { getScheduleTimeSlot, sanitizeLocation } from "../../utils/common"

export interface CourseDailyScheduleProps {
  style?: ViewStyle
  data
  timestamp
  status
}

const predefinedStyle: ViewStyle = {
  overflow: "visible"
}

const listStyle: ViewStyle = {
  overflow: "visible"
}

const courseBlockStyle: ViewStyle = {
  marginRight: 12
}

const OWL_CONSTANT = 21

const getWeek = (timestamp, semesterStart) => {
  return (timestamp - semesterStart) / (1000 * 60 * 60 * 24 * 7) + 1 // TODO: Check time-padding necessity
}

const getCoursesByDay = (timestamp, data) => {
  let now = new Date(timestamp)
  let semesterStart = data.term_start * 1000
  let currentWeek = getWeek(timestamp, semesterStart)
  let res = []
  data.courses.forEach((course) => {
    if (course.week.start <= currentWeek && currentWeek <= course.week.end) {
      course.arrange.forEach((arrangement) => {
        if (arrangement.day === String(now.getDay())) {
          let arrangedThisWeek = true
          switch (arrangement.week) {
            case "单周":
              if (currentWeek % 2 === 0) arrangedThisWeek = false
              break
            case "双周":
              if (currentWeek % 2 === 1) arrangedThisWeek = false
              break
          }
          if (arrangedThisWeek) {
            // Finally
            res.push({
              courseName: course.coursename,
              timeSlot: `${getScheduleTimeSlot(arrangement.start)[0]} - ${getScheduleTimeSlot(arrangement.end)[1]}`,
              location: sanitizeLocation(arrangement.room),
              credits: course.credit,
            })
          }
        }
      })
    }
  })
  return res
}

export class CourseDailySchedule extends React.Component<CourseDailyScheduleProps, {}> {

  render() {
    const { style, data, timestamp, status } = this.props
    const timestampOwl = timestamp + 1000 * 60 * 60 * (24 - OWL_CONSTANT) // Display tomorrow's schedule by 9:00 PM

    if (status !== "VALID") {
      return <View />
    } else {
      console.log(data)
    }

    return (
      <View style={[predefinedStyle, style]}>
        <FlatList
          style={listStyle}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={getCoursesByDay(timestampOwl, data)}
          renderItem={({ item }) => (
            <CourseBlock style={courseBlockStyle} credits={item.credits} courseName={item.courseName} timeSlot={item.timeSlot} location={item.location}/>
          )}
          ListEmptyComponent={() => <Text tx="schedule.noCourseToday"/>}
        />
      </View>
    )
  }
}
