import * as React from "react"
import { connect } from "react-redux"

import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"
import Touchable from "react-native-platform-touchable"
import { NavigationScreenProps } from "react-navigation"
import { Ian } from "../ian"

export interface EcardBlockProps extends NavigationScreenProps<{}> {
  style?: ViewStyle
  ecard?
  colors?
}

class EcardBlock extends React.Component<EcardBlockProps, {}> {

  render() {
    let { ecard, style, colors } = this.props
    colors = colors || [color.primary, color.background, color.background]

    // The current balance api returns "XX.XX元", which is ugly, and of course is going to, and must be fixed in the future. So let's try to be robust here:
    let displayBalance = String(ecard.data.balance).replace('元', '')

    if (ecard.auth.status !== "BOUND") {
      return <Ian text="No cards bound"/>
    }
    const ss = {
      predefinedStyle: {
        borderRadius: layoutParam.borderRadius,
        overflow: "hidden",
        backgroundColor: colors[0],
      } as ViewStyle,
      containerStyle: {
        padding: 28,
        height: 220,
        flexDirection: "row",
        justifyContent: "space-between",
      } as ViewStyle,
      left: {
        flex: 5,
      } as ViewStyle,
      right: {
        justifyContent: "flex-end",
        alignSelf: "flex-end",
        alignItems: "flex-end",
      } as ViewStyle,
      balance: {
        fontSize: 60,
        color: colors[1],
      },
      yen: {
        fontSize: 60,
        color: colors[1],
        fontWeight: "bold"
      } as TextStyle,
      bar: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 3,
        flexDirection: "row",
        backgroundColor: colors[2],
        alignSelf: "flex-start",
      } as ViewStyle,
      barTextPre: {
        fontSize: 11,
        color: colors[0],
        fontWeight: "bold",
        letterSpacing: 2,
      } as TextStyle,
      barTextSub: {
        fontSize: 11,
        color: colors[0],
        letterSpacing: 2,
      },
      attrKey: {
        color: colors[2],
        fontSize: 8,
        letterSpacing: 3,
      } as TextStyle,
      attrValue: {
        color: colors[1],
        fontSize: 12,
        marginBottom: 5,
        fontWeight: "bold",
      } as TextStyle,
    }

    return (
      <Touchable foreground={Touchable.Ripple(colors[1])} style={[ss.predefinedStyle, style]} delayPressIn={0}>
        <View style={ss.containerStyle} pointerEvents='box-only'>
          <View style={ss.left}>
            <View style={ss.bar}>
              <Text>
                <Text text="CARD " style={ss.barTextPre}/>
                <Text text={"NO." + ecard.data.cardnum} style={ss.barTextSub}/>
              </Text>
            </View>
            <Text>
              <Text text="¥" style={ss.yen}/>
              <Text text={displayBalance} style={ss.balance}/>
            </Text>
          </View>
          <View style={ss.right}>
            <Text text="HOLDER" style={ss.attrKey}/>
            <Text text={ecard.data.name} style={ss.attrValue}/>
            <Text text="EXPIRES BY" style={ss.attrKey}/>
            <Text text={ecard.data.expiry} style={ss.attrValue}/>
          </View>
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
