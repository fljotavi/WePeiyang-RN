/*
 * Search Result
 * Created by Tzingtao Chow
 * ---
 *
 * Search Result 渲染由 Search Snacks 组成的搜索结果列表。
 *
 */

import * as React from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { Text } from "../../components/text"
import { SearchSnack } from "./search-snack"
import { Ian } from "../../components/ian"

export interface SearchResultProps {
  style?: ViewStyle
  result?
  show
  navigation
}

export function SearchResult(props: SearchResultProps) {
  const { style, result, show, navigation } = props
  if (!show) return <View />

  const ss = {
    view: {
      justifyContent: "center",
      marginTop: 20,
    } as ViewStyle,
    sectionHead: {
      color: color.module().yellowPages[1],
      marginVertical: 10,
    } as TextStyle,
    list: {} as ViewStyle,
    listContainer: {} as ViewStyle,
    snack: {
      marginBottom: 10,
    } as ViewStyle,
  }

  const _keyExtractor = (item, index) => String(index)

  return (
    <View style={[ss.view, style]}>
      <Text text="Departments" style={ss.sectionHead} preset="lausanne" />
      <FlatList
        style={ss.list}
        contentContainerStyle={ss.listContainer}
        data={result.deps}
        keyExtractor={_keyExtractor}
        renderItem={({ item }) => (
          <SearchSnack
            title={item.body.department}
            subtitle={item.body.category}
            style={ss.snack}
            onPress={() => {
              navigation.navigate("department", {
                origin: "DEPARTMENT",
                id: item.id,
                indices: item.body.indices,
              })
            }}
          />
        )}
        ListEmptyComponent={() => (
          <Ian
            text="No relating departments"
            palette={[color.module().yellowPages[2], color.module().yellowPages[0]]}
          />
        )}
      />
      <Text text="Units" style={ss.sectionHead} preset="lausanne" />
      <FlatList
        style={ss.list}
        contentContainerStyle={ss.listContainer}
        data={result.units}
        keyExtractor={_keyExtractor}
        renderItem={({ item }) => (
          <SearchSnack
            onPress={() => {
              navigation.navigate("department", {
                origin: "UNIT",
                id: item.id,
                indices: item.body.indices,
              })
            }}
            title={item.body.unit}
            subtitle={item.body.department}
            style={ss.snack}
          />
        )}
        ListEmptyComponent={() => (
          <Ian
            text="No relating offices"
            palette={[color.module().yellowPages[2], color.module().yellowPages[0]]}
          />
        )}
      />
    </View>
  )
}
