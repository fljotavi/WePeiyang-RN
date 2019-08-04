import { TextStyle, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { Text } from "../../components/text"
import * as React from "react"
import Touchable from 'react-native-platform-touchable'

export interface EcardSnackProps {
  location?
  amount?
  date
  time
  type?
  subType?
  style?
}

export function EcardSnack(props: EcardSnackProps) {
  const { location, amount, date, time, type, subType, style } = props
  const ss = {
    snack: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    } as ViewStyle,
    snackContainer: {
      paddingVertical: 10,
      paddingHorizontal: 7,
      width: '100%',
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomColor: color.white(0.1),
      borderBottomWidth: 0.8,
    } as ViewStyle,
    left: {
      flexDirection: "row",
      alignItems: "center"
    } as ViewStyle,
    title: {
      color: color.background
    },
    icon: {
      color: color.white(0.35),
      fontSize: 25,
    },
    score: {
      color: color.white(0.35),
      fontSize: 30,
    },
    text: {
      marginLeft: 10,
      width: 190,
    } as TextStyle,
    subtitle: {
      fontSize: 12,
      color: color.white(0.35),
    }
  }

  let iconText = 'layers'
  switch (subType) {
    case "食堂":
      iconText = 'restaurant'
      break
    case "充值":
      iconText = 'attach_money'
      break
    case "超市":
      iconText = 'store_mall_directory'
      break
    default:
      iconText = 'place'
      break
  }

  // I have to say man, thanks to the truly fucked-up API design, I can do my funny ugly coding works here
  let humanReadableDateTime = `${date.substr(0, 4)}/${date.substr(4, 2)}/${date.substr(6, 2)} ${time.substr(0, 2)}:${date.substr(2, 2)}`

  let amountText = String(amount)
  if (type === 2) amountText = "-" + amountText
  return (
    <Touchable background={Touchable.Ripple(color.white(0.2))} style={[ss.snack, style]} delayPressIn={0}>
      <View style={ss.snackContainer} pointerEvents='box-only'>
        <View style={ss.left}>
          <Text text={iconText} style={ss.icon} preset="i"/>
          <View style={ss.text}>
            <Text text={location} style={ss.title}/>
            <Text>
              <Text preset="small" style={ss.subtitle} text={humanReadableDateTime}/>
            </Text>
          </View>
        </View>
        <Text text={amountText} style={ss.score}/>
      </View>
    </Touchable>
  )
}
