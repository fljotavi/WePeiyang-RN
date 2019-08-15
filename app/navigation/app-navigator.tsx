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
import { TjuBindScreen } from "../screens/bind-screen/tju-bind-screen"
import { LibBindScreen } from "../screens/bind-screen/lib-bind-screen"

export const AppNavigator = createStackNavigator(
  {
    home: HomeNavigator,
    user: connectedUserScreen,

    gpa: connectedGpaScreen,
    schedule: connectedScheduleScreen,
    library: connectedLibraryScreen,
    ecard: connectedEcardScreen,

    bind: connectedBindScreen,
    tjuBind: TjuBindScreen,
    libBind: LibBindScreen,

    yellowPages: connectedYellowPagesScreen,
    department: connectedDepartmentScreen,

    settings: SettingsNavigator,
  },
  {
    initialRouteName: "home",
    headerMode: "none",
  },
)
