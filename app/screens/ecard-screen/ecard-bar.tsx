/*
 * Ecard Bar
 * Created by Tzingtao Chow
 * ---
 *
 * 一个 Ecard Bar 会绘制一条 ~180 天每日消费数据的柱状图。
 *
 * Ecard Bar 是具有一定设计感的组件。它会显示成类似一条音频信号的形状。
 * 目前的 API 给出的数据跳过了没有消费的天。因此，为了绘制出这种效果，我们需要对这些数组中缺失的天做填充 (Padding)。
 * 这部分工作在组件内部完成。
 *
 * 请注意，Ecard Bar 是一个非常 Costly 的图表。
 * 在 Victory Native 实现显著的性能提升之前，在任何时候调用它，都应当考虑延迟渲染以优化加载体验。
 *
 */

import * as React from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { VictoryBar, VictoryGroup } from "victory-native"
import { color } from "../../theme"
import Svg from "react-native-svg"

export interface EcardBarProps {
  data?
  style?
}

export class EcardBar extends React.Component<EcardBarProps, {}> {
  state = {
    barIndex: 0,
  }

  formatDateFromRawString = raw => {
    return `${raw.substr(0, 4)}/${raw.substr(4, 2)}/${raw.substr(6, 2)}`
  }

  render() {
    console.log("Passed in", this.props.data)
    const barData = []
    const stampDiff = 86400000

    // Pad the unrecorded days (No expenses) in linear computation time
    this.props.data.forEach((cur, i, array) => {
      let stamp = new Date(this.formatDateFromRawString(cur.date)).getTime()
      let amount = Number(cur.count) + 1

      if (i !== 0) {
        let prevStamp = new Date(this.formatDateFromRawString(array[i - 1].date)).getTime()
        if (stamp - prevStamp > stampDiff) {
          // Pad the skipped days
          for (let i = prevStamp + stampDiff; i < stamp; i += stampDiff) {
            barData.push({
              x: i,
              y: 2,
              y0: -1,
            }) // Push a small amount of (yet visible) data
          }
        }
      }

      barData.push({
        x: stamp,
        y: amount * 2,
        y0: -amount,
      })
    })

    const predefinedStyle: ViewStyle = {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }

    let chartWidth = Dimensions.get("window").width
    let chartHeight = 100

    return (
      <View style={[predefinedStyle, this.props.style]}>
        <Svg height={chartHeight} width={chartWidth}>
          <VictoryGroup height={chartHeight} width={chartWidth} padding={5}>
            <VictoryBar
              name="bar"
              style={{ data: { fill: color.module.ecard[2] } }}
              data={barData}
            />
          </VictoryGroup>
        </Svg>
      </View>
    )
  }
}
