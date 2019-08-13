import { TextStyle, ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"

export default {
  predefinedStyle: {
    overflow: "visible",
  } as ViewStyle,
  listStyle: {
    overflow: "visible",
  } as ViewStyle,
  libraryBlockStyle: {
    backgroundColor: color.washed,
    marginRight: 13,
    borderTopRightRadius: layoutParam.borderRadius,
    borderBottomRightRadius: layoutParam.borderRadius,
  } as ViewStyle,
  screen: {
    backgroundColor: color.background,
  },
  modal: {
    width: 250,
    alignSelf: "center",
  } as ViewStyle,
  modalCard: {
    padding: 28,
    height: 390,
    backgroundColor: color.card,
    borderTopRightRadius: layoutParam.borderRadius * 2,
    borderBottomRightRadius: layoutParam.borderRadius * 2,
    justifyContent: "space-between",
  } as ViewStyle,
  bookTitle: {
    fontSize: 27,
    lineHeight: 36,
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
    marginTop: 0,
    flexWrap: "wrap",
    flexDirection: "row",
  } as ViewStyle,
  bookAttrPair: {
    marginBottom: 7,
    marginRight: 14,
  } as ViewStyle,
  bookAttrKey: {
    fontSize: 9,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: color.lightGrey,
  } as TextStyle,
  bookAttrValue: {
    fontSize: 11,
    color: color.lightGrey,
    fontWeight: "bold",
  } as TextStyle,

  renewArea: {
    marginTop: 13,
  } as ViewStyle,
  modalButton: {
    alignSelf: "center",
  } as ViewStyle,
  modalButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  modalButtonIcon: {
    fontSize: 20,
    color: color.primary,
  },
  renewCaveat: {
    fontSize: 12,
    textAlign: "center",
    color: color.primary,
  } as TextStyle,

  tjuBadge: {
    position: "absolute",
    right: -50,
    bottom: -50,
  } as ViewStyle,
}
