import * as React from "react"
import { connect } from "react-redux"

import { StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { setLanguage } from "../../actions/preference-actions"
import { SettingsSnack } from "./settings-snack"

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

  render() {
    const { pref, setLanguage } = this.props
    console.log(pref)
    return (
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={ss.container}>
          <Text text="Language Settings" preset="h2" style={ss.heading} />

          <SettingsSnack
            style={ss.snack}
            textTitle="中文"
            textSubtitle="Chinese"
            onPress={() => setLanguage("zh")}
          />

          <SettingsSnack
            style={ss.snack}
            textTitle="Espana"
            textSubtitle={"Spanish"}
            onPress={() => setLanguage("es")}
          />

          <SettingsSnack
            style={ss.snack}
            textTitle="English"
            textSubtitle={"English"}
            onPress={() => setLanguage("en")}
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
