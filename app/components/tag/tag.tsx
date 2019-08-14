/*
 * Tag
 * Created by Tzingtao Chow
 * ---
 *
 * Tags 用于绘制带小字号文字与图标的标签。
 *
 */

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"

export interface TagProps {
  tx?: string
  text?: string
  style?: ViewStyle
  palette?
  iconText?
}

export function Tag(props: TagProps) {
  const { tx, text, style, palette, iconText } = props
  let colors = palette || [color.washed, color.lightGrey]

  const tag = {
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 5,
    marginRight: 8,
    backgroundColor: colors[0],
    alignSelf: "flex-start",
    borderRadius: layoutParam.borderRadius / 2.4,
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle

  const textStyle: TextStyle = {
    color: colors[1],
    fontWeight: "bold",
    textTransform: "uppercase",
  }

  const iconStyle: TextStyle = {
    color: colors[1],
  }

  return (
    <View style={[tag, style]}>
      <Text text={iconText} preset="i" style={iconStyle} />
      <Text text=" " preset="small" style={textStyle} />
      <Text tx={tx} text={text} preset="small" style={textStyle} />
    </View>
  )
}
