let json = {
  common: {
    ok: "OK",
    confirm: "Confirm",
    cancel: "Cancel",
    back: "Back",
    close: "Close",
    gotIt: "Got it!",
    time: {
      remaining: "",
      daysLeft: " Days Left",
    },
    unknown: "Unknown",
    prepareToLeave: "Be prepared to leave WePeiyang...",
    providedInWebHint: "We provide this service in our web platform. Open Link in Browser?",
  },
  data: {
    noAvailableData: "No available data",
    prepareDataSuccess: "Successfully loaded newest data",
    prepareDataFailed: "Failed to refresh data due to some errors in the network fetching process.",
  },
  auth: {
    checkingAuthStatus: "Checking Auth Status...",
    login: "Log In",
    logout: "Sign Me Out",
    loginSuccess: "Login Success",
    loginFailure: "Login Failed...",
    logoutSuccess: "Logout Success",
    tokenStoreFailure:
      "Failed to store token locally. Additional manual login may be need during the next start.",
    tokenDeleteFailure:
      "Failed to delete local token. If the problem persists, we recommend you to clear App storage in system settings to ensure account safety.",
  },
  loginScreen: {
    greetings: "It's always nice to have you back.",
    username: "TWT Account Username",
    password: "Password",
  },
  homeScreen: {
    greetings: "Hello",
  },
  ecard: {
    noCardsBound: "No cards bound",
    card: "Card",
    holder: "Holder",
    expiresBy: "Expires by",
    dailyExpense: "Today",
    monthlyExpense: "This Month",
    billingDetails: "Billing Details",
    noTransaction: {
      pre: "No transaction record found in the last ",
      post: " days",
    },
    loadMore: "Load one more week",
    rangeHint: "The data shown here ranges to the day of your most recent bill.",
  },
  newsScreen: {
    header: "News",
  },
  tjuScreen: {
    header: "TJU Network",
  },
  settings: {
    settings: "Settings",
    sections: {
      general: "General",
      elsewhere: "Elsewhere",
    },
    hideGpa: "Hide GPA On Homepage",
    daysEachWeek: {
      title: "Displayed Days Each Week",
      intro: "Choose your preferred weekdays interval.",
      options: "Display %{count} days each week",
    },
    autoReconnect: {
      title: "Auto reconnect",
      sub: "Reconnect to TJU-WLAN network when disconnected",
    },
    wpyGithub: {
      title: "WePeiyang on GitHub",
      sub:
        "WePeiyang is an open-sourced project. Help make it better by contributing to our community.",
    },
    timGroup: "TWT Community QQ/TIM Group",
    helpNSupport: {
      title: "Help & Support",
      sub: "Need help? Encountered a problem? Welcome to our support forum.",
    },
    language: "Language",
    languageSetting: "Language Settings",
    languageWarning:
      "Please note that only the texts within WePeiyang App level would be changed. Text that rely on external resources like course names and book names will not be translated.",
  },
  accountBinding: {
    greetings: {
      ecard: "Connect your accounts. Discover more possibilities.",
      tju: "Connect your accounts. Discover more possibilities.",
      lib: "Connect your accounts. Discover more possibilities.",
    },
    unbound: "Unbound",
    bound: "Bound",
    bind: "Bind",
    unbind: "Unbind",
    libraryAccount: "Library account",
    ecardAccount: "E-card account",
    portalAccount: "Portal account",
    yourStudentId: "Your Student ID",
    ecardPassword: "E-card password (Used on POS machines)",
    etjuPassword: "Your e.tju.edu.cn Password",
    libPassword: "Your library password",
    libPasswordHint:
      "Your library password is the password used on lib.tju.edu.cn. If you didn't know what it is, please try initial password 666666, or the 12th-17th digits of your National ID card. Please consult the information desk in Tianjin University Library for password reset of any further information.",
    bindSuccess: "Successfully bound. Additional re-login may be needed.",
    unbindSuccess: "Successfully unbound. Additional re-login may be needed.",
    unbindModal: {
      heading: "This account is currently connected to WePeiyang.",
      content:
        "You can unbind this account anytime. After disconnecting, you wouldn't be able to use services relating to this account.",
    },
    unbindEcardHint:
      "To unbind your e-card, you just need to log out. Your e-card account would be unconnected when you log in again.",
    libLatencyHint:
      "Please note that your account binding status would be updated after the next login.",
    tjuLatencyHint:
      "Please note that your account binding status would be updated after the next login.",
    ecardHint:
      "For security reasons, the binding action for e-card is only for current session. Your e-card account would be immediately disconnected once you log out.",
    networkHint:
      "For security reasons, the binding action for TJU network is only for current session. Your network account would be immediately unbound once you log out.",
  },
  tab: {
    wpy: "WPY",
    news: "News",
    network: "TJU",
    modules: "Drawer",
  },
  modules: {
    bike: "Bike",
    contact: "Contact",
    learning: "Learning",
    library: "Library",
    ecard: "E-card",
    gpa: "GPA",
    gpaCurve: "GPA Curve",
    classroom: "Classroom",
    schedule: "Schedule",
    news: "News",
    mall: "Mall",
    party: "Party",
    network: "Network",
    vote: "Vote",
    survey: "Survey",
    bbs: "BBS",
    docs: "Docs",
    career: "Career",
    socialPractice: "Volunteer",
  },
  gpa: {
    totalWeighted: "Total Weighted",
    totalGpa: "Total GPA",
    creditsEarned: "Credits Earned",
    semestralWeighted: "Weighted",
    semestralGpa: "GPA",
    semestralCredits: "Credits",
    credits: "Credits",
    order: {
      orderedBy: "Ordered by",
      credits: "Credits",
      name: "Name",
      score: "Score",
    },
    info: {
      title: "About GPA",
      content:
        "The indicators, charts and scores calculated by WePeiyang are for reference only. Please consult the Tianjin University Academic Affairs Department for official algorithms, policies and grading results.",
    },
  },
  schedule: {
    noCourseToday: "No course today",
    id: "ID",
    logicNo: "Logic No.",
    campus: "Campus",
    location: "Location",
    weeks: "Weeks",
    time: "Time",
    WEEK: {
      pre: "WEEK ",
      post: "",
    },
  },
  library: {
    noBooks: "You didn't borrow any books",
    notBound: "Library account not bound",
    callNo: "Call No.",
    type: "Type",
    location: "Location",
    borrowedTime: "Borrowed",
    returnBy: "Return By",
    renew: "Renew",
    renewCaveat:
      "A single book can be renewed for only three times. We recommend that you renew your books when the due date is approaching. Proceed?",
  },
  network: {
    login: "Surf",
    logout: "Board",
    yourUsername: "Your student ID",
    yourPassword: "Your g.tju.edu.cn password",
    greetings: "And God Said, “Let There Be Internet.”",
    connected: "And there was internet.",
    bugHint:
      "Sometimes sending a correct password could also return a message of wrong password. This bug is caused by Tianjin University Network Centre and occurs on the native login page too. In that case, you might want to additionally try several times.",
  },
  contact: {
    searchBar: "Search keywords...",
    department: "Department",
    noUnit: "No unit found in this department",
    infoSource: "Info Source",
  },
}

