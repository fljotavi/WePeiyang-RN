import { TextStyle, View, ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"
import { Text } from "../../components/text"
import * as React from "react"
import Touchable from "react-native-platform-touchable"
import { digitsFromScoreType } from "../../utils/common"

export interface GpaSnackProps {
  score?
  courseName?
  courseType?
  credits?
  style?
}

export function GpaSnack(props: GpaSnackProps) {
  const { score, courseName, courseType, credits, style } = props
  const ss = {
    snack: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: layoutParam.borderRadius,
      overflow: "hidden",
    } as ViewStyle,
    snackContainer: {
      backgroundColor: color.module.gpa[3],
      paddingHorizontal: 18,
      paddingVertical: 14,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    } as ViewStyle,
    left: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    } as ViewStyle,
    title: {
      color: color.module.gpa[1],
    },
    icon: {
      color: color.module.gpa[2],
      fontSize: 25,
    },
    score: {
      color: color.module.gpa[1],
      fontSize: 26,
      width: 60,
      textAlign: "right",
    } as ViewStyle,
    text: {
      marginLeft: 10,
    } as TextStyle,
    subtitle: {
      color: color.module.gpa[2],
    },
  }
  let iconText = "assignment_turned_in"
  if (score > 99) {
    iconText = "flash_auto"
  }
  if (score < 60) {
    iconText = "hourglass_full"
  }
  return (
    <Touchable
      background={Touchable.Ripple(color.module.gpa[2])}
      style={[ss.snack, style]}
      delayPressIn={0}
    >
      <View style={ss.snackContainer} pointerEvents="box-only">
        <View style={ss.left}>
          <Text text={iconText} style={ss.icon} preset="i" />
          <View style={ss.text}>
            <Text text={courseName} style={ss.title} />
            <Text>
              <Text
                preset="small"
                style={ss.subtitle}
                text={courseType + " / " + credits.toFixed(digitsFromScoreType("credits"))}
              />
              <Text preset="small" style={ss.subtitle} text=" " />
              <Text preset="small" style={ss.subtitle} tx="gpa.credits" />
            </Text>
          </View>
        </View>
        <Text text={score} style={ss.score} preset="h2" />
      </View>
    </Touchable>
  )
}
