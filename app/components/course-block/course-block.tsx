import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color } from "../../theme"

export interface CourseBlockProps {
  style?: ViewStyle
  courseName?: string
  timeSlot?: string
  location?: string
}

export function CourseBlock(props: CourseBlockProps) {
  const colorHash = (str: string) => {
    return (str.length) % (color.gpa.length)
  }
  const { style, courseName, timeSlot, location } = props
  const courseColor: number = colorHash(courseName)
  const predefinedStyle: ViewStyle = {
    width: 120,
    height: 170,
    backgroundColor: color.gpa[courseColor],
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 28
  }
  const BASE: TextStyle = {
    color: color.background,
  }
  const h1: TextStyle = { ...BASE, fontSize: 15, height: 75, fontWeight: "bold" }
  const small: TextStyle = { ...BASE, fontSize: 11, height: 20 }
  const p: TextStyle = { ...BASE, fontSize: 13, height: 30, fontWeight: "bold" }
  return (
    <View style={[predefinedStyle, style]}>
      <Text numberOfLines={3} text={courseName} style={h1}/>
      <Text text={timeSlot} style={small} />
      <Text text={location} style={p}/>
    </View>
  )
}
