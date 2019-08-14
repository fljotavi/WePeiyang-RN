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
    marginLeft: -1,
  } as ViewStyle,
  input: {
    backgroundColor: color.transparent,
    paddingHorizontal: 0,
    fontSize: 40,
    color: color.module.yellowPages[1],
  } as TextStyle,

  poweredBy: {} as ViewStyle,
  poweredByText: {
    color: color.module.yellowPages[1],
    marginRight: 5,
  } as TextStyle,
  poweredByLogo: {} as ViewStyle,

  screenHead: {
    fontSize: 40,
    color: color.module.yellowPages[1],
    lineHeight: 48,
    marginTop: 13,
  } as TextStyle,
  sectionHead: {
    fontSize: 18,
    color: color.module.yellowPages[1],
    fontWeight: "bold",
  } as TextStyle,
  p: {
    fontSize: 12,
    color: color.module.yellowPages[1],
  } as TextStyle,

  unitList: {
    marginTop: 40,
  } as ViewStyle,
  tags: {
    marginVertical: 10,
    flexDirection: "row",
  } as ViewStyle,
}
