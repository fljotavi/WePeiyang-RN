import { TextStyle, View, ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"
import { Text } from "../../components/text"
import * as React from "react"
import Touchable from "react-native-platform-touchable"

export interface UnitSnackProps {
  unit?
  phone?
  style?
  onPress?
}

export function UnitSnack(props: UnitSnackProps) {
  const { unit, phone, style, onPress } = props
  const ss = {
    snack: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      overflow: "hidden",
    } as ViewStyle,
    snackContainer: {
      paddingVertical: 14,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: color.white(0.1),
      borderBottomWidth: 0.8,
    } as ViewStyle,
    left: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    } as ViewStyle,
    title: {
      color: color.module.yellowPages[1],
      fontSize: 15,
    } as TextStyle,
    subtitle: {
      color: color.module.yellowPages[1],
      fontSize: 30,
      fontWeight: "bold",
    } as TextStyle,
    call: {
      color: color.module.yellowPages[1],
      fontSize: 26,
      width: 60,
      textAlign: "right",
    } as ViewStyle,
  }
  return (
    <Touchable
      background={Touchable.Ripple(color.module.gpa[2])}
      style={[ss.snack, style]}
      delayPressIn={0}
      onPress={onPress}
    >
      <View style={ss.snackContainer}>
        <View style={ss.left}>
          <View>
            <Text text={unit} style={ss.title} />
            <Text style={ss.subtitle} text={phone} />
          </View>
        </View>
        <Text text="call" style={ss.call} preset="i" />
      </View>
    </Touchable>
  )
}
