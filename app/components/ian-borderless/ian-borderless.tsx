/*
 * Borderless Ian
 * Created by Tzingtao Chow
 * ---
 *
 * Borderless Iana 是用于填充空 List 的提示性组件。
 * 如主页的「你还没有借阅书籍」，Schedule Screen 的「今天无课」等。
 * 样式上，它表现为一个大图标和一行字。
 *
 */

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"

export interface IanBorderlessProps {
  icon?
  tx?: string
  text?: string
  txOptions?
  style?: ViewStyle
  color?
}

export function IanBorderless(props: IanBorderlessProps) {
  const { icon, tx, text, txOptions, style, color } = props

  const ss = {
    c: {
      alignItems: "center",
      margin: 30,
    } as ViewStyle,
    i: {
      color: color,
      fontSize: 130,
      marginBottom: 20,
    } as TextStyle,
    t: {
      color: color,
    } as TextStyle,
  }

  return (
    <View style={[ss.c, style]}>
      <Text style={ss.i} text={icon} preset="i" />
      <Text style={ss.t}>
        <Text tx={tx} text={text} txOptions={txOptions} />
      </Text>
    </View>
  )
}
