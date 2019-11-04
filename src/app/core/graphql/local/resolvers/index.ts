import gql from 'graphql-tag';

export const resolvers = {
  Mutation: {
    toggleProject: (root, { id }, { cache, getCacheKey }) => {
      const cacheKey = getCacheKey({ id, __typename: 'Project' });
      const fragment = gql`
        fragment projectToSelect on Project {
          selected
        }
      `;

      let data = cache.readFragment({ fragment, id: cacheKey });
      data = {...data, selected: !data.selected };

      cache.writeFragment({ fragment, data, id: cacheKey });
      return null;
    },
    saveFilters: (root, filters, { cache }) => {
      console.log('Save filters', filters);
      filters.__typename = 'Filters';

      cache.writeData({ data: { filters } });
    }
  },
  Project: {
    selected: (project) => project.selected || false,
  },
};
