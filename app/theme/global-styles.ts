import { TextStyle, ViewStyle } from "react-native"

export const layoutParam = {
  paddingHorizontal: 24,
  paddingVertical: 24,
  footerHeight: 60,
  borderRadius: 10,
  fixedMobileWidth: 400,
}

export const ssGlobal = {
  topBar: {
    container: {
      padding: 18,
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
  }
}
