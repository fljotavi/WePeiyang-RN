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
  palette?
  onPress?
}

class EcardBlock extends React.Component<EcardBlockProps, {}> {
  render() {
    let { ecard, style, palette, onPress } = this.props
    palette = palette || [color.lightGrey, color.background, color.background]

    if (ecard.auth.status !== "BOUND") {
      return <Ian text="No cards bound" />
    }

    if (ecard.status !== "VALID") {
      return <Ian text="No available data" />
    }

    // The current balance api returns "XX.XX元", which is ugly, and of course is going to,
    // and must be fixed in the future. So let's try to be robust here:
    let displayBalance = String(ecard.profile.balance).replace("元", "")

    const ss = {
      predefinedStyle: {
        borderRadius: layoutParam.borderRadius,
        overflow: "hidden",
        backgroundColor: palette[0],
      } as ViewStyle,
      containerStyle: {
        paddingHorizontal: 28,
        paddingVertical: 20,
        height: 220,
        justifyContent: "space-between",
      } as ViewStyle,
      ambient: {
        width: 500,
        height: 500,
        position: "absolute",
        right: -400,
        top: -100,
        backgroundColor: color.white(0.1),
        transform: [{ rotate: "22 deg" }],
      } as ViewStyle,
      top: {
        flex: 5,
      } as ViewStyle,
      bottom: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignSelf: "flex-end",
      } as ViewStyle,
      balance: {
        fontSize: 60,
        color: palette[1],
      },
      yen: {
        fontSize: 60,
        color: palette[1],
        fontWeight: "bold",
      } as TextStyle,
      bar: {
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 3,
        flexDirection: "row",
        backgroundColor: palette[2],
        alignSelf: "flex-start",
      } as ViewStyle,
      barTextPre: {
        fontSize: 11,
        color: palette[0],
        fontWeight: "bold",
        letterSpacing: 2,
      } as TextStyle,
      barTextSub: {
        fontSize: 11,
        color: palette[0],
        letterSpacing: 2,
      },
      pair: {
        marginLeft: 10,
        alignItems: "flex-end",
      } as ViewStyle,
      attrKey: {
        color: palette[2],
        fontSize: 8,
        letterSpacing: 3,
        marginRight: -1,
      } as TextStyle,
      attrValue: {
        color: palette[1],
        fontSize: 12,
        marginBottom: 5,
        fontWeight: "bold",
      } as TextStyle,
    }

    return (
      <Touchable
        foreground={Touchable.Ripple(palette[1])}
        style={[ss.predefinedStyle, style]}
        delayPressIn={0}
        onPress={onPress}
      >
        <View style={ss.containerStyle} pointerEvents="box-only">
          <View style={ss.ambient} />
          <View style={ss.top}>
            <View style={ss.bar}>
              <Text>
                <Text text="CARD " style={ss.barTextPre} />
                <Text text={"NO." + ecard.profile.cardnum} style={ss.barTextSub} />
              </Text>
            </View>
            <Text>
              <Text text="¥" style={ss.yen} />
              <Text text={displayBalance} style={ss.balance} />
            </Text>
          </View>
          <View style={ss.bottom}>
            <View style={ss.pair}>
              <Text text="HOLDER" style={ss.attrKey} />
              <Text text={ecard.profile.name} style={ss.attrValue} />
            </View>
            <View style={ss.pair}>
              <Text text="EXPIRES BY" style={ss.attrKey} />
              <Text text={ecard.profile.expiry} style={ss.attrValue} />
            </View>
          </View>
        </View>
      </Touchable>
    )
  }
}

const mapStateToProps = state => {
  return {
    ecard: state.dataReducer.ecard,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const connectedEcardBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EcardBlock)
