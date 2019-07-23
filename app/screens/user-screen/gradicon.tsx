import * as React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color } from "../../theme"

export interface GradiconProps {
  source
  tx?
  style?
}

export function Gradicon(props: GradiconProps) {
  const { source, tx, style } = props
  const predefinedStyle: ViewStyle = {
    alignItems: "center",
    justifyContent: "center"
  }
  const textStyle: TextStyle = {
    color: color.primaryLighter,
    marginTop: 5,
    fontWeight: "bold",
  }
  const iconStyle: ImageStyle = {
    width: 50,
    height: 50
  }
  return (
    <View style={[predefinedStyle, style]}>
      <Image source={source} style={iconStyle}/>
      <Text tx={tx} style={textStyle}/>
    </View>
  )
}
