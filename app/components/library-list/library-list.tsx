import * as React from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { LibraryBlock } from "../library-block"
import { Ian } from "../ian"
import Touchable from "react-native-platform-touchable"
import { color } from "../../theme"
import Modal from "react-native-modal"
import { Text } from "../text"
import { Button } from "../button"
import ss from "./library-list.style"
import { twtGet } from "../../services/twt-fetch"
import Toast from "react-native-root-toast"
import toastOptions from "../../theme/toast"
import { TjuBadge } from "../tju-badge"
export interface BookListProps {
  style?: ViewStyle
  data
  status
}

export class LibraryList extends React.Component<BookListProps, {}> {
  state = {
    isModalVisible: false,
    userInformed: false,
    bookIndex: 0,
  }

  openModal = () => {
    this.setState({ isModalVisible: true })
  }
  closeModal = () => {
    this.setState({ isModalVisible: false, userInformed: false })
  }

  _keyExtractor = item => String(item.id)

  render() {
    const { style, data, status } = this.props

    if (status !== "VALID") {
      return <View />
    }

    let modal
    if (data.books.length > 0) {
      let chosenBook = data.books[this.state.bookIndex]
      modal = (
        <Modal
          isVisible={this.state.isModalVisible}
          backdropColor={ss.screen.backgroundColor}
          backdropOpacity={0.9}
          animationIn={"fadeInUp"}
          animationOut={"fadeOutUp"}
          animationInTiming={400}
          animationOutTiming={300}
          backdropTransitionOutTiming={0}
          onBackButtonPress={this.closeModal}
          onBackdropPress={this.closeModal}
          useNativeDriver={true}
          style={ss.modal}
        >
          <View style={ss.modalCard}>
            <TjuBadge style={ss.tjuBadge} fill={color.black(0.02)} height={310} width={270} />

            <View>
              <Text text={chosenBook.title} style={ss.bookTitle} selectable={true} />
              <Text text={chosenBook.author} style={ss.bookAuthor} selectable={true} />
            </View>

            <View>
              <View style={ss.bookAttrs}>
                <View style={ss.bookAttrPair}>
                  <Text text={"Call No."} style={ss.bookAttrKey} />
                  <Text text={chosenBook.callno} style={ss.bookAttrValue} />
                </View>
                <View style={ss.bookAttrPair}>
                  <Text text={"Type"} style={ss.bookAttrKey} />
                  <Text text={chosenBook.type} style={ss.bookAttrValue} />
                </View>
                <View style={ss.bookAttrPair}>
                  <Text text={"Location"} style={ss.bookAttrKey} />
                  <Text text={chosenBook.local} style={ss.bookAttrValue} />
                </View>
                <View style={ss.bookAttrPair}>
                  <Text text={"Borrowed"} style={ss.bookAttrKey} />
                  <Text text={chosenBook.loanTime} style={ss.bookAttrValue} />
                </View>
                <View style={ss.bookAttrPair}>
                  <Text text={"Return By"} style={ss.bookAttrKey} />
                  <Text text={chosenBook.returnTime} style={ss.bookAttrValue} />
                </View>
              </View>
            </View>
          </View>

          <View style={ss.renewArea}>
            {this.state.userInformed && (
              <Text
                style={ss.renewCaveat}
                text="每本书只有三次续借机会，为避免浪费续借机会，建议在临近归还期限时续借。是否仍要继续？"
              />
            )}
            <Button
              preset="lite"
              style={ss.modalButton}
              onPress={() => {
                if (this.state.userInformed) {
                  twtGet(`v1/library/renew${chosenBook.barcode}`)
                    .then(response => response.json())
                    .then(responseJson => {
                      this.closeModal()
                      Toast.show(
                        (
                          <Text
                            text={responseJson.message}
                            style={{ color: toastOptions.primary.textColor }}
                          />
                        ) as any,
                        toastOptions.primary,
                      )
                      console.log(responseJson)
                    })
                } else {
                  this.setState({ userInformed: true })
                }
              }}
            >
              <View style={ss.modalButtonContent}>
                <Text
                  text={this.state.userInformed ? "check" : "update"}
                  preset="i"
                  style={ss.modalButtonIcon}
                />
                <Text text=" " preset="h6" />
                <Text text={this.state.userInformed ? "CONFIRM" : "RENEW"} preset="h6" />
              </View>
            </Button>
          </View>
        </Modal>
      )
    }

    return (
      <View style={[ss.predefinedStyle, style]}>
        {data.books.length > 0 && modal}
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
                this.openModal()
                this.setState({ bookIndex: index })
              }}
            >
              <LibraryBlock bookName={item.title} local={item.local} returnTime={item.returnTime} />
            </Touchable>
          )}
          ListEmptyComponent={() => <Ian tx="library.noBooks" />}
        />
      </View>
    )
  }
}
