import * as React from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { CourseBlock } from "../course-block"
import { colorHashByCredits, getScheduleTimeSlot, sanitizeLocation } from "../../utils/common"
import { Ian } from "../ian"
import ss from "./course-daily-schedule.style"
import { color } from "../../theme"
import Modal from "react-native-modal"
import Touchable from "react-native-platform-touchable"
import { Text } from "../text"

export interface CourseDailyScheduleProps {
  style?: ViewStyle
  data
  timestamp
  status
}

const OWL_CONSTANT = 21

const getWeek = (timestamp, semesterStart) => {
  return (timestamp - semesterStart) / (1000 * 60 * 60 * 24 * 7) + 1
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

console.log(getCoursesByDay)

const genDummyCourses = (a, b) => {
  return [
    {
      courseName: "计算机产业新技术与发展",
      timeSlot: `${getScheduleTimeSlot(3)[0]} - ${getScheduleTimeSlot(4)[1]}`,
      location: sanitizeLocation("55-A117"),
      credits: "1.0",
    },
    {
      courseName: "高等数学",
      timeSlot: `${getScheduleTimeSlot(5)[0]} - ${getScheduleTimeSlot(6)[1]}`,
      location: sanitizeLocation("46-B118"),
      credits: "5.0",
    },
    {
      courseName: "绿色建筑概论",
      timeSlot: `${getScheduleTimeSlot(9)[0]} - ${getScheduleTimeSlot(11)[1]}`,
      location: sanitizeLocation("游泳馆"),
      credits: "2.5",
    },
    {
      courseName: "体育3A",
      timeSlot: `${getScheduleTimeSlot(1)[0]} - ${getScheduleTimeSlot(2)[1]}`,
      location: sanitizeLocation("46-B138"),
      credits: "0.5",
    },
  ]
}

export class CourseDailySchedule extends React.Component<CourseDailyScheduleProps, {}> {

  state = {
    isModalVisible: false,
    userInformed: false,
    courseIndex: 1,
  }

  openModal = () => {
    this.setState({ isModalVisible: true })
  }
  closeModal = () => {
    this.setState({ isModalVisible: false, userInformed: false })
  }

  _keyExtractor = (item, index) => String(item.courseName) // TODO: Change attr to sth else

  render() {
    const { style, data, timestamp, status } = this.props
    const timestampOwl = timestamp + 1000 * 60 * 60 * (24 - OWL_CONSTANT) // Display tomorrow's schedule by 9:00 PM
    let courseDaily = genDummyCourses(timestampOwl, data)
    let chosenCourse = courseDaily[this.state.courseIndex]
    let backgroundStyle = { backgroundColor: color.gpa[colorHashByCredits(chosenCourse.credits)] }

    if (status !== "VALID") {
      return <View />
    }

    return (
      <View style={[ss.predefinedStyle, style]}>

        <Modal
          isVisible={this.state.isModalVisible}
          backdropColor={ss.screen.backgroundColor}
          animationIn={"flipInY"}
          animationOut={"flipOutY"}
          animationInTiming={400}
          animationOutTiming={300}
          onBackButtonPress={this.closeModal}
          onBackdropPress={this.closeModal}
          useNativeDriver={true}
          style={ss.modal}
        >

          <View
            style={[ss.modalCard, backgroundStyle]}
          >

            <View>
              <Text text={chosenCourse['courseName']} style={ss.courseTitle} selectable={true}/>
              <Text text={chosenCourse['location']} style={ss.courseTutor} selectable={true}/>
            </View>

          </View>

        </Modal>

        <FlatList
          style={ss.listStyle}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={this._keyExtractor}
          data={courseDaily} // TODO: Return authentic data
          renderItem={({ item, index }) => (
            <Touchable
              foreground={Touchable.Ripple(color.background)}
              style={ss.courseBlockStyle}
              delayPressIn={0}
              onPress={() => {
                this.openModal()
                this.setState({ courseIndex: index })
              }}
            >
              <CourseBlock
                backgroundColor={color.gpa[colorHashByCredits(item.credits)]}
                courseName={item.courseName}
                timeSlot={item.timeSlot}
                location={item.location}
              />
            </Touchable>

          )}
          ListEmptyComponent={() => <Ian tx="schedule.noCourseToday"/>}
        />
      </View>
    )
  }
}
