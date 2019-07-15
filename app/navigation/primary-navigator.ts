import { createStackNavigator } from "react-navigation"
import { DemoScreen } from "../screens/demo-screen"
import { HomeScreen } from "../screens/home-screen"

export const PrimaryNavigator = createStackNavigator(
  {
    home: { screen: HomeScreen },
    demo: { screen: DemoScreen },
  },
  {
    headerMode: "none",
    initialRouteName: "home"
  },
)
