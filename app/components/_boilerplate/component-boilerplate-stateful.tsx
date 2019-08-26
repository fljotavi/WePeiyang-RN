/*
 * Component Boilerplate (Stateful)
 * Created by Tzingtao Chow
 * ---
 *
 * Component Boilerplate (Stateful) 是用于生成
 * 具有状态，并需要维护自己状态的组件时可用的参考模版。
 *
 */

import * as React from "react"
import { View, ViewStyle } from "react-native"

export interface ComponentBoilerplateStatefulProps {
  style?: ViewStyle
}

export class ComponentBoilerplateStateful extends React.PureComponent<
  ComponentBoilerplateStatefulProps,
  {}
> {
  state = {}

  render() {
    const { style } = this.props
    const viewStyle: ViewStyle = {}
    return <View style={[viewStyle, style]} />
  }
}
