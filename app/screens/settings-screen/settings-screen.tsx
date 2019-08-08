import * as React from "react"
import { connect } from "react-redux"

import { StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { SettingsSnack } from "./settings-snack"

export interface SettingsScreenProps extends NavigationScreenProps<{}> {
  pref?
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
  heading: {
    marginBottom: 20,
  } as TextStyle,
  snack: {
    marginBottom: 10,
  } as ViewStyle,
}

export class SettingsScreen extends React.Component<SettingsScreenProps, {}> {
  state = {
    egSwOn: false,
  }

  render() {
    const { pref } = this.props
    return (
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={ss.container}>
          <Text text="Settings" preset="h2" style={ss.heading} />

          <SettingsSnack
            style={ss.snack}
            txTitle="settingsScreen.displayGpa"
            switchable={true}
            on={this.state.egSwOn}
            onPress={() => {
              this.setState({ egSwOn: !this.state.egSwOn })
            }}
          />

          <SettingsSnack
            style={ss.snack}
            txTitle="settingsScreen.language"
            textSubtitle={pref.language}
            onPress={() => this.props.navigation.navigate("languageSettings")}
          />
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  return {
    pref: state.preferenceReducer,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const connectedSettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen)
