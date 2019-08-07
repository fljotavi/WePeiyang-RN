import { TextStyle, ViewStyle, Platform } from "react-native"
import { color } from "./color"

export const layoutParam = {
  paddingHorizontal: 22,
  paddingVertical: 22,
  footerHeight: 55,
  borderRadius: 9,
  statusBarHeight: Platform.select({ ios: 0, android: 26 }), // TODO: Change to device-specific calculations
}

export const ssGlobal = {
  topBar: {
    container: {
      paddingHorizontal: 14,
      paddingVertical: 16,
      alignSelf: 'stretch',
      flexDirection: "row",
      justifyContent: "space-between",
    } as ViewStyle,
    side: {
      flexDirection: "row",
    } as ViewStyle,
    icon: {
      fontSize: 26,
      marginHorizontal: 6,
    } as TextStyle,
  },
  login: {
    screen: {

    } as ViewStyle,
    container: {
      paddingHorizontal: layoutParam.paddingHorizontal,
      paddingVertical: layoutParam.paddingVertical,
      flex: 1,
      justifyContent: "space-between",
    } as ViewStyle,
    headerBar: {
      marginBottom: 13,
    } as ViewStyle,
    button: {
      paddingHorizontal: 34,
    } as ViewStyle,
    heading: {
      marginTop: 8,
      fontWeight: "normal",
    } as TextStyle,
    subhead: {
      marginLeft: 4,
      color: color.lightGrey,
    } as TextStyle,
    input: {
      marginBottom: 3,
    } as ViewStyle,
    byText: {
      fontWeight: "bold",
      letterSpacing: -1,
      fontSize: 13,
    } as TextStyle,
    by: {
      marginTop: 17,
      marginBottom: 7,
    } as ViewStyle,
    buttonRow: {
      marginTop: 17,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    } as ViewStyle
  }
}
