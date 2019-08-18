import { color, layoutParam } from "../../theme"
import { TextStyle, ViewStyle } from "react-native"

export default {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
  heading: {
    marginBottom: 20,
  } as TextStyle,
  sectionHead: {
    marginTop: 16,
    marginBottom: 12,
    fontWeight: "bold",
    color: color.primary,
  } as TextStyle,
  small: {
    marginBottom: 20,
    color: color.lightGrey,
  } as TextStyle,
  snack: {
    marginBottom: 10,
  } as ViewStyle,
}
