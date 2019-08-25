import { color, layoutParam } from "../../theme"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"

const getBgColor = () => {
  console.log("received in ss", color.module())
  return color.module().gpa[0]
}

export default {
  screen: {
    backgroundColor: getBgColor(),
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
    marginTop: 25,
    marginBottom: 50,
  },
  modal: {
    backgroundColor: color.module().gpa[1],
    borderRadius: layoutParam.borderRadius,
    marginHorizontal: 20,
    marginVertical: 50,
  } as ViewStyle,
  gpaInfoContent: {
    padding: 20,
  } as ViewStyle,
  modalText: {
    color: color.module().gpa[0],
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
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  orderIcon: {
    color: color.module().gpa[2],
    marginRight: 5,
  } as TextStyle,
  orderTextPrefix: {
    color: color.module().gpa[2],
    marginRight: 4,
  } as TextStyle,
  orderTextSuffix: {
    color: color.module().gpa[2],
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

  kachiHead: {
    color: color.module().gpa[0],
    marginBottom: 3,
  } as TextStyle,
  kachiPara: {
    color: color.module().gpa[0],
  } as TextStyle,
  kachiHugo: {
    color: color.module().gpa[0],
    marginTop: 10,
    marginBottom: 6,
  } as TextStyle,
  kachiImg: {
    width: 300,
    height: 200,
  } as ImageStyle,
  kachiComic: {
    width: 300,
    height: 200,
  } as ImageStyle,
  kachiSection: {
    marginBottom: 20,
    alignSelf: "stretch",
  } as ViewStyle,
  kachiList: {
    marginVertical: 8,
  } as ViewStyle,
  kachiBoard: {
    marginTop: 50,
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    width: 300,
    borderRadius: layoutParam.borderRadius,
    backgroundColor: color.module().gpa[1],
    alignItems: "flex-start",
  } as ViewStyle,
}
