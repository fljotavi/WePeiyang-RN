import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color, ssGlobal } from "../../theme"
import Touchable from 'react-native-platform-touchable'

export interface TopBarProps {
  style?
  actions
}

export function TopBar(props: TopBarProps) {
  const { style, actions } = props

  const topBarIcon = {
    color: color.primary,
  } as ViewStyle

  return (
    <View style={[ssGlobal.topBar.container, style]}>
      <View style={ssGlobal.topBar.side}>
        <Touchable
          background={Touchable.Ripple(color.lightGrey, true)}
          onPress={actions[0]}
          delayPressIn={0}
        >
          <Text style={[ssGlobal.topBar.icon, topBarIcon]} text="arrow_back" preset="i"/>
        </Touchable>
      </View>
      <View style={ssGlobal.topBar.side}>

      </View>
    </View>
  )
}
