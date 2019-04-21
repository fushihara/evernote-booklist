*公開プロジェクト！秘密情報注意*

evernoteAPIから、ノート一覧を返すAPI

# 利用方法

nodejsのexpressで起動する

# 設定パラメータ

./config/ の設定ファイルを編集する。

```
{
  "express": {
    "urlPrefix": "/test/", // http://localhost:53143/test/?token=hogehoge でアクセスを通す。
    "token":"hogehoge",
    "urlPort": 53143
  },
  "evernoteDeveloperToken":"" // evernoteのデベロッパトークン。結構長い文字
}
```

# todo

- evernoteAPIの型がignoreしまくってるので、ちゃんとd.tsを作る
