import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"

export interface CourseBlockProps {
  style?: ViewStyle
  courseName?: string
  timeSlot?: string
  location?: string
  credits?
  backgroundColor?
}

export function CourseBlock(props: CourseBlockProps) {
  const { style, courseName, timeSlot, location, backgroundColor } = props
  const predefinedStyle: ViewStyle = {
    width: 110,
    height: 158,
    backgroundColor: backgroundColor,
    borderRadius: layoutParam.borderRadius,
    paddingHorizontal: 12,
    paddingVertical: 25
  }
  const BASE: TextStyle = {
    color: color.background,
  }
  const h1: TextStyle = { ...BASE, fontSize: 14.2, height: 72, fontWeight: "bold" }
  const small: TextStyle = { ...BASE, fontSize: 10, height: 18 }
  const p: TextStyle = { ...BASE, fontSize: 12, height: 26, fontWeight: "bold" }
  return (
    <View style={[predefinedStyle, style]} pointerEvents="box-only">
      <Text numberOfLines={3} text={courseName} style={h1}/>
      <Text text={timeSlot} style={small} />
      <Text text={location} style={p}/>
    </View>
  )
}
