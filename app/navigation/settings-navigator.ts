/*
 * Settings Navigator
 * Created by Tzingtao Chow
 * ---
 *
 * 设置导航器。
 * 使用它在应用内不同的设置页面和设置项之间跳转。
 *
 */

import { createStackNavigator } from "react-navigation"
import { connectedSettingsScreen } from "../screens/settings-screen"
import { connectedLanguageSettingsScreen } from "../screens/settings-screen/language-settings-screen"
import { connectedDaysEachWeekSettingsScreen } from "../screens/settings-screen/days-each-week-settings-screen"

export const SettingsNavigator = createStackNavigator(
  {
    settings: connectedSettingsScreen,
    language: connectedLanguageSettingsScreen,
    daysEachWeek: connectedDaysEachWeekSettingsScreen,
  },
  {
    initialRouteName: "settings",
    headerMode: "none",
  },
)
