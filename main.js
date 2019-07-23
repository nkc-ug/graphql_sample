const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const books = require('./data');

const fs = require('fs');
const schemaText = fs.readFileSync('./schema.graphql', {encoding: 'utf-8'});
const schema = buildSchema(schemaText);

const getBook = args => {
    const id = args.id;
    return books.find(b => b.id === id);
};

const getBooks = args => {
    const category = args.category;
    if (category === undefined) {
        return books;
    }
    return books.filter(b => b.category === category);
};

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

const root = {
    book: getBook,
    books: getBooks,
    addBook: addBook
};

const app = express();
app.use('/graphql', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.use('/query', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: false
}));

app.listen(3000, () => console.log('Running...'));