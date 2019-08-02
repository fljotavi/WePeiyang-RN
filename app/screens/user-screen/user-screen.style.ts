import { color, layoutParam } from "../../theme"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"

let abm1r = 500
let amb2r = 500

export default {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
    alignItems: "center",
  } as ViewStyle,
  headPanel: {
    backgroundColor: color.primary,
    height: 400,
    left: 0,
    right: 0,
    position: "absolute",
    overflow: "hidden",
  } as ViewStyle,
  ambient1: {
    width: abm1r,
    height: abm1r,
    position: "absolute",
    top: -155,
    right: -155,
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: abm1r / 2,
  } as ViewStyle,
  ambient2: {
    width: amb2r,
    height: amb2r,
    position: "absolute",
    top: -288,
    right: -111,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: amb2r / 2,
  } as ViewStyle,
  userInfoPanel: {
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  userName: {
    color: color.washed,
    marginTop: 14,
  } as TextStyle,
  userId: {
    color: color.washed,
    opacity: 0.6,
    marginTop: 10
  } as TextStyle,
  avatar: {
    borderRadius: 999,
    height: 98,
    width: 98,
  } as ImageStyle,
  shortcutModulePanel: {
    borderRadius: layoutParam.borderRadius,
    backgroundColor: color.card,
    marginTop: 40,
    marginBottom: 10,
    paddingVertical: 30,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    width: '100%',
    maxWidth: 500,
  } as ViewStyle,
  bindingBar: {
    marginTop: 13,
  } as ViewStyle,
  logoutButton: {
    width: '100%',
    maxWidth: 500,
    marginVertical: 40,
    elevation: 99,
  } as ViewStyle,
  logoutButtonContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  logoutIcon: {
    color: color.washed,
    marginRight: 10,
    fontSize: 20,
  } as TextStyle,
  logoutText: {
    color: color.washed,
    fontWeight: "bold",
    textTransform: "uppercase",
  } as TextStyle,
}
