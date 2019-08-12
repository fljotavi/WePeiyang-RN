/*
 * Text Field
 * Created by Tzingtao Chow
 * ---
 *
 * Text Fields 是微北洋内通用的 TextInput 组件，用于显示文字输入框。
 *
 * 这是一个对于 React Native 内置 TextInput 组件的 HOC。
 * 它和 Text 组件的来头差不多，请参见 Text 组件的使用说明。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { View, TextInput, TextStyle, ViewStyle } from "react-native"
import { color, layoutParam, typography } from "../../theme"
import { translate } from "../../i18n"
import { Text } from "../text"
import { TextFieldProps } from "./text-field.props"
import { mergeAll, flatten } from "ramda"

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: 0,
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  paddingHorizontal: 15,
  fontFamily: typography.primary,
  color: color.text,
  minHeight: 45,
  fontSize: 16,
  backgroundColor: color.washed,
  borderRadius: layoutParam.borderRadius,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]))
}

/**
 * A component which has a label and an input together.
 */
export class _TextField extends React.Component<TextFieldProps, {}> {
  render() {
    const {
      placeholderTx,
      placeholder,
      labelTx,
      label,
      preset = "default",
      style: styleOverride,
      inputStyle: inputStyleOverride,
      forwardedRef,
      lang,
      ...rest
    } = this.props
    let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] }
    containerStyle = enhance(containerStyle, styleOverride)

    let inputStyle: TextStyle = INPUT
    inputStyle = enhance(inputStyle, inputStyleOverride)
    const actualPlaceholder = placeholderTx ? translate(placeholderTx, lang) : placeholder

    return (
      <View style={containerStyle}>
        <Text preset="fieldLabel" tx={labelTx} text={label} />
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.lightGrey}
          underlineColorAndroid={color.transparent}
          selectionColor={color.black(0.12)}
          {...rest}
          style={inputStyle}
          ref={forwardedRef}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    lang: state.preferenceReducer.language,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const TextField = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_TextField)
