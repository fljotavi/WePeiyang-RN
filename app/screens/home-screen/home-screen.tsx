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
import { digitsFromScoreType } from "../../utils/common"

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
import { ModuleButton } from "../../components/module-button"
import { connectedGpaCurve as GpaCurve } from "../../components/gpa-curve"
import { GpaStat } from "../../components/gpa-stat/gpa-stat"
import { CourseDailySchedule } from "../../components/course-daily-schedule"
import { LibraryList } from "../../components/library-list"

import { format } from "date-fns"
import { connectedEcardBlock as EcardBlock } from "../../components/ecard-block"
import { color } from "../../theme"
import { Toasti } from "../../components/toasti"

export interface HomeScreenProps extends NavigationScreenProps<{}> {
  scoreType?
  setScoreType?

  fetchGpaData?
  fetchCourseData?
  fetchUserData?
  fetchLibraryData?
  fetchEcardProfile?

  compData?
}

class HomeScreen extends React.Component<HomeScreenProps, {}> {
  state = {
    refreshing: false,
  }

  prepareData = async () => {
    let toFetch = [
      this.props.fetchUserData(),
      this.props.fetchCourseData(),
      this.props.fetchLibraryData(),
      this.props.fetchGpaData(),
    ]
    if (this.props.compData.ecard.auth.status === "BOUND") {
      toFetch.push(
        this.props.fetchEcardProfile(
          this.props.compData.ecard.auth.cardId,
          this.props.compData.ecard.auth.password,
        ),
      )
    }
    await Promise.all(toFetch)
      .then(() => {
        DeviceEventEmitter.emit("showToast", <Toasti tx="data.prepareDataSuccess" />)
      })
      .catch(err => {
        console.log(err)
        DeviceEventEmitter.emit(
          "showToast",
          <Toasti
            text={`Part of the data wasn't successfully transmitted: Error ${err.message} in request ${err.origin}`}
            preset="error"
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
    const { scoreType, compData } = this.props

    let dayToRender = "2018-05-08"
    let timestamp = new Date(dayToRender).getTime()
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
                  <Image source={{ uri: compData.userInfo.data.avatar }} style={ss.avatar} />
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={ss.horiScrollSelf}
              contentContainerStyle={ss.horiScroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <ModuleButton
                style={ss.blockWithMarginRight}
                tx="modules.bike"
                icon="directions_bike"
              />
              <ModuleButton
                style={ss.blockWithMarginRight}
                tx="modules.schedule"
                icon="event"
                onPress={() => this.props.navigation.navigate("schedule")}
              />
              <ModuleButton
                style={ss.blockWithMarginRight}
                tx="modules.gpa"
                icon="timeline"
                onPress={() => this.props.navigation.navigate("gpa")}
              />
              <ModuleButton style={ss.blockWithMarginRight} tx="modules.contact" icon="call" />
              <ModuleButton
                style={ss.blockWithMarginRight}
                tx="modules.learning"
                icon="assignment_turned_in"
              />
              <ModuleButton
                style={ss.blockWithMarginRight}
                tx="modules.library"
                icon="local_library"
              />
              <ModuleButton
                style={ss.blockWithMarginRight}
                tx="modules.ecard"
                icon="credit_card"
                onPress={() => {
                  if (compData.ecard.auth.status === "BOUND") {
                    this.props.navigation.navigate("ecard")
                  } else {
                    this.props.navigation.navigate("bind")
                  }
                }}
              />
              <ModuleButton style={ss.blockWithMarginRight} tx="modules.classroom" icon="room" />
              <ModuleButton
                style={ss.blockWithMarginRight}
                tx="modules.coffee"
                icon="free_breakfast"
              />
              <ModuleButton tx="modules.buses" icon="directions_bus" />
            </ScrollView>

            <View style={ss.sectionHead}>
              <Text
                tx={dayToRender}
                customTranslationMethod={(lang, tx) => {
                  return format(new Date(tx), "MMM Do, dddd", {
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
            <LibraryList data={compData.library.data} status={compData.library.status} />

            <View style={ss.sectionHead}>
              <Text tx="modules.gpaCurve" preset="h5" />
            </View>
            <GpaCurve
              data={compData.gpa.data.gpaSemestral[scoreType]}
              status={compData.gpa.status}
              style={ss.curveView}
              scoreToFixed={digitsFromScoreType(scoreType)}
              animated={true}
            />
            <GpaStat
              style={ss.stat}
              status={compData.gpa.status}
              setScoreType={newType => this.props.setScoreType(newType)}
              scores={compData.gpa.data.gpaOverall}
              txs={["gpa.totalWeighted", "gpa.totalGpa", "gpa.creditsEarned"]}
            />

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
    scoreType: state.preferenceReducer.scoreType,
    compData: state.dataReducer,
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
