import * as React from "react"
// @ts-ignore: until they update @type/react-navigation
import { getNavigation, NavigationScreenProp, NavigationState } from "react-navigation"
import { RootNavigator } from "./root-navigator"

interface StatefulNavigatorProps {}

export class StatefulNavigator extends React.Component<StatefulNavigatorProps, {}> {
  currentNavProp: NavigationScreenProp<NavigationState>

  getCurrentNavigation = () => {
    return this.currentNavProp
  }

  render() {
    // create a custom navigation implementation
    this.currentNavProp = getNavigation(RootNavigator.router)

    return <RootNavigator navigation={this.currentNavProp} />
  }
}
