/*
 * Library Modal
 * Created by Tzingtao Chow
 * ---
 *
 * Library Modals 是点击一本书后
 * 出现的包含书目详细信息和续借功能的对话框。
 *
 */

import * as React from "react"
import { DeviceEventEmitter, TextStyle, View, ViewStyle } from "react-native"
import { color, layoutParam, shadowPresets } from "../../theme"
import { Text } from "../text"
import { Button } from "../button"
import { twtGet } from "../../services/twt-fetch"
import { Toasti } from "../toasti"
import {colorHashByBookName} from "../../utils/common";

export interface LibraryModalProps {
  chosenBook?
  closeModal?
  style?: ViewStyle
}

export class LibraryModal extends React.PureComponent<LibraryModalProps, {}> {
  state = {
    userInformed: false,
  }


  render() {
    const { chosenBook, style, closeModal } = this.props
    const bookColor = colorHashByBookName(chosenBook.title)
    const ss = {
      modalCard: {
        padding: 28,
        height: 390,
        backgroundColor: color.card,
        borderTopRightRadius: layoutParam.borderRadius * 2,
        borderBottomRightRadius: layoutParam.borderRadius * 2,
        justifyContent: "space-between",
        borderLeftColor: color.hash.bookStrip[bookColor],
        borderLeftWidth: 9,
      } as ViewStyle,
      bookTitle: {
        fontSize: 27,
        lineHeight: 36,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 10,
        color: color.primary,
      } as TextStyle,
      bookAuthor: {
        color: color.primary,
      } as TextStyle,
      hr: {
        height: 0.5,
        alignSelf: "stretch",
        backgroundColor: color.lightGrey,
        marginVertical: 14,
      } as ViewStyle,
      bookAttrs: {
        marginTop: 0,
        flexWrap: "wrap",
        flexDirection: "row",
      } as ViewStyle,
      bookAttrPair: {
        marginBottom: 7,
        marginRight: 14,
      } as ViewStyle,
      bookAttrKey: {
        fontSize: 9,
        letterSpacing: 2.5,
        textTransform: "uppercase",
        color: color.lightGrey,
      } as TextStyle,
      bookAttrValue: {
        fontSize: 11,
        color: color.lightGrey,
        fontWeight: "bold",
      } as TextStyle,

      renewArea: {
        marginTop: 13,
      } as ViewStyle,
      modalButton: {
        alignSelf: "center",
      } as ViewStyle,
      modalButtonContent: {
        flexDirection: "row",
        alignItems: "center",
      } as ViewStyle,
      modalButtonIcon: {
        fontSize: 20,
        color: color.primary,
      },
      renewCaveat: {
        fontSize: 12,
        textAlign: "center",
        color: color.primary,
      } as TextStyle,

      tjuBadge: {
        position: "absolute",
        right: -50,
        bottom: -50,
      } as ViewStyle,
    }

    return [
      <View style={[ss.modalCard, shadowPresets.large, style]} key={0}>
        <View>
          <Text text={chosenBook.title} style={ss.bookTitle} selectable={true} />
          <Text text={chosenBook.author} style={ss.bookAuthor} selectable={true} />
        </View>

        <View>
          <View style={ss.bookAttrs}>
            <View style={ss.bookAttrPair}>
              <Text tx="library.callNo" style={ss.bookAttrKey} />
              <Text text={chosenBook.callno} style={ss.bookAttrValue} />
            </View>
            <View style={ss.bookAttrPair}>
              <Text tx="library.type" style={ss.bookAttrKey} />
              <Text text={chosenBook.type} style={ss.bookAttrValue} />
            </View>
            <View style={ss.bookAttrPair}>
              <Text tx="library.location" style={ss.bookAttrKey} />
              <Text text={chosenBook.local} style={ss.bookAttrValue} />
            </View>
            <View style={ss.bookAttrPair}>
              <Text tx="library.borrowedTime" style={ss.bookAttrKey} />
              <Text text={chosenBook.loanTime} style={ss.bookAttrValue} />
            </View>
            <View style={ss.bookAttrPair}>
              <Text tx="library.returnBy" style={ss.bookAttrKey} />
              <Text text={chosenBook.returnTime} style={ss.bookAttrValue} />
            </View>
          </View>
        </View>
      </View>,
      <View style={ss.renewArea} key={1}>
        {this.state.userInformed && <Text style={ss.renewCaveat} tx="library.renewCaveat" />}
        <Button
          preset="lite"
          style={ss.modalButton}
          onPress={() => {
            if (this.state.userInformed) {
              twtGet(`v1/library/renew${chosenBook.barcode}`)
                .then(response => response.json())
                .then(responseJson => {
                  closeModal()
                  DeviceEventEmitter.emit("showToast", <Toasti text={responseJson.message} />)
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
            <Text
              tx={this.state.userInformed ? "common.confirm" : "library.renew"}
              preset="h6"
              style={{ textTransform: "uppercase" }}
            />
          </View>
        </Button>
      </View>,
    ]
  }
}
