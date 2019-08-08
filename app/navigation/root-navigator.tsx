import { createSwitchNavigator } from "react-navigation"
import { connectedLoginScreen } from "../screens/login-screen"
import { AppNavigator } from "./app-navigator"
import { AuthLoadingScreen } from "../screens/auth-loading-screen"

export const RootNavigator = createSwitchNavigator(
  {
    app: AppNavigator,
    authLoading: AuthLoadingScreen,
    login: connectedLoginScreen,
  },
  {
    initialRouteName: "authLoading",
  },
)
