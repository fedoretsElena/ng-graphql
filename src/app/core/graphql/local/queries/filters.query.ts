import gql from 'graphql-tag';

export const GET_FILTERS = gql`
  query {
    filters @client {
      search
      limit
    }
  }
`;
