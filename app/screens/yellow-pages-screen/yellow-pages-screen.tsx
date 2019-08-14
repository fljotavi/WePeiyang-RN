import * as React from "react"
import { connect } from "react-redux"

import { DeviceEventEmitter, RefreshControl, ScrollView, StatusBar, View } from "react-native"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import ss from "./yellow-pages-screen.styles"
import { NavigationScreenProps } from "react-navigation"
import { TopBar } from "../../components/top-bar"
import { fetchYellowPagesData } from "../../actions/data-actions"
import { Toasti } from "../../components/toasti"
import { TextField } from "../../components/text-field"

import FlexSearch from "../../utils/flex-search"
import { SearchResult } from "./search-result"
import { FlexSearchLogo } from "./flex-search-logo"
import { Text } from "../../components/text"

export interface YellowPagesScreenProps extends NavigationScreenProps<{}> {
  pref?
  yellowPages?
  fetchYellowPagesData?
}

export class YellowPagesScreen extends React.Component<YellowPagesScreenProps, {}> {
  state = {
    refreshing: false,
    keyword: "",
    result: {},
  }

  fsOptionCJK = {
    encode: false,
    tokenize: function(str) {
      return str.split("")
    },
  }

  searchEngines = {
    // 用于搜索单位条目关键词的 FlexSearch 搜索引擎
    fsUnit: FlexSearch.create(this.fsOptionCJK),
    // 用于搜索部门关键词的 FlexSearch 搜索引擎
    fsDep: FlexSearch.create(this.fsOptionCJK),
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

  componentDidMount = () => {
    const { yellowPages } = this.props
    if (yellowPages.status !== "VALID") {
      this._onRefresh()
    } else {
      this.initSearchEngines()
    }
  }

  goSearch = text => {
    const { yellowPages } = this.props

    this.setState({ keyword: text }, () => {
      let resUnit = this.searchEngines.fsUnit.search({
        query: this.state.keyword,
        suggest: true,
        limit: 20,
      })
      let resDep = this.searchEngines.fsDep.search({
        query: this.state.keyword,
        suggest: true,
        limit: 5,
      })
      this.setState({
        result: {
          units: resUnit.map(id => {
            return {
              id: id,
              body: yellowPages.generated.units[id],
            }
          }),
          deps: resDep.map(id => {
            return {
              id: id,
              body: yellowPages.generated.deps[id],
            }
          }),
        },
      })
    })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.prepareData().then(() => {
      // 为 FlexSearch 搜索引擎添加搜索条目及关键词
      this.setState({ refreshing: false })
      this.initSearchEngines()
    })
  }

  initSearchEngines = () => {
    const { yellowPages } = this.props
    console.log(yellowPages)

    yellowPages.generated.units.forEach((item, i) => {
      this.searchEngines.fsUnit.add(i, item.keywords)
    })
    yellowPages.generated.deps.forEach((item, i) => {
      this.searchEngines.fsDep.add(i, item.keywords)
    })
  }

  _keyExtractor = item => String(item.no)

  render() {
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor={color.module.yellowPages[1]}
              colors={[color.module.yellowPages[0]]}
            />
          }
        >
          <View style={ss.container}>
            <View style={ss.poweredBy}>
              <Text text="Powered by" preset="lausanne" style={ss.poweredByText} />
              <FlexSearchLogo style={ss.poweredByLogo} fill={color.module.yellowPages[1]} />
            </View>
            <TextField
              placeholder="Search keywords..."
              placeholderTextColor={color.module.yellowPages[2]}
              onChangeText={text => this.goSearch(text)}
              style={ss.field}
              inputStyle={ss.input}
              value={this.state.keyword}
              autoCorrect={false}
            />
            <SearchResult
              result={this.state.result}
              show={this.state.keyword.length > 0}
              navigation={this.props.navigation}
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

export const connectedYellowPagesScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(YellowPagesScreen)
