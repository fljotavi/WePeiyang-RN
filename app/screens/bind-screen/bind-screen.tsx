import * as React from "react"
import { connect } from 'react-redux'

import { View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import {fetchEcardData, setEcardAuth} from "../../actions/data-actions"
import Toast from "react-native-root-toast";
import toastOptions from "../../theme/toast";

export interface BindScreenProps extends NavigationScreenProps<{}> {
  fetchEcardData?
  setEcardAuth?
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

export class BindScreen extends React.Component<BindScreenProps, {}> {
  state = {
    cardId: "",
    password: ""
  }

  attemptToBind = () => {
    this.props.fetchEcardData(this.state.cardId, this.state.password)
      .then((resp) => {
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
      <Screen preset="scroll">
        <View style={ss.container}>
          <View style={ss.headerBar}>
            <Text tx="accountBinding.greetings" preset="h2"/>
          </View>
          <View>
            <TextField
              placeholderTx="accountBinding.ecardId"
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ cardId: text })}
              value={this.state.cardId}
              autoFocus={true}
              autoCorrect={false}/>
            <TextField
              placeholderTx="accountBinding.ecardPassword"
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
              secureTextEntry={true}
              autoCorrect={false}/>
            <Button style={ss.fieldWithMarginTop} tx="auth.login" onPress={this.attemptToBind} />
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
    fetchEcardData: async (cardId, password) => {
      await dispatch(fetchEcardData(cardId, password))
    },
    setEcardAuth: (cardId, password) => {
      dispatch(setEcardAuth(cardId, password))
    }
  }
}

export const connectedBindScreen = connect(mapStateToProps, mapDispatchToProps)(BindScreen)
