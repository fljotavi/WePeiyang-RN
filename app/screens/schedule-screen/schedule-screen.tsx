import * as React from "react"
import { connect } from "react-redux"

import { StatusBar, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { fetchCourseData } from "../../actions/data-actions"

export interface ScheduleScreenProps extends NavigationScreenProps<{}> {}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
}

export class ScheduleScreen extends React.Component<ScheduleScreen, {}> {
  render() {
    return (
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={ss.container}>
          <Text text="Schedule" preset="h2" />
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
