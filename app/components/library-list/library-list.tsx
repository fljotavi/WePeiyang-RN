/*
 * Library List
 * Created by Tzingtao Chow
 * ---
 *
 * Library Lists 是显示在主页上的已借阅书籍。
 * 此组件也包含了点击每一本书后出现 Modal 的逻辑。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { FlatList, View, ViewStyle } from "react-native"
import { LibraryBlock } from "../library-block"
import { Ian } from "../ian"
import Touchable from "react-native-platform-touchable"
import { color, shadowPresets } from "../../theme"
import Modal from "react-native-modal"
import ss from "./library-list.style"
import { LibraryModal } from "../library-modal"

export interface BookListProps {
  style?: ViewStyle
  compData?
}

class _LibraryList extends React.Component<BookListProps, {}> {
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
    const { style, compData } = this.props

    if (!compData.userInfo.data.accounts.lib) {
      return (
        <View style={[ss.predefinedStyle, style]}>
          <Ian tx="library.notBound" />
        </View>
      )
    }

    if (compData.library.status !== "VALID") {
      return (
        <View style={[ss.predefinedStyle, style]}>
          <Ian tx="data.noAvailableData" />
        </View>
      )
    }

    const data = compData.library.data
    if (data.books.length <= 0) {
      return (
        <View style={[ss.predefinedStyle, style]}>
          <Ian tx="library.noBooks" />
        </View>
      )
    }

    let modal

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
        <LibraryModal chosenBook={chosenBook} closeModal={this.closeModal} />
      </Modal>
    )

    return (
      <View style={[ss.predefinedStyle, style]}>
        {modal}
        <FlatList
          style={ss.listStyle}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data.books}
          keyExtractor={this._keyExtractor}
          renderItem={({ item, index }) => (
            <Touchable
              foreground={Touchable.Ripple(color.background)}
              style={[ss.libraryBlockStyle, shadowPresets.float]}
              delayPressIn={0}
              onPress={() => {
                this.openModal()
                this.setState({ bookIndex: index })
              }}
            >
              <LibraryBlock bookName={item.title} local={item.local} returnTime={item.returnTime} />
            </Touchable>
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    compData: state.dataReducer,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const LibraryList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_LibraryList)
