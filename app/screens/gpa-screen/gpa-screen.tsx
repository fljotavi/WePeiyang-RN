import * as React from "react"
import { connect } from "react-redux"

import { StatusBar, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { setScoreType } from "../../actions/gpa-type-actions"
import { fetchGpaData } from "../../actions/data-actions"

export interface GpaScreenProps extends NavigationScreenProps<{}> {
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical
  } as ViewStyle,
}

export class GpaScreen extends React.Component<GpaScreenProps, {}> {
  render () {
    return (
      <Screen preset="scroll">
        <StatusBar backgroundColor={color.background} barStyle="dark-content" />
        <View style={ss.container}>
          <Text text="GPA" preset="h2" />
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    scoreType: state.gpaTypeReducer,
    gpa: state.dataReducer.gpa,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreType: (newType) => {
      dispatch(setScoreType(newType))
    },
    fetchGpaData: async () => {
      await dispatch(fetchGpaData())
    }
  }
}

export const connectedGpaScreen = connect(mapStateToProps, mapDispatchToProps)(GpaScreen)
