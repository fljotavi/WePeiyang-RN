/*
 * Yellow Pages Screen
 * Created by Tzingtao Chow
 * ---
 *
 * Yellow Pages Screen 是黄页模块的首页（搜索页面）。
 * 此页面中包含了模块下的搜索逻辑。
 *
 * 黄页的搜索会在各 Department 的关键字（部门名称）和各 Unit 的关键字（单位名称和其所属的部门名称）中同时搜索，
 * 并返回最多 5 个部门结果和最多 20 个单位结果。
 * 这些数量将计划做成可自定义的。
 *
 */

import * as React from "react"
import { connect } from "react-redux"

import {
  DeviceEventEmitter,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
  Image,
} from "react-native"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { TopBar } from "../../components/top-bar"
import { fetchYellowPagesData } from "../../actions/data-actions"
import { Toasti } from "../../components/toasti"
import { TextField } from "../../components/text-field"

import FlexSearch from "../../utils/flex-search"
import { SearchResult } from "./components/search-result"
import { FlexSearchLogo } from "./components/flex-search-logo"
import { Text } from "../../components/text"

export interface YellowPagesScreenProps extends NavigationScreenProps<{}> {
  pref?
  yellowPages?
  fetchYellowPagesData?
}

class _YellowPagesScreen extends React.Component<YellowPagesScreenProps, {}> {
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

    yellowPages.generated.units.forEach((item, i) => {
      this.searchEngines.fsUnit.add(i, item.keywords)
    })
    yellowPages.generated.deps.forEach((item, i) => {
      this.searchEngines.fsDep.add(i, item.keywords)
    })
  }

  _keyExtractor = item => String(item.no)

  render() {
    const ss = require("./yellow-pages-screen.styles").default
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
                iconText: "sync",
                action: this._onRefresh,
              },
            ],
          }}
          color={color.module().yellowPages[1]}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor={color.module().yellowPages[1]}
              colors={[color.module().yellowPages[1]]}
            />
          }
        >
          <View style={ss.container}>
            <View style={ss.poweredBy}>
              <Text text="Powered by" preset="lausanne" style={ss.poweredByText} />
              <FlexSearchLogo style={ss.poweredByLogo} fill={color.module().yellowPages[2]} />
            </View>
            <TextField
              placeholderTx="contact.searchBar"
              placeholderTextColor={color.module().yellowPages[1]}
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
        {this.state.keyword.length <= 0 && (
          <Image source={require("./assets/tel-dark.png")} style={ss.telImg} />
        )}
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

export const YellowPagesScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_YellowPagesScreen)
