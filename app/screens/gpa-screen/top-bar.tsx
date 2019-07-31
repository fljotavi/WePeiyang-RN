import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color, ssGlobal } from "../../theme"
import Toast from "react-native-root-toast"
import toastOptions from "../../theme/toast"
import Touchable from 'react-native-platform-touchable'

export interface TopBarProps {
  style?
  actions
}

export function TopBar(props: TopBarProps) {
  const { style, actions } = props

  const topBarIcon = {
    color: color.background,
  } as ViewStyle

  return (
    <View style={[ssGlobal.topBar.container, style]}>
      <View style={ssGlobal.topBar.side}>
        <Touchable
          background={Touchable.Ripple(color.lightGrey, true)}
          onPress={actions[0]}
        >
          <Text style={[ssGlobal.topBar.icon, topBarIcon]} text="arrow_back" preset="i"/>
        </Touchable>
      </View>
      <View style={ssGlobal.topBar.side}>
        <Touchable
          background={Touchable.Ripple(color.lightGrey, true)}
          onPress={() => Toast.show(<Text text="Secondary classes currently unusable" style={{ color: toastOptions.primary.textColor }}/> as any, toastOptions.primary)}
        >
          <Text style={[ssGlobal.topBar.icon, topBarIcon]} text="visibility_off" preset="i"/>
        </Touchable>
        <Touchable
          background={Touchable.Ripple(color.lightGrey, true)}
          onPress={actions[1]}
        >
          <Text style={[ssGlobal.topBar.icon, topBarIcon]} text="sync" preset="i"/>
        </Touchable>
      </View>
    </View>
  )
}
