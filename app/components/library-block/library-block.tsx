/*
 * Library Block
 * Created by Tzingtao Chow
 * ---
 *
 * 一个 Library Block 绘制一本形象的书。
 * 它目前被显示在 Home Screen 的借阅架中。
 * 为了实现点击详情和续借等功能，它通常需要被 Library List 组件包含显示。
 *
 */

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
    return str.length % color.hash.bookStrip.length
  }
  const bookColor: number = colorHash(bookName)
  const predefinedStyle: ViewStyle = {
    width: 110,
    height: 158,
    borderTopRightRadius: layoutParam.borderRadius,
    borderBottomRightRadius: layoutParam.borderRadius,
    flexDirection: "row",
    overflow: "hidden",
  }
  const decoStripStyle: ViewStyle = {
    width: 5,
    backgroundColor: color.hash.bookStrip[bookColor],
  }
  const mainContentStyle: ViewStyle = {
    paddingHorizontal: 10,
    paddingVertical: 26,
    width: 105,
    backgroundColor: color.card,
  }
  const BASE: TextStyle = {
    color: color.primary,
  }

  const h1: TextStyle = { ...BASE, fontSize: 14, height: 77, fontWeight: "bold" }
  const small: TextStyle = { ...BASE, fontSize: 10 }
  const additionalInfo: TextStyle = { height: 16 }
  return (
    <View style={[predefinedStyle, style]} pointerEvents="box-only">
      <View style={decoStripStyle} />
      <View style={mainContentStyle}>
        <Text numberOfLines={3} text={bookName} style={h1} />
        <Text text={local} numberOfLines={1} style={small} />
        <Text style={additionalInfo}>
          <Text tx={"common.time.remaining"} style={small} />
          <Text
            text={String(differenceInCalendarDays(new Date(returnTime), Date.now()))}
            style={small}
          />
          <Text tx={"common.time.daysLeft"} style={small} />
        </Text>
      </View>
    </View>
  )
}
