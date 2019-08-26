/*
 * Component Boilerplate (Connected)
 * Created by Tzingtao Chow
 * ---
 *
 * Component Boilerplate (Connected) 是用于生成
 * 需要读取或写入 Redux Store 中状态的组件的参考模版。
 *
 */

import * as React from "react"
import { connect } from "react-redux"
import { View, ViewStyle } from "react-native"

export interface ComponentBoilerplateConnectedProps {
  style?: ViewStyle
}

class _ComponentBoilerplateConnected extends React.PureComponent<
  ComponentBoilerplateConnectedProps,
  {}
> {
  render() {
    const { style } = this.props
    const viewStyle: ViewStyle = {}
    return <View style={[viewStyle, style]} />
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export const ComponentBoilerplateConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ComponentBoilerplateConnected)
