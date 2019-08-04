import { palette } from "./palette"

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The screen background.
   */
  background: palette.offWhite,
  card: palette.white,
  /**
   * The main tinting color.
   */
  primary: palette.offPale2,
  /**
   * The main tinting color, but darker.
   */

  lightGrey: palette.lightGrey,
  washed: palette.washed,
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.offWhite,
  /**
   * The default color of text in many components.
   */
  text: palette.offPale2,
  /**
   * Secondary information.
   */
  dim: palette.lightGrey,
  /**
   * Error messages and icons.
   */
  error: palette.angry,

  /**
   * ColorHashes palette for books & course blocks.
   */
  hash: {
    course: [palette.offPale, palette.novaPale, palette.authenticPale, palette.pale, palette.offBlack],
    bookStrip: [palette.washed, palette.lighterPale, palette.lighterAuthenticPale],
  },

  /**
   * Module-specific colors.
   */
  module: {
    gpa: palette.offBlack,
    ecard: palette.angry,
  },

  lucLight: 'rgba(255,255,255,0.05)',
  lucDark: 'rgba(0,0,0,0.02)',

}
