import { createStackNavigator } from "react-navigation"
import { HomeNavigator } from "./home-navigator"
import { connectedUserScreen as UserScreen } from "../screens/user-screen"
import { connectedGpaScreen as GpaScreen } from "../screens/gpa-screen"
import { connectedSettingsScreen as SettingsScreen } from "../screens/settings-screen"
import { connectedBindScreen as BindScreen } from "../screens/bind-screen"
import { connectedLibraryScreen as LibraryScreen } from "../screens/library-screen"
import { connectedEcardScreen as EcardScreen } from "../screens/ecard-screen"

export const AppNavigator = createStackNavigator(
  {
    home: HomeNavigator,
    user: UserScreen,
    gpa: GpaScreen,
    settings: SettingsScreen,
    bind: BindScreen,
    library: LibraryScreen,
    ecard: EcardScreen,
  },
  {
    initialRouteName: "home",
    headerMode: "none",
  },
)
