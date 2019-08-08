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
    borderRadius: layoutParam.borderRadius * 2,
    justifyContent: "space-between",
    overflow: "hidden",
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
}
