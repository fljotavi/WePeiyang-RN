import { createStackNavigator } from "react-navigation"
import { HomeNavigator } from "./home-navigator"
import { LoginScreen } from "../screens/login-screen"

export const RootNavigator = createStackNavigator(
  {
    home: HomeNavigator,
    login: LoginScreen,
  }, {
    headerMode: 'none',
  }
)
