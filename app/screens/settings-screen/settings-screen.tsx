/*
 * Settings Screen
 * Created by Tzingtao Chow
 * ---
 *
 * Settings Screen 是所有设置页面的根页面。
 * 请注意，考虑到模块本身可能会变得复杂且庞大，Settings 模块单独独立出一个了 Navigator 栈。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { Linking, StatusBar, View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { NavigationActions, NavigationScreenProps } from "react-navigation"
import { SettingsSnack } from "./settings-snack"
import { TopBar } from "../../components/top-bar"
import { languageFullnames } from "../../i18n/i18n"
import Modal from "react-native-modal"
import { Alert } from "../../components/alert"
import { setPreference } from "../../actions/preference-actions"
import ss from "./settings-screen.styles"

export interface SettingsScreenProps extends NavigationScreenProps<{}> {
  pref?
  setPreference?
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
          <Text tx="settings.settings" preset="h2" style={ss.heading} />

          <Text tx="settings.sections.homepage" preset="lausanne" style={ss.sectionHead} />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            txTitle="settings.language"
            textSubtitle={languageFullnames[pref.language].common}
            onPress={() => this.props.navigation.navigate("language")}
          />

          <SettingsSnack
            style={ss.snack}
            txTitle="settings.hideGpa"
            preset="switch"
            on={pref.hideGpaOnHomeScreen}
            onPress={() => {
              setPreference("hideGpaOnHomeScreen", !pref.hideGpaOnHomeScreen)
            }}
          />

          <SettingsSnack
            style={ss.snack}
            txTitle="settings.owlMode.title"
            txSubtitle={pref.owlIndex === 21 ? "settings.owlMode.on" : "settings.owlMode.off"}
            preset="switch"
            on={pref.owlIndex === 21}
            onPress={() => {
              if (pref.owlIndex === 24) setPreference("owlIndex", 21)
              else setPreference("owlIndex", 24)
            }}
          />

          <Text tx="modules.schedule" preset="lausanne" style={ss.sectionHead} />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            txTitle="settings.daysEachWeek.title"
            textSubtitle={pref.daysEachWeek}
            onPress={() => this.props.navigation.navigate("daysEachWeek")}
          />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            txTitle="settings.scheduleTextSize.title"
            textSubtitle={pref.scheduleTextSize + "%"}
            onPress={() => this.props.navigation.navigate("scheduleTextSize")}
          />


          <SettingsSnack
            style={ss.snack}
            txTitle="settings.displayNotThisWeek.title"
            preset="switch"
            on={pref.displayNotThisWeek}
            onPress={() => {
              setPreference("displayNotThisWeek", !pref.displayNotThisWeek)
            }}
          />

          <Text tx="modules.network" preset="lausanne" style={ss.sectionHead} />

          <SettingsSnack
            style={ss.snack}
            txTitle="settings.autoReconnect.title"
            txSubtitle="settings.autoReconnect.sub"
            preset="switch"
            on={pref.autoReconnect}
            onPress={() => {
              setPreference("autoReconnect", !pref.autoReconnect)
            }}
          />

          <Text tx="settings.sections.elsewhere" preset="lausanne" style={ss.sectionHead} />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            txTitle="settings.wpyGithub.title"
            txSubtitle="settings.wpyGithub.sub"
            onPress={() => {
              this.openUrlAttempt("https://github.com/Cyphexl/WePeiYang-RN")
            }}
          />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            txTitle="settings.timGroup"
            textSubtitle="738068756"
          />

          <SettingsSnack
            style={ss.snack}
            preset="enter"
            txTitle="settings.helpNSupport.title"
            txSubtitle="settings.helpNSupport.sub"
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
