import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color } from "../../theme"

export interface IanButtonProps {
  tx?: string,
  style?: ViewStyle
}

export function IanButton(props: IanButtonProps) {
  const { tx, style } = props
  const textStyle: TextStyle = {
    color: color.lightGrey,
    fontSize: 17,
    fontWeight: "bold",
  }
  const predefinedStyle: ViewStyle = {
    height: 76,
    backgroundColor: color.washed,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }

  return (
    <View style={[predefinedStyle, style]}>
      <Text tx={tx} style={textStyle} />
    </View>
  )
}
