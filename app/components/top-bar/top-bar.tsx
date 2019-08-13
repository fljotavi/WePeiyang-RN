/*
 * Top Bar (Bind Screen)
 * Created by Tzingtao Chow
 * ---
 *
 * Top Bar 定义具体 Screen 上方的图标工具栏。
 * 一般来说，Top Bar 包含操作图标和标题，并分别响应相应的页面功能，
 * 如返回、刷新、更多信息等。
 *
 */

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import Touchable from "react-native-platform-touchable"

export interface TopBarProps {
  color?
  elements?
  style?
}

export function TopBar(props: TopBarProps) {
  const { style, color, elements } = props

  const ss = {
    container: {
      paddingHorizontal: 10,
      paddingVertical: 16,
      alignSelf: "stretch",
      flexDirection: "row",
      justifyContent: "space-between",
    } as ViewStyle,
    side: {
      flexDirection: "row",
    } as ViewStyle,
    icon: {
      fontSize: 26,
      marginHorizontal: 9,
      color: color,
    } as TextStyle,
  }

  return (
    <View style={[ss.container, style]}>
      <View style={ss.side}>
        {elements.left.map(el => (
          <Touchable
            background={Touchable.Ripple(color, true)}
            onPress={el.action}
            delayPressIn={0}
          >
            <Text style={ss.icon} text={el.iconText} preset="i" />
          </Touchable>
        ))}
      </View>
      <View style={ss.side}>
        {elements.right.map(el => (
          <Touchable
            background={Touchable.Ripple(color, true)}
            onPress={el.action}
            delayPressIn={0}
          >
            <Text style={ss.icon} text={el.iconText} preset="i" />
          </Touchable>
        ))}
      </View>
    </View>
  )
}
