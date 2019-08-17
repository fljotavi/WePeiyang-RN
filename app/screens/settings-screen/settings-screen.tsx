import * as React from "react"
import { connect } from "react-redux"

import { Linking, StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationActions, NavigationScreenProps } from "react-navigation"
import { SettingsSnack } from "./settings-snack"
import { TopBar } from "../../components/top-bar"
import { languageFullnames } from "../../i18n/i18n"
import Modal from "react-native-modal"
import { Alert } from "../../components/alert"
import { setPreference } from "../../actions/preference-actions"

export interface SettingsScreenProps extends NavigationScreenProps<{}> {
  pref?
  setPreference?
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
  heading: {
    marginBottom: 20,
  } as TextStyle,
  sectionHead: {
    marginTop: 16,
    marginBottom: 12,
    fontWeight: "bold",
    color: color.primary,
  } as TextStyle,
  snack: {
    marginBottom: 10,
  } as ViewStyle,
}

export class SettingsScreen extends React.Component<SettingsScreenProps, {}> {
  state = {
    modal: {
      heading: undefined,
      headingTx: undefined,
      content: undefined,
      contentTx: undefined,
      confirmAction: undefined,
      visible: false,
    },
  }

  openModal = options => {
    this.setState({
      modal: {
        heading: options.heading,
        headingTx: options.headingTx,
        content: options.content,
        contentTx: options.contentTx,
        confirmAction: options.confirmAction,
        visible: true,
      },
    })
  }
  closeModal = () => {
    this.setState({
      modal: {
        ...this.state.modal,
        visible: false,
      },
    })
  }

  openUrlAttempt = url => {
    this.openModal({
      headingTx: "common.prepareToLeave",
      content: url,
      confirmAction: () => {
        this.closeModal()
        Linking.openURL(url).catch(err => console.log(err))
      },
    })
  }

  render() {
    const { pref, setPreference } = this.props
    return (
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        <Modal
          isVisible={this.state.modal.visible}
          backdropColor={color.background}
          onBackButtonPress={this.closeModal}
          onBackdropPress={this.closeModal}
          useNativeDriver={true}
        >
          <Alert
            heading={this.state.modal.heading}
            headingTx={this.state.modal.headingTx}
            content={this.state.modal.content}
            contentTx={this.state.modal.contentTx}
            buttons={[
              {
                tx: "common.ok",
                onPress: this.state.modal.confirmAction,
              },
              {
                tx: "common.cancel",
                onPress: this.closeModal,
              },
            ]}
          />
        </Modal>

        <TopBar
          elements={{
            left: [
              {
                iconText: "arrow_back",
                action: () => this.props.navigation.dispatch(NavigationActions.back()),
              },
            ],
            right: [],
          }}
          color={color.primary}
        />

        <View style={ss.container}>
          <Text tx="settingsScreen.settings" preset="h2" style={ss.heading} />

          <Text text="General" preset="lausanne" style={ss.sectionHead} />

          <SettingsSnack
            style={ss.snack}
            txTitle="settingsScreen.hideGpa"
            preset="switch"
            on={pref.hideGpaOnHomeScreen}
            onPress={() => {
              setPreference("hideGpaOnHomeScreen", !pref.hideGpaOnHomeScreen)
            }}
          />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            txTitle="settingsScreen.language"
            textSubtitle={languageFullnames[pref.language].common}
            onPress={() => this.props.navigation.navigate("language")}
          />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            textTitle={"Displayed Days Each Week"}
            textSubtitle={pref.daysEachWeek}
            onPress={() => this.props.navigation.navigate("daysEachWeek")}
          />

          <Text text="Elsewhere" preset="lausanne" style={ss.sectionHead} />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            textTitle={"WePeiyang on Github"}
            textSubtitle="WePeiyang is an open-sourced project. Help make it better by contributing to our community."
            onPress={() => {
              this.openUrlAttempt("https://github.com/Cyphexl/WePeiYang-RN")
            }}
          />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            textTitle={"天外天用户社区 QQ/TIM Group"}
            textSubtitle="738068756"
          />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            textTitle={"Help & Support"}
            textSubtitle="Need help? Encountered a problem? Welcome to our support forum."
            onPress={() => {
              this.openUrlAttempt("https://support.twtstudio.com/")
            }}
          />
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
    setPreference: (key, value) => {
      dispatch(setPreference(key, value))
    },
  }
}

export const connectedSettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen)
