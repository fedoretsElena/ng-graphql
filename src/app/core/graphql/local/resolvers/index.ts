import gql from 'graphql-tag';

export const resolvers = {
  Mutation: {
    deleteTechnology: (root, { projectID, technologyID }, { cache, getCacheKey }) => {
      const id = getCacheKey({ id: projectID, __typename: 'Project' });
      const fragment = gql`
        fragment Technologies on Project {
          technologies {
            id
          }
        }
      `;
      const data = cache.readFragment({ fragment, id });

      data.technologies = data.technologies.filter(technology => technology.id !== technologyID);

      cache.writeFragment({ data, fragment, id });
      return technologyID;
    },
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
