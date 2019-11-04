const { gql } = require('apollo-server-express');

const { projects } = require('./data-set');

module.exports.typeDefs = gql`  
  extend type Project {
    members: [User]
    company: String
    description: String
  }

  extend type Query {
    project(id: ID!): Project
  }
`;

module.exports.projectResolvers = {
  Query: {
    project: (root, {id}) => {
      return projects.find(project => project.id === id) || {}
    }
  }
};
