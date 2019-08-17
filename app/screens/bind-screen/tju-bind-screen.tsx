/*
 * TJU Bind Screen
 * Created by Tzingtao Chow
 * ---
 *
 * TJU Bind Screen 是用来绑定天津大学办公网账号的页面。
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
import { bindTjuAccount } from "../../actions/data-actions"

export interface TjuBindScreenProps extends NavigationScreenProps<{}> {
  compData?
}

export class _TjuBindScreen extends React.Component<TjuBindScreenProps, {}> {
  state = {
    tjuuname: this.props.compData.userInfo.data.studentid,
    tjupasswd: "",
    loggingIn: false,
  }

  attemptToBind = () => {
    this.setState({ loggingIn: true })
    bindTjuAccount(this.state.tjuuname, this.state.tjupasswd)
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
              <Text tx="accountBinding.greetings.tju" preset="h2" style={ssGlobal.login.heading} />
            </View>
            <View>
              <TextField
                placeholderTx="accountBinding.yourStudentId"
                style={ssGlobal.login.input}
                onChangeText={text => this.setState({ tjuuname: text })}
                value={this.state.tjuuname}
                autoCorrect={false}
              />
              <TextField
                placeholderTx="accountBinding.etjuPassword"
                style={ssGlobal.login.input}
                onChangeText={text => this.setState({ tjupasswd: text })}
                value={this.state.tjupasswd}
                secureTextEntry={true}
                autoCorrect={false}
              />
              <Text preset="small" style={ssGlobal.login.hint}>
                <Text text="info" preset="i" />
                <Text text=" " />
                <Text tx="accountBinding.tjuLatencyHint" />
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

export const TjuBindScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_TjuBindScreen)
