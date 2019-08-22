import * as React from "react"
import { connect } from "react-redux"

import {
  DeviceEventEmitter,
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
} from "react-native"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { fetchGpaData } from "../../actions/data-actions"
import ss from "./gpa-screen.style"
import Modal from "react-native-modal"
import { Toasti } from "../../components/toasti"
import { TopBar } from "../../components/top-bar"
import { Alert } from "../../components/alert"
import { TabView, SceneMap } from "react-native-tab-view"
import GpaScreenMain from "./gpa-screen-main"

export interface GpaScreenProps extends NavigationScreenProps<{}> {
  fetchGpaData?
}

export class GpaScreen extends React.Component<GpaScreenProps, {}> {
  state = {
    index: 0,
    routes: [{ key: "main", title: "Main" }, { key: "exp", title: "Exp" }],
    refreshing: false,
    isModalVisible: false,
  }

  prepareData = async () => {
    await Promise.all([this.props.fetchGpaData()])
      .then(() => {
        DeviceEventEmitter.emit("showToast", <Toasti tx="data.prepareDataSuccess" preset="gpa" />)
      })
      .catch(err => {
        DeviceEventEmitter.emit("showToast", <Toasti text={err.message} preset="error" />)
      })
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.prepareData().then(() => {
      this.setState({ refreshing: false })
    })
  }

  mainViewRoute = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          tintColor={color.module.gpa[1]}
          colors={[color.module.gpa[0]]}
        />
      }
    >
      <GpaScreenMain />
    </ScrollView>
  )

  expViewRoute = () => <View />

  _keyExtractor = item => String(item.no)

  render() {
    return (
      <Screen style={ss.screen}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        <Modal
          isVisible={this.state.isModalVisible}
          backdropColor={ss.screen.backgroundColor}
          onBackButtonPress={this.toggleModal}
          onBackdropPress={this.toggleModal}
          useNativeDriver={true}
          key={"0"}
        >
          <Alert
            headingTx="gpa.info.title"
            contentTx="gpa.info.content"
            palette={[color.module.gpa[0], color.module.gpa[1]]}
            buttons={[
              {
                tx: "common.gotIt",
                onPress: () => {
                  this.toggleModal()
                },
              },
            ]}
          />
        </Modal>

        <TopBar
          elements={{
            left: [
              {
                iconText: "arrow_back",
                action: () => this.props.navigation.goBack(),
              },
            ],
            right: [
              {
                iconText: "info_outline",
                action: this.toggleModal,
              },
              {
                iconText: "sync",
                action: this._onRefresh,
              },
            ],
          }}
          color={color.module.gpa[1]}
        />

        <TabView
          navigationState={this.state}
          renderScene={
            SceneMap({
              main: this.mainViewRoute,
              exp: this.expViewRoute,
            }) as any
          }
          renderTabBar={() => null}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get("window").width }}
        />
      </Screen>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGpaData: async () => {
      await dispatch(fetchGpaData())
    },
  }
}

export const connectedGpaScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GpaScreen)
export default connectedGpaScreen
