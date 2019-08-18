/*
 * Text
 * Created by Tzingtao Chow
 * ---
 *
 * Text 组件用于显示文字。
 *
 * 这是一个对于 React Native 内置 Text 组件的 HOC，它可以帮助我们实现很多特性，
 * 如全局自定义字体、多语言支持、中西文间的 Auto-spacing 等。
 * 凡是需要使用到文字的地方，请尽量使用 Text 组件。
 *
 * 请注意，这是一个被连接到 Redux Store 的组件。
 * 把它连接到 Redux Store，可以实现界面语言设置的立即生效，而无需经过重启。
 * 但这意味着，在组件环境之外使用 Text 组件，可能会造成其因为脱离 APP 的 Redux Provider 而无法读取 Store。
 * 如果你在使用类似 React-native-root-* 的库，那么应该避免在内部包含此组件。
 *
 * 在必要时，可以构造 Text 组件的继承关系，并编写一个 Unconnected 版本以在 Provider 之外使用。
 * 这类需求并不常见，在可见的未来中，此 Text 组件足够使用。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { Text as ReactNativeText } from "react-native"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "../../i18n"
import { mergeAll, flatten } from "ramda"
import pangu from "pangu"

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
    let i18nText = tx && translate(tx, lang, txOptions)

    // Spacing between languages
    let toSpace = i18nText || text
    if (toSpace) {
      if (spacing === undefined) {
        if (toSpace.length < 500) toSpace = pangu.spacing(toSpace)
      } else if (spacing === true) {
        toSpace = pangu.spacing(toSpace)
      }
    }

    let content = toSpace || children
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
