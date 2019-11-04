import gql from 'graphql-tag';

export const SAVE_FILTERS = gql`
  mutation saveFilters($search: String, $limit: Int) {
    saveFilters(search: $search, limit: $limit) @client
  }
`;
