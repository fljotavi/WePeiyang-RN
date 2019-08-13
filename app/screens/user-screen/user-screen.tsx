import * as React from "react"
import { DeviceEventEmitter, Image, ScrollView, StatusBar, View } from "react-native"
import { connect } from "react-redux"
import { Screen } from "../../components/screen"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../components/text"
import { Gradicon } from "./gradicon"
import { BindingBar } from "./binding-bar"
import { Button } from "../../components/button"
import { deleteTokenFromStore } from "../../services/twt-fetch"
import AsyncStorage from "@react-native-community/async-storage"

import ss from "./user-screen.style"
import { clearAllData } from "../../actions/data-actions"
import { TopBar } from "../../components/top-bar"
import { Toasti } from "../../components/toasti"
import { color, shadowPresets } from "../../theme"

export interface UserScreenProps extends NavigationScreenProps<{}> {
  compData
  clearAllData
}

export class UserScreen extends React.Component<UserScreenProps, {}> {
  logout = () => {
    this.props.clearAllData()
    this.deleteToken().then(() => {
      DeviceEventEmitter.emit("showToast", <Toasti tx="auth.logoutSuccess" />)
      this.props.navigation.navigate("authLoading")
    })
  }

  deleteToken = async () => {
    deleteTokenFromStore()
    try {
      await AsyncStorage.removeItem("@WePeiyangRN_token")
    } catch (e) {
      DeviceEventEmitter.emit("showToast", <Toasti tx="auth.tokenDeleteFailure" preset="error" />)
    }
  }

  render() {
    const { compData } = this.props

    return (
      <Screen>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        <View style={ss.headPanel}>
          <View style={ss.ambient1} />
          <View style={ss.ambient2} />
        </View>

        <ScrollView>
          <TopBar
            elements={{
              left: [
                {
                  iconText: "arrow_back",
                  action: () => this.props.navigation.goBack(),
                },
              ],
              right: [
                {
                  iconText: "settings",
                  action: () => this.props.navigation.navigate("settings"),
                },
              ],
            }}
            color={color.background}
          />

          <View style={ss.container}>
            <View style={ss.userInfoPanel}>
              <Image source={{ uri: compData.userInfo.data.avatar }} style={ss.avatar} />
              <Text text={compData.userInfo.data.twtuname} style={ss.userName} preset="h4" />
              <Text
                text={`${compData.userInfo.data.studentid} / ${compData.userInfo.data.realname}`}
                style={ss.userId}
                preset="small"
              />
            </View>
            <View style={[ss.shortcutModulePanel, shadowPresets.close]}>
              <Gradicon
                onPress={() => this.props.navigation.navigate("gpa")}
                source={require("./gradicons/gradicon1.png")}
                tx="modules.gpa"
              />
              <Gradicon source={require("./gradicons/gradicon2.png")} tx="modules.library" />
              <Gradicon source={require("./gradicons/gradicon3.png")} tx="modules.ecard" />
            </View>
            <BindingBar
              style={ss.bindingBar}
              txTitle="accountBinding.portalAccount"
              txSubtitle="common.unknown"
              icon="event_note"
            />
            <BindingBar
              onPress={() => this.props.navigation.navigate("bind")}
              style={ss.bindingBar}
              txTitle="accountBinding.ecardAccount"
              txSubtitle={
                compData.ecard.auth.status === "BOUND"
                  ? "accountBinding.bound"
                  : "accountBinding.unbound"
              }
              icon="credit_card"
            />
            <BindingBar
              style={ss.bindingBar}
              txTitle="accountBinding.bicycleAccount"
              txSubtitle="common.unknown"
              icon="directions_bike"
            />
            <BindingBar
              style={ss.bindingBar}
              txTitle="accountBinding.libraryAccount"
              txSubtitle="common.unknown"
              icon="book"
            />
            <Button style={ss.logoutButton} preset="greyer" onPress={this.logout}>
              <View style={ss.logoutButtonContentWrapper}>
                <Text style={ss.logoutIcon} preset="i" text="exit_to_app" />
                <Text style={ss.logoutText} tx="auth.logout" />
              </View>
            </Button>
          </View>
        </ScrollView>
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  return {
    compData: state.dataReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearAllData: () => {
      dispatch(clearAllData())
    },
  }
}

export const connectedUserScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserScreen)
