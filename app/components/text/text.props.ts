import { TextStyle, TextProps as TextProperties } from "react-native"
import { TextPresets } from "./text.presets"

export interface TextProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: object

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * Whether to space the text between languages.
   * i.e. "有关Lorem Ipsum的方程第8个参数" would be "有关 Lorem Ipsum 的方程第 8 个参数" after spacing.
   * Note that spacing is default to true only for short texts, and not enabled for i18n tx props.
   */
  spacing?: boolean

  /**
   * An optional style override useful for padding & margin.
   */
  style?: TextStyle | TextStyle[]

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresets

  /**
   * Populated by React-redux and should not be manually set.
   */
  lang?
  customTranslationMethod?
}
