import { TextStyle, View, ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"
import { Text } from "../text"
import * as React from "react"
import Touchable from 'react-native-platform-touchable'
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
    } as ViewStyle,
    snackContainer: {
      borderRadius: layoutParam.borderRadius,
      backgroundColor: 'rgba(255,255,255,0.03)',
      paddingHorizontal: 20,
      paddingVertical: 16,
      width: '100%',
      flexDirection: "row",
      justifyContent: "space-between",
    } as ViewStyle,
    left: {
      flexDirection: "row",
      alignItems: "center"
    } as ViewStyle,
    title: {
      color: color.background
    },
    icon: {
      color: color.lightGrey,
      fontSize: 25,
    },
    score: {
      color: color.lightGrey,
      fontSize: 30,
    },
    text: {
      marginLeft: 10,
      width: 190,
    } as TextStyle,
    subtitle: {
      color: color.lightGrey
    }
  }
  let iconText = 'assignment_turned_in'
  if (score > 99) iconText = 'flash_auto'
  if (score < 60) iconText = 'hourglass_full'
  return (
    <Touchable style={[ss.snack, style]}>
      <View style={ss.snackContainer}>
        <View style={ss.left}>
          <Text text={iconText} style={ss.icon} preset="i"/>
          <View style={ss.text}>
            <Text text={courseName} style={ss.title}/>
            <Text>
              <Text preset="small" style={ss.subtitle} text={courseType + " / " + credits.toFixed(digitsFromScoreType('credits'))}/>
              <Text preset="small" style={ss.subtitle} text=" Credits"/>
            </Text>
          </View>
        </View>
        <Text text={score} style={ss.score} preset="h2"/>
      </View>
    </Touchable>
  )
}
