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
 * Update: 目前延迟渲染的逻辑已经写进这个组件本身。
 *
 */

import * as React from "react"
import { Animated, TouchableOpacity, View, ViewStyle } from "react-native"
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
import { IanBorderless } from "../ian-borderless"

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
          fill={color.module().gpa[1]}
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

class _GpaRadar extends React.Component<GpaRadarProps, {}> {
  state = {
    renderChart: false, // Defer chart render for better entry performance
    fadeAnim: new Animated.Value(0),
    semesterIndex: this.props.semesterIndex,
  }

  // After React deprecated the use of ComponentWillReceiveProps,
  // This pattern becomes surprisingly complicated.
  // I did my best to make things clear here.

  static getDerivedStateFromProps(props, state) {
    if (props.semesterIndex !== state.semesterIndex) {
      console.log("Change detected")
      console.log(props, state)
      return {
        renderChart: false,
        fadeAnim: new Animated.Value(0),
        semesterIndex: props.semesterIndex,
      }
    }
    return null
  }

  componentDidUpdate() {
    console.log("Didupdate")
    if (this.state.renderChart === false) {
      this.revealTheShit()
    }
  }

  componentDidMount() {
    if (this.state.renderChart === false) {
      this.revealTheShit()
    }
  }

  async revealTheShit() {
    await setTimeout(() => {
      this.setState({ renderChart: true })
      Animated.timing(this.state.fadeAnim, {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: true,
      }).start()
    }, 1)
  }

  render() {
    const { style, gpa } = this.props

    const predefinedStyle: ViewStyle = {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 300,
    } as ViewStyle

    if (!(gpa.status === "VALID" && gpa.data && gpa.data.gpaSemestral.weighted.length)) {
      return (
        <View style={[predefinedStyle, style]}>
          <IanBorderless
            icon="insert_chart"
            tx="data.noAvailableData"
            color={color.module().gpa[2]}
          />
        </View>
      )
    }

    let shuffled = shuffleData([...gpa.data.gpaDetailed[this.state.semesterIndex].data])
    let processed = shuffled.map(course => ({
      x: course.name,
      y: course.score * course.score * course.score * course.score * 0.000001, // That's right, y = 0.000001 * x^4, perfect score mapping
    }))

    let processedCredits = shuffled.map(course => ({ x: course.name, y: course.credit * 25 }))

    if (processed && processed.length <= 2) {
      return (
        <View style={[predefinedStyle, style]}>
          <IanBorderless icon="insert_chart" tx="gpa.noRadar" color={color.module().gpa[2]} />
        </View>
      )
    }

    return (
      <TouchableOpacity style={[predefinedStyle, style]} onPress={() => this.forceUpdate()}>
        <Animated.View style={{ opacity: this.state.fadeAnim }}>
          {this.state.renderChart && (
            <Svg>
              <VictoryChart domain={{ y: [0, 100] }} polar>
                <VictoryGroup colorScale={[color.module().gpa[1]]}>
                  <VictoryArea
                    style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                    data={processed}
                    labelComponent={<G />}
                  />
                  <VictoryBar
                    style={{
                      data: {
                        fill: color.module().gpa[1],
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
                    grid: { stroke: color.module().gpa[1], opacity: 0.5, strokeWidth: 0.25 },
                  }}
                />
              </VictoryChart>
            </Svg>
          )}
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => {
  return {
    gpa: state.dataReducer.gpa,
    semesterIndex: state.dataReducer.gpa.semesterIndex,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const GpaRadar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_GpaRadar)
