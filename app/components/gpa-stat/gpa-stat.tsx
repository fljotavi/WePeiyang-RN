import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color } from "../../theme"
import Touchable from 'react-native-platform-touchable'

export interface GpaStatProps {
  style?: ViewStyle
  setScoreType?: any
  scores?: any
}

export class GpaStat extends React.Component<GpaStatProps, {}> {

  render() {
    const { style, setScoreType, scores } = this.props
    if (scores.status !== "VALID") {
      return <View />
    }
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
      marginHorizontal: 10
    } as ViewStyle
    const predefinedStyle: ViewStyle = {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    } as ViewStyle
    return (
      <View style={[predefinedStyle, style]}>
        <Touchable background={Touchable.Ripple(color.lightGrey, true)} onPress={() => { setScoreType("weighted") }}>
          <View style={scoreFieldStyle}>
            <Text tx="gpa.totalWeighted" style={textStyle}/>
            <Text text={scores.weighted} style={numStyle} preset="h3"/>
          </View>
        </Touchable>
        <Touchable background={Touchable.Ripple(color.lightGrey, true)} onPress={() => { setScoreType("gradePoints") }}>
          <View style={scoreFieldStyle}>
            <Text tx="gpa.totalGpa" style={textStyle}/>
            <Text text={scores.gradePoints} style={numStyle} preset="h3"/>
          </View>
        </Touchable>
        <Touchable background={Touchable.Ripple(color.lightGrey, true)} onPress={() => { setScoreType("credits") }}>
          <View style={scoreFieldStyle}>
            <Text tx="gpa.creditsEarned" style={textStyle}/>
            <Text text={scores.credits} style={numStyle} preset="h3"/>
          </View>
        </Touchable>
      </View>
    )
  }
}
