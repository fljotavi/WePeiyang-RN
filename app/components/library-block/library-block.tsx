import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"
import { differenceInCalendarDays } from "date-fns"

export interface LibraryBlockProps {
  style?: ViewStyle
  bookName?: string
  local?: string
  returnTime?: string
}

export function LibraryBlock(props: LibraryBlockProps) {
  const { style, bookName, local, returnTime } = props
  const colorHash = (str: string) => {
    return (str.length) % (color.hash.bookStrip.length)
  }
  const bookColor: number = colorHash(bookName)
  const predefinedStyle: ViewStyle = {
    width: 120,
    height: 170,
    borderTopRightRadius: layoutParam.borderRadius,
    borderBottomRightRadius: layoutParam.borderRadius,
    flexDirection: "row",
    overflow: "hidden"
  }
  const decoStripStyle: ViewStyle = {
    width: 5,
    backgroundColor: color.hash.bookStrip[bookColor],
  }
  const mainContentStyle: ViewStyle = {
    paddingHorizontal: 11,
    paddingVertical: 30,
    width: 115,
    backgroundColor: color.card
  }
  const BASE: TextStyle = {
    color: color.primary,
  }
  const h1: TextStyle = { ...BASE, fontSize: 15, height: 85, fontWeight: "bold" }
  const small: TextStyle = { ...BASE, fontSize: 11, }
  const additionalInfo: TextStyle = { height: 20 }
  return (
    <View style={[predefinedStyle, style]} pointerEvents="box-only">
      <View style={decoStripStyle} />
      <View style={mainContentStyle}>
        <Text numberOfLines={3} text={bookName} style={h1}/>
        <Text text={local} numberOfLines={1} style={small}/>
        <Text style={additionalInfo}>
          <Text tx={"common.time.remaining"} style={small} />
          <Text text={String(differenceInCalendarDays(new Date(returnTime), Date.now()))} style={small} />
          <Text tx={"common.time.daysLeft"} style={small} />
        </Text>
      </View>
    </View>
  )
}
