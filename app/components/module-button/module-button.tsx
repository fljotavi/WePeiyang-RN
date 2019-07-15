import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color } from "../../theme"

export interface ModuleButtonProps {
  tx?: string,
  icon?: string,
  style?: ViewStyle
}

export function ModuleButton(props: ModuleButtonProps) {
  const { tx, icon, style } = props
  const textStyle: TextStyle = {
    color: color.primaryLighter,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 3
  }
  const predefinedStyle: ViewStyle = {
    width: 105,
    height: 80,
    backgroundColor: color.card,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
  const iconStyle = {
    fontSize: 28,
    color: color.lightGrey,
  }

  return (
    <View style={[predefinedStyle, style]}>
      <Text text={icon} preset="i" style={iconStyle} />
      <Text tx={tx} style={textStyle} />
    </View>
  )
}
