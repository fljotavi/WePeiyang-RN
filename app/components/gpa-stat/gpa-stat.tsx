import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color } from "../../theme"
import Touchable from 'react-native-platform-touchable'

export interface GpaStatProps {
  style?: ViewStyle
}

export class GpaStat extends React.Component<GpaStatProps, {}> {
  state = {
    data: [
      { x: 1, y: 92 },
      { x: 2, y: 81 },
      { x: 3, y: 86 },
      { x: 4, y: 93 }
    ],
    selected: 1
  }

  render() {
    const { style } = this.props
    const textStyle = {
      color: color.lightGrey,
      fontWeight: "bold",
      marginBottom: 5,
      fontSize: 12,
    } as TextStyle
    const numStyle = {
      color: color.primaryLighter,
      fontWeight: "bold",
    } as TextStyle
    const scoreFieldStyle = {
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 25
    } as ViewStyle
    const predefinedStyle: ViewStyle = {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    } as ViewStyle
    return (
      <View style={[predefinedStyle, style]}>
        <Touchable background={Touchable.Ripple(color.lightGrey, true)} onPress={() => { this.props.setScoreType("weighted") }}>
          <View style={scoreFieldStyle}>
            <Text tx="gpa.totalWeighted" style={textStyle}/>
            <Text text={"85.87"} style={numStyle} preset="h3"/>
          </View>
        </Touchable>
        <Touchable background={Touchable.Ripple(color.lightGrey, true)} onPress={() => { this.props.setScoreType("gradePoints") }}>
          <View style={scoreFieldStyle}>
            <Text tx="gpa.totalGpa" style={textStyle}/>
            <Text text={"3.439"} style={numStyle} preset="h3"/>
          </View>
        </Touchable>

      </View>
    )
  }
}
