// Welcome to the main entry point of the app.

import "./i18n"
import * as React from "react"
import { Provider } from "react-redux"
import { AppRegistry, StatusBar } from "react-native"
import { RootNavigator } from "./navigation/root-navigator"
import { createAppContainer } from "react-navigation"

import configureStore from "./store"
import { PersistGate } from "redux-persist/integration/react"
import { Text } from "./components/text"

const AppContainer = createAppContainer(RootNavigator)
const { persistor, store } = configureStore()

interface AppState {}

/**
 * This is the root component of our app.
 */
export class App extends React.Component<{}, AppState> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Text text="loading" />} persistor={persistor}>
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}

const APP_NAME = "WePeiyang"
const RootComponent = App
AppRegistry.registerComponent(APP_NAME, () => RootComponent)
