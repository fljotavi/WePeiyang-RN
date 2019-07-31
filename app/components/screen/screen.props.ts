import { ViewStyle } from "react-native"
import { KeyboardOffsets, ScreenPresets } from "./screen.presets"

export interface ScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * One of the different types of presets.
   * Please notice that setting 'scroll' on this will make the transparent status bar content overlap with possible page content when scrolling down.
   * If this attribute is not set, then the status bar would display as colored & opaque, with the color equal to screen.backgroundColor.
   */
  preset?: ScreenPresets

  /**
   * An optional background color
   */
  backgroundColor?: string

  /**
   * Should we not wrap in SafeAreaView? Defaults to false.
   */
  unsafe?: boolean

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets
}
