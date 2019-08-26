import { color, layoutParam } from "../../theme"
import { TextStyle, ViewStyle } from "react-native"

const palette = color.module().ecard

export default {
  screen: {
    backgroundColor: palette[0],
  } as ViewStyle,
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingBottom: layoutParam.paddingVertical,
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
    color: palette[1],
    fontWeight: "bold",
    fontSize: 11,
  } as TextStyle,
  statVal: {
    color: palette[1],
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
  snackStyle: {} as ViewStyle,

  ecardBar: {
    marginTop: 32,
    marginBottom: 18,
    height: 100,
  } as ViewStyle,
  caption: {
    color: palette[2],
    textAlign: "center",
    alignItems: "center",
  } as TextStyle,

  loadMoreTouchable: {
    marginVertical: 30,
    justifyContent: "center",
    backgroundColor: palette[2],
    alignSelf: "center",
    width: 250,
    position: "relative",
  } as ViewStyle,
  loadMoreText: {
    color: palette[0],
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 14,
  } as TextStyle,
  loadMoreIcon: {
    color: palette[0],
    marginRight: 10,
  } as TextStyle,

  hint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
  } as ViewStyle,
  hintText: {
    color: palette[2],
  } as TextStyle,
}
