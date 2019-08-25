/*
 * Bottom Bar
 * Created by Tzingtao Chow
 * ---
 *
 */

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color, layoutParam } from "../../theme"

export interface BottomBarProps {
  ratio?
}

export function BottomBar(props: BottomBarProps) {
  let { ratio } = props
  let ss = {
    bottomBar: {
      alignSelf: "stretch",
      flexDirection: "row",
      height: 7,
      marginVertical: 7,
      backgroundColor: color.washed,
      borderRadius: layoutParam.borderRadius / 1.5,
      overflow: "hidden",
    } as ViewStyle,
    bottomBarText: {
      marginTop: 5,
      color: color.lightGrey,
      fontSize: 10,
      fontWeight: "bold",
    } as TextStyle,
  }
  return (
    <>
      <Text style={ss.bottomBarText}>
        <Text tx="schedule.totalClassHours" />
        <Text text=" " />
        <Text text={ratio[0]} />
      </Text>
      <View style={ss.bottomBar}>
        <View
          style={{
            backgroundColor: color.primary,
            flex: ratio[0],
            alignSelf: "stretch",
          }}
        />
        <View style={{ flex: ratio[1] - ratio[0] }} />
      </View>
    </>
  )
}
