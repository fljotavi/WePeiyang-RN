import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Text } from "../text"
import { color } from "../../theme"
import Touchable from 'react-native-platform-touchable'

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
    <Touchable style={[predefinedStyle, style]} background={Touchable.Ripple(color.card)}>
      <Text tx={tx} style={textStyle} />
    </Touchable>
  )
}
