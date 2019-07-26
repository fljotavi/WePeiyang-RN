import * as React from "react"
import { connect } from 'react-redux'
import { StatusBar, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"

export interface AuthLoadingScreenProps extends NavigationScreenProps<{}> {
  authStatus?
  testStatus?
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical
  } as ViewStyle,
}

export class AuthLoadingScreen extends React.Component<AuthLoadingScreenProps, {}> {

  constructor(props) {
    super(props)
    this._bootstrapAuthStatus()
  }

  _bootstrapAuthStatus = () => {
    console.log(this.props.authStatus)
    console.log(this.props.testStatus)
    let token = this.props.authStatus.token
    this.props.navigation.navigate(token ? 'app' : 'login')
  }

  render () {

    return (
      <Screen preset="scroll">
        <StatusBar backgroundColor={color.background} barStyle="dark-content" />
        <View style={ss.container}>
          <Text text="Loading..." preset="h2" />
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer,
    testStatus: state.courseDataReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export const connectedAuthLoadingScreen = connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
