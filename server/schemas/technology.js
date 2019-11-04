const { gql } = require('apollo-server-express');

module.exports.typeDef = gql`
  type Technology {
    name: String
    version: String
  }
`;
