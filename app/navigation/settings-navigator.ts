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
import { SettingsScreen } from "../screens/settings-screen"
import { LanguageSettingsScreen } from "../screens/settings-screen/language-settings-screen"
import { DaysEachWeekSettingsScreen } from "../screens/settings-screen/days-each-week-settings-screen"
import { ScheduleTextSizeSettingsScreen } from "../screens/settings-screen/schedule-text-size-settings"
import { PaletteSettingsScreen } from "../screens/settings-screen/palette-settings-screen"

export const SettingsNavigator = createStackNavigator(
  {
    settings: SettingsScreen,
    language: LanguageSettingsScreen,
    daysEachWeek: DaysEachWeekSettingsScreen,
    scheduleTextSize: ScheduleTextSizeSettingsScreen,
    palette: PaletteSettingsScreen,
  },
  {
    initialRouteName: "settings",
    headerMode: "none",
  },
)
