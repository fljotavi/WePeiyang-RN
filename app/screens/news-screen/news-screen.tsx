import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { NavigationScreenProps } from "react-navigation"

export interface NewsScreenProps extends NavigationScreenProps<{}> {
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

// @inject("mobxstuff")
@observer
export class NewsScreen extends React.Component<NewsScreenProps, {}> {
  render () {
    return (
      <Screen style={ROOT} preset="scroll">
        <Text preset="header" tx="newsScreen.header" />
      </Screen>
    )
  }
}
