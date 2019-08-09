import * as React from "react"
import { connect } from "react-redux"

import { FlatList, StatusBar, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { fetchCourseData } from "../../actions/data-actions"
import { Dotmap } from "./dotmap"
import { getCoursesByDay, getFullSchedule } from "../../utils/schedule"

export interface ScheduleScreenProps extends NavigationScreenProps<{}> {
  course?
  fetchCourseData?
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
  dotmap: {
    marginRight: 25,
  } as ViewStyle,
  dotBar: {
    marginTop: 20,
  } as ViewStyle,
}

export class ScheduleScreen extends React.Component<ScheduleScreenProps, {}> {
  _keyExtractor = (item, index) => String(index)

  render() {
    const { course } = this.props

    let weeks = getFullSchedule(course.data)

    return (
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={ss.container}>
          <Text text="Schedule" preset="h2" />

          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={ss.dotBar}
            data={weeks.map(week => week.matrix)}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <Dotmap
                dotColor={color.primary}
                dotInactiveColor={color.washed}
                dotSize={6}
                width={50}
                height={50}
                style={ss.dotmap}
                matrix={item}
              />
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
