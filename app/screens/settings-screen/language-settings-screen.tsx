import * as React from "react"
import { connect } from "react-redux"

import { FlatList, StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { setPreference } from "../../actions/preference-actions"
import { SettingsSnack } from "./settings-snack"
import { TopBar } from "../../components/top-bar"
import { languageFullnames } from "../../i18n/i18n"

export interface LanguageSettingsScreenProps extends NavigationScreenProps<{}> {
  pref?
  setPreference?
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
  heading: {
    marginBottom: 20,
  } as TextStyle,
  small: {
    marginBottom: 20,
    color: color.lightGrey,
  } as TextStyle,
  snack: {
    marginBottom: 10,
  } as ViewStyle,
}

export class LanguageSettingsScreen extends React.Component<LanguageSettingsScreenProps, {}> {

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
          <Text tx="settingsScreen.languageSetting" preset="h2" style={ss.heading} />

          <Text tx="settingsScreen.languageWarning" preset="small" style={ss.small} />

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
                  this.props.navigation.goBack()
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

export const connectedLanguageSettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageSettingsScreen)
