import { Dimensions, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"

let availableWidth = Dimensions.get("window").width
export default {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
  screen: {
    backgroundColor: color.module().yellowPages[0],
  } as ViewStyle,
  screenInvert: {
    backgroundColor: color.module().yellowPages[2],
  } as ViewStyle,
  field: {
    backgroundColor: color.transparent,
    padding: 0,
    marginLeft: -1,
  } as ViewStyle,
  input: {
    backgroundColor: color.transparent,
    paddingHorizontal: 0,
    fontSize: 35,
    color: color.module().yellowPages[1],
  } as TextStyle,

  poweredBy: {} as ViewStyle,
  poweredByText: {
    color: color.module().yellowPages[2],
    marginRight: 5,
  } as TextStyle,
  poweredByLogo: {} as ViewStyle,

  screenHead: {
    fontSize: 40,
    color: color.module().yellowPages[0],
    lineHeight: 48,
    marginTop: 13,
  } as TextStyle,
  sectionHead: {
    fontSize: 18,
    color: color.module().yellowPages[0],
    fontWeight: "bold",
    marginTop: availableWidth * 0.47,
    textTransform: "uppercase",
  } as TextStyle,
  p: {
    fontSize: 12,
    color: color.module().yellowPages[0],
  } as TextStyle,

  unitList: {
    marginTop: 40,
  } as ViewStyle,
  unitScroll: {
    paddingBottom: 20,
  } as ViewStyle,
  tags: {
    marginVertical: 10,
    flexDirection: "row",
  } as ViewStyle,

  telImg: {
    height: 140,
    width: 290,
    position: "absolute",
    bottom: 50,
    right: 25,
    opacity: 0.7,
  } as ImageStyle,
  tjuArch: {
    position: "absolute",
    width: availableWidth * 0.8,
    height: availableWidth * 0.5,
    right: 0,
    top: 0,
  } as ImageStyle,
}
