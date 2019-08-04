import * as React from "react"
import { connect } from "react-redux"
import { StatusBar, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { connectedEcardBlock as EcardBlock } from "../../components/ecard-block"

export interface EcardScreenProps extends NavigationScreenProps<{}> {
}

const ss = {
  screen: {
    paddingTop: layoutParam.statusBarHeight
  } as ViewStyle,
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical
  } as ViewStyle,
}

export class EcardScreen extends React.Component<EcardScreenProps, {}> {
  render () {
    return (
      <Screen preset="scroll">
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle='dark-content'
        />
        <View style={ss.container}>
          <EcardBlock/>
        </View>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export const connectedEcardScreen = connect(mapStateToProps, mapDispatchToProps)(EcardScreen)
