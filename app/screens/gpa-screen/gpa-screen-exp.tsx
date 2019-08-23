import * as React from "react"
import { connect } from "react-redux"
import { ScrollView, View } from "react-native"
import ss from "./gpa-screen.style"
import { Image } from "react-native"
import { Text } from "../../components/text"
import { kachiIndexOverall, kachiIndexSemester } from "../../utils/kachi"
import { KachiSnack } from "./kachi-snack"
import { ByTwt } from "../../components/by-twt"
import { color } from "../../theme"
export interface GpaScreenExpProps {
  gpa?
}

class _GpaScreenExp extends React.Component<GpaScreenExpProps, {}> {
  _keyExtractor = item => String(item.no)

  render() {
    const { gpa } = this.props
    let kachiIndices = gpa.data.gpaDetailed.map(sem => {
      return {
        kachi: kachiIndexSemester(sem),
        name: sem.name,
        term: sem.term,
        stat: sem.stat,
      }
    })
    let kachi = kachiIndexOverall(kachiIndices)

    console.log(kachiIndices, kachi)

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ss.container}>
          <Image source={require("./assets/kachiindex.png")} style={ss.kachiImg} />
          <View style={ss.kachiBoard}>
            <View style={ss.kachiSection}>
              <Text text="Your Kachi Index" style={ss.kachiHead} preset="h5" />
              <View style={{ alignItems: "center", alignSelf: "stretch" }}>
                <Text text={(kachi * 100).toFixed(2)} style={ss.kachiHugo} preset="h1" />
                <View style={ss.kachiList}>
                  <KachiSnack cols={["学期", "加权", "绩点", "卡绩指数"]} />
                  {kachiIndices.map(sem => (
                    <KachiSnack
                      cols={[sem.name, sem.stat.score, sem.stat.gpa, (sem.kachi * 100).toFixed(2)]}
                    />
                  ))}
                </View>
              </View>
            </View>
            <View style={ss.kachiSection}>
              <Text text="What is Kachi Index?" style={ss.kachiHead} preset="h5" />
              <Text tx="gpa.kachi.what" style={ss.kachiPara} preset="small" />
            </View>
            <View style={ss.kachiSection}>
              <Text text="How is Kachi Index computed?" style={ss.kachiHead} preset="h5" />
              <Image
                source={require("./assets/kachi-comic-a.png")}
                style={{ width: 260, height: 180, opacity: 0.5, alignSelf: "center" }}
              />
              <Text tx="gpa.kachi.how" style={ss.kachiPara} preset="small" />
            </View>
            <View style={ss.kachiSection}>
              <Text text="How badly am I Kachi'd?" style={ss.kachiHead} preset="h5" />
              <Image
                source={require("./assets/kachi-comic-b.png")}
                style={{ width: 250, height: 78, opacity: 0.5, alignSelf: "center" }}
              />
              <Text tx="gpa.kachi.howBad" style={ss.kachiPara} preset="small" />
            </View>
          </View>
          <ByTwt fill={color.module.gpa[2]}>
            <Text text="ExperimentLab" />
          </ByTwt>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    gpa: state.dataReducer.gpa,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export const GpaScreenExp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_GpaScreenExp)
export default GpaScreenExp
