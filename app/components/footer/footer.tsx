import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { layoutParam, color } from "../../theme"

export interface FooterProps {
  style?: ViewStyle
}

export function Footer(props: FooterProps) {
  const { style } = props
  const predefinedStyle: ViewStyle = {
    height: layoutParam.footerHeight,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 30,
    backgroundColor: color.background,
    overflow: "visible",
  }
  const textStyle: TextStyle = {
    color: color.primary,
    fontWeight: "bold",
  }
  const textContainerStyle: ViewStyle = {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <View style={[predefinedStyle, style]}>
      <View style={textContainerStyle}>
        <Text tx={"footer.wpy"} style={textStyle} />
      </View>
      <View style={textContainerStyle}>
        <Text tx={"footer.news"} style={textStyle} />
      </View>
      <View style={textContainerStyle}>
        <Text tx={"footer.tju"} style={textStyle} />
        <Text text={" "} style={textStyle} />
        <Text text={"send"} style={textStyle} preset={"i"}/>
      </View>
    </View>
  )
}
