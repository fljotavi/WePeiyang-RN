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

export interface DaysEachWeekSettingsScreenProps extends NavigationScreenProps<{}> {
  pref?
  setPreference?
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
