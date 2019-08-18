/*
 * Module Button List
 * Created by Tzingtao Chow
 * ---
 *
 * Module Button List 返回包含了一个 Modal 的模块按钮数组。
 * 点击模块按钮后的导航、对话框弹出等逻辑也包含在此组件中，使用时要传入父组件但 navigation。
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

export interface ModuleButtonListProps {
  blockStyle?: ViewStyle
  compData?
  navigation?
}

class _ModuleButtonList extends React.PureComponent<ModuleButtonListProps, {}> {
  state = {
    isModalVisible: false,
    selectedUrl: "",
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
    let { blockStyle, compData, navigation } = this.props
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

      <ModuleButton
        style={blockStyle}
        tx="modules.schedule"
        icon="event"
        onPress={() => {
          if (compData.userInfo.data.accounts.tju) {
            navigation.navigate("schedule")
          } else {
            navigation.navigate("tjuBind")
          }
        }}
        key="modules.schedule"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.gpa"
        icon="timeline"
        onPress={() => {
          if (compData.userInfo.data.accounts.tju) {
            navigation.navigate("gpa")
          } else {
            navigation.navigate("tjuBind")
          }
        }}
        key="modules.gpa"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.contact"
        icon="call"
        onPress={() => {
          if (compData.userInfo.data.accounts.tju) {
            navigation.navigate("yellowPages")
          } else {
            navigation.navigate("tjuBind")
          }
        }}
        key="modules.contact"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.ecard"
        icon="credit_card"
        onPress={() => {
          if (compData.ecard.auth.status === "BOUND") {
            navigation.navigate("ecard")
          } else {
            navigation.navigate("bind")
          }
        }}
        key="modules.ecard"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.network"
        icon="wifi"
        onPress={() => navigation.navigate("network")}
        key="modules.network"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.learning"
        icon="assignment_turned_in"
        onPress={() => {
          this.openUrlAttempt("https://exam.twtstudio.com/")
        }}
        key="modules.learning"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.docs"
        icon="library_books"
        onPress={() => {
          this.openUrlAttempt("https://learning.twtstudio.com/")
        }}
        key="modules.docs"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.library"
        icon="local_library"
        onPress={() => {
          this.openUrlAttempt("http://lib.tju.edu.cn/")
        }}
        key="modules.library"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.mall"
        icon="store"
        onPress={() => {
          this.openUrlAttempt("https://mall.twt.edu.cn/")
        }}
        key="modules.mall"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.news"
        icon="public"
        onPress={() => {
          this.openUrlAttempt("https://news.twt.edu.cn/news")
        }}
        key="modules.news"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.bbs"
        icon="forum"
        onPress={() => {
          this.openUrlAttempt("http://bbs.tju.edu.cn/")
        }}
        key="modules.bbs"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.career"
        icon="work"
        onPress={() => {
          this.openUrlAttempt("http://job.tju.edu.cn/")
        }}
        key="modules.career"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.party"
        icon="star"
        onPress={() => {
          this.openUrlAttempt("https://www.twt.edu.cn/party/")
        }}
        key="modules.party"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.vote"
        icon="check_box"
        onPress={() => {
          this.openUrlAttempt("https://vote.twtstudio.com/")
        }}
        key="modules.vote"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.survey"
        icon="edit"
        onPress={() => {
          this.openUrlAttempt("https://survey.twtstudio.com/")
        }}
        key="modules.survey"
      />,
      <ModuleButton
        style={blockStyle}
        tx="modules.socialPractice"
        icon="group_add"
        onPress={() => {
          this.openUrlAttempt("https://www.twt.edu.cn/shijian/")
        }}
        key="modules.socialPractice"
      />,
    ]
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
