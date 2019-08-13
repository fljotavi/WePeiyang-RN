import * as React from "react"
import { connect } from "react-redux"

import { StatusBar, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color, layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { TopBar } from "../../components/top-bar"

export interface YellowPagesScreenProps extends NavigationScreenProps<{}> {}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
}

export class YellowPagesScreen extends React.Component<YellowPagesScreenProps, {}> {
  render() {
    return (
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        <TopBar
          elements={{
            left: [
              {
                iconText: "arrow_back",
                action: () => this.props.navigation.goBack(),
              },
            ],
            right: [],
          }}
          color={color.primary}
        />

        <View style={ss.container}>
          <Text text="Yellow Pages" preset="h2" />
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  return {
    pref: state.preferenceReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export const connectedYellowPagesScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(YellowPagesScreen)
