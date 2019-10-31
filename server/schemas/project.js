const { gql } = require('apollo-server-express');

const { typeDef: Technology } = require('./technology');
const { typeDef: User } = require('./user');
const { typeDef: RoleEnum } = require('./role');
const { projects } = require('./data-set');

exports.typeDefs = [gql`
  extend type Query {
    project(id: ID!): ProjectDetails
  }
  
  type ProjectDetails {
    id: ID,
    name: String,
    description: String,
    startDate: String
    technologies: [Technology]
    company: String
    members: [User]
  } 
`, Technology, User, RoleEnum];

exports.projectResolvers = {
  Query: {
    project: (root, {id}) => {
      return projects.find(project => project.id === id) || {}
    }
  }
};
