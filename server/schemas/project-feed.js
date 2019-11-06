const { gql } = require('apollo-server-express');

const { projects } = require('./data-set');

module.exports.typeDefs = gql`
  type Projects {
    projects: [Project],
    # projects will be returned in a ProjectFeed object wrapper
    projectFeed(cursor: String): ProjectFeed
  }
  
  type ProjectFeed {
    # cursor specifies the place in the list where we left off
    cursor: String!

    # this is a chunk of messages to be returned
    projects: [Project]!
  }
  
  extend type Query  {
    projectsEntity: Projects
  }
`;

module.exports.projectFeedResolvers = {
  Query: {
    projectsEntity: (root) => {
      return { projects };
    }
  },
  Projects: {
    projectFeed: ({ projects }, { cursor } ) => {
      // The cursor passed in by the client will be an
      // integer timestamp. If no cursor is passed in,
      // set the cursor equal to the time at which the
      // last message in the channel was created.
      // console.log(projects.map(p => ({ createdAt: p.createdAt, name: p.name })));
      let limit = 2;

      if (!cursor) {
        // console.log('Cursor not found!');
        cursor = projects[0].createdAt;
      }

      cursor = parseInt(cursor);

      // limit is the number of messages we will return.
      // We could pass it in as an argument but in this
      // case let's use a static value.
      const lastProjectIndex = projects.findIndex(
        project => project.createdAt === cursor
      ); // find index of project created at time held in cursor
      // console.log('lastProjectIndex', lastProjectIndex);

      // We need to return a new cursor to the client so that it
      // can find the next page. Let's set newCursor to the
      // createdAt time of the last message in this messageFeed:
      // limit = limit > projects.length ? projects.length : limit;
      const newCursor = projects[lastProjectIndex  + limit].createdAt;
      // console.log('newCursor', newCursor);
      const projectFeed = {
        projects: projects.slice(
          lastProjectIndex,
          lastProjectIndex + limit
        ),
        cursor: newCursor,
      };

      return projectFeed;
    }
  }
};
