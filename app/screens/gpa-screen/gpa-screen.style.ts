import { color, layoutParam } from "../../theme"
import { TextStyle, ViewStyle } from "react-native"

export default {
  screen: {
    backgroundColor: color.module.gpa[0],
  },
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
    alignItems: "center",
  } as ViewStyle,
  radarContainer: {
    height: 300,
    backgroundColor: "transparent",
  } as ViewStyle,
  stat: {
    marginBottom: -10,
  },
  curve: {
    marginBottom: 50,
  },
  modal: {
    backgroundColor: color.module.gpa[1],
    borderRadius: layoutParam.borderRadius,
    marginHorizontal: 20,
    marginVertical: 50,
  } as ViewStyle,
  gpaInfoContent: {
    padding: 20,
  } as ViewStyle,
  modalText: {
    color: color.module.gpa[0],
  } as TextStyle,
  orderTab: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  } as ViewStyle,
  orderTouchable: {
    borderRadius: 3,
  },
  orderTexts: {
    borderRadius: 3,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  orderIcon: {
    color: color.module.gpa[2],
    marginRight: 5,
  } as TextStyle,
  orderTextPrefix: {
    color: color.module.gpa[2],
    marginRight: 4,
  } as TextStyle,
  orderTextSuffix: {
    color: color.module.gpa[2],
    fontWeight: "bold",
  } as TextStyle,

  list: {
    marginHorizontal: 15,
  } as ViewStyle,
  listContainer: {
    alignItems: "center",
  } as ViewStyle,
  snackStyle: {
    marginBottom: 10,
  } as ViewStyle,

}
