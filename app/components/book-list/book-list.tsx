import * as React from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { LibraryBlock } from "../library-block"
import { color, layoutParam } from "../../theme"

export interface BookListProps {
  style?: ViewStyle
  data
  status
}

const predefinedStyle: ViewStyle = {
  overflow: "visible"
}

const listStyle: ViewStyle = {
  overflow: "visible"
}

const libraryBlockStyle: ViewStyle = {
  marginRight: 12
}

const emptyBlockStyle: ViewStyle = {
  backgroundColor: color.washed,
  borderRadius: layoutParam.borderRadius,
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
}

const emptyBlockText: TextStyle = {
  color: color.lightGrey,
  fontWeight: "bold",
  textTransform: "uppercase",
}

export class BookList extends React.Component<BookListProps, {}> {

  render() {
    const { style, data, status } = this.props

    if (status !== "VALID") {
      return <View />
    }

    return (
      <View style={[predefinedStyle, style]}>
        <FlatList
          style={listStyle}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data.books}
          renderItem={({ item }) => (
            <LibraryBlock style={libraryBlockStyle} bookName={item['title']} local={item['local']} returnTime={item['returnTime']} />
          )}
          ListEmptyComponent={() => <View style={emptyBlockStyle}>
            <Text style={emptyBlockText} tx="schedule.noBooks"/>
          </View>}
        />
      </View>
    )
  }
}
