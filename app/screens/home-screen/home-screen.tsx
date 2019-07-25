import * as React from "react"
import { View, Image, ScrollView, ViewStyle, ImageStyle, TextStyle, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import { Screen } from "../../components/screen"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../components/text"
import { spacingDict, layoutParam } from "../../theme"
import { ModuleButton } from "../../components/module-button"
import { LibraryBlock } from "../../components/library-block"
import { GpaCurve } from "../../components/gpa-curve"
import { GpaStat } from "../../components/gpa-stat/gpa-stat"
import { IanButton } from "../../components/ian-button"
import { setScoreType } from "../../actions/gpa-type-actions"
import { digitsFromScoreType } from "../../utils/common"
import { twtGet } from "../../services/twt-fetch"
import { setGpaData, setCourseData, setUserData } from "../../actions/data-actions"
import { CourseDailySchedule } from "../../components/course-daily-schedule"

export interface HomeScreenProps extends NavigationScreenProps<{}> {
  scoreType?
  setScoreType?
  gpaData?
  setGpaData?
  courseData?
  setCourseData?
  userData?
  setUserData?
}

const ss = {
  avatar: {
    borderRadius: 40,
    height: 40,
    width: 40,
  } as ImageStyle,
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  userName: {
    marginTop: 2
  } as TextStyle,
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical
  } as ViewStyle,
  headerBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacingDict.large,
  } as ViewStyle,
  moduleButton: {
    marginRight: spacingDict.large,
  } as ViewStyle,
  horiScrollSelf: {
    overflow: 'visible'
  } as ViewStyle,
  horiScroll: {
    alignSelf: 'stretch',
    flexDirection: "row",
    justifyContent: 'space-between',
    overflow: 'visible',
  } as ViewStyle,
  sectionHead: {
    marginBottom: spacingDict.medium,
    marginTop: spacingDict.large,
  } as ViewStyle,
  blockWithMarginRight: {
    marginRight: spacingDict.medium,
  } as ViewStyle,
  mainView: {
    flex: 1,
  } as ViewStyle,
  curveView: {
    marginTop: -30
  } as ViewStyle,
  stat: {
    marginTop: 30
  } as ViewStyle,
  moreButton: {
    marginTop: 30,
    alignSelf: "stretch"
  } as ViewStyle
}

class HomeScreen extends React.Component<HomeScreenProps, {}> {

  prepareData = () => {

    twtGet("v2/auth/self")
      .then((response) => response.json())
      .then((responseJson) => {
        const fullData = responseJson
        console.log("User Data Format", fullData)
        this.props.setUserData(fullData)
      })

    twtGet("v1/gpa")
      .then((response) => response.json())
      .then((responseJson) => {
        const fullData = responseJson.data
        console.log("GPA Data Format", fullData)
        this.props.setGpaData(fullData)
      })
      .catch(error => {
        console.log("GPA Fetch failed", error)
      })

    twtGet("v1/classtable")
      .then((response) => response.json())
      .then((responseJson) => {
        const fullData = responseJson.data
        console.log("ClassTable Data Format", fullData)
        this.props.setCourseData(fullData)
      })

  }

  componentWillMount(): void {
    this.prepareData()
  }

  render () {

    // Grab the props
    const {
      scoreType, setScoreType, gpaData, courseData, userData
    } = this.props

    let dayToRender = "2019-09-01"

    return (
      <Screen preset="scroll">
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
            <Text text="Sept 7th, Wed." preset="h5"/>
          </View>
          <CourseDailySchedule
            data={courseData.data}
            status={courseData.status}
            timestamp={new Date(dayToRender).getTime()}
          />
          <View style={ss.sectionHead}>
            <Text text="Library" preset="h5"/>
          </View>
          <ScrollView style={ss.horiScrollSelf} contentContainerStyle={ss.horiScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
            <LibraryBlock style={ss.blockWithMarginRight} bookName={"Architecture Perspectives"} borrowedTime={"2019-05-15"} daysLeft={5} />
            <LibraryBlock style={ss.blockWithMarginRight} bookName={"GRE Verbal 150"} borrowedTime={"2019-05-15"} daysLeft={5} />
          </ScrollView>
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
          <IanButton style={ss.moreButton} tx="homeScreen.more"/>
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    scoreType: state.gpaTypeReducer,
    gpaData: state.gpaDataReducer,
    courseData: state.courseDataReducer,
    userData: state.userDataReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreType: (newType) => {
      dispatch(setScoreType(newType))
    },
    setGpaData: (data) => {
      dispatch(setGpaData(data))
    },
    setCourseData: (data) => {
      dispatch(setCourseData(data))
    },
    setUserData: (data) => {
      dispatch(setUserData(data))
    }
  }
}

export const connectedHomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
