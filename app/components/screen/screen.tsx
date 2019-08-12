/*
 * Screen
 * Created by Tzingtao Chow
 * ---
 *
 * Screen 是每一个单屏幕组件的统一父组件。
 *
 * 在 Ignite 提供的原始 Boilerplate 中，Screen 具有 scroll 和默认两种预设配置。
 * 但在本项目中，考虑到兼顾 iOS 和 Android 的沉浸式状态栏和下拉刷新支持，
 * 即便屏幕可以滚动，也不应设置 preset="scroll"，而应当采用默认配置，并在屏幕内部再用 ScrollView 包含。
 * 这样做会将更大的自由度和配置度交付给每个屏幕。
 *
 * 如果屏幕不可滚动，反而可以考虑设置为 preset="scroll"，来实现支持渐变、复杂色背景的沉浸式状态栏。
 * 当屏幕可滚动时，复杂色状态栏不是一个很好的选项，因为滚动上去的文字等内容会与状态栏重叠。
 *
 * 这部分水比较深，建议在完全弄清楚之前，先按照以上原则使用。
 *
 */

import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const Wrapper = props.unsafe ? View : SafeAreaView

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <Wrapper style={[preset.inner, style]}>{props.children}</Wrapper>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const Wrapper = props.unsafe ? View : SafeAreaView

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <Wrapper style={[preset.outer, backgroundStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          showsVerticalScrollIndicator={false}
        >
          {props.children}
        </ScrollView>
      </Wrapper>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
