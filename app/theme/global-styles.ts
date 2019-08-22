import { TextStyle, ViewStyle, Platform } from "react-native"
import { color } from "./color"

export const layoutParam = {
  paddingHorizontal: 22,
  paddingVertical: 22,
  footerHeight: 55,
  borderRadius: 10,
  statusBarHeight: Platform.select({ ios: 0, android: 26 }), // TODO: Change to device-specific calculations
}

export const shadowPresets = {
  large: {
    shadowColor: color.black(1),
    shadowOffset: {
      width: 0,
      height: 45,
    },
    shadowOpacity: 0.07,
    shadowRadius: 45,
  },
  float: {
    shadowColor: color.black(1),
    shadowOffset: {
      width: 0,
      height: 35,
    },
    shadowOpacity: 0.04,
    shadowRadius: 25,
  },
  close: {
    shadowColor: color.black(1),
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.02,
    shadowRadius: 7,
  },
}

export const ssGlobal = {
  loadingSize: Platform.select({ ios: 10, android: 12 }),
  buttonLoadingIndicator: {
    position: "absolute",
    right: -18,
    top: 0,
    bottom: 0,
  } as ViewStyle,

  topBar: {
    container: {
      paddingHorizontal: 10,
      paddingVertical: 16,
      alignSelf: "stretch",
      flexDirection: "row",
      justifyContent: "space-between",
    } as ViewStyle,
    side: {
      flexDirection: "row",
    } as ViewStyle,
    icon: {
      fontSize: 26,
      marginHorizontal: 9,
    } as TextStyle,
  },

  tabBar: {
    tabBar: {
      flexDirection: "row",
      paddingHorizontal: 30,
    } as ViewStyle,
    tabItem: {
      flex: 1,
      alignItems: "center",
      padding: 16,
    } as ViewStyle,
    tabText: {
      fontWeight: "bold",
    } as TextStyle,
  },

  login: {
    screen: {} as ViewStyle,
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
      paddingHorizontal: 45,
      marginRight: 12,
    } as ViewStyle,
    buttonSecondary: {
      paddingHorizontal: 45,
      backgroundColor: color.washed,
    } as ViewStyle,
    buttonText: {
      color: color.background,
    } as TextStyle,
    buttonSecondaryText: {
      color: color.lightGrey,
    } as TextStyle,
    heading: {
      marginTop: 8,
      fontWeight: "normal",
      width: 240,
    } as TextStyle,
    subhead: {
      marginLeft: 4,
      color: color.lightGrey,
    } as TextStyle,
    input: {
      marginBottom: 3,
    } as ViewStyle,
    hint: {
      marginTop: 20,
      color: color.lightGrey,
    } as TextStyle,
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
    } as ViewStyle,
  },
}
