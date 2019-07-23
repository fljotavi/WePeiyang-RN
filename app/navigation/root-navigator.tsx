import { createStackNavigator } from "react-navigation"
import { HomeNavigator } from "./home-navigator"
import { LoginScreen } from "../screens/login-screen"
import { connectedUserScreen } from "../screens/user-screen"

export const RootNavigator = createStackNavigator(
  {
    home: HomeNavigator,
    login: LoginScreen, // TODO: Connected would work fine?
    user: connectedUserScreen
  }, {
    headerMode: 'none',
  }
)
