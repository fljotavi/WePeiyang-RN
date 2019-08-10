import * as React from "react"
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
  data
  timestamp
  status
}

const OWL_CONSTANT = 21

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
    const { style, data, status, timestamp } = this.props

    if (!(status === "VALID" && data.courses)) {
      return <View />
    }

    const timestampOwl = timestamp + 1000 * 60 * 60 * (24 - OWL_CONSTANT) // Display tomorrow's schedule by 9:00 PM
    let courseDaily = getCoursesByDay(timestampOwl, data)
    let modal

    if (courseDaily.length > 0) {
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
