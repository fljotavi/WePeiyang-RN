import { createSwitchNavigator } from "react-navigation"
import { connectedLoginScreen } from "../screens/login-screen"
import { AppNavigator } from "./app-navigator"
import { connectedAuthLoadingScreen } from "../screens/auth-loading-screen"

export const RootNavigator = createSwitchNavigator(
  {
    app: AppNavigator,
    authLoading: connectedAuthLoadingScreen,
    login: connectedLoginScreen,
  }, {
    initialRouteName: 'authLoading'
  }
)
