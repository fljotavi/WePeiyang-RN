import * as React from "react"
import { StatusBar, View } from "react-native"
import { connect } from 'react-redux'
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, ssGlobal } from "../../theme"
import toastOptions from "../../theme/toast"
import { NavigationScreenProps } from "react-navigation"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { passTokenToStore, twtGet } from "../../services/twt-fetch"
import AsyncStorage from "@react-native-community/async-storage"
import Toast from 'react-native-root-toast'
import { ByTwt } from "../../components/by-twt/by-twt"

export interface LoginScreenProps extends NavigationScreenProps<{}> {
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
      <Screen style={ssGlobal.login.screen}>

        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle='dark-content'
        />

        <View style={ssGlobal.login.container}>
          <View>
            <View style={ssGlobal.login.headerBar}>
              <Text tx="loginScreen.greetings" preset="h1" style={ssGlobal.login.heading}/>
            </View>
            <View>
              <TextField
                placeholderTx="loginScreen.username"
                onChangeText={(text) => this.setState({ username: text })}
                style={ssGlobal.login.input}
                value={this.state.username}
                autoFocus={true}
                autoCorrect={false}/>
              <TextField
                placeholderTx="loginScreen.password"
                onChangeText={(text) => this.setState({ password: text })}
                style={ssGlobal.login.input}
                value={this.state.password}
                secureTextEntry={true}
                autoCorrect={false}/>
              <View style={ssGlobal.login.buttonRow}>
                <Button style={ssGlobal.login.button} tx="auth.login" onPress={this.login} />
              </View>
            </View>
          </View>

          <ByTwt fill={color.black(0.07)} style={ssGlobal.login.by}>
            <Text text="SecureAuth™" style={ssGlobal.login.byText}/>
          </ByTwt>

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
