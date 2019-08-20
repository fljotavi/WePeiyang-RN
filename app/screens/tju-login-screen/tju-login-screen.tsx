/*
 * TJU Login Screen
 * Created by Tzingtao Chow
 * ---
 *
 * TJU Login Screen 是登录天津大学校园网的页面。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { ActivityIndicator, DeviceEventEmitter, ScrollView, StatusBar, View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, ssGlobal } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { TopBar } from "../../components/top-bar"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { ByTwt } from "../../components/by-twt"
import { Toasti } from "../../components/toasti"
import { setNetworkAuth } from "../../actions/data-actions"
import { twtGet } from "../../services/twt-fetch"

export interface TjuLoginScreenProps extends NavigationScreenProps<{}> {
  compData?
  setNetworkAuth?
}

export class _TjuLoginScreen extends React.Component<TjuLoginScreenProps, {}> {
  state = {
    username: this.props.compData.network.auth.username,
    password: this.props.compData.network.auth.password,
    loggingIn: false,
    loggingOut: false,
    checkingStatus: false,
    info: "status: init",
  }

  networkLogin = async (username, password) => {
    await twtGet("v1/network/login", { username, password })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          this.setState({ info: String(responseJson.data) })
        } else {
          throw responseJson
        }
      })
  }
  surf = () => {
    this.setState({ loggingIn: true })
    this.props.setNetworkAuth(this.state.username, this.state.password)
    this.networkLogin(this.state.username, this.state.password)
      .then(() => DeviceEventEmitter.emit("showToast", <Toasti tx="network.connected" />))
      .catch(err => {
        this.setState({ info: err.message })
        DeviceEventEmitter.emit(
          "showToast",
          <Toasti text={`${err.error_code} / ${err.message}`} preset="error" />,
        )
      })
      .then(() => {
        this.setState({ loggingIn: false })
      })
  }

  networkLogout = async (username, password) => {
    await twtGet("v1/network/logout", { username, password })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_code === -1) {
          this.setState({ info: String(responseJson.data) })
        } else {
          throw responseJson
        }
      })
  }
  board = () => {
    this.setState({ loggingOut: true })
    this.networkLogout(this.state.username, this.state.password)
      .then(() => DeviceEventEmitter.emit("showToast", <Toasti tx="auth.logoutSuccess" />))
      .catch(err => {
        this.setState({ info: err.message })
        DeviceEventEmitter.emit(
          "showToast",
          <Toasti text={`${err.error_code} / ${err.message}`} preset="error" />,
        )
      })
      .then(() => {
        this.setState({ loggingOut: false })
      })
  }

  render() {
    return (
      <Screen style={ssGlobal.login.screen}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <TopBar
            elements={{
              left: [
                {
                  iconText: "public",
                  action: () => {},
                },
              ],
              right: [],
            }}
            color={color.primary}
          />

          <View style={ssGlobal.login.container}>
            <View>
              <View style={ssGlobal.login.headerBar}>
                <Text tx="network.greetings" preset="h2" style={ssGlobal.login.heading} />
              </View>
              <View>
                <TextField
                  placeholderTx="network.yourUsername"
                  style={ssGlobal.login.input}
                  onChangeText={text => this.setState({ username: text })}
                  value={this.state.username}
                  autoCorrect={false}
                />
                <TextField
                  placeholderTx="network.yourPassword"
                  style={ssGlobal.login.input}
                  onChangeText={text => this.setState({ password: text })}
                  value={this.state.password}
                  secureTextEntry={true}
                  autoCorrect={false}
                />
                <View style={ssGlobal.login.buttonRow}>
                  <Button style={ssGlobal.login.button} onPress={this.surf}>
                    <ActivityIndicator
                      style={[
                        ssGlobal.buttonLoadingIndicator,
                        { opacity: this.state.loggingIn ? 1 : 0 },
                      ]}
                      color={color.background}
                      size={ssGlobal.loadingSize}
                    />
                    <Text tx="network.login" style={ssGlobal.login.buttonText} />
                  </Button>
                  <Button style={ssGlobal.login.buttonSecondary} onPress={this.board}>
                    <ActivityIndicator
                      style={[
                        ssGlobal.buttonLoadingIndicator,
                        { opacity: this.state.loggingOut ? 1 : 0 },
                      ]}
                      color={color.lightGrey}
                      size={ssGlobal.loadingSize}
                    />
                    <Text tx="network.logout" style={ssGlobal.login.buttonSecondaryText} />
                  </Button>
                </View>
                <Text preset="small" style={ssGlobal.login.hint}>
                  <Text text="info" preset="i" />
                  <Text text=" " />
                  <Text tx="accountBinding.networkHint" />
                </Text>
                <Text preset="small" style={ssGlobal.login.hint}>
                  <Text text="warning" preset="i" />
                  <Text text=" " />
                  <Text tx="network.bugHint" />
                </Text>
                <Text preset="small" style={ssGlobal.login.hint}>
                  <Text text="subject" preset="i" />
                  <Text text=" " />
                  <Text text={this.state.info} />
                </Text>
              </View>
            </View>

            <ByTwt fill={color.black(0.07)} style={ssGlobal.login.by}>
              <Text text="SecureAuth™" style={ssGlobal.login.byText} />
            </ByTwt>
          </View>
        </ScrollView>
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  return { compData: state.dataReducer }
}

const mapDispatchToProps = dispatch => {
  return {
    setNetworkAuth: (username, password) => {
      dispatch(setNetworkAuth(username, password))
    },
  }
}

export const TjuLoginScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_TjuLoginScreen)
