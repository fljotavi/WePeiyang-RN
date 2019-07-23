import * as React from "react"
import { Image, ImageStyle, StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { connect } from 'react-redux'
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../components/text"
import { Gradicon } from "./gradicon"

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
    paddingVertical: 30,
    paddingHorizontal: 30,
    elevation: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: '100%',
    maxWidth: 500,
  } as ViewStyle,
}

export class UserScreen extends React.Component<UserScreenProps, {}> {

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
