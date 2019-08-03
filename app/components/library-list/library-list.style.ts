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
    borderTopRightRadius: layoutParam.borderRadius,
    borderBottomRightRadius: layoutParam.borderRadius,
    overflow: "hidden",
  } as ViewStyle,
  screen: {
    backgroundColor: color.background,
  },
  modal: {
    width: 280,
    alignSelf: "center",
    elevation: 90,
  } as ViewStyle,
  modalCard: {
    padding: 32,
    height: 433,
    backgroundColor: color.card,
    borderTopRightRadius: layoutParam.borderRadius,
    borderBottomRightRadius: layoutParam.borderRadius,
    justifyContent: "space-between",
    elevation: 90,
    overflow: "hidden",
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
    height: 0.5,
    alignSelf: "stretch",
    backgroundColor: color.lightGrey,
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
    textTransform: "uppercase",
    color: color.lightGrey,
  } as TextStyle,
  bookAttrValue: {
    fontSize: 12,
    color: color.lightGrey,
    fontWeight: "bold",
  } as TextStyle,

  renewArea: {
    marginTop: 15,
  } as ViewStyle,
  modalButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  modalButtonIcon: {
    fontSize: 20,
  },
  renewCaveat: {
    fontSize: 14,
    color: color.primary,
    height: 60,
  } as TextStyle,

  tjuBadge: {
    position: "absolute",
    right: -50,
    bottom: -50,
  } as ViewStyle,

}
