import { createStackNavigator } from "react-navigation"
import { HomeNavigator } from "./home-navigator"
import { connectedUserScreen } from "../screens/user-screen"
import { connectedGpaScreen } from "../screens/gpa-screen"

export const AppNavigator = createStackNavigator(
  {
    home: HomeNavigator,
    user: connectedUserScreen,
    gpa: connectedGpaScreen,
  }, {
    initialRouteName: 'home',
    headerMode: 'none',
  }
)
