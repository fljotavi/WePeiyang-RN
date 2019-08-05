import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import Svg, { G, Path } from "react-native-svg"
import { Text } from "../text"

export interface ByTwtProps {
  style?: ViewStyle,
  fill?
  height?
  width?
  children?
}

export function ByTwt(props: ByTwtProps) {
  const { style, fill, height, width, children } = props

  const predefinedStyle: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }

  const textStyle: TextStyle = {
    color: fill,
    marginLeft: 5,
  }

  return (
    <View style={[predefinedStyle, style]}>
      <Svg height={height || 15} width={width || 20} viewBox="0 0 152 109">
        <G fill={fill}>
          <Path
            d="M139,53.31c-2.12,10.86-6.94,17.37-14.78,21.6a57.89,57.89,0,0,1-6.31,2.43L96.85,85.22C93,86.67,89.13,88,85.25,89.5c-5.1,1.88-10.08,3.8-15.18,5.64q-12.57,4.65-25.13,9.29c-3.72,1.38-7.33,3.06-11.21,4a26.23,26.23,0,0,1-25-7C1.23,94.32-1.47,85.34.76,75.5c2.43-10.9,9.61-18,20.47-21,3.09-.9,3.05-.75,3-4a39.37,39.37,0,0,1,8.83-26.54,36.72,36.72,0,0,1,16.66-12C63.92,7,77.25,9,89,18.65a48.68,48.68,0,0,1,6.35,6.71c1,1.17,1.81,1.33,3.06.58a24.61,24.61,0,0,1,14.31-3.37c10,.67,17.88,5.3,22.94,14.12C138.92,42.33,140,48.68,139,53.31Z"/>
          <Path
            d="M144.57,47.82a30.77,30.77,0,0,0-4.83-15,32.54,32.54,0,0,0-13-12.12,33.33,33.33,0,0,0-20.51-3.33c-2.31.35-4.55,1.25-6.86,1.8-.59.12-1.53.12-1.84-.23A48,48,0,0,0,78,6c-.27-.12-.55-.28-1.09-.55a9.42,9.42,0,0,1,1.41-1.06,30.3,30.3,0,0,1,39.75,7.49c1.06,1.41,1.73,1.45,3.29.63a20,20,0,0,1,16.94-.9,21.39,21.39,0,0,1,13.25,25.83A22.18,22.18,0,0,1,144.57,47.82Z"/>
        </G>
      </Svg>

      <Text style={textStyle}>
        {children}
      </Text>
    </View>
  )
}
