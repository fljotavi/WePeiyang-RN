import * as React from "react"
import { connect } from "react-redux"

import { Dimensions, FlatList, ScrollView, StatusBar, TouchableOpacity, View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { fetchCourseData } from "../../actions/data-actions"
import { Dotmap } from "./dotmap"
import { getFullSchedule } from "../../utils/schedule"
import { TopBar } from "./top-bar"
import { CourseBlockInner } from "../../components/course-block-inner"
import { colorHashByCredits, sanitizeLocation } from "../../utils/common"
import Touchable from "react-native-platform-touchable"
import { format } from "date-fns"
import ss from "./schedule-screen.style"
import Modal from "react-native-modal"
import { CourseModal } from "../../components/course-modal"

export interface ScheduleScreenProps extends NavigationScreenProps<{}> {
  course?
  fetchCourseData?
}

export class ScheduleScreen extends React.Component<ScheduleScreenProps, {}> {
  state = {
    isModalVisible: false,
    currentWeek: 1,
    windowWidth: Dimensions.get("window").width,
    screenHeight: Dimensions.get("screen").height,
    courseIndex: undefined,
  }

  getNewDimensions = event => {
    this.setState({
      windowWidth: event.nativeEvent.layout.width,
      screenHeight: Dimensions.get("screen").height,
    })
  }

  openModal = () => {
    this.setState({ isModalVisible: true })
  }
  closeModal = () => {
    this.setState({ isModalVisible: false, userInformed: false })
  }

  _keyExtractor = (item, index) => String(index)

  render() {
    const { course } = this.props

    let daysEachWeek = 5

    let weeks = getFullSchedule(course.data, daysEachWeek)
    let days = weeks[this.state.currentWeek - 1].days

    // For height, you need to specify height of a single components,
    // and the total renderHeight would span
    let timeSlotHeight = this.state.screenHeight / (18 - daysEachWeek)
    let dateIndicatorHeight = 30
    let timeSlotMargin = 12 - daysEachWeek
    let nTimeSlots = 12
    let renderHeight = (timeSlotHeight + timeSlotMargin) * nTimeSlots + dateIndicatorHeight

    // For width, you need to specify total renderWidth
    let renderWidth = this.state.windowWidth - 2 * layoutParam.paddingHorizontal
    let dayMargin = timeSlotMargin
    let dayWidth = (renderWidth - (daysEachWeek - 1) * dayMargin) / daysEachWeek

    // When styles are strongly connected to programmatic process,
    // usage of inline styles are not avoidable.
    let columns = days.map((day, i) => (
      <View>
        <View
          style={{
            height: dateIndicatorHeight,
            marginBottom: timeSlotMargin,
            backgroundColor: color.washed,
            borderRadius: layoutParam.borderRadius / 1.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text text={format(new Date(day.timestamp), "MM/DD")} style={ss.dateIndicator} />
        </View>
        <View style={[ss.column, { width: dayWidth }]} key={i}>
          {day.courses.map((c, j) => {
            let start = Number(c.activeArrange.start) - 1
            let end = Number(c.activeArrange.end)
            let duration = end - start
            return (
              <Touchable
                style={{
                  position: "absolute",
                  top: start * (timeSlotHeight + timeSlotMargin),
                }}
                key={j}
                delayPressIn={0}
                onPress={() => {
                  this.setState(
                    {
                      courseIndex: [i, j],
                    },
                    () => {
                      this.openModal()
                    },
                  )
                }}
                foreground={Touchable.Ripple(color.background)}
              >
                <CourseBlockInner
                  style={{
                    width: dayWidth,
                    height: duration * timeSlotHeight + (duration - 1) * timeSlotMargin,
                    alignSelf: "stretch",
                  }}
                  backgroundColor={color.hash.course[colorHashByCredits(c.credit)]}
                  courseName={c.coursename}
                  p1={c.teacher}
                  p2={sanitizeLocation(c.activeArrange.room)}
                />
              </Touchable>
            )
          })}
        </View>
      </View>
    ))

    let modal = <View />

    if (this.state.courseIndex) {
      let idx = this.state.courseIndex
      let chosenCourse = weeks[this.state.currentWeek - 1].days[idx[0]].courses[idx[1]]

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
      <Screen>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        {modal}

        <ScrollView showsVerticalScrollIndicator={false}>
          <TopBar actions={[() => this.props.navigation.goBack(), () => {}]} />
          <View style={ss.container} onLayout={this.getNewDimensions}>
            <Text text="Schedule" preset="h2" />

            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={ss.dotBar}
              data={weeks}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      currentWeek: item.week,
                    })
                  }}
                >
                  <View style={ss.dotmapContainer}>
                    <Dotmap
                      dotColor={color.primary}
                      dotInactiveColor={color.washed}
                      dotSize={6}
                      width={10 * daysEachWeek}
                      height={50}
                      style={ss.dotmap}
                      matrix={item.matrix}
                    />
                    <Text style={ss.dotmapText}>
                      <Text text="WEEK " />
                      <Text text={item.week} />
                      <Text text="" />
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            <View style={[ss.main, { height: renderHeight }]}>{columns}</View>
          </View>
        </ScrollView>
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  return {
    course: state.dataReducer.course,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCourseData: async () => {
      await dispatch(fetchCourseData())
    },
  }
}

export const connectedScheduleScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleScreen)
