import { ViewStyle, TextStyle } from "react-native"
import { color, layoutParam } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: 15,
  paddingHorizontal: 15,
  borderRadius: 999,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: 15,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.primary } as ViewStyle,
  greyer: { ...BASE_VIEW, backgroundColor: color.primary } as ViewStyle,
  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,

  lite: {
    ...BASE_VIEW,
  },

  small: {
    ...BASE_VIEW,
    borderRadius: layoutParam.borderRadius,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: color.background,
  },
}

export const textPresets = {
  primary: { ...BASE_TEXT, fontSize: 15, color: color.background } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
  small: {
    ...BASE_TEXT,
    color: color.primary,
    fontSize: 13,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
