const { gql } = require('apollo-server-express');

const { edgesToReturn, pageInfoToReturn } = require('./pagination');

const { projects } = require('./data-set');

module.exports.typeDefs = gql`
  type ProjectsConnection {
    pageInfo: PageInfo!
    edges: [ProjectsEdge]
  }

  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
  }

  type ProjectsEdge {
    cursor: String!
    node: Project
  }

  extend type Query {
    projects(
      first: Int,
      after: String,
      last: Int,
      before: String
    ): ProjectsConnection
  }
`;

module.exports.projectsConnectionResolver = {
  Query: {
    projects: (root, { first, after, last, before }) => {
      console.log(first, after, last, before );
      let initialEdges = projects.map(project => ({
        cursor: project.createdAt,
        node: {
          ...project
        }
      }));

      return {
        edges: edgesToReturn(initialEdges, first, last, after, before),
        pageInfo: pageInfoToReturn(initialEdges, first, last, after, before)
      };
    }
  }
};
