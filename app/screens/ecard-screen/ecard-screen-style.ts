import { color, layoutParam } from "../../theme"
import { TextStyle, ViewStyle } from "react-native"

export default {
  screen: {
    backgroundColor: color.module.ecard[0],
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
    color: color.module.ecard[1],
    fontWeight: "bold",
    fontSize: 11,
  } as TextStyle,
  statVal: {
    color: color.module.ecard[1],
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
    marginBottom: 18,
    height: 100,
  } as ViewStyle,
  caption: {
    color: color.module.ecard[2],
    textAlign: "center",
    alignItems: "center",
  } as TextStyle,

  loadMoreTouchable: {
    marginVertical: 30,
    justifyContent: "center",
    backgroundColor: color.module.ecard[2],
    alignSelf: "center",
    width: 250,
  } as ViewStyle,
  loadMoreText: {
    color: color.module.ecard[0],
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 14,
  } as TextStyle,
  loadMoreIcon: {
    color: color.module.ecard[0],
    marginRight: 10,
  } as TextStyle,

}
