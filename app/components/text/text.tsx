import * as React from "react"
import { connect } from "react-redux"

import { Text as ReactNativeText } from "react-native"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "../../i18n"
import { mergeAll, flatten } from "ramda"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

class _Text extends React.PureComponent<TextProps, {}> {
  render() {
    // grab the props
    const {
      preset = "default",
      tx,
      txOptions,
      text,
      children,
      lang,
      style: styleOverride,
      ...rest
    } = this.props

    // figure out which content to use
    console.log(lang)
    const i18nText = tx && translate(tx, lang, txOptions)
    const content = i18nText || text || children

    const style = mergeAll(flatten([presets[preset] || presets.default, styleOverride]))

    return (
      <ReactNativeText {...rest} style={style}>
        {content}
      </ReactNativeText>
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

export const Text = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Text)
