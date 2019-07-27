import * as React from "react"

import { connect } from "react-redux"
import { setScoreType } from "../../actions/gpa-type-actions"
import { fetchGpaData, fetchCourseData, fetchLibraryData, fetchUserData } from "../../actions/data-actions"
import { digitsFromScoreType } from "../../utils/common"

import { NavigationScreenProps } from "react-navigation"
import ss from "./home-screen.style"

import { View, Image, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { Button } from "../../components/button"
import { ModuleButton } from "../../components/module-button"
import { GpaCurve } from "../../components/gpa-curve"
import { GpaStat } from "../../components/gpa-stat/gpa-stat"
import { CourseDailySchedule } from "../../components/course-daily-schedule"
import { BookList } from "../../components/book-list"

import { format } from "date-fns"

export interface HomeScreenProps extends NavigationScreenProps<{}> {

  scoreType?
  setScoreType?

  gpaData?
  fetchGpaData?

  courseData?
  fetchCourseData?

  userData?
  fetchUserData?

  libraryData?
  fetchLibraryData?

}

class HomeScreen extends React.Component<HomeScreenProps, {}> {

  state = {
    refreshing: false,
  }
  prepareData = () => {
    this.props.fetchUserData()
    this.props.fetchCourseData()
    this.props.fetchLibraryData()
    this.props.fetchGpaData()
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.props.fetchGpaData().then(() => {
      this.setState({ refreshing: false })
    })
  }

  componentWillMount(): void {
    this.prepareData()
  }

  render () {

    // Grab the props
    const {
      scoreType, setScoreType, gpaData, courseData, userData, libraryData
    } = this.props

    let dayToRender = new Date("2019-09-24")
    let timestamp = new Date(dayToRender).getTime()
    let formattedHead = format(
      new Date(dayToRender),
      'MMM Do, dddd'
    )

    return (
      <ScrollView refreshControl={
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
                <Text text={userData.data.twtuname} style={ss.userName}/>
                <Text text="  "/>
                <Image source={{ uri: userData.data.avatar }} style={ss.avatar}/>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={ss.horiScrollSelf} contentContainerStyle={ss.horiScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
            <ModuleButton style={ss.blockWithMarginRight} tx="modules.bike" icon="directions_bike"/>
            <ModuleButton style={ss.blockWithMarginRight} tx="modules.contact" icon="call"/>
            <ModuleButton style={ss.blockWithMarginRight} tx="modules.learning" icon="assignment_turned_in"/>
            <ModuleButton style={ss.blockWithMarginRight} tx="modules.library" icon="local_library"/>
            <ModuleButton style={ss.blockWithMarginRight} tx="modules.cards" icon="credit_card"/>
            <ModuleButton style={ss.blockWithMarginRight} tx="modules.gpa" icon="timeline"/>
            <ModuleButton style={ss.blockWithMarginRight} tx="modules.classroom" icon="room"/>
            <ModuleButton style={ss.blockWithMarginRight} tx="modules.coffee" icon="free_breakfast"/>
            <ModuleButton tx="modules.buses" icon="directions_bus"/>
          </ScrollView>
          <View style={ss.sectionHead}>
            <Text text={formattedHead} preset="h5"/>
          </View>
          <CourseDailySchedule
            data={courseData.data}
            status={courseData.status}
            timestamp={timestamp}
          />
          <View style={ss.sectionHead}>
            <Text text="Library" preset="h5"/>
          </View>
          <BookList data={libraryData.data} status={libraryData.status} />
          <View style={ss.sectionHead}>
            <Text text="GPA Curve" preset="h5"/>
          </View>
          <GpaCurve
            data={gpaData.data.gpaSemestral[scoreType]}
            status={gpaData.status}
            style={ss.curveView}
            scoreToFixed={digitsFromScoreType(scoreType)}
          />
          <GpaStat
            style={ss.stat}
            status={gpaData.status}
            setScoreType={(scoreType) => setScoreType(scoreType)}
            scores={gpaData.data.gpaOverall}
          />
          <Button style={ss.moreButton} tx="homeScreen.more"/>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    scoreType: state.gpaTypeReducer,
    gpaData: state.gpaDataReducer,
    courseData: state.courseDataReducer,
    userData: state.userDataReducer,
    libraryData: state.libraryDataReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreType: (newType) => {
      dispatch(setScoreType(newType))
    },
    fetchGpaData: () => {
      dispatch(fetchGpaData())
    },
    fetchCourseData: () => {
      dispatch(fetchCourseData())
    },
    fetchUserData: () => {
      dispatch(fetchUserData())
    },
    fetchLibraryData: () => {
      dispatch(fetchLibraryData())
    }
  }
}

export const connectedHomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
