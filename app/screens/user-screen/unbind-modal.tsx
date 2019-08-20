/*
 * Unbind Modal
 * Created by Tzingtao Chow
 * ---
 *
 * Unbind Modal 用于显示解绑确认提示的对话框遮罩层。
 *
 */

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { color } from "../../theme"
import { Button } from "../../components/button"

export interface UnbindModalProps {
  style?
  actions?
  origin?
}

export function UnbindModal(props: UnbindModalProps) {
  const { style, actions, origin } = props
  const h2: TextStyle = {
    color: color.background,
  }
  const textStyle: TextStyle = {
    color: color.background,
    fontSize: 14,
    marginTop: 10,
  }
  const buttonRow: ViewStyle = {
    marginTop: 20,
    flexDirection: "row",
  }
  const buttonStyle: ViewStyle = {
    alignSelf: "flex-start",
    marginRight: 10,
  }
  const predefinedStyle: ViewStyle = {
    maxWidth: 300,
    alignSelf: "center",
  }

  return (
    <View style={[predefinedStyle, style]}>
      <Text tx="accountBinding.unbindModal.heading" preset="h2" style={h2} />
      <Text tx="accountBinding.unbindModal.content" style={textStyle} />
      {origin === "ECARD" && <Text tx="accountBinding.unbindEcardHint" style={textStyle} />}
      {origin === "TJU" && <Text tx="accountBinding.tjuLatencyHint" style={textStyle} />}
      {origin === "LIB" && <Text tx="accountBinding.libLatencyHint" style={textStyle} />}
      {!(origin === "ECARD") && (
        <View style={buttonRow}>
          <Button
            tx="accountBinding.unbind"
            preset="small"
            style={buttonStyle}
            onPress={actions[0]}
          />
          <Button
            tx="common.cancel"
            preset="small"
            style={buttonStyle}
            palette={[color.background, color.white(0.1)]}
            onPress={actions[1]}
          />
        </View>
      )}
    </View>
  )
}
