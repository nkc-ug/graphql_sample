const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const books = require('./data'); // 元データ

const fs = require('fs');
const schemaText = fs.readFileSync('./schema.graphql', {encoding: 'utf-8'});
const schema = buildSchema(schemaText); // schema.graphqlから文字列としてbuildSchemaに通す

// 1件の本のデータを取得
const getBook = args => {
    const id = args.id;
    return books.find(b => b.id === id);
};

// 本のデータの一覧を取得
const getBooks = args => {
    const category = args.category;
    if (category === undefined) {
        return books;
    }
    return books.filter(b => b.category === category);
};

// 本のデータを追加
const addBook = args => {
    const title = args.title;
    const author = args.author;
    const turn = args.turn || 1;
    const category = args.category;

    const maxId = books.map(b => b.id).reduce((a, b) => b > a ? b : a);
    const id = maxId + 1;
    
    books.push({
        id, title, author, turn, category
    });

    return books.find(b => b.id === id);
};

// "ルート"を定義
const root = {
    book: getBook,
    books: getBooks,
    addBook: addBook
};

// サーバーを作成
const app = express();

// GUI付きで待受け
app.use('/graphql', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

// GUIなしで待受け
app.use('/query', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: false
}));

// サーバー起動
app.listen(3000, () => console.log('Running...'));