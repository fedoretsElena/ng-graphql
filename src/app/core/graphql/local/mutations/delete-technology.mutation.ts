import gql from 'graphql-tag';

export const DELETE_TECHNOLOGY = gql`
  mutation deleteTechnology($projectID: ID, $technologyID: ID) {
    deleteTechnology(projectID: $projectID, technologyID: $technologyID) @client
  }
`;
