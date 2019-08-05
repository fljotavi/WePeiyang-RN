import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color } from "../../theme"

export interface GpaInfoProps {

}

export function GpaInfo(props: GpaInfoProps) {

  const textStyle: TextStyle = {
    color: color.module.gpa[0],
    fontSize: 14,
    marginVertical: 10,
  }
  const predefinedStyle: ViewStyle = {
  }

  return (
    <View style={predefinedStyle}>
      <Text text="GPA Defs" preset="h2" />
      <Text tx="common.lipsum.a" style={textStyle} />
      <Text tx="common.lipsum.b" style={textStyle} />
      <Text tx="common.lipsum.c" style={textStyle} />
      <Text tx="common.lipsum.b" style={textStyle} />
      <Text tx="common.lipsum.d" style={textStyle} />
    </View>
  )
}
