import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"

export interface CourseBlockInnerProps {
  style?: ViewStyle
  courseName?: string
  p1?: string
  p2?: string
  credits?
  backgroundColor?
}

export function CourseBlockInner(props: CourseBlockInnerProps) {
  const { style, courseName, p1, p2, backgroundColor } = props
  const predefinedStyle: ViewStyle = {
    backgroundColor: backgroundColor,
    borderRadius: layoutParam.borderRadius / 1.5,
    paddingHorizontal: 7,
    justifyContent: "center",
  }
  const BASE: TextStyle = {
    color: color.background,
  }
  const h1: TextStyle = { ...BASE, fontSize: 10, fontWeight: "bold", marginBottom: 2 }
  const small: TextStyle = { ...BASE, fontSize: 8, marginBottom: 1 }
  let info: ViewStyle = {
    flexDirection: "column",
  }

  if (style.width > 100) {
    info = {
      flexDirection: "row",
      justifyContent: "space-between",
    }
  }

  let displayName = courseName
  if (courseName.length > 15) {
    displayName = courseName.substr(0, 14) + "…"
  }

  return (
    <View style={[predefinedStyle, style]} pointerEvents="box-only">
      <Text text={displayName} style={h1} />
      <View style={info}>
        <Text text={p1} style={small} />
        <Text text={p2} style={small} />
      </View>
    </View>
  )
}
