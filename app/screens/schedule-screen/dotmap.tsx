/*
 * Dotmap
 * Created by Tzingtao Chow
 * ---
 *
 * Dotmaps 是显示在 Schedule Screen 每周上方的课程安排点阵。
 * 它接受一个由 0，1 组成的二维数组作为参数，并在指定的宽高下，自动安排内部的 Dot spacing。
 * 每一个 Dotmap 代表一个点阵。
 *
 */

import * as React from "react"
import { View, ViewStyle } from "react-native"

export interface DotmapProps {
  dotColor?
  dotInactiveColor?
  matrix?
  dotSize?
  width?
  height?
  style?
}

export function Dotmap(props: DotmapProps) {
  let { dotColor, dotInactiveColor, matrix, dotSize, width, height, style } = props
  matrix = matrix || []

  const viewStyle: ViewStyle = {
    width: width,
    height: height,
    flexDirection: "row",
    justifyContent: "space-between",
  }

  const columnStyle: ViewStyle = {
    width: dotSize,
    height: height,
    justifyContent: "space-between",
  }

  const dotStyle = {
    width: dotSize,
    height: dotSize,
    borderRadius: 2,
  }

  const dotInactive: ViewStyle = {
    ...dotStyle,
    backgroundColor: dotInactiveColor,
  }

  const dotActive: ViewStyle = {
    ...dotStyle,
    backgroundColor: dotColor,
  }

  let columns = matrix.map((column, i) => (
    <View style={columnStyle} key={i}>
      {column.map((dot, j) => (
        <View style={dot === 0 ? dotInactive : dotActive} key={j} />
      ))}
    </View>
  ))

  return <View style={[viewStyle, style]}>{columns}</View>
}
