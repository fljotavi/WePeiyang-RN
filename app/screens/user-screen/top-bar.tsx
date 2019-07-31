import * as React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color, ssGlobal } from "../../theme"

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
        <TouchableOpacity
          onPress={actions[0]}
        >
          <Text style={[ssGlobal.topBar.icon, topBarIcon]} text="arrow_back" preset="i"/>
        </TouchableOpacity>
      </View>
      <View style={ssGlobal.topBar.side}>
        <TouchableOpacity
          onPress={actions[1]}
        >
          <Text style={[ssGlobal.topBar.icon, topBarIcon]} text="settings" preset="i"/>
        </TouchableOpacity>
      </View>
    </View>
  )
}
