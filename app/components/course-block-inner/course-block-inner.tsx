/*
 * Course Block Inner
 * Created by Tzingtao Chow
 * ---
 *
 * Course Blocks Inners 是显示在 Schedule Screen 上的课程块。
 * 与显示在主页上的课程块不同，显示在 Schedule Screen 上的课程块是多样、复杂、大小可变的。
 * 此组件会自动根据它所获得的宽高来决定内部文字的尺寸、截取的字数和具体布局方式。
 *
 * 它比 Home Screen 中的 Course Blocks 更智能一点。
 *
 */

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"
import { connect } from "react-redux"

export interface CourseBlockInnerProps {
  style?: ViewStyle
  courseName?: string
  p1?: string
  p2?: string
  credits?
  backgroundColor?
  pref?
}

export function _CourseBlockInner(props: CourseBlockInnerProps) {
  const { style, courseName, p1, p2, backgroundColor, pref } = props
  const height = Number(style.height)
  const width = Number(style.width)
  const scale = Math.min(height, width) / 12 + 5.8
  const textScale = (scale * pref.scheduleTextSize) / 100
  const predefinedStyle: ViewStyle = {
    backgroundColor: backgroundColor,
    borderRadius: layoutParam.borderRadius / 1.5,
    paddingHorizontal: scale - 3,
    justifyContent: "center",
  }
  const BASE: TextStyle = {
    color: color.background,
  }
  const h1: TextStyle = {
    ...BASE,
    fontSize: textScale,
    fontWeight: "bold",
    marginBottom: textScale * 0.3,
  }
  const small: TextStyle = { ...BASE, fontSize: textScale * 0.8, marginBottom: textScale * 0.2 }
  let info: ViewStyle = {
    flexDirection: "column",
  }

  if (style.width > 90) {
    info = {
      flexDirection: "row",
      justifyContent: "space-between",
    }
  }

  return (
    <View style={[predefinedStyle, style]} pointerEvents="box-only">
      <Text numberOfLines={height > 62 ? 3 : 2} text={courseName} style={h1} />
      <View style={info}>
        <Text text={p1} style={small} />
        <Text text={p2} style={small} />
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  return {
    pref: state.preferenceReducer,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const CourseBlockInner = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_CourseBlockInner)
