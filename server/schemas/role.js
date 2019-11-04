const { gql } = require('apollo-server-express');

module.exports.typeDef = gql`
  enum RoleEnum {
    DEVELOPER
    PM
    BA
  }
`;
