import { createStackNavigator } from "react-navigation"
import { HomeNavigator } from "./home-navigator"
import { connectedUserScreen as UserScreen } from "../screens/user-screen"
import { connectedGpaScreen as GpaScreen } from "../screens/gpa-screen"
import { connectedSettingsScreen as SettingsScreen } from "../screens/settings-screen"
import { connectedBindScreen as BindScreen } from "../screens/bind-screen"

export const AppNavigator = createStackNavigator(
  {
    home: HomeNavigator,
    user: UserScreen,
    gpa: GpaScreen,
    settings: SettingsScreen,
    bind: BindScreen
  }, {
    initialRouteName: 'home',
    headerMode: 'none',
  }
)
