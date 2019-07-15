import { Platform } from "react-native"

/**
 * Just the font names.
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  /**
   * The primary font.  Used in most places.
   */
  primary: Platform.select({ ios: "BlueSkyStandard", android: "BlueSkyStandard" }),
  primaryBold: Platform.select({ ios: "BlueSkyStandard", android: "BlueSkyStandard_bold" }),
  materialIcons: Platform.select({ ios: "MaterialIcons", android: "MaterialIcons" }),

  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: "Montserrat", android: "Montserrat" }),
}
