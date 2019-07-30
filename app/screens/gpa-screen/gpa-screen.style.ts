import { layoutParam } from "../../theme"
import { ViewStyle } from "react-native"

export default {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical
  } as ViewStyle,
  radar: {
    marginTop: 20,
    marginBottom: 20
  } as ViewStyle,
  list: {
    marginHorizontal: 15,
    marginTop: 50,
  } as ViewStyle,
  snackStyle: {
    marginBottom: 10,
  } as ViewStyle
}
