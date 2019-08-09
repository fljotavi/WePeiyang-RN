import * as React from "react"
import { Switch, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color, layoutParam } from "../../theme"
import Touchable from "react-native-platform-touchable"
import Color from "color"

export interface SettingsSnackProps {
  txTitle?
  txSubtitle?
  textTitle?
  textSubtitle?
  preset?
  style?
  onPress?
  on?
}

export class SettingsSnack extends React.PureComponent<SettingsSnackProps, {}> {
  render() {
    let { txTitle, txSubtitle, textTitle, textSubtitle, onPress, preset, on, style } = this.props
    const ss = {
      SettingsSnack: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      } as ViewStyle,
      SettingsSnackContainer: {
        borderRadius: layoutParam.borderRadius,
        backgroundColor: color.card,
        paddingLeft: 15,
        paddingRight: 10,
        paddingVertical: 10,
        width: "100%",
        maxWidth: 500,
      } as ViewStyle,
      left: {
        flexDirection: "row",
        alignItems: "center",
      } as ViewStyle,
      title: {
        color: color.primary,
        fontSize: 14,
      },
      icon: {
        color: color.lightGrey,
        fontSize: 25,
      },
      switz: {
        color: color.lightGrey,
        fontSize: 30,
      },
      text: {
        marginLeft: 10,
      },
      subtitle: {
        color: color.lightGrey,
        fontSize: 10,
      },
    }

    let right = <View />
    switch (preset) {
      case "switch":
        right = (
          <Switch
            value={on}
            trackColor={{
              false: color.black(0.1),
              true: Color(color.primary).fade(0.5),
            }}
            thumbColor={color.primary}
          />
        )
        break
      case "enter":
        right = <Text text="navigate_next" style={ss.switz} preset="i" />
        break
      case "selected":
        right = <Text text="check" style={ss.switz} preset="i" />
    }
    return (
      <Touchable style={[ss.SettingsSnackContainer, style]} onPress={onPress} delayPressIn={0}>
        <View style={ss.SettingsSnack} pointerEvents="box-only">
          <View style={ss.left}>
            <View style={ss.text}>
              <Text tx={txTitle} text={textTitle} style={ss.title} />
              {(txSubtitle || textSubtitle) && (
                <Text tx={txSubtitle} text={textSubtitle} preset="small" style={ss.subtitle} />
              )}
            </View>
          </View>
          {right}
        </View>
      </Touchable>
    )
  }
}
