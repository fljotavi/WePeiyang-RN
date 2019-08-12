/*
 * Gpa Radar
 * Created by Tzingtao Chow
 * ---
 *
 * 一个 Gpa Radar 会绘制一个 GPA 雷达 + 玫瑰复合图表。
 * 这是一个 Stateful 组件，它会从全局的 Redux Store 中读取 GPA 成绩和当前选中的学期状态，而不支持手动指定。
 *
 * 请注意，Gpa Radar 是一个非常 Costly 的图表。
 * 在 Victory Native 实现显著的性能提升之前，在任何时候调用它，都应当考虑延迟渲染以优化加载体验。
 *
 */

import * as React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryArea,
  VictoryPolarAxis,
} from "victory-native"
import Svg, { G, Text as Svgtext, TSpan } from "react-native-svg"
import { shuffleData } from "../../utils/common"
import { connect } from "react-redux"

export interface GpaPolarLabelProps {
  x?: number
  y?: number
  courseName?: string
  datum?
}

export function GpaPolarLabel(props: GpaPolarLabelProps) {
  {
    let { x, y, courseName } = props
    let lineHeight = 10
    let tspans = []
    let tgroup

    if (courseName.length > 12) {
      courseName = courseName.substr(0, 11) + "…"
    }

    let n = courseName
    let l = courseName.length

    switch (l) {
      case 12:
        tspans = [n.substring(0, 4), n.substring(4, 8), n.substring(8, 12)]
        break
      case 11:
        tspans = [n.substring(0, 4), n.substring(4, 8), n.substring(8, 11)]
        break
      case 10:
        tspans = [n.substring(0, 3), n.substring(3, 7), n.substring(7, 10)]
        break
      case 9:
        tspans = [n.substring(0, 3), n.substring(3, 6), n.substring(6, 9)]
        break
      case 8:
        tspans = [n.substring(0, 4), n.substring(4, 8)]
        break
      case 7:
        tspans = [n.substring(0, 4), n.substring(4, 7)]
        break
      case 6:
        tspans = [n.substring(0, 3), n.substring(3, 6)]
        break
      case 5:
        tspans = [n.substring(0, 3), n.substring(3, 5)]
        break
      default:
        tspans = [n]
        break
    }

    switch (tspans.length) {
      case 3:
        tgroup = [
          <TSpan key="0" x="0" y={String(-lineHeight)}>
            {tspans[0]}
          </TSpan>,
          <TSpan key="1" x="0" dy={String(lineHeight)}>
            {tspans[1]}
          </TSpan>,
          <TSpan key="2" x="0" dy={String(lineHeight)}>
            {tspans[2]}
          </TSpan>,
        ]
        break
      case 2:
        tgroup = [
          <TSpan key="0" x="0" y={String(-lineHeight / 2)}>
            {tspans[0]}
          </TSpan>,
          <TSpan key="1" x="0" dy={String(lineHeight)}>
            {tspans[1]}
          </TSpan>,
        ]
        break
      case 1:
        tgroup = [
          <TSpan key="0" x="0" y="0">
            {tspans[0]}
          </TSpan>,
        ]
    }

    return (
      <G x={x} y={y}>
        <Svgtext
          textAnchor="middle"
          fontSize={7}
          fill={color.module.gpa[1]}
          fontFamily={typography.primary}
        >
          {tgroup}
        </Svgtext>
      </G>
    )
  }
}

export interface GpaRadarProps {
  style?: ViewStyle
  gpa?
  semesterIndex?
}

export class GpaRadar extends React.Component<GpaRadarProps, {}> {
  render() {
    const { style, gpa } = this.props
    let shuffled = shuffleData([...this.props.gpa.data.gpaDetailed[this.props.semesterIndex].data])
    let processed = shuffled.map(course => ({ x: course.name, y: course.score * 2.5 - 150 }))
    let processedCredits = shuffled.map(course => ({ x: course.name, y: course.credit * 25 }))

    if (gpa.status !== "VALID") {
      return <View />
    }
    const predefinedStyle: ViewStyle = {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 300,
    } as ViewStyle
    return (
      <TouchableOpacity style={[predefinedStyle, style]} onPress={() => this.forceUpdate()}>
        <Svg>
          <VictoryChart domain={{ y: [0, 100] }} polar>
            <VictoryGroup colorScale={[color.module.gpa[1]]}>
              <VictoryArea
                style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                data={processed}
                labelComponent={<G />}
              />
              <VictoryBar
                style={{
                  data: {
                    fill: color.module.gpa[1],
                    fillOpacity: 0.07,
                  },
                }}
                data={processedCredits}
                labelComponent={<G />}
              />
            </VictoryGroup>
            {processed.map((key, i) => {
              return (
                <VictoryPolarAxis
                  key={i}
                  dependentAxis
                  style={{
                    axis: { stroke: "none" },
                  }}
                  label="foo"
                  axisLabelComponent={<GpaPolarLabel courseName={key.x} />}
                  tickLabelComponent={<G />}
                  axisValue={i + 1}
                />
              )
            })}
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickFormat={() => ""}
              style={{
                axis: { stroke: "none" },
                grid: { stroke: color.module.gpa[1], opacity: 0.5, strokeWidth: 0.25 },
              }}
            />
          </VictoryChart>
        </Svg>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => {
  return {
    gpa: state.dataReducer.gpa,
    semesterIndex: state.semesterReducer,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const connectedGpaRadar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GpaRadar)
