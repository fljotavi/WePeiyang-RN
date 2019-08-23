/*
 * GPA Screen
 * Created by Tzingtao Chow
 * ---
 *
 * GPA Screen 是 GPA 模块的主页。
 * 它目前包含两个 Tab，每个 Tab 的内容分别绘制在各自的 gpa-screen-{tabname}.tsx 文件中。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import {
  DeviceEventEmitter,
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native"
import { Screen } from "../../components/screen"
import { color, ssGlobal } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { fetchGpaData } from "../../actions/data-actions"
import ss from "./gpa-screen.style"
import Modal from "react-native-modal"
import { Toasti } from "../../components/toasti"
import { TopBar } from "../../components/top-bar"
import { Alert } from "../../components/alert"
import { TabView, SceneMap } from "react-native-tab-view"
import GpaScreenMain from "./gpa-screen-main"
import { Text } from "../../components/text"
import GpaScreenExp from "./gpa-screen-exp"

export interface GpaScreenProps extends NavigationScreenProps<{}> {
  fetchGpaData?
}

export class GpaScreen extends React.Component<GpaScreenProps, {}> {
  state = {
    index: 0,
    routes: [{ key: "main", titleTx: "gpa.tab.main" }, { key: "exp", titleTx: "gpa.tab.exp" }],
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

  mainViewRoute = () => <GpaScreenMain />

  expViewRoute = () => <GpaScreenExp />

  _keyExtractor = item => String(item.no)

  _renderTabBar = props => {
    return (
      <View style={ssGlobal.tabBar.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={ssGlobal.tabBar.tabItem}
              onPress={() => this.setState({ index: i })}
            >
              <Text
                tx={route.titleTx}
                preset="lausanne"
                style={[ssGlobal.tabBar.tabText, { color: color.module.gpa[1] }]}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

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
