import * as React from "react"
import { connect } from "react-redux"
import { setScoreType } from "../../actions/preference-actions"
import {
  fetchGpaData,
  fetchCourseData,
  fetchLibraryData,
  fetchUserData,
  fetchEcardData
} from "../../actions/data-actions"
import { digitsFromScoreType } from "../../utils/common"

import { NavigationScreenProps } from "react-navigation"
import ss from "./home-screen.style"

import { View, Image, ScrollView, TouchableOpacity, RefreshControl, StatusBar } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { ModuleButton } from "../../components/module-button"
import { connectedGpaCurve as GpaCurve } from "../../components/gpa-curve"
import { GpaStat } from "../../components/gpa-stat/gpa-stat"
import { CourseDailySchedule } from "../../components/course-daily-schedule"
import { LibraryList } from "../../components/library-list"

import { format } from "date-fns"
import Toast from "react-native-root-toast"
import toastOptions from "../../theme/toast"
import { connectedEcardBlock as EcardBlock } from "../../components/ecard-block"

export interface HomeScreenProps extends NavigationScreenProps<{}> {

  scoreType?
  setScoreType?

  fetchGpaData?
  fetchCourseData?
  fetchUserData?
  fetchLibraryData?
  fetchEcardData?

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
    if (this.props.compData.ecard.auth.status === 'BOUND') toFetch.push(this.props.fetchEcardData(this.props.compData.ecard.auth.cardId, this.props.compData.ecard.auth.password))
    await Promise.all(toFetch).then((values) => {
      Toast.show(<Text tx="homeScreen.prepareDataSuccess" style={{ color: toastOptions.primary.textColor }}/> as any, toastOptions.primary)
    }).catch((err) => {
      console.log(err)
      Toast.show(<Text tx="homeScreen.partialData" style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
    })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.prepareData().then(() => {
      this.setState({ refreshing: false })
    })
  }

  componentWillMount(): void {
    if (this.props.compData.status === "INIT") this.prepareData()
  }

  render () {

    // Grab the props
    const {
      scoreType, setScoreType, compData
    } = this.props

    let dayToRender = new Date("2019-09-24")
    let timestamp = new Date(dayToRender).getTime()
    let formattedHead = format(
      new Date(dayToRender),
      'MMM Do, dddd'
    )

    return (
      <Screen>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle='dark-content'
        />
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        } >
          <View style={ss.container}>
            <View style={ss.headerBar}>
              <Text text="Hello" preset="h2"/>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('user')}>
                <View style={ss.userInfo}>
                  <Text text={compData.userInfo.data.twtuname} style={ss.userName}/>
                  <Text text="  "/>
                  <Image source={{ uri: compData.userInfo.data.avatar }} style={ss.avatar}/>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView style={ss.horiScrollSelf} contentContainerStyle={ss.horiScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
              <ModuleButton style={ss.blockWithMarginRight} tx="modules.bike" icon="directions_bike"/>
              <ModuleButton style={ss.blockWithMarginRight} tx="modules.gpa" icon="timeline" onPress={() => this.props.navigation.navigate('gpa')}/>
              <ModuleButton style={ss.blockWithMarginRight} tx="modules.contact" icon="call"/>
              <ModuleButton style={ss.blockWithMarginRight} tx="modules.learning" icon="assignment_turned_in"/>
              <ModuleButton style={ss.blockWithMarginRight} tx="modules.library" icon="local_library"/>
              <ModuleButton style={ss.blockWithMarginRight} tx="modules.cards" icon="credit_card"/>
              <ModuleButton style={ss.blockWithMarginRight} tx="modules.classroom" icon="room"/>
              <ModuleButton style={ss.blockWithMarginRight} tx="modules.coffee" icon="free_breakfast"/>
              <ModuleButton tx="modules.buses" icon="directions_bus"/>
            </ScrollView>

            <View style={ss.sectionHead}>
              <Text text={formattedHead} preset="h5"/>
            </View>
            <CourseDailySchedule
              data={compData.course.data}
              status={compData.course.status}
              timestamp={timestamp}
            />

            <View style={ss.sectionHead}>
              <Text text="Library" preset="h5"/>
            </View>
            <LibraryList data={compData.library.data} status={compData.library.status} />

            <View style={ss.sectionHead}>
              <Text text="GPA Curve" preset="h5"/>
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
              setScoreType={(scoreType) => setScoreType(scoreType)}
              scores={compData.gpa.data.gpaOverall}
              txs={["gpa.totalWeighted", "gpa.totalGpa", "gpa.creditsEarned"]}
            />

            <View style={ss.sectionHead}>
              <Text text="E-card" preset="h5"/>
            </View>
            <EcardBlock onPress={() => this.props.navigation.navigate('ecard')}/>

          </View>
        </ScrollView>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    scoreType: state.preferenceReducer.scoreType,
    compData: state.dataReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreType: (newType) => {
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
    fetchEcardData: async (cardId, password) => {
      await dispatch(fetchEcardData(cardId, password))
    },
  }
}

export const connectedHomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
