# GraphQLサンプル
## 試し方
`/graphql`にアクセスするとGUIでクエリが発行できます。

`/query`にアクセスするとGUIなしでクエリが発行できます。  
この場合、HTTPメソッド`GET`のクエリ文字列内で`query`というキーの値としてGraphQLのクエリを送信してください。

## クエリの例
### 問い合わせ
```
# 条件指定なしで本の情報一覧をidとtitleのみ取得する
query Books {
  books {
    id
    title
  }
}
```

```
# カテゴリが`Technology`である本の一覧のid, タイトル, 著者, 巻数を取得する
query Books {
  books(category: "Technology") {
    id
    title
    author
    turn
  }
}
```

```
# idが`1`である本のid, タイトル, 著者, 巻数, カテゴリを取得する
query Book {
  book(id: 1) {
    id
    title
    author
    turn
    category
  }
}
```

```
# 新しく本を登録する
mutation AddBook {
  addBook(
    title: "The Python"
    author: "Mr. Snake"
    turn: 1 # turnは必須じゃないので省略可
    category: "Technology"
  ) {
    # 以下登録したデータが返ってくるときに欲しい項目
    id
    title
  }
}
```

## ローカルで試す
nodeとyarnをインストール（yarnはnpmでもいいけどそれ用にコマンドを書き換えること）  
クローンした後以下のコマンドを実行
```
$ yarn
$ yarn dev
```
ブラウザで`localhost:3000/graphql`にアクセス