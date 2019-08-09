import * as React from "react"
import { connect } from "react-redux"

import { FlatList, StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { setLanguage } from "../../actions/preference-actions"
import { SettingsSnack } from "./settings-snack"
import { TopBar } from "./top-bar"
import { languageFullnames } from "../../i18n/i18n"

export interface LanguageSettingsScreenProps extends NavigationScreenProps<{}> {
  pref?
  setLanguage?
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

export class LanguageSettingsScreen extends React.Component<LanguageSettingsScreenProps, {}> {
  state = {
    egSwOn: false,
  }

  _keyExtractor = lang => lang

  render() {
    const { pref, setLanguage } = this.props

    console.log(pref)
    return (
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <TopBar actions={[() => this.props.navigation.goBack()]} />
        <View style={ss.container}>
          <Text text="Language Settings" preset="h2" style={ss.heading} />

          <FlatList
            data={Object.keys(languageFullnames)}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <SettingsSnack
                style={ss.snack}
                preset={item === pref.language ? "selected" : undefined}
                textTitle={languageFullnames[item].native}
                textSubtitle={languageFullnames[item].common}
                onPress={() => setLanguage(item)}
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
    setLanguage: l => {
      dispatch(setLanguage(l))
    },
  }
}

export const connectedLanguageSettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageSettingsScreen)
