/*
 * Lib Bind Screen
 * Created by Tzingtao Chow
 * ---
 *
 * Lib Bind Screen 是用来绑定天津大学图书馆账号的页面。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { ActivityIndicator, DeviceEventEmitter, StatusBar, View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, ssGlobal } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { TopBar } from "../../components/top-bar"
import { ByTwt } from "../../components/by-twt/by-twt"
import { Toasti } from "../../components/toasti"
import { bindLibAccount } from "../../actions/data-actions"

export interface LibBindScreenProps extends NavigationScreenProps<{}> {
  compData?
}

export class _LibBindScreen extends React.Component<LibBindScreenProps, {}> {
  state = {
    libpasswd: "",
    loggingIn: false,
  }

  attemptToBind = () => {
    this.setState({ loggingIn: true })
    bindLibAccount(this.state.libpasswd)
      .then(() => {
        DeviceEventEmitter.emit("showToast", <Toasti tx="accountBinding.bindSuccess" />)
        this.props.navigation.goBack()
      })
      .catch(err => {
        console.log(err)
        DeviceEventEmitter.emit(
          "showToast",
          <Toasti text={`${err.error_code} / ${err.message}`} preset="error" />,
        )
      })
      .then(() => {
        this.setState({ loggingIn: false })
      })
  }

  render() {
    return (
      <Screen style={ssGlobal.login.screen}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        <TopBar
          elements={{
            left: [
              {
                iconText: "arrow_back",
                action: () => this.props.navigation.goBack(),
              },
            ],
            right: [],
          }}
          color={color.primary}
        />

        <View style={ssGlobal.login.container}>
          <View>
            <View style={ssGlobal.login.headerBar}>
              <Text tx="accountBinding.greetings.lib" preset="h2" style={ssGlobal.login.heading} />
            </View>
            <View>
              <TextField
                style={ssGlobal.login.input}
                placeholder={this.props.compData.userInfo.data.studentid}
                autoCorrect={false}
                disabled
                pointerEvents="none"
              />
              <TextField
                placeholderTx="accountBinding.libPassword"
                style={ssGlobal.login.input}
                onChangeText={text => this.setState({ libpasswd: text })}
                value={this.state.libpasswd}
                secureTextEntry={true}
                autoCorrect={false}
              />
              <Text preset="small" style={ssGlobal.login.hint}>
                <Text text="info" preset="i" />
                <Text text=" " />
                <Text tx="accountBinding.libPasswordHint" />
              </Text>
              <Text preset="small" style={ssGlobal.login.hint}>
                <Text text="info" preset="i" />
                <Text text=" " />
                <Text tx="accountBinding.libLatencyHint" />
              </Text>
              <View style={ssGlobal.login.buttonRow}>
                <Button style={ssGlobal.login.button} onPress={this.attemptToBind}>
                  <ActivityIndicator
                    style={[
                      ssGlobal.buttonLoadingIndicator,
                      { opacity: this.state.loggingIn ? 1 : 0 },
                    ]}
                    color={color.background}
                    size={ssGlobal.loadingSize}
                  />
                  <Text tx="accountBinding.bind" style={ssGlobal.login.buttonText} />
                </Button>
              </View>
            </View>
          </View>

          <ByTwt fill={color.black(0.07)} style={ssGlobal.login.by}>
            <Text text="SecureAuth™" style={ssGlobal.login.byText} />
          </ByTwt>
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  return { compData: state.dataReducer }
}

const mapDispatchToProps = () => {
  return {}
}

export const LibBindScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_LibBindScreen)
