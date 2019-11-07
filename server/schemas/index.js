const { gql } = require('apollo-server');
const merge = require('lodash/merge');

// const { typeDefs: ProjectFeed, projectFeedResolvers } = require('./project-feed');
const { typeDefs: ProjectsConnection, projectsConnectionResolver } = require('./projects-connection');
const { typeDefs: Projects, projectsResolvers } = require('./projects');
const { typeDefs: Project, projectResolvers } = require('./project');
const { typeDef: Technology } = require('./technology');
const { typeDef: User } = require('./user');
const { typeDef: Role } = require('./role');

const Query = gql`
 # The "Query" type is special: it lists all of the available queries that
 # clients can execute, along with the return type for each. In this
 # case, the "books" query returns an array of zero or more Books (defined above).
 
 type Query {
    _empty: String
 }
`;

const Mutation = gql`
 type Mutation {
   _empty: String
 }
`;

// A schema is a collection of type definitions (hence "typeDefs")
// // that together define the "shape" of queries that are executed against
// // your data.
exports.typeDefs = [ Query, Mutation, Projects, ProjectsConnection, Project, Technology, User, Role ];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
exports.resolvers = merge( projectResolvers, projectsConnectionResolver, projectsResolvers);



