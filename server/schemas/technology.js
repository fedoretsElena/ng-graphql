const { gql } = require('apollo-server-express');

module.exports.typeDef = gql`
  type Technology {
    id: ID
    name: String
    version: String
  }
`;
