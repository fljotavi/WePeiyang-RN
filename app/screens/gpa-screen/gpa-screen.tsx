import * as React from "react"
import { connect } from "react-redux"

import { StatusBar, View } from "react-native"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { setScoreType } from "../../actions/gpa-type-actions"
import { fetchGpaData } from "../../actions/data-actions"
import { GpaCurve } from "../../components/gpa-curve"
import { digitsFromScoreType } from "../../utils/common"
import { GpaStat } from "../../components/gpa-stat/gpa-stat"
import ss from "./gpa-screen.style"
import { GpaRadar } from "../../components/gpa-radar"

export interface GpaScreenProps extends NavigationScreenProps<{}> {
  setScoreType?
  scoreType?
  fetchGpaData?
  gpa?
}

export class GpaScreen extends React.Component<GpaScreenProps, {}> {
  render () {

    const { gpa, scoreType, setScoreType } = this.props

    return (
      <Screen preset="scroll">
        <StatusBar backgroundColor={color.background} barStyle="dark-content" />
        <View style={ss.container}>
          <GpaRadar
            status={gpa.status}
            scores={gpa.data.gpaDetailed[0]} // TODO: Change index to currentSemester in store
          />
          <GpaStat
            style={ss.stat}
            status={gpa.status}
            setScoreType={(scoreType) => setScoreType(scoreType)}
            scores={gpa.data.gpaOverall}
          />
          <GpaCurve
            data={gpa.data.gpaSemestral[scoreType]}
            status={gpa.status}
            scoreToFixed={digitsFromScoreType(scoreType)}
          />
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    scoreType: state.gpaTypeReducer,
    gpa: state.dataReducer.gpa,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreType: (newType) => {
      dispatch(setScoreType(newType))
    },
    fetchGpaData: async () => {
      await dispatch(fetchGpaData())
    }
  }
}

export const connectedGpaScreen = connect(mapStateToProps, mapDispatchToProps)(GpaScreen)
