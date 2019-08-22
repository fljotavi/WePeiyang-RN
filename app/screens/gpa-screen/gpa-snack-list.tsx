import * as React from "react"
import { connect } from "react-redux"

import { DeviceEventEmitter, FlatList, TouchableOpacity, View } from "react-native"
import { setGpaOrderBy } from "../../actions/preference-actions"
import ss from "./gpa-screen.style"
import { GpaSnack } from "./gpa-snack"
import { Text } from "../../components/text"
import { Toasti } from "../../components/toasti"

export interface GpaSnackListProps {
  gpa?
  semesterIndex?
  gpaOrderBy?
  setGpaOrderBy?
}

class _GpaSnackList extends React.Component<GpaSnackListProps, {}> {
  toggleOrderType = () => {
    let current = this.props.gpaOrderBy
    switch (current) {
      case "credits":
        this.props.setGpaOrderBy("name")
        break
      case "name":
        this.props.setGpaOrderBy("score")
        break
      case "score":
        this.props.setGpaOrderBy("credits")
        break
    }
  }

  _keyExtractor = item => String(item.no)

  render() {
    const { gpa, semesterIndex } = this.props

    let sortedScores = [...gpa.data.gpaDetailed[semesterIndex].data].sort((courseA, courseB) => {
      switch (this.props.gpaOrderBy) {
        case "credits":
          return courseA.credit < courseB.credit ? 1 : -1
        case "name":
          return courseA.name.localeCompare(courseB.name, "zh")
        case "score":
          return courseA.score < courseB.score ? 1 : -1
      }
      DeviceEventEmitter.emit(
        "showToast",
        <Toasti
          text="Sort failed: Unknown sorting key. Please check your code spelling."
          preset="warning"
        />,
      )
      return 1
    })

    return (
      <>
        <View style={ss.orderTab}>
          <TouchableOpacity style={ss.orderTouchable} onPress={this.toggleOrderType}>
            <View style={ss.orderTexts}>
              <Text text="shuffle" preset="i" style={ss.orderIcon} />
              <Text tx="gpa.order.orderedBy" preset="lausanne" style={ss.orderTextPrefix} />
              <Text
                tx={"gpa.order." + this.props.gpaOrderBy}
                preset="lausanne"
                style={ss.orderTextSuffix}
              />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          style={ss.list}
          contentContainerStyle={ss.listContainer}
          data={sortedScores}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <GpaSnack
              style={ss.snackStyle}
              score={item.score}
              courseName={item.name}
              courseType={item.classType}
              credits={item.credit}
            />
          )}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    gpaOrderBy: state.preferenceReducer.gpaOrderBy,
    gpa: state.dataReducer.gpa,
    semesterIndex: state.dataReducer.gpa.semesterIndex,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setGpaOrderBy: newType => {
      dispatch(setGpaOrderBy(newType))
    },
  }
}

export const GpaSnackList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_GpaSnackList)
export default GpaSnackList
