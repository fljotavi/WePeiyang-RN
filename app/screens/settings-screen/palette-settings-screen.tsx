import * as React from "react"
import { connect } from "react-redux"

import { Platform, StatusBar, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { setPalette } from "../../actions/preference-actions"
import { TopBar } from "../../components/top-bar"
import Touchable from "react-native-platform-touchable"
import ss from "./settings-screen.styles"
import Modal from "react-native-modal"
import { SettingsSnack } from "./settings-snack"

import RNRestart from "react-native-restart"
import { NativeModules } from "react-native"

export interface ColorSnackProps {
  color
  sendColor
}
export class ColorSnack extends React.Component<ColorSnackProps, {}> {
  state = {
    isModalVisible: false,
    colorSelected: `rgb(${Math.ceil(Math.random() * 255)},122,122)`,
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
    const snack = {
      padding: 20,
      marginBottom: 11,
      backgroundColor: this.props.color,
      borderRadius: layoutParam.borderRadius,
    } as ViewStyle
    const panel = {
      padding: 20,
      backgroundColor: color.black(1),
    } as ViewStyle
    return (
      <>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackButtonPress={this.closeModal}
          onBackdropPress={this.closeModal}
          useNativeDriver={true}
        >
          <Touchable onPress={this.emitColor}>
            <View style={panel} />
          </Touchable>
        </Modal>
        <Touchable onPress={this.openModal}>
          <View style={snack} />
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
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
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
          color={color.primary}
        />

        <View style={ss.container}>
          <Text tx="settings.palette.title" preset="h2" style={ss.heading} />
          <Text tx="settings.palette.intro" preset="small" style={ss.small} />

          <Text tx="modules.gpa" preset="lausanne" style={ss.sectionHead} />
          <ColorSnack
            color={pref.palette.gpa[0]}
            sendColor={colorToSend => this.sendColor(colorToSend, "gpa", 0)}
          />

          <Text tx="modules.ecard" preset="lausanne" style={ss.sectionHead} />
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

          <Text tx="modules.contact" preset="lausanne" style={ss.sectionHead} />
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

          <Text text="reload" preset="lausanne" style={ss.sectionHead} />

          <SettingsSnack preset="enter" onPress={this.reload} />
        </View>
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
