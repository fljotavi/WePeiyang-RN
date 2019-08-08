import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"

export interface ToastiProps {
  tx?: string
  text?: string
  preset?
  backgroundColor?
  textColor?
}

export function Toasti(props: ToastiProps) {
  const { tx, text, preset, backgroundColor, textColor } = props
  let v, t
  v = {
    borderRadius: layoutParam.borderRadius / 2,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
  } as ViewStyle

  t = {
    fontSize: 15,
  } as TextStyle

  switch (preset) {
    case undefined:
      break
    case "ecard":
      v.backgroundColor = color.module.ecard[1]
      t.color = color.module.ecard[0]
      break
    case "error":
      v.backgroundColor = color.error
      t.color = color.white(1)
      break
  }

  if (backgroundColor) {
    v.backgroundColor = backgroundColor
  }

  if (textColor) {
    t.color = textColor
  }

  return (
    <View style={v}>
      <Text tx={tx} text={text} style={t} />
    </View>
  )
}
