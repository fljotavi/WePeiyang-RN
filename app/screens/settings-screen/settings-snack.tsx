/*
 * Settings Snack
 * Created by Tzingtao Chow
 * ---
 *
 * Settings Snack 定义了设置页面中的一个设置条。
 * 它具有高度的可配置性，
 * 包含了一个标题，一个可选的副标题，
 * 同时可以选择其类型（Preset）。
 *
 * 当 Preset 为 Switch 时，它的右侧会是一个开关，并接受一个 on 属性控制开关的开启和闭合。
 * 当 Preset 为 Enter 时，它会渲染一个箭头，代表点击后可能会导航 / 进入至一个新的屏幕。
 * 当 Preset 为 Selected 时，它会渲染一个 ☑️，代表多个选项中的已选中选项。
 *
 * 更多的 Presets 正在它们的路上。
 *
 */

import * as React from "react"
import { Switch, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color, layoutParam, ssGlobal } from "../../theme"
import Touchable from "react-native-platform-touchable"
import Color from "color"

export interface SettingsSnackProps {
  txTitle?
  txSubtitle?
  txOptionsSubtitle?
  textTitle?
  textSubtitle?
  preset?
  style?
  onPress?
  on?
}

export class SettingsSnack extends React.PureComponent<SettingsSnackProps, {}> {
  render() {
    let {
      txTitle,
      txSubtitle,
      txOptionsSubtitle,
      textTitle,
      textSubtitle,
      onPress,
      preset,
      on,
      style,
    } = this.props
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
      } as ViewStyle,
      left: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
      } as ViewStyle,
      right: {
        width: 70,
        alignItems: "flex-end",
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
      checkmate: {
        color: color.lightGrey,
        fontSize: 18,
        marginRight: 10,
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
            style={ssGlobal.switch}
          />
        )
        break
      case "enter":
        right = <Text text="navigate_next" style={ss.switz} preset="i" />
        break
      case "selected":
        right = <Text text="check" style={ss.checkmate} preset="i" />
    }
    return (
      <Touchable style={[ss.SettingsSnackContainer, style]} onPress={onPress} delayPressIn={0}>
        <View style={ss.SettingsSnack} pointerEvents="box-only">
          <View style={ss.left}>
            <View style={ss.text}>
              <Text tx={txTitle} text={textTitle} style={ss.title} />
              {(txSubtitle || textSubtitle) && (
                <Text
                  tx={txSubtitle}
                  text={textSubtitle}
                  txOptions={txOptionsSubtitle}
                  preset="small"
                  style={ss.subtitle}
                />
              )}
            </View>
          </View>
          <View style={ss.right}>{right}</View>
        </View>
      </Touchable>
    )
  }
}
