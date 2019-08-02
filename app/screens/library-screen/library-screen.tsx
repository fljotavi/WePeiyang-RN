import * as React from "react"
import { connect } from "react-redux"

import { Screen } from "../../components/screen"

import ss from "./library-screen.style"
import { NavigationScreenProps } from "react-navigation"
import { StatusBar } from "react-native"

export interface LibraryScreenProps extends NavigationScreenProps<{}> {

}

export class LibraryScreen extends React.Component<LibraryScreenProps, {}> {

  render () {

    return (
      <Screen style={ss.screen}>

        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle='light-content'
        />

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

export const connectedLibraryScreen = connect(mapStateToProps, mapDispatchToProps)(LibraryScreen)
export default connectedLibraryScreen
