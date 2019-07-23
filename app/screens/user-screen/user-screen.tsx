import * as React from "react"
import { StatusBar, View, ViewStyle } from "react-native"
import { connect } from 'react-redux'
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"

export interface UserScreenProps extends NavigationScreenProps<{}> {
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical
  } as ViewStyle
}

export class UserScreen extends React.Component<UserScreenProps, {}> {

  render () {
    return (
      <Screen preset="scroll">
        <StatusBar backgroundColor={color.background} barStyle="dark-content" />
        <View style={ss.container}>

        </View>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export const connectedUserScreen = connect(mapStateToProps, mapDispatchToProps)(UserScreen)
