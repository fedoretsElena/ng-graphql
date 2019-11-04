import gql from 'graphql-tag';

export const TOGGLE_PROJECT = gql`
  mutation toggleProject($id: ID) {
    toggleProject(id: $id) @client {
      id
    }
  }
`;
