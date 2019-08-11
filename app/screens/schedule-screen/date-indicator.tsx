/*
 * Date Indicators are the date tags above each daily schedule columns in Schedule Screen.
 * */

import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color, layoutParam } from "../../theme"

export interface DateIndicatorProps {
  height?: number
  marginBottom?: number
  active?
  text?
  style?: ViewStyle
}

export function DateIndicator(props: DateIndicatorProps) {
  const { height, marginBottom, active, text, style } = props

  return (
    <View
      style={[
        {
          height: height,
          marginBottom: marginBottom,
          backgroundColor: active ? color.washed : color.washed,
          borderRadius: layoutParam.borderRadius / 1.5,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <Text
        text={active ? "● " + text : text}
        style={{
          color: active ? color.lightGrey : color.lightGrey,
          fontWeight: "bold",
          fontSize: 10,
        }}
      />
    </View>
  )
}
