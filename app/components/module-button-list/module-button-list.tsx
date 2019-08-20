/*
 * Module Button List
 * Created by Tzingtao Chow
 * ---
 *
 * Module Button List 返回包含了一个 Modal 的模块按钮数组。
 * 点击模块按钮后的导航、对话框弹出与拖拽重排序等逻辑也包含在此组件中，使用时要传入父组件的 navigation。
 * 它目前显示在主页上方和 Modules 导航页。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import { Linking, ViewStyle } from "react-native"
import { ModuleButton } from "../module-button"
import Modal from "react-native-modal"
import { color } from "../../theme"
import { Alert } from "../alert"

import DraggableFlatList from "react-native-draggable-flatlist"
import { setPreference } from "../../actions/preference-actions"

export interface ModuleButtonListProps {
  style?
  blockStyle?: ViewStyle
  navigation?

  pref?
  setPreference?
  compData?

  allowDrag?
}

class _ModuleButtonList extends React.PureComponent<ModuleButtonListProps, {}> {
  state = {
    isModalVisible: false,
    selectedUrl: "",
    moduleOrder: this.props.pref.moduleOrder,
  }

  openModal = url => {
    this.setState(
      {
        selectedUrl: url,
      },
      () => this.setState({ isModalVisible: true }),
    )
  }
  closeModal = () => {
    this.setState({ isModalVisible: false, userInformed: false })
  }

  openUrlAttempt = url => {
    this.openModal(url)
  }

  render() {
    let { blockStyle, compData, navigation, style, allowDrag, ...rest } = this.props
    let moduleOrder = this.state.moduleOrder
    let moduleProps = {
      schedule: {
        tx: "modules.schedule",
        icon: "event",
        onPress: () => {
          if (compData.userInfo.data.accounts.tju) {
            navigation.navigate("schedule")
          } else {
            navigation.navigate("tjuBind")
          }
        },
      },
      gpa: {
        tx: "modules.gpa",
        icon: "timeline",
        onPress: () => {
          if (compData.userInfo.data.accounts.tju) {
            navigation.navigate("gpa")
          } else {
            navigation.navigate("tjuBind")
          }
        },
      },
      contact: {
        tx: "modules.contact",
        icon: "call",
        onPress: () => {
          if (compData.userInfo.data.accounts.tju) {
            navigation.navigate("yellowPages")
          } else {
            navigation.navigate("tjuBind")
          }
        },
      },
      ecard: {
        tx: "modules.ecard",
        icon: "credit_card",
        onPress: () => {
          if (compData.ecard.auth.status === "BOUND") {
            navigation.navigate("ecard")
          } else {
            navigation.navigate("ecardBind")
          }
        },
      },
      network: {
        tx: "modules.network",
        icon: "wifi",
        onPress: () => navigation.navigate("network"),
      },
      learning: {
        tx: "modules.learning",
        icon: "assignment_turned_in",
        onPress: () => {
          this.openUrlAttempt("https://exam.twtstudio.com/")
        },
      },
      docs: {
        tx: "modules.docs",
        icon: "library_books",
        onPress: () => {
          this.openUrlAttempt("https://learning.twtstudio.com/")
        },
      },
      library: {
        tx: "modules.library",
        icon: "local_library",
        onPress: () => {
          this.openUrlAttempt("http://lib.tju.edu.cn/")
        },
      },
      mall: {
        tx: "modules.mall",
        icon: "store",
        onPress: () => {
          this.openUrlAttempt("https://mall.twt.edu.cn/")
        },
      },
      news: {
        tx: "modules.news",
        icon: "public",
        onPress: () => {
          this.openUrlAttempt("https://news.twt.edu.cn/news")
        },
      },
      bbs: {
        tx: "modules.bbs",
        icon: "forum",
        onPress: () => {
          this.openUrlAttempt("http://bbs.tju.edu.cn/")
        },
      },
      career: {
        tx: "modules.career",
        icon: "work",
        onPress: () => {
          this.openUrlAttempt("http://job.tju.edu.cn/")
        },
      },
      party: {
        tx: "modules.party",
        icon: "star",
        onPress: () => {
          this.openUrlAttempt("https://www.twt.edu.cn/party/")
        },
      },
      vote: {
        tx: "modules.vote",
        icon: "check_box",
        onPress: () => {
          this.openUrlAttempt("https://vote.twtstudio.com/")
        },
      },
      survey: {
        tx: "modules.survey",
        icon: "edit",
        onPress: () => {
          this.openUrlAttempt("https://survey.twtstudio.com/")
        },
      },
      socialPractice: {
        tx: "modules.socialPractice",
        icon: "group_add",
        onPress: () => {
          this.openUrlAttempt("https://www.twt.edu.cn/shijian/")
        },
      },
    }

    return [
      <Modal
        isVisible={this.state.isModalVisible}
        backdropColor={color.background}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
        useNativeDriver={true}
        key={"0"}
      >
        <Alert
          headingTx="common.providedInWebHint"
          content={this.state.selectedUrl}
          buttons={[
            {
              tx: "common.ok",
              onPress: () => {
                this.closeModal()
                Linking.openURL(this.state.selectedUrl).catch(err => console.log(err))
              },
            },
            {
              tx: "common.cancel",
              onPress: this.closeModal,
            },
          ]}
        />
      </Modal>,
      <DraggableFlatList
        data={moduleOrder}
        style={style}
        renderItem={({ item, move, moveEnd }) => {
          return (
            <ModuleButton
              style={blockStyle}
              tx={moduleProps[item].tx}
              icon={moduleProps[item].icon}
              onPress={moduleProps[item].onPress}
              key={moduleProps[item].tx}
              onLongPress={allowDrag ? move : () => {}}
              onPressOut={moveEnd}
            />
          )
        }}
        key={"1"}
        onMoveEnd={({ data }) => {
          this.setState({
            moduleOrder: data,
          })
          this.props.setPreference("moduleOrder", data)
        }}
        {...rest}
      />,
    ]
  }
}

const mapStateToProps = state => {
  return {
    pref: state.preferenceReducer,
    compData: state.dataReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPreference: (key, value) => {
      dispatch(setPreference(key, value))
    },
  }
}
export const ModuleButtonList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ModuleButtonList)
