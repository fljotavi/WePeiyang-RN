import * as React from "react"
import { createBottomTabNavigator } from "react-navigation"
import HomeScreen from "../screens/home-screen"
import { NewsScreen } from "../screens/news-screen"
import { TjuLoginScreen } from "../screens/tju-login-screen"
import { Text } from "../components/text"
import { TextStyle, ViewStyle } from "react-native"
import { color, layoutParam } from "../theme"
import Touchable from 'react-native-platform-touchable'

const barStyle: ViewStyle = {
  height: layoutParam.footerHeight,
  elevation: 30,
  backgroundColor: color.card,
  overflow: "visible",
  alignItems: "center",
  borderTopWidth: 0
}
const textStyle: TextStyle = {
  color: color.primary,
  textAlign: "center"
}

export const RootNavigator = createBottomTabNavigator(
  {
    wpy: { screen: HomeScreen },
    news: { screen: NewsScreen },
    tju: { screen: TjuLoginScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      let genCustomTag = ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let i18nKey = "tab." + routeName
        return <Touchable onPress={() => navigation.navigate(routeName)} background={Touchable.Ripple(color.lightGrey, true)}>
          <Text tx={i18nKey} style={textStyle} preset="h5"/>
        </Touchable>
      }
      return {
        tabBarLabel: genCustomTag
      }
    },
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showIcon: false,
      labelStyle: textStyle,
      style: barStyle,
    },
  }
)
