const { gql } = require('apollo-server-express');

const { projects } = require('./data-set');

module.exports.typeDefs = gql`  
  type ProjectDetails {
    id: ID
    name: String
    description: String
    startDate: String
    technologies: [Technology]
    company: String
    members: [User]
  }

  extend type Query {
    project(id: ID!): ProjectDetails
  }
`;

module.exports.projectResolvers = {
  Query: {
    project: (root, {id}) => {
      return projects.find(project => project.id === id) || {}
    }
  }
};
