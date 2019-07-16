import * as React from "react"
import { View, Image, StatusBar, ScrollView, ViewStyle, ImageStyle } from "react-native"
import { connect } from "react-redux"
import { Screen } from "../../components/screen"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../components/text"
import { spacingDict, layoutParam, color } from "../../theme"
import { ModuleButton } from "../../components/module-button"
import { CourseBlock } from "../../components/course-block"
import { LibraryBlock } from "../../components/library-block"
import { GpaCurve } from "../../components/gpa-curve"
import { GpaStat } from "../../components/gpa-stat/gpa-stat"
import { IanButton } from "../../components/ian-button"

export interface HomeScreenProps extends NavigationScreenProps<{}> {
}

const avatarPlaceholder = {
  uri: 'https://i.loli.net/2019/07/14/5d2a9a218363047989.png'
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
    marginTop: 20
  } as ViewStyle,
  moreButton: {
    marginTop: 30,
    alignSelf: "stretch"
  } as ViewStyle
}

export class HomeScreen extends React.Component<HomeScreenProps, {}> {
  state = {
    gpaSemestral: {
      status: "notReceived",
      weighted: [],
      gradePoints: []
    },
    gpaDetailed: {}
  }

  componentWillMount(): void {
    setTimeout(() => {
      this.setState({
        gpaSemestral: {
          status: "valid",
          weighted: [
            { x: 1, y: 75 + Math.random() * 25 },
            { x: 2, y: 75 + Math.random() * 25 },
            { x: 3, y: 75 + Math.random() * 25 },
            { x: 4, y: 75 + Math.random() * 25 }
          ],
          gradePoints: [
            { x: 1, y: 3 + Math.random() },
            { x: 2, y: 3 + Math.random() },
            { x: 3, y: 3 + Math.random() },
            { x: 4, y: 3 + Math.random() }
          ]
        }
      })
    }, 4000)
  }

  render () {
    return (
      <Screen preset="scroll" scoreType={this.props.scoreType.scoreType}>
        <StatusBar backgroundColor={color.background} barStyle="dark-content" />
        <View style={ss.container}>
          <View style={ss.headerBar}>
            <Text text="Hello" preset="h2"/>
            <View style={ss.userInfo}>
              <Text text="Owlling"/>
              <Text text="    "/>
              <Image source={avatarPlaceholder} style={ss.avatar}/>
            </View>
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
          <ScrollView style={ss.horiScrollSelf} contentContainerStyle={ss.horiScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
            <CourseBlock style={ss.blockWithMarginRight} courseName={"Software Engineering"} timeSlot={"10:25-11:00"} location={"55-A205"}/>
            <CourseBlock style={ss.blockWithMarginRight} courseName={"BrainFuck Programming"} timeSlot={"10:25-11:00"} location={"55-A205"}/>
            <CourseBlock style={ss.blockWithMarginRight} courseName={"毛泽东思想与中国特色社会主义体系概论"} timeSlot={"10:25-11:00"} location={"55-A205"}/>
            <CourseBlock style={ss.blockWithMarginRight} courseName={"Practical Physics"} timeSlot={"10:25-11:00"} location={"55-A205"}/>
            <CourseBlock courseName={"Software Engineering"} timeSlot={"10:25-11:00"} location={"55-A205"}/>
          </ScrollView>
          <View style={ss.sectionHead}>
            <Text text="Library" preset="h5"/>
          </View>
          <ScrollView style={ss.horiScrollSelf} contentContainerStyle={ss.horiScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
            <LibraryBlock style={ss.blockWithMarginRight} bookName={"Design Philosophy"} borrowedTime={"2019-07-11"} daysLeft={5} />
            <LibraryBlock style={ss.blockWithMarginRight} bookName={"中华人民共和国宪法"} borrowedTime={"2019-03-11"} daysLeft={16} />
            <LibraryBlock bookName={"9 Comments on CCP"} borrowedTime={"2014-07-14"} daysLeft={41} />
          </ScrollView>
          <View style={ss.sectionHead}>
            <Text text="GPA Curve" preset="h5"/>
          </View>
          <GpaCurve data={this.state.gpaSemestral[this.props.scoreType.scoreType]} status={this.state.gpaSemestral.status} style={ss.curveView} />
          <GpaStat style={ss.stat} setScoreType={(scoreType) => this.props.setScoreType(scoreType)}/>
          <IanButton style={ss.moreButton} tx="homeScreen.more"/>
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    scoreType: state.gpaTypeReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreType: (newType) => {
      dispatch({
        type: "SET_SCORE_TYPE",
        payload: newType
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
