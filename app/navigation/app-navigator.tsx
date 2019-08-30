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
import { YellowPagesScreen } from "../screens/yellow-pages-screen"
import { ScheduleScreen } from "../screens/schedule-screen"
import { LibraryScreen } from "../screens/library-screen"
import { UserScreen } from "../screens/user-screen"
import { GpaScreen } from "../screens/gpa-screen"
import { EcardScreen } from "../screens/ecard-screen"
import { DepartmentScreen } from "../screens/yellow-pages-screen/department-screen"
import { TjuBindScreen } from "../screens/bind-screen/tju-bind-screen"
import { LibBindScreen } from "../screens/bind-screen/lib-bind-screen"
import { EcardBindScreen } from "../screens/bind-screen/ecard-bind-screen"

export const AppNavigator = createStackNavigator(
  {
    home: HomeNavigator,
    user: UserScreen,

    gpa: GpaScreen,
    schedule: ScheduleScreen,
    library: LibraryScreen,
    ecard: EcardScreen,

    ecardBind: EcardBindScreen,
    tjuBind: TjuBindScreen,
    libBind: LibBindScreen,

    yellowPages: YellowPagesScreen,
    department: DepartmentScreen,

    settings: SettingsNavigator,
  },
  {
    initialRouteName: "home",
    headerMode: "none",
  },
)
