import { TextStyle } from "react-native"
import { color, typography } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  letterSpacing: -0.1,
  fontFamily: typography.primary,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  /**
   * A bold version of the default text.
   */

  /**
   * Large headers.
   */
  header: { ...BASE, fontSize: 24 } as TextStyle,
  h1: { ...BASE, fontSize: 48, color: color.primary, fontWeight: "bold" } as TextStyle,
  h2: { ...BASE, fontSize: 32, color: color.primary, fontWeight: "bold" } as TextStyle,
  h3: { ...BASE, fontSize: 24, color: color.primary, fontWeight: "bold" } as TextStyle,
  h4: { ...BASE, fontSize: 20, color: color.primary, fontWeight: "bold" } as TextStyle,
  h5: { ...BASE, fontSize: 18, color: color.primary, fontWeight: "bold" } as TextStyle,
  h6: { ...BASE, fontSize: 16, color: color.primary, fontWeight: "bold" } as TextStyle,
  small: { ...BASE, fontSize: 13 } as TextStyle,
  i: { fontFamily: typography.materialIcons } as TextStyle,

  lausanne: { ...BASE, fontSize: 10, textTransform: "uppercase", letterSpacing: 3 },

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: 13, color: color.lightGrey } as TextStyle,

  /**
   * A smaller piece of secondard information.
   */
  secondary: { ...BASE, fontSize: 9, color: color.lightGrey } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
