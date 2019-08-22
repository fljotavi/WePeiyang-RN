import * as React from "react"
import { connect } from "react-redux"

import { View } from "react-native"
import { color } from "../../theme"
import { GpaCurve } from "../../components/gpa-curve"
import { digitsFromScoreType } from "../../utils/common"
import ss from "./gpa-screen.style"
import { GpaRadar } from "../../components/gpa-radar"
import GpaSnackList from "./gpa-snack-list"
import GpaStatSemestral from "./gpa-stat-semestral"

export interface GpaScreenMainProps {
  scoreType?
  gpa?
}

class _GpaScreenMain extends React.Component<GpaScreenMainProps, {}> {

  _keyExtractor = item => String(item.no)

  render() {
    const { gpa, scoreType } = this.props

    return (
      <>
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
              color.module.gpa[3],
              color.module.gpa[1],
              color.module.gpa[3],
              color.module.gpa[1],
              color.module.gpa[0],
            ]}
          />

          <GpaSnackList />
        </View>
      </>
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
