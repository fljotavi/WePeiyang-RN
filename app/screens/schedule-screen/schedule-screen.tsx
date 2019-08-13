import * as React from "react"
import { connect } from "react-redux"

import {
  DeviceEventEmitter,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { fetchCourseData, setGeneratedSchedule } from "../../actions/data-actions"
import { Dotmap } from "./dotmap"
import { dayOffActivities, getFullSchedule, getWeek, WEEK_LIMIT } from "../../utils/schedule"
import { TopBar } from "../../components/top-bar"
import { CourseBlockInner } from "../../components/course-block-inner"
import { colorHashByCredits, sanitizeLocation } from "../../utils/common"
import Touchable from "react-native-platform-touchable"
import { format, isSameDay } from "date-fns"
import ss from "./schedule-screen.style"
import Modal from "react-native-modal"
import { CourseModal } from "../../components/course-modal"
import { Toasti } from "../../components/toasti"
import { DateIndicator } from "./date-indicator"

export interface ScheduleScreenProps extends NavigationScreenProps<{}> {
  course?
  pref?
  userInfo?
  fetchCourseData?
  setGeneratedSchedule?
}

export class ScheduleScreen extends React.Component<ScheduleScreenProps, {}> {
  state = {
    refreshing: false,
    isModalVisible: false,
    chosenWeek: 1,
    currentWeek: 1,
    currentTimestamp: 0,
    windowWidth: Dimensions.get("window").width,
    screenHeight: Dimensions.get("screen").height,
    courseIndex: undefined,
  }

  componentDidMount = () => {
    let dayToRender = "2018/05/08 13:00"
    let timestamp = new Date(dayToRender).getTime()
    let currentWeek = getWeek(timestamp, 1520179200 * 1000)
    if (currentWeek < 1) currentWeek = 1
    if (isNaN(currentWeek)) {
      currentWeek = 1
      DeviceEventEmitter.emit(
        "showToast",
        <Toasti text="Cannot decide current week =(" preset="error" />,
      )
    }
    if (currentWeek > WEEK_LIMIT) currentWeek = WEEK_LIMIT
    this.setState({
      chosenWeek: currentWeek,
      currentWeek: currentWeek,
      currentTimestamp: timestamp,
    })
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

  prepareData = async () => {
    await Promise.all([this.props.fetchCourseData()])
      .then(() => {
        console.log("Costly branch")
        this.props.setGeneratedSchedule(
          getFullSchedule(this.props.course.data, this.props.pref.daysEachWeek),
        )
        DeviceEventEmitter.emit("showToast", <Toasti tx="data.prepareDataSuccess" />)
      })
      .catch(err => {
        console.log(err)
        DeviceEventEmitter.emit("showToast", <Toasti text={err.message} preset="error" />)
      })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.prepareData().then(() => {
      this.setState({ refreshing: false })
    })
  }

  _keyExtractor = (item, index) => String(index)

  render() {
    const { course, pref } = this.props
    const studentId = Number(this.props.userInfo.data.studentid)
    let daysEachWeek = pref.daysEachWeek
    let weeks

    if (course.generated) {
      console.log("Cached branch")
      weeks = course.generated
    } else {
      console.log("Costly branch")
      weeks = getFullSchedule(course.data, daysEachWeek)
      this.props.setGeneratedSchedule(weeks)
    }

    let days = weeks[this.state.chosenWeek - 1].days

    // For height, you need to specify height of a single components,
    // and the total renderHeight would span
    let timeSlotHeight = this.state.screenHeight / (18 - daysEachWeek)
    let dateIndicatorHeight = 30
    let timeSlotMargin = 12 - daysEachWeek
    let nTimeSlots = 12
    let renderHeight = (timeSlotHeight + timeSlotMargin) * nTimeSlots + dateIndicatorHeight
    let scheduleRenderHeight = renderHeight - timeSlotMargin - dateIndicatorHeight

    // For width, you need to specify total renderWidth
    let renderWidth = this.state.windowWidth - 2 * layoutParam.paddingHorizontal
    let dayMargin = timeSlotMargin
    let dayWidth = (renderWidth - (daysEachWeek - 1) * dayMargin) / daysEachWeek

    // When styles are strongly connected to programmatic process,
    // usage of inline styles are not avoidable.
    let columns = days.map((day, i) => {
      let crashIndex = 0
      return (
        <View key={i}>
          <DateIndicator
            height={dateIndicatorHeight}
            marginBottom={timeSlotMargin}
            text={format(new Date(day.timestamp), "MM/DD")}
            active={isSameDay(new Date(day.timestamp), new Date(this.state.currentTimestamp))}
          />

          {/*Begin a daily schedule column*/}
          <View style={[ss.column, { width: dayWidth, height: scheduleRenderHeight }]} key={i}>
            {day.courses.length > 0 ? (
              day.courses.map((c, j, arr) => {
                let start = Number(c.activeArrange.start) - 1
                let end = Number(c.activeArrange.end)
                let duration = end - start

                // If detected 2 courses with the same start time, translate the late rendered one
                let verticalPosition = start * (timeSlotHeight + timeSlotMargin)
                if (j > 0) {
                  if (arr[j].activeArrange.start === arr[j - 1].activeArrange.start) {
                    crashIndex += 1
                    verticalPosition += crashIndex * 20
                  } else {
                    crashIndex = 0
                  }
                }
                return (
                  <Touchable
                    style={{
                      position: "absolute",
                      top: verticalPosition,
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
              })
            ) : (
              // Ian and this view here have more differences than styles in common, so plain view.
              <View style={ss.scheduleIan}>
                <Text
                  style={ss.scheduleIanText}
                  preset="i"
                  text={dayOffActivities(day.timestamp, studentId)}
                />
              </View>
            )}
          </View>
          {/*End a daily schedule column*/}
        </View>
      )
    })

    let modal = <View />

    if (this.state.courseIndex) {
      let idx = this.state.courseIndex
      let chosenCourse = weeks[this.state.chosenWeek - 1].days[idx[0]].courses[idx[1]]

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

    const dotmapWidth = 10 * daysEachWeek

    return (
      <Screen>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        {modal}

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor={color.primary}
              colors={[color.primary]}
            />
          }
        >

          <TopBar
            elements={{
              left: [
                {
                  iconText: "arrow_back",
                  action: () => this.props.navigation.goBack(),
                },
              ],
              right: [
                {
                  iconText: "sync",
                  action: () => this._onRefresh(),
                },
              ],
            }}
            color={color.primary}
          />

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
                      chosenWeek: item.week,
                    })
                  }}
                >
                  <View style={ss.dotmapContainer}>
                    <Dotmap
                      dotColor={color.primary}
                      dotInactiveColor={color.washed}
                      dotSize={6}
                      width={dotmapWidth}
                      height={50}
                      style={ss.dotmap}
                      matrix={item.matrix}
                    />
                    <Text style={ss.dotmapText}>
                      <Text text="WEEK " />
                      {this.state.currentWeek !== item.week && <Text text={item.week} />}
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
    userInfo: state.dataReducer.userInfo,
    pref: state.preferenceReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCourseData: async () => {
      await dispatch(fetchCourseData())
    },
    setGeneratedSchedule: generated => {
      dispatch(setGeneratedSchedule(generated))
    },
  }
}

export const connectedScheduleScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleScreen)
