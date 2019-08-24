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
    guestMode: "Guest Mode",
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
    noTransaction: "No transaction record found in the last %{days} days",
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
      homepage: "Homepage",
      elsewhere: "Elsewhere",
    },
    hideGpa: "Hide GPA On Homepage",
    owlMode: {
      title: "Enable Owl Mode",
      on: "Display tomorrow's schedule after 21:00",
      off: "Always display today's schedule",
    },
    daysEachWeek: {
      title: "Displayed Days Each Week",
      intro: "Choose your preferred weekdays interval.",
      options: "Display %{count} days each week",
    },
    displayNotThisWeek: {
      title: "Display not-this-week courses",
      on:
        "Display courses. Note that in cases where several not-this-week courses occupy the same time period, they will be rendered overlapped.",
      off: "Display random activities.",
    },
    scheduleTextSize: {
      title: "Schedule Table Text Size",
      intro:
        "Font size for courses in schedule tables are automatically adjusted to fit the size of course blocks. ",
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
        "You can detach this account anytime. After disconnecting, you wouldn't be able to use services relating to this account.",
    },
    unbindEcardHint:
      "To unbind your e-card, you just need to log out. Your e-card account would be unconnected when you log in again.",
    libLatencyHint:
      "Please note that your account binding status would be updated after the next login.",
    tjuLatencyHint:
      "Please note that your account binding status would be updated after the next login.",
    ecardHint:
      "For security reasons, the binding action for e-card is only available for the current session. Your e-card account would be immediately detached once you log out.",
    networkHint:
      "For security reasons, the binding action for TJU network is only available for the current session. Your network account would be immediately detached once you log out.",
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
    noRadar: "Radar & rose chart is not available with semesters of less than three courses.",
    order: {
      orderedBy: "Ordered by",
      credits: "Credits",
      name: "Name",
      score: "Score",
    },
    info: {
      title: "Disclaimer",
      content:
        "The indicators, charts and scores calculated by WePeiyang are for reference only. Please consult Tianjin University Academic Affairs Department for the official algorithms, policies and grading results.",
    },
    tab: {
      main: "Main",
      exp: "Data",
    },
    kachi: {
      yourKachiIndex: "Your Kachi Index",
      what: {
        title: "What is Kachi Index?",
        content:
          "In Chinese, Kachi (卡绩, literally “Stuck on GPA”) means acquiring a highest score among a fixed GPA section, e.g. 89. The official mapping algorithm between scores and GPAs is not continuous, therefore some students might get a lower overall GPA than he deserve with his scores. This is what Kachi index describes - the inconsistency between GPA and weighted score.",
      },
      how: {
        title: "How is Kachi Index computed?",
        content:
          "We used regression to determine a sigmoid equation that maps GPAs and scores in a continuous manner, then calculate the difference between the continuous version of GPA and the discrete (official) version of GPA for each course involved. This difference is the prototype of Kachi index. A Kachi'd score would output a more positive value, and vice versa. The final result is a weighted average of all computed Kachi-indices.",
      },
      howBad: {
        title: "How badly am I Kachi'd?",
        content:
          "A normal Kachi index typically falls between -3.0 and 1.0. Students are more likely to have negative Kachi indices because teachers sometimes give rounded-up scores. If you find your Kachi index greater than 1, it probably indicates that you're pretty badly Kachi'd.",
      },
    },
  },
  schedule: {
    noCourseToday: "No course today",
    id: "ID",
    logicNo: "Logic No.",
    campus: "Campus",
    location: "Room",
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
    overdue: "Overdue",
    renew: "Renew",
    renewCaveat:
      "A single book can be renewed for only three times. We recommend that you renew your books when the due date is approaching. Proceed?",
  },
  network: {
    login: "Surf",
    logout: "Board",
    yourUsername: "Your student ID",
    yourPassword: "Your g.tju.edu.cn password",
    greetings: "And God Said, “Let There Be The Internet.”",
    connected: "And there was the internet.",
    bugHint:
      "Sometimes sending a correct password could also return a message of wrong password. This bug is caused by Tianjin University Network Centre and occurs on the native login page too. In that case, you might want to additionally try several times.",
  },
  contact: {
    searchBar: "Search keywords...",
    department: "Department",
    noUnit: "No unit found in this department",
    infoSource: "Info Source",
    info: {
      title: "About",
      content:
        "Information provided by e.tju.edu.cn. To publish new contacts or report a mistake, please consult Tianjin University Network Centre.",
    },
  },
}

