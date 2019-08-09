import * as React from "react"
import { connect } from "react-redux"

import { StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { SettingsSnack } from "./settings-snack"
import { TopBar } from "./top-bar"
import {languageFullnames} from "../../i18n/i18n";

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
        <TopBar actions={[() => this.props.navigation.goBack()]} />
        <View style={ss.container}>
          <Text tx="settingsScreen.settings" preset="h2" style={ss.heading} />

          <SettingsSnack
            style={ss.snack}
            txTitle="settingsScreen.displayGpa"
            preset="switch"
            on={this.state.egSwOn}
            onPress={() => {
              this.setState({ egSwOn: !this.state.egSwOn })
            }}
          />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            txTitle="settingsScreen.language"
            textSubtitle={languageFullnames[pref.language].common}
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
