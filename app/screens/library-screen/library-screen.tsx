import * as React from "react"
import { connect } from "react-redux"

import { Screen } from "../../components/screen"

import ss from "./library-screen.style"
import { NavigationScreenProps } from "react-navigation"
import { StatusBar, View } from "react-native"
import { Text } from "../../components/text"

export interface LibraryScreenProps extends NavigationScreenProps<{}> {}

export class LibraryScreen extends React.Component<LibraryScreenProps, {}> {
  render() {
    return (
      <Screen style={ss.screen}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        <View style={ss.container}>
          <View style={ss.heading}>
            <Text text="Books Borrowed" style={ss.headingKey} />
            <Text text="2" style={ss.headingValue} />
            <Text text="Quota" style={ss.headingKey} />
            <Text text="10" style={ss.headingValue} />
          </View>
        </View>
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

export const connectedLibraryScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LibraryScreen)
export default connectedLibraryScreen
