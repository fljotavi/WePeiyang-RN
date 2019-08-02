import { TextStyle, ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"

export default {
  predefinedStyle: {
    overflow: "visible"
  } as ViewStyle,
  listStyle: {
    overflow: "visible"
  } as ViewStyle,
  libraryBlockStyle: {
    marginRight: 12,
    borderRadius: layoutParam.borderRadius,
    overflow: "hidden",
  } as ViewStyle,
  screen: {
    backgroundColor: color.background,
  },
  modal: {
    padding: 32,
    backgroundColor: color.card,
    borderRadius: layoutParam.borderRadius,
    width: 290,
    height: 420,
    alignSelf: "center",
    justifyContent: "space-between",
    elevation: 90,
  } as ViewStyle,
  bookTitle: {
    fontSize: 30,
    lineHeight: 40,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    color: color.primary,
  } as TextStyle,
  bookAuthor: {
    color: color.primary,
  } as TextStyle,
  hr: {
    height: 1,
    alignSelf: "stretch",
    backgroundColor: color.primary,
    marginVertical: 14,
  } as ViewStyle,
  bookAttrs: {
    marginTop: 40,
    flexWrap: "wrap",
    flexDirection: "row",
  } as ViewStyle,
  bookAttrPair: {
    marginBottom: 8,
    marginRight: 15,
  } as ViewStyle,
  bookAttrKey: {
    fontSize: 9,
    letterSpacing: 3,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: color.washed,
  } as TextStyle,
  bookAttrValue: {
    color: color.primary,
    fontSize: 12,
  } as TextStyle,

  renewButton: {
    alignSelf: "baseline",
  }

}
