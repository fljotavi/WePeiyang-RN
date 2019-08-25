/*
 * Unit Snack
 * Created by Tzingtao Chow
 * ---
 *
 * Unit Snack 是黄页的 Department Screen 中
 * 所显示的单个办公室（Unit）的办公室名称和电话号码条。
 *
 */

import { TextStyle, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { Text } from "../../components/text"
import * as React from "react"
import Touchable from "react-native-platform-touchable"

export interface UnitSnackProps {
  unit?
  phone?
  style?
  onPress?
}

export function UnitSnack(props: UnitSnackProps) {
  const { unit, phone, style, onPress } = props
  const ss = {
    snackContainer: {
      paddingVertical: 14,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    } as ViewStyle,
    left: {
      flex: 1,
    } as ViewStyle,
    touchable: {} as ViewStyle,
    title: {
      color: color.module().yellowPages[0],
      fontSize: 12,
      marginBottom: -5,
    } as TextStyle,
    subtitle: {
      color: color.module().yellowPages[0],
      fontSize: 30,
      letterSpacing: -1,
      fontWeight: "bold",
      marginBottom: 2,
    } as TextStyle,
    call: {
      color: color.module().yellowPages[0],
      fontSize: 26,
      textAlign: "right",
    } as ViewStyle,
  }
  return (
    <View style={[ss.snackContainer, style]}>
      <View style={ss.left}>
        <Text selectable={true} text={unit} style={ss.title} />
        <Text selectable={true} style={ss.subtitle} text={phone} />
      </View>
      <Touchable
        style={ss.touchable}
        onPress={onPress}
        delayPressIn={0}
        background={Touchable.Ripple(color.module().yellowPages[0], true)}
      >
        <Text text="phone_forwarded" style={ss.call} preset="i" />
      </Touchable>
    </View>
  )
}
