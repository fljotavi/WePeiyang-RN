import * as React from "react"
import { connect } from "react-redux"

import { FlatList, ScrollView, StatusBar, View, Image } from "react-native"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import ss from "./yellow-pages-screen.styles"
import { NavigationScreenProps } from "react-navigation"
import { TopBar } from "../../components/top-bar"
import { fetchYellowPagesData } from "../../actions/data-actions"
import { Text } from "../../components/text"
import { Ian } from "../../components/ian"
import { UnitSnack } from "./unit-snack"
import { Tag } from "../../components/tag"
import { Linking } from "react-native"
import { InfoSource } from "./info-source"
import Modal from "react-native-modal"
import { Alert } from "../../components/alert"

export interface DepartmentScreenProps extends NavigationScreenProps<{}> {
  yellowPages?
}

export class DepartmentScreen extends React.Component<DepartmentScreenProps, {}> {
  state = {
    isModalVisible: false,
  }

  _keyExtractor = (item, index) => String(index)

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  render() {
    const { yellowPages } = this.props
    const indices = this.props.navigation.getParam("indices" as never, 0 as never) // TODO: Find out what the fuck is happening, either with this library, or its type definition, or TSLint, something
    const dep = this.props.yellowPages.data[indices[0]].department_list[indices[1]]
    return (
      <Screen style={ss.screenInvert}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        <Modal
          isVisible={this.state.isModalVisible}
          backdropColor={ss.screenInvert.backgroundColor}
          onBackButtonPress={this.toggleModal}
          onBackdropPress={this.toggleModal}
          useNativeDriver={true}
        >
          <Alert
            headingTx="contact.info.title"
            contentTx="contact.info.content"
            palette={[color.module.yellowPages[0], color.module.yellowPages[2]]}
            buttons={[
              {
                tx: "common.gotIt",
                onPress: () => {
                  this.toggleModal()
                },
              },
            ]}
          />
        </Modal>

        <TopBar
          elements={{
            left: [
              {
                iconText: "arrow_back",
                action: () => this.props.navigation.goBack(),
              },
            ],
            right: [
              {
                iconText: "info",
                action: this.toggleModal,
              },
            ],
          }}
          color={color.module.yellowPages[0]}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={ss.unitScroll}>
          <View style={ss.container}>
            <Image source={require("./assets/tjuarch.png")} style={ss.tjuArch} />
            <Text tx="contact.department" style={ss.sectionHead} />
            <Text text={dep.department_name} style={ss.screenHead} />
            <View style={ss.tags}>
              <Tag
                text={yellowPages.data[indices[0]].category_name}
                iconText="account_balance"
                palette={[color.module.yellowPages[0], color.module.yellowPages[2]]}
              />
              <Tag
                text={dep.unit_list.length + " 个办公室"}
                iconText="subject"
                palette={[color.module.yellowPages[0], color.module.yellowPages[2]]}
              />
            </View>
            <FlatList
              data={dep.unit_list}
              style={ss.unitList}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => (
                <UnitSnack
                  unit={item.item_name}
                  phone={item.item_phone}
                  onPress={() => {
                    Linking.openURL(`tel:${item.item_phone}`).catch(err => console.log(err))
                  }}
                />
              )}
              ListEmptyComponent={() => (
                <Ian
                  tx="contact.noUnit"
                  palette={[color.module.yellowPages[2], color.module.yellowPages[0]]}
                />
              )}
            />
          </View>
          <InfoSource />
        </ScrollView>
      </Screen>
    )
  }
}

const mapStateToProps = state => {
  return {
    pref: state.preferenceReducer,
    yellowPages: state.dataReducer.yellowPages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchYellowPagesData: async () => {
      await dispatch(fetchYellowPagesData())
    },
  }
}

export const connectedDepartmentScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentScreen)
