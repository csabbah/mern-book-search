const { Book } = require('../models');

const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    books: async (parent) => {
      return Book;
    },
  },
  // Mutation: {},
};

module.exports = resolvers;
