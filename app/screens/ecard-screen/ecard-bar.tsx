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
            {/* <VictoryScatter */}
            {/*  name="tooltip" */}
            {/*  data={data} */}
            {/*  dataComponent={<EcardTooltip/>} */}
            {/* /> */}

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
