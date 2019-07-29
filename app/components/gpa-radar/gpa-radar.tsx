import * as React from "react"
import { View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { VictoryChart, VictoryGroup, VictoryArea, VictoryPolarAxis } from "victory-native"
import { G, Text as Svgtext, TSpan } from "react-native-svg"

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
        tspans = [
          n.substring(0, 4), n.substring(4, 8), n.substring(8, 12)
        ]
        break
      case 11:
        tspans = [
          n.substring(0, 4), n.substring(4, 8), n.substring(8, 11)
        ]
        break
      case 10:
        tspans = [
          n.substring(0, 3), n.substring(3, 7), n.substring(7, 10)
        ]
        break
      case 9:
        tspans = [
          n.substring(0, 3), n.substring(3, 6), n.substring(6, 9)
        ]
        break
      case 8:
        tspans = [ n.substring(0, 4), n.substring(4, 8) ]
        break
      case 7:
        tspans = [ n.substring(0, 4), n.substring(4, 7) ]
        break
      case 6:
        tspans = [ n.substring(0, 3), n.substring(3, 6) ]
        break
      case 5:
        tspans = [ n.substring(0, 3), n.substring(3, 5) ]
        break
      default:
        tspans = [n]
        break
    }

    switch (tspans.length) {
      case 3:
        tgroup = [
          <TSpan key="0" x="0" y={String(-lineHeight)}>{tspans[0]}</TSpan>,
          <TSpan key="1" x="0" dy={String(lineHeight)}>{tspans[1]}</TSpan>,
          <TSpan key="2" x="0" dy={String(lineHeight)}>{tspans[2]}</TSpan>,
        ]
        break
      case 2:
        tgroup = [
          <TSpan key="0" x="0" y={String(-lineHeight / 2)}>{tspans[0]}</TSpan>,
          <TSpan key="1" x="0" dy={String(lineHeight)}>{tspans[1]}</TSpan>,
        ]
        break
      case 1:
        tgroup = [
          <TSpan key="0" x="0" y="0">{tspans[0]}</TSpan>,
        ]
    }

    return (
      <G x={x} y={y}>
        <Svgtext
          textAnchor="middle"
          fontSize={7}
          fill={color.primaryLighter}
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
  scores?: any
  status
}

export class GpaRadar extends React.Component<GpaRadarProps, {}> {

  render() {
    const { style, scores, status } = this.props
    let courses = scores.data
    let processed = courses.map(course => ({ x: course.name, y: course.score }))

    console.log(processed)

    if (status !== "VALID") {
      return <View />
    }
    const predefinedStyle: ViewStyle = {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    } as ViewStyle
    return (
      <View style={[predefinedStyle, style]}>
        <VictoryChart polar
          domain={{ y: [ 50, 100 ] }}
        >
          <VictoryGroup colorScale={[color.primaryLighter]}
            style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
          >
            <VictoryArea
              data={processed}
              labels={(datum) => datum.x}
              labelComponent={
                <View/>
              }
            />
          </VictoryGroup>
          {
            processed.map((key, i) => {
              return (
                <VictoryPolarAxis
                  key={i}
                  dependentAxis
                  style={{
                    axis: { stroke: "none" },
                    grid: { stroke: color.lightGrey, strokeWidth: 0.25, opacity: 0 }
                  }}
                  label="placeholder"
                  labelPlacement="perpendicular"
                  axisLabelComponent={
                    <GpaPolarLabel courseName={key.x}/>
                  }
                  tickLabelComponent={<View/>}
                  axisValue={i + 1}
                />
              )
            })
          }
          <VictoryPolarAxis
            labelPlacement="parallel"
            tickFormat={() => ""}
            style={{
              axis: { stroke: "none" },
              grid: { stroke: color.primary, opacity: 0.5 }
            }}
          />
        </VictoryChart>
      </View>
    )
  }
}
