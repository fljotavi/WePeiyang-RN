import * as React from "react"
import { connect } from "react-redux"

import {
  Platform,
  ScrollView,
  StatusBar,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity as Touchable,
} from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { setPalette } from "../../actions/preference-actions"
import { TopBar } from "../../components/top-bar"
import ss from "./settings-screen.styles"
import Modal from "react-native-modal"

import RNRestart from "react-native-restart"
import { NativeModules } from "react-native"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"

const screenPalette = [color.black(1), color.white(1)]
const textColor = {
  color: screenPalette[1],
} as TextStyle

export interface ColorSnackProps {
  color
  sendColor
}
export class ColorSnack extends React.Component<ColorSnackProps, {}> {
  state = {
    isModalVisible: false,
    colorSelected: this.props.color,
  }
  openModal = () => {
    this.setState({ isModalVisible: true })
  }
  closeModal = () => {
    this.setState({ isModalVisible: false, userInformed: false })
  }
  emitColor = () => {
    this.props.sendColor(this.state.colorSelected)
  }

  render() {
    const ssColorSnack = {
      panel: {
        padding: 40,
        marginHorizontal: 30,
        backgroundColor: color.black(1),
        borderRadius: layoutParam.borderRadius * 1.5,
      } as ViewStyle,
      window: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: color.background,
        marginBottom: 20,
      } as ViewStyle,
      snack: {
        height: 40,
        marginBottom: 11,
        backgroundColor: color.background,
        borderRadius: layoutParam.borderRadius,
        overflow: "hidden",
      } as ViewStyle,
      field: {
        backgroundColor: color.transparent,
        padding: 0,
        marginLeft: -1,
      } as ViewStyle,
      input: {
        backgroundColor: color.transparent,
        paddingHorizontal: 0,
        fontSize: 35,
        color: screenPalette[1],
        marginBottom: 15,
      } as TextStyle,
      hint: {
        color: screenPalette[1],
        fontSize: 10,
        marginBottom: 3,
      } as TextStyle,
      button: {
        alignSelf: "flex-start",
        marginTop: 20,
      } as ViewStyle,
      fill: {
        alignSelf: "stretch",
        flex: 1,
        backgroundColor: this.state.colorSelected,
      } as ViewStyle,
    }
    return (
      <>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackButtonPress={this.closeModal}
          onBackdropPress={this.closeModal}
          useNativeDriver={true}
          backdropOpacity={0.8}
        >
          <View style={ssColorSnack.panel}>
            <View style={ssColorSnack.window}>
              <View style={ssColorSnack.fill} />
            </View>
            <Text
              tx="settings.palette.inputColor"
              preset="lausanne"
              style={[textColor, { fontWeight: "bold" }]}
            />
            <TextField
              placeholder={this.props.color}
              placeholderTextColor={color.module().yellowPages[1]}
              style={ssColorSnack.field}
              inputStyle={ssColorSnack.input}
              value={this.state.colorSelected}
              onChangeText={text => this.setState({ colorSelected: text })}
              autoCorrect={false}
            />
            <Text tx="settings.palette.formats" style={ssColorSnack.hint} />
            <Text text="• rgb(255, 255, 0)" style={ssColorSnack.hint} />
            <Text text="• rgba(255, 255, 0, 1)" style={ssColorSnack.hint} />
            <Text text="• #FFFF00" style={ssColorSnack.hint} />
            <Text text="• #FFFF00FF" style={ssColorSnack.hint} />
            <Button
              tx="common.confirm"
              onPress={() => {
                this.emitColor()
                this.closeModal()
              }}
              style={ssColorSnack.button}
              preset="small"
              palette={screenPalette}
            />
          </View>
        </Modal>
        <Touchable onPress={this.openModal}>
          <View style={ssColorSnack.snack}>
            <View style={ssColorSnack.fill} />
          </View>
        </Touchable>
      </>
    )
  }
}

export interface PaletteSettingsScreenProps extends NavigationScreenProps<{}> {
  pref?
  setPalette?
}

