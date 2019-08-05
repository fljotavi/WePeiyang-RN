import { TextStyle, ViewStyle } from "react-native"
import {color} from "./color";

export const layoutParam = {
  paddingHorizontal: 24,
  paddingVertical: 24,
  footerHeight: 60,
  borderRadius: 10,
  fixedMobileWidth: 400,
  statusBarHeight: 26, // TODO: Change to device-specific calculations
}

export const ssGlobal = {
  topBar: {
    container: {
      paddingHorizontal: 15,
      paddingVertical: 17,
      alignSelf: 'stretch',
      flexDirection: "row",
      justifyContent: "space-between",
    } as ViewStyle,
    side: {
      flexDirection: "row",
    } as ViewStyle,
    icon: {
      fontSize: 30,
      marginHorizontal: 8,
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
      marginBottom: 15,
    } as ViewStyle,
    button: {
      paddingHorizontal: 40,
    } as ViewStyle,
    heading: {
      marginTop: 8,
      fontWeight: "normal",
    } as TextStyle,
    subhead: {
      marginLeft: 5,
      color: color.lightGrey,
    } as TextStyle,
    input: {
      marginBottom: 4,
    } as ViewStyle,
    byText: {
      fontWeight: "bold",
      letterSpacing: -1,
      fontSize: 15,
    } as TextStyle,
    by: {
      marginTop: 20,
      marginBottom: 10,
    } as ViewStyle,
    buttonRow: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    } as ViewStyle
  }
}
