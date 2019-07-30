import { color, layoutParam } from "../../theme"
import { TextStyle, ViewStyle } from "react-native"

export default {
  topBar: {
  },
  topBarIcon: {
    color: color.primaryLighter,
  },

  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
    alignItems: "center",
  } as ViewStyle,

  radar: {

  } as ViewStyle,
  stat: {
    marginBottom: -10,
  },
  curve: {
    marginBottom: 50,
  },

  orderTab: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  } as ViewStyle,
  orderTouchable: {
    backgroundColor: color.washed,
    borderRadius: 3,
  },
  orderTexts: {
    borderRadius: 3,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  orderIcon: {
    color: color.lightGrey,
    marginRight: 5,
  } as TextStyle,
  orderTextPrefix: {
    color: color.lightGrey,
    fontSize: 10,
    letterSpacing: 3,
    marginRight: 4,
    textTransform: "uppercase",
  } as TextStyle,
  orderTextSuffix: {
    color: color.lightGrey,
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: "bold",
    textTransform: "uppercase",
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
