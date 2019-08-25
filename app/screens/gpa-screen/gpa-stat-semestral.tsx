/*
 * GPA Stat Semestral
 * Created by Tzingtao Chow
 * ---
 *
 * 一个 GPA Stat Semestral 绘制 GPA 主页中的学期成绩统计。
 * 它的本质就是 GPA Stat，但是此处将它单独抽离出来，
 * 为了避免将 Connect 至 Store 的模块写在主页中。
 * （经测试，这样会导致主页因被 Connect 而容易触发重新渲染的性能问题。）
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { setGpaOrderBy, setScoreType } from "../../actions/preference-actions"
import ss from "./gpa-screen.style"
import { digitsFromScoreType } from "../../utils/common"
import { GpaStat } from "../../components/gpa-stat/gpa-stat"
import { color } from "../../theme"

export interface GpaStatSemestralProps {
  gpa?
  semesterIndex?
  scoreType?
  setScoreType?
}

class _GpaStatSemestral extends React.Component<GpaStatSemestralProps, {}> {
  render() {
    const { gpa, semesterIndex, setScoreType } = this.props

    // data for GpaStat component
    let semestralStat = {}
    for (let key in gpa.data.gpaSemestral) {
      semestralStat[key] = gpa.data.gpaSemestral[key][semesterIndex].y.toFixed(
        digitsFromScoreType(key),
      )
    }

    return (
      <GpaStat
        style={ss.stat}
        status={gpa.status}
        setScoreType={scoreType => setScoreType(scoreType)}
        scores={semestralStat}
        txs={["gpa.semestralWeighted", "gpa.semestralGpa", "gpa.semestralCredits"]}
        palette={[color.module().gpa[2], color.module().gpa[1]]}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    gpa: state.dataReducer.gpa,
    semesterIndex: state.dataReducer.gpa.semesterIndex,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setScoreType: newType => {
      dispatch(setScoreType(newType))
    },
    setGpaOrderBy: newType => {
      dispatch(setGpaOrderBy(newType))
    },
  }
}

export const GpaStatSemestral = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_GpaStatSemestral)
export default GpaStatSemestral
