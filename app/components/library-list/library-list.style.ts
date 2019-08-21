import { ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"

export default {
  predefinedStyle: {
    overflow: "visible",
  } as ViewStyle,
  listStyle: {
    overflow: "visible",
  } as ViewStyle,
  libraryBlockStyle: {
    backgroundColor: color.washed,
    marginRight: 13,
    borderTopRightRadius: layoutParam.borderRadius,
    borderBottomRightRadius: layoutParam.borderRadius,
  } as ViewStyle,
  screen: {
    backgroundColor: color.background,
  },
  modal: {
    width: 250,
    alignSelf: "center",
  } as ViewStyle,
}
