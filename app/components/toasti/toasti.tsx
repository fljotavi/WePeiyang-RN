/*
 * Toasti
 * Created by Tzingtao Chow
 * ---
 *
 * Toasti 用于在屏幕下方显示一条简短的文字通知，持续几秒后自动消失。
 * 由于本组件所基于的 EasyToast 已经在根组件注册在 DeviceEventEmitter 中，
 * 故可以在任何组件中通过类似 `DeviceEventEmitter.emit("showToast", <Toasti text="Your message..." />)` 的方式调用。
 *
 * 不指定 preset 属性，则为默认样式（primary）。
 *
 */

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
    backgroundColor: color.primary,
    borderRadius: layoutParam.borderRadius / 2,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
  } as ViewStyle

  t = {
    color: color.background,
    fontSize: 15,
  } as TextStyle

  switch (preset) {
    case undefined:
      break
    case "gpa":
      v.backgroundColor = color.module.gpa[1]
      t.color = color.module.gpa[0]
      break
    case "ecard":
      v.backgroundColor = color.module.ecard[1]
      t.color = color.module.ecard[0]
      break
    case "error":
      v.backgroundColor = color.error
      t.color = color.white(1)
      break
    case "warning":
      v.backgroundColor = color.warning
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
