const { gql } = require('apollo-server-express');

module.exports.typeDef = gql`
  type User {
    id: ID
    fullName: String
    role: RoleEnum
  }
`;
