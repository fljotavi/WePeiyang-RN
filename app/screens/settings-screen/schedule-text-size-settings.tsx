import * as React from "react"
import { connect } from "react-redux"

import { StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { setPreference } from "../../actions/preference-actions"
import { SettingsSnack } from "./settings-snack"
import { TopBar } from "../../components/top-bar"

export interface ScheduleTextSizeSettingsScreenProps extends NavigationScreenProps<{}> {
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

export class ScheduleTextSizeSettingsScreen extends React.Component<
  ScheduleTextSizeSettingsScreenProps,
  {}
> {
  render() {
    const { pref, setPreference } = this.props
    const availableSizes = [50, 70, 85, 100, 120, 140]
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
          <Text tx="settings.scheduleTextSize.title" preset="h2" style={ss.heading} />

          <Text tx="settings.scheduleTextSize.intro" preset="small" style={ss.small} />

          {availableSizes.map((count, i) => (
            <SettingsSnack
              key={i}
              style={ss.snack}
              preset={pref.scheduleTextSize === count ? "selected" : undefined}
              textTitle={count + "%"}
              onPress={() => {
                setPreference("scheduleTextSize", count)
                this.props.navigation.goBack()
              }}
            />
          ))}
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

export const connectedScheduleTextSizeSettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleTextSizeSettingsScreen)
