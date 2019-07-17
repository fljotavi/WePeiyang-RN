import * as React from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { VictoryLine, VictoryGroup, VictoryScatter } from "victory-native"
import { color, typography } from "../../theme"
import Svg, { G, Rect, Text as Svgtext } from "react-native-svg"

export interface GpaTooltipProps {
  x?: number
  y?: number
  score?: number
}

export function GpaTooltip(props: GpaTooltipProps) {
  {
    const { x, y, score } = props
    let w = 70
    let h = 30
    return (
      <G x={x - w / 2} y={y - h - 17}>
        <Rect width={w} height={h} rx="5" fill={color.card} />
        <Svgtext
          x={w / 2}
          y={20}
          fontSize={17}
          fill={color.primaryLighter}
          textAnchor="middle"
          fontFamily={typography.primaryBold}
          fontWeight="bold">
          {score.toFixed(2)}
        </Svgtext>
      </G>
    )
  }
}

export interface GpaCurveProps {
  style?: ViewStyle
  data?: any[]
  status: string
}

export class GpaCurve extends React.Component<GpaCurveProps, {}> {
  state = {
    selected: 1
  }

  render() {
    const { style, data, status } = this.props

    if (status !== "valid" || data.length <= 0) {
      return <View />
    }

    const textStyle = { }
    const predefinedStyle: ViewStyle = {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }

    let selected = this.state.selected
    let gpaArray = data.map(dict => dict.y)
    let lowest = Math.min(...gpaArray)
    let highest = Math.max(...gpaArray)
    let domainPadding = (highest - lowest) / 4
    let passedData = [{ x: 0, y: data[0].y }, ...data, { x: data.length + 1, y: data[data.length - 1].y }]
    let chartWidth = Dimensions.get('window').width
    let chartHeight = 100
    return (
      <View style={[predefinedStyle, style]}>
        <Text style={textStyle} />
        <Svg height={chartHeight} width={chartWidth}>
          <VictoryGroup standalone={false}
            height={chartHeight}
            width={chartWidth}
            padding={0}
            color={color.washed} >
            <VictoryLine
              data={passedData}
              animate={{ duration: 1000 }}
              interpolation="cardinal"
              style={{ data: { stroke: color.washed, strokeWidth: 4 } }}
              domain={{ y: [lowest - domainPadding, highest + domainPadding * 5] }}
            />
            <VictoryScatter
              data={data}
              color={color.lightGrey}
              size={7}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPress: (a, i) => {
                      this.setState({
                        selected: i.index
                      })
                    }
                  }
                }
              ]}
            />
            <VictoryScatter
              data={[data[selected]]}
              color={color.background}
              size={7.6}
              style={{ data: { stroke: color.primaryLighter, strokeWidth: 4.2 } }}
            />
            <VictoryScatter
              data={[data[selected]]}
              dataComponent={<GpaTooltip score={data[selected].y}/>}
            />
          </VictoryGroup>
        </Svg>
      </View>
    )
  }
}
