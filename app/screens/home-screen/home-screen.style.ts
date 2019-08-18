import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"

export default {
  screen: {
    paddingTop: layoutParam.statusBarHeight,
  } as ViewStyle,
  avatar: {
    borderRadius: 20,
    height: 40,
    width: 40,
    marginLeft: 6,
  } as ImageStyle,
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  userName: {
    marginTop: 2,
    color: color.primary,
  } as TextStyle,
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
  headerBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  } as ViewStyle,
  headerGroup: {
    flexDirection: "row",
  } as ViewStyle,
  moduleButton: {
    marginRight: 16,
  } as ViewStyle,
  sectionHead: {
    marginBottom: 13,
    marginTop: 18,
  } as ViewStyle,
  blockWithMarginRight: {
    marginRight: 10,
  } as ViewStyle,
  mainView: {
    flex: 1,
  } as ViewStyle,
  curveView: {} as ViewStyle,
  stat: {
    marginTop: 26,
  } as ViewStyle,
  moreButton: {
    marginTop: 26,
    alignSelf: "stretch",
  } as ViewStyle,

  horiScrollSelf: {
    overflow: "visible",
  } as ViewStyle,
  horiScroll: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "visible",
  } as ViewStyle,
}
