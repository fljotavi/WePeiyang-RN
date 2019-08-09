import { TextStyle, ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"

export default {
  predefinedStyle: {
    overflow: "visible",
  } as ViewStyle,
  listStyle: {
    overflow: "visible",
  } as ViewStyle,
  courseBlockStyle: {
    marginRight: 13,
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
    borderRadius: layoutParam.borderRadius * 1.7,
    justifyContent: "space-between",
    overflow: "hidden",
  } as ViewStyle,

  courseTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 5,
    backgroundColor: color.background,
    alignSelf: "flex-start",
    borderRadius: layoutParam.borderRadius / 2.4,
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,

  courseTitle: {
    fontSize: 27,
    lineHeight: 36,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    color: color.background,
  } as TextStyle,
  courseTutor: {
    color: color.background,
  } as TextStyle,

  courseAttrs: {
    marginTop: 0,
    flexWrap: "wrap",
    flexDirection: "row",
  } as ViewStyle,
  courseAttrPair: {
    marginBottom: 7,
    marginRight: 14,
  } as ViewStyle,
  courseAttrKey: {
    fontSize: 9,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: color.background,
  } as TextStyle,
  courseAttrValue: {
    fontSize: 11,
    color: color.background,
    fontWeight: "bold",
  } as TextStyle,

  tjuBadge: {
    position: "absolute",
    right: -50,
    bottom: -50,
  } as ViewStyle,
}
