const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    bookId: String
    author: [String]
    title: String
    description: String
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

  type Query {
    me: User
    books: Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      author: [String]
      description: String
      title: String
      bookId: String
      image: String
      link: String
    ): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
