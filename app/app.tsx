// Welcome to the main entry point of the app.

import "./i18n"
import * as React from "react"
import { Provider } from "react-redux"
import { AppRegistry, DeviceEventEmitter, StatusBar, View, ViewStyle } from "react-native"
import { RootNavigator } from "./navigation/root-navigator"
import { createAppContainer } from "react-navigation"

import configureStore from "./store"
import { PersistGate } from "redux-persist/integration/react"
import Toast from "react-native-easy-toast"

const AppContainer = createAppContainer(RootNavigator)
const { persistor, store } = configureStore()

interface AppState {}

/**
 * This is the root component of our app.
 */
export class App extends React.Component<{}, AppState> {
  listener
  toastRef

  componentDidMount() {
    console.disableYellowBox = true // TODO: Comment this line when preparing for a release
    this.listener = DeviceEventEmitter.addListener("showToast", inner => {
      this.toastRef.show(inner)
    })
  }

  componentWillUnmount() {
    if (this.listener) {
      this.listener.remove()
    }
  }

  render() {
    const toastStyle = {
      backgroundColor: "transparent",
    } as ViewStyle

    return (
      <Provider store={store}>
        <PersistGate loading={<View />} persistor={persistor}>
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <AppContainer />
          <Toast // tslint:disable-next-line (Wrong type def in the including library)
            style={toastStyle}
            ref={ref => {
              this.toastRef = ref
            }}
          />
        </PersistGate>
      </Provider>
    )
  }
}

const APP_NAME = "WePeiyang"
const RootComponent = App
AppRegistry.registerComponent(APP_NAME, () => RootComponent)
