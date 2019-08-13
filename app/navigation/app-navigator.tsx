/*
 * App Navigator
 * Created by Tzingtao Chow
 * ---
 *
 * App 导航器。
 * 使用它在应用内不同的页面和模块之间跳转。
 *
 */

import { createStackNavigator } from "react-navigation"
import { HomeNavigator } from "./home-navigator"
import { connectedUserScreen as UserScreen } from "../screens/user-screen"
import { connectedGpaScreen as GpaScreen } from "../screens/gpa-screen"
import { connectedBindScreen as BindScreen } from "../screens/bind-screen"
import { connectedLibraryScreen as LibraryScreen } from "../screens/library-screen"
import { connectedEcardScreen as EcardScreen } from "../screens/ecard-screen"
import { connectedScheduleScreen as ScheduleScreen } from "../screens/schedule-screen"
import { SettingsNavigator } from "./settings-navigator"

export const AppNavigator = createStackNavigator(
  {
    home: HomeNavigator,
    user: UserScreen,

    gpa: GpaScreen,
    schedule: ScheduleScreen,
    bind: BindScreen,
    library: LibraryScreen,
    ecard: EcardScreen,

    settings: SettingsNavigator,
  },
  {
    initialRouteName: "home",
    headerMode: "none",
  },
)
