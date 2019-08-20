/*
 * Bind Screen
 * Created by Tzingtao Chow
 * ---
 *
 * Ecard Bind Screen 目前是用来绑定校园卡的页面。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { ActivityIndicator, DeviceEventEmitter, Keyboard, StatusBar, View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, ssGlobal } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { fetchEcardProfile, setEcardAuth } from "../../actions/data-actions"
import { TopBar } from "../../components/top-bar"
import { ByTwt } from "../../components/by-twt"
import { Toasti } from "../../components/toasti"

export interface EcardBindScreenProps extends NavigationScreenProps<{}> {
  fetchEcardProfile?
  setEcardAuth?
  compData?
}

export class _EcardBindScreen extends React.Component<EcardBindScreenProps, {}> {
  state = {
    cardId: this.props.compData.userInfo.data.studentid,
    password: "",
    loggingIn: false,
  }

  attemptToBind = () => {
    Keyboard.dismiss()
    this.setState({ loggingIn: true })
    this.props
      .fetchEcardProfile(this.state.cardId, this.state.password)
      .then(() => {
        DeviceEventEmitter.emit("showToast", <Toasti tx="accountBinding.bindSuccess" />)
        this.props.setEcardAuth(this.state.cardId, this.state.password)
        this.props.navigation.goBack()
      })
      .catch(err => {
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
              <Text
                tx="accountBinding.greetings.ecard"
                preset="h2"
                style={ssGlobal.login.heading}
              />
            </View>
            <View>
              <TextField
                placeholderTx="accountBinding.yourStudentId"
                keyboardType="numeric"
                style={ssGlobal.login.input}
                onChangeText={text => this.setState({ cardId: text })}
                value={this.state.cardId}
                autoCorrect={false}
              />
              <TextField
                placeholderTx="accountBinding.ecardPassword"
                keyboardType="numeric"
                style={ssGlobal.login.input}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry={true}
                autoCorrect={false}
              />
              <Text preset="small" style={ssGlobal.login.hint}>
                <Text text="info" preset="i" />
                <Text text=" " />
                <Text tx="accountBinding.ecardHint" />
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

const mapDispatchToProps = dispatch => {
  return {
    fetchEcardProfile: async (cardId, password) => {
      await dispatch(fetchEcardProfile(cardId, password))
    },
    setEcardAuth: (cardId, password) => {
      dispatch(setEcardAuth(cardId, password))
    },
  }
}

export const EcardBindScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_EcardBindScreen)
