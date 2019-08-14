import { TextStyle, ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"

export default {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
  screen: {
    backgroundColor: color.module.yellowPages[0],
  } as ViewStyle,
  field: {
    backgroundColor: color.transparent,
    padding: 0,
  } as ViewStyle,
  input: {
    backgroundColor: color.transparent,
    paddingHorizontal: 0,
    fontSize: 40,
    color: color.module.yellowPages[1],
  } as TextStyle,

  h0: {
    fontWeight: "bold",
    fontSize: 50,
    color: color.module.yellowPages[1],
  } as TextStyle,
}
