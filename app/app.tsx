// Welcome to the main entry point of the app.

import "./i18n"
import * as React from "react"
import { AppRegistry } from "react-native"
import { RootNavigator } from "./navigation/root-navigator"
import { createAppContainer } from "react-navigation"

const AppContainer = createAppContainer(RootNavigator)

interface AppState {
}

/**
 * This is the root component of our app.
 */
export class App extends React.Component<{}, AppState> {
  render() {
    return (
      <AppContainer />
    )
  }
}

const APP_NAME = "MyIgniteProject"
const RootComponent = App
AppRegistry.registerComponent(APP_NAME, () => RootComponent)
