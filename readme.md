*公開プロジェクト！秘密情報注意*

evernoteAPIから、ノート一覧を返すAPI

# 利用方法

nodejsのexpressで起動する

## getパラメータ

- developer_token
   -  `S=s10:U=012abc:E=0123456789abcdef:C=0123456789abcdef:P=0ab:A=en-devtoken:V=2:H=0123456789abcdef0123456789abcdef` の様な値
- words
   - 検索ワード。スペース区切り
- order
  - ソート対象。`created`、`updated`、`title`のどれか。これ以外の時は`created`扱い
- ascending
   - 昇順。値が`1`の時のみ降順になる。それ以外は指定なし扱い

# 設定パラメータ

./config/ の設定ファイルを編集する。

```
{
  "express": {
    "urlPrefix": "/test/", // http://localhost:53143/test/ で待機する
    "urlPort": 53143,
  }
}
```

# todo

- evernoteAPIの型がignoreしまくってるので、ちゃんとd.tsを作る
