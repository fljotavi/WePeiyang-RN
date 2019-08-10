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
