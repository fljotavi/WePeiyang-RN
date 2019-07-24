import { createStackNavigator } from "react-navigation"
import { HomeNavigator } from "./home-navigator"
import { connectedUserScreen } from "../screens/user-screen"

export const AppNavigator = createStackNavigator(
  {
    home: HomeNavigator,
    user: connectedUserScreen
  }, {
    initialRouteName: 'home',
    headerMode: 'none',
  }
)
