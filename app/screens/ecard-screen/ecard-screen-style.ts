import { color, layoutParam } from "../../theme"
import { TextStyle, ViewStyle } from "react-native"

export default {
  screen: {
    backgroundColor: color.module.ecard,
  } as ViewStyle,
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingBottom: layoutParam.paddingVertical
  } as ViewStyle,

  stat: {
    marginBottom: 32,
    flexDirection: "row",
    justifyContent: "center",
  } as ViewStyle,
  statPair: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  statKey: {
    color: color.white(0.35),
    fontWeight: "bold",
  } as TextStyle,
  statVal: {
    color: color.white(0.95),
  } as TextStyle,
  yen: {
    marginRight: 10,
  } as TextStyle,

  list: {
    marginTop: 18,
  } as ViewStyle,
  listContainer: {
    alignItems: "center",
  } as ViewStyle,
  snackStyle: {

  } as ViewStyle,

  ecardBar: {
    marginTop: 32,
    marginBottom: 18
  } as ViewStyle,
  caption: {
    color: color.white(0.35),
    textAlign: "center",
    alignItems: "center",
  } as TextStyle,

  loadMoreTouchable: {
    marginVertical: 30,
    justifyContent: "center",
    backgroundColor: color.white(0.95),
    alignSelf: "center",
    width: 250,
  } as ViewStyle,
  loadMoreText: {
    color: color.module.ecard,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 14,
  } as TextStyle,
  loadMoreIcon: {
    color: color.module.ecard,
    marginRight: 10,
  } as TextStyle,

}
