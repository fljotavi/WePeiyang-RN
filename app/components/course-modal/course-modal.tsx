/*
 * Course Modal
 * Created by Tzingtao Chow
 * ---
 *
 * Course Modals 是
 * 点击主页或 Schedule Screen 上的课程块后
 * 出现的包含课程详细信息的对话框。
 *
 */

import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, layoutParam } from "../../theme"
import { colorHashByCredits, sanitizeLocation } from "../../utils/common"
import { TjuBadge } from "../tju-badge"
import { getScheduledTimeFromArrangement } from "../../utils/schedule"
import { Tag } from "../tag"
import Color from "color"

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
  const hashedColor = color.module().schedule[colorHashByCredits(chosenCourse.credit)]

  return (
    <View
      style={[
        ss.modalCard,
        {
          backgroundColor: Color(color.background).mix(
            Color(hashedColor).opaquer(100),
            Color(hashedColor).alpha(),
          ), // Make it opaque, while still remaining the display color
        },
        style,
      ]}
    >
      <TjuBadge style={ss.tjuBadge} fill={color.white(0.02)} height={310} width={270} />

      <View>
        {chosenCourse.ext.length > 0 && (
          <Tag
            text={chosenCourse.ext}
            iconText="school"
            palette={[
              color.background,
              color.module().schedule[colorHashByCredits(chosenCourse.credit)],
            ]}
          />
        )}

        <Text text={chosenCourse.coursename} style={ss.courseTitle} selectable={true} />
        <Text style={ss.courseTutor}>
          <Text text={chosenCourse.teacher} selectable={true} />
        </Text>
      </View>

      <View>
        <View style={ss.courseAttrs}>
          <View style={ss.courseAttrPair}>
            <Text tx="schedule.id" style={ss.courseAttrKey} />
            <Text text={chosenCourse.courseid} style={ss.courseAttrValue} />
          </View>
          <View style={ss.courseAttrPair}>
            <Text tx="schedule.logicNo" style={ss.courseAttrKey} />
            <Text text={chosenCourse.classid} style={ss.courseAttrValue} />
          </View>
          <View style={ss.courseAttrPair}>
            <Text tx="schedule.campus" style={ss.courseAttrKey} />
            <Text text={chosenCourse.campus} style={ss.courseAttrValue} />
          </View>
          <View style={ss.courseAttrPair}>
            <Text tx="schedule.location" style={ss.courseAttrKey} />
            <Text
              text={sanitizeLocation(chosenCourse.activeArrange.room)}
              style={ss.courseAttrValue}
            />
          </View>
          <View style={ss.courseAttrPair}>
            <Text tx="schedule.weeks" style={ss.courseAttrKey} />
            <Text
              text={`${chosenCourse.week.start}-${chosenCourse.week.end}`}
              style={ss.courseAttrValue}
            />
          </View>
          <View style={ss.courseAttrPair}>
            <Text tx="gpa.credits" style={ss.courseAttrKey} />
            <Text text={chosenCourse.credit} style={ss.courseAttrValue} />
          </View>
          <View style={ss.courseAttrPair}>
            <Text tx="schedule.time" style={ss.courseAttrKey} />
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
