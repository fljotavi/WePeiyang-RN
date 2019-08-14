import { TextStyle, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { Text } from "../../components/text"
import * as React from "react"
import Touchable from "react-native-platform-touchable"

export interface SearchSnackProps {
  title?
  subtitle?
  onPress?
  style?
}

export function SearchSnack(props: SearchSnackProps) {
  const { title, subtitle, onPress, style } = props
  const ss = {
    snackContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
    } as ViewStyle,
    snack: {} as ViewStyle,
    title: {
      color: color.module.yellowPages[1],
      fontSize: 20,
    } as TextStyle,
    subtitle: {
      color: color.module.yellowPages[2],
      fontSize: 12,
    } as TextStyle,
  }

  return (
    <Touchable
      background={Touchable.Ripple(color.module.yellowPages[2])}
      style={[ss.snack, style]}
      delayPressIn={0}
      onPress={onPress}
    >
      <View style={ss.snackContainer} pointerEvents="box-only">
        <Text>
          <Text text={title} style={ss.title} />
          <Text text="  " style={ss.subtitle} />
          <Text text={subtitle} style={ss.subtitle} />
        </Text>
      </View>
    </Touchable>
  )
}
