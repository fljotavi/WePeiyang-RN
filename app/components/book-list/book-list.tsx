import * as React from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { LibraryBlock } from "../library-block"
import { Ian } from "../ian"
import Touchable from "react-native-platform-touchable"
import { color, layoutParam } from "../../theme"
import Modal from "react-native-modal"
import { Text } from "../text"
import { Button } from "../button"

export interface BookListProps {
  style?: ViewStyle
  data
  status
}

const ss = {
  predefinedStyle: {
    overflow: "visible"
  } as ViewStyle,
  listStyle: {
    overflow: "visible"
  } as ViewStyle,
  libraryBlockStyle: {
    marginRight: 12,
    borderRadius: layoutParam.borderRadius,
    overflow: "hidden",
  } as ViewStyle,
  screen: {
    backgroundColor: color.background,
  },
  modal: {
    padding: 20,
    backgroundColor: color.card,
    borderRadius: layoutParam.borderRadius,
    width: 280,
    height: 460,
    alignSelf: "center",
  } as ViewStyle,
}

export class BookList extends React.Component<BookListProps, {}> {

  state = {
    isModalVisible: false,
    bookIndex: 1,
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  _keyExtractor = (item) => String(item.id);

  render() {
    const { style, data, status } = this.props
    console.log("Lib", data)
    let chosenBook = data.books[this.state.bookIndex]

    if (status !== "VALID") {
      return <View />
    }

    return (
      <View style={[ss.predefinedStyle, style]}>

        <Modal
          isVisible={this.state.isModalVisible}
          backdropColor={ss.screen.backgroundColor}
          animationIn={"flipInY"}
          animationOut={"flipOutY"}
          onBackdropPress={this.toggleModal}
          useNativeDriver={true}
        >
          <View
            style={ss.modal}
          >
            <Text text={chosenBook['title']} preset="h2" />
            <Button text="Close" onPress={this.toggleModal} />
          </View>
        </Modal>

        <FlatList
          style={ss.listStyle}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data.books}
          keyExtractor={this._keyExtractor}
          renderItem={({ item, index }) => (
            <Touchable
              foreground={Touchable.Ripple(color.background)}
              style={ss.libraryBlockStyle}
              delayPressIn={0}
              onPress={() => {
                this.toggleModal()
                this.setState({ bookIndex: index })
              }}
            >
              <LibraryBlock
                bookName={item['title']}
                local={item['local']}
                returnTime={item['returnTime']}
              />
            </Touchable>
          )}
          ListEmptyComponent={() => <Ian tx="library.noBooks"/>}
        />
      </View>
    )
  }
}
