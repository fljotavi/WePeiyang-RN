/*
 * Module Button List
 * Created by Tzingtao Chow
 * ---
 *
 * Module Button List 是显示在主页上方的模块按钮条。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { Linking, ScrollView, ViewStyle } from "react-native"
import { ModuleButton } from "../module-button"

export interface ModuleButtonListProps {
  style?: ViewStyle
  compData?
  navigation?
}

class _ModuleButtonList extends React.PureComponent<ModuleButtonListProps, {}> {
  openUrlAttempt = url => {
    Linking.openURL(url).catch(err => console.log(err))
  }

  render() {
    let { style, compData, navigation } = this.props
    const ss = {
      horiScrollSelf: {
        overflow: "visible",
      } as ViewStyle,
      horiScroll: {
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "visible",
      } as ViewStyle,
      blockWithMarginRight: {
        marginRight: 10,
      } as ViewStyle,
    }
    return (
      <ScrollView
        style={[ss.horiScrollSelf, style]}
        contentContainerStyle={ss.horiScroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <ModuleButton
          style={ss.blockWithMarginRight}
          tx="modules.schedule"
          icon="event"
          onPress={() => {
            if (compData.userInfo.data.accounts.tju) {
              navigation.navigate("schedule")
            } else {
              navigation.navigate("tjuBind")
            }
          }}
        />
        <ModuleButton
          style={ss.blockWithMarginRight}
          tx="modules.gpa"
          icon="timeline"
          onPress={() => {
            if (compData.userInfo.data.accounts.tju) {
              navigation.navigate("gpa")
            } else {
              navigation.navigate("tjuBind")
            }
          }}
        />
        <ModuleButton
          style={ss.blockWithMarginRight}
          tx="modules.contact"
          icon="call"
          onPress={() => {
            if (compData.userInfo.data.accounts.tju) {
              navigation.navigate("yellowPages")
            } else {
              navigation.navigate("tjuBind")
            }
          }}
        />
        <ModuleButton
          style={ss.blockWithMarginRight}
          tx="modules.ecard"
          icon="credit_card"
          onPress={() => {
            if (compData.ecard.auth.status === "BOUND") {
              navigation.navigate("ecard")
            } else {
              navigation.navigate("bind")
            }
          }}
        />
        <ModuleButton
          style={ss.blockWithMarginRight}
          tx="modules.learning"
          icon="assignment_turned_in"
          onPress={() => {
            this.openUrlAttempt("https://exam.twtstudio.com/")
          }}
        />
        <ModuleButton
          style={ss.blockWithMarginRight}
          tx="modules.party"
          icon="star"
          onPress={() => {
            this.openUrlAttempt("https://www.twt.edu.cn/party/")
          }}
        />
        <ModuleButton
          style={ss.blockWithMarginRight}
          tx="modules.library"
          icon="local_library"
          onPress={() => {
            this.openUrlAttempt("http://lib.tju.edu.cn/")
          }}
        />
        <ModuleButton
          style={ss.blockWithMarginRight}
          tx="modules.mall"
          icon="store"
          onPress={() => {
            this.openUrlAttempt("https://mall.twt.edu.cn/")
          }}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    compData: state.dataReducer,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const ModuleButtonList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ModuleButtonList)
