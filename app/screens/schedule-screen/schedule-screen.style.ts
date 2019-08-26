import { TextStyle, ViewStyle } from "react-native"
import { color, layoutParam } from "../../theme"

export default {
  screen: {
    backgroundColor: color.background,
  },
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
  title: {} as TextStyle,
  titleWeek: {
    color: color.lightGrey,
  } as TextStyle,
  dotmapContainer: {
    alignItems: "center",
    marginRight: 25,
  } as ViewStyle,
  dotmapText: {
    color: color.lightGrey,
    fontSize: 10,
    fontWeight: "bold",
  } as TextStyle,
  dotmapTextActive: {
    color: color.primary,
    fontSize: 10,
    fontWeight: "bold",
  } as TextStyle,
  dotmap: {
    marginBottom: 10,
  } as ViewStyle,
  dotBar: {
    marginTop: 20,
  } as ViewStyle,

  dayRow: {
    marginBottom: 20,
  } as ViewStyle,
  dayRowText: {
    marginBottom: 10,
  } as TextStyle,
  main: {
    alignSelf: "stretch",
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  } as ViewStyle,
  column: {} as ViewStyle,
  scheduleIan: {
    flex: 1,
    backgroundColor: color.washed,
    borderRadius: layoutParam.borderRadius / 1.5,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  scheduleIanText: {
    color: color.lightGrey,
    fontSize: 30,
  } as TextStyle,
  modal: {
    width: 250,
    alignSelf: "center",
  } as ViewStyle,
  temp: {
    color: "rgb(45,70,13)",
  } as ViewStyle,
}
