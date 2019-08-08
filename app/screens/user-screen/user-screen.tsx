import * as React from "react"
import { Image, ScrollView, StatusBar, View } from "react-native"
import { connect } from "react-redux"
import { Screen } from "../../components/screen"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../components/text"
import { Gradicon } from "./gradicon"
import { BindingBar } from "./binding-bar"
import { Button } from "../../components/button"
import { deleteTokenFromStore } from "../../services/twt-fetch"
import AsyncStorage from "@react-native-community/async-storage"
import Toast from "react-native-root-toast"
import toastOptions from "../../theme/toast"

import ss from "./user-screen.style"
import { clearAllData } from "../../actions/data-actions"
import { TopBar } from "./top-bar"

export interface UserScreenProps extends NavigationScreenProps<{}> {
  compData
  clearAllData
}

export class UserScreen extends React.Component<UserScreenProps, {}> {
  logout = () => {
    this.props.clearAllData()
    this.deleteToken().then(() => {
      Toast.show(
        <Text tx="auth.logoutSuccess" style={{ color: toastOptions.primary.textColor }} /> as any,
        toastOptions.primary,
      )
      this.props.navigation.navigate("authLoading")
    })
  }

  deleteToken = async () => {
    deleteTokenFromStore()
    try {
      await AsyncStorage.removeItem("@WePeiyangRN_token")
    } catch (e) {
      Toast.show(
        <Text tx="auth.tokenDeleteFailure" style={{ color: toastOptions.err.textColor }} /> as any,
        toastOptions.err,
      )
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
            actions={[
              () => this.props.navigation.goBack(),
              () => this.props.navigation.navigate("settings"),
            ]}
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
            <View style={ss.shortcutModulePanel}>
              <Gradicon
                onPress={() => this.props.navigation.navigate("gpa")}
                source={require("./gradicons/gradicon1.png")}
                tx="modules.gpa"
              />
              <Gradicon source={require("./gradicons/gradicon2.png")} tx="modules.library" />
              <Gradicon source={require("./gradicons/gradicon3.png")} tx="modules.cards" />
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
