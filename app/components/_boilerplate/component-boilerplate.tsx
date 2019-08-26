/*
 * Component Boilerplate
 * Created by Tzingtao Chow
 * ---
 *
 * Component Boilerplate 是用于生成最简单的新组件时可参考的模版。
 *
 */

import * as React from "react"
import { View, ViewStyle } from "react-native"

export interface ComponentBoilerplateProps {
  style?: ViewStyle
}

export function ComponentBoilerplate(props: ComponentBoilerplateProps) {
  const { style } = props
  const viewStyle: ViewStyle = {}
  return <View style={[viewStyle, style]} />
}
