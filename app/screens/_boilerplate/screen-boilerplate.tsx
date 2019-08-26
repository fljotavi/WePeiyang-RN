/*
 * Screen Boilerplate
 * Created by Tzingtao Chow
 * ---
 *
 * Screen Boilerplate 是用于生成最简单的新 Screen 时可参考的模版。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { StatusBar, View } from "react-native"
import { Screen } from "../../components/screen"
import { NavigationScreenProps } from "react-navigation"

export interface ScreenBoilerplateProps extends NavigationScreenProps<{}> {}

export class _ScreenBoilerplate extends React.Component<ScreenBoilerplateProps, {}> {
  state = {}

  render() {
    return (
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View />
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export const ScreenBoilerplate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ScreenBoilerplate)
