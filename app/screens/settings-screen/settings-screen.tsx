import * as React from "react"
import { connect } from 'react-redux'

import {StatusBar, View, ViewStyle} from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"

export interface SettingsScreenProps extends NavigationScreenProps<{}> {
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical
  } as ViewStyle,
}

export class SettingsScreen extends React.Component<SettingsScreenProps, {}> {
  render () {
    return (
      <Screen preset="scroll">
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle='dark-content'
        />
        <View style={ss.container}>
          <Text text="Settings" preset="h2" />
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export const connectedSettingsScreen = connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
