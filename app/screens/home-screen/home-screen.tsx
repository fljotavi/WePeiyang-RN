/*
 * Home Screen
 * Created by Tzingtao Chow
 * ---
 *
 * Home Screen 是正常状态下登录微北洋后，或打开存储了有效 Token 的微北洋后会跳转到的主页。
 * 这里会显示模块导航、GPA 曲线、今日课程、借阅书籍等主要数据。
 *
 */

import * as React from "react"
import { connect } from "react-redux"
import { setScoreType } from "../../actions/preference-actions"
import {
  fetchGpaData,
  fetchCourseData,
  fetchLibraryData,
  fetchUserData,
  fetchEcardProfile,
} from "../../actions/data-actions"

import { NavigationScreenProps } from "react-navigation"
import ss from "./home-screen.style"

import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  DeviceEventEmitter,
} from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { GpaCurve } from "../../components/gpa-curve"
import { GpaStat } from "../../components/gpa-stat/gpa-stat"
import { CourseDailySchedule } from "../../components/course-daily-schedule"
import { LibraryList } from "../../components/library-list"

import { format } from "date-fns"
import { connectedEcardBlock as EcardBlock } from "../../components/ecard-block"
import { color } from "../../theme"
import { Toasti } from "../../components/toasti"
import { ModuleButtonList } from "../../components/module-button-list"

export interface HomeScreenProps extends NavigationScreenProps<{}> {
  scoreType?
  setScoreType?

  fetchGpaData?
  fetchCourseData?
  fetchUserData?
  fetchLibraryData?
  fetchEcardProfile?

  compData?
  pref?
}

class HomeScreen extends React.Component<HomeScreenProps, {}> {
  state = {
    refreshing: false,
  }

  prepareData = async () => {
    let toFetch = [this.props.fetchUserData()]

    await Promise.all(toFetch) // 首先获取用户信息，判定各账户绑定状态，以决定下一步所请求哪些接口
      .then(() => {
        let toFetchFollows = []
        if (this.props.compData.userInfo.data.accounts.tju) {
          // 已绑定办公网，可获取相关数据
          toFetchFollows.push(this.props.fetchCourseData())
          toFetchFollows.push(this.props.fetchGpaData())
        }
        if (this.props.compData.userInfo.data.accounts.lib) {
          // 已绑定图书馆，可获取相关数据
          toFetchFollows.push(this.props.fetchLibraryData())
        }
        if (this.props.compData.ecard.auth.status === "BOUND") {
          // 已绑定校园卡，可获取相关数据
          toFetchFollows.push(
            this.props.fetchEcardProfile(
              this.props.compData.ecard.auth.cardId,
              this.props.compData.ecard.auth.password,
            ),
          )
        }
        Promise.all(toFetchFollows)
          .then(() => {
            DeviceEventEmitter.emit("showToast", <Toasti tx="data.prepareDataSuccess" />)
          })
          .catch(err => {
            DeviceEventEmitter.emit(
              "showToast",
              <Toasti
                // 由于 api 中的错误消息本身没有 i18n，故此处也暂时无必要实现 i18n
                text={`部分数据未传输成功：请求 ${err.origin} 时收到错误 ${err.message}`}
                preset="warning"
              />,
            )
          })
      })
      .catch(err => {
        DeviceEventEmitter.emit(
          "showToast",
          <Toasti
            text={`获取用户数据时收到错误 (${err.message})。请检查您的登录状态。`}
            preset="warning"
          />,
        )
      })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.prepareData().then(() => {
      this.setState({ refreshing: false })
    })
  }

  componentDidMount(): void {
    if (this.props.compData.status === "INIT") {
      this._onRefresh()
    }
  }

  render() {
    // Grab the props
    const { compData, pref } = this.props
    console.log("HomeScreen compData", compData)
    if (compData.userInfo.status !== "VALID") {
      return <View />
    }

    let dateToRender = new Date(Date.now())
    let timestamp = dateToRender.getTime()
    const dateLocales = {
      en: require("date-fns/locale/en"),
      es: require("date-fns/locale/es"),
      ar: require("date-fns/locale/ar"),
    }

    return (
      <Screen>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor={color.primary}
              colors={[color.primary]}
            />
          }
        >
          <View style={ss.container}>
            <View style={ss.headerBar}>
              <View style={ss.headerGroup}>
                <Text tx="homeScreen.greetings" preset="h2" />
                <Text text=" " preset="h2" />
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("user")}>
                <View style={ss.userInfo}>
                  <Text text={compData.userInfo.data.twtuname} style={ss.userName} />
                  <Image
                    loadingIndicatorSource={require("../../assets/loading.png")}
                    source={{ uri: compData.userInfo.data.avatar }}
                    style={ss.avatar}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <ModuleButtonList
              navigation={this.props.navigation}
              blockStyle={ss.blockWithMarginRight}
              style={ss.horiScrollSelf}
              contentContainerStyle={ss.horiScroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              allowDrag={true}
            />

            <View style={ss.sectionHead}>
              <Text
                tx={String(dateToRender)}
                customTranslationMethod={(lang, tx) => {
                  return format(new Date(tx), "MMM Do dddd", {
                    locale: dateLocales[lang],
                  })
                }}
                preset="h5"
              />
            </View>
            <CourseDailySchedule
              data={compData.course.data}
              status={compData.course.status}
              timestamp={timestamp}
            />

            <View style={ss.sectionHead}>
              <Text tx="modules.library" preset="h5" />
            </View>
            <LibraryList />

            {!pref.hideGpaOnHomeScreen && (
              <View>
                <View style={ss.sectionHead}>
                  <Text tx="modules.gpaCurve" preset="h5" />
                </View>
                <GpaCurve style={ss.curveView} animated={true} />
                <GpaStat
                  style={ss.stat}
                  status={compData.gpa.status}
                  setScoreType={newType => this.props.setScoreType(newType)}
                  scores={compData.gpa.data.gpaOverall}
                  txs={["gpa.totalWeighted", "gpa.totalGpa", "gpa.creditsEarned"]}
                />
              </View>
            )}

            <View style={ss.sectionHead}>
              <Text tx="modules.ecard" preset="h5" />
            </View>
            <EcardBlock onPress={() => this.props.navigation.navigate("ecard")} />
          </View>
        </ScrollView>
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  return {
    compData: state.dataReducer,
    pref: state.preferenceReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setScoreType: newType => {
      dispatch(setScoreType(newType))
    },
    fetchGpaData: async () => {
      await dispatch(fetchGpaData())
    },
    fetchCourseData: async () => {
      await dispatch(fetchCourseData())
    },
    fetchUserData: async () => {
      await dispatch(fetchUserData())
    },
    fetchLibraryData: async () => {
      await dispatch(fetchLibraryData())
    },
    fetchEcardProfile: async (cardId, password) => {
      await dispatch(fetchEcardProfile(cardId, password))
    },
  }
}

export const connectedHomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)
