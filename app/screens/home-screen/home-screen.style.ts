import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { layoutParam } from "../../theme"

export default {
  avatar: {
    borderRadius: 40,
    height: 40,
    width: 40,
  } as ImageStyle,
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  userName: {
    marginTop: 2
  } as TextStyle,
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical
  } as ViewStyle,
  headerBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  } as ViewStyle,
  moduleButton: {
    marginRight: 24,
  } as ViewStyle,
  horiScrollSelf: {
    overflow: 'visible'
  } as ViewStyle,
  horiScroll: {
    alignSelf: 'stretch',
    flexDirection: "row",
    justifyContent: 'space-between',
    overflow: 'visible',
  } as ViewStyle,
  sectionHead: {
    marginBottom: 12,
    marginTop: 24,
  } as ViewStyle,
  blockWithMarginRight: {
    marginRight: 12,
  } as ViewStyle,
  mainView: {
    flex: 1,
  } as ViewStyle,
  curveView: {
    marginTop: -30
  } as ViewStyle,
  stat: {
    marginTop: 30
  } as ViewStyle,
  moreButton: {
    marginTop: 30,
    alignSelf: "stretch"
  } as ViewStyle
}
