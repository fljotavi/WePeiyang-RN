import * as React from "react"
import { connect } from "react-redux"

import { FlatList, StatusBar, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { fetchCourseData } from "../../actions/data-actions"
import { Dotmap } from "./dotmap"
import { getFullSchedule } from "../../utils/schedule"
import { CourseDailySchedule } from "../../components/course-daily-schedule"

export interface ScheduleScreenProps extends NavigationScreenProps<{}> {
  course?
  fetchCourseData?
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
  dotmapContainer: {
    alignItems: "center",
    marginRight: 25,
  } as ViewStyle,
  dotmapText: {
    color: color.lightGrey,
    fontSize: 10,
    fontWeight: "bold",
  } as TextStyle,
  dotmap: {
    marginBottom: 10,
  } as ViewStyle,
  dotBar: {
    marginTop: 20,
  } as ViewStyle,

  dayRow: {
    marginBottom: 20,
  } as ViewStyle,
  dayRowText: {
    marginBottom: 10,
  } as TextStyle,
}

export class ScheduleScreen extends React.Component<ScheduleScreenProps, {}> {
  state = {
    currentWeek: 1,
  }

  _keyExtractor = (item, index) => String(index)

  render() {
    const { course } = this.props

    let weeks = getFullSchedule(course.data)
    let days = weeks[this.state.currentWeek + 1].days

    return (
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={ss.container}>
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
                    width={50}
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

          <FlatList
            showsHorizontalScrollIndicator={false}
            style={ss.dotBar}
            data={days}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <View style={ss.dayRow}>
                <Text
                  text={new Date(item.timestamp).toDateString()}
                  style={ss.dayRowText}
                  preset="h5"
                />
                <CourseDailySchedule
                  data={course.data}
                  timestamp={item.timestamp}
                  status={course.status}
                />
              </View>
            )}
          />
        </View>
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
