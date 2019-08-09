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
  matrix = matrix || [[1, 0, 1, 0], [0, 0, 0, 1], [1, 1, 0, 0], [1, 0, 0, 0]]

  const viewStyle: ViewStyle = {
    width: width,
    height: height,
    justifyContent: "space-between",
  }

  const rowStyle: ViewStyle = {
    width: width,
    height: dotSize,
    flexDirection: "row",
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

  let rows = matrix.map((row, i) => (
    <View style={rowStyle} key={i}>
      {row.map((dot, j) => (
        <View style={dot === 0 ? dotInactive : dotActive} key={j} />
      ))}
    </View>
  ))

  return <View style={[viewStyle, style]}>{rows}</View>
}
