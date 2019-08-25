import * as React from "react"
import { connect } from "react-redux"

import { StatusBar, View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { setPreference } from "../../actions/preference-actions"
import { SettingsSnack } from "./settings-snack"
import { TopBar } from "../../components/top-bar"
import ss from "./settings-screen.styles"
import {languageFullnames} from "../../i18n/i18n";

export interface PaletteSettingsScreenProps extends NavigationScreenProps<{}> {
  pref?
  setPreference?
}

export class PaletteSettingsScreen extends React.Component<PaletteSettingsScreenProps, {}> {
  render() {
    const { pref, setPreference } = this.props

    return (
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <TopBar
          elements={{
            left: [
              {
                iconText: "arrow_back",
                action: () => this.props.navigation.goBack(),
              },
            ],
            right: [],
          }}
          color={color.primary}
        />

        <View style={ss.container}>
          <Text tx="settings.palette.title" preset="h2" style={ss.heading} />
          <Text tx="settings.palette.intro" preset="small" style={ss.small} />

          <Text tx="modules.gpa" preset="lausanne" style={ss.sectionHead} />

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

const mapDispatchToProps = dispatch => {
  return {
    setPreference: (key, value) => {
      dispatch(setPreference(key, value))
    },
  }
}

export const connectedPaletteSettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaletteSettingsScreen)
