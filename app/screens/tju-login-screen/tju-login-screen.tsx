import * as React from "react"
import { StatusBar, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"

export interface TjuLoginScreenProps extends NavigationScreenProps<{}> {
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical
  } as ViewStyle,
}

export class TjuLoginScreen extends React.Component<TjuLoginScreen, {}> {

  render () {
    return (
      <Screen preset="scroll">
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle='dark-content'
        />
        <View style={ss.container}>
          <Text tx="tjuScreen.header" preset="h2" />
        </View>
      </Screen>
    )
  }
}