export class PaletteSettingsScreen extends React.Component<PaletteSettingsScreenProps, {}> {
  sendColor = (colorToSend, dest, index) => {
    let existingPalette = [...this.props.pref.palette[dest]]
    existingPalette[index] = colorToSend
    this.props.setPalette(dest, existingPalette)
  }
  reload = () => {
    if (Platform.OS === "ios") NativeModules.DevSettings.reload()
    else RNRestart.Restart()
  }

  render() {
    const { pref } = this.props
    console.log(pref)

    return (
      <Screen style={{ backgroundColor: screenPalette[0] }}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TopBar
            elements={{
              left: [
                {
                  iconText: "arrow_back",
                  action: () => this.props.navigation.goBack(),
                },
              ],
              right: [],
            }}
            color={screenPalette[1]}
          />

          <View style={ss.container}>
            <Text preset="h2" style={[ss.heading, textColor]}>
              <Text tx="settings.palette.title" />
            </Text>
            <Text tx="settings.palette.intro" preset="small" style={[ss.small, textColor]} />
            <Text tx="modules.gpa" preset="lausanne" style={[ss.sectionHead, textColor]} />
            <ColorSnack
              color={pref.palette.gpa[0]}
              sendColor={colorToSend => this.sendColor(colorToSend, "gpa", 0)}
            />

            <Text tx="modules.contact" preset="lausanne" style={[ss.sectionHead, textColor]} />
            <ColorSnack
              color={pref.palette.yellowPages[0]}
              sendColor={colorToSend => this.sendColor(colorToSend, "yellowPages", 0)}
            />
            <ColorSnack
              color={pref.palette.yellowPages[1]}
              sendColor={colorToSend => this.sendColor(colorToSend, "yellowPages", 1)}
            />
            <ColorSnack
              color={pref.palette.yellowPages[2]}
              sendColor={colorToSend => this.sendColor(colorToSend, "yellowPages", 2)}
            />

            <Text tx="modules.schedule" preset="lausanne" style={[ss.sectionHead, textColor]} />
            <ColorSnack
              color={pref.palette.schedule[0]}
              sendColor={colorToSend => this.sendColor(colorToSend, "schedule", 0)}
            />
            <ColorSnack
              color={pref.palette.schedule[1]}
              sendColor={colorToSend => this.sendColor(colorToSend, "schedule", 1)}
            />
            <ColorSnack
              color={pref.palette.schedule[2]}
              sendColor={colorToSend => this.sendColor(colorToSend, "schedule", 2)}
            />
            <ColorSnack
              color={pref.palette.schedule[3]}
              sendColor={colorToSend => this.sendColor(colorToSend, "schedule", 3)}
            />
            <ColorSnack
              color={pref.palette.schedule[4]}
              sendColor={colorToSend => this.sendColor(colorToSend, "schedule", 4)}
            />
            <ColorSnack
              color={pref.palette.schedule[5]}
              sendColor={colorToSend => this.sendColor(colorToSend, "schedule", 5)}
            />

            <Text tx="modules.ecard" preset="lausanne" style={[ss.sectionHead, textColor]} />
            <ColorSnack
              color={pref.palette.ecard[0]}
              sendColor={colorToSend => this.sendColor(colorToSend, "ecard", 0)}
            />
            <ColorSnack
              color={pref.palette.ecard[1]}
              sendColor={colorToSend => this.sendColor(colorToSend, "ecard", 1)}
            />
            <ColorSnack
              color={pref.palette.ecard[2]}
              sendColor={colorToSend => this.sendColor(colorToSend, "ecard", 2)}
            />

            <Button
              palette={[screenPalette[1], color.white(0.1)]}
              tx="common.saveChanges"
              onPress={this.reload}
              style={{
                marginVertical: 15,
              }}
              textStyle={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            />
          </View>
        </ScrollView>
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  return {
    pref: state.preferenceReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPalette: (key, value) => {
      dispatch(setPalette(key, value))
    },
  }
}

export const connectedPaletteSettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaletteSettingsScreen)
