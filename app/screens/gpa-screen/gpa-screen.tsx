import * as React from "react"
import { connect } from "react-redux"

import {FlatList, RefreshControl, ScrollView, StatusBar, View} from "react-native"
import { Screen } from "../../components/screen"
import { color, ssGlobal } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { setScoreType, setSemesterIndex } from "../../actions/gpa-type-actions"
import { fetchGpaData } from "../../actions/data-actions"
import { connectedGpaCurve as GpaCurve } from "../../components/gpa-curve"
import { digitsFromScoreType } from "../../utils/common"
import { GpaStat } from "../../components/gpa-stat/gpa-stat"
import ss from "./gpa-screen.style"
import { connectedGpaRadar as GpaRadar } from "../../components/gpa-radar"
import { GpaSnack } from "../../components/gpa-radar/gpa-snack"
import Touchable from 'react-native-platform-touchable'
import { Text } from "../../components/text"
import Toast from "react-native-root-toast";
import toastOptions from "../../theme/toast";

export interface GpaScreenProps extends NavigationScreenProps<{}> {
  setScoreType?
  scoreType?
  fetchGpaData?
  gpa?
  semesterIndex?
}

export class GpaScreen extends React.Component<GpaScreenProps, {}> {

  state = {
    refreshing: false,
  }

  prepareData = async () => {
    await Promise.all([
      this.props.fetchGpaData()
    ]).then((values) => {
      Toast.show(<Text tx="gpaScreen.prepareDataSuccess" style={{ color: toastOptions.primary.textColor }}/> as any, toastOptions.primary)
      console.log(values)
    }).catch((err) => {
      console.log(err)
      Toast.show(<Text tx="gpaScreen.prepareDataFailed" style={{ color: toastOptions.err.textColor }}/> as any, toastOptions.err)
    })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.prepareData().then(() => {
      this.setState({ refreshing: false })
    })
  }

  _keyExtractor = (item, index) => String(item.no);

  render () {

    const { gpa, scoreType, setScoreType, semesterIndex } = this.props

    // data for GpaStat component
    let semestralStat = {}
    for (let key in gpa.data.gpaSemestral) {
      semestralStat[key] = gpa.data.gpaSemestral[key][semesterIndex].y.toFixed(digitsFromScoreType(key))
    }

    return (
      <Screen>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        } >
          <StatusBar backgroundColor={color.background} barStyle="dark-content" />
          <View style={[ssGlobal.topBar.container, ss.topBar]}>
            <View style={ssGlobal.topBar.side}>
              <Touchable
                background={Touchable.Ripple(color.lightGrey, true)}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={[ssGlobal.topBar.icon, ss.topBarIcon]} text="arrow_back" preset="i"/>
              </Touchable>
            </View>
            <View style={ssGlobal.topBar.side}>
              <Touchable
                background={Touchable.Ripple(color.lightGrey, true)}
                onPress={() => Toast.show(<Text text="Secondary classes currently unusable" style={{ color: toastOptions.primary.textColor }}/> as any, toastOptions.primary)}
              >
                <Text style={[ssGlobal.topBar.icon, ss.topBarIcon]} text="visibility_off" preset="i"/>
              </Touchable>
              <Touchable
                background={Touchable.Ripple(color.lightGrey, true)}
                onPress={this._onRefresh}
              >
                <Text style={[ssGlobal.topBar.icon, ss.topBarIcon]} text="sync" preset="i"/>
              </Touchable>
            </View>
          </View>
          <View style={ss.container}>
            <GpaRadar
              style={ss.radar}
            />
            <GpaStat
              status={gpa.status}
              setScoreType={(scoreType) => setScoreType(scoreType)}
              scores={semestralStat}
              txs={["gpa.semestralWeighted", "gpa.semestralGpa", "gpa.creditsEarned"]}
            />
            <GpaCurve
              data={gpa.data.gpaSemestral[scoreType]}
              status={gpa.status}
              scoreToFixed={digitsFromScoreType(scoreType)}
              animated={false}
            />
            <FlatList
              style={ss.list}
              data={gpa.data.gpaDetailed[semesterIndex].data}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => (
                <GpaSnack
                  style={ss.snackStyle}
                  score={item['score']}
                  courseName={item['name']}
                  courseType={item['classType']}
                  credits={item['credit']}
                />
              )}
            />
          </View>
        </ScrollView>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    scoreType: state.gpaTypeReducer,
    gpa: state.dataReducer.gpa,
    semesterIndex: state.semesterReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreType: (newType) => {
      dispatch(setScoreType(newType))
    },
    setSemesterIndex: (newType) => {
      dispatch(setSemesterIndex(newType))
    },
    fetchGpaData: async () => {
      await dispatch(fetchGpaData())
    }
  }
}

export const connectedGpaScreen = connect(mapStateToProps, mapDispatchToProps)(GpaScreen)
export default connectedGpaScreen
