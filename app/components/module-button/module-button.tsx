import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"
import Touchable from "react-native-platform-touchable"

export interface ModuleButtonProps {
  tx?: string
  icon?: string
  style?: ViewStyle
  onPress?: any
}

export function ModuleButton(props: ModuleButtonProps) {
  const { tx, icon, style, onPress } = props
  const textStyle: TextStyle = {
    color: color.lightGrey,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 3,
  }
  const predefinedStyle: ViewStyle = {
    backgroundColor: color.card,
    borderRadius: layoutParam.borderRadius,
  }
  const containerStyle: ViewStyle = {
    paddingVertical: 14,
    width: 99,
    borderRadius: layoutParam.borderRadius,
    alignItems: "center",
    justifyContent: "center",
  }
  const iconStyle = {
    fontSize: 25,
    color: color.lightGrey,
  }

  return (
    <Touchable style={[predefinedStyle, style]} onPress={onPress} delayPressIn={0}>
      <View style={containerStyle} pointerEvents="box-only">
        <Text text={icon} preset="i" style={iconStyle} />
        <Text tx={tx} style={textStyle} />
      </View>
    </Touchable>
  )
}
