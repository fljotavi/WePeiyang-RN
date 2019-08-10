import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"
import { colorHashByCredits, sanitizeLocation } from "../../utils/common"
import { TjuBadge } from "../tju-badge"
import { getScheduledTimeFromArrangement } from "../../utils/schedule"

export interface CourseModalProps {
  chosenCourse?
  style?: ViewStyle
}

export function CourseModal(props: CourseModalProps) {
  const ss = {
    modalCard: {
      padding: 28,
      height: 390,
      backgroundColor: color.card,
      borderRadius: layoutParam.borderRadius * 1.7,
      justifyContent: "space-between",
      overflow: "hidden",
    } as ViewStyle,

    courseTag: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      marginBottom: 5,
      backgroundColor: color.background,
      alignSelf: "flex-start",
      borderRadius: layoutParam.borderRadius / 2.4,
      flexDirection: "row",
      alignItems: "center",
    } as ViewStyle,

    courseTitle: {
      fontSize: 27,
      lineHeight: 36,
      fontWeight: "bold",
      marginTop: 5,
      marginBottom: 10,
      color: color.background,
    } as TextStyle,
    courseTutor: {
      color: color.background,
    } as TextStyle,

    courseAttrs: {
      marginTop: 0,
      flexWrap: "wrap",
      flexDirection: "row",
    } as ViewStyle,
    courseAttrPair: {
      marginBottom: 7,
      marginRight: 14,
    } as ViewStyle,
    courseAttrKey: {
      fontSize: 9,
      letterSpacing: 2.5,
      textTransform: "uppercase",
      color: color.background,
    } as TextStyle,
    courseAttrValue: {
      fontSize: 11,
      color: color.background,
      fontWeight: "bold",
    } as TextStyle,

    tjuBadge: {
      position: "absolute",
      right: -50,
      bottom: -50,
    } as ViewStyle,
  }

  const { chosenCourse, style } = props

  let hashedColorStyle = {
    fontWeight: "bold",
    color: color.hash.course[colorHashByCredits(chosenCourse.credit)],
  }

  return (
    <View
      style={[
        ss.modalCard,
        {
          backgroundColor: color.hash.course[colorHashByCredits(chosenCourse.credit)],
        },
        style,
      ]}
    >
      <TjuBadge style={ss.tjuBadge} fill={color.white(0.02)} height={310} width={270} />

      <View>
        {chosenCourse.ext.length > 0 && (
          <View style={ss.courseTag}>
            <Text text="school" preset="i" style={hashedColorStyle} />
            <Text text=" " preset="small" style={hashedColorStyle} />
            <Text text="重修" preset="small" style={hashedColorStyle} />
          </View>
        )}

        <Text text={chosenCourse.coursename} style={ss.courseTitle} selectable={true} />
        <Text style={ss.courseTutor}>
          <Text text={`${chosenCourse.teacher} · ${chosenCourse.college}`} selectable={true} />
        </Text>
      </View>

      <View>
        <View style={ss.courseAttrs}>
          <View style={ss.courseAttrPair}>
            <Text text={"ID"} style={ss.courseAttrKey} />
            <Text text={chosenCourse.courseid} style={ss.courseAttrValue} />
          </View>
          <View style={ss.courseAttrPair}>
            <Text text={"Type"} style={ss.courseAttrKey} />
            <Text text={chosenCourse.coursenature} style={ss.courseAttrValue} />
          </View>
          <View style={ss.courseAttrPair}>
            <Text text={"SubType"} style={ss.courseAttrKey} />
            <Text text={chosenCourse.coursetype} style={ss.courseAttrValue} />
          </View>
          <View style={ss.courseAttrPair}>
            <Text text={"逻辑班号"} style={ss.courseAttrKey} />
            <Text text={chosenCourse.classid} style={ss.courseAttrValue} />
          </View>
          <View style={ss.courseAttrPair}>
            <Text text={"Campus"} style={ss.courseAttrKey} />
            <Text text={chosenCourse.campus} style={ss.courseAttrValue} />
          </View>
          <View style={ss.courseAttrPair}>
            <Text text={"Location"} style={ss.courseAttrKey} />
            <Text
              text={sanitizeLocation(chosenCourse.activeArrange.room)}
              style={ss.courseAttrValue}
            />
          </View>
          <View style={ss.courseAttrPair}>
            <Text text={"Time"} style={ss.courseAttrKey} />
            <Text
              text={getScheduledTimeFromArrangement(chosenCourse.activeArrange)}
              style={ss.courseAttrValue}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
