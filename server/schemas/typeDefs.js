const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    books(authors: String): [Book]
    book(bookId: String!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookToSave: bookInput!): User
    removeBook(bookId: String!): User
  }

  type Book {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }

  input bookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
