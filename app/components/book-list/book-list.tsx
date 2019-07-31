import * as React from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { LibraryBlock } from "../library-block"
import { Ian } from "../ian"

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

export class BookList extends React.Component<BookListProps, {}> {

  _keyExtractor = (item, index) => String(item.id);

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
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <LibraryBlock
              style={libraryBlockStyle}
              bookName={item['title']}
              local={item['local']}
              returnTime={item['returnTime']}
            />
          )}
          ListEmptyComponent={() => <Ian tx="library.noBooks"/>}
        />
      </View>
    )
  }
}
