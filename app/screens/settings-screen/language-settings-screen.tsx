import * as React from "react"
import { connect } from "react-redux"

import { FlatList, StatusBar, View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { setPreference } from "../../actions/preference-actions"
import { SettingsSnack } from "./settings-snack"
import { TopBar } from "../../components/top-bar"
import { languageFullnames } from "../../i18n/i18n"
import ss from "./settings-screen.styles"

export interface LanguageSettingsScreenProps extends NavigationScreenProps<{}> {
  pref?
  setPreference?
}

class _LanguageSettingsScreen extends React.Component<LanguageSettingsScreenProps, {}> {
  _keyExtractor = lang => lang

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
          <Text tx="settings.languageSetting" preset="h2" style={ss.heading} />

          <Text tx="settings.languageWarning" preset="small" style={ss.small} />

          <FlatList
            data={Object.keys(languageFullnames)}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <SettingsSnack
                style={ss.snack}
                preset={item === pref.language ? "selected" : undefined}
                textTitle={languageFullnames[item].native}
                textSubtitle={languageFullnames[item].common}
                onPress={() => {
                  setPreference("language", item)
                }}
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

export const LanguageSettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_LanguageSettingsScreen)
