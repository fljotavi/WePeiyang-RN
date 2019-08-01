import * as React from "react"
import {StatusBar, View, ViewStyle} from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"

export interface NewsScreenProps extends NavigationScreenProps<{}> {
}

const ss = {
  screen: {
    paddingTop: layoutParam.statusBarHeight
  } as ViewStyle,
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical
  } as ViewStyle,
}

export class NewsScreen extends React.Component<NewsScreenProps, {}> {
  render () {
    return (
      <Screen preset="scroll">
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle='dark-content'
        />
        <View style={ss.container}>
          <Text tx="newsScreen.header" preset="h2" />
        </View>
      </Screen>
    )
  }
}
