import * as React from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { LibraryBlock } from "../library-block"
import { Ian } from "../ian"
import Touchable from "react-native-platform-touchable"
import { color } from "../../theme"
import Modal from "react-native-modal"
import { Text } from "../text"
import { Button } from "../button"
import ss from "./book-list.style"
import {twtGet} from "../../services/twt-fetch";
import Toast from "react-native-root-toast";
import toastOptions from "../../theme/toast";

export interface BookListProps {
  style?: ViewStyle
  data
  status
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
          animationInTiming={400}
          animationOutTiming={300}
          onBackdropPress={this.toggleModal}
          useNativeDriver={true}
        >
          <View
            style={ss.modal}
          >

            <View>
              <Text text={chosenBook['title']} style={ss.bookTitle}/>
              <Text text={chosenBook['author']} style={ss.bookAuthor}/>
              <View style={ss.hr}/>
            </View>

            <View>
              <View style={ss.bookAttrs}>
                <View style={ss.bookAttrPair}>
                  <Text text={"Call No."} style={ss.bookAttrKey}/>
                  <Text text={chosenBook['callno']} style={ss.bookAttrValue}/>
                </View>
                <View style={ss.bookAttrPair}>
                  <Text text={"Type"} style={ss.bookAttrKey}/>
                  <Text text={chosenBook['type']} style={ss.bookAttrValue}/>
                </View>
                <View style={ss.bookAttrPair}>
                  <Text text={"Location"} style={ss.bookAttrKey}/>
                  <Text text={chosenBook['local']} style={ss.bookAttrValue}/>
                </View>
                <View style={ss.bookAttrPair}>
                  <Text text={"Borrowed At"} style={ss.bookAttrKey}/>
                  <Text text={chosenBook['loanTime']} style={ss.bookAttrValue}/>
                </View>
                <View style={ss.bookAttrPair}>
                  <Text text={"Return By"} style={ss.bookAttrKey}/>
                  <Text text={chosenBook['returnTime']} style={ss.bookAttrValue}/>
                </View>
              </View>

              <Button preset="link" onPress={() => {
                twtGet(`v1/library/renew${chosenBook['barcode']}`)
                  .then((response) => response.json())
                  .then((responseJson) => {
                    Toast.show(<Text text={responseJson.message} style={{ color: toastOptions.primary.textColor }}/> as any, toastOptions.primary)
                    console.log(responseJson)
                  })
              }}>
                <Text text="RENEW"/>
              </Button>
            </View>

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
