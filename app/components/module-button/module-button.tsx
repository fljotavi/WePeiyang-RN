/*
 * Module Button
 * Created by Tzingtao Chow
 * ---
 *
 * Module Buttons 是一种包含了图标的特殊按钮，它用于去向不同模块的导航。
 * 目前 Module Buttons 显示在主页顶端。
 *
 */

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam, shadowPresets } from "../../theme"
import Touchable from "react-native-platform-touchable"

export interface ModuleButtonProps {
  tx?: string
  icon?: string
  style?: ViewStyle
  onPress?: any
}

export function ModuleButton(props: ModuleButtonProps) {
  const { tx, icon, style, onPress } = props
  const textStyle: TextStyle = {
    color: color.lightGrey,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 3,
  }
  const predefinedStyle: ViewStyle = {
    backgroundColor: color.card,
    borderRadius: layoutParam.borderRadius,
  }
  const containerStyle: ViewStyle = {
    paddingVertical: 14,
    width: 99,
    borderRadius: layoutParam.borderRadius,
    alignItems: "center",
    justifyContent: "center",
  }
  const iconStyle = {
    fontSize: 25,
    color: color.lightGrey,
  }

  return (
    <Touchable
      style={[predefinedStyle, shadowPresets.float, style]}
      onPress={onPress}
      delayPressIn={0}
    >
      <View style={containerStyle} pointerEvents="box-only">
        <Text text={icon} preset="i" style={iconStyle} />
        <Text tx={tx} style={textStyle} />
      </View>
    </Touchable>
  )
}
