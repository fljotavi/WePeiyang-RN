/*
* Iana (Plural form for Ian) are components for empty blocks.
* */

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"

export interface IanProps {
  tx?: string,
  text?: string,
  style?: ViewStyle
}

export function Ian(props: IanProps) {
  const { tx, text, style } = props

  const ianView: ViewStyle = {
    backgroundColor: color.washed,
    borderRadius: layoutParam.borderRadius,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  }

  const ianText: TextStyle = {
    color: color.lightGrey,
    fontWeight: "bold",
    textTransform: "uppercase",
  }

  return (
    <View style={[ianView, style]}>
      <Text tx={tx} text={text} style={ianText} />
    </View>
  )
}
