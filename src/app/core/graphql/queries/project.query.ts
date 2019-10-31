import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

import { GraphQLModule } from '../graphql.module';
import { IProject } from '../../../models';

@Injectable({
  providedIn: GraphQLModule
})
export class ProjectGQL extends Query<IProject> {
  document = gql`
    query project($id: ID!) {
      project(id: $id) {
        name,
        startDate,
        company,
        members {
          fullName,
          role
        },
        description,
        technologies {
          name,
          version
        }
      }
    }
  `;
}
