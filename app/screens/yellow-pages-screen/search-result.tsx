/*
 * Search Result
 * Created by Tzingtao Chow
 * ---
 *
 *
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
    } as ViewStyle,
    sectionHead: {
      color: color.module.yellowPages[1],
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
            title={item.department}
            subtitle={item.category}
            style={ss.snack}
            onPress={() => {
              navigation.navigate("department", {
                indices: item.indices,
              })
            }}
          />
        )}
        ListEmptyComponent={() => (
          <Ian
            text="No relating departments"
            palette={[color.module.yellowPages[2], color.module.yellowPages[0]]}
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
          <SearchSnack title={item.unit} subtitle={item.department} style={ss.snack} />
        )}
        ListEmptyComponent={() => (
          <Ian
            text="No relating offices"
            palette={[color.module.yellowPages[2], color.module.yellowPages[0]]}
          />
        )}
      />
    </View>
  )
}
