import * as React from "react"
import { connect } from "react-redux"

import { DeviceEventEmitter, StatusBar, View } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import ss from "./yellow-pages-screen.styles"
import { NavigationScreenProps } from "react-navigation"
import { TopBar } from "../../components/top-bar"
import { fetchYellowPagesData } from "../../actions/data-actions"
import { Toasti } from "../../components/toasti"
import { TextField } from "../../components/text-field"

import FlexSearch from "../../utils/flex-search"

export interface YellowPagesScreenProps extends NavigationScreenProps<{}> {
  pref?
  yellowPages?
  fetchYellowPagesData?
}

export class YellowPagesScreen extends React.Component<YellowPagesScreenProps, {}> {
  state = {
    refreshing: false,
    keyword: "",
  }

  prepareData = async () => {
    await Promise.all([this.props.fetchYellowPagesData()])
      .then(() => {
        DeviceEventEmitter.emit(
          "showToast",
          <Toasti tx="data.prepareDataSuccess" preset="yellowPages" />,
        )
      })
      .catch(err => {
        DeviceEventEmitter.emit("showToast", <Toasti text={err.message} preset="error" />)
      })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.prepareData().then(() => {
      this.setState({ refreshing: false })
    })
  }

  _keyExtractor = item => String(item.no)

  render() {
    const { yellowPages } = this.props
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
                iconText: "android",
                action: () => {
                  console.log(this.props.yellowPages.data)
                  let fs = FlexSearch.create({
                    encode: false,
                    tokenize: function(str) {
                      return str.replace(/[\x00-\x7F]/g, "").split("")
                    },
                  })
                  yellowPages.generated.forEach((item, i) => {
                    fs.add(i, item.keywords)
                  })
                  let res = fs.search({
                    query: this.state.keyword,
                    suggest: true,
                    limit: 20,
                  })
                  console.log(res.map(id => yellowPages.generated[id]))
                },
              },
              {
                iconText: "sync",
                action: this._onRefresh,
              },
            ],
          }}
          color={color.module.yellowPages[1]}
        />

        <View style={ss.container}>
          <TextField
            placeholder="Search keywords..."
            placeholderTextColor={color.module.yellowPages[2]}
            onChangeText={text => this.setState({ keyword: text })}
            style={ss.field}
            inputStyle={ss.input}
            value={this.state.keyword}
            autoCorrect={false}
          />
        </View>
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

export const connectedYellowPagesScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(YellowPagesScreen)
