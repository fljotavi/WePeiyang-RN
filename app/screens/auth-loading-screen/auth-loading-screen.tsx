import * as React from "react"
import { StatusBar, View, ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { layoutParam } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { processAuthStatus } from "../../services/twt-fetch"
import SplashScreen from "react-native-splash-screen"

export interface AuthLoadingScreenProps extends NavigationScreenProps<{}> {}

const ss = {
  container: {
    paddingHorizontal: layoutParam.paddingHorizontal,
    paddingVertical: layoutParam.paddingVertical,
  } as ViewStyle,
}

export class AuthLoadingScreen extends React.Component<AuthLoadingScreenProps, {}> {
  constructor(props) {
    super(props)
    this._bootstrapAuthStatus()
  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide()
  }

  _bootstrapAuthStatus = async () => {
    await processAuthStatus().then(tokenExists => {
      this.props.navigation.navigate(tokenExists ? "app" : "login")
    })
  }

  render() {
    return (
      <Screen preset="scroll">
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={ss.container}>
          <Text text="Loading..." preset="h2" />
        </View>
      </Screen>
    )
  }
}
