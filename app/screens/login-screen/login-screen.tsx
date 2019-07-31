import * as React from "react"
import { StatusBar, View, ViewStyle } from "react-native"
import { connect } from 'react-redux'
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import toastOptions from "../../theme/toast"
import { NavigationScreenProps } from "react-navigation"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { passTokenToStore, twtGet } from "../../services/twt-fetch"
import AsyncStorage from "@react-native-community/async-storage"
import Toast from 'react-native-root-toast'

export interface LoginScreenProps extends NavigationScreenProps<{}> {
}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical
  } as ViewStyle,
  headerBar: {
    marginBottom: 24,
  } as ViewStyle,
  fieldWithMarginTop: {
    marginTop: 24,
  } as ViewStyle,
}

export class LoginScreen extends React.Component<LoginScreenProps, {}> {
  state = {
    username: "",
    password: ""
  }

  storeToken = async (token) => {
    passTokenToStore(token)
    await AsyncStorage.setItem('@WePeiyangRN_token', token)
  }

  login = () => {
    twtGet("v1/auth/token/get", { twtuname: this.state.username, twtpasswd: this.state.password })
      .then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.error_code === -1) {
          const token = responseJson.data.token
          this.storeToken(token)
            .then(() => {
              Toast.show(<Text tx="auth.loginSuccess" style={{ color: toastOptions.primary.textColor }}/> as any, toastOptions.primary)
              this.props.navigation.navigate('app')
            })
            .catch(() => {
              Toast.show(<Text tx="auth.tokenStoreFailure" style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
              this.props.navigation.navigate('app')
            })
        } else {
          let errorMessage = responseJson.message || "Unknown error"
          Toast.show(<Text text={errorMessage} style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
        }

      })
      .catch(error => {
        Toast.show(<Text text="Login Fetch failed" style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
        console.log(error)
      })
  }

  render () {
    return (
      <Screen preset="scroll">
        <View style={ss.container}>
          <View style={ss.headerBar}>
            <Text tx="loginScreen.greetings" preset="h2"/>
          </View>
          <View>
            <TextField
              placeholderTx="loginScreen.username"
              onChangeText={(text) => this.setState({ username: text })}
              value={this.state.username}
              autoFocus={true}
              autoCorrect={false}/>
            <TextField
              placeholderTx="loginScreen.password"
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
              secureTextEntry={true}
              autoCorrect={false}/>
            <Button style={ss.fieldWithMarginTop} tx="auth.login" onPress={this.login} />
          </View>
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewLoginStatus: (newStatus) => {
      dispatch({
        action: "LOGIN_SUCCESS",
        payload: newStatus
      })
    }
  }
}

export const connectedLoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