let es = `好
确认
取消
背部
关
得到它了！

 剩下的日子
未知
准备离开WePeiyang ......
我们在网络平台上提供此服务。在浏览器中打开链接？
没有可用的数据
成功加载了最新数据
由于网络提取过程中的某些错误，无法刷新数据。
检查验证状态...
登录
给我签名
登录成功
登录失败...
退出成功
无法在本地存储令牌。下次启动时可能需要额外的手动登录。
无法删除本地令牌。如果问题仍然存在，我们建议您清除系统设置中的App存储，以确保帐户安全。
让你回来总是很好。
TWT帐户用户名
密码
你好
没有卡绑定
卡
持有人
过期
今天
这个月
结算明细
最后没有找到交易记录
 天
再加载一周
此处显示的数据范围为您最近的帐单日期。
新闻
TJU网络
设置
一般
别处
在主页上隐藏GPA
每周显示的天数
选择您喜欢的工作日间隔。
每周显示％{count}天
自动重新连接
断开连接后重新连接到TJU-WLAN网络
WePeiyang在GitHub上
WePeiyang是一个开源项目。通过为社区做出贡献，帮助改善它。
TWT社区QQ / TIM集团
帮助支持
需要帮忙？遇到了问题？欢迎来到我们的支持论坛。
语言
语言设定
请注意，只有WePeiyang App级别的文本会被更改。依赖于课程名称和书名等外部资源的文本将不会被翻译。
连接您的帐户。发现更多可能性。
连接您的帐户。发现更多可能性。
连接您的帐户。发现更多可能性。
不作承诺
界
捆绑
解除绑定
图书馆帐户
电子卡帐户
门户帐户
您的学生证
电子贺卡密码（用于POS机）
你的e.tju.edu.cn密码
你的图书馆密码
您的图书馆密码是lib.tju.edu.cn上使用的密码。如果您不知道它是什么，请尝试使用初始密码666666，或国民身份证的第12至17位数字。请咨询天津大学图书馆的咨询台，了解更多信息的密码重置。
成功绑定。可能需要额外的重新登录。
成功解除绑定。可能需要额外的重新登录。
此帐户目前与WePeiyang相关联。
您可以随时取消绑定此帐户。断开连接后，您将无法使用与此帐户相关的服务。
要取消绑定您的电子贺卡，您只需要退出即可。再次登录时，您的电子卡帐户将被取消连接。
请注意，您的帐户绑定状态将在下次登录后更新。
请注意，您的帐户绑定状态将在下次登录后更新。
出于安全原因，电子卡的绑定操作仅适用于当前会话。退出后，您的电子卡帐户将立即断开连接。
出于安全原因，TJU网络的绑定操作仅适用于当前会话。注销后，您的网络帐户将立即解除绑定。
WPY
新闻
TJU
抽屉
自行车
联系
学习
图书馆
电子贺卡
GPA
GPA曲线
课堂
时间表
新闻
购物中心
派对
网络
投票
调查
BBS
文件
事业
志愿者
总加权
总GPA
获得的学分
加权
GPA
积分
积分
订购
积分
名称
得分了
关于GPA
WePeiyang计算的指标，图表和分数仅供参考。有关官方算法，政策和评分结果，请咨询天津大学教务处。
今天没有课程
ID
逻辑号
校园
地点
周
时间
周

你没有借书
图书馆帐户没有约束
来电号码
类型
地点
借用
回归
更新
一本书只能更新三次。我们建议您在截止日期临近时续订图书。继续？
冲浪
板
你的学生证
你的g.tju.edu.cn密码
上帝说，“让互联网吧。”
有互联网。
有时发送正确的密码也可能会返回错误密码的消息。此错误是由天津大学网络中心引起的，也发生在本地登录页面上。在这种情况下，您可能需要多次尝试。
搜索关键字......
部门
在这个部门找不到任何单位
信息来源`

let esList = es.split(`
`)

const insert = obj => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "string") {
      obj[key] = esList.shift()
    }
    if (typeof obj[key] === "object") {
      insert(obj[key])
    }
  })
}

insert(json)
console.log(JSON.stringify(json))
