/*
 * Binding Bar
 * Created by Tzingtao Chow
 * ---
 *
 * Binding Bar 用于显示 User Screen 中一个模块的绑定状态条。
 *
 */

import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color, layoutParam, shadowPresets } from "../../theme"
import Touchable from "react-native-platform-touchable"

export interface BindingBarProps {
  txTitle?
  txSubtitle?
  icon?
  arrowVisible?
  style?
  onPress?
}

export function BindingBar(props: BindingBarProps) {
  const { txTitle, txSubtitle, icon, onPress, arrowVisible = true, style } = props
  const ss = {
    bindingBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    } as ViewStyle,
    bindingBarContainer: {
      borderRadius: layoutParam.borderRadius,
      backgroundColor: color.card,
      paddingLeft: 20,
      paddingRight: 10,
      paddingVertical: 16,
      width: "100%",
      maxWidth: 500,
    } as ViewStyle,
    left: {
      flexDirection: "row",
      alignItems: "center",
    } as ViewStyle,
    title: {
      color: color.primary,
    },
    icon: {
      color: color.lightGrey,
      fontSize: 25,
    },
    backArrow: {
      color: color.lightGrey,
      fontSize: 30,
      opacity: arrowVisible ? 1 : 0,
    },
    text: {
      marginLeft: 10,
    },
    subtitle: {
      color: color.lightGrey,
      fontSize: 10,
    },
  }
  return (
    <Touchable
      style={[ss.bindingBarContainer, shadowPresets.close, style]}
      onPress={onPress}
      delayPressIn={0}
    >
      <View style={ss.bindingBar} pointerEvents="box-only">
        <View style={ss.left}>
          <Text text={icon} style={ss.icon} preset="i" />
          <View style={ss.text}>
            <Text tx={txTitle} style={ss.title} />
            <Text tx={txSubtitle} preset="small" style={ss.subtitle} />
          </View>
        </View>
        <Text text="navigate_next" style={ss.backArrow} preset="i" />
      </View>
    </Touchable>
  )
}
