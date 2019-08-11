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
  const height = Number(style.height)
  const width = Number(style.width)
  const scale = Math.min(height, width) / 12 + 5.8
  const predefinedStyle: ViewStyle = {
    backgroundColor: backgroundColor,
    borderRadius: layoutParam.borderRadius / 1.5,
    paddingHorizontal: scale - 3,
    justifyContent: "center",
  }
  const BASE: TextStyle = {
    color: color.background,
  }
  const h1: TextStyle = { ...BASE, fontSize: scale, fontWeight: "bold", marginBottom: scale * 0.3 }
  const small: TextStyle = { ...BASE, fontSize: scale * 0.8, marginBottom: scale * 0.2 }
  let info: ViewStyle = {
    flexDirection: "column",
  }

  if (style.width > 90) {
    info = {
      flexDirection: "row",
      justifyContent: "space-between",
    }
  }

  let displayName = courseName
  // if (courseName.length > 15) {
  //   displayName = courseName.substr(0, 14) + "…"
  // }

  return (
    <View style={[predefinedStyle, style]} pointerEvents="box-only">
      <Text numberOfLines={height > 62 ? 3 : 2} text={displayName} style={h1} />
      <View style={info}>
        <Text text={p1} style={small} />
        <Text text={p2} style={small} />
      </View>
    </View>
  )
}
