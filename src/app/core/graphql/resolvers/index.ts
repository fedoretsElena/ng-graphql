export const resolvers = {
  Mutation: {
    saveFilters: (root, filters, { cache }) => {
      // const res = cache.readQuery({ query: GET_FILTERS });
      console.log('New', filters);

      filters['__typename'] = 'Filters';

      cache.writeData({ data: { filters } });
    }
  }
};

export const typeDefs = `
  type Filters {
    search: String
    limit: Int
  }

  type Mutation {
    saveFilters(search: String, limit: Int): Filters
  }

  type Query {
    theme: String
    filters: Filters
  }
`;
