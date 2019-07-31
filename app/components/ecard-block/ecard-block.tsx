import * as React from "react"
import { connect } from "react-redux"

import { View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"
import Touchable from "react-native-platform-touchable"
import { NavigationScreenProps } from "react-navigation"

export interface EcardBlockProps extends NavigationScreenProps<{}> {
  style?: ViewStyle
  ecard?
}

class EcardBlock extends React.Component<EcardBlockProps, {}> {

  render() {
    const { ecard, style } = this.props
    const predefinedStyle: ViewStyle = {
      height: 170,
      backgroundColor: color.card,
      borderRadius: layoutParam.borderRadius,
      padding: 20,
    } as ViewStyle

    let text = ecard.auth.status === "BOUND" ? ecard.data.balance : "You cheap fuck"

    return (
      <Touchable style={[predefinedStyle, style]}>
        <View>
          <Text preset="h1" text={text}/>
        </View>
      </Touchable>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ecard: state.dataReducer.ecard,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export const connectedEcardBlock = connect(mapStateToProps, mapDispatchToProps)(EcardBlock)
