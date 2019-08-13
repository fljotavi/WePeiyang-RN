/*
 * Gpa Curve
 * Created by Tzingtao Chow
 * ---
 *
 * 一个 Gpa Curve 会展示一条 GPA 曲线（包含曲线上的 Tooltips）。
 * 它通过上级指定的数据进行绘制，但指定的数据不应该是具体的分数，
 * 而是包含了所有学期成绩信息的标准数据体（详见 Data reducers 中的 GPA 部分数据体）。
 * 这是为了避免组件复用时冗余的数据提取过程，
 * 同时保持它为 Presentational component。
 *
 * Gpa Curve 通常会同显示三组统计数字的 Gpa Stat 一起使用。
 *
 */

import * as React from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { VictoryLine, VictoryGroup, VictoryScatter } from "victory-native"
import { color, typography } from "../../theme"
import Svg, { G, Rect, Text as Svgtext } from "react-native-svg"
import { setSemesterIndex } from "../../actions/preference-actions"
import { connect } from "react-redux"

export interface GpaTooltipProps {
  x?: number
  y?: number
  score?: number
  scoreToFixed?: number
  palette?
}

export function GpaTooltip(props: GpaTooltipProps) {
  {
    const { x, y, score, scoreToFixed, palette } = props
    let w = 64
    let h = 28
    return (
      <G x={x - w / 2} y={y - h - 17}>
        <Rect width={w} height={h} rx="5" fill={palette[0]} />
        <Svgtext
          x={w / 2}
          y={20}
          fontSize={15}
          fill={palette[1]}
          textAnchor="middle"
          fontFamily={typography.primaryBold}
          fontWeight="bold"
        >
          {score.toFixed(scoreToFixed || 2)}
        </Svgtext>
      </G>
    )
  }
}

export interface GpaCurveProps {
  style?: ViewStyle
  data?: any[]
  status: string
  scoreToFixed?: number
  semesterIndex?
  setSemesterIndex?
  animated?: boolean
  palette?
}

export class GpaCurve extends React.Component<GpaCurveProps, {}> {
  render() {
    let { style, data, status, semesterIndex, scoreToFixed, animated, palette } = this.props
    palette = palette || [
      color.card,
      color.primary,
      color.washed,
      color.lightGrey,
      color.background,
    ]

    if (!(status === "VALID" && data.length > 0)) {
      return <View />
    }

    const textStyle = {}
    const predefinedStyle: ViewStyle = {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }

    let selected = semesterIndex
    let gpaArray = data.map(dict => dict.y)
    let lowest = Math.min(...gpaArray)
    let highest = Math.max(...gpaArray)
    let domainPadding = (highest - lowest) / 4
    let passedData = [
      { x: 0, y: data[0].y },
      ...data,
      { x: data.length + 1, y: data[data.length - 1].y },
    ]
    let chartWidth = Dimensions.get("window").width
    let chartHeight = 100
    return (
      <View style={[predefinedStyle, style]}>
        <Text style={textStyle} />
        <Svg height={chartHeight} width={chartWidth}>
          <VictoryGroup
            standalone={false}
            animate={animated ? { duration: 500 } : false}
            height={chartHeight}
            width={chartWidth}
            padding={0}
            color={palette[2]}
          >
            <VictoryLine
              data={passedData}
              interpolation="cardinal"
              style={{ data: { stroke: palette[2], strokeWidth: 3.3 } }}
              domain={{ y: [lowest - domainPadding, highest + domainPadding * 5] }}
            />
            <VictoryScatter
              data={data}
              color={palette[3]}
              size={6.6}
              style={{ data: { stroke: "rgba(0,0,0,0)", strokeWidth: 24 } }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPress: (a, i) => {
                      this.props.setSemesterIndex(i.index)
                    },
                    onPressIn: () => {
                      return [
                        {
                          mutation: () => {
                            return { size: 9 }
                          },
                        },
                      ]
                    },
                    onPressOut: () => {
                      return [
                        {
                          mutation: () => {
                            return { size: 6.6 }
                          },
                        },
                      ]
                    },
                  },
                },
              ]}
            />
            <VictoryScatter
              data={[data[selected]]}
              color={palette[4]}
              size={7.1}
              style={{ data: { stroke: palette[1], strokeWidth: 4 } }}
            />
            <VictoryScatter
              data={[data[selected]]}
              dataComponent={
                <GpaTooltip
                  score={data[selected].y}
                  scoreToFixed={scoreToFixed || 2}
                  palette={[palette[0], palette[1]]}
                />
              }
            />
          </VictoryGroup>
        </Svg>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    semesterIndex: state.dataReducer.gpa.semesterIndex,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSemesterIndex: newType => {
      dispatch(setSemesterIndex(newType))
    },
  }
}

export const connectedGpaCurve = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GpaCurve)
