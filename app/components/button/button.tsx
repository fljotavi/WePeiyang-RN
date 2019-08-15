/*
 * Button
 * Created by Ignite
 * Edited by Tzingtao Chow
 * ---
 *
 * Button 是微北洋内通用的按钮组件，用于简单的可点击元素。
 * Button 可以传入文字、i18n 翻译定位或传入子组件，并支持预设样式。
 *
 */

import * as React from "react"
import { Text } from "../text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { mergeAll, flatten } from "ramda"
import Touchable from "react-native-platform-touchable"
import { TextStyle, View, ViewStyle } from "react-native"
import {color} from "../../theme";

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    palette,
    ...rest
  } = props

  let viewStyle = mergeAll(
    flatten([viewPresets[preset] || viewPresets.primary, styleOverride]),
  ) as ViewStyle
  let textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  ) as TextStyle

  if (palette) {
    viewStyle.backgroundColor = palette[1] || color.transparent
    textStyle.color = palette[0]
  }

  const content = children || <Text tx={tx} text={text} style={textStyle} />

  return (
    <Touchable style={viewStyle} {...rest} delayPressIn={0}>
      <View pointerEvents="box-only">{content}</View>
    </Touchable>
  )
}
