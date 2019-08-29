/*
 * Course Daily Schedule
 * Created by Tzingtao Chow
 * ---
 *
 * Course Daily Schedules 是显示在主页上的今日课程安排。
 * 此组件也包含了点击每一个 Course 后出现 Modal 的逻辑。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { FlatList, View, ViewStyle } from "react-native"
import { CourseBlock } from "../course-block"
import { colorHashByCredits, sanitizeLocation } from "../../utils/common"
import { Ian } from "../ian"
import ss from "./course-daily-schedule.style"
import { color } from "../../theme"
import Modal from "react-native-modal"
import Touchable from "react-native-platform-touchable"
import { getCoursesByDay, getScheduledTimeFromArrangement } from "../../utils/schedule"
import { CourseModal } from "../course-modal"

export interface CourseDailyScheduleProps {
  style?: ViewStyle
  compData?
  timestamp
  pref?
}

class _CourseDailySchedule extends React.Component<CourseDailyScheduleProps, {}> {
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
    const { style, compData, timestamp, pref } = this.props
    const data = compData.course.data

    if (!compData.userInfo.data.accounts.tju) {
      return (
        <View style={[ss.predefinedStyle, style]}>
          <Ian tx="accountBinding.etjuNotBound" />
        </View>
      )
    }

    if (compData.course.status !== "VALID") {
      return <View />
    }

    const timestampOwl = timestamp + 1000 * 60 * 60 * (24 - pref.owlIndex) // Display tomorrow's schedule by 9:00 PM?
    let courseDaily = getCoursesByDay(timestampOwl, data).filter(course => course.thisWeek)
    let modal

    if (courseDaily.length <= 0) {
      return (
        <View style={[ss.predefinedStyle, style]}>
          <Ian tx="schedule.noCourseToday" />
        </View>
      )
    }

    let chosenCourse = courseDaily[this.state.courseIndex]

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
        <CourseModal chosenCourse={chosenCourse} />
      </Modal>
    )

    return (
      <View style={[ss.predefinedStyle, style]}>
        {modal}

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
                backgroundColor={color.module().schedule[colorHashByCredits(item.credit)]}
                courseName={item.coursename}
                timeSlot={getScheduledTimeFromArrangement(item.activeArrange)}
                location={sanitizeLocation(item.activeArrange.room)}
              />
            </Touchable>
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    compData: state.dataReducer,
    pref: state.preferenceReducer,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const CourseDailySchedule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_CourseDailySchedule)
