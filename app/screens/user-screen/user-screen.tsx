import * as React from "react"
import { Image, StatusBar, View } from "react-native"
import { connect } from 'react-redux'
import { Screen } from "../../components/screen"
import { color } from "../../theme"
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

export interface UserScreenProps extends NavigationScreenProps<{}> {
  userData
}

export class UserScreen extends React.Component<UserScreenProps, {}> {

  logout = () => {
    this.deleteToken().then(() => {
      Toast.show(<Text tx="auth.logoutSuccess" style={{ color: toastOptions.primary.textColor }}/> as any, toastOptions.primary)
      this.props.navigation.navigate('authLoading')
    })
  }

  deleteToken = async () => {
    deleteTokenFromStore()
    try {
      await AsyncStorage.removeItem('@WePeiyangRN_token')
    } catch (e) {
      Toast.show(<Text tx="auth.tokenDeleteFailure" style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
    }
  }

  render () {

    const { userData } = this.props

    return (
      <Screen preset="scroll">
        <StatusBar backgroundColor={color.primaryGreyer} barStyle="light-content" />
        <View style={ss.headPanel} />
        <View style={ss.container}>
          <View style={ss.userInfoPanel}>
            <Image source={{ uri: userData.data.avatar }} style={ss.avatar}/>
            <Text text={userData.data.twtuname} style={ss.userName} preset="h4"/>
            <Text text={`${userData.data.studentid} / ${userData.data.realname}`} style={ss.userId} preset="small"/>
          </View>
          <View style={ss.shortcutModulePanel}>
            <Gradicon source={require("./gradicons/gradicon1.png")} tx="modules.gpa"/>
            <Gradicon source={require("./gradicons/gradicon2.png")} tx="modules.library"/>
            <Gradicon source={require("./gradicons/gradicon3.png")} tx="modules.cards"/>
          </View>
          <BindingBar style={ss.bindingBar} txTitle="accountBinding.portalAccount" txSubtitle="accountBinding.bound" icon="event_note"/>
          <BindingBar style={ss.bindingBar} txTitle="accountBinding.ecardAccount" txSubtitle="accountBinding.bound" icon="credit_card"/>
          <BindingBar style={ss.bindingBar} txTitle="accountBinding.bicycleAccount" txSubtitle="accountBinding.bound" icon="directions_bike"/>
          <BindingBar style={ss.bindingBar} txTitle="accountBinding.libraryAccount" txSubtitle="accountBinding.bound" icon="book"/>
          <Button style={ss.logoutButton} preset="greyer" onPress={this.logout}>
            <View style={ss.logoutButtonContentWrapper}>
              <Text style={ss.logoutIcon} preset="i" text="exit_to_app"/>
              <Text style={ss.logoutText} tx="auth.logout"/>
            </View>
          </Button>
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userDataReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export const connectedUserScreen = connect(mapStateToProps, mapDispatchToProps)(UserScreen)
