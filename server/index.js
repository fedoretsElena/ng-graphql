const { ApolloServer } = require('apollo-server');

const { resolvers, typeDefs } = require('./schemas');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of local.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
