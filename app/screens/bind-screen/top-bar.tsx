/*
 * Top Bar (Bind Screen)
 * Created by Tzingtao Chow
 * ---
 *
 * Top Bar 定义具体 Screen 上方的图标工具栏。
 * 一般来说，Top Bar 包含左右一侧或两侧的图标，并分别响应相应的页面功能，
 * 如返回、刷新、更多信息等。
 *
 * Top Bar 的样式是单独被提出并全局定义在 ssGlobal 之中的。
 * 但是 Top Bar 本身并不被单独抽象出组件，
 * 而是分别 Declare 在各自的 Screen 之中。
 *
 */

import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color, ssGlobal } from "../../theme"
import Touchable from "react-native-platform-touchable"

export interface TopBarProps {
  style?
  actions
}

export function TopBar(props: TopBarProps) {
  const { style, actions } = props

  const topBarIcon = {
    color: color.primary,
  } as ViewStyle

  return (
    <View style={[ssGlobal.topBar.container, style]}>
      <View style={ssGlobal.topBar.side}>
        <Touchable
          background={Touchable.Ripple(color.lightGrey, true)}
          onPress={actions[0]}
          delayPressIn={0}
        >
          <Text style={[ssGlobal.topBar.icon, topBarIcon]} text="arrow_back" preset="i" />
        </Touchable>
      </View>
      <View style={ssGlobal.topBar.side} />
    </View>
  )
}
