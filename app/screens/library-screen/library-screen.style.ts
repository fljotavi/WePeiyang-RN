import { color, layoutParam } from "../../theme"
import { TextStyle, ViewStyle } from "react-native"

export default {
  screen: {
    backgroundColor: color.primary,
  } as ViewStyle,
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
    alignItems: "center",
  } as ViewStyle,
  heading: {
    alignSelf: "flex-start",
  } as ViewStyle,
  headingKey: {
    color: color.background,
    fontSize: 20,
    textTransform: "uppercase",
    letterSpacing: 4,
  } as TextStyle,
  headingValue: {
    color: color.background,
    fontSize: 100,
    fontWeight: "bold",
    marginTop: -20,
    marginBottom: 20,
  } as TextStyle,
}
