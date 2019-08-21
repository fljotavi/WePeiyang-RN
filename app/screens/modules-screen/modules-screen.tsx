/*
 * Modules Screen
 * Created by Tzingtao Chow
 * ---
 *
 * Modules Screen 是显示所有模块入口的应用抽屉。
 * 严格来说，它其实就包含一个 Module Buttons List。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { StatusBar, ViewStyle } from "react-native"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { ModuleButtonList } from "../../components/module-button-list"

export interface ModulesScreenProps extends NavigationScreenProps<{}> {}

const ss = {
  screen: {
    paddingTop: layoutParam.statusBarHeight,
    justifyContent: "center",
  } as ViewStyle,
  container: {
    width: 230,
    justifyContent: "space-between",
    alignSelf: "center",
    paddingVertical: 50,
  } as ViewStyle,
  block: {
    marginBottom: 25,
    marginRight: 32,
  } as ViewStyle,
}

export class _ModulesScreen extends React.Component<ModulesScreenProps, {}> {
  render() {
    return (
      <Screen>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <ModuleButtonList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={ss.container}
          navigation={this.props.navigation}
          blockStyle={ss.block}
          allowDrag
        />
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  return {
    pref: state.preferenceReducer,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const ModulesScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ModulesScreen)
