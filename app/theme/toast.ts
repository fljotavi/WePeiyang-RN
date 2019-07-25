import { color } from "./color"

// 此文件指定 Toast 的预设样式。对其具体用法的解释，请参见以下段落。

// This file specifies styling for Toasts.
// Please be aware: The library used for Toasts (react-native-root-toast) calls the native <Text/> component by default, instead of the hacked one.
// This may result in inconsistent text styles, especially when a custom font family is applied. It also challenges the use of i18n text translation.
// To solve this problem, a recommended approach for calling the Toast api is passing the custom <Text/> component, instead of plain strings.
// Example: `Toast.show(<Text tx="..." style={{ color: toastOptions.primary.textColor }}/> as any, toastOptions.primary)`
//
// The keyword `as any` is required to suppress type checks, because currently the TypeScript type definition for this library is not correct.
// You also need to pass a text color manually because the built-in `textColor` option does not support hacked <Text/> component.
//
// Seemingly the source of all problems here is the hacked <Text/> component.
// Well, the reason that we hacked it in the first place is - there is currently no better approach to apply a custom font family in Android apps globally.
//
// I came from a web background, where a single CSS selector would solve all these problems.
// I had to admit developing RN applications feels like shit. (Mostly because Android is a piece of shit.)

const BASE = {
  shadow: false,
  opacity: 0.95,
  position: -80, // Need to be slightly higher for the sake of the bottom tab bar
  animation: true
}

const primary = {
  ...BASE,
  backgroundColor: color.primary,
  textColor: color.background,
}

const err = {
  ...BASE,
  backgroundColor: color.error,
  textColor: color.background,
}

export default {
  primary, err
}
