import * as React from "react"
import { connect } from "react-redux"

import { ScrollView, StatusBar, View, ViewStyle } from "react-native"
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
  scroll: {} as ViewStyle,
  container: {
    width: 230,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignSelf: "center",
    paddingVertical: 50,
  } as ViewStyle,
  block: {
    marginBottom: 25,
  } as ViewStyle,
}

export class _ModulesScreen extends React.Component<ModulesScreenProps, {}> {
  render() {
    return (
      <Screen>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <ScrollView showsVerticalScrollIndicator={false} style={ss.scroll}>
          <View style={ss.container}>
            <ModuleButtonList navigation={this.props.navigation} blockStyle={ss.block} />
          </View>
        </ScrollView>
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
