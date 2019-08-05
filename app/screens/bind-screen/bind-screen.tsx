import * as React from "react"
import { connect } from 'react-redux'

import { StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import {color, layoutParam} from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { fetchEcardProfile, setEcardAuth } from "../../actions/data-actions"
import Toast from "react-native-root-toast"
import toastOptions from "../../theme/toast"
import { TopBar } from "./top-bar"
import {ByTwt} from "../../components/by-twt/by-twt";

export interface BindScreenProps extends NavigationScreenProps<{}> {
  fetchEcardProfile?
  setEcardAuth?
}

const ss = {
  screen: {

  } as ViewStyle,
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
    flex: 1,
    justifyContent: "space-between",
  } as ViewStyle,
  headerBar: {
    marginBottom: 24,
  } as ViewStyle,
  button: {
    paddingHorizontal: 40,
  } as ViewStyle,
  heading: {
    marginVertical: 10,
    fontWeight: "normal",
  } as TextStyle,
  subhead: {
    marginLeft: 5,
    color: color.lightGrey,
  } as TextStyle,
  input: {
    marginBottom: 4,
  } as ViewStyle,
  byText: {
    fontWeight: "bold",
    letterSpacing: -1,
    fontSize: 15,
  } as TextStyle,
  by: {
    marginTop: 20,
    marginBottom: 10,
  } as ViewStyle,
  buttonRow: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  } as ViewStyle
}

export class BindScreen extends React.Component<BindScreenProps, {}> {
  state = {
    cardId: "",
    password: ""
  }

  attemptToBind = () => {
    this.props.fetchEcardProfile(this.state.cardId, this.state.password)
      .then(() => {
        Toast.show(<Text tx="accountBinding.bindSuccess" style={{ color: toastOptions.primary.textColor }}/> as any, toastOptions.primary)
        this.props.setEcardAuth(this.state.cardId, this.state.password)
        this.props.navigation.goBack()
      })
      .catch((err) => {
        Toast.show(<Text text={`${err.error_code} / ${err.message}`} style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
      })
  }

  render () {
    return (
      <Screen style={ss.screen}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle='dark-content'
        />

        <TopBar actions={[
          () => this.props.navigation.goBack()
        ]}/>

        <View style={ss.container}>
          <View>
            <View style={ss.headerBar}>
              <Text tx="accountBinding.greetings" preset="h1" style={ss.heading}/>
            </View>
            <View>
              <TextField
                placeholderTx="accountBinding.ecardId"
                keyboardType="numeric"
                style={ss.input}
                onChangeText={(text) => this.setState({ cardId: text })}
                value={this.state.cardId}
                autoFocus={true}
                autoCorrect={false}/>
              <TextField
                placeholderTx="accountBinding.ecardPassword"
                keyboardType="numeric"
                style={ss.input}
                onChangeText={(text) => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry={true}
                autoCorrect={false}/>
              <View style={ss.buttonRow}>
                <Button style={ss.button} tx="accountBinding.bind" onPress={this.attemptToBind} />
              </View>
            </View>
          </View>

          <ByTwt fill={color.black(0.07)} style={ss.by}>
            <Text text="SecureAuth™" style={ss.byText}/>
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
    fetchEcardProfile: async (cardId, password) => {
      await dispatch(fetchEcardProfile(cardId, password))
    },
    setEcardAuth: (cardId, password) => {
      dispatch(setEcardAuth(cardId, password))
    }
  }
}

export const connectedBindScreen = connect(mapStateToProps, mapDispatchToProps)(BindScreen)
