import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"

export interface LibraryBlockProps {
  style?: ViewStyle
  bookName?: string
  borrowedTime?: string
  daysLeft: number
}

export function LibraryBlock(props: LibraryBlockProps) {
  const { style, bookName, borrowedTime, daysLeft } = props
  const colorHash = (str: string) => {
    return (str.length) % (color.bookStrip.length)
  }
  const bookColor: number = colorHash(bookName)
  const predefinedStyle: ViewStyle = {
    width: 120,
    height: 170,
    borderRadius: layoutParam.borderRadius,
    flexDirection: "row",
    overflow: "hidden"
  }
  const decoStripStyle: ViewStyle = {
    width: 5,
    backgroundColor: color.bookStrip[bookColor],
  }
  const mainContentStyle: ViewStyle = {
    paddingHorizontal: 11,
    paddingVertical: 30,
    width: 115,
    backgroundColor: color.book
  }
  const BASE: TextStyle = {
    color: color.primary,
  }
  const h1: TextStyle = { ...BASE, fontSize: 15, height: 85, fontWeight: "bold" }
  const small: TextStyle = { ...BASE, fontSize: 11, }
  const additionalInfo: TextStyle = { height: 20 }
  return (
    <View style={[predefinedStyle, style]}>
      <View style={decoStripStyle} />
      <View style={mainContentStyle}>
        <Text numberOfLines={3} text={bookName} style={h1}/>
        <Text text={borrowedTime} style={small}/>
        <Text style={additionalInfo}>
          <Text tx={"common.time.remaining"} style={small} />
          <Text text={String(daysLeft)} style={small} />
          <Text tx={"common.time.daysLeft"} style={small} />
        </Text>
      </View>
    </View>
  )
}
