　
<p align="center">
	<img src="assets/heading.png?raw=true" alt="WePeiyang 4.0" width="300">
</p>

　
　
### About 关于

The concept of WePeiyang 4.0 was brought by designer [Owlling](http://www.owlling.com/). Later in July 2019, the development of WePeiyang 4.0 was initiated.

微北洋 4.0 的概念提出自设计师 [Owlling](http://www.owlling.com/)。随后的 2019 年 7 月，开发工作正式启动。

　

At that time, the previous major version of WePeiyang, functionally mature and time-proven, does not require an immediate update itself. However, our studio did face problems like unbalanced iOS/Android productivity, inconsistency across platforms, and a mediocre UX. The current version therefore primarily focuses on better structure designs, enhanced user experience and bold experiments on new features.

在项目提出之前，上一版本的微北洋已经具有事实上完整的功能模块，也通过了数年的时间检验。它本身无需一次迫切的升级。但是，工作室的技术团队近期确实面临着一些问题，如生产力失衡、不一致的平台体验、欠佳的用户体验等。因此，这一新版本的开发将会侧重于平台一致性、架构设计、大胆的功能探索，并注入更多与体验和视觉相关的思考。

　

![Main.png](https://i.loli.net/2019/08/10/NeVkmxZo3H8cFBO.png "Main module")

*Main Module / 主模块*

![Modules.PNG](https://i.loli.net/2019/08/06/1wguWQRlea4r9tY.png)

*GPA & Ecard Module / GPA 与校园卡模块*

　

### Status 状态

The project is currently under experimental stage with several primary modules finished.

本项目整体目前仍处于实验阶段，部分主要模块已经开发完成。

　


# Start Building 开始构建

### Android

```bash
npm install -g react-native-cli
npm install
react-native link
react-native run-android
```

### iOS (Build on MacOS)

```bash
npm install -g react-native-cli
npm install
react-native link
cd ios && pod install
cd ..
react-native run-ios
```

Note that to run the above commands, you need to ensure several prerequisites in your building environment. Please refer to [React Native: Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) for the most up-to-date building indications.

请注意，为了使上述命令顺利运行，你的构建环境需要满足一些前提条件。请参考 [React Native: 开始构建](https://facebook.github.io/react-native/docs/getting-started.html) 以获取最新版本的构建要求和步骤。

　

# Project Structure 项目架构

WePeiyang-RN is initiated with `react-native-cli` along with a few customized modifications.

微北洋 RN 使用 `react-native-cli` 初始化，并对原始文件结构应用了少许变更。

```
WePeiyang-RN
├── android
├── ios
├── app
│   ├── i18n
│   ├── store.ts
│   ├── actions
│   ├── reducers
│   ├── components
│   ├── navigation
│   ├── screens
│   ├── services
│   ├── theme
│   ├── app.tsx
│   ├── environment-variables.ts
├── __test__
├── README.md
├── index.js
└── package.json
```

### ./app directory

**components**
This is where your React components will live. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components. The app will come with some commonly used components like Button.

**i18n**
This is where your translations will live.

**actions**
This is where your app's redux actions will live.

**reducers**
This is where your app's redux reducers will live.

**navigation**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx**
This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

### ./test directory

This directory will hold your Jest configs and mocks, as well as your [storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) test file. This is a file that contains the snapshots of all your component storybooks.

　

# License 协议

A license would be published after the first release. Before that happens, issues are pull requests are welcomed.

协议会发布在项目第一版开发完成之后。在此之前，欢迎任何问题讨论与合并请求。

　

<p align="center">
	<img src="assets/credits.png?raw=true" alt="TWT STUDIO × Tzingtao Chow" width="255">
</p>
