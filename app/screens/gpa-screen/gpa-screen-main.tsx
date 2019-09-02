/*
 * GPA Screen Main
 * Created by Tzingtao Chow
 * ---
 *
 * GPA Screen Main 是 GPA Screen 中的主 Tab。
 * 它包含了成绩曲线、雷达图和各科成绩等。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { ScrollView, View } from "react-native"
import { color } from "../../theme"
import { GpaCurve } from "../../components/gpa-curve"
import { digitsFromScoreType } from "../../utils/common"
import { GpaRadar } from "../../components/gpa-radar"
import GpaSnackList from "./components/gpa-snack-list"
import GpaStatSemestral from "./components/gpa-stat-semestral"

export interface GpaScreenMainProps {
  scoreType?
  gpa?
}

class _GpaScreenMain extends React.Component<GpaScreenMainProps, {}> {
  render() {
    const { gpa, scoreType } = this.props
    if (gpa.status !== "VALID") return <View />
    const ss = require("./gpa-screen.style.ts").default
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ss.radarContainer}>
          <GpaRadar />
        </View>

        <View style={ss.container}>
          <GpaStatSemestral />

          <GpaCurve
            style={ss.curve}
            data={gpa.data.gpaSemestral[scoreType]}
            status={gpa.status}
            scoreToFixed={digitsFromScoreType(scoreType)}
            animated={false}
            palette={[
              color.module().gpa[3],
              color.module().gpa[1],
              color.module().gpa[3],
              color.module().gpa[1],
              color.module().gpa[0],
            ]}
          />

          <GpaSnackList />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    scoreType: state.preferenceReducer.scoreType,
    gpa: state.dataReducer.gpa,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const GpaScreenMain = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_GpaScreenMain)
export default GpaScreenMain
