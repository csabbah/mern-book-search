const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    books(author: String): [Book]
    book(_id: ID!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      author: [String!]
      description: String!
      title: String!
      bookId: String!
      image: String!
      link: String!
    ): User
    removeBook(bookId: String!): User
  }

  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    bookId: String
    author: [String]
    title: String
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
