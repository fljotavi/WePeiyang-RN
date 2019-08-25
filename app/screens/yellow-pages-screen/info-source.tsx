/*
 * Info Source
 * Created by Tzingtao Chow
 * ---
 *
 * Info Source 是黄页模块中位于页面底部的信息来源。
 *
 */

import { TextStyle, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { Text } from "../../components/text"
import * as React from "react"
import { TjuBadge } from "../../components/tju-badge"

export interface InfoSourceProps {
  style?
}

export function InfoSource(props: InfoSourceProps) {
  const { style } = props
  const ss = {
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    } as ViewStyle,
    icon: {
      marginHorizontal: 4,
    } as ViewStyle,
    text: {
      color: color.module().yellowPages[0],
      fontSize: 11,
      fontWeight: "bold",
    } as TextStyle,
  }
  return (
    <View style={[ss.container, style]}>
      <Text tx="contact.infoSource" style={ss.text} />
      <Text text="  /" style={ss.text} />
      <TjuBadge fill={color.module().yellowPages[0]} height={20} width={15} style={ss.icon} />
      <Text text="天津大学办公服务平台" style={ss.text} />
    </View>
  )
}
