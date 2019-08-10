import * as React from "react"
import { connect } from "react-redux"

import { Text as ReactNativeText } from "react-native"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "../../i18n"
import { mergeAll, flatten } from "ramda"
import pangu from "pangu"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

class _Text extends React.PureComponent<TextProps, {}> {
  render() {
    // grab the props
    let {
      preset = "default",
      tx,
      txOptions,
      text,
      children,
      spacing,
      lang,
      customTranslationMethod,
      style: styleOverride,
      ...rest
    } = this.props

    // figure out which content to use
    const i18nText = tx && translate(tx, lang, txOptions)

    // Spacing between languages
    if (text) {
      if (spacing === undefined) {
        if (text.length < 100) text = pangu.spacing(text)
      } else if (spacing === true) {
        text = pangu.spacing(text)
      }
    }

    let content = i18nText || text || children
    if (customTranslationMethod && tx) {
      content = customTranslationMethod(lang, tx)
    }
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
