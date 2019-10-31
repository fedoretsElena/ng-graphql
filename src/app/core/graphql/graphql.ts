import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

export const ProjectDocument = gql`
  query project($id: ID!) {
    project(id: $id) {
      name
      startDate
      company
      members {
        fullName
        role
      }
      description
      technologies {
        name
        version
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ProjectGQL extends Apollo.Query {
  document = ProjectDocument;
}
