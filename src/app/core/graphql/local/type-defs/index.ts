export const typeDefs = `
  type Filters {
    search: String
    limit: Int
  }

  type Mutation {
    toggleProject(id: ID): ID
    saveFilters(search: String, limit: Int): Filters
  }

  type Query {
    theme: String
    filters: Filters
  }
`;
