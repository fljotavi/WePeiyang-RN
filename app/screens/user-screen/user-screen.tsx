import * as React from "react"
import { Image, ImageStyle, StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { connect } from 'react-redux'
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../components/text"
import { Gradicon } from "./gradicon"
import { BindingBar } from "./binding-bar"
import { Button } from "../../components/button"
import { deleteTokenFromStore } from "../../services/twt-fetch"
import AsyncStorage from "@react-native-community/async-storage"

export interface UserScreenProps extends NavigationScreenProps<{}> {
  userData
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
    alignItems: "center",
  } as ViewStyle,
  headPanel: {
    backgroundColor: color.primaryGreyer,
    height: 320,
    left: 0,
    right: 0,
    position: "absolute"
  } as ViewStyle,
  userInfoPanel: {
    alignItems: "center",
    justifyContent: "center"
  } as ViewStyle,
  userName: {
    color: color.washed,
    marginTop: 14,
  } as TextStyle,
  userId: {
    color: color.washed,
    opacity: 0.6,
    marginTop: 10
  } as TextStyle,
  avatar: {
    borderRadius: 999,
    height: 90,
    width: 90,
    marginTop: 40
  } as ImageStyle,
  shortcutModulePanel: {
    borderRadius: layoutParam.borderRadius,
    backgroundColor: color.card,
    marginTop: 40,
    marginBottom: 20,
    paddingVertical: 30,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    width: '100%',
    maxWidth: 500,
    elevation: 99,
  } as ViewStyle,
  bindingBar: {
    marginTop: 10,
    elevation: 99,
  } as ViewStyle,
  logoutButton: {
    width: '100%',
    maxWidth: 500,
    marginVertical: 40,
    elevation: 99,
  } as ViewStyle,
  logoutButtonContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  logoutIcon: {
    color: color.washed,
    marginRight: 10,
    fontSize: 20,
  } as TextStyle,
  logoutText: {
    color: color.washed,
    fontWeight: "bold",
    textTransform: "uppercase",
  } as TextStyle,
}

export class UserScreen extends React.Component<UserScreenProps, {}> {

  logout = () => {
    this.deleteToken().then(() => {
      this.props.navigation.navigate('authLoading')
    })
  }

  deleteToken = async () => {
    deleteTokenFromStore()
    try {
      await AsyncStorage.removeItem('@WePeiyangRN_token')
    } catch (e) {
      console.log("Async Storage Delete Error: ", e)
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
              <Text style={ss.logoutText} tx="common.logout"/>
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
