import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color } from "../../theme"
import Touchable from 'react-native-platform-touchable'

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
    palette = palette || [color.lightGrey, color.primaryLighter]
    if (status !== "VALID") {
      return <View />
    }
    const textStyle = {
      color: palette[0],
      fontWeight: "bold",
      marginBottom: 5,
      fontSize: 12,
    } as TextStyle
    const numStyle = {
      color: palette[1],
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
        <Touchable background={Touchable.Ripple(palette[0], true)} onPress={() => { setScoreType("weighted") }}>
          <View style={scoreFieldStyle}>
            <Text tx={txs[0]} style={textStyle}/>
            <Text text={scores.weighted} style={numStyle} preset="h3"/>
          </View>
        </Touchable>
        <Touchable background={Touchable.Ripple(palette[0], true)} onPress={() => { setScoreType("gradePoints") }}>
          <View style={scoreFieldStyle}>
            <Text tx={txs[1]} style={textStyle}/>
            <Text text={scores.gradePoints} style={numStyle} preset="h3"/>
          </View>
        </Touchable>
        <Touchable background={Touchable.Ripple(palette[0], true)} onPress={() => { setScoreType("credits") }}>
          <View style={scoreFieldStyle}>
            <Text tx={txs[2]} style={textStyle}/>
            <Text text={scores.credits} style={numStyle} preset="h3"/>
          </View>
        </Touchable>
      </View>
    )
  }
}
