import { TextStyle, ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"

export default {
  predefinedStyle: {
    overflow: "visible"
  } as ViewStyle,
  listStyle: {
    overflow: "visible"
  } as ViewStyle,
  courseBlockStyle: {
    marginRight: 12
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
    borderRadius: layoutParam.borderRadius,
    justifyContent: "space-between",
    elevation: 90,
    overflow: "hidden",
  } as ViewStyle,

  courseTitle: {
    fontSize: 30,
    lineHeight: 40,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    color: color.background,
  } as TextStyle,
  courseTutor: {
    color: color.background,
  } as TextStyle,
}
