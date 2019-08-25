/*
 * Ecard Snack
 * Created by Tzingtao Chow
 * ---
 *
 * GPA Info 是 GPA 主页中点击右上角的信息按钮
 * 弹出的免责声明对话框。
 *
 */

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color } from "../../theme"

export interface GpaInfoProps {
  style?
}

export function GpaInfo(props: GpaInfoProps) {
  const textStyle: TextStyle = {
    color: color.module().gpa[0],
    fontSize: 14,
    marginVertical: 10,
  }
  const predefinedStyle: ViewStyle = {}

  return (
    <View style={[predefinedStyle, props.style]}>
      <Text tx="gpa.info.title" preset="h2" />
      <Text tx="gpa.info.content" style={textStyle} />
    </View>
  )
}
