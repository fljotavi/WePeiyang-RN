# We Peiyang React-Native

The project is currently in experimental stage.

![Modules.PNG](https://i.loli.net/2019/08/06/1wguWQRlea4r9tY.png)


# Start Building

```bash
npm install -g react-native-cli
npm i
react-native run-android
react-native run-ios
```

# Project Structure

WePeiyang-RN is initiated with Ignite boilerplate along with a few customized modifications.

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
├── test
├── ignite
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

### ./ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find generators, plugins and examples to help you get started with React Native.

### ./test directory

This directory will hold your Jest configs and mocks, as well as your [storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) test file. This is a file that contains the snapshots of all your component storybooks.
