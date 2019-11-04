import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';

import { GraphQLModule } from '../../graphql.module';
import { IProject } from '../../../../models';

// @Injectable({
//   providedIn: GraphQLModule
// })
export class ProjectsGQL extends Query<IProject[]> {
  document = gql`
    query projects($search: String, $limit: Int) {
      projects(search: $search, limit: $limit) {
        id,
        name,
        startDate,
        technologies {
          name,
          version
        }
      }
    }
  `;
}
