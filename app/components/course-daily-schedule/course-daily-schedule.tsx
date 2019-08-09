import * as React from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { CourseBlock } from "../course-block"
import {
  colorHashByCredits,
  getScheduledTimeFromArrangement,
  sanitizeLocation,
} from "../../utils/common"
import { Ian } from "../ian"
import ss from "./course-daily-schedule.style"
import { color } from "../../theme"
import Modal from "react-native-modal"
import Touchable from "react-native-platform-touchable"
import { Text } from "../text"
import { TjuBadge } from "../tju-badge"

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
            console.log(course)
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

export class CourseDailySchedule extends React.Component<CourseDailyScheduleProps, {}> {
  state = {
    isModalVisible: false,
    userInformed: false,
    courseIndex: 0,
  }

  openModal = () => {
    this.setState({ isModalVisible: true })
  }
  closeModal = () => {
    this.setState({ isModalVisible: false, userInformed: false })
  }

  _keyExtractor = (item, index) => String(index)

  render() {
    const { style, data, timestamp, status } = this.props

    if (status !== "VALID") {
      return <View />
    }

    const timestampOwl = timestamp + 1000 * 60 * 60 * (24 - OWL_CONSTANT) // Display tomorrow's schedule by 9:00 PM
    let courseDaily = getCoursesByDay(timestampOwl, data)
    let modal

    if (courseDaily.length > 0) {
      let chosenCourse = courseDaily[this.state.courseIndex]
      let hashedColorStyle = {
        fontWeight: "bold",
        color: color.hash.course[colorHashByCredits(chosenCourse.credit)],
      }

      modal = (
        <Modal
          isVisible={this.state.isModalVisible}
          backdropColor={ss.screen.backgroundColor}
          hideModalContentWhileAnimating={true}
          animationIn={"fadeInUp"}
          animationOut={"fadeOutUp"}
          animationInTiming={400}
          animationOutTiming={300}
          onBackButtonPress={this.closeModal}
          onBackdropPress={this.closeModal}
          useNativeDriver={true}
          style={ss.modal}
        >
          <View
            style={[
              ss.modalCard,
              {
                backgroundColor: color.hash.course[colorHashByCredits(chosenCourse.credit)],
              },
            ]}
          >
            <TjuBadge style={ss.tjuBadge} fill={color.white(0.02)} height={310} width={270} />

            <View>
              {chosenCourse.ext.length > 0 && (
                <View style={ss.courseTag}>
                  <Text text="school" preset="i" style={hashedColorStyle} />
                  <Text text=" " preset="small" style={hashedColorStyle} />
                  <Text text="重修" preset="small" style={hashedColorStyle} />
                </View>
              )}

              <Text text={chosenCourse.coursename} style={ss.courseTitle} selectable={true} />
              <Text style={ss.courseTutor}>
                <Text
                  text={`${chosenCourse.teacher} · ${chosenCourse.college}`}
                  selectable={true}
                />
              </Text>
            </View>

            <View>
              <View style={ss.courseAttrs}>
                <View style={ss.courseAttrPair}>
                  <Text text={"ID"} style={ss.courseAttrKey} />
                  <Text text={chosenCourse.courseid} style={ss.courseAttrValue} />
                </View>
                <View style={ss.courseAttrPair}>
                  <Text text={"Type"} style={ss.courseAttrKey} />
                  <Text text={chosenCourse.coursenature} style={ss.courseAttrValue} />
                </View>
                <View style={ss.courseAttrPair}>
                  <Text text={"SubType"} style={ss.courseAttrKey} />
                  <Text text={chosenCourse.coursetype} style={ss.courseAttrValue} />
                </View>
                <View style={ss.courseAttrPair}>
                  <Text text={"逻辑班号"} style={ss.courseAttrKey} />
                  <Text text={chosenCourse.classid} style={ss.courseAttrValue} />
                </View>
                <View style={ss.courseAttrPair}>
                  <Text text={"Campus"} style={ss.courseAttrKey} />
                  <Text text={chosenCourse.campus} style={ss.courseAttrValue} />
                </View>
                <View style={ss.courseAttrPair}>
                  <Text text={"Location"} style={ss.courseAttrKey} />
                  <Text
                    text={sanitizeLocation(chosenCourse.activeArrange.room)}
                    style={ss.courseAttrValue}
                  />
                </View>
                <View style={ss.courseAttrPair}>
                  <Text text={"Time"} style={ss.courseAttrKey} />
                  <Text
                    text={getScheduledTimeFromArrangement(chosenCourse.activeArrange)}
                    style={ss.courseAttrValue}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )
    }

    return (
      <View style={[ss.predefinedStyle, style]}>
        {courseDaily.length > 0 && modal}

        <FlatList
          style={ss.listStyle}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={this._keyExtractor}
          data={courseDaily}
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
                backgroundColor={color.hash.course[colorHashByCredits(item.credit)]}
                courseName={item.coursename}
                timeSlot={getScheduledTimeFromArrangement(item.activeArrange)}
                location={sanitizeLocation(item.activeArrange.room)}
              />
            </Touchable>
          )}
          ListEmptyComponent={() => <Ian tx="schedule.noCourseToday" />}
        />
      </View>
    )
  }
}
