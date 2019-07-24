import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color, layoutParam } from "../../theme"
import Touchable from 'react-native-platform-touchable'

export interface BindingBarProps {
  txTitle?
  txSubtitle?
  icon?
  action?
  arrowVisible?
  style?
}

export function BindingBar(props: BindingBarProps) {
  const { txTitle, txSubtitle, icon, action, arrowVisible = true, style } = props
  const ss = {
    bindingBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    } as ViewStyle,
    bindingBarContainer: {
      borderRadius: layoutParam.borderRadius,
      backgroundColor: color.card,
      paddingHorizontal: 20,
      paddingVertical: 16,
      width: '100%',
      maxWidth: 500,
    } as ViewStyle,
    left: {
      flexDirection: "row",
      alignItems: "center"
    } as ViewStyle,
    title: {
      color: color.primaryLighter
    },
    icon: {
      color: color.lightGrey,
      fontSize: 25,
    },
    backArrow: {
      color: color.lightGrey,
      fontSize: 30,
      opacity: arrowVisible ? 1 : 0,
    },
    text: {
      marginLeft: 10
    },
    subtitle: {
      color: color.lightGrey
    }
  }
  return (
    <Touchable style={[ss.bindingBarContainer, style]} onPress={action}>
      <View style={ss.bindingBar}>
        <View style={ss.left}>
          <Text text={icon} style={ss.icon} preset="i"/>
          <View style={ss.text}>
            <Text tx={txTitle} style={ss.title}/>
            <Text tx={txSubtitle} preset="small" style={ss.subtitle}/>
          </View>
        </View>
        <Text text="keyboard_arrow_right" style={ss.backArrow} preset="i"/>
      </View>
    </Touchable>
  )
}
