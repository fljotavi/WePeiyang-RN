import * as React from "react"
import { connect } from "react-redux"

import { DeviceEventEmitter, ScrollView, StatusBar, View } from "react-native"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import ss from "./yellow-pages-screen.styles"
import { NavigationScreenProps } from "react-navigation"
import { TopBar } from "../../components/top-bar"
import { fetchYellowPagesData } from "../../actions/data-actions"
import { Toasti } from "../../components/toasti"
import { Text } from "../../components/text"

export interface DepartmentScreenProps extends NavigationScreenProps<{}> {
  pref?
  yellowPages?
  fetchYellowPagesData?
}

export class DepartmentScreen extends React.Component<DepartmentScreenProps, {}> {
  _keyExtractor = item => String(item.no)

  render() {
    const depIndex = this.props.navigation.getParam("indices", 0)
    const dep = this.props.yellowPages.generated.deps[depIndex[1]]
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
            <Text text={dep.department} style={ss.h0} />
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