let es = `わかった
確認する
キャンセルする
戻る
閉じる
それについて学ぶ！
残り
日
不明
マイクロ北陽を離れます
このサービスはWebで利用でき、ブラウザでリンクを開き続けます。
データがありません
最新のデータに正常にアクセスする
ネットワーク要求の失敗により、一部のデータが正常に更新されない可能性があります...
ゲストモード
ユーザー認証ステータスを確認...
ログイン
ログアウトユーザー
ログイン成功
ログインに失敗しました...
ログアウトしたユーザー
ログイン情報をローカルに保存できません。次回起動時に追加の手動ログインが必要になる場合があります。
ローカルログイン情報を削除できません。問題が解決しない場合は、システム設定でApp Storeをクリアして、アカウントが安全であることを確認することをお勧めします。
またお会いできてうれしいです。
Tianwaitianアカウントのユーザー名
Tiantiantianアカウントのパスワード
こんにちは
バインドされていないキャンパスカード
カード
カード所持者
有効期限
今日の消費
今月の消費
請求の詳細
過去％{days}日間に取引履歴はありません
さらに読み込む
ここに表示される統計は、最新の消費記録の日付のものです。
ニュース
TJUネットワーク
セッティング
ホームページ
他の場所
ホームページでGPAを非表示にする
フクロウモードを有効にする
毎晩21:00以降の明日のスケジュールを表示する
その日のスケジュールを常に表示する
週ごとの日数を表示
週次スケジュールで非稼働日を表示するかどうかを選択できます。
週あたり％{count}日
週単位以外のコースを描く
まだ開始していないコースを表示します。ただし、特定の期間に異なる週で異なる今週以外のコースがある場合、それらは重複することに注意してください。
放課後のアクティビティの候補をランダムに表示します。
文字サイズ
一般に、カリキュラムのフォントサイズは画面サイズに合わせて自動的に調整されます。それでも問題が解決しない場合は、ここで目的のフォントサイズに手動で調整できます。
自動再接続
TJU-WLANを切断した後、ネットワークに再接続しようとしていることがわかりました
GitHubのWePeiyang
WePeiyangは、質問をしたり、話し合ったり、翻訳を手伝ったり、ドキュメントを書いたり、独自のコードを提供したりできるオープンソースプロジェクトです。一緒に改善してください！
Tian WaitianユーザーコミュニティQQ / TIMグループ
技術サポート
助けが必要ですか？問題が見つかりましたか？ Tiantiantianテクニカルサポートコミュニティに投稿することを歓迎します。
言語
言語設定
Micro Beiyang内のインターフェイス言語と操作言語のみが変更されることに注意してください。コース名、書籍名、エラープロンプトなどの外部リソースに依存するテキストは、元の言語を保持します。翻訳の修正やGitHubの改善に貢献できます。
アカウントに接続して、より多くの可能性を発見してください
アカウントに接続して、より多くの可能性を発見してください
アカウントに接続して、より多くの可能性を発見してください
まだバインドされていません
バインド
バインディング
バインド解除
図書館口座
キャンパスカードアカウント
オフィスアカウント
学生IDまたはキャンパスID
6桁のキャンパスカードパスワード（通常はPOSに使用）
あなたのオフィスのパスワード
ライブラリのパスワード
ライブラリパスワードは、lib.tju.edu.cnで使用されるログインパスワードです。わからない場合は、初期パスワード666666、またはID番号の12〜17桁目を使用してみてください。パスワードのリセットについては、天津大学図書館のヘルプデスクに相談することもできます。
バインドに成功しました。追加の再ログインが必要になる場合があります。
バインドを解除しました。追加の再ログインが必要になる場合があります。
このアカウントは現在、Micro Beiyangに関連付けられています。
このアカウントはいつでも解除できます。バインドを解除すると、このアカウントに関連付けられたサービスを使用できなくなります。
キャンパスカードのバインドを解除するには、ログアウトするだけです。再度ログインすると、キャンパスカードは自動的に解かれます。
アカウントのバインドステータスは、次回のログイン後に更新されることに注意してください。
アカウントのバインドステータスは、次回のログイン後に更新されることに注意してください。
セキュリティ上の理由から、デバイスからログアウトすると、キャンパスカードは自動的にバンドル解除されます。
セキュリティ上の理由から、デバイスからログアウトすると、キャンパスネットワークアカウントは自動的にバンドル解除されます。
WPY
ニュース
TJU
モジュールナビゲーション
自転車
イエローページ
ブラシの問題
図書館
キャンパスカード
GPA
GPA曲線
自習室
コーススケジュール
ニュース
モール
パーティービル
キャンパスネットワーク
投票する
アンケート
掲示板
学習プラットフォーム
雇用
社会的実践
総加重
GPA
クレジットを獲得する
セメスターの重み付け
セメスターグレードポイント
クレジットを獲得する
クレジット
GPAレーダーチャートは、3学期未満の学期には適用されません。
並べ替え
クレジット
コース名
グレード
声明
正確で直観的な情報を提供するよう努めていますが、これらは参照専用です。公式のアルゴリズム、ポリシー、およびGPAトランスクリプトについては、大学の学務部に相談してください。
ホームページ
研究所
あなたのカード性能指標
パフォーマンスインデックスとは何ですか？
中国語では、Kachiは通常、89ポイントなどの固定GPA間隔で最高のスコアを取得することを意味します。スコアとGPAの間の公式のマッピングアルゴリズムは連続的ではないため、一部の学生のGPAは著しく落ち込んでいる場合があります。これは、カードパフォーマンスインデックスで示されるインジケーターです。
パフォーマンスインデックスの計算方法
シグモイド回帰を使用して連続的なGPAスコアマッピング関係を決定し、パフォーマンスインデックスのプロトタイプとして、結果のGPAと公式アルゴリズムのGPAの差を計算します。カードスコアのスコアは正の値を出力し、そうでない場合は負の値を出力します。最終的なパフォーマンスインデックスは、すべてのコースのパフォーマンススコアの加重平均です。
私はひどく立ち往生していますか？
通常のパフォーマンスインデックスは、通常-4.0〜2.0です。教師はしばしば分裂する傾向があるため、生徒はパフォーマンス指標がマイナスになる可能性が高くなります。カードのパフォーマンスインデックスが2より大きい場合は、より深刻であることを示している可能性があります。
今日は何もしません
ID
論理クラス番号
キャンパス
クラスの場所
週の開始と終了
時間
最初に
 週
まだ本を借りていません。
ライブラリアカウントはバインドされていません
電話番号
書誌タイプ
場所
貸す
まだあるはず
期限切れ
更新する
本は3回しか更新できません。機会を無駄にしないために、締め切りが近づくと本を更新することをお勧めします。続行しますか？
サーフィン
浜辺
学生IDまたはキャンパスID
g.tju.edu.cnのパスワード
神は「あなたは網を持たなければならない」と言われました。
それからネットがあります。
正しいパスワードを入力した場合でも、間違ったパスワードでメッセージを返すことがあります。このエラーは、天津大学ネットワークセンターが原因で発生し、場合によっては独自のログインページで発生しました。この場合、複数回試行する必要がある場合があります。
検索キーワード
部門
部門の下にユニットがない
情報源
について
情報は天津大学のオフィスネットワークによって提供されます。連絡先の詳細を投稿したり、バグを報告するには、天津大学情報ネットワークセンターにお問い合わせください。`

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
