import { color, layoutParam } from "../../theme"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"

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
    position: "absolute"
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
    height: 90,
    width: 90,
  } as ImageStyle,
  shortcutModulePanel: {
    borderRadius: layoutParam.borderRadius,
    backgroundColor: color.card,
    marginTop: 40,
    marginBottom: 20,
    paddingVertical: 30,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    width: '100%',
    maxWidth: 500,
    elevation: 99,
  } as ViewStyle,
  bindingBar: {
    marginTop: 10,
    elevation: 99,
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
