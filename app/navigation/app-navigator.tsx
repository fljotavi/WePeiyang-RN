import { createStackNavigator } from "react-navigation"
import { HomeNavigator } from "./home-navigator"
import { connectedUserScreen as UserScreen } from "../screens/user-screen"
import { connectedGpaScreen as GpaScreen } from "../screens/gpa-screen"
import { connectedSettingsScreen as SettingsScreen } from "../screens/settings-screen"

export const AppNavigator = createStackNavigator(
  {
    home: HomeNavigator,
    user: UserScreen,
    gpa: GpaScreen,
    settings: SettingsScreen,
  }, {
    initialRouteName: 'home',
    headerMode: 'none',
  }
)
