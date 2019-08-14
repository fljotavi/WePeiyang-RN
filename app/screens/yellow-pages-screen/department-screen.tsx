import * as React from "react"
import { connect } from "react-redux"

import { FlatList, ScrollView, StatusBar, View } from "react-native"
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

export interface DepartmentScreenProps extends NavigationScreenProps<{}> {
  yellowPages?
}

export class DepartmentScreen extends React.Component<DepartmentScreenProps, {}> {
  _keyExtractor = (item, index) => String(index)

  render() {
    const { yellowPages } = this.props
    const indices = this.props.navigation.getParam("indices" as never, 0 as never) // TODO: Find out what the fuck is happening, either with this library, or its type definition, or TSLint, something
    const dep = this.props.yellowPages.data[indices[0]].department_list[indices[1]]
    return (
      <Screen style={ss.screen}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

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
                iconText: "report",
                action: () => {
                  console.log(this.props.yellowPages.data)
                },
              },
            ],
          }}
          color={color.module.yellowPages[1]}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={ss.container}>
            <Text text="DEPARTMENT" style={ss.sectionHead} />
            <Text text={dep.department_name} style={ss.screenHead} />
            <View style={ss.tags}>
              <Tag
                text={yellowPages.data[indices[0]].category_name}
                iconText="account_balance"
                palette={[color.module.yellowPages[1], color.module.yellowPages[0]]}
              />
              <Tag
                text={dep.unit_list.length + " 个办公室"}
                iconText="subject"
                palette={[color.module.yellowPages[1], color.module.yellowPages[0]]}
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
                  text="No unit found in this department"
                  palette={[color.module.yellowPages[2], color.module.yellowPages[0]]}
                />
              )}
            />
          </View>
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
