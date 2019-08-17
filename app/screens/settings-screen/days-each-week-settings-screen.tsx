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

export interface DaysEachWeekSettingsScreenProps extends NavigationScreenProps<{}> {
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

export class DaysEachWeekSettingsScreen extends React.Component<
  DaysEachWeekSettingsScreenProps,
  {}
> {
  render() {
    const { pref, setPreference } = this.props
    const availableDays = [4, 5, 6, 7]
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
          <Text tx="settings.daysEachWeek.title" preset="h2" style={ss.heading} />

          <Text tx="settings.daysEachWeek.intro" preset="small" style={ss.small} />

          {availableDays.map((count, i) => (
            <SettingsSnack
              key={i}
              style={ss.snack}
              preset={pref.daysEachWeek === count ? "selected" : undefined}
              textTitle={count}
              txSubtitle="settings.daysEachWeek.options"
              txOptionsSubtitle={{ count: count }}
              onPress={() => {
                setPreference("daysEachWeek", count)
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

export const connectedDaysEachWeekSettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DaysEachWeekSettingsScreen)
