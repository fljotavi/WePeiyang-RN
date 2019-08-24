/*
 * Gpa Stat
 * Created by Tzingtao Chow
 * ---
 *
 * 一个 Gpa Stat 会显示加权、绩点和学分三组统计数据的数字。
 * 传入的数据 scores 应该是一个同时具有这三个 keys 的 Object。
 *
 * Gpa Stat 通常会同显示 GPA 曲线的 Gpa Curve 一起使用。
 *
 */

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color } from "../../theme"
import Touchable from "react-native-platform-touchable"

export interface GpaStatProps {
  style?: ViewStyle
  setScoreType?: any
  scores?: any
  status
  txs?
  palette?
}

export class GpaStat extends React.Component<GpaStatProps, {}> {
  render() {
    let { style, setScoreType, scores, status, txs, palette } = this.props
    palette = palette || [color.lightGrey, color.primary]
    if (status !== "VALID") {
      return <View />
    }
    const textStyle = {
      color: palette[0],
      fontWeight: "bold",
      marginBottom: 4,
      fontSize: 10,
    } as TextStyle
    const numStyle = {
      color: palette[1],
      fontWeight: "bold",
    } as TextStyle
    const scoreFieldStyle = {
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
    } as ViewStyle
    const predefinedStyle: ViewStyle = {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    } as ViewStyle
    return (
      <View style={[predefinedStyle, style]}>
        <Touchable
          background={Touchable.Ripple(palette[0], true)}
          onPress={() => {
            setScoreType("weighted")
          }}
          delayPressIn={0}
        >
          <View style={scoreFieldStyle}>
            <Text tx={txs[0]} style={textStyle} />
            <Text text={scores.weighted} style={numStyle} preset="h3" />
          </View>
        </Touchable>
        <Touchable
          background={Touchable.Ripple(palette[0], true)}
          onPress={() => {
            setScoreType("gradePoints")
          }}
          delayPressIn={0}
        >
          <View style={scoreFieldStyle}>
            <Text tx={txs[1]} style={textStyle} />
            <Text text={scores.gradePoints} style={numStyle} preset="h3" />
          </View>
        </Touchable>
        <Touchable
          background={Touchable.Ripple(palette[0], true)}
          onPress={() => {
            setScoreType("credits")
          }}
          delayPressIn={0}
        >
          <View style={scoreFieldStyle}>
            <Text tx={txs[2]} style={textStyle} />
            <Text text={scores.credits} style={numStyle} preset="h3" />
          </View>
        </Touchable>
      </View>
    )
  }
}
