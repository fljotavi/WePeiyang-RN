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
import { SettingsNavigator } from "./settings-navigator"
import { connectedYellowPagesScreen } from "../screens/yellow-pages-screen"
import { connectedScheduleScreen } from "../screens/schedule-screen"
import { connectedLibraryScreen } from "../screens/library-screen"
import { connectedUserScreen } from "../screens/user-screen"
import { connectedGpaScreen } from "../screens/gpa-screen"
import { connectedBindScreen } from "../screens/bind-screen"
import { connectedEcardScreen } from "../screens/ecard-screen"
import { connectedDepartmentScreen } from "../screens/yellow-pages-screen/department-screen"

export const AppNavigator = createStackNavigator(
  {
    home: HomeNavigator,
    user: connectedUserScreen,

    gpa: connectedGpaScreen,
    schedule: connectedScheduleScreen,
    bind: connectedBindScreen,
    library: connectedLibraryScreen,
    ecard: connectedEcardScreen,

    yellowPages: connectedYellowPagesScreen,
    department: connectedDepartmentScreen,

    settings: SettingsNavigator,
  },
  {
    initialRouteName: "home",
    headerMode: "none",
  },
)
