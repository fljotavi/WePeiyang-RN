import * as React from "react"
import { connect } from "react-redux"
import { RefreshControl, ScrollView, StatusBar, View, ViewStyle } from "react-native"
import Color from 'color'
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { connectedEcardBlock as EcardBlock } from "../../components/ecard-block"
import { TopBar } from "./top-bar"
import Toast from "react-native-root-toast"
import { Text } from "../../components/text"
import toastOptions from "../../theme/toast"
import { fetchEcardProfile } from "../../actions/data-actions"

export interface EcardScreenProps extends NavigationScreenProps<{}> {
  ecard?
  fetchEcardProfile?
}

const ss = {
  screen: {
    backgroundColor: color.module.ecard,
  } as ViewStyle,
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingBottom: layoutParam.paddingVertical
  } as ViewStyle,
}

export class EcardScreen extends React.Component<EcardScreenProps, {}> {

  state = {
    refreshing: false,
    isModalVisible: false,
  }

  prepareData = async () => {
    await Promise.all([
      this.props.fetchEcardProfile(this.props.ecard.auth.cardId, this.props.ecard.auth.password)
    ]).then((values) => {
      Toast.show(<Text tx="ecardScreen.prepareDataSuccess" style={{ color: toastOptions.ecard.textColor }}/> as any, toastOptions.ecard)
      console.log(values)
    }).catch((err) => {
      console.log(err)
      Toast.show(<Text tx="ecardScreen.prepareDataFailed" style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
    })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.prepareData().then(() => {
      this.setState({ refreshing: false })
    })
  }

  render () {
    return (

      <Screen style={ss.screen}>
        <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle='light-content'
        />

        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        } >

          <TopBar actions={[
            () => this.props.navigation.goBack(),
            () => {},
            this._onRefresh
          ]}/>

          <View style={ss.container}>
            <EcardBlock palette={[Color(color.module.ecard).lighten(0.1).string(), color.background, color.background]}/>
          </View>

        </ScrollView>

      </Screen>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    ecard: state.dataReducer.ecard
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEcardProfile: async (cardId, password) => {
      await dispatch(fetchEcardProfile(cardId, password))
    },
  }
}

export const connectedEcardScreen = connect(mapStateToProps, mapDispatchToProps)(EcardScreen)
